"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";

export default function ForgotPasswordPage() {
  const sendResetPassword = useAuthStore((s) => s.sendResetPassword);
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMsg(null);
    setError(null);
    setLoading(true);
    const res = await sendResetPassword(email);
    setLoading(false);
    if (!res.ok) {
      setError(res.error || "Failed to send reset email");
      return;
    }
    setMsg("Password reset link sent. Check your email.");
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Forgot password</CardTitle>
            <CardDescription>
              Enter your email to receive a reset link
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {error ? (
                <p className="text-sm text-destructive">{error}</p>
              ) : null}
              {msg ? (
                <p className="text-sm text-muted-foreground">{msg}</p>
              ) : null}
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Sending..." : "Send reset email"}
              </Button>
              <p className="text-center text-sm">
                Remembered your password?{" "}
                <a className="underline underline-offset-4" href="/login">
                  Back to login
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
