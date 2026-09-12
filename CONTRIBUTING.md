# Contributing Guidelines

Thank you for your interest in contributing to the Frontend Development Guide!

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/frontend-dev-guide.git`
3. Create a feature branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`

## Development Workflow

### Before Making Changes

- Update your main branch: `git pull origin main`
- Create a new branch from main
- Keep commits small and focused

### Code Style

- Follow the ESLint configuration
- Use Prettier for formatting
- Run `npm run lint:fix` and `npm run format` before committing

### Commit Messages

Follow the conventional commit format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

Example:
```
feat(react): add custom useForm hook

Implements a custom hook for handling form state and validation.
Includes support for required fields and email validation.

Closes #123
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`

## Making Changes

1. **Documentation Changes**: Update relevant files in `/docs`
2. **Code Examples**: Add examples to `/examples`
3. **Templates**: Update component templates in `/templates`

### Example Structure

```
├── docs/
│   └── FEATURE.md          # Documentation
├── examples/
│   └── feature/
│       └── example.jsx     # Code examples
└── templates/
    └── feature.template.js # Reusable template
```

## Testing Changes

```bash
# Run linting
npm run lint

# Format code
npm run format

# Run tests
npm test

# Check coverage
npm run test:coverage
```

## Pull Request Process

1. Push to your fork
2. Open a PR against the main repository
3. Provide a clear title and description
4. Link any related issues: `Closes #123`
5. Wait for review and CI checks to pass

### PR Checklist

- [ ] Code follows style guidelines
- [ ] Linting passes (`npm run lint`)
- [ ] Formatting is correct (`npm run format`)
- [ ] Tests pass (`npm test`)
- [ ] Documentation is updated
- [ ] Commit messages follow conventions
- [ ] No new console warnings/errors

## Reporting Issues

- Use clear, descriptive titles
- Describe the current behavior and expected behavior
- Provide steps to reproduce
- Include any relevant code examples
- Mention your environment (OS, browser, Node version)

## Questions?

Feel free to open an issue for questions or discussions.

---

Thank you for contributing! 🎉
