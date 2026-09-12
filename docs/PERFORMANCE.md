# Performance Optimization Guide

## Code Splitting

### React Lazy Loading

```jsx
import { Suspense, lazy } from 'react';

const HeavyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HeavyComponent />
    </Suspense>
  );
}
```

### Dynamic Imports

```javascript
// On demand
button.addEventListener('click', async () => {
  const module = await import('./modalModule');
  module.openModal();
});
```

## Bundle Analysis

```bash
# Generate bundle report
npm run build -- --report

# Analyze with Webpack Bundle Analyzer
npm install --save-dev webpack-bundle-analyzer
```

## Image Optimization

### Responsive Images

```html
<picture>
  <source srcset="image-large.webp" media="(min-width: 1024px)" type="image/webp">
  <source srcset="image-medium.webp" media="(min-width: 768px)" type="image/webp">
  <source srcset="image-small.webp" type="image/webp">
  <img src="image-fallback.jpg" alt="Description" loading="lazy">
</picture>
```

### Next.js Image Component

```jsx
import Image from 'next/image';

<Image
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
  priority // For above-the-fold
  placeholder="blur" // Blur-up loading
/>
```

## Caching Strategy

### HTTP Caching Headers

```
Cache-Control: public, max-age=3600 (1 hour)
Cache-Control: public, max-age=31536000 (1 year) - for versioned assets
Cache-Control: no-cache, no-store, must-revalidate - for dynamic content
```

## Runtime Performance

### Minimize Layout Shifts

```css
/* Reserve space for images */
img {
  aspect-ratio: 16 / 9;
}

/* Or use width/height attributes */
<img width="800" height="600" src="image.jpg" alt="">
```

### Debouncing & Throttling

```javascript
function debounce(func, delay) {
  let timeout;
  return function (...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
}

function throttle(func, delay) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= delay) {
      func(...args);
      lastRun = now;
    }
  };
}

// Usage
window.addEventListener('resize', debounce(handleResize, 250));
window.addEventListener('scroll', throttle(handleScroll, 100));
```

### Virtual Scrolling (React)

```jsx
import { FixedSizeList } from 'react-window';

function ItemList({ items }) {
  const Row = ({ index, style }) => (
    <div style={style}>{items[index]}</div>
  );
  
  return (
    <FixedSizeList
      height={600}
      itemCount={items.length}
      itemSize={35}
      width="100%"
    >
      {Row}
    </FixedSizeList>
  );
}
```

## Web Vitals

### Measuring Performance

```javascript
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

getCLS(console.log); // Cumulative Layout Shift
getFID(console.log); // First Input Delay
getFCP(console.log); // First Contentful Paint
getLCP(console.log); // Largest Contentful Paint
getTTFB(console.log); // Time to First Byte
```

## Network Optimization

### Service Workers

```javascript
// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js');
}
```

### Resource Hints

```html
<!-- DNS prefetch -->
<link rel="dns-prefetch" href="//example.com">

<!-- Preconnect -->
<link rel="preconnect" href="//example.com">

<!-- Prefetch -->
<link rel="prefetch" href="/next-page.js">

<!-- Preload critical resources -->
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin>
```
