// 동아리 멤버 = 데이터. 새 멤버는 이 배열에 객체 하나 추가하면 소개 페이지에 자동 노출됨.
export type Member = {
  name: string;
  role: string; // 역할 (예: 개발 · 기획)
  image?: string; // public 기준 경로 (반신 일러스트/사진). 없으면 이니셜 표시.
  bio?: string; // 한 줄 소개
  links?: { label: string; href: string }[]; // GitHub·개인 링크 등 (선택)
};

export const members: Member[] = [
  {
    name: "남현서",
    role: "개발 · 팀장",
    image: "/members/namhyunseo.png",
    bio: "onu(온유)를 만들고 있어요.",
  },
  {
    name: "박채연",
    role: "기획",
  },
  {
    name: "이윤재",
    role: "디자인",
  },
];
