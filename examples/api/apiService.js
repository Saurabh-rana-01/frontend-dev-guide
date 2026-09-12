/**
 * API Service Example
 * Handles all backend communication
 */

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.timeout = 10000;
  }

  /**
   * Make HTTP request
   * @param {string} endpoint - API endpoint
   * @param {object} options - Fetch options
   * @returns {Promise} Response data
   */
  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const token = this.getAuthToken();

    const config = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    };

    // Add authorization token if available
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError(
          response.statusText,
          response.status,
          await response.json()
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError('Network request failed', 0, error);
    }
  }

  /**
   * GET request
   */
  get(endpoint) {
    return this.request(endpoint, { method: 'GET' });
  }

  /**
   * POST request
   */
  post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  /**
   * PUT request
   */
  put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  /**
   * DELETE request
   */
  delete(endpoint) {
    return this.request(endpoint, { method: 'DELETE' });
  }

  /**
   * Set authentication token
   */
  setAuthToken(token) {
    if (token) {
      localStorage.setItem('authToken', token);
    } else {
      localStorage.removeItem('authToken');
    }
  }

  /**
   * Get authentication token
   */
  getAuthToken() {
    return localStorage.getItem('authToken');
  }

  /**
   * Clear authentication
   */
  clearAuth() {
    this.setAuthToken(null);
  }
}

/**
 * Custom API Error
 */
class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

/**
 * User API endpoints
 */
export const userApi = {
  getProfile: () => api.get('/users/me'),
  updateProfile: (data) => api.put('/users/me', data),
  getUsers: () => api.get('/users'),
  getUser: (id) => api.get(`/users/${id}`),
  createUser: (data) => api.post('/users', data),
  deleteUser: (id) => api.delete(`/users/${id}`),
};

/**
 * Post API endpoints
 */
export const postsApi = {
  getPosts: () => api.get('/posts'),
  getPost: (id) => api.get(`/posts/${id}`),
  createPost: (data) => api.post('/posts', data),
  updatePost: (id, data) => api.put(`/posts/${id}`, data),
  deletePost: (id) => api.delete(`/posts/${id}`),
};

/**
 * Authentication endpoints
 */
export const authApi = {
  login: (email, password) =>
    api.post('/auth/login', { email, password }).then((res) => {
      api.setAuthToken(res.token);
      return res;
    }),

  register: (data) =>
    api.post('/auth/register', data).then((res) => {
      api.setAuthToken(res.token);
      return res;
    }),

  logout: () => {
    api.clearAuth();
  },

  refreshToken: () => api.post('/auth/refresh', {}),
};

const api = new ApiService();

export default api;
export { ApiError };
