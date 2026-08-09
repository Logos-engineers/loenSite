// 동아리 멤버 = 데이터. 새 멤버는 이 배열에 객체 하나 추가하면 소개 페이지에 자동 노출됨.
export type Member = {
  name: string;
  role?: string; // 역할 (예: 개발 · 기획). 없으면 미표시.
  onu?: boolean; // true면 카드 우상단에 onu 메이커 뱃지 표시
  image?: string; // public 기준 경로 (반신 일러스트/사진). 없으면 이니셜 표시.
  bio?: string; // 한 줄 소개
  links?: { label: string; href: string }[]; // GitHub·개인 링크 등 (선택)
};

export const members: Member[] = [
  {
    name: "남현서",
    role: "개발 · 팀장",
    onu: true,
    image: "/members/namhyunseo.png",
  },
  {
    name: "박채연",
    role: "기획",
    onu: true,
    image: "/members/parkchaeyeon.png",
  },
  {
    name: "이윤재",
    role: "디자인",
    onu: true,
    image: "/members/leeyunjae.png",
  },
  { name: "김성혜" },
  { name: "이동훈" },
  { name: "백은섭" },
];
