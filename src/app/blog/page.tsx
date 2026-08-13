import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { getArticles } from "@/lib/articles";
import { members } from "@/lib/members";

export const metadata: Metadata = { title: "블로그" };
export const revalidate = 60;

export default async function BlogPage() {
  const articles = await getArticles();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="text-center">
        <p className="font-mono text-xs uppercase tracking-widest text-indigo-500">// blog</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">블로그</h1>
        <p className="mt-3 text-zinc-600">로엔 팀원들이 쓰는 개발·기획·디자인 이야기.</p>
      </div>

      {articles.length === 0 ? (
        <p className="mt-16 text-center text-zinc-500">아직 발행된 글이 없어요.</p>
      ) : (
        <div className="mt-12 space-y-5">
          {articles.map((a, i) => {
            const m = members.find((x) => x.name === a.author);
            return (
              <Reveal key={a.slug} delay={i * 60}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="block rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
                >
                  {a.tags.length > 0 && (
                    <div className="mb-2 flex flex-wrap gap-2">
                      {a.tags.map((t) => (
                        <span key={t} className="rounded-full bg-indigo-50 px-2 py-0.5 text-xs font-medium text-indigo-600">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                  <h2 className="text-xl font-semibold text-zinc-900">{a.title}</h2>
                  {a.excerpt && (
                    <p className="mt-2 text-pretty text-sm leading-relaxed text-zinc-600">{a.excerpt}</p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
                    {m?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={m.image} alt="" className="h-6 w-6 rounded-full object-cover ring-1 ring-zinc-200" />
                    ) : (
                      a.author && (
                        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-400">
                          {a.author.slice(0, 1)}
                        </span>
                      )
                    )}
                    {a.author && <span className="font-medium text-zinc-700">{a.author}</span>}
                    {a.date && (
                      <>
                        <span>·</span>
                        <time>{a.date}</time>
                      </>
                    )}
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      )}
    </div>
  );
}
