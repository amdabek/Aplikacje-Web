import React, { useState } from "react";

function Ternary() {
  const [a, setA] = useState(false);
  const [b, setB] = useState(true);

  return (
    <div>
      <div>
        {" "}
        {a ? "Stwierdzenie a jest prawdziwe" : "Stwierdzenie a jest fałszywe"}
      </div>
      <div>
        {b ? "Stwierdzenie b jest prawdziwe" : "Stwierdzenie b jest fałszywe"}
      </div>
    </div>
  );
}

export default Ternary;
