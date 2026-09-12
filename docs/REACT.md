# React Development Guide

## Functional Components & Hooks

### Basic Component

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

export default Counter;
```

### useState Hook

```jsx
const [value, setValue] = useState(initialValue);

// Multiple states
const [name, setName] = useState('');
const [age, setAge] = useState(0);
const [isActive, setIsActive] = useState(false);

// Functional update
setCount(prevCount => prevCount + 1);
```

### useEffect Hook

```jsx
// Run after every render
useEffect(() => {
  document.title = `Count: ${count}`;
});

// Run once on mount
useEffect(() => {
  fetchData();
}, []);

// Run when dependencies change
useEffect(() => {
  const timer = setInterval(() => {
    setSeconds(s => s + 1);
  }, 1000);
  
  // Cleanup function
  return () => clearInterval(timer);
}, []);
```

### Custom Hooks

```jsx
function useFetch(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err);
        setLoading(false);
      });
  }, [url]);
  
  return { data, loading, error };
}

// Usage
function User({ userId }) {
  const { data: user, loading } = useFetch(`/api/users/${userId}`);
  
  if (loading) return <div>Loading...</div>;
  return <div>{user.name}</div>;
}
```

## Props and Prop Drilling

### Props

```jsx
function Button({ label, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
}

// Usage
<Button label="Click me" onClick={handleClick} disabled={false} />
```

### Prop Drilling Solution: Context

```jsx
import { createContext, useContext } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');
  
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Usage in component
function Button() {
  const { theme } = useContext(ThemeContext);
  return <button className={theme}>Click</button>;
}
```

## State Management

### useReducer

```jsx
const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>
        Increment
      </button>
    </div>
  );
}
```

## Performance Optimization

### React.memo

```jsx
function Item({ name, onClick }) {
  console.log('Item rendered:', name);
  return <div onClick={onClick}>{name}</div>;
}

// Memoize to prevent unnecessary re-renders
export default React.memo(Item);

// With custom comparison
export default React.memo(
  Item,
  (prevProps, nextProps) => prevProps.name === nextProps.name
);
```

### useMemo

```jsx
function ProductList({ products, sortBy }) {
  const sorted = useMemo(
    () => products.sort((a, b) => a[sortBy] - b[sortBy]),
    [products, sortBy]
  );
  
  return <div>{sorted.map(p => <Item key={p.id} {...p} />)}</div>;
}
```

### useCallback

```jsx
function Parent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(c => c + 1);
  }, []); // Dependencies array
  
  return <Child onClick={handleClick} />;
}
```

## Forms Handling

```jsx
function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate
    if (!formData.email) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    // Submit
    console.log('Submitting:', formData);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
      />
      {errors.email && <span>{errors.email}</span>}
      <button type="submit">Login</button>
    </form>
  );
}
```
