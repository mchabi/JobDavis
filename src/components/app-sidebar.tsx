"use client";

import { useAuthStore } from "@/store/auth";
import * as React from "react";
import Image from "next/image";
import {
  BarChartIcon,
  FolderIcon,
  LayoutDashboardIcon,
  ListIcon,
  UsersIcon,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import routes from "@/components/routes.json";

const iconMap = {
  LayoutDashboard: LayoutDashboardIcon,
  Users: UsersIcon,
  List: ListIcon,
  BarChart: BarChartIcon,
  Folder: FolderIcon,
} as const;

const data = {
  navMain: routes.map((r) => ({
    id: r.id,
    title: r.title,
    url: r.url,
    icon: r.icon ? (iconMap as any)[r.icon] : undefined,
  })),
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const authUser = useAuthStore((s) => s.user);
  const fullName =
    (authUser?.user_metadata?.full_name as string) ||
    [authUser?.user_metadata?.first_name, authUser?.user_metadata?.last_name]
      .filter(Boolean)
      .join(" ");
  const email = authUser?.email || "";
  const avatarUrl = (authUser?.user_metadata as any)?.avatar_url as
    | string
    | undefined;
  const displayName = fullName || email || "User";
  const userForNav = {
    name: displayName,
    email,
    avatar: avatarUrl ?? "/logo.svg",
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="bg-red-200 p-10 data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="/">
                <Image
                  src="/logo.svg"
                  alt="JobDavis"
                  width={24}
                  height={24}
                  className="h-10 w-10"
                />
                <span className="text-base font-semibold">JobDavis</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={userForNav} />
      </SidebarFooter>
    </Sidebar>
  );
}
