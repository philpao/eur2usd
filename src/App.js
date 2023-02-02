import { useState } from "react";
import './App.css';
import "./CurrencyConverter";
import { CurrencyConverter } from './CurrencyConverter';
import React from 'react';

function App() {

  const [fx, setFx] = useState(1.1);

  setTimeout(() => {
    const delta = -0.05 + (Math.random()) * 0.1;
    setFx(s => s + delta);
  }, 3000);

  return (
    <div>
      <CurrencyConverter fx={fx} />
    </div>
  );
}

export default App;
