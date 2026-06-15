// 활동 보고 — 프로젝트 단위로 묶인 "독립 HTML 문서".
// 보고 본문은 완성 HTML(자체 디자인 포함)을 public/reports/<project>/ 에 둔다.
// 사이트는 목록만 제공하고, 클릭하면 그 HTML 문서가 그대로 열린다. 전체 noindex.
//
// 새 보고 추가 절차:
//   1) public/reports/<project>/<파일>.html 추가
//   2) 아래 해당 프로젝트의 docs 배열에 한 줄 등록

export type ReportDoc = {
  slug: string; // 파일명(확장자 제외)
  title: string;
  date: string; // YYYY-MM-DD
  file: string; // public 기준 경로 — 클릭 시 열리는 독립 HTML (예: /reports/loen/2026-06-15.html)
  summary?: string;
};

export type ReportProject = {
  slug: string; // 프로젝트 폴더명
  name: string; // 표시 이름
  description?: string;
  docs: ReportDoc[];
};

export const reportProjects: ReportProject[] = [
  {
    slug: "loen",
    name: "loen app",
    description: "청년부 신앙 앱 개발 프로젝트",
    docs: [
      {
        slug: "2026-06-15-example",
        title: "[예시] 활동 보고 — 이렇게 들어갑니다",
        date: "2026-06-15",
        file: "/reports/loen/2026-06-15-example.html",
        summary: "에이전트가 만든 독립 HTML 문서. 이 줄을 클릭하면 새 탭으로 열립니다.",
      },
    ],
  },
];

export function getReportProject(slug: string) {
  return reportProjects.find((p) => p.slug === slug);
}
