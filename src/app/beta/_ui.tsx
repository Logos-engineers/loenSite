// 베타 가이드 공용 UI 조각 (번호 step 카드 · 콜아웃).
// 라우트가 아닌 _ 접두어 폴더 안 파일이라 페이지로 노출되지 않음.
import type { ReactNode } from "react";

// 번호 매긴 설치 단계 카드 (번호 배지 + 제목 + 설명)
export function Step({
  n,
  title,
  children,
}: {
  n: number;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4 rounded-2xl border border-zinc-200 bg-white p-5">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500 text-sm font-bold text-white">
        {n}
      </div>
      <div className="min-w-0">
        <h3 className="font-semibold text-zinc-900">{title}</h3>
        <div className="mt-1.5 text-sm leading-relaxed text-zinc-600">
          {children}
        </div>
      </div>
    </div>
  );
}

// 강조 박스 — warn: 노란 톤(주의), tip: 보라 톤(팁)
export function Callout({
  tone = "tip",
  title,
  children,
}: {
  tone?: "tip" | "warn";
  title?: string;
  children: ReactNode;
}) {
  const styles =
    tone === "warn"
      ? "border-amber-200 bg-amber-50 text-amber-900"
      : "border-indigo-100 bg-indigo-50/60 text-indigo-900";
  const icon = tone === "warn" ? "⚠️" : "💡";
  return (
    <div className={`rounded-2xl border p-5 text-sm leading-relaxed ${styles}`}>
      {title && (
        <p className="flex items-center gap-2 font-semibold">
          <span>{icon}</span>
          {title}
        </p>
      )}
      <div className={title ? "mt-1.5" : ""}>{children}</div>
    </div>
  );
}

// 페이지 상단 "← 가이드 홈" 링크 (android/ios 전용)
export function BackToGuide() {
  return (
    <a
      href="/beta"
      className="inline-flex items-center gap-1 text-sm font-medium text-zinc-500 transition-colors hover:text-indigo-600"
    >
      ← 가이드 홈
    </a>
  );
}
