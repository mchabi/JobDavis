"use client";

import { useEffect } from "react";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { useAuthStore } from "@/store/auth";

export default function AuthInit() {
  const setSession = useAuthStore((s) => s.setSession);
  const refreshFromSupabase = useAuthStore((s) => s.refreshFromSupabase);
  const setHydrated = useAuthStore((s) => s.setHydrated);

  useEffect(() => {
    const supabase = getSupabaseClient();

    // 1) Subscribe ASAP to avoid race conditions on reload
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session ?? null);
      console.log("AuthInit: Auth state changed", session);
    });
    console.log("AuthInit: Subscribed to auth state changes");

    // 2) Hydrate from current session on load and mark as hydrated when done
    (async () => {
      try {
        const [{ data }] = await Promise.all([
          supabase.auth.getSession(),
          // Fallback refresh in parallel
          refreshFromSupabase().catch(() => undefined),
        ]);
        setSession(data.session ?? null);
      } finally {
        // Signal that initial auth hydration is complete
        setHydrated(true);
      }
    })();

    return () => {
      sub.subscription.unsubscribe();
    };
  }, [setSession, refreshFromSupabase, setHydrated]);

  return null;
}
