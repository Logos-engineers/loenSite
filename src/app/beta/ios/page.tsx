import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
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
          아이폰은 Apple의 베타 테스트 앱 <b>TestFlight</b>로 설치해요. 다른 앱보다
          한 단계가 더 있는데, <b>① 팀 초대 메일 수락 → ② TestFlight에서 설치</b>{" "}
          순서만 기억하시면 돼요.
        </p>
      </Reveal>

      <Reveal className="mt-12">
        <div className="space-y-4">
          <Step n={1} title="TestFlight 미리 설치">
            App Store에서 Apple의 무료 앱 <b>TestFlight</b>를 먼저 깔아두세요.
          </Step>
          <Step n={2} title="팀 초대 메일 수락 (첫 관문)">
            운영진이 보낸 <b>App Store Connect 팀 초대 메일</b>을 열어,{" "}
            <b>신청 때 알려주신 Apple ID</b>로 수락해 주세요. 이 수락이 되어야 다음
            단계로 넘어갈 수 있어요.
            <p className="mt-2 text-xs text-zinc-400">
              초대 메일은 개별로 보내드려요. 안 보이면 스팸함도 확인해 주세요.
            </p>
          </Step>
          <Step n={3} title="잠깐 기다리기">
            수락이 확인되면 운영진이 여러분을 <b>TestFlight 테스터로 추가</b>해요. 이
            단계는 따로 하실 게 없어요. 추가가 끝나면 다시 안내드릴게요.
          </Step>
          <Step n={4} title="TestFlight에서 설치">
            테스터로 추가되면 <b>TestFlight 앱</b>에 Loen이 떠요. <b>[설치]</b>를 누르면 끝!
          </Step>
          <Step n={5} title="실행·업데이트">
            홈 화면 또는 TestFlight에서 실행해요. 새 빌드가 나오면 TestFlight에
            업데이트가 떠요.
          </Step>
          <Step n={6} title="유효기간">
            TestFlight 빌드는 보통 <b>90일</b> 후 만료되며, 새 빌드로 갱신돼요.
          </Step>
        </div>
      </Reveal>

      <Reveal className="mt-10">
        <Callout tone="warn" title="이것만 기억해 주세요">
          반드시 <b>신청 때 알려주신 Apple ID</b>로 팀 초대 메일을 수락해야 해요.
          다른 계정으로 받으면 앱이 보이지 않아요. 2번(초대 수락)과 4번(설치)
          사이에 운영진이 테스터로 추가하는 시간이 잠깐 필요할 수 있어요.
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
