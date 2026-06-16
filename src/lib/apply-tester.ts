"use server";

// 안드로이드 테스터 신청 → 검증 + 정원 확인 + 노션 DB 행 추가.
import { TESTER_CAPACITY, getTesterCount, createTesterRow } from "./notion-tester";

export type ApplyState = { ok: boolean; error?: string } | null;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function applyTester(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const name = String(formData.get("name") ?? "").trim();
  const gmail = String(formData.get("gmail") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();

  if (!name) return { ok: false, error: "이름을 입력해주세요." };
  if (!EMAIL_RE.test(gmail))
    return { ok: false, error: "구글 계정(Gmail) 주소를 정확히 입력해주세요." };

  // 마감 방어 — 폼이 닫혔어도 직접 제출되는 경우를 막음
  const count = await getTesterCount();
  if (count !== null && count >= TESTER_CAPACITY)
    return {
      ok: false,
      error: "앗, 방금 정원이 가득 찼어요. 관심 가져주셔서 감사합니다!",
    };

  const ok = await createTesterRow({ name, gmail, phone: phone || undefined });
  if (!ok)
    return { ok: false, error: "접수 중 문제가 생겼어요. 잠시 후 다시 시도해주세요." };

  return { ok: true };
}
