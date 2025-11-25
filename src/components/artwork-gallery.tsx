'use client';

import { useMemo, useState } from "react";
import Image from "next/image";
import { artworks } from "@/data/artworks";

const allArtists = ["All Artists", ...new Set(artworks.map((art) => art.artist))];
const allMedia = ["All Techniques", ...new Set(artworks.map((art) => art.medium))];

export function ArtworkGallery() {
  const [artist, setArtist] = useState(allArtists[0]);
  const [medium, setMedium] = useState(allMedia[0]);

  const filteredArtworks = useMemo(() => {
    return artworks.filter((art) => {
      const matchArtist = artist === allArtists[0] || art.artist === artist;
      const matchMedium = medium === allMedia[0] || art.medium === medium;
      return matchArtist && matchMedium;
    });
  }, [artist, medium]);

  return (
    <section className="space-y-6">
      <div className="flex flex-wrap gap-4 text-xs uppercase tracking-wide text-white">
        <FilterSelect
          label="Artist"
          value={artist}
          options={allArtists}
          onChange={setArtist}
        />
        <FilterSelect
          label="Technique"
          value={medium}
          options={allMedia}
          onChange={setMedium}
        />
        {(artist !== allArtists[0] || medium !== allMedia[0]) && (
          <button
            className="rounded-full border border-white/20 px-4 py-2 text-[0.7rem] font-semibold transition hover:border-amber-200 hover:text-amber-200"
            onClick={() => {
              setArtist(allArtists[0]);
              setMedium(allMedia[0]);
            }}
            type="button"
          >
            Clear
          </button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredArtworks.map((artwork) => (
          <article
            key={artwork.id}
            className="group overflow-hidden rounded-3xl border border-white/10 bg-stone-900/60 shadow-2xl shadow-black/40 transition hover:-translate-y-1 hover:border-amber-200/40"
          >
            <div className="relative aspect-[4/3] w-full">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/90" />
              <div className="absolute bottom-0 p-5 text-white">
                <p className="text-xs uppercase tracking-wide text-stone-200">
                  {artwork.artist} · {artwork.year}
                </p>
                <h3 className="text-xl font-semibold">{artwork.title}</h3>
                <p className="text-sm text-stone-300">{artwork.medium}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
};

function FilterSelect({
  label,
  value,
  options,
  onChange,
}: FilterSelectProps) {
  return (
    <label className="flex items-center gap-2 rounded-full border border-white/20 bg-stone-900/80 px-4 py-2 text-[0.7rem] font-semibold">
      {label}
      <select
        className="bg-transparent text-white outline-none"
        value={value}
        onChange={(event) => onChange(event.currentTarget.value)}
      >
        {options.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}


