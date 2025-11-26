"use client";

import { useCallback, useState } from "react";

const videos = ["/videos/home_video_2.mp4", "/videos/black_box.mp4"];

export function HeroVideoPlayer() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const handleEnded = useCallback(() => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
  }, []);

  return (
    <video
      key={currentVideoIndex}
      className="absolute inset-0 h-full w-full object-cover"
      autoPlay
      muted
      playsInline
      onEnded={handleEnded}
    >
      <source src={videos[currentVideoIndex]} type="video/mp4" />
    </video>
  );
}

