"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import * as THREE from "three";

// 제품 "곧 공개" 풀스크린 연출. vanilla three 를 직접 mount/dispose.
// Hero3D 와 같은 패턴(파티클·와이어프레임·additive 글로우, reduce-motion 대응).
export default function ComingSoonHero({
  label = "loen app",
  ctaHref,
  ctaLabel,
}: {
  label?: string;
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // dpr 캡
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    // 기울어진 궤도 링들 (홈의 다면체와 다른 모티프 — 우주적 인상)
    const ringDefs = [
      { r: 3.0, color: 0x818cf8, opacity: 0.55, rot: [1.15, 0.2, 0], spin: 0.0007 },
      { r: 3.9, color: 0x6366f1, opacity: 0.4, rot: [-0.6, 0.8, 0.3], spin: -0.0005 },
      { r: 2.3, color: 0xa5b4fc, opacity: 0.5, rot: [0.4, 1.1, 0], spin: 0.001 },
    ];
    const rings = ringDefs.map((def) => {
      const curve = new THREE.EllipseCurve(0, 0, def.r, def.r, 0, Math.PI * 2);
      const geo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(160));
      const mat = new THREE.LineBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: def.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const ring = new THREE.LineLoop(geo, mat);
      ring.rotation.set(def.rot[0], def.rot[1], def.rot[2]);
      group.add(ring);
      return { ring, geo, mat, spin: def.spin };
    });

    // 글로우 코어 (중앙을 비운 성긴 쉘 — 텍스트 뒤가 깔끔하도록)
    const coreCount = 520;
    const corePos = new Float32Array(coreCount * 3);
    for (let i = 0; i < coreCount; i++) {
      const r = 1.4 + Math.random() * 2.4; // 중앙 비움, 1.4~3.8 쉘
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      corePos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      corePos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      corePos[i * 3 + 2] = r * Math.cos(phi);
    }
    const coreGeo = new THREE.BufferGeometry();
    coreGeo.setAttribute("position", new THREE.BufferAttribute(corePos, 3));
    const coreMat = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.05,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const core = new THREE.Points(coreGeo, coreMat);
    group.add(core);

    // 바깥 파티클 필드
    const fieldCount = 900;
    const fieldPos = new Float32Array(fieldCount * 3);
    for (let i = 0; i < fieldCount; i++) {
      const r = 5 + Math.random() * 9;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      fieldPos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      fieldPos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      fieldPos[i * 3 + 2] = r * Math.cos(phi);
    }
    const fieldGeo = new THREE.BufferGeometry();
    fieldGeo.setAttribute("position", new THREE.BufferAttribute(fieldPos, 3));
    const fieldMat = new THREE.PointsMaterial({
      color: 0x818cf8,
      size: 0.03,
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const field = new THREE.Points(fieldGeo, fieldMat);
    scene.add(field);

    // 마우스 패럴랙스 + 유체 반발
    let targetX = 0;
    let targetY = 0;
    const mouseNDC = new THREE.Vector2();
    let mouseActive = false;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.5;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.5;
      mouseNDC.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseNDC.y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseActive = true;
    };
    const onLeave = () => {
      mouseActive = false;
    };
    if (!reduceMotion) {
      window.addEventListener("pointermove", onPointer);
      window.addEventListener("pointerleave", onLeave);
    }

    // 유체 반발: 마우스 근처 파티클을 밀어내고 base 좌표로 부드럽게 복귀
    const baseCore = corePos.slice();
    const baseField = fieldPos.slice();
    const mouseWorld = new THREE.Vector3();
    const _ndc = new THREE.Vector3();
    const _dir = new THREE.Vector3();
    const _ml = new THREE.Vector3();
    const repel = (
      geo: THREE.BufferGeometry,
      base: Float32Array,
      worldMatrix: THREE.Matrix4,
      radius: number,
      strength: number,
    ) => {
      _ml.copy(mouseWorld).applyMatrix4(_invFromWorld(worldMatrix));
      const arr = geo.attributes.position.array as Float32Array;
      const r2 = radius * radius;
      for (let i = 0; i < arr.length; i += 3) {
        let cx = arr[i];
        let cy = arr[i + 1];
        let cz = arr[i + 2];
        const dx = cx - _ml.x;
        const dy = cy - _ml.y;
        const dz = cz - _ml.z;
        const d2 = dx * dx + dy * dy + dz * dz;
        if (mouseActive && d2 < r2) {
          const d = Math.sqrt(d2) || 0.0001;
          const f = ((radius - d) / radius) * strength;
          cx += (dx / d) * f;
          cy += (dy / d) * f;
          cz += (dz / d) * f;
        }
        cx += (base[i] - cx) * 0.08;
        cy += (base[i + 1] - cy) * 0.08;
        cz += (base[i + 2] - cz) * 0.08;
        arr[i] = cx;
        arr[i + 1] = cy;
        arr[i + 2] = cz;
      }
      geo.attributes.position.needsUpdate = true;
    };
    const _inv = new THREE.Matrix4();
    const _invFromWorld = (m: THREE.Matrix4) => _inv.copy(m).invert();

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    let t = 0;
    const animate = () => {
      t += 0.01;
      if (!reduceMotion) {
        rings.forEach((r) => {
          r.ring.rotation.y += r.spin;
          r.ring.rotation.x += r.spin * 0.4;
        });
        core.rotation.y += 0.0005;
        field.rotation.y += 0.0001;
        group.scale.setScalar(1 + Math.sin(t) * 0.03); // 호흡하는 펄스
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (-targetY - camera.position.y) * 0.04;
        camera.lookAt(0, 0, 0);
        camera.updateMatrixWorld();
        scene.updateMatrixWorld(true);

        // 마우스 → z=0 평면 월드좌표 → 파티클 반발
        _ndc.set(mouseNDC.x, mouseNDC.y, 0.5).unproject(camera);
        _dir.copy(_ndc).sub(camera.position).normalize();
        mouseWorld
          .copy(camera.position)
          .addScaledVector(_dir, -camera.position.z / _dir.z);
        repel(coreGeo, baseCore, core.matrixWorld, 0.75, 0.45);
        repel(fieldGeo, baseField, field.matrixWorld, 1.1, 0.5);
      } else {
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("pointerleave", onLeave);
      rings.forEach((r) => {
        r.geo.dispose();
        r.mat.dispose();
      });
      coreGeo.dispose();
      coreMat.dispose();
      fieldGeo.dispose();
      fieldMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-black">
      {/* 깊이감 배경 그라디언트 */}
      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(49,46,129,0.55),rgba(0,0,0,0.96)_72%)]" />

      {/* WebGL 레이어 */}
      <div ref={mountRef} aria-hidden className="absolute inset-0 z-0 h-full w-full" />

      {/* 위/아래 비네팅 — 헤더·푸터와 자연스러운 연결 */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] h-32 bg-gradient-to-b from-black/70 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-32 bg-gradient-to-t from-black/70 to-transparent" />

      {/* 텍스트 가독성용 중앙 어두운 scrim */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 z-[5] h-[680px] w-[680px] max-w-[92vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(2,2,12,0.82)_0%,rgba(2,2,12,0.55)_38%,transparent_70%)] blur-2xl"
      />

      {/* 콘텐츠 */}
      <div className="relative z-10 px-6 text-center">
        <p className="text-xs font-medium uppercase tracking-[0.4em] text-indigo-200 [text-shadow:0_2px_20px_rgba(0,0,0,0.85)] sm:text-sm">
          {label}
        </p>
        <h1 className="mt-6 animate-[fade-up_1.2s_cubic-bezier(0.16,1,0.3,1)_both] bg-gradient-to-b from-white via-indigo-100 to-indigo-300 bg-clip-text text-[2.6rem] font-bold leading-[1.05] tracking-tight text-transparent drop-shadow-[0_0_40px_rgba(99,102,241,0.45)] sm:text-7xl">
          TO BE
          <br />
          CONTINUED
        </h1>
        <p className="mx-auto mt-7 max-w-md text-base font-medium leading-relaxed text-zinc-100 [text-shadow:0_2px_20px_rgba(0,0,0,0.85)]">
          로엔의 새로운 앱을 준비하고 있어요.
          <br />곧, 가장 좋은 모습으로 만나요.
        </p>
        {ctaHref && ctaLabel && (
          <Link
            href={ctaHref}
            className="mt-9 inline-block rounded-full border border-white/25 bg-white/10 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-md transition-colors hover:bg-white/20"
          >
            {ctaLabel}
          </Link>
        )}
      </div>
    </section>
  );
}
