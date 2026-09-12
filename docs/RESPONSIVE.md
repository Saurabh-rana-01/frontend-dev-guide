# Responsive Design Guide

## Mobile-First Approach

Start with mobile design, then progressively enhance for larger screens.

### Breakpoints

```css
/* Mobile: 320px and up (default) */
.container { width: 100%; }

/* Tablet: 768px and up */
@media (min-width: 768px) {
  .container { width: 750px; }
}

/* Desktop: 1024px and up */
@media (min-width: 1024px) {
  .container { width: 970px; }
}

/* Large Desktop: 1440px and up */
@media (min-width: 1440px) {
  .container { width: 1320px; }
}
```

## Flexible Layouts

### CSS Flexbox

```css
.flex-container {
  display: flex;
  flex-direction: column; /* Stack on mobile */
  gap: 1rem;
}

@media (min-width: 768px) {
  .flex-container {
    flex-direction: row; /* Side-by-side on tablet+ */
  }
}
```

### CSS Grid

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr; /* 1 column on mobile */
  gap: 1rem;
}

@media (min-width: 768px) {
  .grid-container {
    grid-template-columns: repeat(2, 1fr); /* 2 columns on tablet */
  }
}

@media (min-width: 1024px) {
  .grid-container {
    grid-template-columns: repeat(3, 1fr); /* 3 columns on desktop */
  }
}
```

## Responsive Typography

```css
/* Fluid typography */
body {
  font-size: clamp(1rem, 2.5vw, 1.25rem);
}

h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
```

## Viewport Meta Tag

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

## Touch-Friendly Design

### Minimum Touch Target Size
```css
/* Minimum 48x48px for touch targets */
button, a[role="button"] {
  min-height: 48px;
  min-width: 48px;
  padding: 12px 16px;
}
```

### Avoid Hover-Only Interactions

```css
button {
  /* Works on both hover and focus */
  transition: background-color 0.2s ease;
}

button:hover,
button:focus {
  background-color: #0056b3;
}
```

## Image Optimization

```html
<!-- Responsive images -->
<picture>
  <source media="(min-width: 1024px)" srcset="large.jpg">
  <source media="(min-width: 768px)" srcset="medium.jpg">
  <img src="small.jpg" alt="Description">
</picture>

<!-- Or use srcset -->
<img 
  src="small.jpg"
  srcset="medium.jpg 768w, large.jpg 1024w"
  sizes="(min-width: 1024px) 1024px, (min-width: 768px) 768px, 100vw"
  alt="Description"
>
```
