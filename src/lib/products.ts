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
  // 앱 아이콘/로고 (public 기준 경로). 없으면 미표시.
  logo?: string;
  // 상세 본문(섹션). 길어지면 추후 MDX로 이관.
  about: string;
  features: { title: string; desc: string }[];
  downloads: Download[];
  // 관련 소식 필터용 태그 (posts.productTag 와 매칭)
  tag: string;
  // true 면 상세를 비공개하고 "곧 공개" 연출만 노출 (홈 카드도 가림)
  comingSoon?: boolean;
};

export const products: Product[] = [
  {
    slug: "loen",
    name: "onu(온유)",
    oneLiner: "설교 복습·신앙노트·오이코스를 한 앱에서. 청년부를 위한 신앙 앱.",
    status: "active",
    logo: "/onu-logo.png",
    tag: "loen",
    about:
      "onu(온유)는 교회 청년부 공동체를 위해 만든 신앙 앱입니다. 설교를 다시 곱씹는 복습(OBS), 나의 신앙노트, 우리 그룹(오이코스) 활동을 한 곳에서 이어갑니다. 이제 App Store와 Google Play에서 만나보실 수 있습니다.",
    features: [
      { title: "설교 복습(OBS)", desc: "빈칸·퀴즈·적용으로 설교를 다시 새깁니다." },
      { title: "신앙노트", desc: "주차별로 나의 묵상과 적용을 기록합니다." },
      { title: "오이코스", desc: "우리 그룹의 구성원과 활동을 함께 관리합니다." },
    ],
    downloads: [
      { platform: "android", label: "Android (Google Play)", href: "https://play.google.com/store/apps/details?id=com.loen.app&hl=ko" },
      { platform: "ios", label: "iOS (App Store)", href: "https://apps.apple.com/kr/app/on-u/id6779048910" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}
