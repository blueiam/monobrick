"use client";

import { useEffect, useState } from "react";

const info = [
  { label: "Contact", value: "info@monobrick.net" },
];

// 1. SVG를 재사용 가능한 컴포넌트로 분리 (색상, 크기, 위치 조절 가능)
function FloatingShape({
  className,
  color = "#FA00FF",
  style,
}: {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={`absolute pointer-events-none ${className}`} style={style}>
      <svg
        viewBox="0 0 918 918"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full opacity-90"
      >
        <path
          d="M458.77 0C501.6 0 534.86 37.352 529.91 79.901L496.38 367.975L676.36 140.581C702.95 106.993 752.88 104.098 783.17 134.388C813.46 164.678 810.56 214.605 776.97 241.19L549.59 421.164L837.63 387.642C880.18 382.69 917.53 415.947 917.53 458.783C917.53 501.619 880.18 534.876 837.63 529.924L549.56 496.398L776.96 676.386C810.55 702.971 813.45 752.899 783.16 783.189C752.87 813.478 702.94 810.583 676.35 776.994L496.39 549.623L529.91 837.63C534.86 880.179 501.6 917.531 458.77 917.531C415.93 917.531 382.67 880.179 387.63 837.63L421.15 549.607L241.18 776.985C214.59 810.574 164.66 813.47 134.38 783.18C104.09 752.89 106.98 702.962 140.57 676.377L367.96 496.398L79.8999 529.924C37.3499 534.876 0 501.62 0 458.783C0 415.947 37.3499 382.69 79.8999 387.642L367.93 421.163L140.56 241.199C106.97 214.614 104.07 164.686 134.36 134.397C164.65 104.107 214.58 107.002 241.17 140.591L421.15 367.99L387.63 79.901C382.67 37.352 415.93 0 458.77 0Z"
          fill={color}
        />
      </svg>
    </div>
  );
}

// 2. 전체 배경 컴포넌트 (별 + SVG 도형들)
function ImmersiveBackground() {
  // 별 생성 로직 (Hydration mismatch 방지 위해 useEffect 사용)
  const [stars, setStars] = useState<{ id: number; x: number; y: number; size: number; opacity: number }[]>([]);

  useEffect(() => {
    const newStars = Array.from({ length: 70 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      opacity: Math.random() * 0.7 + 0.3,
    }));
    setStars(newStars);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* 1. 별 배경 */}
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDuration: `${Math.random() * 3 + 2}s`,
          }}
        />
      ))}
      {/* 2. 거대한 SVG 도형들 (레퍼런스 이미지 느낌으로 배치) */}
      
      {/* 우측 상단 - 거대한 민트색 (Cyan) */}
      <FloatingShape 
        color="#00F0FF" 
        className="-right-[20%] -top-[10%] w-[80vw] h-[80vw] md:w-[60vw] md:h-[60vw] animate-[spin_60s_linear_infinite]"
        style={{ filter: "blur(2px)" }}
      />
      {/* 우측 중앙 - 마젠타 (Magenta) */}
      <FloatingShape 
        color="#FA00FF" 
        className="right-[5%] top-[40%] w-[50vw] h-[50vw] md:w-[40vw] md:h-[40vw] animate-[spin_50s_linear_infinite_reverse]" 
        style={{ opacity: 0.8 }}
      />
      {/* 하단 중앙 - 노란색 (Yellow) */}
      <FloatingShape 
        color="#FFD600" 
        className="left-[40%] -bottom-[20%] w-[40vw] h-[40vw] md:w-[30vw] md:h-[30vw] animate-[spin_40s_linear_infinite]"
      />
      {/* 좌측 하단 - 깊은 파랑 (Blue/Purple) */}
      <FloatingShape 
        color="#4F46E5" 
        className="-left-[10%] bottom-[10%] w-[60vw] h-[60vw] md:w-[40vw] md:h-[40vw] opacity-40 blur-xl animate-[spin_70s_linear_infinite_reverse]" 
      />
    </div>
  );
}

export default function AboutPage() {
  return (
    // overflow-hidden을 주어 배경 요소가 화면 밖으로 나가도 스크롤 생기지 않게 함
    <div className="relative min-h-screen bg-black text-white overflow-hidden selection:bg-pink-500 selection:text-white">
      
      {/* 1. 배경 레이어 (z-index: 0) */}
      <ImmersiveBackground />
      {/* 2. 컨텐츠 레이어 (z-index: 10, relative) */}
      <div className="relative z-10 mx-auto max-w-5xl px-6 pt-32 pb-20 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.4em] text-cyan-300/80 mb-6">
            About 
          </p>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 mb-12">
            MONOBRICK
          </h1>
          <div className="space-y-8 text-lg md:text-xl leading-relaxed text-stone-300/90 font-light backdrop-blur-sm p-6 rounded-3xl bg-black/20 border border-white/5">
            <p>
              Monobrick is an emerging contemporary art gallery dedicated to presenting fresh perspectives and new artistic voices.
              We aim to create a space where artists and audiences can naturally connect through painting, sculpture, installation, photography, and other diverse media.
            </p>
            <p>
              Inspired by the idea of a &ldquo;single solid brick,&rdquo; Monobrick represents a strong foundation for artistic experimentation and creative growth.
              We focus on showcasing works that highlight the individuality and vision of each artist.
            </p>
            <p>
              Monobrick will continue to develop distinctive exhibitions and a reliable artwork management system,
              becoming an accessible and forward-looking platform for contemporary art.
            </p>
          </div>
          <div className="mt-12 inline-block rounded-3xl border border-white/20 bg-stone-900/40 backdrop-blur-md p-8">
            {info.map((row) => (
              <div key={row.label}>
                <p className="text-xs uppercase tracking-[0.4em] text-stone-500 mb-2">
                  {row.label}
                </p>
                <a href={`mailto:${row.value}`} className="text-xl text-white hover:text-pink-400 transition-colors">
                  {row.value}
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
