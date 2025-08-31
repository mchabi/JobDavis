"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Session, User } from "@supabase/supabase-js";
import { getSupabaseClient } from "@/lib/supabaseClient";

export type AuthState = {
  user: User | null;
  session: Session | null;
  accessToken: string | null;
  isLoading: boolean;
  error: string | null;
  hydrated: boolean;
  // actions
  setSession: (session: Session | null) => void;
  setHydrated: (v: boolean) => void;
  signInWithPassword: (
    email: string,
    password: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  signUpWithPassword: (
    email: string,
    password: string,
    names?: { firstName?: string; lastName?: string; fullName?: string },
  ) => Promise<{ ok: boolean; error?: string }>;
  signInWithGoogle: () => Promise<void>;
  signInWithMagicLink: (
    email: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  verifyEmailOtp: (
    email: string,
    token: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  sendResetPassword: (
    email: string,
  ) => Promise<{ ok: boolean; error?: string }>;
  signOut: () => Promise<void>;
  refreshFromSupabase: () => Promise<void>;
  updateProfile: (fields: {
    firstName?: string | null;
    lastName?: string | null;
    fullName?: string | null;
    avatarUrl?: string | null;
  }) => Promise<{ ok: boolean; error?: string }>;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      session: null,
      accessToken: null,
      isLoading: false,
      error: null,
      hydrated: false,

      setSession: (session) => {
        set({
          session,
          user: session?.user ?? null,
          accessToken: session?.access_token ?? null,
          error: null,
          isLoading: false,
        });
      },
      setHydrated: (v) => set({ hydrated: v }),

      signInWithPassword: async (email, password) => {
        const supabase = getSupabaseClient();
        set({ isLoading: true, error: null });
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) {
          set({ isLoading: false, error: error.message });
          return { ok: false, error: error.message };
        }
        set({
          isLoading: false,
          session: data.session,
          user: data.user ?? null,
          accessToken: data.session?.access_token ?? null,
          error: null,
        });
        return { ok: true };
      },

      signUpWithPassword: async (email, password, names) => {
        const supabase = getSupabaseClient();
        set({ isLoading: true, error: null });
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              first_name: names?.firstName ?? null,
              last_name: names?.lastName ?? null,
              full_name: names?.fullName ?? null,
            },
          },
        });
        if (error) {
          set({ isLoading: false, error: error.message });
          return { ok: false, error: error.message };
        }
        // Depending on email confirmation settings, session may be null
        set({
          isLoading: false,
          session: data.session ?? null,
          user: data.user ?? null,
          accessToken: data.session?.access_token ?? null,
          error: null,
        });
        return { ok: true };
      },

      signInWithGoogle: async () => {
        const supabase = getSupabaseClient();
        await supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: window.location.origin },
        });
      },

      signInWithMagicLink: async (email) => {
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.signInWithOtp({
          email,
          options: { emailRedirectTo: `${window.location.origin}` },
        });
        if (error) {
          set({ error: error.message });
          return { ok: false, error: error.message };
        }
        return { ok: true };
      },

      verifyEmailOtp: async (email, token) => {
        const supabase = getSupabaseClient();
        const { data, error } = await supabase.auth.verifyOtp({
          type: "email",
          email,
          token,
        });
        if (error) {
          set({ error: error.message });
          return { ok: false, error: error.message };
        }
        set({
          session: data.session ?? null,
          user: data.user ?? null,
          accessToken: data.session?.access_token ?? null,
          error: null,
        });
        return { ok: true };
      },

      sendResetPassword: async (email) => {
        const supabase = getSupabaseClient();
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) {
          set({ error: error.message });
          return { ok: false, error: error.message };
        }
        return { ok: true };
      },

      updateProfile: async (names) => {
        const supabase = getSupabaseClient();
        set({ isLoading: true, error: null });
        const { data, error } = await supabase.auth.updateUser({
          data: {
            first_name: names.firstName ?? null,
            last_name: names.lastName ?? null,
            full_name: names.fullName ?? null,
            avatar_url: names.avatarUrl ?? undefined,
          },
        });
        if (error) {
          set({ isLoading: false, error: error.message });
          return { ok: false, error: error.message };
        }
        set({
          isLoading: false,
          user: data.user ?? null,
          error: null,
        });
        return { ok: true };
      },

      signOut: async () => {
        const supabase = getSupabaseClient();
        await supabase.auth.signOut();
        set({ user: null, session: null, accessToken: null, error: null });
      },

      refreshFromSupabase: async () => {
        const supabase = getSupabaseClient();
        const { data } = await supabase.auth.getSession();
        set({
          session: data.session ?? null,
          user: data.session?.user ?? null,
          accessToken: data.session?.access_token ?? null,
        });
      },
    }),
    {
      name: "auth-store",
      partialize: (state) => ({
        accessToken: state.accessToken,
        user: state.user,
      }),
    },
  ),
);
