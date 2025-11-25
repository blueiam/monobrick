import Image from "next/image";
import { featuredArtist } from "@/data/artworks";

export function FeaturedArtist() {
  if (!featuredArtist.highlightWork) return null;

  return (
    <section className="relative overflow-hidden rounded-[48px] bg-gradient-to-b from-stone-100 to-stone-300 text-stone-900">
      <div className="grid items-center gap-8 p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-12">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-stone-500">
            Featured Artist
          </p>
          <h2 className="mt-4 text-4xl font-semibold leading-tight lg:text-5xl">
            {featuredArtist.name}
          </h2>
          <p className="mt-2 text-lg font-semibold text-stone-600">
            {featuredArtist.discipline}
          </p>
          <p className="mt-4 text-base leading-relaxed text-stone-700">
            {featuredArtist.description}
          </p>
        </div>
        <div className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] bg-white shadow-2xl shadow-stone-500/30">
            <Image
              src="/images/apple.jpg"
              alt={featuredArtist.highlightWork.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 90vw, 480px"
            />
          </div>
        </div>
      </div>
    </section>
  );
}


