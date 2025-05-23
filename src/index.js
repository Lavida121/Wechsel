
import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const App = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [currency, setCurrency] = useState('EUR');

  const exchangeRates = {
    EUR: 43.37880,
    USD: 38.37130,
    XAU: 4091.07
  };

  const calculate = () => {
    const value = parseFloat(amount);
    if (!value) return;
    const converted = value / exchangeRates[currency];
    setResult(converted.toFixed(2));
  };

  return (
    <div className="app">
      <h1>TL zu {currency} Umrechner</h1>
      <input
        type="number"
        placeholder="Betrag in TL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="EUR">EUR</option>
        <option value="USD">USD</option>
        <option value="XAU">XAU (Gold)</option>
      </select>
      <button onClick={calculate}>Berechne</button>
      {result && <p>Ergebnis: {result} {currency}</p>}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
