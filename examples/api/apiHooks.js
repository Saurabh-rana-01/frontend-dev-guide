import { useState, useEffect } from 'react';
import api, { ApiError } from './apiService';

/**
 * Hook for fetching data from API
 * @param {string} endpoint - API endpoint
 * @param {array} dependencies - useEffect dependencies
 * @returns {object} { data, loading, error, refetch }
 */
export function useFetch(endpoint, dependencies = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await api.get(endpoint);
      setData(result);
    } catch (err) {
      setError(
        err instanceof ApiError
          ? err.message
          : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, dependencies);

  return { data, loading, error, refetch: fetchData };
}

/**
 * Hook for mutation (POST, PUT, DELETE)
 * @param {function} apiMethod - API method to call
 * @returns {object} { execute, loading, error, data }
 */
export function useMutation(apiMethod) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const execute = async (payload) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiMethod(payload);
      setData(result);
      return result;
    } catch (err) {
      const errorMessage =
        err instanceof ApiError
          ? err.message
          : 'An unexpected error occurred';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error, data };
}

/**
 * Hook for authentication
 */
export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          const profile = await api.get('/users/me');
          setUser(profile);
        }
      } catch (err) {
        setError('Failed to load user');
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  return {
    user,
    loading,
    error,
    isAuthenticated: !!user,
  };
}
