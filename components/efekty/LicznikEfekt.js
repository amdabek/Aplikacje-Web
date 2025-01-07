import React, { useState, useEffect } from "react";

function LicznikEfekt() {
  const [licznik, setLicznik] = useState(0);

  useEffect(() => {
    console.log("Hello world");
  }, []);
  useEffect(() => {
    console.log(`Licznik zwiększył się do ${licznik}`);
  }, [licznik]);

  return (
    <div>
      <p>Licznik: {licznik}</p>
      <button onClick={() => setLicznik(licznik + 1)}>Dodaj</button>
    </div>
  );
}

export default LicznikEfekt;
