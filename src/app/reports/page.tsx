import type { Metadata } from "next";
import { reportProjects } from "@/lib/reports";

// 보고는 검색 비노출 (링크 아는 사람만)
export const metadata: Metadata = {
  title: "활동 보고",
  robots: { index: false, follow: false },
};

export default function ReportsPage() {
  const hasAny = reportProjects.some((p) => p.docs.length > 0);

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">활동 보고</h1>
      <p className="mt-3 text-zinc-600">
        프로젝트별 활동 보고 모음. 이 페이지는 검색에 노출되지 않습니다.
      </p>

      {!hasAny ? (
        <p className="mt-12 text-zinc-400">아직 등록된 보고가 없습니다.</p>
      ) : (
        <div className="mt-12 space-y-14">
          {reportProjects.map((proj) => {
            const docs = [...proj.docs].sort((a, b) => b.date.localeCompare(a.date));
            if (docs.length === 0) return null;
            return (
              <section key={proj.slug}>
                <div className="flex items-baseline gap-3">
                  <h2 className="text-xl font-semibold text-zinc-900">{proj.name}</h2>
                  <span className="text-sm text-zinc-400">{docs.length}건</span>
                </div>
                {proj.description && (
                  <p className="mt-1 text-sm text-zinc-500">{proj.description}</p>
                )}
                <ul className="mt-4 divide-y divide-zinc-200 border-t border-zinc-200">
                  {docs.map((doc) => (
                    <li key={doc.slug}>
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block py-4 transition-colors hover:text-indigo-600"
                      >
                        <div className="flex items-baseline gap-4">
                          <time className="shrink-0 text-sm text-zinc-400">{doc.date}</time>
                          <span className="font-medium text-zinc-900">{doc.title}</span>
                        </div>
                        {doc.summary && (
                          <p className="mt-1 pl-[4.5rem] text-sm text-zinc-500">{doc.summary}</p>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </div>
      )}
    </div>
  );
}
