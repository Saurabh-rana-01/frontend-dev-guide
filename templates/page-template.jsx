import React, { useEffect, useState } from 'react';

/**
 * PAGE TEMPLATE
 * Use this as a starting point for page components
 * 
 * Features:
 * - Data fetching
 * - Loading and error states
 * - Layout structure
 * - Meta tags
 */

function PageTemplate({ pageTitle = 'Page Title' }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Replace with actual API call
        const response = await fetch('/api/data');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update page title
  useEffect(() => {
    document.title = pageTitle;
  }, [pageTitle]);

  // Loading state
  if (loading) {
    return (
      <main className="page">
        <div className="loading">Loading...</div>
      </main>
    );
  }

  // Error state
  if (error) {
    return (
      <main className="page">
        <div className="error" role="alert">
          <h2>Error</h2>
          <p>{error}</p>
        </div>
      </main>
    );
  }

  // Success state
  return (
    <main className="page">
      <header className="page__header">
        <h1>{pageTitle}</h1>
      </header>
      
      <div className="page__content">
        {data ? (
          <div>
            {/* Render content */}
            {JSON.stringify(data)}
          </div>
        ) : (
          <p>No data available</p>
        )}
      </div>
    </main>
  );
}

export default PageTemplate;
