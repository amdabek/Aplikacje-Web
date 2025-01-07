import React, { useState } from "react";

function Haslo() {
  const [haslo, setHaslo] = useState("");
  const [powtorz, setPowtorz] = useState("");

  let komunikat = "";

  if (!haslo && !powtorz) {
    komunikat = "Proszę wprowadzić hasło";
  } else if (haslo && powtorz && haslo !== powtorz) {
    komunikat = "Hasła nie są zgodne";
  } else if (haslo && powtorz && haslo === powtorz) {
    komunikat = "";
  }

  return (
    <div>
      <label>
        Hasło:
        <input
          type="password"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />
      </label>
      <label>
        Powtórz hasło:
        <input
          type="password"
          value={powtorz}
          onChange={(e) => setPowtorz(e.target.value)}
        />
      </label>
      <div>{komunikat}</div>
    </div>
  );
}

export default Haslo;
