import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { ANDROID_OPTIN_LINK } from "../_config";
import { Step, Callout, BackToGuide } from "../_ui";

export const metadata: Metadata = {
  title: "Android 설치 안내",
  robots: { index: false, follow: false },
};

export default function AndroidPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <BackToGuide />
        <p className="mt-6 text-sm font-medium uppercase tracking-widest text-indigo-600">
          🤖 Android
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          안드로이드 설치 안내
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-600">
          별도 APK를 받지 않고, <b>구글 플레이 비공개 테스트</b>로 설치해요.
          아래 순서대로 따라오시면 됩니다.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <div className="space-y-4">
          <Step n={1} title="초대받은 구글 계정 확인">
            폰의 Play 스토어에 로그인된 구글 계정이, 운영진이 테스터로 등록한 Gmail
            주소와 <b>같아야</b> 해요. 다르면 앱이 보이지 않아요.
          </Step>
          <Step n={2} title="테스터 참여 링크 열기">
            운영진이 보낸 참여(opt-in) 링크를 폰 브라우저에서 열어주세요.
            “비공개 테스트에 참여하시겠습니까?” 화면에서 <b>[테스터 되기]</b>를 누릅니다.
            {ANDROID_OPTIN_LINK ? (
              <a
                href={ANDROID_OPTIN_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                테스터 참여 링크 열기 →
              </a>
            ) : (
              <p className="mt-2 text-xs text-zinc-400">
                참여 링크는 개별로 안내드릴게요.
              </p>
            )}
          </Step>
          <Step n={3} title="Play 스토어에서 설치">
            같은 페이지의 <b>“Google Play에서 다운로드”</b> 링크를 누르면 Loen의
            스토어 페이지가 열려요. <b>[설치]</b>를 누르면 끝!
          </Step>
          <Step n={4} title="바로 안 보이면 잠시 기다리기">
            테스터 등록·참여 직후에는 스토어에 바로 안 뜰 수 있어요. 몇 분~최대 두어
            시간 뒤 다시 시도하거나 페이지를 새로고침해 주세요.
          </Step>
          <Step n={5} title="업데이트">
            이후 새 버전은 Play 스토어에서 자동/수동으로 업데이트돼요.
          </Step>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <Callout tone="warn" title="이것만 기억해 주세요">
          반드시 <b>초대된 구글 계정</b>으로 Play 스토어에 로그인되어 있어야 해요.
          APK를 따로 받지 않고, 위 과정대로 <b>스토어로 설치</b>합니다.
        </Callout>
      </Reveal>

      <Reveal className="mt-12">
        <div className="flex items-center justify-between border-t border-zinc-200 pt-6 text-sm">
          <BackToGuide />
          <a
            href="/beta/ios"
            className="font-medium text-zinc-500 transition-colors hover:text-indigo-600"
          >
            iPhone 설치 안내 →
          </a>
        </div>
      </Reveal>
    </div>
  );
}
