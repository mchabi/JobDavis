"use client";

import { useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/auth";

export default function AuthInit() {
  const setSession = useAuthStore((s) => s.setSession);

  useEffect(() => {
    const supabase = getSupabaseClient();

    // Hydrate from current session on load
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session ?? null);
    });

    // Subscribe to auth changes
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
    });

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [setSession]);

  return null;
}
