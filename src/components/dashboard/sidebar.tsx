'use client'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { userSidebarItems } from "./dashboardItems/index";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function SidebarComponent() {
  const { state } = useSidebar();
  const pathname = usePathname();
  const sidebarItems = userSidebarItems;
  return (
    <Sidebar collapsible="icon">
        <SidebarHeader className="border-b flex justify-between py-3.5">
      <div className="flex items-center justify-between">
          <Link href='/dashboard' className="flex items-center gap-3">
            <Image src="/logo.png" width={35} height={35} alt="logo" className="flex-shrink-0" />
            {state === "expanded" && (
              <h2 className="text-2xl font-semibold">NexArt</h2>
            )}
          </Link>
          <SidebarTrigger className="m-1 cursor-pointer" />
      </div>
        </SidebarHeader>
      <SidebarContent>

          <SidebarGroupContent>
            <SidebarMenu className="flex flex-col gap-5 py-4 px-2">
              {sidebarItems().map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild 
                    // className="w-full flex items-center rounded-md p-2 text-base text-foreground opacity-80 font-medium hover:opacity-100 hover:bg-foreground/10 transition-all"
                    size="default"
                    isActive={
                      item.url === "/" 
                        ? pathname === "/" 
                        : pathname.startsWith(item.url)
                    }
                    className={cn(
                      "text-lg transition-opacity duration-200 ease-in-out",
                      "group-data-[collapsible=icon]:h-full group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:p-2",
                      {
                        "font-medium text-primary": 
                          item.url === "/" 
                            ? pathname === "/" 
                            : pathname.startsWith(item.url),
                        "text-muted-foreground opacity-90 hover:opacity-100": 
                          !(item.url === "/" 
                            ? pathname === "/" 
                            : pathname.startsWith(item.url))
                      }
                    )}
                  >
                    <Link href={item.url} className="flex items-center gap-5 text-lg">
                      <item.icon className="flex-shrink-0" />
                      {state === "expanded" && (
                        <span>{item.title}</span>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>

      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}