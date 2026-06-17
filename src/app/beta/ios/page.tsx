import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import { IOS_TESTFLIGHT_LINK } from "../_config";
import { Step, Callout, BackToGuide } from "../_ui";

export const metadata: Metadata = {
  title: "iPhone 설치 안내",
  robots: { index: false, follow: false },
};

export default function IosPage() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20">
      <Reveal>
        <BackToGuide />
        <p className="mt-6 text-sm font-medium uppercase tracking-widest text-indigo-600">
          🍎 iPhone
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl">
          iPhone(TestFlight) 설치 안내
        </h1>
        <p className="mt-5 text-lg leading-relaxed text-zinc-600">
          아이폰에서는 Apple의 베타 테스트 앱 <b>TestFlight</b>를 통해 설치해요.
          아래 순서대로 따라오시면 됩니다.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <div className="space-y-4">
          <Step n={1} title="TestFlight 설치">
            App Store에서 Apple의 무료 앱 <b>TestFlight</b>를 먼저 설치해 주세요.
          </Step>
          <Step n={2} title="초대 수락">
            운영진이 보낸 TestFlight 초대를 아이폰에서 열어주세요. (이메일 초대의{" "}
            <b>“View in TestFlight”</b> 버튼 또는 공개 링크) TestFlight 앱이 열려요.
            초대는 <b>운영진에게 알려준 Apple ID 이메일</b> 기준이에요.
            {IOS_TESTFLIGHT_LINK ? (
              <a
                href={IOS_TESTFLIGHT_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block rounded-full bg-indigo-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-indigo-400"
              >
                TestFlight 초대 열기 →
              </a>
            ) : (
              <p className="mt-2 text-xs text-zinc-400">
                초대 링크는 개별로 안내드릴게요.
              </p>
            )}
          </Step>
          <Step n={3} title="설치">
            TestFlight에서 Loen의 <b>[설치]</b>를 누르면 끝!
          </Step>
          <Step n={4} title="실행·업데이트">
            홈 화면 또는 TestFlight에서 실행해요. 새 빌드가 나오면 TestFlight에
            업데이트가 떠요.
          </Step>
          <Step n={5} title="유효기간">
            TestFlight 빌드는 보통 <b>90일</b> 후 만료되며, 새 빌드로 갱신돼요.
          </Step>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <Callout tone="warn" title="이것만 기억해 주세요">
          외부 테스터의 경우 <b>첫 빌드는 Apple 베타 심사</b>로 잠시 지연될 수 있어요.
          설치가 바로 안 되면 조금 기다렸다가 다시 시도해 주세요.
        </Callout>
      </Reveal>

      <Reveal className="mt-12">
        <div className="flex items-center justify-between border-t border-zinc-200 pt-6 text-sm">
          <BackToGuide />
          <a
            href="/beta/android"
            className="font-medium text-zinc-500 transition-colors hover:text-indigo-600"
          >
            Android 설치 안내 →
          </a>
        </div>
      </Reveal>
    </div>
  );
}
