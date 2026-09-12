# CSS Architecture Guide

## BEM Methodology

Block Element Modifier provides a naming convention for scalable CSS.

### Structure

```css
/* Block: Standalone component */
.button { }

/* Element: Part of a block */
.button__icon { }
.button__text { }

/* Modifier: Variation of block/element */
.button--primary { }
.button--large { }
.button__icon--left { }
```

### Example

```css
.card {
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.card__header {
  padding: 16px;
  border-bottom: 1px solid #eee;
}

.card__title {
  font-size: 1.25rem;
  margin: 0;
}

.card__body {
  padding: 16px;
}

.card--elevated {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
}
```

## CSS Variables

```css
:root {
  /* Colors */
  --color-primary: #007bff;
  --color-secondary: #6c757d;
  --color-success: #28a745;
  --color-error: #dc3545;
  
  /* Spacing */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  /* Typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-size-base: 1rem;
  --font-size-sm: 0.875rem;
  --font-size-lg: 1.125rem;
  
  /* Border radius */
  --border-radius-sm: 4px;
  --border-radius-md: 8px;
  --border-radius-lg: 12px;
}

.button {
  padding: var(--spacing-md) var(--spacing-lg);
  background-color: var(--color-primary);
  border-radius: var(--border-radius-md);
  font-family: var(--font-family-base);
}
```

## SCSS/SASS Nesting

```scss
.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  
  &__group {
    display: flex;
    flex-direction: column;
  }
  
  &__label {
    font-weight: 600;
    margin-bottom: var(--spacing-sm);
  }
  
  &__input {
    padding: var(--spacing-sm) var(--spacing-md);
    border: 1px solid #ddd;
    border-radius: var(--border-radius-sm);
    
    &:focus {
      outline: none;
      border-color: var(--color-primary);
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
    }
  }
}
```

## CSS Modules (React)

```css
/* Button.module.css */
.button {
  padding: 12px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.button:hover {
  background-color: #0056b3;
}

.button--secondary {
  background-color: #6c757d;
}
```

```jsx
// Button.jsx
import styles from './Button.module.css';

export function Button({ children, secondary }) {
  return (
    <button className={`${styles.button} ${secondary ? styles['button--secondary'] : ''}`}>
      {children}
    </button>
  );
}
```

## Flexbox Patterns

```css
/* Flex container */
.flex-container {
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
}

/* Equal width children */
.flex-equal > * {
  flex: 1;
}

/* Wrap on small screens */
@media (max-width: 768px) {
  .flex-container {
    flex-direction: column;
  }
}
```

## Grid Patterns

```css
/* Auto-fit grid */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 16px;
}

/* Manual grid */
.grid-manual {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 24px;
}
```

## Performance Tips

```css
/* Minimize paint operations */
.element {
  /* ✅ Efficient: Use transform and opacity */
  transform: translateX(10px);
  opacity: 0.5;
  
  /* ❌ Inefficient: Causes repaints */
  /* left: 10px; */
  /* visibility: hidden; */
}

/* Use will-change sparingly */
.animated {
  will-change: transform;
}
```
