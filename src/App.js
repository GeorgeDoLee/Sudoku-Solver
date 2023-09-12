import React, { useState } from "react";
import Buttons from "./Buttons";

function isValid(board, row, col, num) {
  let conflictingRow = -1;
  let conflictingCol = -1;

  for (let i = 0; i < 9; i++) {
    if (board[row][i] == num) {
      conflictingRow = row;
      conflictingCol = i;
      return { isValid: false, conflictingRow, conflictingCol };
    } else if (board[i][col] == num) {
      conflictingRow = i;
      conflictingCol = col;
      return { isValid: false, conflictingRow, conflictingCol };
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] == num) {
        conflictingRow = i;
        conflictingCol = j;
        return { isValid: false, conflictingRow, conflictingCol };
      }
    }
  }

  return { isValid: true, conflictingRow, conflictingCol };
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === "") {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num).isValid) {
            board[row][col] = num;
            if (solveSudoku(board)) {
              return true;
            }
            board[row][col] = "";
          }
        }
        return false;
      }
    }
  }
  return true;
}

function App() {
  const [table, setTable] = useState(
    Array.from({ length: 9 }).fill(Array.from({ length: 9 }).fill(""))
  );
  const [conflictingCell, setConflictingCell] = useState({ row: -1, col: -1 });

  const fillIn = (row, col, e) => {
    const val = e.target.value;
    const {
      isValid: valid,
      conflictingRow,
      conflictingCol,
    } = isValid(table, row, col, val);

    if (val.length > 1) {
      alert("only one number per cell");
      return;
    } else if (!valid && val != "") {
      setConflictingCell({ row: conflictingRow, col: conflictingCol });
      setTimeout(() => {
        setConflictingCell({ row: -1, col: -1 });
      }, 1000);
      return;
    }

    const newArray = [...table].map((row) => [...row]);
    newArray[row][col] = val;
    setTable(newArray);
  };

  return (
    <div className="w-screen h-screen bg-slate-800 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-8">
        <table className="border-4">
          {table.map((row, i) => (
            <tr key={i} className={`${i % 3 === 0 ? "border-t-4" : ""}`}>
              {row.map((val, j) => (
                <td
                  key={j}
                  className={`border-2 border-zinc-200 text-center text-zinc-200 ${
                    j % 3 === 0 ? "border-l-4" : ""
                  } ${
                    conflictingCell.row === i && conflictingCell.col === j
                      ? "bg-red-500 animate-pulse"
                      : ""
                  } `}
                >
                  <input
                    type="text"
                    value={table[i][j]}
                    className="w-[50px] h-[50px] bg-transparent border-0 outline-none text-center text-xl"
                    onChange={(e) => fillIn(i, j, e)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </table>
        <Buttons
          table={table}
          setTable={setTable}
          setConflictingCell={setConflictingCell}
          solveSudoku={solveSudoku}
        />
      </div>
    </div>
  );
}

export default App;
