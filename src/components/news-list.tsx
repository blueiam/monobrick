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
                <div 
                  className="prose prose-sm sm:prose lg:prose-lg prose-invert max-w-none text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: item.content }}
                />

                {item.file_url && (
                  <div className="mt-4">
                    <a
                      href={item.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 px-4 py-2 text-sm font-semibold text-amber-300 transition hover:bg-amber-500/20 hover:border-amber-500/50"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Download PDF
                    </a>
                  </div>
                )}

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


