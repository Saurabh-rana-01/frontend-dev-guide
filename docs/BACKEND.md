# Backend Integration Guide

## REST API Communication

### Fetch API

```javascript
// GET request
fetch('/api/users/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));

// POST request
fetch('/api/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com'
  })
})
.then(response => response.json())
.then(data => console.log('Created:', data));

// PUT request
fetch('/api/users/1', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ name: 'Jane' })
});

// DELETE request
fetch('/api/users/1', {
  method: 'DELETE'
});
```

### Axios

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.example.com',
  timeout: 10000,
});

// GET
api.get('/users/1')
  .then(res => console.log(res.data))
  .catch(err => console.error(err));

// POST
api.post('/users', { name: 'John' })
  .then(res => console.log(res.data));

// PUT
api.put('/users/1', { name: 'Jane' });

// DELETE
api.delete('/users/1');
```

## Error Handling

```javascript
async function fetchUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof TypeError) {
      console.error('Network error:', error);
    } else {
      console.error('Request error:', error.message);
    }
    throw error;
  }
}
```

## Authentication

### Token Storage

```javascript
// Store token after login
const token = response.data.accessToken;
localStorage.setItem('authToken', token);

// Retrieve token
const token = localStorage.getItem('authToken');

// Clear on logout
localStorage.removeItem('authToken');
```

### Adding Authorization Header

```javascript
const token = localStorage.getItem('authToken');

fetch('/api/protected', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Axios interceptor
api.interceptors.request.use(
  config => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);
```

## WebSocket Communication

```javascript
const ws = new WebSocket('ws://localhost:8080');

// Connection opened
ws.addEventListener('open', () => {
  console.log('Connected');
  ws.send(JSON.stringify({ type: 'ping' }));
});

// Message received
ws.addEventListener('message', (event) => {
  const data = JSON.parse(event.data);
  console.log('Message:', data);
});

// Connection closed
ws.addEventListener('close', () => {
  console.log('Disconnected');
});

// Error
ws.addEventListener('error', (error) => {
  console.error('WebSocket error:', error);
});
```

## React Hooks for API

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('API Error');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [url]);
  
  return { data, loading, error };
}
```
