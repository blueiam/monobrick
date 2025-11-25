"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { LogoutButton } from "./logout-button";
import { createSupabaseClient } from "@/lib/supabase-client";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      try {
        const supabase = createSupabaseClient();
        const {
          data: { session },
        } = await supabase.auth.getSession();

        if (!session) {
          router.push("/login");
          return;
        }

        setLoading(false);
      } catch (error) {
        console.error("Auth check error:", error);
        router.push("/login");
      }
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-stone-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-950">
      <nav className="border-b border-white/10 bg-stone-900/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/admin/news" className="flex items-center gap-3 text-white">
            <Image
              src="/logo.svg"
              alt="Monobrick logo"
              width={120}
              height={32}
              priority
              className="h-8 w-auto"
            />
            {/* <span className="text-xl font-semibold text-white">MONOBRICK Admin</span> */}
          </Link>
          <div className="flex items-center gap-4">
            {/* <Link
              href="/"
              className="text-sm text-stone-400 transition hover:text-white"
            >
              Art
            </Link>
            <Link
              href="/news"
              className="text-sm text-stone-400 transition hover:text-white"
            >
              News
            </Link>
            <Link
              href="/about"
              className="text-sm text-stone-400 transition hover:text-white"
            >
              About
            </Link> */}
            <Link
              href="/"
              className="text-sm text-stone-400 transition hover:text-white"
            >
              View Site
            </Link>
            <LogoutButton />
          </div>
        </div>
      </nav>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
