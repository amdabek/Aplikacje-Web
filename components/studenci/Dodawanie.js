import React, { useState } from "react";

function Dodawanie({ onDodaj }) {
  const [imie, setImie] = useState("");
  const [nazwisko, setNazwisko] = useState("");
  const [rocznik, setRocznik] = useState("");

  const handleClick = () => {
    if (imie && nazwisko && rocznik) {
      onDodaj({
        imie,
        nazwisko,
        rocznik: parseInt(rocznik),
      });

      setImie("");
      setNazwisko("");
      setRocznik("");
    }
  };

  return (
    <div>
      <input
        placeholder="Imię"
        value={imie}
        onChange={(e) => setImie(e.target.value)}
      />
      <input
        placeholder="Nazwisko"
        value={nazwisko}
        onChange={(e) => setNazwisko(e.target.value)}
      />
      <input
        placeholder="Rocznik"
        value={rocznik}
        onChange={(e) => setRocznik(e.target.value)}
      />
      <button onClick={handleClick}>Dodaj</button>
    </div>
  );
}

export default Dodawanie;
