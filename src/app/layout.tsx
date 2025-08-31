import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthInit from "@/components/auth-init";
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
        {children}
      </body>
    </html>
  );
}
