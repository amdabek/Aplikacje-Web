import React, { useState, useEffect } from "react";

function Licznik() {
  const [licznik, setLicznik] = useState(() => {
    const saved = localStorage.getItem("licznik");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    localStorage.setItem("licznik", licznik);
  }, [licznik]);

  return (
    <div>
      <p>Licznik: {licznik}</p>
      <button onClick={() => setLicznik(licznik + 1)}>Dodaj</button>
    </div>
  );
}

export default Licznik;
