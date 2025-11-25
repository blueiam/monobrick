export type Artwork = {
  id: string;
  title: string;
  artist: string;
  year: string;
  medium: string;
  image: string;
};

export const artworks: Artwork[] = [
  {
    id: "transforming-cycle",
    title: "Transforming Cycle",
    artist: "Jeon Young Hwan",
    year: "2024",
    medium: "Aluminum-Paint",
    image: "/images/tr01.jpg",
  },
  {
    id: "flight-script",
    title: "Space-Fom the One",
    artist: "Jeon Young Hwan",
    year: "2019",
    medium: "Aluminum-Paint",
    image: "/images/apple001.jpg",
  },
  // {
  //   id: "electric-bouquet",
  //   title: "Electric Bouquet",
  //   artist: "Hong Yerin",
  //   year: "2024",
  //   medium: "Digital Sculpture",
  //   image:
  //     "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
  // },
  // {
  //   id: "lattice-drift",
  //   title: "Lattice Drift",
  //   artist: "Seo Hye Min",
  //   year: "2022",
  //   medium: "Metal Sculpture",
  //   image:
  //     "https://images.unsplash.com/photo-1465310477141-6fb93167a273?auto=format&fit=crop&w=1200&q=80",
  // },
  // {
  //   id: "tidal-nest",
  //   title: "Tidal Nest",
  //   artist: "Seo Hye Min",
  //   year: "2025",
  //   medium: "Copperwork",
  //   image:
  //     "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=1200&q=80",
  // },
  // {
  //   id: "fractured-horizon",
  //   title: "Fractured Horizon",
  //   artist: "Jeon Young Hwan",
  //   year: "2023",
  //   medium: "Aluminum",
  //   image:
  //     "https://images.unsplash.com/photo-1481277542470-605612bd2d61?auto=format&fit=crop&w=1600&q=80",
  // },
];

export const featuredArtist = {
  name: "Jeon Young Hwan",
  discipline: "Space-From the One",
  description:
    "Space-From the One reimagines a single plane as an infinite spatial form, exploring the duality and harmony of yin and yang.",
  highlightWork: artworks.find((artwork) => artwork.id === "fractured-horizon"),
};


