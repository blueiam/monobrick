'use client';

import { useState } from "react";
import { NewsItem } from "@/data/news";
import Image from "next/image";

type Props = {
  news: NewsItem[];
};

export function NewsList({ news }: Props) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? -1 : index));
  };

  return (
    <div className="space-y-4">
      {news.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <article
            key={item.id}
            className="overflow-hidden rounded-3xl border border-white/15 bg-stone-900/60 text-white shadow-2xl transition hover:border-amber-200/40"
          >
            <button
              className="flex w-full cursor-pointer flex-wrap items-center gap-4 px-6 py-5 text-left focus:outline-none"
              onClick={() => toggle(index)}
              aria-expanded={isOpen}
            >
              <div className="flex flex-1 flex-col gap-1">
                <span className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
                  {formatDate(item.created_at)}
                </span>
                <h2 className="text-xl font-semibold">{item.title}</h2>
              </div>
              {item.category && (
                <span className="rounded-full border border-white/30 px-3 py-1 text-[0.65rem] uppercase tracking-[0.3em] text-stone-200">
                  {item.category}
                </span>
              )}
              <span
                className={`ml-auto text-2xl transition-transform ${
                  isOpen ? "rotate-45" : ""
                }`}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div
                className={`overflow-hidden border-t border-white/10 px-6 text-stone-200 transition-all duration-500 ease-in-out ${
                  isOpen ? "py-6 opacity-100" : "py-0 opacity-0"
                }`}
              >
                <p className="text-sm leading-relaxed">{item.content}</p>

                {item.image_url && (
                  <div className="mt-6 flex w-full justify-center">
                    <div className="w-full max-w-[800px] overflow-hidden rounded-2xl border border-white/10">
                      <Image
                        src={item.image_url}
                        alt={item.title}
                        width={1200}
                        height={800}
                        className="h-auto w-full object-contain"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  }).format(new Date(date));
}


