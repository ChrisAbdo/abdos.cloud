"use client"

import * as React from "react"
import { Code, Command, DatabaseIcon, Server } from "lucide-react"
import { usePathname } from "next/navigation"
import Link from "next/link"

import { NavUser } from "./nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { ModeToggle } from "./mode-toggle"

// Define the user data
const userData = {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
}

// Define the navigation items with their routes
const navigationItems = [
    {
        title: "Create Postgres Database",
        href: "/cloud/postgres",
        icon: DatabaseIcon,
    },
    {
        title: "Bun Web Server",
        href: "/cloud/bun-server",
        icon: Server,
    },
    {
        title: "Next.js App",
        href: "/cloud/nextjs",
        icon: Code,
    },
]

// Define interface for deployed services
interface DeployedService {
    name: string
    type: string
    status: string
    date: string
    region: string
}

// Empty array for deployed services (will be populated from DB in the future)
const deployedServices: DeployedService[] = []

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()

    return (
        <Sidebar
            collapsible="icon"
            className="overflow-hidden [&>[data-sidebar=sidebar]]:flex-row"
            {...props}
        >
            {/* This is the first sidebar */}
            <Sidebar
                collapsible="none"
                className="!w-[calc(var(--sidebar-width-icon)_+_1px)] border-r"
            >
                <SidebarHeader>
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                                <Link href="/cloud">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <Command className="size-4" />
                                    </div>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">Acme Inc</span>
                                        <span className="truncate text-xs">Enterprise</span>
                                    </div>
                                </Link>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarHeader>
                <SidebarContent>
                    <SidebarGroup>
                        <SidebarGroupContent className="px-1.5 md:px-0">
                            <SidebarMenu>
                                {navigationItems.map((item) => (
                                    <SidebarMenuItem key={item.title}>
                                        <SidebarMenuButton
                                            tooltip={{
                                                children: item.title,
                                                hidden: false,
                                            }}
                                            asChild
                                            isActive={pathname === item.href}
                                            className="px-2.5 md:px-2"
                                        >
                                            <Link href={item.href}>
                                                <item.icon />
                                                <span>{item.title}</span>
                                            </Link>
                                        </SidebarMenuButton>
                                    </SidebarMenuItem>
                                ))}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
                <SidebarFooter>
                    <ModeToggle />
                    <NavUser user={userData} />
                </SidebarFooter>
            </Sidebar>

            {/* This is the second sidebar showing deployed services */}
            <div className="hidden flex-1 flex-col border-l md:flex">
                <div className="flex flex-col gap-3.5 border-b p-4">
                    <div className="flex w-full items-center">
                        <div className="text-base font-medium text-foreground">
                            Your Deployments
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder="Search deployments..."
                        />
                    </div>
                </div>
                <div className="flex-1 overflow-auto">
                    {deployedServices.length > 0 ? (
                        deployedServices.map((service) => (
                            <a
                                href="#"
                                key={service.name}
                                className="flex flex-col items-start gap-2 whitespace-nowrap border-b p-4 text-sm leading-tight last:border-b-0 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                            >
                                <div className="flex w-full items-center gap-2">
                                    <span>{service.name}</span>{" "}
                                    <span className="ml-auto text-xs">{service.date}</span>
                                </div>
                                <span className="font-medium">{service.type}</span>
                                <span className="line-clamp-2 text-xs opacity-70">
                                    {service.region} • {service.status}
                                </span>
                            </a>
                        ))
                    ) : (
                        <div className="p-4 text-sm text-muted-foreground">
                            No deployments available. Create a new service to get started.
                        </div>
                    )}
                </div>
            </div>
        </Sidebar>
    )
}
