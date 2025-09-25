import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { httpService, apiEndpoints } from '@/lib/httpService';
import { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

// Login hook
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, LoginRequest>({
    mutationFn: (data: LoginRequest) => httpService.post(apiEndpoints.login, data),
    onSuccess: (data) => {
      toast.success(data.message || 'Login successful!');
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Login failed. Please try again.');
    },
  });
};

// Register hook
export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation<AuthResponse, Error, RegisterRequest>({
    mutationFn: (data: RegisterRequest) => httpService.post(apiEndpoints.register, data),
    onSuccess: (data) => {
      toast.success(data.message || 'Registration successful!');
      // Invalidate and refetch user-related queries
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (error) => {
      toast.error(error.message || 'Registration failed. Please try again.');
    },
  });
};