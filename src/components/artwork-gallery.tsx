'use client';

// import { useMemo, useState } from "react";
import Image from "next/image";
import { artworks } from "@/data/artworks";

// const allArtists = ["All Artists", ...new Set(artworks.map((art) => art.artist))];
// const allMedia = ["All Techniques", ...new Set(artworks.map((art) => art.medium))];

export function ArtworkGallery() {
  // const [artist, setArtist] = useState(allArtists[0]);
  // const [medium, setMedium] = useState(allMedia[0]);

  // const filteredArtworks = useMemo(() => {
  //   return artworks.filter((art) => {
  //     const matchArtist = artist === allArtists[0] || art.artist === artist;
  //     const matchMedium = medium === allMedia[0] || art.medium === medium;
  //     return matchArtist && matchMedium;
  //   });
  // }, [artist, medium]);

  return (
    <section className="space-y-6">
      {/* <div className="flex flex-wrap gap-4 text-white">
        <FilterSelect
          label="ARTIST"
          value={artist}
          options={allArtists}
          onChange={setArtist}
        />
        <FilterSelect
          label="TECHNIQUE"
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
      </div> */}

      <div className="grid gap-6 md:grid-cols-2">
        {artworks.map((artwork) => (
          <article
            key={artwork.id}
            className="group flex flex-col"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
              <Image
                src={artwork.image}
                alt={artwork.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-white">
                {artwork.title}
              </h3>
              <p className="mt-1 text-sm text-white/60">
                {artwork.year} · {artwork.artist}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// type FilterSelectProps = {
//   label: string;
//   value: string;
//   options: string[];
//   onChange: (value: string) => void;
// };

// function FilterSelect({
//   label,
//   value,
//   options,
//   onChange,
// }: FilterSelectProps) {
//   return (
//     <label className="flex items-center gap-3 rounded-lg border border-gray-600 bg-gray-800 px-4 py-3 text-sm font-semibold">
//       <span className="text-white">{label}</span>
//       <select
//         className="flex-1 appearance-none bg-transparent text-white outline-none cursor-pointer"
//         value={value}
//         onChange={(event) => onChange(event.currentTarget.value)}
//       >
//         {options.map((option) => (
//           <option key={option} value={option} className="bg-gray-800 text-white">
//             {option}
//           </option>
//         ))}
//       </select>
//       <svg
//         className="pointer-events-none h-4 w-4 text-white"
//         fill="none"
//         stroke="currentColor"
//         viewBox="0 0 24 24"
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           strokeWidth={2}
//           d="M19 9l-7 7-7-7"
//         />
//       </svg>
//     </label>
//   );
// }


