import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import ApiStatusBadge from "@/components/api-status-badge"

export default function CloudPage() {
    return (
        <SidebarInset>
            <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb className="flex-1">
                    <BreadcrumbList>
                        <BreadcrumbItem>
                            <BreadcrumbPage>Cloud Dashboard</BreadcrumbPage>
                        </BreadcrumbItem>
                    </BreadcrumbList>
                </Breadcrumb>
                <ApiStatusBadge className="ml-auto" />
            </header>
            <div className="flex flex-1 flex-col gap-4 p-4">
                <h1 className="text-2xl font-bold">Cloud Dashboard</h1>
                <p>Welcome to your cloud dashboard. Select a service from the sidebar to get started.</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="p-6 border rounded-lg bg-card">
                        <h2 className="text-xl font-semibold mb-2">Quick Stats</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Active Services:</span>
                                <span className="font-medium">2</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Resource Usage:</span>
                                <span className="font-medium">42%</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-6 border rounded-lg bg-card">
                        <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
                        <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span>Postgres Database created</span>
                                <span className="text-muted-foreground">2 days ago</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Bun Server deployed</span>
                                <span className="text-muted-foreground">5 days ago</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </SidebarInset>
    )
}
