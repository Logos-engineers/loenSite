"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Hero3D from "./Hero3D";
import { site } from "@/lib/site";

const clamp = (x: number) => Math.min(1, Math.max(0, x));

// Apple식 스크롤 핀 스토리:
// 0.08~0.40  "Loen" 도형 중심에서 정면으로 다가옴
// 0.42~0.58  "만들어서 섬기다." 등장
// 0.58~0.73  버튼 등장
// 0.73~0.82  hold (완성본 감상)
// 0.82~1.00  퇴장 (위로 빠지며 페이드 → 다음 섹션으로 연결)
export default function HeroScroll() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);

  // 유체 왜곡 호버
  const dispRef = useRef<SVGFEDisplacementMapElement>(null);
  const hoverRef = useRef(false);

  // 스크롤 진행 → 레이어 변형
  useEffect(() => {
    const apply = () => {
      const wrap = wrapRef.current;
      if (!wrap) return;
      const total = wrap.offsetHeight - window.innerHeight;
      const p =
        total > 0 ? clamp(-wrap.getBoundingClientRect().top / total) : 0;
      progressRef.current = p;

      const logoP = clamp((p - 0.08) / 0.32);
      if (logoRef.current) {
        // 도형 중심(소실점) 깊은 곳의 작은 점에서 정면으로 다가오는 느낌
        logoRef.current.style.opacity = String(clamp(logoP * 1.6));
        logoRef.current.style.transform = `perspective(550px) translateZ(${-1700 * (1 - logoP)}px)`;
        logoRef.current.style.filter = `blur(${5 * (1 - logoP)}px) url(#loen-liquid)`;
      }

      const tagP = clamp((p - 0.42) / 0.16);
      if (taglineRef.current) {
        taglineRef.current.style.opacity = String(tagP);
        taglineRef.current.style.transform = `translateY(${24 * (1 - tagP)}px)`;
      }

      const ctaP = clamp((p - 0.58) / 0.15);
      if (ctaRef.current) {
        ctaRef.current.style.opacity = String(ctaP);
        ctaRef.current.style.transform = `translateY(${24 * (1 - ctaP)}px)`;
      }

      // 퇴장: 콘텐츠 전체가 위로 빠지며 페이드아웃
      const exitP = clamp((p - 0.82) / 0.18);
      if (contentRef.current) {
        contentRef.current.style.opacity = String(1 - exitP);
        contentRef.current.style.transform = `translateY(${-60 * exitP}px)`;
      }

      if (hintRef.current) {
        hintRef.current.style.opacity = String(clamp(1 - p / 0.05));
      }
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
    window.addEventListener("resize", apply);
    return () => {
      window.removeEventListener("scroll", apply);
      window.removeEventListener("resize", apply);
    };
  }, []);

  // 호버 시 유체 흐트러짐 (displacement scale 보간)
  useEffect(() => {
    let raf = 0;
    let cur = 0;
    const tick = () => {
      const target = hoverRef.current ? 28 : 0;
      cur += (target - cur) * 0.12;
      if (dispRef.current) dispRef.current.setAttribute("scale", cur.toFixed(2));
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div ref={wrapRef} className="relative h-[300vh] bg-black">
      {/* 유체 왜곡 필터 정의 */}
      <svg className="pointer-events-none absolute h-0 w-0" aria-hidden>
        <defs>
          <filter id="loen-liquid">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.014"
              numOctaves={2}
              seed={7}
              result="noise"
            >
              <animate
                attributeName="baseFrequency"
                dur="16s"
                values="0.014;0.02;0.014"
                repeatCount="indefinite"
              />
            </feTurbulence>
            <feDisplacementMap
              ref={dispRef}
              in="SourceGraphic"
              in2="noise"
              scale="0"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <div className="sticky top-0 flex h-screen items-center justify-center overflow-hidden">
        {/* 중앙 글로우 */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 z-0 h-[680px] w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/25 blur-[150px]" />

        <Hero3D progressRef={progressRef} />

        {/* 가독용 약한 비네트 */}
        <div className="pointer-events-none absolute inset-0 z-[1] bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.6))]" />

        {/* 하단 → 검정 페이드 (다음 섹션 색 연결 보강) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-40 bg-gradient-to-b from-transparent to-black" />

        {/* 중앙 텍스트 레이어 */}
        <div
          ref={contentRef}
          style={{ willChange: "opacity, transform" }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <h1
            ref={logoRef}
            onPointerEnter={() => (hoverRef.current = true)}
            onPointerLeave={() => (hoverRef.current = false)}
            style={{ opacity: 0, willChange: "opacity, transform, filter" }}
            className="cursor-default bg-gradient-to-br from-white via-white to-indigo-300 bg-clip-text pb-2 text-7xl font-bold tracking-tight text-transparent sm:text-9xl"
          >
            {site.name}
          </h1>
          <p
            ref={taglineRef}
            style={{ opacity: 0, willChange: "opacity, transform" }}
            className="mt-2 text-2xl font-semibold text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.85)] sm:text-4xl"
          >
            만들어서 섬기다.
          </p>
          <div
            ref={ctaRef}
            style={{ opacity: 0, willChange: "opacity, transform" }}
            className="mt-10 flex flex-wrap items-center justify-center gap-4"
          >
            <Link
              href="/products"
              className="rounded-full bg-indigo-500 px-7 py-3.5 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.5)] transition-all hover:-translate-y-0.5 hover:bg-indigo-400"
            >
              제품 보기
            </Link>
            <Link
              href="/posts"
              className="rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
            >
              소식 보기
            </Link>
          </div>
        </div>

        {/* 스크롤 힌트 (처음에만) */}
        <div
          ref={hintRef}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs uppercase tracking-widest text-zinc-400"
        >
          스크롤 ↓
        </div>
      </div>
    </div>
  );
}
