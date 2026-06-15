"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

// 연출 레이어(배경). 콘텐츠는 이 위에 일반 DOM으로 얹는다.
// vanilla three 를 useEffect 안에서 직접 mount/dispose.
export default function Hero3D({
  progressRef,
}: {
  // 스크롤 진행도(0~1). 있으면 줌인 연동.
  progressRef?: { current: number };
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
      45,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // dpr 캡 — 저사양 보호
    mount.appendChild(renderer.domElement);

    // 오른쪽에 모아두는 그룹 (텍스트 좌측 공간 확보)
    const group = new THREE.Group();
    group.position.x = 0; // 스크롤 스토리: 중앙 배치
    scene.add(group);

    // 바깥 와이어프레임 다면체
    const outerGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const outerMat = new THREE.MeshBasicMaterial({
      color: 0xa5b4fc,
      wireframe: true,
      transparent: true,
      opacity: 0.9,
    });
    const outer = new THREE.Mesh(outerGeo, outerMat);
    group.add(outer);

    // 안쪽에서 반대로 도는 작은 다면체
    const innerGeo = new THREE.IcosahedronGeometry(1.3, 0);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      wireframe: true,
      transparent: true,
      opacity: 0.55,
    });
    const inner = new THREE.Mesh(innerGeo, innerMat);
    group.add(inner);

    // 떠다니는 파티클 필드 (구 쉘 분포)
    const pCount = 700;
    const positions = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pMat = new THREE.PointsMaterial({
      color: 0xc7d2fe,
      size: 0.025,
      transparent: true,
      opacity: 0.7,
    });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    // 마우스 패럴랙스 (모션 허용 시)
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 0.6;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.6;
    };
    if (!reduceMotion) window.addEventListener("pointermove", onPointer);

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let raf = 0;
    const animate = () => {
      const p = progressRef?.current ?? 0;
      if (!reduceMotion) {
        outer.rotation.y += 0.001;
        outer.rotation.x += 0.0004;
        inner.rotation.y -= 0.0016;
        inner.rotation.z += 0.0008;
        points.rotation.y += 0.00015;
        camera.position.x += (targetX - camera.position.x) * 0.05;
        camera.position.y += (-targetY - camera.position.y) * 0.05;
      }
      // 스크롤 진행에 따라 줌인 + 확대
      camera.position.z = 6 - p * 2.4;
      group.scale.setScalar(1 + p * 0.4);
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      outerGeo.dispose();
      outerMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      pGeo.dispose();
      pMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
