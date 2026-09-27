// 로고스 랩 모집 폼 선택지 — db/schema.sql 의 logos_lab_applications 제약과 1:1
export const logosLabActivityValues = ["바이브코딩", "단발성 모임", "커뮤니티"] as const;
export const logosLabAiToolValues = ["Claude", "ChatGPT", "Gemini", "아직 없음"] as const;
export const logosLabFirstSessionValues = ["참여 가능", "일정 조율 필요"] as const;

export const logosLabFirstSession = {
  date: "10월 11일(토)",
  time: "13:00 ~ 16:00",
  place: "4층 로엔 동아리방",
} as const;
