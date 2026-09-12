# JavaScript Examples

## DOM Manipulation

### Selecting Elements

```javascript
// Single element
const button = document.querySelector('.primary-button');
const element = document.getElementById('main');

// Multiple elements
const buttons = document.querySelectorAll('.button');
const items = document.getElementsByClassName('item');
```

### Event Delegation

```javascript
// Instead of adding listeners to each item
const list = document.querySelector('.list');

list.addEventListener('click', (event) => {
  if (event.target.matches('.item-delete')) {
    const item = event.target.closest('.item');
    const id = item.dataset.id;
    deleteItem(id);
  }
});
```

### Creating Elements Dynamically

```javascript
function createCard(data) {
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = `
    <h2>${data.title}</h2>
    <p>${data.description}</p>
    <button data-id="${data.id}">Delete</button>
  `;
  return card;
}
```

## Asynchronous Operations

### Fetch with Error Handling

```javascript
async function fetchUserData(userId) {
  try {
    const response = await fetch(`/api/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}
```

### Promise Chaining

```javascript
fetch('/api/users')
  .then(response => response.json())
  .then(users => fetchUserPosts(users[0].id))
  .then(posts => console.log('Posts:', posts))
  .catch(error => console.error('Error:', error));
```

## Utility Functions

### Debounce

```javascript
function debounce(func, delay) {
  let timeoutId;
  return function (...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

const handleSearch = debounce((query) => {
  console.log('Searching for:', query);
}, 300);

searchInput.addEventListener('input', (e) => handleSearch(e.target.value));
```

### Throttle

```javascript
function throttle(func, delay) {
  let lastRun = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastRun >= delay) {
      func.apply(this, args);
      lastRun = now;
    }
  };
}

window.addEventListener('scroll', throttle(() => {
  console.log('Scroll event');
}, 1000));
```
