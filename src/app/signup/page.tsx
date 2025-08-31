"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useNotify } from "@/components/notifications/notifications";

export default function SignupPage() {
  const signUpWithPassword = useAuthStore((s) => s.signUpWithPassword);
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle);
  const isLoading = useAuthStore((s) => s.isLoading);
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [signupLoading, setSignupLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const notify = useNotify();

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSignupLoading(true);
    const res = await signUpWithPassword(email, password, {
      firstName: firstName || undefined,
      lastName: lastName || undefined,
      fullName: `${firstName} ${lastName}` || undefined,
    });
    setSignupLoading(false);
    if (!res.ok) {
      notify({
        title: "Signup failed",
        description: res.error ?? "Please try again.",
        variant: "error",
      });
      return;
    }
    notify({
      title: "Check your email",
      description: "Confirm your account, then try logging in.",
      variant: "success",
    });
    // Optional: redirect to login
    setTimeout(() => router.replace("/login"), 800);
  }

  async function onGoogle() {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
      notify({ title: "Redirecting to Google", variant: "info" });
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Image
            src="/logo.svg"
            width={24}
            height={24}
            alt="JobDavis"
            className="h-6 w-6"
          />
          JobDavis
        </a>
        <Card>
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Create account</CardTitle>
            <CardDescription>
              Sign up with your email and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={onSubmit} className="grid gap-6">
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="firstName">First name</Label>
                  <Input
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">Last name</Label>
                  <Input
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
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
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                disabled={isLoading || signupLoading}
                className="w-full"
              >
                {signupLoading ? "Creating account..." : "Sign up"}
              </Button>

              <Button
                type="button"
                variant="outline"
                className="w-full"
                onClick={onGoogle}
                disabled={googleLoading}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                  <path
                    d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.53-1.467-.173-2.053H12.48z"
                    fill="currentColor"
                  />
                </svg>
                {googleLoading ? "Redirecting..." : "Continue with Google"}
              </Button>
              <p className="text-center text-sm">
                Already have an account?{" "}
                <a className="underline underline-offset-4" href="/login">
                  Log in
                </a>
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
