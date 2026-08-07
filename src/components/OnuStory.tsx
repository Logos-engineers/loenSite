import Link from "next/link";
import Reveal from "@/components/Reveal";
import type { Product } from "@/lib/products";
import type { Post } from "@/lib/posts";

// onu(온유) 전용 상세 — 애플식 스크롤 스토리. 감성(만든 마음)과 정보(기능)를
// 하나의 흐름으로: 마음 → 이름 → 지향 → 기능 → 함께 → 설치.
export default function OnuStory({
  product,
  posts,
}: {
  product: Product;
  posts: Post[];
}) {
  const verse = [
    "onu는 로고스 청년부와 함께 자라는 앱입니다.",
    "때로는 누군가의 성장에 작은 발판이 되고,",
    "때로는 청년부를 통해 앱이 성장합니다.",
  ];
  const ready = product.downloads.filter((d) => d.href.length > 0);

  return (
    <div className="overflow-hidden">
      {/* ── ① HERO ───────────────────────────────────────────── */}
      <section className="relative isolate flex min-h-[88vh] flex-col items-center justify-center px-6 py-24 text-center">
        {/* 배경 그라데이션 글로우 (로고 색과 호응) */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_50%_35%,rgba(129,140,248,0.20),transparent_70%)]"
        />
        <Reveal>
          {product.logo && (
            <img
              src={product.logo}
              alt="onu 로고"
              className="mx-auto h-24 w-24 rounded-[22px] shadow-2xl ring-1 ring-black/5 sm:h-28 sm:w-28"
            />
          )}
        </Reveal>
        <Reveal delay={120}>
          <h1 className="mt-8 bg-gradient-to-r from-indigo-500 via-violet-500 to-sky-400 bg-clip-text text-6xl font-bold tracking-tight text-transparent sm:text-7xl">
            onu
          </h1>
          <p className="mt-3 text-xl font-semibold text-zinc-900 sm:text-2xl">온유</p>
        </Reveal>
        <Reveal delay={220}>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-zinc-600">
            {product.oneLiner}
          </p>
        </Reveal>
        {ready.length > 0 && (
          <Reveal delay={320}>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              {ready.map((d) => (
                <a
                  key={d.platform}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-zinc-900 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all hover:-translate-y-0.5 hover:bg-zinc-800"
                >
                  {d.platform === "ios" ? " App Store" : "▶ Google Play"}
                </a>
              ))}
            </div>
          </Reveal>
        )}
        <div className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium tracking-widest text-zinc-300">
          SCROLL
        </div>
      </section>

      {/* ── ② 만든 마음 (감성 오프너 · A안 시) ─────────────────── */}
      <section className="bg-zinc-50 px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
              우리가 담은 마음
            </p>
            <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-500 sm:text-base">
              잘 만든 기능보다, 이런 마음을 먼저 담고 싶었어요.
            </p>
          </Reveal>
          <Reveal className="mt-12 sm:mt-14">
            <div className="mx-auto max-w-xl rounded-3xl border border-zinc-200 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10">
              {verse.map((line, i) => (
                <p
                  key={i}
                  className="text-balance text-sm font-medium leading-relaxed tracking-tight text-zinc-900 sm:text-2xl"
                >
                  {line}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── ③ 이름에 담은 두 가지 마음 (다크 · 반전) ────────────── */}
      <section className="bg-zinc-950 px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-400">
              이름에 담은 두 가지 마음
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              왜 <span className="text-indigo-300">onu</span>였을까
            </h2>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            <Reveal>
              <div className="h-full rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:p-8">
                <p className="text-4xl font-bold tracking-tight text-white">온유</p>
                <p className="mt-4 text-pretty leading-relaxed text-zinc-400">
                  성경이 말하는 그 <b className="text-zinc-200">온유함</b>. 낮고 부드러운
                  마음으로, 곁에서 조용히 함께합니다.
                </p>
              </div>
            </Reveal>
            <Reveal delay={120}>
              <div className="h-full rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-violet-500/10 p-6 backdrop-blur sm:p-8">
                <p className="text-4xl font-bold tracking-tight">
                  <span className="text-white">God</span>
                  <span className="mx-2 text-indigo-300">&amp;</span>
                  <span className="text-white">You</span>
                </p>
                <p className="mt-4 text-pretty leading-relaxed text-zinc-300">
                  하나님과 여러분을 잇는 <b className="text-white">작은 연결고리</b>.
                  그 사이를 이어주는 것이 onu의 시작입니다.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── ④ 지향 (그라데이션 밴드 · 큰 선언) ──────────────────── */}
      <section className="bg-zinc-950 px-6 pb-40 pt-8 sm:pb-48 sm:pt-12">
        <Reveal className="relative z-10 mx-auto max-w-3xl text-center">
          <h2 className="text-balance text-2xl font-semibold leading-snug tracking-tight text-violet-300 sm:text-4xl">
            하나님과 더 친밀해지도록 돕고,{" "}
            <br className="hidden sm:block" />
            신앙의 여정을 곁에서 함께 걷는{" "}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text font-bold text-transparent">
              동역자 같은 앱
            </span>
            .
          </h2>
        </Reveal>
      </section>

      {/* ── ⑤ onu가 잇는 두 가지 (기능) ────────────────────────── */}
      <section className="px-6 py-20 sm:py-32">
        <div className="mx-auto max-w-4xl">
          <Reveal className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
              onu가 잇는 두 가지
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              끊어지기 쉬운 것들을 이어요
            </h2>
          </Reveal>

          <div className="mt-16 space-y-6">
            <Reveal>
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold text-indigo-600">01 · 지난 주일 → 이번 주일</p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-900 sm:text-2xl">OBS 복습하기</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                  오이코스 모임 전, 지난주 설교로 만든 세 문제 퀴즈. 잊고 지낸 말씀을 함께
                  떠올려 이번 주 말씀과 이어, 더 풍성한 나눔으로.
                </p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
                <p className="text-sm font-semibold text-indigo-600">02 · 주일의 은혜 → 평일의 삶</p>
                <h3 className="mt-2 text-xl font-semibold text-zinc-900 sm:text-2xl">감사 · 기도 · 말씀 노트</h3>
                <p className="mt-3 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
                  일상에서 받은 감사와 기도제목, 마음에 남은 말씀을 기록하고 청년부·오이코스와
                  나눕니다. 바쁜 하루 속에서도 이어지는 교제.
                </p>
              </div>
            </Reveal>
          </div>

        </div>
      </section>

      {/* ── ⑥ 함께 만들어가는 앱 ───────────────────────────────── */}
      <section className="bg-zinc-50 px-6 py-20 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            함께 만들어가는 앱
          </h2>
          <p className="mt-6 text-pretty text-sm leading-relaxed text-zinc-600 sm:text-base">
            처음부터 화려한 기능은 없습니다. 대신 여러분의 일상에 자연스럽게 스며드는
            동역자가 되려 해요. 좋았던 점, 불편한 점, 새롭게 필요한 기능이 있다면 언제든
            알려주세요.
          </p>
          <p className="mt-4 text-base font-semibold text-indigo-600 sm:text-lg">
            여러분의 참여로, onu는 계속 성장합니다.
          </p>
        </Reveal>
      </section>

      {/* ── ⑦ 설치 (다크 CTA) ─────────────────────────────────── */}
      {ready.length > 0 && (
        <section className="bg-zinc-900 px-6 py-24">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-4xl">
              지금 onu를 만나보세요
            </h2>
            <p className="mt-4 text-zinc-400">App Store와 Google Play에서 설치할 수 있어요.</p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              {ready.map((d) => (
                <a
                  key={d.platform}
                  href={d.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-zinc-900 shadow-[0_0_30px_rgba(255,255,255,0.15)] transition-all hover:-translate-y-0.5"
                >
                  {d.label}
                </a>
              ))}
            </div>
          </Reveal>
        </section>
      )}

      {/* ── ⑧ 관련 소식 ───────────────────────────────────────── */}
      {posts.length > 0 && (
        <section className="border-t border-zinc-100 px-6 py-20">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-xl font-semibold text-zinc-900">관련 소식</h2>
            <ul className="mt-4 divide-y divide-zinc-200">
              {posts.map((post) => (
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
          </div>
        </section>
      )}
    </div>
  );
}
