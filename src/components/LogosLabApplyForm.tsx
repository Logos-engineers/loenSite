"use client";

import { useRef, useState } from "react";
import type { FormEvent } from "react";
import {
  logosLabActivityValues,
  logosLabAiToolValues,
  logosLabFirstSession,
  logosLabFirstSessionValues,
} from "@/lib/logos-lab";

const activities: { value: (typeof logosLabActivityValues)[number]; desc: string }[] = [
  { value: "바이브코딩", desc: "입문 교육 · 직접 만들어보기" },
  { value: "단발성 모임", desc: "주제 하나 · 하루 세팅" },
  { value: "커뮤니티", desc: "질문 · 사례 공유 채널" },
];

const inputClass =
  "mt-2 w-full rounded-2xl border border-[#d8e0ea] bg-[#fbfaf7] px-4 py-3.5 text-sm text-[#182f46] outline-none transition placeholder:text-[#8a97a6] focus:border-[#285b91] focus:bg-white focus:ring-4 focus:ring-[#bcebd7]/60";

const chipClass =
  "flex min-h-14 cursor-pointer items-center justify-center rounded-2xl border border-[#d8e0ea] bg-white px-3 py-3 text-sm font-semibold text-[#182f46] transition hover:border-[#285b91] has-checked:border-[#173554] has-checked:bg-[#173554] has-checked:text-white";

export default function LogosLabApplyForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(false);
    const data = new FormData(event.currentTarget);
    const selected = data.getAll("activity").map(String);

    if (selected.length === 0) {
      setError("참여하고 싶은 활동을 하나 이상 골라주세요.");
      return;
    }

    setError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/logos-lab-apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          phone: String(data.get("phone") ?? "").trim(),
          oikos: String(data.get("oikos") ?? "").trim(),
          activities: selected,
          aiTool: String(data.get("aiTool") ?? ""),
          firstSession: String(data.get("firstSession") ?? ""),
          note: String(data.get("note") ?? "").trim(),
          website: String(data.get("website") ?? ""),
        }),
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
    <form ref={formRef} onSubmit={submit} className="mt-10 space-y-10 text-left">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label>
          웹사이트
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset>
        <legend>
          <span className="font-mono text-xs font-bold text-[#285b91]">01</span>
          <span className="mt-1 block text-base font-bold text-[#182f46]">누구인지 알려주세요</span>
        </legend>
        <div className="mt-5 grid gap-3 sm:grid-cols-3">
          <label className="text-sm font-semibold text-[#3d5066]">
            이름 <span className="text-[#285b91]">*</span>
            <input name="name" required maxLength={50} autoComplete="name" placeholder="이름" className={inputClass} />
          </label>
          <label className="text-sm font-semibold text-[#3d5066]">
            연락처 <span className="text-[#285b91]">*</span>
            <input
              name="phone"
              type="tel"
              required
              inputMode="tel"
              autoComplete="tel"
              pattern="[0-9+\-\s()]{8,20}"
              placeholder="010-0000-0000"
              className={inputClass}
            />
          </label>
          <label className="text-sm font-semibold text-[#3d5066]">
            오이코스 <span className="font-normal text-[#8a97a6]">선택</span>
            <input name="oikos" maxLength={50} placeholder="예: 5-2" className={inputClass} />
          </label>
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className="font-mono text-xs font-bold text-[#285b91]">02</span>
          <span className="mt-1 block text-base font-bold text-[#182f46]">어떤 활동에 참여하고 싶나요?</span>
          <span className="mt-1 block text-xs font-normal text-[#8a97a6]">여러 개 선택할 수 있어요</span>
        </legend>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-3">
          {activities.map((item) => (
            <label
              key={item.value}
              className="relative flex min-h-24 cursor-pointer flex-col justify-center rounded-2xl border border-[#d8e0ea] bg-white px-5 py-4 transition hover:border-[#285b91] has-checked:border-[#173554] has-checked:bg-[#173554]"
            >
              <input type="checkbox" name="activity" value={item.value} className="peer sr-only" />
              <span
                className="absolute right-4 top-4 flex h-5 w-5 items-center justify-center rounded-full border border-[#c6d0dc] text-[11px] text-transparent transition peer-checked:border-[#bcebd7] peer-checked:bg-[#bcebd7] peer-checked:text-[#173554]"
                aria-hidden="true"
              >
                ✓
              </span>
              <span className="block text-base font-bold text-[#182f46] peer-checked:text-white">{item.value}</span>
              <span className="mt-1 block text-xs text-[#6b7a8c] peer-checked:text-[#bcebd7]">{item.desc}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className="font-mono text-xs font-bold text-[#285b91]">03</span>
          <span className="mt-1 block text-base font-bold text-[#182f46]">쓰고 있는 AI는 무엇인가요?</span>
          <span className="mt-1 block text-xs font-normal text-[#8a97a6]">Claude · ChatGPT · Gemini 중 하나면 충분해요. 아직 없어도 괜찮아요.</span>
        </legend>
        <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-4">
          {logosLabAiToolValues.map((value) => (
            <label key={value} className={chipClass}>
              <input type="radio" name="aiTool" value={value} required className="sr-only" />
              {value}
            </label>
          ))}
        </div>
      </fieldset>

      <fieldset>
        <legend>
          <span className="font-mono text-xs font-bold text-[#285b91]">04</span>
          <span className="mt-1 block text-base font-bold text-[#182f46]">
            1차 입문 교육 · {logosLabFirstSession.date} {logosLabFirstSession.time}
          </span>
          <span className="mt-1 block text-xs font-normal text-[#8a97a6]">참여가 어려우면 다른 날짜로 조율해요.</span>
        </legend>
        <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
          {logosLabFirstSessionValues.map((value) => (
            <label key={value} className={chipClass}>
              <input type="radio" name="firstSession" value={value} required className="sr-only" />
              {value}
            </label>
          ))}
        </div>
      </fieldset>

      <label className="block border-t border-[#e6ebf1] pt-7 text-sm font-semibold text-[#3d5066]">
        만들어보고 싶은 것 <span className="font-normal text-[#8a97a6]">선택</span>
        <input name="note" maxLength={200} placeholder="있다면 짧게 적어주세요" className={inputClass} />
      </label>

      {isSubmitted && (
        <p role="status" className="rounded-2xl bg-[#bcebd7]/50 px-4 py-3 text-sm font-medium text-[#173554]">
          신청이 접수됐어요. 연락처로 일정과 준비 안내를 드릴게요.
        </p>
      )}

      {error && (
        <p role="alert" className="rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-600">
          {error}
        </p>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-full bg-[#173554] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#173554]/15 transition hover:-translate-y-0.5 hover:bg-[#285b91] disabled:cursor-wait disabled:opacity-60 disabled:hover:translate-y-0 sm:w-auto"
        >
          {isSubmitting ? "보내는 중..." : "참여 신청하기"}
          {!isSubmitting && <span className="ml-2" aria-hidden="true">→</span>}
        </button>
        <p className="mt-4 text-xs leading-5 text-[#8a97a6]">
          입력한 정보는 모임 운영과 일정 안내에만 사용합니다.
        </p>
      </div>
    </form>
  );
}
