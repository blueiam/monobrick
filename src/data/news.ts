export type NewsItem = {
  id: string;
  title: string;
  content: string;
  category: string;
  created_at: string;
  image_url?: string | null;
  file_url?: string | null;
};

export const fallbackNews: NewsItem[] = [
  {
    id: "preview-1",
    title: "Transforming Cycle opens at MONOBRICK Seoul",
    content:
      "New kinetic sculptures by Jeon Young Hwan examine momentum loops built from brushed aluminum, volcanic rock, and mirrored glass.",
    category: "exhibition",
    created_at: "2024-11-01T10:00:00.000Z",
    image_url:
      "https://images.unsplash.com/photo-1465310477141-6fb93167a273?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "preview-2",
    title: "Hong Yerin debuts 'Flight Script' series",
    content:
      "Laser-cut acrylic ribbons and light projections trace migratory paths that respond to live weather data captured in Busan Harbor.",
    category: "studio",
    created_at: "2024-10-18T09:30:00.000Z",
    image_url:
      "https://images.unsplash.com/photo-1470246973918-29a93221c455?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: "preview-3",
    title: "New residency partners announced",
    content:
      "MONOBRICK partners with Eindhoven Metal Lab to offer cross-disciplinary residencies focused on fabrication, robotics, and sustainable casting.",
    category: "residency",
    created_at: "2024-09-12T08:15:00.000Z",
  },
];


