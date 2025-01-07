import React, { useState } from "react";

function Licznik() {
  const [licznik, setLicznik] = useState(0);

  const handleClick = () => {
    setLicznik(licznik + 1);
  };

  return (
    <div>
      <p>Licznik: {licznik}</p>
      <button onClick={handleClick}>Dodaj</button>
    </div>
  );
}

export default Licznik;
