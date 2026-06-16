import Link from "next/link";
import HeroScroll from "@/components/HeroScroll";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { products } from "@/lib/products";
import { posts } from "@/lib/posts";

export default function Home() {
  const latest = [...posts].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3);

  return (
    <>
      {/* Hero — Apple식 스크롤 핀 스토리 (검은 섹션) */}
      <HeroScroll />

      {/* 검정 → 흰 색 전환 브릿지 */}
      <div className="h-44 bg-gradient-to-b from-black to-white" />

      {/* 미션 스테이트먼트 */}
      <section className="px-6 py-28">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
            About
          </p>
          <h2 className="mt-5 text-3xl font-semibold leading-snug tracking-tight text-zinc-900 sm:text-4xl">
            청년부에 필요한 걸, 우리 손으로 직접 만듭니다.
            <br />
            <span className="text-zinc-400">
              기획부터 개발·배포까지 — 공동체를 위한 도구를 빚어요.
            </span>
          </h2>
          <Link
            href="/about"
            className="mt-8 inline-block text-sm font-medium text-indigo-600 hover:text-indigo-500"
          >
            {site.name} 소개 →
          </Link>
        </Reveal>
      </section>

      {/* 대표 제품 — 라이트 */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <Reveal>
          <h2 className="mb-8 text-2xl font-semibold tracking-tight text-zinc-900">우리가 만든 것</h2>
        </Reveal>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href={`/products/${p.slug}`}
                className="block h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all hover:border-zinc-300 hover:shadow-md"
              >
                <div className="mb-3 flex items-center gap-2">
                  <h3 className="text-lg font-medium text-zinc-900">{p.name}</h3>
                  {p.comingSoon ? (
                    <span className="rounded-full bg-zinc-900 px-2 py-0.5 text-xs font-medium text-white">
                      Coming soon
                    </span>
                  ) : (
                    p.status === "beta" && (
                      <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-600">
                        베타
                      </span>
                    )
                  )}
                </div>
                <p className="text-sm text-zinc-600">
                  {p.comingSoon ? "곧 공개됩니다 ✨" : p.oneLiner}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 최신 소식 — 라이트, zinc-50 교차 */}
      {latest.length > 0 && (
        <section className="border-t border-zinc-100 bg-zinc-50">
          <Reveal className="mx-auto max-w-5xl px-6 py-20">
            <div className="mb-8 flex items-baseline justify-between">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">소식</h2>
              <Link href="/posts" className="text-sm text-indigo-600 hover:text-indigo-500">
                전체 보기 →
              </Link>
            </div>
            <ul className="divide-y divide-zinc-200">
              {latest.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="flex flex-col gap-1 py-5 transition-colors hover:text-indigo-600 sm:flex-row sm:items-baseline sm:gap-4"
                  >
                    <time className="shrink-0 text-sm text-zinc-400">{post.date}</time>
                    <span className="font-medium text-zinc-900">{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </section>
      )}

      {/* 마무리 CTA — 다크 */}
      <section className="bg-zinc-900">
        <Reveal className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            함께 만들어가요
          </h2>
          <p className="mt-4 text-zinc-400">
            Logos 교회 청년부의 개발 동아리예요. 궁금한 점이 있으면 언제든 문의해주세요.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/products"
              className="rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:-translate-y-0.5 hover:bg-indigo-400"
            >
              제품 보기
            </Link>
            <a
              href={`mailto:${site.contactEmail}`}
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              문의하기
            </a>
          </div>
        </Reveal>
      </section>
    </>
  );
}
