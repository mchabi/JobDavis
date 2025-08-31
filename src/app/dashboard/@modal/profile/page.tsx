"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ProfileForm } from "@/components/profile-form";

export default function ProfileModalPage() {
  const router = useRouter();
  const [open, setOpen] = useState(true);

  // When modal closes, wait for exit animation then navigate
  useEffect(() => {
    if (!open) {
      const t = setTimeout(() => router.push("/dashboard"), 200);
      return () => clearTimeout(t);
    }
  }, [open, router]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Account profile</SheetTitle>
          <SheetDescription>
            Manage how your name and avatar appear across JobDavis.
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">
          <ProfileForm onDone={() => setOpen(false)} />
        </div>
        <SheetFooter className="mt-6">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
