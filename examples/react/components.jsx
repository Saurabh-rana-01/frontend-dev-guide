import React, { useState } from 'react';
import styles from './Button.module.css';

/**
 * Button Component
 * A versatile, accessible button with multiple variants
 * 
 * @component
 * @example
 * <Button variant="primary">Click me</Button>
 * <Button variant="secondary" disabled>Disabled</Button>
 */
export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  onClick,
  className = '',
  ...props 
}) {
  const buttonClass = `
    ${styles.button}
    ${styles[`button--${variant}`]}
    ${styles[`button--${size}`]}
    ${disabled ? styles['button--disabled'] : ''}
    ${className}
  `.trim();

  return (
    <button
      className={buttonClass}
      disabled={disabled}
      onClick={onClick}
      aria-disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Card Component
 * A container component for displaying grouped content
 */
export function Card({ children, className = '' }) {
  return (
    <article className={`${styles.card} ${className}`.trim()}>
      {children}
    </article>
  );
}

/**
 * Counter Component with useState
 * Demonstrates state management and event handling
 */
export function Counter() {
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);

  const handleIncrement = () => {
    const newCount = count + 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleDecrement = () => {
    const newCount = count - 1;
    setCount(newCount);
    setHistory([...history, newCount]);
  };

  const handleReset = () => {
    setCount(0);
    setHistory([]);
  };

  return (
    <Card>
      <div className={styles.counter}>
        <h2 className={styles.counter__title}>Counter</h2>
        <div className={styles.counter__display}>{count}</div>
        
        <div className={styles.counter__controls}>
          <Button 
            variant="secondary" 
            onClick={handleDecrement}
            aria-label="Decrease count"
          >
            −
          </Button>
          <Button 
            variant="primary" 
            onClick={handleIncrement}
            aria-label="Increase count"
          >
            +
          </Button>
        </div>

        <Button 
          variant="secondary" 
          size="sm"
          onClick={handleReset}
          className={styles.reset}
        >
          Reset
        </Button>

        {history.length > 0 && (
          <div className={styles.history}>
            <p className={styles.history__label}>History:</p>
            <p className={styles.history__values}>{history.join(', ')}</p>
          </div>
        )}
      </div>
    </Card>
  );
}
