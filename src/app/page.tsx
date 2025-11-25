import Link from "next/link";
import { ArtworkGallery } from "@/components/artwork-gallery";
import { FeaturedArtist } from "@/components/featured-artist";

export default function Home() {
  return (
    <div className="space-y-16 bg-stone-950 pb-20 pt-10 sm:pt-16">
      <HeroSection />
      <section className="mx-auto max-w-6xl space-y-10 px-4 sm:px-6 lg:px-8">
        <ArtworkGallery />
        <ViewAllBanner />
        <FeaturedArtist />
      </section>
    </div>
  );
}

function HeroSection() {
  return (
    <section className="hero-background relative flex min-h-[420px] w-full flex-col justify-end overflow-hidden rounded-[56px] px-6 pb-12 pt-48 text-white shadow-2xl shadow-black/60 sm:px-10">
      <p className="text-sm uppercase tracking-[0.4em] text-amber-100/80">
        JEON YOUNG HWAN
      </p>
      <h1 className="mt-3 text-4xl font-light leading-tight sm:text-6xl">
        Transforming Cycle
      </h1>
      {/* <p className="mt-4 max-w-2xl text-lg text-stone-100">
        Kinetic sculptures forged from steel, volcanic stone, and light. Every
        rotation leaves a new trace on the canvas of space.
      </p> */}
      <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
        <Link
          href="/news"
          className="rounded-full bg-white/90 px-6 py-3 text-stone-900 transition hover:bg-white"
        >
          Latest News
        </Link>
        {/* <Link
          href="/about"
          className="rounded-full border border-white/70 px-6 py-3 text-white transition hover:border-amber-200 hover:text-amber-200"
        >
          About Monobrick
        </Link>*/}
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
