const info = [
  // { label: "Location", value: "MONOBRICK, 14 Jandari-ro, Seoul" },
  // { label: "Hours", value: "Tue – Sun · 11:00 – 19:00" },
  { label: "Contact", value: "info@monobrick.net " },
];

export default function AboutPage() {
  return (
    <div className="bg-stone-950 pb-20">
      <section className="mx-auto grid max-w-5xl gap-12 px-4 pt-16 sm:grid-cols-[1.1fr_0.9fr] sm:px-6 lg:px-8">
        <div>
          <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
            About
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
            MONOBRICK
          </h1>
          <div className="mt-6 space-y-4 text-lg text-stone-200">
            <p>Monobrick is an emerging contemporary art gallery dedicated to presenting fresh perspectives and new artistic voices.
            We aim to create a space where artists and audiences can naturally connect through painting, sculpture, installation, photography, and other diverse media.</p>

            <p>Inspired by the idea of a &ldquo;single solid brick,&rdquo; Monobrick represents a strong foundation for artistic experimentation and creative growth.
            We focus on showcasing works that highlight the individuality and vision of each artist, featuring both rising talents and creators with unique worlds of expression.</p>

            <p>Monobrick will continue to develop distinctive exhibitions and a reliable artwork management system,
            becoming an accessible and forward-looking platform for contemporary art.</p>
          </div>
          <div className="mt-10 space-y-4 rounded-3xl border border-white/10 bg-stone-900/60 p-6 text-sm text-stone-200">
            {info.map((row) => (
              <div key={row.label}>
                <p className="text-xs uppercase tracking-[0.4em] text-stone-500">
                  {row.label}
                </p>
                <p className="mt-1 text-base text-white">{row.value}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] border border-white/10 bg-black">
            <svg
              width="918"
              height="918"
              viewBox="0 0 918 918"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 h-full w-full object-cover"
              role="img"
              aria-label="Monobrick kinetic motif"
            >
              <path
                d="M458.77 0C501.6 0 534.86 37.352 529.91 79.901L496.38 367.975L676.36 140.581C702.95 106.993 752.88 104.098 783.17 134.388C813.46 164.678 810.56 214.605 776.97 241.19L549.59 421.164L837.63 387.642C880.18 382.69 917.53 415.947 917.53 458.783C917.53 501.619 880.18 534.876 837.63 529.924L549.56 496.398L776.96 676.386C810.55 702.971 813.45 752.899 783.16 783.189C752.87 813.478 702.94 810.583 676.35 776.994L496.39 549.623L529.91 837.63C534.86 880.179 501.6 917.531 458.77 917.531C415.93 917.531 382.67 880.179 387.63 837.63L421.15 549.607L241.18 776.985C214.59 810.574 164.66 813.47 134.38 783.18C104.09 752.89 106.98 702.962 140.57 676.377L367.96 496.398L79.8999 529.924C37.3499 534.876 0 501.62 0 458.783C0 415.947 37.3499 382.69 79.8999 387.642L367.93 421.163L140.56 241.199C106.97 214.614 104.07 164.686 134.36 134.397C164.65 104.107 214.58 107.002 241.17 140.591L421.15 367.99L387.63 79.901C382.67 37.352 415.93 0 458.77 0Z"
                fill="#FA00FF"
              >
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 459 459"
                  to="360 459 459"
                  dur="28s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="fill"
                  values="#FA00FF;#8A2BE2;#FA00FF"
                  dur="12s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
          </div>
        {/* <div className="rounded-[32px] border border-white/10 bg-stone-900/70 p-6 text-sm leading-relaxed text-stone-200">
          <p>
            Residency proposals open twice a year. We recommend including
            material experiments, fabrication notes, and desired collaborators.
          </p>
          <p className="mt-4">
            For press visits or private walkthroughs, reach out at least one
            week prior so the fabrication lab can prepare safe access.
          </p>
        </div> */}
        </div>
      </section>
    </div>
  );
}


