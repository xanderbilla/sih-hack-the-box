// API related types
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
}

export interface HealthResponse {
  status: string;
  message?: string;
  timestamp?: string;
  uptime?: number;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}
