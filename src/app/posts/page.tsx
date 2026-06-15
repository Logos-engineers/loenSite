import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "@/lib/posts";

export const metadata: Metadata = { title: "소식" };

export default function PostsPage() {
  const sorted = [...posts].sort((a, b) => b.date.localeCompare(a.date));
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">소식</h1>
      <p className="mt-3 text-zinc-600">공지·업데이트·모집 소식.</p>

      {sorted.length === 0 ? (
        <p className="mt-12 text-zinc-400">아직 소식이 없습니다.</p>
      ) : (
        <ul className="mt-10 divide-y divide-zinc-200">
          {sorted.map((post) => (
            <li key={post.slug}>
              <Link href={`/posts/${post.slug}`} className="block py-6">
                <time className="text-sm text-zinc-400">{post.date}</time>
                <h2 className="mt-1 text-lg font-medium text-zinc-900">{post.title}</h2>
                <p className="mt-1 text-sm text-zinc-600">{post.excerpt}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
