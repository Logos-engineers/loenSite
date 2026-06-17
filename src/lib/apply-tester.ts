"use server";

// 테스터 신청 → 검증 + (안드로이드) 정원 확인 + 노션 DB 행 추가.
import {
  TESTER_CAPACITY,
  getTesterCount,
  createTesterRow,
  type Platform,
} from "./notion-tester";

export type ApplyState = { ok: boolean; error?: string } | null;

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function applyTester(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const platform: Platform =
    formData.get("platform") === "iOS" ? "iOS" : "Android";

  if (!name) return { ok: false, error: "이름을 입력해주세요." };
  if (!EMAIL_RE.test(email))
    return { ok: false, error: "이메일 주소를 정확히 입력해주세요." };

  // 안드로이드만 정원 마감 (직접 제출 방어)
  if (platform === "Android") {
    const count = await getTesterCount("Android");
    if (count !== null && count >= TESTER_CAPACITY)
      return {
        ok: false,
        error: "앗, 방금 정원이 가득 찼어요. 관심 가져주셔서 감사합니다!",
      };
  }

  const ok = await createTesterRow({
    name,
    email,
    phone: phone || undefined,
    platform,
  });
  if (!ok)
    return { ok: false, error: "접수 중 문제가 생겼어요. 잠시 후 다시 시도해주세요." };

  return { ok: true };
}
