"use client";

import { useHealthCheck } from "@/hooks/useHealth";
import { cn } from "@/lib/utils";

export function HealthIndicator() {
  const { data: health, isLoading, error } = useHealthCheck();

  const getStatusColor = () => {
    if (isLoading) return "bg-yellow-500";
    if (error) return "bg-red-500";
    if (health?.status === "ok" || health?.status === "healthy")
      return "bg-green-500";
    return "bg-red-500";
  };

  const getStatusText = () => {
    if (isLoading) return "Checking...";
    if (error) return "Offline";
    if (health?.status === "ok" || health?.status === "healthy")
      return "Online";
    return "Unknown";
  };

  return (
    <div className="fixed top-4 right-4 z-[9999]">
      <div className="flex items-center gap-2 bg-white dark:bg-gray-800 px-3 py-2 rounded-lg shadow-lg border backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full animate-pulse",
              getStatusColor()
            )}
          />
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Backend: {getStatusText()}
          </span>
        </div>
      </div>
    </div>
  );
}
