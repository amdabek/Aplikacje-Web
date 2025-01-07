import React from "react";
import Produkt from "./Produkt";

function NowyKoszyk() {
  const produkty = ["Książka", "Telefon", "Śłuchawki", "Laptop", "Masażer"];

  return (
    <div>
      {produkty.map((nazwa) => (
        <Produkt key={nazwa} nazwa={nazwa} />
      ))}
    </div>
  );
}

export default NowyKoszyk;
