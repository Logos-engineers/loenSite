import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { getProduct } from "@/lib/products";

// 개별 초대용 안내 — 검색 비노출
export const metadata: Metadata = {
  title: "베타 테스터 안내",
  robots: { index: false, follow: false },
};

const APK_URL =
  "https://expo.dev/accounts/namhyunseo/projects/Loen-project/builds/e590dd2a-fed5-4fb4-8409-76d43fe485e5";
const DISCORD_URL = ""; // 준비되면 채움
const PERIOD = "2026년 6월 28일";

export default function BetaPage() {
  const app = getProduct("loen");

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      {/* 헤더 */}
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
          {site.name} app · Beta
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          베타 테스터가 되어주셔서 감사해요 🙏
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-600">
          정식 출시 전, 우리 청년부를 위해 만든 앱을 가장 먼저 써보고 함께 다듬어 줄
          분으로 초대드렸어요. 아래 안내대로 설치하고, 쓰면서 느낀 점을 편하게
          남겨주시면 됩니다.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          🗓️ 테스트 기간 · {PERIOD}까지
        </div>
      </Reveal>

      {/* 어떤 앱인가요 (products 데이터 재사용) */}
      {app && (
        <Reveal className="mt-16">
          <h2 className="text-xl font-semibold text-zinc-900">어떤 앱인가요?</h2>
          <p className="mt-2 text-zinc-600">{app.oneLiner}</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {app.features.map((f) => (
              <div
                key={f.title}
                className="rounded-xl border border-zinc-200 bg-white p-4"
              >
                <h3 className="font-medium text-zinc-900">{f.title}</h3>
                <p className="mt-1 text-sm text-zinc-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      )}

      {/* 1. 설치 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">1. 설치하기</h2>
        <p className="mt-2 text-sm text-zinc-500">본인 기기에 맞게 설치해주세요.</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {/* Android */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="font-semibold text-zinc-900">🤖 Android</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              아래 버튼으로 APK를 내려받아 설치하세요. 설치 시 “출처를 알 수 없는 앱
              허용”을 한 번 켜주셔야 할 수 있어요.
            </p>
            <a
              href={APK_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
            >
              APK 내려받기 →
            </a>
          </div>

          {/* iOS */}
          <div className="rounded-2xl border border-zinc-200 bg-white p-5">
            <h3 className="font-semibold text-zinc-900">🍎 iPhone</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600">
              먼저 App Store에서 <b>TestFlight</b> 앱을 설치한 뒤, 개별로 보내드린
              초대 링크를 열어 수락하면 설치돼요.
            </p>
            <p className="mt-4 text-xs text-zinc-400">
              초대 링크는 개별로 보내드립니다.
            </p>
          </div>
        </div>
      </Reveal>

      {/* 2. 이렇게 써주세요 (A) */}
      <Reveal className="mt-14">
        <h2 className="text-xl font-semibold text-zinc-900">2. 이렇게 써주세요</h2>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li className="flex gap-3">
            <span className="text-indigo-500">·</span>
            억지로 말고, <b>평소 신앙생활에서 자연스럽게</b> 써보세요.
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500">·</span>
            가능하면 <b>핵심 기능을 한 번씩 전부</b> 만져봐 주세요 (복습·신앙노트·오이코스).
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500">·</span>
            한 번 켜고 끝이 아니라, 기간 중 <b>며칠 이상 꾸준히</b> 써보면 좋아요.
          </li>
        </ul>
      </Reveal>

      {/* 3. 이런 걸 중점적으로 (B) */}
      <Reveal className="mt-14">
        <h2 className="text-xl font-semibold text-zinc-900">
          3. 이런 걸 중점적으로 봐주세요
        </h2>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li className="flex gap-3">
            <span className="text-indigo-500">·</span>
            <span>
              <b>설교 복습(OBS)</b> — 핵심 기능이에요. 꼭 한 번 끝까지 해보세요.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500">·</span>
            <b>회원가입·로그인</b> — 처음 들어오는 흐름이 막힘없는지.
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500">·</span>
            <b>신앙노트</b> 작성·조회, <b>오이코스(그룹)</b> 가입·활동.
          </li>
          <li className="flex gap-3">
            <span className="text-indigo-500">·</span>
            본인 <b>기기/OS</b>에서 깨지거나 이상한 화면은 없는지.
          </li>
        </ul>
      </Reveal>

      {/* 4. 이런 걸 제보 (C) */}
      <Reveal className="mt-14">
        <h2 className="text-xl font-semibold text-zinc-900">4. 이런 걸 제보해주세요</h2>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li className="flex gap-3"><span>🐛</span> 안 되는 기능·에러·앱이 꺼지는 현상</li>
          <li className="flex gap-3"><span>😵</span> 헷갈리거나 어색한 부분 (어디 눌러야 할지 모르겠는 곳)</li>
          <li className="flex gap-3"><span>🐢</span> 느리거나 이상하게 보이는 화면</li>
          <li className="flex gap-3"><span>✍️</span> 오타·어색한 문구</li>
          <li className="flex gap-3"><span>💡</span> “이런 게 있으면 좋겠다” 개선 아이디어</li>
        </ul>
      </Reveal>

      {/* 5. 이렇게 제보 (D) */}
      <Reveal className="mt-14">
        <h2 className="text-xl font-semibold text-zinc-900">5. 이렇게 제보해주세요</h2>
        <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
          <p className="text-zinc-700">
            제보할 땐 아래 <b>네 가지</b>만 적어주시면 충분해요:
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            {["어떤 화면에서", "무슨 일이", "원래 기대한 동작", "사용 기종"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white px-3 py-1 text-sm font-medium text-indigo-700 ring-1 ring-indigo-100"
              >
                {t}
              </span>
            ))}
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            <b>스크린샷·화면 녹화</b>를 붙이면 가장 좋아요. 사소해도, 중복이어도
            괜찮으니 <b>안 올리는 것보다 올려주세요!</b>
          </p>
          <div className="mt-5">
            {DISCORD_URL ? (
              <a
                href={DISCORD_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-indigo-400"
              >
                디스코드에서 제보하기 →
              </a>
            ) : (
              <p className="text-sm text-zinc-400">
                제보용 디스코드 채널은 개별로 안내드릴게요.
              </p>
            )}
          </div>
        </div>
      </Reveal>

      {/* 마무리 (G) */}
      <Reveal className="mt-16">
        <div className="rounded-2xl bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-semibold text-white">함께 만들어가요</h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            여러분이 남겨주는 제보 하나하나가 실제로 앱에 반영돼요. {PERIOD}까지,
            솔직한 의견 부탁드려요. 감사합니다 🙌
          </p>
          <a
            href={`mailto:${site.contactEmail}`}
            className="mt-6 inline-block text-sm font-medium text-indigo-300 hover:text-indigo-200"
          >
            문의: {site.contactEmail}
          </a>
        </div>
      </Reveal>
    </div>
  );
}
