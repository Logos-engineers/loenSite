"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import Image from "next/image";

const interests = [
  { value: "열리면 참여할게요", label: "참여할게요" },
  { value: "관심 있어요", label: "관심 있어요" },
  { value: "이번에는 어려워요", label: "이번엔 어려워요" },
];

const topics = [
  {
    icon: "/images/vibecoding/daily-ai.png",
    title: "AI를 일상에서 더 잘 쓰기",
    desc: "자료 정리 · 글쓰기 · 아이디어",
  },
  {
    icon: "/images/vibecoding/personal-webpage.png",
    title: "나만의 웹페이지 만들기",
    desc: "소개 · 포트폴리오 · 행사 안내",
  },
  {
    icon: "/images/vibecoding/community-tool.png",
    title: "모임에 필요한 도구 만들기",
    desc: "참석 취합 · 역할 배정 · 순서표",
  },
  {
    icon: "/images/vibecoding/automation.png",
    title: "반복되는 일 줄이기",
    desc: "문서 정리 · 계산 · 업무 자동화",
  },
  {
    icon: "/images/vibecoding/ai-agent.png",
    title: "AI에게 일을 맡겨보기",
    desc: "여러 단계를 처리하는 에이전트",
  },
  {
    icon: "/images/vibecoding/explore.png",
    title: "먼저 가능성 둘러보기",
    desc: "사례를 보고 내 아이디어 찾기",
  },
];

const inputClass =
  "mt-2 w-full rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3.5 text-center text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:border-indigo-400 focus:bg-white focus:ring-4 focus:ring-indigo-100";

export default function VibecodingInterestForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    const data = new FormData(event.currentTarget);
    const selectedTopics = data.getAll("topic").map(String);

    if (selectedTopics.length === 0) {
      setError("해보고 싶은 항목을 하나 이상 골라주세요.");
      return;
    }

    const name = String(data.get("name") ?? "").trim();
    const oikos = String(data.get("oikos") ?? "").trim();
    const interest = String(data.get("interest") ?? "");
    const website = String(data.get("website") ?? "");

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/vibecoding-interest", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, oikos, interest, topics: selectedTopics, website }),
      });
      const result = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(result.message || "저장하지 못했습니다. 잠시 후 다시 시도해 주세요.");
      }

      formRef.current?.reset();
      setIsSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form ref={formRef} onSubmit={submit} className="mt-10 space-y-10 text-center">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          웹사이트
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <fieldset>
        <legend className="w-full text-center">
          <span className="font-mono text-xs font-bold text-indigo-500">01</span>
          <span className="mt-1 block text-base font-bold text-zinc-900">누구인지 알려주세요</span>
        </legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <label className="text-sm font-semibold text-zinc-700">
            이름 <span className="text-indigo-500">*</span>
            <input
              name="name"
              required
              autoComplete="name"
              placeholder="이름"
              className={inputClass}
            />
          </label>
          <label className="text-sm font-semibold text-zinc-700">
            오이코스 <span className="font-normal text-zinc-400">선택</span>
            <input name="oikos" placeholder="예: 5-2" className={inputClass} />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend className="w-full text-center">
          <span className="font-mono text-xs font-bold text-indigo-500">02</span>
          <span className="mt-1 block text-base font-bold text-zinc-900">참여 의향이 있나요?</span>
        </legend>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {interests.map((item) => (
            <label
              key={item.value}
              className="flex min-h-16 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-3 text-sm font-semibold text-zinc-700 transition hover:border-indigo-300 has-checked:border-indigo-500 has-checked:bg-indigo-50 has-checked:text-indigo-800"
            >
              <input type="radio" name="interest" value={item.value} required className="sr-only" />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend className="w-full text-center">
          <span className="font-mono text-xs font-bold text-indigo-500">03</span>
          <span className="mt-1 block text-base font-bold text-zinc-900">어떤 걸 해보고 싶나요?</span>
          <span className="mt-1 block text-xs font-normal text-zinc-400">여러 개 선택할 수 있어요</span>
        </legend>
        <div className="mt-5 grid grid-cols-2 gap-2.5">
          {topics.map((topic) => (
            <label
              key={topic.title}
              className="relative flex min-h-32 cursor-pointer flex-col items-center justify-center rounded-2xl border border-zinc-200 bg-white px-3 py-4 text-center transition hover:border-indigo-300 has-checked:border-indigo-500 has-checked:bg-indigo-50/80 sm:min-h-28 sm:px-5"
            >
              <input type="checkbox" name="topic" value={topic.title} className="peer sr-only" />
              <span
                className="absolute right-3.5 top-3.5 flex h-5 w-5 items-center justify-center rounded-full border border-zinc-300 text-[11px] text-transparent transition peer-checked:border-indigo-500 peer-checked:bg-indigo-500 peer-checked:text-white"
                aria-hidden="true"
              >
                ✓
              </span>
              <Image
                src={topic.icon}
                alt=""
                width={48}
                height={48}
                className="h-10 w-10 object-contain sm:h-12 sm:w-12"
              />
              <span className="mt-2 block text-xs font-bold leading-5 text-zinc-800 sm:text-sm">{topic.title}</span>
              <span className="mt-1 block text-[11px] leading-4 text-zinc-500 sm:text-xs">{topic.desc}</span>
            </label>
          ))}
        </div>
      </fieldset>

      {isSubmitted && (
        <p role="status" className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          의견을 보내주셔서 감사합니다. 일정이 정해지면 안내드릴게요.
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-zinc-950 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-zinc-950/10 transition hover:-translate-y-0.5 hover:bg-indigo-600 disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
        >
          {isSubmitting ? "보내는 중..." : "수요 조사 보내기"}
          {!isSubmitting && <span className="ml-2" aria-hidden="true">→</span>}
        </button>
        <p className="mt-4 text-xs leading-5 text-zinc-400">
          입력한 정보는 교육 수요 파악과 일정 안내에만 사용합니다.
        </p>
      </div>
    </form>
  );
}
