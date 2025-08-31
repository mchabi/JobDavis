import Image from "next/image";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

export function SiteHeader() {
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center justify-between gap-1 px-4 lg:gap-2 lg:px-6">
        <div className="flex items-center gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.svg" alt="JobDavis" width={18} height={18} />
            <span className="text-base font-medium">JobDavis</span>
          </Link>
        </div>
        <nav className="text-sm">
          <Link
            href="/dashboard/profile"
            className="underline underline-offset-4 hover:text-primary"
          >
            Profile
          </Link>
        </nav>
      </div>
    </header>
  );
}
