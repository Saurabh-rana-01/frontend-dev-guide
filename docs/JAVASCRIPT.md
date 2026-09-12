# JavaScript Fundamentals

## ES6+ Features

### Arrow Functions

```javascript
// Traditional function
const add = function(a, b) {
  return a + b;
};

// Arrow function
const add = (a, b) => a + b;

// With block body
const multiply = (a, b) => {
  const result = a * b;
  return result;
};
```

### Destructuring

```javascript
// Object destructuring
const { name, email } = user;
const { name: userName } = user; // Rename

// Array destructuring
const [first, second] = array;
const [first, ...rest] = array; // Rest operator
```

### Template Literals

```javascript
const name = 'World';
const greeting = `Hello, ${name}!`;

// Multi-line strings
const message = `
  Line 1
  Line 2
`;
```

## Asynchronous Programming

### Promises

```javascript
const fetchUser = (id) => {
  return new Promise((resolve, reject) => {
    fetch(`/api/users/${id}`)
      .then(response => response.json())
      .then(data => resolve(data))
      .catch(error => reject(error));
  });
};

// Usage
fetchUser(1)
  .then(user => console.log(user))
  .catch(error => console.error(error));
```

### Async/Await

```javascript
async function fetchUserData(id) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Usage
const user = await fetchUserData(1);
```

## DOM Manipulation

### Selecting Elements

```javascript
// Single element
const element = document.querySelector('.my-class');
const element = document.getElementById('my-id');

// Multiple elements
const elements = document.querySelectorAll('.my-class');
const elements = document.getElementsByClassName('my-class');
```

### Modifying Elements

```javascript
// Text content
element.textContent = 'New text';
element.innerHTML = '<strong>Bold text</strong>';

// Attributes
element.setAttribute('data-value', '123');
element.removeAttribute('disabled');
element.dataset.value = '123'; // data- attributes

// Classes
element.classList.add('active');
element.classList.remove('active');
element.classList.toggle('active');
```

### Creating Elements

```javascript
const button = document.createElement('button');
button.textContent = 'Click me';
button.className = 'btn btn-primary';
button.addEventListener('click', handleClick);

container.appendChild(button);
```

## Event Handling

### Event Listeners

```javascript
// Add event listener
element.addEventListener('click', (event) => {
  console.log('Clicked!', event);
});

// Remove event listener
function handleClick() { }
element.addEventListener('click', handleClick);
element.removeEventListener('click', handleClick);

// Event delegation
container.addEventListener('click', (event) => {
  if (event.target.matches('.button')) {
    handleButtonClick(event);
  }
});
```

### Common Events

```javascript
// Form events
input.addEventListener('change', () => {});
input.addEventListener('input', () => {}); // Real-time
form.addEventListener('submit', (event) => {
  event.preventDefault();
});

// Mouse events
element.addEventListener('mouseenter', () => {});
element.addEventListener('mouseleave', () => {});
element.addEventListener('mousedown', () => {});
element.addEventListener('mouseup', () => {});

// Keyboard events
document.addEventListener('keydown', (event) => {
  console.log(event.key, event.code);
});

// Window events
window.addEventListener('scroll', () => {});
window.addEventListener('resize', () => {});
window.addEventListener('load', () => {});
```

## Module Pattern

### ES Modules

```javascript
// math.js
export const add = (a, b) => a + b;
export const multiply = (a, b) => a * b;

export default {
  add,
  multiply
};

// app.js
import { add, multiply } from './math.js';
import math from './math.js';
```

### Closures

```javascript
function createCounter() {
  let count = 0;
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
}

const counter = createCounter();
counter.increment(); // 1
counter.increment(); // 2
```
