import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { posts, getPost } from "@/lib/posts";

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

  return (
    <article className="mx-auto max-w-2xl px-6 py-20">
      <time className="text-sm text-zinc-400">{post.date}</time>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-900">{post.title}</h1>
      {/* 본문: 지금은 plain 텍스트 — 다음 단계에서 MDX 렌더로 교체 */}
      <div className="mt-8 whitespace-pre-line leading-relaxed text-zinc-700">
        {post.body}
      </div>
    </article>
  );
}
