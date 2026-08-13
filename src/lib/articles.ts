// 블로그 아티클 = Notion(article-DB)을 CMS로. 토큰이 없으면 로컬 샘플로 폴백해
// 디자인을 미리 볼 수 있게 한다. NOTION_TOKEN을 채우면 실 Notion 데이터로 전환.

const NOTION_TOKEN = process.env.NOTION_TOKEN || process.env.NOTION_API_TOKEN;
const DS_ID = process.env.NOTION_BLOG_DATA_SOURCE_ID;
const NOTION_VERSION = "2026-03-11";

export type RichText = {
  text: string;
  bold?: boolean;
  italic?: boolean;
  code?: boolean;
  strike?: boolean;
  href?: string;
};

export type Block =
  | { type: "p"; rich: RichText[] }
  | { type: "h2"; rich: RichText[] }
  | { type: "h3"; rich: RichText[] }
  | { type: "ul"; items: RichText[][] }
  | { type: "ol"; items: RichText[][] }
  | { type: "quote"; rich: RichText[] }
  | { type: "code"; lang: string; text: string }
  | { type: "img"; url: string; caption?: string }
  | { type: "divider" };

export type Article = {
  slug: string;
  title: string;
  author?: string;
  date?: string;
  excerpt?: string;
  tags: string[];
  cover?: string;
};

export type FullArticle = Article & { blocks: Block[] };

const isLive = () => Boolean(NOTION_TOKEN && DS_ID);

// ── Notion helpers ─────────────────────────────────────────
function headers() {
  return {
    Authorization: `Bearer ${NOTION_TOKEN}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

function plain(rich: { plain_text?: string }[] | undefined): string {
  return (rich ?? []).map((r) => r.plain_text ?? "").join("");
}

function toRich(rich: any[] | undefined): RichText[] {
  return (rich ?? []).map((r) => ({
    text: r.plain_text ?? "",
    bold: r.annotations?.bold || undefined,
    italic: r.annotations?.italic || undefined,
    code: r.annotations?.code || undefined,
    strike: r.annotations?.strikethrough || undefined,
    href: r.href ?? undefined,
  }));
}

function mapProps(page: any): Article {
  const p = page.properties ?? {};
  const fileProp = p.Cover?.files?.[0];
  return {
    slug: plain(p.Slug?.rich_text) || page.id,
    title: plain(p["이름"]?.title) || "(제목 없음)",
    author: p.Author?.select?.name ?? undefined,
    date: p.Date?.date?.start ?? undefined,
    excerpt: plain(p.Excerpt?.rich_text) || undefined,
    tags: (p.Tags?.multi_select ?? []).map((t: any) => t.name),
    cover: fileProp?.file?.url ?? fileProp?.external?.url ?? undefined,
  };
}

// Notion 블록 배열 → 정규화 Block[] (연속 리스트 아이템은 그룹핑)
function mapBlocks(results: any[]): Block[] {
  const blocks: Block[] = [];
  for (const b of results) {
    const t = b.type;
    if (t === "paragraph") {
      const rich = toRich(b.paragraph.rich_text);
      if (rich.length) blocks.push({ type: "p", rich });
    } else if (t === "heading_1" || t === "heading_2") {
      blocks.push({ type: "h2", rich: toRich(b[t].rich_text) });
    } else if (t === "heading_3") {
      blocks.push({ type: "h3", rich: toRich(b.heading_3.rich_text) });
    } else if (t === "bulleted_list_item") {
      const last = blocks[blocks.length - 1];
      if (last && last.type === "ul") last.items.push(toRich(b.bulleted_list_item.rich_text));
      else blocks.push({ type: "ul", items: [toRich(b.bulleted_list_item.rich_text)] });
    } else if (t === "numbered_list_item") {
      const last = blocks[blocks.length - 1];
      if (last && last.type === "ol") last.items.push(toRich(b.numbered_list_item.rich_text));
      else blocks.push({ type: "ol", items: [toRich(b.numbered_list_item.rich_text)] });
    } else if (t === "quote") {
      blocks.push({ type: "quote", rich: toRich(b.quote.rich_text) });
    } else if (t === "code") {
      blocks.push({ type: "code", lang: b.code.language ?? "text", text: plain(b.code.rich_text) });
    } else if (t === "image") {
      const src = b.image?.file?.url ?? b.image?.external?.url;
      if (src) blocks.push({ type: "img", url: src, caption: plain(b.image.caption) || undefined });
    } else if (t === "divider") {
      blocks.push({ type: "divider" });
    }
  }
  return blocks;
}

// ── Public API ─────────────────────────────────────────────
export async function getArticles(): Promise<Article[]> {
  if (!isLive()) return fallbackArticles.map(({ blocks, ...a }) => a);
  try {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${DS_ID}/query`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        filter: { property: "Published", checkbox: { equals: true } },
        sorts: [{ property: "Date", direction: "descending" }],
      }),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Notion query ${res.status}`);
    const data = await res.json();
    return (data.results ?? []).map(mapProps).filter((a: Article) => a.slug);
  } catch (e) {
    console.warn("[articles] Notion fetch 실패 → 폴백:", e);
    return fallbackArticles.map(({ blocks, ...a }) => a);
  }
}

export async function getArticle(slug: string): Promise<FullArticle | null> {
  if (!isLive()) return fallbackArticles.find((a) => a.slug === slug) ?? null;
  try {
    const res = await fetch(`https://api.notion.com/v1/data_sources/${DS_ID}/query`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({
        filter: {
          and: [
            { property: "Slug", rich_text: { equals: slug } },
            { property: "Published", checkbox: { equals: true } },
          ],
        },
      }),
      next: { revalidate: 60 },
    });
    if (!res.ok) throw new Error(`Notion query ${res.status}`);
    const page = (await res.json()).results?.[0];
    if (!page) return null;
    const meta = mapProps(page);
    const bRes = await fetch(
      `https://api.notion.com/v1/blocks/${page.id}/children?page_size=100`,
      { headers: headers(), next: { revalidate: 60 } },
    );
    const blocks = bRes.ok ? mapBlocks((await bRes.json()).results ?? []) : [];
    return { ...meta, blocks };
  } catch (e) {
    console.warn("[articles] Notion detail 실패 → 폴백:", e);
    return fallbackArticles.find((a) => a.slug === slug) ?? null;
  }
}

// ── 폴백(로컬 미리보기용) — 토큰 세팅 전 디자인 확인용 ────────
const fallbackArticles: FullArticle[] = [
  {
    slug: "how-we-built-loen-site",
    title: "로엔 사이트는 이렇게 만들었어요",
    author: "남현서",
    date: "2026-08-13",
    excerpt: "Next.js와 Vercel로 로엔 사이트를 만든 과정, 그리고 우리가 신경 쓴 것들.",
    tags: ["개발", "devlog"],
    blocks: [
      { type: "p", rich: [
        { text: "안녕하세요, 로엔 개발팀입니다. 이 글에서는 우리가 " },
        { text: "loenstudio.dev", bold: true },
        { text: " 사이트를 어떤 생각으로, 어떤 도구로 만들었는지 짧게 나눠볼게요." },
      ] },
      { type: "h2", rich: [{ text: "왜 직접 만들었나" }] },
      { type: "p", rich: [{ text: "청년부 공동체에 필요한 것을 우리 손으로 만들어 섬기고 싶었어요. 그래서 화려함보다 오래 갈 수 있는 단순한 구조를 골랐습니다." }] },
      { type: "ul", items: [
        [{ text: "빌드 없이도 배포되는 단순한 구조" }],
        [{ text: "제품·소식·소개를 한곳에 모은 동아리 허브" }],
        [{ text: "팀원 누구나 글을 올릴 수 있는 블로그(바로 이 페이지!)" }],
      ] },
      { type: "h2", rich: [{ text: "기술 스택" }] },
      { type: "p", rich: [{ text: "Next.js(App Router) + Vercel, 콘텐츠는 Notion을 CMS로 씁니다." }] },
      { type: "code", lang: "typescript", text: "const articles = await getArticles();\n// Notion DB → /blog 목록으로 자동 렌더" },
      { type: "quote", rich: [{ text: "잘 만든 기능보다, 함께 만들어가는 마음을 먼저." }] },
      { type: "p", rich: [{ text: "앞으로 개발기, 회고, 기획·디자인 이야기를 이곳에 쌓아갈게요. 읽어주셔서 감사합니다 🙌" }] },
    ],
  },
];
