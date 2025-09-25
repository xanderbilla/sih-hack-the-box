import { useQuery } from "@tanstack/react-query";
import { httpService, apiEndpoints } from "@/lib/httpService";
import { UserProfileResponse } from "@/types/auth";

export const useUserProfile = (enabled: boolean = true) => {
  return useQuery<UserProfileResponse>({
    queryKey: ["userProfile"],
    queryFn: async () => {
      console.log("Fetching user profile...");
      try {
        const result = await httpService.get(apiEndpoints.userProfile);
        console.log("Profile data received:", result);
        return result;
      } catch (error) {
        console.error("Error fetching profile:", error);
        throw error;
      }
    },
    enabled: enabled && typeof window !== "undefined", // Only run on client side
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
    retry: (failureCount, error) => {
      console.log(`Profile fetch attempt ${failureCount + 1} failed:`, error);
      // Don't retry on auth errors (401/403)
      if (
        error instanceof Error &&
        (error.message.includes("401") || error.message.includes("403"))
      ) {
        return false;
      }
      return failureCount < 2;
    },
    retryDelay: 1000,
  });
};
