import { useQuery } from '@tanstack/react-query';
import { httpService, apiEndpoints } from '@/lib/httpService';
import { HealthResponse } from '@/types/api';

// Health check hook
export const useHealthCheck = () => {
  return useQuery<HealthResponse>({
    queryKey: ['health'],
    queryFn: () => httpService.get(apiEndpoints.health),
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    retryDelay: 1000,
    staleTime: 10000, // Consider data fresh for 10 seconds
  });
};