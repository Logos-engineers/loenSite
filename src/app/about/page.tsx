import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "소개" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">{site.name} 소개</h1>
      <p className="mt-6 text-lg text-zinc-600">{site.description}</p>

      <h2 className="mt-12 text-xl font-semibold text-zinc-900">왜 만드나</h2>
      <p className="mt-3 text-zinc-600">
        {/* TODO: 동아리의 시작·비전·가치를 채우세요. */}
        청년부 공동체에 실제로 필요한 도구를 직접 만들어 섬기는 것이 목표입니다.
      </p>

      <h2 className="mt-12 text-xl font-semibold text-zinc-900">멤버</h2>
      <p className="mt-3 text-zinc-600">{/* TODO: 멤버 소개 */}곧 채워집니다.</p>

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
