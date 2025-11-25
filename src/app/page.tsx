import Link from "next/link";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { FeaturedArtist } from "@/components/featured-artist";

export default function Home() {
  return (
    <>
      <HeroSection />
      <section className="mx-auto max-w-6xl space-y-10 px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <ArtworkGallery />
        <ViewAllBanner />
        <FeaturedArtist />
      </section>
    </>
  );
}

function HeroSection() {
  return (
    <section className="relative flex h-screen w-full flex-col justify-end overflow-hidden px-6 pb-16 pt-0 mt-0 text-white shadow-black/40 sm:px-10">
      <video
        className="absolute inset-0 h-full w-full object-cover"
        autoPlay
        loop
        muted
        playsInline
        poster="/images/hero-transforming-cycle.jpg"
      >
        <source src="/videos/black_box.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/85" />

      <div className="relative z-10">
        <p className="text-sm uppercase tracking-[0.4em] text-amber-100/80">
          2025
        </p>
        <h1 className="mt-3 text-4xl font-light leading-tight sm:text-6xl">
          Monobrick
        </h1>
        {/* <p className="mt-4 max-w-2xl text-lg text-stone-100">
          Kinetic sculptures forged from steel, volcanic stone, and light. Every
          rotation leaves a new trace on the canvas of space.
        </p> */}
        <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
          {/* CTA buttons intentionally hidden */}
        </div>
      </div>
    </section>
  );
}

function ViewAllBanner() {
  return (
    <div className="rounded-[32px] border border-white/10 bg-gradient-to-b from-white/10 to-transparent px-6 py-10 text-center text-white shadow-inner shadow-white/10">
      <p className="text-sm uppercase tracking-[0.4em] text-stone-300">
       Newsroom
      </p>
      <p className="mt-2 text-3xl font-semibold">Discover the latest updates</p>
      <Link
        href="/news"
        className="mt-6 inline-flex rounded-full border border-white/30 px-6 py-3 text-sm uppercase tracking-wide transition hover:border-amber-200 hover:text-amber-200"
      >
        Explore releases
      </Link>
    </div>
  );
}
