import React, { useState } from "react";
import Buttons from "./Buttons";

function App() {
  const [table, setTable] = useState(
    Array.from({ length: 9 }).fill(Array.from({ length: 9 }).fill(""))
  );
  return (
    <div className="w-screen h-screen bg-slate-800 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-8">
        <table className="border-4">
          {table.map((row, i) => (
            <tr key={i} className={`${i % 3 === 0 ? "border-t-4" : ""}`}>
              {row.map((val, j) => (
                <td
                  key={j}
                  className={`w-[50px] h-[50px] border-2 border-zinc-200 text-center text-zinc-200 ${
                    j % 3 === 0 ? "border-l-4" : ""
                  } `}
                >
                  {val}
                </td>
              ))}
            </tr>
          ))}
        </table>
        <Buttons />
      </div>
    </div>
  );
}

export default App;
