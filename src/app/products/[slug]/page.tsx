import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, getProduct } from "@/lib/products";
import { posts } from "@/lib/posts";
import ComingSoonHero from "@/components/ComingSoonHero";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  if (product.comingSoon)
    return { title: product.name, description: "곧 공개됩니다." };
  return { title: product.name, description: product.oneLiner };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  // 곧 공개 — 상세 비공개, WebGL 연출만 노출 (모집 중이면 그 소식으로 링크)
  if (product.comingSoon) {
    const recruit = posts.find(
      (p) => p.productTag === product.tag && p.applyForm,
    );
    return (
      <ComingSoonHero
        label={product.name}
        ctaHref={recruit ? `/posts/${recruit.slug}` : undefined}
        ctaLabel={recruit ? "베타 테스터 모집 중 →" : undefined}
      />
    );
  }

  const related = posts.filter((p) => p.productTag === product.tag);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <div className="flex items-center gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{product.name}</h1>
        {product.status === "beta" && (
          <span className="rounded-full bg-indigo-100 px-2.5 py-1 text-xs font-medium text-indigo-600">
            베타
          </span>
        )}
      </div>
      <p className="mt-4 text-lg text-zinc-700">{product.oneLiner}</p>
      <p className="mt-6 text-zinc-600">{product.about}</p>

      <h2 className="mt-12 text-xl font-semibold text-zinc-900">기능</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        {product.features.map((f) => (
          <div key={f.title} className="rounded-xl border border-zinc-200 bg-white p-4">
            <h3 className="font-medium text-zinc-900">{f.title}</h3>
            <p className="mt-1 text-sm text-zinc-600">{f.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-xl font-semibold text-zinc-900">설치</h2>
      <div className="mt-4 flex flex-col gap-3">
        {product.downloads.map((d) => {
          const ready = d.href.length > 0;
          return (
            <div
              key={d.platform}
              className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-4 py-3"
            >
              <div>
                <p className="font-medium text-zinc-900">{d.label}</p>
                {d.note && <p className="text-xs text-zinc-500">{d.note}</p>}
              </div>
              {ready ? (
                <a
                  href={d.href}
                  className="rounded-full bg-indigo-500 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-400"
                >
                  받기
                </a>
              ) : (
                <span className="rounded-full bg-zinc-100 px-4 py-2 text-sm text-zinc-400">
                  준비 중
                </span>
              )}
            </div>
          );
        })}
      </div>

      {related.length > 0 && (
        <>
          <h2 className="mt-12 text-xl font-semibold text-zinc-900">관련 소식</h2>
          <ul className="mt-4 divide-y divide-zinc-200">
            {related.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/posts/${post.slug}`}
                  className="flex items-baseline gap-4 py-4 hover:text-indigo-600"
                >
                  <time className="shrink-0 text-sm text-zinc-400">{post.date}</time>
                  <span className="font-medium text-zinc-900">{post.title}</span>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
