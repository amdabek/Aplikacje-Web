import React, { useState } from "react";
import Dodawanie from "./Dodawanie";

function StudentManager() {
  const [students, setStudents] = useState([
    { imie: "Marek", nazwisko: "Mostowiak", rocznik: 1980 },
    { imie: "Hanna", nazwisko: "Mostowiak", rocznik: 2000 },
  ]);

  return (
    <div>
      <table border="1">
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
      <Dodawanie onDodaj={(nowy) => setStudents((prev) => [...prev, nowy])} />
    </div>
  );
}

export default StudentManager;
