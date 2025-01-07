import React, { useState } from "react";

function Logowanie() {
  const [haslo, setHaslo] = useState("");
  const [powtorz, setPowtorz] = useState("");
  const [nazwaUżytkownika, setNazwaUżytkownika] = useState("");

  //   let komunikat = "";

  //   if (!haslo && !powtorz) {
  //     komunikat = "Proszę wprowadzić hasło";
  //   } else if (haslo && powtorz && haslo !== powtorz) {
  //     komunikat = "Hasła nie są zgodne";
  //   } else if (haslo && powtorz && haslo === powtorz) {
  //     komunikat = "";
  //   }

  const handleLogin = () => {
    if (haslo !== powtorz) {
      alert("Hasła nie są zgodne");
      return;
    }
    alert("Zalogowano poprawnie");
  };

  return (
    <div>
      <label>
        Nazwa użytkownika:
        <input
          type="text"
          value={nazwaUżytkownika}
          onChange={(e) => setNazwaUżytkownika(e.target.value)}
        />
      </label>
      <br />
      <label>
        Hasło:
        <input
          type="password"
          value={haslo}
          onChange={(e) => setHaslo(e.target.value)}
        />
      </label>
      <br />
      <label>
        Powtórz hasło:
        <input
          type="password"
          value={powtorz}
          onChange={(e) => setPowtorz(e.target.value)}
        />
      </label>
      <br />
      {/* <div>{komunikat}</div> */}
      <button
        onClick={handleLogin}
        disabled={!nazwaUżytkownika || !haslo || !powtorz}
      >
        Zaloguj
      </button>
    </div>
  );
}

export default Logowanie;
