// 동아리·사이트 전역 설정. 브랜드(이름/도메인) 확정되면 여기만 고치면 됨.
// 동아리 = loen, 소속 교회 = Logos.
export const site = {
  name: "Loen",
  tagline: "만들어서 섬기다.",
  description:
    "Loen은 Logos 교회 청년부의 개발 동아리입니다. 우리가 직접 만든 서비스와 소식을 한곳에 모았습니다.",
  url: "https://loenstudio.dev",
  contactEmail: "contact@loenstudio.dev",
  discordUrl: "", // 베타 모집용 디스코드 초대 링크
  githubUrl: "https://github.com/Logos-engineers",
} as const;

export const nav = [
  { href: "/products", label: "제품" },
  { href: "/posts", label: "소식" },
  { href: "/about", label: "소개" },
  // /reports 는 noindex·링크온리라 글로벌 네비에 노출하지 않음
] as const;
