# Deployment Guide

## Build Optimization

### Production Build

```bash
# React with Vite
npm run build

# Output: dist/
# Minified, optimized for production
```

### Environment Configuration

```javascript
// vite.config.js
export default {
  define: {
    __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production')
  }
}
```

## Deployment Platforms

### Vercel (Recommended for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### AWS S3 + CloudFront

```bash
# Build
npm run build

# Upload to S3
aws s3 sync dist/ s3://my-bucket/

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id XXXXXX --paths "/*"
```

## Monitoring & Analytics

### Error Tracking with Sentry

```javascript
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

export default Sentry.withProfiler(App);
```

### Google Analytics

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_ID');
</script>
```

## CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - run: npm install
      - run: npm run lint
      - run: npm test
      - run: npm run build
      
      - name: Deploy to Vercel
        run: npx vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
```

## Rollback Strategy

```bash
# Keep previous builds
# Vercel: Built-in rollback from dashboard
# Netlify: Previous deploys available in dashboard
# AWS: Version S3 objects

# Manual rollback
git revert <commit-hash>
git push
# Re-deploy from CI/CD
```

## Performance Monitoring

```javascript
// Measure page load time
if (performance.timing) {
  const perfData = window.performance.timing;
  const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
  console.log('Page load time: ' + pageLoadTime + 'ms');
}

// Send to analytics
fetch('/api/metrics', {
  method: 'POST',
  body: JSON.stringify({
    pageLoadTime,
    timestamp: new Date()
  })
});
```
