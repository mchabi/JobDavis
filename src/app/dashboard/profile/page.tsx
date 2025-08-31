"use client";

import { ProfileForm } from "@/components/profile-form";

export default function ProfilePage() {
  return (
    <div className="mx-auto w-full max-w-2xl p-4 sm:p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Account profile
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage how your name and avatar appear across JobDavis.
        </p>
      </div>
      <div className="mt-6">
        <ProfileForm />
      </div>
    </div>
  );
}
