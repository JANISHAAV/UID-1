import React from 'react';

export default function Content() {
  return (
    <main>
      <h2>Welcome to Exercise 1</h2>
      <p>This is a simple ReactJS web application demonstrating dynamic content generation.</p>
      <img src="https://via.placeholder.com/400x200" alt="Sample" />
      <button onClick={() => alert('Hello! You clicked the button!')}>Click Me</button>
    </main>
  );
}
