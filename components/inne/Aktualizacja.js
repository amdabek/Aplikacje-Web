import React, { useState } from "react";

function Aktualizacja() {
  const [produkt, setProdukt] = useState({ nazwa: "Pomidor", cena: 50 });

  const zmienCene = () => {
    setProdukt((prev) => ({
      ...prev,
      cena: 100,
    }));
  };

  return (
    <div>
      <p>
        {produkt.nazwa}: {produkt.cena}
      </p>
      <button onClick={zmienCene}>Zmień cenę</button>
    </div>
  );
}

export default Aktualizacja;
