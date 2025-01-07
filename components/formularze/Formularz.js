import React, { useState } from "react";

function Formularz() {
  const [tekst, setTekst] = useState("");

  return (
    <div>
      <input
        type="text"
        value={tekst}
        onChange={(e) => setTekst(e.target.value)}
      />
      <div>{tekst}</div>
    </div>
  );
}

export default Formularz;
