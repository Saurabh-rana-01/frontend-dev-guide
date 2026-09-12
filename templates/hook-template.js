import { useState, useCallback } from 'react';

/**
 * CUSTOM HOOK TEMPLATE
 * Use this as a starting point for custom React hooks
 * 
 * Features:
 * - State management
 * - Lifecycle handling
 * - Cleanup functions
 * - Custom logic encapsulation
 */

/**
 * useLocalStorage Hook
 * Syncs state with localStorage
 * 
 * @param {string} key - Storage key
 * @param {*} initialValue - Initial value
 * @returns {[*, function]} - [value, setValue]
 */
function useLocalStorage(key, initialValue) {
  // Get stored value or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Update localStorage when state changes
  const setValue = useCallback(
    (value) => {
      try {
        const valueToStore =
          value instanceof Function ? value(storedValue) : value;
        setStoredValue(valueToStore);
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      } catch (error) {
        console.error(`Error setting localStorage key "${key}":`, error);
      }
    },
    [key, storedValue]
  );

  return [storedValue, setValue];
}

/**
 * usePrevious Hook
 * Returns the previous value of a variable
 * 
 * @param {*} value - Current value
 * @returns {*} - Previous value
 */
function usePrevious(value) {
  const ref = React.useRef();
  React.useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

/**
 * useAsync Hook
 * Handles async operations with loading/error states
 * 
 * @param {function} asyncFunction - Async function to execute
 * @param {boolean} immediate - Execute immediately on mount
 * @param {array} dependencies - Dependencies array
 * @returns {object} - { status, value, error, execute }
 */
function useAsync(asyncFunction, immediate = true, dependencies = []) {
  const [status, setStatus] = React.useState('idle');
  const [value, setValue] = React.useState(null);
  const [error, setError] = React.useState(null);

  const execute = React.useCallback(async () => {
    setStatus('pending');
    setValue(null);
    setError(null);
    try {
      const response = await asyncFunction();
      setValue(response);
      setStatus('success');
    } catch (error) {
      setError(error);
      setStatus('error');
    }
  }, [...dependencies]);

  React.useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [execute, immediate]);

  return { execute, status, value, error };
}

export { useLocalStorage, usePrevious, useAsync };
