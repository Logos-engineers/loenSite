import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "청년부 AI 활용 스터디 (바이브코딩)",
  description:
    "단순 채팅을 넘어, AI 에이전트로 내 삶의 문제를 직접 해결하는 청년부 AI 활용 스터디. 9월 12일(토) 13:00–16:00, 4층 로엔 동아리방. 선착순 5명 · 참가비 무료. 코딩 몰라도 OK.",
  openGraph: {
    title: "청년부 AI 활용 스터디 (바이브코딩) 모집",
    description:
      "AI 에이전트로 내 삶의 문제를 직접 해결해보는 3시간. 코딩 몰라도 OK · 9/12(토) · 무료 · 선착순 5명",
  },
};

const features = [
  {
    icon: "🤖",
    title: "채팅이 아니라 ‘에이전트’",
    body: "AI를 대화 상대가 아니라 일하는 도구로. 단순 코드 생성을 넘어, 실제 문제를 대신 해결하게 만듭니다.",
  },
  {
    icon: "🧑‍💻",
    title: "코딩 몰라도 OK",
    body: "필요한 서비스를 직접 만들고 반복 작업을 자동화하는 과정을, 진행자가 옆에서 함께 알려드려요.",
  },
  {
    icon: "🚀",
    title: "만들고 바로 배포",
    body: "아이디어에서 시작해 실제로 동작하는 결과물을 만들고, 그 자리에서 배포까지 경험합니다.",
  },
];

const makes = [
  "행사 준비 체크리스트",
  "모임 순서표",
  "참석 취합 페이지",
  "역할 배정 도구",
  "회비·예산 계산기",
  "반복 작업 자동화",
  "나만의 포트폴리오 사이트",
];

const steps = [
  {
    n: 1,
    label: "개념 이해",
    time: "10분",
    desc: "프론트·백엔드·데이터베이스가 뭔지, 큰 그림만 가볍게",
  },
  {
    n: 2,
    label: "환경 세팅",
    time: "30분",
    desc: "AI 도구와 배포 도구(Netlify)를 함께 준비",
  },
  {
    n: 3,
    label: "다 같이 첫 서비스 만들기",
    time: "30분",
    desc: "‘오늘의 말씀 뽑기’를 함께 만들고, 그 자리에서 배포까지",
  },
  {
    n: 4,
    label: "내 방식대로 고치기",
    time: "30분",
    desc: "공동으로 만든 결과물을 각자 원하는 방향으로 수정",
  },
  {
    n: 5,
    label: "각자 만들고 배포",
    time: "80분",
    desc: "각자 만들고 싶은 서비스를 직접 제작하고 배포",
  },
];

const facts = [
  { k: "일시", v: "9월 12일(토) 13:00–16:00", sub: "3시간 · 1차 스터디" },
  { k: "장소", v: "4층 로엔 동아리방" },
  { k: "대상", v: "AI·바이브코딩이 처음인 청년부 누구나" },
  { k: "인원", v: "선착순 최대 5명" },
  {
    k: "준비물",
    v: "개인 노트북 + AI 구독 1개",
    sub: "Claude · GPT · Gemini 중 — 자세한 건 신청 시 안내",
  },
  { k: "참가비", v: "무료", sub: "재능기부로 진행돼요" },
];

const nextPlans = [
  {
    icon: "🔁",
    title: "정기적으로 다시 열어요",
    body: "이번 9월 12일은 첫 번째 스터디예요. 관심 있는 분이 모일 때마다 입문 스터디를 정기적으로 다시 엽니다 — 이번에 놓쳐도 다음 기회가 있어요.",
  },
  {
    icon: "🧩",
    title: "심화로도 이어져요",
    body: "로그인·서버·데이터베이스처럼 더 깊은 내용은 별도의 심화 스터디·커뮤니티로 계속 이어갈 예정이에요.",
  },
];

const applyHref = `mailto:${site.contactEmail}?subject=${encodeURIComponent(
  "청년부 AI 활용 스터디 신청",
)}&body=${encodeURIComponent("오이코스: \n이름: ")}`;

export default function VibecodingStudyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-zinc-950">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-indigo-600/30 blur-[150px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(0,0,0,0.55))]" />
        <div className="relative mx-auto max-w-3xl px-6 pt-32 pb-24 text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm font-semibold text-indigo-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_0_4px_rgba(129,140,248,0.35)]" />
            청년부 모집 · 선착순 5명
          </span>
          <h1 className="mt-6 bg-gradient-to-br from-white via-white to-indigo-300 bg-clip-text pb-1 text-5xl font-bold tracking-tight text-transparent sm:text-6xl">
            청년부 AI 활용 스터디
          </h1>
          <p className="mt-3 text-xl font-semibold text-indigo-100 sm:text-2xl">
            요즘 말하는 ‘바이브코딩’
          </p>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-300 sm:text-lg">
            단순 채팅을 넘어, AI 에이전트로 내 삶의 문제를 직접 해결합니다. 코딩을 몰라도 괜찮아요.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            <span className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              📅 9/12(토) 13:00–16:00
            </span>
            <span className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              📍 4층 로엔 동아리방
            </span>
            <span className="rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur">
              🎟️ 참가비 무료
            </span>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#apply"
              className="rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-0.5 hover:bg-indigo-400"
            >
              신청하기 →
            </a>
            <a
              href="#how"
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              진행 방식 보기
            </a>
          </div>
        </div>
      </section>

      {/* ── What ── */}
      <section className="mx-auto max-w-5xl px-6 py-24">
        <Reveal className="text-center">
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
            What
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            어떤 스터디인가요
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-zinc-600">
            정해진 커리큘럼을 강의하는 거창한 교육이 아니라, 3시간 동안 각자 하나씩 직접 만들어보는 가벼운 자리예요.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={i * 80}>
              <div className="h-full rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                  {f.icon}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                  {f.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                  {f.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={120} className="mt-12 text-center">
          <p className="text-sm font-medium text-zinc-500">예를 들면, 이런 걸 만들어요</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2.5">
            {makes.map((m) => (
              <span
                key={m}
                className="rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 ring-1 ring-indigo-100"
              >
                {m}
              </span>
            ))}
          </div>
        </Reveal>
      </section>

      {/* ── How ── */}
      <section id="how" className="scroll-mt-20 border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <Reveal>
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
              How · 3시간
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              이렇게 진행돼요
            </h2>
          </Reveal>
          <p className="mt-3 text-zinc-500">토요일 오후, 총 180분 동안 이렇게 흘러가요.</p>
          <div className="mt-10 flex flex-col gap-3">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 70}>
                <div className="flex items-center gap-4 rounded-2xl border border-zinc-200 bg-white px-6 py-5 shadow-sm">
                  <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-indigo-500 text-lg font-bold text-white">
                    {s.n}
                  </span>
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900">{s.label}</p>
                    <p className="mt-0.5 text-sm text-zinc-500">{s.desc}</p>
                  </div>
                  <span className="ml-auto flex-none whitespace-nowrap text-sm font-semibold text-zinc-400">
                    {s.time}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Info ── */}
      <section className="mx-auto max-w-4xl px-6 py-24">
        <Reveal>
          <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
            Info
          </p>
          <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
            한눈에 보기
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          {facts.map((f, i) => (
            <Reveal key={f.k} delay={i * 60}>
              <div className="h-full rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm">
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                  {f.k}
                </p>
                <p className="mt-1.5 text-lg font-semibold text-zinc-900">
                  {f.v}
                </p>
                {f.sub && <p className="mt-1 text-sm text-zinc-500">{f.sub}</p>}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ── Next ── */}
      <section className="border-t border-zinc-100 bg-zinc-50">
        <div className="mx-auto max-w-3xl px-6 py-24">
          <Reveal className="text-center">
            <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
              Next
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
              이번 한 번으로 끝이 아니에요
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-zinc-600">
              앞으로 수요에 맞춰 꾸준히, 정기적으로 열어갈 스터디예요.
            </p>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {nextPlans.map((p, i) => (
              <Reveal key={p.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-zinc-200 bg-white p-7 shadow-sm">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-2xl">
                    {p.icon}
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-zinc-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600">
                    {p.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Apply ── */}
      <section id="apply" className="scroll-mt-20 bg-zinc-900">
        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <Reveal>
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              AI, 남의 이야기가 아닙니다
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-zinc-400">
              채팅에서도 하던 것들을 훨씬 확장성 있게 쓰는 법을 함께 익혀요. 관심 있으면 편하게 신청해 주세요.
            </p>
            <a
              href={applyHref}
              className="mt-9 inline-flex items-center gap-2.5 rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:-translate-y-0.5 hover:bg-indigo-400"
            >
              📮 {site.contactEmail} 로 신청하기
            </a>
            <p className="mt-4 text-sm text-zinc-400">
              메일로 <span className="font-semibold text-zinc-200">오이코스와 이름</span>을 보내주세요.
              <span className="text-zinc-500"> · 진행 : 남현서</span>
            </p>
            <p className="mt-6 text-xs leading-relaxed text-zinc-500">
              준비물·접속 방법 등 자세한 안내는 신청하시면 개별로 알려드려요.
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
