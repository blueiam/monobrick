import { fetchNews } from "@/lib/news";
import { NewsList } from "@/components/news-list";

export const revalidate = 60;

export default async function NewsPage() {
  const news = await fetchNews();

  return (
    <div className="bg-stone-950">
      <section className="mx-auto max-w-4xl px-4 pb-20 pt-16 sm:px-6 lg:px-8">
        <div className="mb-10">
          <p className="text-xs uppercase tracking-[0.4em] text-amber-200/70">
            Newsroom
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-white">
          Discover the latest updates
          </h1>
          <p className="mt-3 max-w-2xl text-base text-stone-300">
          Catch up on the newest exhibitions, featured artists, upcoming projects, and announcements.{" "}
            
          </p>
        </div>

        <NewsList news={news} />
      </section>
    </div>
  );
}


