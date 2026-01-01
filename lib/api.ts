// Re-export from shared services for backward compatibility
export { ApiError, apiService } from "@/shared/services/api.service";

// Legacy API functions for backward compatibility
export const generateImageApi = apiService.generateImage;
export const generateVideoApi = apiService.generateVideo;
