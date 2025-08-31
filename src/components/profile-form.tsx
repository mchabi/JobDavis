"use client";

import { useState } from "react";
import { useAuthStore } from "@/store/auth";
import { getSupabaseClient } from "@/lib/supabaseClient";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useNotify } from "@/components/notifications/notifications";

export function ProfileForm({ onDone }: { onDone?: () => void }) {
  const user = useAuthStore((s) => s.user);
  const updateProfile = useAuthStore((s) => s.updateProfile);
  const notify = useNotify();
  const [firstName, setFirstName] = useState<string>(
    (user?.user_metadata?.first_name as string) || "",
  );
  const [lastName, setLastName] = useState<string>(
    (user?.user_metadata?.last_name as string) || "",
  );
  const fullName = `${firstName || ""}${firstName && lastName ? " " : ""}${lastName || ""}`;
  const [avatarUrl, setAvatarUrl] = useState<string>(
    (user?.user_metadata?.avatar_url as string) || "",
  );
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const initials = (fullName || user?.email || "U?")
    .split(" ")
    .map((s: string) => s[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  async function onUploadAvatar(file: File) {
    if (!user) return;
    const supabase = getSupabaseClient();
    const ext = (file.name.split(".").pop() || "jpg").toLowerCase();
    // Name image as the user id (single file per user), allow overwrite
    const path = `${user.id}.${ext}`;
    const { error: upErr } = await supabase.storage
      .from("avatars")
      .upload(path, file, {
        upsert: true,
        contentType: file.type,
      });
    if (upErr) {
      setError(upErr.message);
      return;
    }
    const { data } = supabase.storage.from("avatars").getPublicUrl(path);
    const publicUrl = data.publicUrl;
    setAvatarUrl(`${publicUrl}?t=${Date.now()}`);
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);
    const cleanAvatarUrl = avatarUrl ? avatarUrl.split("?")[0] : null;
    const res = await updateProfile({
      firstName: firstName || null,
      lastName: lastName || null,
      fullName: fullName || null,
      avatarUrl: cleanAvatarUrl,
    });
    setSaving(false);
    if (!res.ok) {
      notify({
        title: "Update failed",
        description: res.error || "Please try again.",
        variant: "error",
      });
    } else {
      notify({
        title: "Profile updated",
        description: "Your changes have been saved.",
        variant: "success",
      });
      onDone?.();
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="flex flex-col items-center">
        <div className="group relative">
          <Avatar className="h-40 w-40 shadow-sm ring-2 ring-primary/20">
            <AvatarImage src={avatarUrl || undefined} alt="Avatar" />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <label
            htmlFor="avatar"
            className="absolute inset-0 hidden cursor-pointer items-center justify-center rounded-full bg-black/40 text-xs font-medium text-white backdrop-blur-sm group-hover:flex"
            title="Change profile picture"
          >
            Change
          </label>
          <Input
            id="avatar"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) {
                // Show immediate local preview, then upload
                const tempUrl = URL.createObjectURL(f);
                setAvatarUrl(tempUrl);
                void onUploadAvatar(f);
              }
            }}
          />
        </div>
        <p className="mt-2 text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
      </div>

      <div className="space-y-4 rounded-lg border bg-card p-4">
        <div>
          <h3 className="text-sm font-semibold">Personal Information</h3>
          <p className="text-xs text-muted-foreground">
            Your name will appear across the platform.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="firstName">First name</Label>
            <Input
              id="firstName"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="John"
            />
          </div>
          <div>
            <Label htmlFor="lastName">Last name</Label>
            <Input
              id="lastName"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Doe"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="fullName">Full name</Label>
          <Input
            id="fullName"
            value={fullName}
            readOnly
            className="bg-muted/40"
          />
          <p className="mt-1 text-[11px] text-muted-foreground">
            Full name is automatically generated from your first and last name.
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {message && <p className="text-sm text-muted-foreground">{message}</p>}

      <div className="flex justify-center gap-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Save changes"}
        </Button>
      </div>
    </form>
  );
}
