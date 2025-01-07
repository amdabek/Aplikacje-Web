import React from "react";

function Studenci() {
  const students = [
    { imie: "Marek", nazwisko: "Mostowiak", rocznik: 1980 },
    { imie: "Hanna", nazwisko: "Mostowiak", rocznik: 2000 },
  ];

  return (
    <table border="1">
      <thead>
        <tr>
          <th>Imię</th>
          <th>Nazwisko</th>
          <th>Rocznik</th>
        </tr>
      </thead>
      <tbody>
        {students.map((s) => (
          <tr key={s.imie + s.nazwisko}>
            <td>{s.imie}</td>
            <td>{s.nazwisko}</td>
            <td>{s.rocznik}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Studenci;
