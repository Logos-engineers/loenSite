import type { Metadata } from "next";
import Image from "next/image";
import LogosLabApplyForm from "@/components/LogosLabApplyForm";
import { logosLabFirstSession } from "@/lib/logos-lab";

export const metadata: Metadata = {
  title: "로고스 랩 — 청년부 AI 활용 교육",
  description:
    "단순 채팅을 넘어 AI를 한 명의 동료로 만드는 청년부 메이커 모임. 코딩 경험 없이, 소규모로, 무료.",
  openGraph: {
    title: "로고스 랩 · AI를 단순 채팅에서 동료로",
    description: "청년부 AI 활용 교육 · 메이커 모임 참여자를 모집합니다.",
  },
};

const identity = [
  { title: "동료처럼", body: "교회 동역자나 회사 동료처럼" },
  { title: "제 몫을 하는", body: "제 몫을 해내는 AI 에이전트" },
  { title: "내 문제 해결", body: "내 문제를 해결하는 도구 만들기" },
];

type Activity = {
  no: string;
  title: string;
  label: string;
  headline: string;
  sub: string;
  itemsLabel?: string;
  items: { title: string; desc: string }[];
  more?: string;
  image: string;
};

const activities: Activity[] = [
  {
    no: "활동 ①",
    title: "바이브코딩",
    label: "목표",
    headline: "직접 만들어보는 경험",
    sub: "완성도 높은 서비스 제작이 아님",
    itemsLabel: "예시",
    items: [
      { title: "랜딩 페이지", desc: "제품·서비스 소개" },
      { title: "모바일 청첩장", desc: "결혼식 초대" },
      { title: "포트폴리오", desc: "커리어 소개" },
    ],
    more: "이 외에도 각자 만들고 싶은 것 무엇이든",
    image: "/images/logos-lab/learning.png",
  },
  {
    no: "활동 ②",
    title: "단발성 모임",
    label: "형식",
    headline: "주제 하나, 하루 세팅",
    sub: "실제로 많이 쓰는 AI 기술 하나를 골라 하루 안에 세팅까지",
    itemsLabel: "예시",
    items: [
      { title: "업무 자동화 시스템", desc: "반복 업무를 AI에게" },
      { title: "나만의 AI 지식 데이터베이스", desc: "내 자료를 AI가 기억" },
    ],
    more: "이 외에도 그때그때 관심 있는 AI 기술 하나씩",
    image: "/images/logos-lab/tools.png",
  },
  {
    no: "활동 ③",
    title: "커뮤니티",
    label: "참여",
    headline: "앞의 두 활동과 독립적으로 참여 가능",
    sub: "상시 채널 · 원할 때만",
    items: [
      { title: "막힘 해결 · 사례 공유", desc: "막힌 질문 · 만든 것 공유" },
      { title: "운영자 주 1회 공유", desc: "최근 써본 AI 도구 · 적용 사례" },
      { title: "4~6주 단기 프로젝트", desc: "각자 목표 하나, 결과물 하나" },
    ],
    image: "/images/logos-lab/community.png",
  },
];

const facts = [
  { label: "대상", value: "청년부 누구나", note: "코딩 경험 불필요" },
  { label: "인원", value: "회차당 2~5명", note: "소규모로 함께 제작" },
  { label: "일정 · 장소", value: "토요일 13~16시", note: `${logosLabFirstSession.place} · 3시간` },
  { label: "비용", value: "무료 · 재능기부", note: "AI 구독료만 개인 부담" },
  { label: "준비물", value: "노트북 + AI 1개", note: "Claude · ChatGPT · Gemini 중" },
  { label: "기간", value: "~2026년 12월", note: "1차 운영 후 지속 검토" },
];

export default function LogosLabPage() {
  return (
    <>
      {/* 01 필요성 */}
      <section className="relative isolate overflow-hidden bg-[#173554] text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 mx-auto h-[560px] max-w-5xl bg-[radial-gradient(circle_at_50%_0%,rgba(188,235,215,0.22),transparent_65%)]" />
        <div className="mx-auto grid min-h-[calc(100svh-3.5rem)] max-w-5xl items-center gap-12 px-5 py-20 sm:min-h-0 sm:px-6 sm:pb-24 sm:pt-32 lg:grid-cols-[1.15fr_1fr]">
          <div className="text-center lg:text-left">
            <Image
              src="/images/logos-lab/lockup-white.png"
              alt="LOGOS LAB"
              width={220}
              height={60}
              priority
              className="mx-auto h-auto w-44 lg:mx-0"
            />
            <p className="mt-8 text-xs font-semibold uppercase tracking-[0.22em] text-[#bcebd7]">
              청년부 AI 활용 교육 · 메이커 모임
            </p>
            <h1 className="mt-5 text-balance text-[2.6rem] font-bold leading-[1.1] tracking-[-0.04em] sm:text-6xl">
              AI를
              <span className="block">
                단순 채팅에서 <span className="text-[#bcebd7]">동료로</span>
              </span>
            </h1>
            <p className="mt-6 text-pretty text-base leading-7 text-[#c9d6e4] sm:text-lg">
              직장 · 학업 · 사역 어디서든, <strong className="font-semibold text-white">주체적인 AI 활용</strong>
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-[#9fb3c8] lg:justify-start">
              <span>청년부 누구나</span>
              <span className="text-[#bcebd7]">•</span>
              <span>코딩 경험 불필요</span>
              <span className="text-[#bcebd7]">•</span>
              <span>무료</span>
              <span className="text-[#bcebd7]">•</span>
              <span>회차당 2~5명</span>
            </div>

            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
              <a
                href="#apply"
                className="inline-flex w-full items-center justify-center rounded-full bg-[#bcebd7] px-7 py-4 text-sm font-bold text-[#173554] shadow-[0_12px_40px_rgba(188,235,215,.25)] transition hover:-translate-y-0.5 hover:bg-white sm:w-auto"
              >
                참여 신청하기
                <span className="ml-2" aria-hidden="true">↓</span>
              </a>
              <p className="text-sm text-[#9fb3c8]">
                1차 입문 교육 · <span className="font-semibold text-white">{logosLabFirstSession.date} {logosLabFirstSession.time}</span>
              </p>
            </div>
          </div>
          <Image
            src="/images/logos-lab/maker.png"
            alt=""
            width={880}
            height={880}
            priority
            className="mx-auto hidden w-full max-w-md lg:block"
          />
        </div>
      </section>

      {/* 02 로고스 랩이란 */}
      <section className="bg-[#fbfaf7]">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#285b91]">로고스 랩이란</p>
          <h2 className="mt-4 text-balance text-3xl font-bold tracking-tight text-[#182f46] sm:text-5xl">
            AI를 <span className="text-[#285b91]">한 명의 동료로</span> 만드는 모임
          </h2>
          <div className="mt-14 grid gap-10 sm:grid-cols-3 sm:gap-8">
            {identity.map((item, i) => (
              <div key={item.title}>
                <span className="font-mono text-xs font-semibold text-[#285b91]">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-bold text-[#182f46]">{item.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-[#526374]">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03~05 활동 */}
      <section className="bg-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#285b91]">활동</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#182f46] sm:text-5xl">세 가지, 원하는 것만</h2>
          </div>

          <div className="mt-16 space-y-20 sm:mt-24 sm:space-y-28">
            {activities.map((act, i) => (
              <div
                key={act.title}
                className={`grid items-center gap-10 lg:grid-cols-2 lg:gap-16 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#285b91]">{act.no}</p>
                  <h3 className="mt-3 text-4xl font-bold tracking-tight text-[#182f46] sm:text-5xl">{act.title}</h3>
                  <div className="mt-8 border-l-4 border-[#bcebd7] pl-5">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a97a6]">{act.label}</p>
                    <p className="mt-1 text-2xl font-bold text-[#285b91]">{act.headline}</p>
                    <p className="mt-1 text-sm text-[#526374]">{act.sub}</p>
                  </div>
                  {act.itemsLabel && (
                    <p className="mt-8 text-xs font-bold uppercase tracking-[0.18em] text-[#8a97a6]">{act.itemsLabel}</p>
                  )}
                  <ol className={`divide-y divide-[#e6ebf1] border-y border-[#e6ebf1] ${act.itemsLabel ? "mt-3" : "mt-8"}`}>
                    {act.items.map((it, j) => (
                      <li key={it.title} className="flex items-baseline gap-4 py-4">
                        <span className="font-mono text-xs font-bold text-[#285b91]">0{j + 1}</span>
                        <div>
                          <p className="text-lg font-semibold text-[#182f46]">{it.title}</p>
                          <p className="text-sm text-[#526374]">{it.desc}</p>
                        </div>
                      </li>
                    ))}
                  </ol>
                  {act.more && <p className="mt-4 text-sm font-semibold text-[#285b91]">+ {act.more}</p>}
                </div>
                <Image
                  src={act.image}
                  alt=""
                  width={880}
                  height={880}
                  className="mx-auto w-full max-w-xs sm:max-w-sm"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 06 운영 개요 */}
      <section className="bg-[#173554] text-white">
        <div className="mx-auto max-w-5xl px-5 py-20 sm:px-6 sm:py-28">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bcebd7]">운영 개요</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">코딩 경험 없이, 소규모로 시작</h2>
          </div>
          <dl className="mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 ring-1 ring-white/10 sm:grid-cols-3">
            {facts.map((f) => (
              <div key={f.label} className="bg-[#173554] px-6 py-7">
                <dt className="text-xs font-bold uppercase tracking-[0.18em] text-[#bcebd7]">{f.label}</dt>
                <dd className="mt-3 text-2xl font-bold">{f.value}</dd>
                <dd className="mt-1 text-sm text-[#9fb3c8]">{f.note}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 07 참여 범위 · 09 일정 */}
      <section className="bg-[#fbfaf7]">
        <div className="mx-auto grid max-w-5xl gap-12 px-5 py-20 sm:px-6 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#285b91]">참여 범위</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#182f46] sm:text-4xl">청년부 안에서, 누구든 환영</h2>
            <ul className="mt-8 space-y-6">
              <li>
                <p className="text-lg font-semibold text-[#182f46]">청년부 구성원 누구나</p>
                <p className="mt-1 text-sm text-[#526374]">코딩 경험 · 나이 · 직군 상관없이</p>
              </li>
              <li>
                <p className="text-lg font-semibold text-[#182f46]">관심 있는 친구 초대 가능</p>
                <p className="mt-1 text-sm text-[#526374]">청년부 밖에서 데려와도 좋아요</p>
              </li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#285b91]">일정</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#182f46] sm:text-4xl">지금 모집 → 1차 입문 교육</h2>
            <ol className="mt-8 space-y-6">
              <li className="flex gap-4">
                <span className="mt-1 font-mono text-xs font-bold text-[#285b91]">01</span>
                <div>
                  <p className="text-lg font-semibold text-[#182f46]">지금 · 참여 신청</p>
                  <p className="mt-1 text-sm text-[#526374]">아래 폼으로 1분이면 끝</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="mt-1 font-mono text-xs font-bold text-[#285b91]">02</span>
                <div>
                  <p className="text-lg font-semibold text-[#182f46]">
                    {logosLabFirstSession.date} {logosLabFirstSession.time} · 1차 입문 교육
                  </p>
                  <p className="mt-1 text-sm text-[#526374]">{logosLabFirstSession.place} · 신청 인원에 맞춰 확정</p>
                </div>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* 왜 지금 */}
      <section className="bg-[#173554] text-white">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-28">
          <p className="text-balance text-3xl font-bold tracking-tight sm:text-5xl">AI 역량은 남의 일이 아닙니다.</p>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-base leading-7 text-[#c9d6e4] sm:text-xl">
            파워포인트처럼, AI를 잘 활용하는 것도 필수 역량이 되었습니다.
          </p>
        </div>
      </section>

      {/* 신청 */}
      <section id="apply" className="scroll-mt-14 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-28">
          <div className="rounded-[2rem] bg-[#fbfaf7] px-5 py-8 shadow-[0_20px_70px_rgba(23,53,84,.08)] ring-1 ring-[#173554]/5 sm:px-12 sm:py-12">
            <div className="text-center">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#285b91]">참여 신청</p>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#182f46] sm:text-4xl">함께 만들어요</h2>
              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#526374]">
                신청 후 연락처로 일정과 준비 안내를 드립니다.
              </p>
            </div>
            <LogosLabApplyForm />
          </div>
        </div>
      </section>

      {/* 08 소개 · 마무리 */}
      <section className="bg-[#173554] text-white">
        <div className="mx-auto max-w-5xl px-5 py-20 text-center sm:px-6 sm:py-24">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#bcebd7]">운영</p>
          <p className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">함께 성장</p>
          <p className="mt-6 text-sm text-[#9fb3c8]">
            운영 남현서 · 재능기부 · 로엔(Loen) 개발 동아리
          </p>
        </div>
      </section>
    </>
  );
}
