# HTML Best Practices

## Semantic Markup

### Document Structure

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Page Title</title>
  <meta name="description" content="Page description for SEO">
</head>
<body>
  <header>
    <nav>Navigation</nav>
  </header>
  
  <main>
    <article>
      <h1>Main Content</h1>
      <section>Section content</section>
    </article>
    <aside>Sidebar or related content</aside>
  </main>
  
  <footer>Footer information</footer>
</body>
</html>
```

## Heading Hierarchy

```html
<!-- Correct: Sequential h1 → h2 → h3 -->
<h1>Page Title</h1>
<h2>Section 1</h2>
<h3>Subsection 1.1</h3>
<h2>Section 2</h2>

<!-- Incorrect: Skipping levels -->
<h1>Title</h1>
<h3>Skipped h2!</h3> <!-- ❌ Avoid -->
```

## Semantic Elements

```html
<!-- Use semantic elements for better accessibility -->
<header>Site header</header>
<nav>Navigation links</nav>
<main>Main content</main>
<article>Full article</article>
<section>Content section</section>
<aside>Related content</aside>
<footer>Footer</footer>

<!-- Avoid overusing divs -->
<div>← Generic container</div> <!-- Only when no semantic element fits -->
```

## ARIA Accessibility

```html
<!-- Landmark roles for screen readers -->
<nav aria-label="Main navigation">...</nav>
<button aria-label="Close menu">×</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true" role="status">
  Loading results...
</div>

<!-- Required attributes -->
<label for="email">Email:</label>
<input id="email" type="email" required aria-required="true">
```

## SEO Best Practices

```html
<head>
  <!-- Essential meta tags -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="150-160 character description">
  <meta name="keywords" content="relevant, keywords">
  
  <!-- Open Graph for social sharing -->
  <meta property="og:title" content="Page Title">
  <meta property="og:description" content="Description">
  <meta property="og:image" content="https://example.com/image.jpg">
  <meta property="og:url" content="https://example.com/page">
  
  <!-- Canonical URL -->
  <link rel="canonical" href="https://example.com/page">
  
  <!-- Favicon -->
  <link rel="icon" href="/favicon.ico">
</head>
```

## Forms Best Practices

```html
<!-- Proper form structure -->
<form method="POST" action="/submit">
  <!-- Grouped with fieldset -->
  <fieldset>
    <legend>Personal Information</legend>
    
    <div class="form-group">
      <label for="firstName">First Name</label>
      <input 
        id="firstName" 
        type="text" 
        name="firstName" 
        required
        aria-required="true"
        aria-describedby="firstName-help"
      >
      <small id="firstName-help">First name is required</small>
    </div>
    
    <div class="form-group">
      <label for="email">Email</label>
      <input 
        id="email" 
        type="email" 
        name="email" 
        required
        aria-required="true"
      >
    </div>
  </fieldset>
  
  <button type="submit">Submit</button>
</form>
```
