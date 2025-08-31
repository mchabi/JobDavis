"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/auth";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const signInWithPassword = useAuthStore((s) => s.signInWithPassword);
  const signInWithGoogle = useAuthStore((s) => s.signInWithGoogle);
  const isLoading = useAuthStore((s) => s.isLoading);
  const storeError = useAuthStore((s) => s.error);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const signInWithMagicLink = useAuthStore((s) => s.signInWithMagicLink);
  const [pwLoading, setPwLoading] = useState(false);
  const [magicLoading, setMagicLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setPwLoading(true);
    const res = await signInWithPassword(email, password);
    setPwLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Login failed");
      return;
    }
    router.replace("/");
  }
  async function onSendMagic() {
    setError(null);
    setInfo(null);
    setMagicLoading(true);
    const res = await signInWithMagicLink(email);
    setMagicLoading(false);
    if (!res.ok) {
      setError(res.error ?? "Failed to send magic link");
      return;
    }
    setInfo("Magic link sent. Check your email to log in.");
  }
  async function onGoogle() {
    try {
      setGoogleLoading(true);
      await signInWithGoogle();
    } finally {
      // It may redirect away; if not, revert the loading state
      setGoogleLoading(false);
    }
  }
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    <a
                      href="/forgot-password"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                  <Input
                    id="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                {error || storeError ? (
                  <p className="text-sm text-destructive">
                    {error || storeError}
                  </p>
                ) : null}
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading || pwLoading}
                >
                  {pwLoading ? "Logging in..." : "Login"}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  className="w-full"
                  onClick={onSendMagic}
                  disabled={!email || magicLoading}
                >
                  {magicLoading
                    ? "Sending magic link..."
                    : "Login with magic link"}
                </Button>
                {info ? (
                  <p className="text-sm text-muted-foreground">{info}</p>
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  onClick={onGoogle}
                  disabled={googleLoading}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                      d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                      fill="currentColor"
                    />
                  </svg>
                  {googleLoading ? "Redirecting..." : "Continue with Google"}
                </Button>
              </div>
              <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="/signup" className="underline underline-offset-4">
                  Sign up
                </a>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
