// 공지·소식(대외 공개). 베타 모집 같은 글이 여기 하나의 항목으로 발행됨.
// 지금은 데이터 배열 — 다음 단계에서 MDX 파일 기반으로 이관 예정.
export type Post = {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  excerpt: string;
  productTag?: string; // products.tag 와 매칭 (예: "loen")
  body: string; // 본문 (마크다운 텍스트, 추후 MDX)
};

// 베타 안내는 개별 전송용 /beta 페이지로 분리(공개 소식 아님).
// 공개 소식이 생기면 여기에 추가.
export const posts: Post[] = [];

export function getPost(slug: string) {
  return posts.find((p) => p.slug === slug);
}
