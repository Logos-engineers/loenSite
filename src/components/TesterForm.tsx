"use client";

import { useActionState, useEffect, useRef, useState } from "react";
import { applyTester, type ApplyState } from "@/lib/apply-tester";
import type { Platform } from "@/lib/notion-tester";

const inputClass =
  "mt-1.5 w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none transition-colors focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const COPY: Record<
  Platform,
  {
    emailLabel: string;
    emailPlaceholder: string;
    emailHelp: string;
    confirmEmailLabel: string;
    successDesc: string;
  }
> = {
  Android: {
    emailLabel: "구글 계정 (Gmail)",
    emailPlaceholder: "you@gmail.com",
    emailHelp: "플레이 스토어 테스터 등록에 쓰는 주소예요. 정확히 입력해주세요.",
    confirmEmailLabel: "Gmail",
    successDesc:
      "운영진이 테스터 명단에 등록한 뒤, 설치용 초대 링크를 보내드릴게요.",
  },
  iOS: {
    emailLabel: "Apple ID (이메일)",
    emailPlaceholder: "you@example.com",
    emailHelp: "TestFlight 초대에 쓰는 Apple ID 이메일이에요. 정확히 입력해주세요.",
    confirmEmailLabel: "Apple ID",
    successDesc:
      "운영진이 TestFlight로 초대드릴게요. TestFlight 앱에서 설치하시면 돼요.",
  },
};

export default function TesterForm({
  platform = "Android",
}: {
  platform?: Platform;
}) {
  const copy = COPY[platform];
  const [state, action, pending] = useActionState<ApplyState, FormData>(
    applyTester,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [clientError, setClientError] = useState<string | null>(null);

  // 서버에서 에러가 오면 모달을 닫고 폼에 메시지를 보여줌
  useEffect(() => {
    if (state?.error) setConfirmOpen(false);
  }, [state]);

  if (state?.ok) {
    return (
      <div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <p className="text-2xl">🎉</p>
        <p className="mt-2 font-semibold text-emerald-800">신청이 접수됐어요!</p>
        <p className="mt-1 text-sm text-emerald-700">{copy.successDesc}</p>
      </div>
    );
  }

  const review = () => {
    if (!name.trim()) {
      setClientError("이름을 입력해주세요.");
      return;
    }
    if (!EMAIL_RE.test(email.trim())) {
      setClientError(`${copy.emailLabel} 주소를 정확히 입력해주세요.`);
      return;
    }
    setClientError(null);
    setConfirmOpen(true);
  };

  return (
    <>
      <form ref={formRef} action={action} className="mt-10 space-y-5">
        <input type="hidden" name="platform" value={platform} />
        <div>
          <label htmlFor="name" className="text-sm font-medium text-zinc-700">
            이름 <span className="text-indigo-500">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="이름 또는 닉네임"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-medium text-zinc-700">
            {copy.emailLabel} <span className="text-indigo-500">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={copy.emailPlaceholder}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-zinc-400">{copy.emailHelp}</p>
        </div>

        <div>
          <label htmlFor="phone" className="text-sm font-medium text-zinc-700">
            핸드폰 번호
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="010-1234-5678"
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-zinc-400">
            테스트 공지용 카톡방 초대에 쓰여요. (선택)
          </p>
        </div>

        {(clientError || state?.error) && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            {clientError ?? state?.error}
          </p>
        )}

        <p className="text-center text-sm font-semibold text-indigo-600">
          아직 모집 중이에요! 🙌
        </p>
        <button
          type="button"
          onClick={review}
          className="w-full rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)] transition-all hover:-translate-y-0.5 hover:bg-indigo-400"
        >
          테스터 신청하기
        </button>
      </form>

      {/* 입력 내용 확인 모달 */}
      {confirmOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            aria-label="닫기"
            onClick={() => !pending && setConfirmOpen(false)}
            className="absolute inset-0 cursor-default bg-black/50 backdrop-blur-sm"
          />
          <div className="relative w-full max-w-sm animate-fade-up rounded-2xl bg-white p-6 shadow-xl">
            <h3 className="text-lg font-semibold text-zinc-900">
              입력 내용을 확인해주세요
            </h3>
            <p className="mt-1 text-sm text-zinc-500">
              이대로 신청할까요? {copy.confirmEmailLabel} 주소로 테스터 등록이
              진행돼요.
            </p>

            <dl className="mt-5 space-y-3 rounded-xl bg-zinc-50 p-4 text-sm">
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-zinc-500">이름</dt>
                <dd className="font-medium text-zinc-900">{name}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="w-16 shrink-0 text-zinc-500">
                  {copy.confirmEmailLabel}
                </dt>
                <dd className="break-all font-medium text-zinc-900">{email}</dd>
              </div>
              {phone.trim() && (
                <div className="flex gap-3">
                  <dt className="w-16 shrink-0 text-zinc-500">핸드폰</dt>
                  <dd className="font-medium text-zinc-900">{phone}</dd>
                </div>
              )}
            </dl>

            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => setConfirmOpen(false)}
                disabled={pending}
                className="flex-1 rounded-full border border-zinc-300 px-5 py-3 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50 disabled:opacity-60"
              >
                수정하기
              </button>
              <button
                type="button"
                onClick={() => formRef.current?.requestSubmit()}
                disabled={pending}
                className="flex-1 rounded-full bg-indigo-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {pending ? "접수 중…" : "신청 확정하기"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
