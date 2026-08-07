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
          <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-zinc-900">우리가 만든 것</h2>
        </Reveal>
        <div className="flex flex-wrap justify-center gap-6">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 80}>
              <Link
                href={`/products/${p.slug}`}
                className="flex h-full w-full flex-col items-center rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm transition-all hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md sm:w-80"
              >
                {p.logo && (
                  <img
                    src={p.logo}
                    alt=""
                    className="h-14 w-14 rounded-2xl ring-1 ring-black/5"
                  />
                )}
                <div className="mt-4 flex items-center justify-center gap-2">
                  <h3 className="text-lg font-semibold text-zinc-900">{p.name}</h3>
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
                <p className="mt-2 text-sm text-zinc-600">
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
            <h2 className="mb-8 text-center text-2xl font-semibold tracking-tight text-zinc-900">소식</h2>
            <ul className="mx-auto flex max-w-xl flex-col gap-3">
              {latest.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/posts/${post.slug}`}
                    className="block rounded-2xl bg-white/60 px-6 py-5 text-center ring-1 ring-zinc-200/70 transition-all hover:-translate-y-0.5 hover:bg-white hover:ring-zinc-300"
                  >
                    <time className="block font-mono text-xs text-zinc-400">{post.date}</time>
                    <span className="mt-1.5 block font-medium text-zinc-900">{post.title}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 text-center">
              <Link href="/posts" className="text-sm text-indigo-600 hover:text-indigo-500">
                전체 보기 →
              </Link>
            </div>
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
