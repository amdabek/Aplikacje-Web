import React, { useState, useEffect } from "react";

function Tytul() {
  const [tytul, setTytul] = useState("");

  useEffect(() => {
    document.title = tytul ? tytul : "lab5";
  }, [tytul]);

  return (
    <div>
      <input
        type="text"
        value={tytul}
        onChange={(e) => setTytul(e.target.value)}
      />
    </div>
  );
}

export default Tytul;
