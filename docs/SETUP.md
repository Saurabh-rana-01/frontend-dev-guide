# Project Setup Guide

## Environment Configuration

### Prerequisites
- Node.js v16 or higher
- npm v7+ or yarn v1.22+
- Git v2.3+
- Code editor (VS Code recommended)

### Initial Setup

```bash
# Install Node.js dependencies
npm install

# Verify installation
node --version
npm --version
```

### Development Environment

#### VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- HTML CSS Support
- Thunder Client (API testing)

#### NPM Scripts

```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "eslint src --ext .js,.jsx",
    "format": "prettier --write \"src/**/*.{js,jsx,css}\"",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage"
  }
}
```

### Configuration Files

#### .env.example
```
VITE_API_URL=http://localhost:3000/api
VITE_APP_NAME=Frontend App
VITE_DEBUG=false
```

#### .gitignore
```
node_modules/
dist/
build/
.env.local
.DS_Store
*.log
```

### First Run

```bash
# Copy environment template
cp .env.example .env.local

# Start development server
npm run dev

# Open http://localhost:5173 in browser
```

## Docker Setup (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev"]
```

```bash
docker build -t frontend-app .
docker run -p 5173:5173 frontend-app
```
