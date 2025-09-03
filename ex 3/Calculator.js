import React, { useState } from 'react';

export default function Calculator() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [result, setResult] = useState(null);

  const handleAddition = () => setResult(parseFloat(num1) + parseFloat(num2));
  const handleSubtraction = () => setResult(parseFloat(num1) - parseFloat(num2));
  const handleMultiplication = () => setResult(parseFloat(num1) * parseFloat(num2));
  const handleDivision = () => {
    if (parseFloat(num2) === 0) {
      setResult('Cannot divide by zero');
    } else {
      setResult(parseFloat(num1) / parseFloat(num2));
    }
  };

  return (
    <section className="calculator">
      <h2>Simple Calculator</h2>
      <input
        type="number"
        value={num1}
        onChange={(e) => setNum1(e.target.value)}
        placeholder="Enter first number"
      />
      <input
        type="number"
        value={num2}
        onChange={(e) => setNum2(e.target.value)}
        placeholder="Enter second number"
      />

      <div className="buttons">
        <button onClick={handleAddition}>Add</button>
        <button onClick={handleSubtraction}>Subtract</button>
        <button onClick={handleMultiplication}>Multiply</button>
        <button onClick={handleDivision}>Divide</button>
      </div>

      {result !== null && (
        <h3>Result: {result}</h3>
      )}
    </section>
  );
}
