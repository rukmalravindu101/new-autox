import { API_BASE_URL, STORAGE_KEYS } from '../utils/constants';

// API response interface
interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any[];
}

// HTTP methods
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// Request options
interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  requiresAuth?: boolean;
}

/**
 * Base API client
 */
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private getAuthToken(): string | null {
    return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  private getHeaders(requiresAuth: boolean = false): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (requiresAuth) {
      const token = this.getAuthToken();
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }
    }

    return headers;
  }

  async request<T = any>(
    endpoint: string, 
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    const {
      method = 'GET',
      body,
      requiresAuth = false,
      headers: customHeaders = {}
    } = options;

    const url = `${this.baseURL}${endpoint}`;
    const headers = { ...this.getHeaders(requiresAuth), ...customHeaders };

    try {
      const config: RequestInit = {
        method,
        headers,
      };

      if (body && method !== 'GET') {
        config.body = JSON.stringify(body);
      }

      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Convenience methods
  get<T = any>(endpoint: string, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET', requiresAuth });
  }

  post<T = any>(endpoint: string, body: any, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'POST', body, requiresAuth });
  }

  put<T = any>(endpoint: string, body: any, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'PUT', body, requiresAuth });
  }

  delete<T = any>(endpoint: string, requiresAuth = false): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE', requiresAuth });
  }
}

// Create API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// Auth API methods
export const authApi = {
  register: (userData: any) => apiClient.post('/auth/register', userData),
  login: (credentials: any) => apiClient.post('/auth/login', credentials),
  getProfile: () => apiClient.get('/auth/me', true),
  updateProfile: (userData: any) => apiClient.put('/auth/profile', userData, true),
  changePassword: (passwordData: any) => apiClient.post('/auth/change-password', passwordData, true),
  logout: () => apiClient.post('/auth/logout', {}, true)
};

// Materials API methods
export const materialsApi = {
  getAll: (params?: any) => apiClient.get(`/materials${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id: string) => apiClient.get(`/materials/${id}`),
  create: (materialData: any) => apiClient.post('/materials', materialData, true),
  update: (id: string, materialData: any) => apiClient.put(`/materials/${id}`, materialData, true),
  delete: (id: string) => apiClient.delete(`/materials/${id}`, true),
  getCategories: () => apiClient.get('/materials/categories/list')
};

// Vehicles API methods
export const vehiclesApi = {
  getAll: (params?: any) => apiClient.get(`/vehicles${params ? `?${new URLSearchParams(params)}` : ''}`),
  getById: (id: string) => apiClient.get(`/vehicles/${id}`),
  create: (vehicleData: any) => apiClient.post('/vehicles', vehicleData, true),
  update: (id: string, vehicleData: any) => apiClient.put(`/vehicles/${id}`, vehicleData, true),
  delete: (id: string) => apiClient.delete(`/vehicles/${id}`, true),
  updateAvailability: (id: string, availabilityData: any) => apiClient.post(`/vehicles/${id}/availability`, availabilityData, true),
  getCategories: () => apiClient.get('/vehicles/categories/list')
};

// Partners API methods
export const partnersApi = {
  register: (partnerData: any) => apiClient.post('/partners/register', partnerData, true),
  getProfile: () => apiClient.get('/partners/me', true),
  updateProfile: (partnerData: any) => apiClient.put('/partners/me', partnerData, true),
  getAll: (params?: any) => apiClient.get(`/partners${params ? `?${new URLSearchParams(params)}` : ''}`, true),
  verify: (id: string, verificationData: any) => apiClient.put(`/partners/${id}/verify`, verificationData, true)
};

// Service Requests API methods
export const serviceRequestsApi = {
  create: (requestData: any) => apiClient.post('/service-requests', requestData, true),
  getAll: (params?: any) => apiClient.get(`/service-requests${params ? `?${new URLSearchParams(params)}` : ''}`, true),
  getById: (id: string) => apiClient.get(`/service-requests/${id}`, true),
  updateStatus: (id: string, statusData: any) => apiClient.put(`/service-requests/${id}/status`, statusData, true),
  addFeedback: (id: string, feedbackData: any) => apiClient.post(`/service-requests/${id}/feedback`, feedbackData, true)
};

// Upload API methods
export const uploadApi = {
  profileImage: (file: File) => {
    const formData = new FormData();
    formData.append('profileImage', file);
    
    return fetch(`${API_BASE_URL}/upload/profile-image`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)}`
      },
      body: formData
    }).then(res => res.json());
  },
  
  documents: (files: File[]) => {
    const formData = new FormData();
    files.forEach(file => formData.append('documents', file));
    
    return fetch(`${API_BASE_URL}/upload/documents`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN)}`
      },
      body: formData
    }).then(res => res.json());
  }
};