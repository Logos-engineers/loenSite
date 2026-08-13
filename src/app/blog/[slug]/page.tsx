import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import { getArticle, getArticles } from "@/lib/articles";
import { members } from "@/lib/members";

export const revalidate = 60;

export async function generateStaticParams() {
  const articles = await getArticles();
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) return {};
  return { title: a.title, description: a.excerpt };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = await getArticle(slug);
  if (!a) notFound();

  const m = members.find((x) => x.name === a.author);

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <Link href="/blog" className="text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600">
        ← 블로그
      </Link>

      {a.tags.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-2">
          {a.tags.map((t) => (
            <span key={t} className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-medium text-indigo-600">
              {t}
            </span>
          ))}
        </div>
      )}

      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
        {a.title}
      </h1>

      <div className="mt-6 flex items-center gap-3">
        {m?.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={m.image} alt={a.author ?? ""} className="h-10 w-10 rounded-full object-cover ring-1 ring-zinc-200" />
        ) : (
          a.author && (
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-100 text-sm font-semibold text-zinc-400">
              {a.author.slice(0, 1)}
            </span>
          )
        )}
        <div className="text-sm leading-tight">
          {a.author && <p className="font-medium text-zinc-800">{a.author}</p>}
          <p className="text-zinc-500">
            {a.date}
            {m?.role ? ` · ${m.role}` : ""}
          </p>
        </div>
      </div>

      {a.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={a.cover} alt="" className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover" />
      )}

      <ArticleBody blocks={a.blocks} />
    </article>
  );
}
