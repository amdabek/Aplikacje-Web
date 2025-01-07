import React from "react";
import Produkt from "./Produkt";

function Koszyk() {
  return (
    <div>
      <Produkt nazwa="Książka" />
      <Produkt nazwa="Telefon" />
      <Produkt nazwa="Słuchawki" />
      <Produkt nazwa="Laptop" />
      <Produkt nazwa="Masażer" />
    </div>
  );
}

export default Koszyk;
