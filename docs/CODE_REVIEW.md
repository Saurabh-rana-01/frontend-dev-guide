# Code Review Guidelines

## Review Checklist

### Functionality
- [ ] Code works as intended
- [ ] All edge cases handled
- [ ] Error handling is appropriate
- [ ] No console errors or warnings

### Performance
- [ ] No unnecessary re-renders (React)
- [ ] No memory leaks
- [ ] Efficient algorithms
- [ ] Appropriate data structures

### Maintainability
- [ ] Code is readable and self-documenting
- [ ] Complex logic has comments
- [ ] Functions are single-responsibility
- [ ] DRY principle followed

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] XSS protection (React auto-escapes)
- [ ] CSRF protection (if applicable)

### Tests
- [ ] Adequate test coverage
- [ ] Tests are meaningful
- [ ] Edge cases tested
- [ ] Tests pass locally

### Documentation
- [ ] README updated if needed
- [ ] Complex functions documented
- [ ] API documentation current

## Review Comments Template

### Suggestion
```
"Consider refactoring this to [suggestion] for better readability."
```

### Question
```
"Why did you choose [approach]? Would [alternative] be better?"
```
### Issue
```
"This could cause [problem] because [reason]. Suggest [fix]."
```

## Common Issues to Look For

### React
- Missing dependencies in useEffect/useCallback
- State updates in event handlers causing re-renders
- Prop drilling instead of context
- Key prop issues in lists

### JavaScript
- Async/await error handling
- Promise chaining issues
- Variable scope problems
- Type coercion bugs

### Performance
- Large bundle size
- Unoptimized images
- Missing key props
- Expensive operations in render
