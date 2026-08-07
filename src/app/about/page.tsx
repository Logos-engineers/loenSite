import type { Metadata } from "next";
import { site } from "@/lib/site";
import { members } from "@/lib/members";

export const metadata: Metadata = { title: "소개" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16 text-center">
      <h1 className="sr-only">{site.name} 소개</h1>

      {/* 히어로 — 로고 + 한 줄 정체성 */}
      <img
        src="/loen-logo.png"
        alt="loen — Build together"
        className="mx-auto h-32 w-auto sm:h-40"
      />
      <p className="mx-auto mt-8 max-w-md text-pretty text-lg leading-relaxed text-zinc-700 sm:text-xl">
        loen은 <b className="font-semibold text-zinc-900">logos-engineers</b>라는 뜻이에요.{" "}
        <br className="hidden sm:block" />
        무언가 만드는 걸 좋아하는 사람들이 모여 있는 곳이죠.
      </p>

      <div className="mx-auto mt-16 h-px w-16 bg-zinc-200" />

      {/* 왜 만드나 */}
      <section className="mt-16">
        <p className="font-mono text-xs uppercase tracking-widest text-indigo-500">// why</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">왜 만드나</h2>
        <p className="mx-auto mt-4 max-w-md text-pretty leading-relaxed text-zinc-600">
          청년부 공동체에 실제로 필요한 도구를 직접 만들어 섬기는 것이 목표입니다.
        </p>
      </section>

      {/* 멤버 */}
      <section className="mt-16">
        <p className="font-mono text-xs uppercase tracking-widest text-indigo-500">// team</p>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-900">멤버</h2>
        <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-3">
          {members.map((m) => (
            <div
              key={m.name}
              className="group relative rounded-2xl border border-zinc-200 bg-white px-5 py-6 shadow-sm transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-md"
            >
              {/* 오른쪽 위 미니 onu 로고 — onu를 만든 멤버 표식 */}
              <img
                src="/onu-logo.png"
                alt="onu"
                className="absolute right-3 top-3 h-4 w-4 rounded-[4px]"
              />
              {m.image ? (
                <img
                  src={m.image}
                  alt={m.name}
                  className="mx-auto h-16 w-16 rounded-full object-cover ring-1 ring-zinc-200"
                />
              ) : (
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-50 to-violet-100 text-lg font-semibold text-indigo-400">
                  {m.name.slice(0, 1)}
                </div>
              )}
              <h3 className="mt-3 text-lg font-semibold text-zinc-900">{m.name}</h3>
              <p className="mt-1.5 font-mono text-xs text-indigo-600">// {m.role}</p>
              {m.bio && <p className="mt-3 text-pretty text-sm text-zinc-600">{m.bio}</p>}
              {m.links && m.links.length > 0 && (
                <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm">
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
          ))}
        </div>
      </section>

      <div className="mt-16 flex justify-center gap-6 text-sm">
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
