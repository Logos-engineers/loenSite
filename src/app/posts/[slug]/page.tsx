import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";
import TesterForm from "@/components/TesterForm";
import { getTesterCount, TESTER_CAPACITY } from "@/lib/notion-tester";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return { title: post.title, description: post.excerpt };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  // 안드로이드 신청 폼만 정원(12명) 차면 마감. iOS는 마감 없음.
  // count 조회 실패(null)면 안전하게 폼 열어둠.
  let applyClosed = false;
  if (post.applyForm === "Android") {
    const count = await getTesterCount("Android");
    applyClosed = count !== null && count >= TESTER_CAPACITY;
  }

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <time className="text-sm text-zinc-400">{post.date}</time>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">{post.title}</h1>
      {((post.deadline && !applyClosed) || post.testPeriod) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {post.deadline && !applyClosed && (
            <span className="inline-flex items-center gap-2 rounded-full bg-rose-50 px-4 py-2 text-sm font-bold text-rose-600 ring-1 ring-rose-100">
              🗓️ 신청 마감 · {post.deadline}까지
            </span>
          )}
          {post.testPeriod && (
            <span className="inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 ring-1 ring-indigo-100">
              🧪 테스트 기간 · {post.testPeriod}
            </span>
          )}
        </div>
      )}
      {/* 본문: 지금은 plain 텍스트 — 다음 단계에서 MDX 렌더로 교체 */}
      <div className="mt-8 whitespace-pre-line leading-relaxed text-zinc-700">
        {post.body}
      </div>
      {post.cta && (
        <a
          href={post.cta.href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-10 inline-block rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:bg-indigo-400"
        >
          {post.cta.label}
        </a>
      )}
      {post.applyForm &&
        (applyClosed ? (
          <div className="mt-10 rounded-2xl border border-zinc-200 bg-zinc-50 p-8 text-center">
            <p className="text-2xl">🙏</p>
            <p className="mt-2 font-semibold text-zinc-800">모집이 마감되었어요</p>
            <p className="mt-1 text-sm text-zinc-600">
              정원 {TESTER_CAPACITY}명이 모두 찼어요. 관심 가져주셔서 감사합니다!
            </p>
          </div>
        ) : (
          <TesterForm platform={post.applyForm} />
        ))}
    </article>
  );
}
