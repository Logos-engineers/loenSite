// 제품 = 데이터. 새 제품은 이 배열에 한 줄(객체) 추가하면 목록·상세가 자동 생성됨.
export type ProductStatus = "beta" | "active" | "planning" | "archived";

export type Download = {
  platform: "android" | "ios" | "web";
  label: string;
  href: string; // APK 링크 / TestFlight 초대 / 웹 URL. 변동 시 여기만 교체.
  note?: string;
};

export type Product = {
  slug: string;
  name: string;
  oneLiner: string;
  status: ProductStatus;
  // 상세 본문(섹션). 길어지면 추후 MDX로 이관.
  about: string;
  features: { title: string; desc: string }[];
  downloads: Download[];
  // 관련 소식 필터용 태그 (posts.productTag 와 매칭)
  tag: string;
};

export const products: Product[] = [
  {
    slug: "loen",
    // 앱 정식 명칭 미발표 — 임시로 "loen app" 표기
    name: "loen app",
    oneLiner: "설교 복습·신앙노트·오이코스를 한 앱에서. 청년부를 위한 신앙 앱.",
    status: "beta",
    tag: "loen",
    about:
      "loen app은 교회 청년부 공동체를 위해 만든 신앙 앱입니다. 설교를 다시 곱씹는 복습(OBS), 나의 신앙노트, 우리 그룹(오이코스) 활동을 한 곳에서 이어갑니다. 현재 정식 출시 전 베타 단계입니다.",
    features: [
      { title: "설교 복습(OBS)", desc: "빈칸·퀴즈·적용으로 설교를 다시 새깁니다." },
      { title: "신앙노트", desc: "주차별로 나의 묵상과 적용을 기록합니다." },
      { title: "오이코스", desc: "우리 그룹의 구성원과 활동을 함께 관리합니다." },
    ],
    downloads: [
      // 빌드 링크 준비되면 href 교체. iOS는 TestFlight 초대 링크.
      { platform: "android", label: "Android (베타 APK)", href: "", note: "설치 시 '출처 불명 앱 허용' 필요" },
      { platform: "ios", label: "iOS (TestFlight)", href: "", note: "TestFlight 앱 설치 후 초대 수락" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
