// Import and re-export from shared services for backward compatibility
import { ApiError, apiService } from "@/shared/services/api.service";

export { ApiError, apiService };

// Legacy API functions for backward compatibility
export const generateImageApi = apiService.generateImage;
export const generateVideoApi = apiService.generateVideo;
