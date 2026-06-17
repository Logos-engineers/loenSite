import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/site";
import { getProduct } from "@/lib/products";
import { TEST_PERIOD, LOGIN_METHOD } from "./_config";
import { Callout } from "./_ui";

// 개별 초대용 안내 — 검색 비노출
export const metadata: Metadata = {
  title: "베타 테스터 가이드",
  robots: { index: false, follow: false },
};

export default function BetaPage() {
  const app = getProduct("loen");

  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      {/* 헤더 */}
      <Reveal>
        <p className="text-sm font-medium uppercase tracking-widest text-indigo-600">
          {site.name} app · Beta 가이드
        </p>
        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          베타 테스터가 되어주셔서 감사해요 🙏
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-600">
          정식 출시 전, 우리 청년부를 위해 만든 앱을 가장 먼저 써보고 함께 다듬어 줄
          분으로 초대드렸어요. 이 페이지 하나만 따라오시면 설치부터 제보까지
          어렵지 않아요.
        </p>
        <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-indigo-50 px-4 py-2 text-sm font-bold text-indigo-700 ring-1 ring-indigo-100">
          🧪 테스트 기간 · {TEST_PERIOD}
        </div>
      </Reveal>

      {/* 어떤 앱인가요 */}
      {app && (
        <Reveal className="mt-16">
          <h2 className="text-xl font-semibold text-zinc-900">어떤 앱인가요?</h2>
          <p className="mt-2 text-zinc-600">
            Loen은 매일의 성경 읽기와 신앙 생활을 돕는 앱이에요. 성경 통독, 신앙노트(감사·기도·말씀),
            주일 교안(OBS) 복습, 신앙·성경 챌린지를 제공해요.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {app.features
              .filter((f) => !f.title.includes("오이코스"))
              .map((f) => (
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

      {/* 핵심 기능 — OBS 복습 */}
      <Reveal className="mt-16">
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6">
          <p className="text-sm font-bold uppercase tracking-widest text-indigo-600">
            이번 베타의 핵심 기능
          </p>
          <h2 className="mt-2 text-xl font-semibold text-zinc-900">
            📘 지난 주 설교(OBS)를 퀴즈로 복습
          </h2>
          <p className="mt-3 leading-relaxed text-zinc-700">
            오이코스 모임 전, 지난 주 OBS를 짧은 퀴즈로 복습하는 기능이에요.
            가장 공들인 기능이니 <b>주중에 한 번씩 퀴즈를 풀어보고</b>, 복습에 도움이
            되는지·어색한 곳은 없는지 알려주세요!
          </p>
        </div>
      </Reveal>

      {/* 왜 베타테스트를 하나요 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">
          왜 베타테스트를 하나요?
        </h2>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li className="flex gap-3">
            <span className="shrink-0 text-indigo-500">·</span>
            <span>
              정식 출시 전에 <b>실제 사용 환경에서 버그와 불편함을 미리 발견</b>해
              다듬기 위한 비공개 테스트예요.
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 text-indigo-500">·</span>
            <span>
              아직 다듬는 중이라 일부 불안정하거나 데이터가 초기화될 수 있어요. (양해 부탁드려요 🙏)
            </span>
          </li>
          <li className="flex gap-3">
            <span className="shrink-0 text-indigo-500">·</span>
            <span>
              <b>여러분의 피드백이 출시 품질을 좌우해요.</b>
            </span>
          </li>
        </ul>
      </Reveal>

      {/* 설치하기 — OS별 페이지로 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">설치하기</h2>
        <p className="mt-2 text-sm text-zinc-500">
          본인 기기에 맞는 안내를 눌러주세요.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <Link
            href="/beta/android"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg"
          >
            <div className="text-3xl">🤖</div>
            <h3 className="mt-3 font-semibold text-zinc-900">Android 설치 안내</h3>
            <p className="mt-1 text-sm text-zinc-600">
              구글 플레이 비공개 테스트로 설치해요.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-indigo-600">
              설치 방법 보기 →
            </span>
          </Link>
          <Link
            href="/beta/ios"
            className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-300 hover:shadow-lg"
          >
            <div className="text-3xl">🍎</div>
            <h3 className="mt-3 font-semibold text-zinc-900">iPhone 설치 안내</h3>
            <p className="mt-1 text-sm text-zinc-600">
              TestFlight 앱으로 설치해요.
            </p>
            <span className="mt-3 inline-block text-sm font-medium text-indigo-600">
              설치 방법 보기 →
            </span>
          </Link>
        </div>
      </Reveal>

      {/* 무엇을 해주세요 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">이렇게 써주세요</h2>
        <p className="mt-2 text-zinc-600">
          설치 후 회원가입·로그인하고, <b>평소 쓰듯 자연스럽게</b> 둘러봐 주세요.
          로그인은 <b>{LOGIN_METHOD}</b>을 권장해요. 가능하면{" "}
          <b>매일 한 번 이상</b> 접속해 아래 기능을 직접 써보면 좋아요.
        </p>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li className="flex gap-3"><span className="shrink-0">📘</span><span><b>주일 교안(OBS) 복습 &amp; 퀴즈</b> — 이번 베타의 핵심이에요. 꼭 한 번 써봐 주세요!</span></li>
          <li className="flex gap-3"><span className="shrink-0">📖</span><span>성경 읽기 &amp; 통독표 (읽음 체크, 이번 주 목표 설정)</span></li>
          <li className="flex gap-3"><span className="shrink-0">📝</span><span>신앙노트 작성 — 감사노트 / 기도노트 / 말씀노트</span></li>
        </ul>
      </Reveal>

      {/* 제보 방법 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">
          버그·개선은 이렇게 제보해주세요
        </h2>
        <div className="mt-4 rounded-2xl border border-indigo-100 bg-indigo-50/60 p-5">
          <p className="text-zinc-700">
            제보는 <b>앱 안에서</b> 바로 보낼 수 있어요. 경로는{" "}
            <b>하단 탭 더보기 → 피드백 보내기</b>예요.
          </p>
          <div className="mt-4 space-y-2 text-sm text-zinc-700">
            <p className="flex gap-3"><span className="shrink-0 text-indigo-500">1.</span><span>카테고리 선택 — <b>버그 / 개선 / 기타</b></span></p>
            <p className="flex gap-3"><span className="shrink-0 text-indigo-500">2.</span><span>제목·내용 작성</span></p>
            <p className="flex gap-3"><span className="shrink-0 text-indigo-500">3.</span><span><b>스크린샷 첨부</b> (버그는 화면 캡처가 큰 도움이 돼요)</span></p>
            <p className="flex gap-3"><span className="shrink-0 text-indigo-500">4.</span><span>제출!</span></p>
          </div>
          <p className="mt-4 text-sm text-zinc-600">
            제출한 내역과 처리 상태(<b>접수 → 검토중 → 반영/반려</b>)는 같은 화면
            (더보기 → 피드백 보내기)에서 본인 것만 확인할 수 있어요.
          </p>
          <p className="mt-3 text-sm text-zinc-600">
            앱이 켜지지 않는 등 앱 안에서 제보가 어려우면{" "}
            <a
              href={`mailto:${site.contactEmail}`}
              className="font-medium text-indigo-600 underline-offset-2 hover:underline"
            >
              {site.contactEmail}
            </a>
            로 알려주세요.
          </p>
        </div>
      </Reveal>

      {/* 부탁드려요 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">부탁드려요</h2>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li className="flex gap-3"><span className="shrink-0">🙌</span><span>자주(가능하면 매일) 들어와 다양한 기능을 두루 써 주세요.</span></li>
          <li className="flex gap-3"><span className="shrink-0">🐛</span><span>사소해 보여도 이상하거나 불편한 점은 바로 피드백으로 남겨 주세요. (스크린샷 환영)</span></li>
          <li className="flex gap-3"><span className="shrink-0">✍️</span><span>“이 버튼을 눌렀더니 ~됐어요” 식으로 <b>솔직하고 구체적인</b> 의견이 가장 큰 도움이 돼요.</span></li>
          <li className="flex gap-3"><span className="shrink-0">💡</span><span>“이런 기능이 있으면 좋겠다”, “이건 이렇게 바뀌면 더 편할 것 같다” 같은 <b>개선 아이디어</b>도 편하게 남겨 주세요.</span></li>
          <li className="flex gap-3"><span className="shrink-0">🤫</span><span>아직 미출시 앱이니, 화면·내용의 외부 공유·유출은 자제 부탁드려요. (비밀 유지)</span></li>
        </ul>
      </Reveal>

      {/* 알려진 제약 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">알려진 제약</h2>
        <div className="mt-4">
          <Callout tone="warn" title="베타 단계라 이런 점을 미리 알려드려요">
            일부 기능이 불안정하거나, 테스트 도중 데이터가 초기화될 수 있어요.
            중요한 내용은 앱에만 의존하지 마시고, 불편한 점은 편하게 제보해 주세요.
          </Callout>
        </div>
      </Reveal>

      {/* 참여 이벤트 */}
      <Reveal className="mt-16">
        <h2 className="text-xl font-semibold text-zinc-900">작은 감사 이벤트 🎁</h2>
        <div className="mt-4 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6">
          <ul className="space-y-3 text-zinc-700">
            <li className="flex gap-3">
              <span className="shrink-0">🎁</span>
              <span>
                테스트에 <b>참여해 주신 모든 분</b>께 소정의 상품권을 드려요.
              </span>
            </li>
            <li className="flex gap-3">
              <span className="shrink-0">🏆</span>
              <span>
                특히 <b>14일 중 12일(80%) 이상</b> 출석하며 꾸준히 활동해 주신 분께는{" "}
                <b>더 큰 상품</b>을 준비했어요. 매일 들러 주시면 그만큼 도움이 돼요!
              </span>
            </li>
          </ul>
        </div>
      </Reveal>

      {/* 마무리 */}
      <Reveal className="mt-16">
        <div className="rounded-2xl bg-zinc-900 p-8 text-center">
          <h2 className="text-2xl font-semibold text-white">
            참여해 주셔서 진심으로 감사합니다 🙏
          </h2>
          <p className="mx-auto mt-3 max-w-md text-zinc-400">
            여러분이 남겨주는 제보 하나하나가 실제로 앱에 반영돼요. {TEST_PERIOD},
            솔직한 의견 부탁드려요. 함께 만들어가요 🙌
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
