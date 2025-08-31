"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/auth";

export function isAuthenticated<P extends object>(
  Component: React.ComponentType<P>,
) {
  function Guard(props: P) {
    const router = useRouter();
    const pathname = usePathname();
    const user = useAuthStore((s) => s.user);
    const accessToken = useAuthStore((s) => s.accessToken);

    useEffect(() => {
      if (user || accessToken) return;
      if (pathname !== "/login") router.replace("/login");
    }, [user, accessToken, pathname, router]);

    if (!user && !accessToken) return null; // or show a spinner

    return <Component {...(props as P)} />;
  }

  Guard.displayName = `isAuthenticated(${Component.displayName || Component.name || "Component"})`;

  return Guard;
}
