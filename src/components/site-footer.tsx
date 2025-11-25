export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-stone-950 py-10 text-sm text-stone-300">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>© {new Date().getFullYear()} MONOBRICK Gallery. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            href="https://instagram.com/gallerymonobrick"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            instagram
          </a>
          {/* <a
            href="https://supabase.com/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            Supabase
          </a>
          <a
            href="https://vercel.com/"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-white"
          >
            Vercel
          </a>*/}
        </div> 
      </div>
    </footer>
  );
}


