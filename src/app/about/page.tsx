import type { Metadata } from "next";
import { site } from "@/lib/site";
import { members } from "@/lib/members";

export const metadata: Metadata = { title: "소개" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{site.name} 소개</h1>
      <p className="mt-6 text-lg text-zinc-600">
        Loen은 Logos 교회 청년부의 개발 동아리입니다.
        <br />
        우리가 직접 만든 서비스와 소식을 한곳에 모았습니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold text-zinc-900">왜 만드나</h2>
      <p className="mt-3 text-zinc-600">
        {/* TODO: 동아리의 시작·비전·가치를 채우세요. */}
        청년부 공동체에 실제로 필요한 도구를 직접 만들어 섬기는 것이 목표입니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold text-zinc-900">멤버</h2>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((m) => (
          <div
            key={m.name}
            className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm"
          >
            {m.image ? (
              <div className="aspect-[4/5] overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
                <img
                  src={m.image}
                  alt={`${m.name} 프로필`}
                  className="h-full w-full object-cover object-top"
                />
              </div>
            ) : (
              <div className="flex aspect-[4/5] items-center justify-center bg-zinc-100 text-3xl font-semibold text-zinc-400">
                {m.name.slice(0, 1)}
              </div>
            )}
            <div className="p-4">
              <div className="flex items-baseline gap-2">
                <h3 className="font-semibold text-zinc-900">{m.name}</h3>
                <span className="text-xs font-medium text-indigo-600">{m.role}</span>
              </div>
              {m.bio && <p className="mt-1 text-sm text-zinc-600">{m.bio}</p>}
              {m.links && m.links.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-3 text-sm">
                  {m.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      className="text-indigo-600 hover:text-indigo-500"
                    >
                      {l.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 flex gap-4 text-sm">
        <a href={`mailto:${site.contactEmail}`} className="text-indigo-600 hover:text-indigo-500">
          문의하기
        </a>
        <a href={site.githubUrl} className="text-indigo-600 hover:text-indigo-500">
          GitHub
        </a>
      </div>
    </div>
  );
}
