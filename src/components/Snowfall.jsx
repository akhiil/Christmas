import React from 'react';
import '../styles/Snowfall.css';

export function Snowfall() {
  return (
    <div className="snowfall-container">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="snow"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${Math.random() * 3 + 2}s`,
            opacity: Math.random(),
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
          }}
        />
      ))}
    </div>
  );
}