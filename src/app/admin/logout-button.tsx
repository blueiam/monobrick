"use client";

import { useRouter } from "next/navigation";
import { createSupabaseClient } from "@/lib/supabase-client";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-sm text-stone-400 transition hover:text-white"
    >
      Logout
    </button>
  );
}


