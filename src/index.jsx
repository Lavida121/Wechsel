import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './style.css';

const App = () => {
  const [amount, setAmount] = useState('');
  const [result, setResult] = useState(null);
  const [currency, setCurrency] = useState('EUR');
  const [rates, setRates] = useState({});

  useEffect(() => {
    fetch('https://api.exchangerate.host/latest?base=TRY&symbols=EUR,USD,XAU')
      .then(res => res.json())
      .then(data => setRates(data.rates));
  }, []);

  const calculate = () => {
    const value = parseFloat(amount);
    if (!value || !rates[currency]) return;
    const converted = value * rates[currency];
    setResult(converted.toFixed(2));
  };

  return (
    <div className="app">
      <h1>TL → {currency} Währungsrechner</h1>
      <input
        type="number"
        placeholder="Betrag in TL"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
        <option value="EUR">Euro (EUR)</option>
        <option value="USD">US-Dollar (USD)</option>
        <option value="XAU">Gold (XAU)</option>
      </select>
      <button onClick={calculate}>Berechne</button>
      {result && <p>Ergebnis: {result} {currency}</p>}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);