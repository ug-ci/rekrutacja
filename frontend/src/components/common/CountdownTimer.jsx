import { useState, useEffect } from 'react';

export default function CountdownTimer({ targetDate = '2026-07-14' }) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    function calc() {
      const diff = Math.ceil((new Date(targetDate) - new Date()) / 864e5);
      setDays(diff > 0 ? diff : 0);
    }
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown">
      <div className="countdown-number">{days}</div>
      <div className="countdown-label">dni do końca rekrutacji</div>
    </div>
  );
}
