import type { Metadata } from "next";
import VibecodingInterestForm from "@/components/VibecodingInterestForm";

export const metadata: Metadata = {
  title: "바이브코딩 스터디 수요 조사",
  description: "코딩이 처음이어도 AI와 함께 필요한 서비스를 직접 만들고 배포하는 청년부 스터디",
  openGraph: {
    title: "AI를 채팅에서 실제 결과물로",
    description: "청년부 바이브코딩 스터디 참여 수요를 조사합니다.",
  },
};

const reasons = [
  {
    number: "01",
    title: "채팅을 넘어서",
    body: "AI에게 질문만 하는 데서 끝나지 않고, 여러 단계의 일을 맡기는 방법을 익힙니다.",
  },
  {
    number: "02",
    title: "내 문제를 직접",
    body: "일상과 사역에서 반복되는 불편을 발견하고, 나에게 필요한 도구로 해결합니다.",
  },
  {
    number: "03",
    title: "아이디어를 현실로",
    body: "코딩을 몰라도 AI와 함께 실제로 작동하고 공유할 수 있는 결과물을 완성합니다.",
  },
];

const journey = [
  { step: "01", title: "큰 그림 익히기", body: "AI와 웹 서비스의 기본 개념" },
  { step: "02", title: "함께 만들어보기", body: "‘오늘의 말씀 뽑기’ 서비스 완성" },
  { step: "03", title: "내 방식으로 바꾸기", body: "각자 필요한 기능과 아이디어 적용" },
  { step: "04", title: "배포하고 나누기", body: "완성한 결과물을 링크로 공유" },
];

const plans = [
  {
    label: "먼저",
    title: "완전 초보를 위한 입문",
    body: "코딩을 한 번도 해보지 않은 분도 따라올 수 있는 기초 실습부터 시작합니다.",
  },
  {
    label: "수요가 많으면",
    title: "여러 회차로 반복 운영",
    body: "한 번으로 끝내지 않고, 같은 입문 과정을 여러 회차로 나누어 진행합니다.",
  },
  {
    label: "그다음",
    title: "더 깊은 심화 과정",
    body: "로그인·데이터·자동화처럼 더 깊이 배우고 싶은 분을 위한 과정으로 이어갑니다.",
  },
];

export default function VibecodingStudyPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-[#09090f] text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[520px] max-w-4xl bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.38),transparent_68%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.055] [background-image:linear-gradient(rgba(255,255,255,.8)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.8)_1px,transparent_1px)] [background-size:44px_44px]" />

        <div className="mx-auto flex min-h-[calc(100svh-3.5rem)] max-w-4xl flex-col justify-center px-5 py-20 text-center sm:block sm:min-h-0 sm:px-6 sm:pb-28 sm:pt-32">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-300">
            Vibecoding study · Interest check
          </p>
          <h1 className="mx-auto mt-6 max-w-3xl text-balance text-[2.65rem] font-bold leading-[1.08] tracking-[-0.045em] sm:text-7xl">
            AI를 채팅에서
            <span className="mt-1 block bg-gradient-to-r from-indigo-300 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
              실제 결과물로
            </span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-pretty text-base leading-7 text-zinc-300 sm:text-lg">
            코딩이 처음이어도 괜찮아요. AI와 함께 필요한 서비스를 직접 만들고, 다른 사람이 쓸 수 있도록 배포해봅니다.
          </p>

          <div className="mx-auto mt-8 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-zinc-400">
            <span>청년부 누구나</span>
            <span className="text-indigo-400">•</span>
            <span>약 3시간</span>
            <span className="text-indigo-400">•</span>
            <span>무료 예정</span>
            <span className="text-indigo-400">•</span>
            <span>코딩 경험 불필요</span>
          </div>

          <a
            href="#survey"
            className="mt-10 inline-flex w-full items-center justify-center rounded-full bg-white px-7 py-4 text-sm font-bold text-zinc-950 shadow-[0_12px_45px_rgba(129,140,248,.24)] transition hover:-translate-y-0.5 hover:bg-indigo-50 sm:w-auto"
          >
            1분 수요 조사 참여하기
            <span className="ml-2" aria-hidden="true">↓</span>
          </a>
          <p className="mt-4 text-xs text-zinc-600">정식 신청이 아닌 사전 수요 조사입니다.</p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Why</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-5xl">
            왜 바이브코딩인가요?
          </h2>

          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {reasons.map((reason) => (
              <div key={reason.number} className="relative text-center">
                <span className="font-mono text-xs font-semibold text-indigo-400">{reason.number}</span>
                <h3 className="mt-3 text-xl font-bold text-zinc-900">{reason.title}</h3>
                <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-zinc-600">{reason.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-950 text-white">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-400">3 hours</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">한 번 직접 만들어봅니다</h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-6 text-zinc-400 sm:text-base">
            설명은 짧게, 직접 만드는 시간은 길게 진행합니다.
          </p>

          <ol className="mx-auto mt-14 max-w-3xl text-center">
            {journey.map((item, index) => (
              <li key={item.step} className="relative pb-10 last:pb-0 sm:grid sm:grid-cols-[1fr_64px_1fr] sm:items-center sm:pb-8">
                {index < journey.length - 1 && (
                  <>
                    <span className="absolute bottom-0 left-1/2 h-10 w-px -translate-x-1/2 bg-zinc-800 sm:hidden" />
                    <span className="absolute left-1/2 top-14 hidden h-[calc(100%-1.5rem)] w-px -translate-x-1/2 bg-zinc-800 sm:block" />
                  </>
                )}
                <div className="hidden text-right sm:block">
                  {index % 2 === 0 && <p className="text-lg font-semibold">{item.title}</p>}
                  {index % 2 !== 0 && <p className="text-sm text-zinc-500">{item.body}</p>}
                </div>
                <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-indigo-400/40 bg-indigo-500/15 font-mono text-xs font-bold text-indigo-300 sm:h-14 sm:w-14">
                  {item.step}
                </span>
                <div className="mt-4 sm:mt-0 sm:text-left">
                  <p className="text-lg font-semibold sm:hidden">{item.title}</p>
                  <p className="mt-1 text-sm text-zinc-500 sm:hidden">{item.body}</p>
                  {index % 2 !== 0 && <p className="hidden text-lg font-semibold sm:block">{item.title}</p>}
                  {index % 2 === 0 && <p className="hidden text-sm text-zinc-500 sm:block">{item.body}</p>}
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-indigo-50">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">Roadmap</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
            한 번으로 끝내지 않습니다
          </h2>
          <div className="mx-auto mt-12 grid max-w-4xl gap-9 sm:grid-cols-3 sm:gap-0">
            {plans.map((plan, index) => (
              <div
                key={plan.title}
                className="relative px-3 text-center sm:px-8 sm:not-last:border-r sm:not-last:border-indigo-200"
              >
                <span className="inline-flex rounded-full bg-white px-3 py-1 text-xs font-semibold text-indigo-600 shadow-sm">
                  {plan.label}
                </span>
                <h3 className="mt-4 text-lg font-bold text-zinc-900">{plan.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-zinc-600">{plan.body}</p>
                {index < plans.length - 1 && (
                  <span className="mx-auto mt-9 block h-px w-12 bg-indigo-200 sm:hidden" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="survey" className="scroll-mt-14 bg-[#f7f7fa]">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-28">
          <div className="rounded-[2rem] bg-white px-5 py-8 text-center shadow-[0_20px_70px_rgba(24,24,27,.08)] ring-1 ring-zinc-950/5 sm:px-12 sm:py-12">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-500">1 minute survey</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-zinc-950 sm:text-4xl">
              의견을 들려주세요
            </h2>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-500">
              참여 규모와 원하는 내용을 확인해 실제 운영에 반영합니다.
            </p>
            <VibecodingInterestForm />
          </div>
        </div>
      </section>
    </>
  );
}
