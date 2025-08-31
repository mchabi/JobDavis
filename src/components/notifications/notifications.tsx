"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";

type Notice = {
  id: string;
  title?: string;
  description?: string;
  variant?: "success" | "error" | "info" | "warning";
  duration?: number; // ms
};

const NotificationsContext = createContext<{
  notify: (n: Omit<Notice, "id">) => void;
} | null>(null);

export function useNotify() {
  const ctx = useContext(NotificationsContext);
  if (!ctx)
    throw new Error("useNotify must be used within <NotificationsProvider />");
  return ctx.notify;
}

export function NotificationsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [items, setItems] = useState<Notice[]>([]);

  const notify = useCallback((n: Omit<Notice, "id">) => {
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
    const duration = n.duration ?? 3000;
    const item: Notice = { id, ...n, duration };
    setItems((prev) => [...prev, item]);
    window.setTimeout(() => {
      setItems((prev) => prev.filter((x) => x.id !== id));
    }, duration);
  }, []);

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
      <NotificationsViewport
        items={items}
        onDismiss={(id) => setItems((p) => p.filter((x) => x.id !== id))}
      />
    </NotificationsContext.Provider>
  );
}

function variantClasses(v?: Notice["variant"]) {
  switch (v) {
    case "success":
      return "bg-emerald-600 text-white";
    case "error":
      return "bg-red-600 text-white";
    case "warning":
      return "bg-amber-500 text-white";
    case "info":
    default:
      return "bg-primary text-primary-foreground";
  }
}

export function NotificationsViewport({
  items,
  onDismiss,
}: {
  items: Notice[];
  onDismiss: (id: string) => void;
}) {
  return (
    <div className="pointer-events-none fixed right-4 top-4 z-[100] flex w-[360px] max-w-[90vw] flex-col gap-2">
      {items.map((n) => (
        <div
          key={n.id}
          className={`pointer-events-auto rounded-md shadow-md ring-1 ring-black/10 ${variantClasses(n.variant)}`}
          role="status"
        >
          <div className="flex items-start gap-3 p-3">
            <div className="flex-1">
              {n.title && (
                <div className="text-sm font-semibold leading-tight">
                  {n.title}
                </div>
              )}
              {n.description && (
                <div className="mt-0.5 text-xs opacity-90">{n.description}</div>
              )}
            </div>
            <button
              className="text-inherit/80 rounded p-1 transition hover:bg-black/10 hover:text-inherit"
              onClick={() => onDismiss(n.id)}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
