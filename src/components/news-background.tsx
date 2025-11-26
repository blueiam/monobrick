"use client";

import { useEffect, useState } from "react";

export function NewsBackground() {
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
      {/* 2. Spirograph 비디오 배경 */}
      <video
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/spirograph.webm" type="video/webm" />
      </video>
    </div>
  );
}

