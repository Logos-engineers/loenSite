// 서버 전용 노션 헬퍼 — 테스터 정원/현재 인원/행 추가.
// (apply-tester 서버액션과 모집 페이지에서 공용)

const NOTION_BASE = "https://api.notion.com/v1";
const NOTION_VERSION = "2025-09-03";

// 구글 플레이 비공개 테스트 최소 인원
export const TESTER_CAPACITY = 12;

function cfg() {
  return {
    token: process.env.NOTION_API_TOKEN,
    dataSourceId: process.env.NOTION_DATA_SOURCE_ID,
  };
}

function headers(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    "Notion-Version": NOTION_VERSION,
    "Content-Type": "application/json",
  };
}

// 현재 신청 인원 수. 설정 누락·오류 시 null (호출부에서 '폼 열어둠'으로 안전 처리).
export async function getTesterCount(): Promise<number | null> {
  const { token, dataSourceId } = cfg();
  if (!token || !dataSourceId) return null;

  try {
    let count = 0;
    let cursor: string | undefined;
    do {
      const res = await fetch(`${NOTION_BASE}/data_sources/${dataSourceId}/query`, {
        method: "POST",
        headers: headers(token),
        cache: "no-store",
        body: JSON.stringify({
          page_size: 100,
          ...(cursor ? { start_cursor: cursor } : {}),
        }),
      });
      if (!res.ok) {
        console.error("[notion-tester] count error", res.status, await res.text());
        return null;
      }
      const data = await res.json();
      count += data.results?.length ?? 0;
      cursor = data.has_more ? data.next_cursor : undefined;
    } while (cursor);
    return count;
  } catch (e) {
    // Next 의 동적 렌더 전환 신호는 삼키지 말고 다시 던짐
    if (e && typeof e === "object" && "digest" in e && e.digest === "DYNAMIC_SERVER_USAGE")
      throw e;
    console.error("[notion-tester] count fetch 실패", e);
    return null;
  }
}

// 신청 행 추가. 성공 true.
export async function createTesterRow(input: {
  name: string;
  gmail: string;
  phone?: string;
}): Promise<boolean> {
  const { token, dataSourceId } = cfg();
  if (!token || !dataSourceId) {
    console.error("[notion-tester] 환경변수 누락: NOTION_API_TOKEN/NOTION_DATA_SOURCE_ID");
    return false;
  }

  try {
    const res = await fetch(`${NOTION_BASE}/pages`, {
      method: "POST",
      headers: headers(token),
      cache: "no-store",
      body: JSON.stringify({
        parent: { type: "data_source_id", data_source_id: dataSourceId },
        properties: {
          이름: { title: [{ text: { content: input.name } }] },
          Gmail: { email: input.gmail },
          ...(input.phone ? { 핸드폰: { phone_number: input.phone } } : {}),
          상태: { select: { name: "신청" } },
        },
      }),
    });
    if (!res.ok) {
      console.error("[notion-tester] create error", res.status, await res.text());
      return false;
    }
    return true;
  } catch (e) {
    console.error("[notion-tester] create fetch 실패", e);
    return false;
  }
}
