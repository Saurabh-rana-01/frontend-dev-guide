import React, { useState } from 'react';

/**
 * COMPONENT TEMPLATE
 * Use this as a starting point for new React components
 * 
 * Features:
 * - Functional component with hooks
 * - PropTypes validation
 * - Event handlers
 * - State management
 * - Error handling
 */

function MyComponent({ 
  title,
  onSubmit,
  isLoading = false,
  children 
}) {
  const [value, setValue] = useState('');
  const [error, setError] = useState(null);

  // Handle change events
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue(value);
    setError(null);
  };

  // Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!value.trim()) {
      setError('Value is required');
      return;
    }

    try {
      setError(null);
      await onSubmit?.(value);
    } catch (err) {
      setError(err.message || 'An error occurred');
    }
  };

  return (
    <div className="component">
      <h2>{title}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="value"
            value={value}
            onChange={handleChange}
            disabled={isLoading}
            aria-label="Input field"
            aria-describedby={error ? 'error-message' : undefined}
          />
          
          {error && (
            <span id="error-message" role="alert" className="error">
              {error}
            </span>
          )}
        </div>
        
        <button 
          type="submit" 
          disabled={isLoading}
          aria-busy={isLoading}
        >
          {isLoading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      
      {children}
    </div>
  );
}

export default MyComponent;
