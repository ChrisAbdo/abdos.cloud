'use client';

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { useApiStatus } from "@/hooks/use-api-status";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function ApiStatusBadge({ className }: { className?: string }) {
    const { isOnline, isLoading, data } = useApiStatus();

    const tooltipContent = () => {
        if (isLoading) return "Checking API status...";
        if (!isOnline) return "API server is currently offline";

        return (
            <>
                <div className="font-semibold">Server Information</div>
                <div className="text-xs">Version: {data?.version || 'Unknown'}</div>
                <div className="text-xs">Environment: {data?.env || 'Unknown'}</div>
                <div className="text-xs mt-1">Status: Online</div>
            </>
        );
    };

    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Badge
                    variant={isOnline ? "default" : "destructive"}
                    className={cn("flex items-center gap-1.5", className)}
                >
                    {isLoading ? (
                        <>Loading...</>
                    ) : (
                        <>
                            <span className={`inline-block w-2 h-2 rounded-full ${isOnline ? 'bg-green-500' : 'bg-red-500'}`} />
                            {isOnline ? 'Online' : 'Offline'}
                        </>
                    )}
                </Badge>
            </TooltipTrigger>
            <TooltipContent>
                {tooltipContent()}
            </TooltipContent>
        </Tooltip>
    );
} 