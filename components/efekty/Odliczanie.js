import React, { useState, useEffect } from "react";

function Odliczanie() {
  const [czas, setCzas] = useState(15.0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let intervalId;
    if (start && czas > 0) {
      intervalId = setInterval(() => {
        setCzas((prev) => Math.max(prev - 0.1, 0));
      }, 100);
    }
    return () => clearInterval(intervalId);
  }, [start, czas]);

  const handleStartStop = () => {
    if (czas <= 0) return;
    setStart(!start);
  };

  return (
    <div>
      <p>Czas: {czas.toFixed(1)}s</p>
      <button onClick={handleStartStop} disabled={czas <= 0}>
        {czas <= 0 ? "Odliczanie zakończone" : start ? "STOP" : "START"}
      </button>
    </div>
  );
}

export default Odliczanie;
