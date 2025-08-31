"use client";

import { useEffect, useMemo } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export default function Protected({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((s) => s.user);
  const accessToken = useAuthStore((s) => s.accessToken);
  const hydrated = useAuthStore((s) => s.hydrated);

  const isAuthed = useMemo(
    () => Boolean(user && accessToken),
    [user, accessToken],
  );

  useEffect(() => {
    // Wait for hydration before making redirect decisions
    if (!hydrated) return;
    // If not authenticated and under /dashboard, redirect to /login
    if (!isAuthed && pathname?.startsWith("/dashboard")) {
      router.replace("/login");
    }
  }, [hydrated, isAuthed, pathname, router]);

  // Avoid flashing content until hydration is complete
  if (!hydrated) return null;
  if (!isAuthed) return null;
  return <>{children}</>;
}
