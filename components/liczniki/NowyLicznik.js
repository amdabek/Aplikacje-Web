import React, { useState } from "react";
import Przycisk from "./Przycisk";

function NowyLicznik() {
  const [licznik, setLicznik] = useState(0);

  const handleAdd = () => {
    setLicznik(licznik + 1);
  };

  return (
    <div>
      <p>Nowy licznik: {licznik}</p>
      <Przycisk onClick={handleAdd} />
    </div>
  );
}

export default NowyLicznik;
