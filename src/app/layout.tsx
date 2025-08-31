import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthInit from "@/components/auth-init";
import { NotificationsProvider } from "@/components/notifications/notifications";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Job Davis",
  description: "A Smarter Way for HR to manage & screen candidates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthInit />
        <NotificationsProvider>{children}</NotificationsProvider>
      </body>
    </html>
  );
}
