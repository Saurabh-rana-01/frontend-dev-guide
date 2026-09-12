# Code Quality Guide

## ESLint Configuration

### .eslintrc.js

```javascript
module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    'react/react-in-jsx-scope': 'off', // Not needed in React 17+
    'react/prop-types': 'off', // Use TypeScript instead
    'no-console': 'warn',
  },
};
```

## Prettier Configuration

### .prettierrc

```json
{
  "singleQuote": true,
  "trailingComma": "es5",
  "tabWidth": 2,
  "semi": true,
  "printWidth": 80
}
```

## Testing

### Unit Testing with Jest

```javascript
// math.test.js
import { add, multiply } from './math';

describe('Math functions', () => {
  test('adds numbers correctly', () => {
    expect(add(2, 3)).toBe(5);
  });
  
  test('multiplies numbers correctly', () => {
    expect(multiply(3, 4)).toBe(12);
  });
});
```

### React Component Testing

```jsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './Button';

describe('Button component', () => {
  test('renders button with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
  
  test('calls onClick handler', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    
    await userEvent.click(screen.getByText('Click'));
    expect(handleClick).toHaveBeenCalled();
  });
});
```

## Git Hooks

### pre-commit Hook

```bash
#!/bin/sh
# .husky/pre-commit
npm run lint:fix
npm run format
git add .
```

### Setup with Husky

```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

### .lintstagedrc

```json
{
  "*.{js,jsx}": ["eslint --fix", "prettier --write"],
  "*.css": ["prettier --write"]
}
```
