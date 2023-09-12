import React from "react";
import useFetch from "./hooks/useFetch";

const Buttons = ({ table, setTable, setConflictingCell, solveSudoku }) => {
  const randomSudokus = useFetch("http://localhost:8000/puzzles");

  const generateRandom = () => {
    if (randomSudokus) {
      const randomIndex = Math.floor(Math.random() * randomSudokus.length);
      console.log(randomSudokus[1]);
      setTable(randomSudokus[randomIndex]);
    }
  };

  const solve = () => {
    const solvedTable = table.map((row) => [...row]);
    const isSolved = solveSudoku(solvedTable);

    if (isSolved) {
      setTable(solvedTable);
    } else {
      alert("unsolvable");
    }
  };

  const clear = () => {
    setTable(
      Array.from({ length: 9 }).map(() => Array.from({ length: 9 }).fill(""))
    );
    setConflictingCell({ row: -1, col: -1 });
  };

  const buttonsData = [
    { title: "Clear", function: clear },
    { title: "Generate Random", function: generateRandom },
    { title: "Solve", function: solve },
  ];

  return (
    <div className="flex flex-row justify-center items-center gap-4">
      {buttonsData.map((button, index) => (
        <button
          key={index}
          className="p-2 bg-zinc-200 text-lg text-slate-800 rounded-md duration-300 hover:bg-zinc-400 active:scale-95"
          onClick={button.function}
        >
          {button.title}
        </button>
      ))}
    </div>
  );
};

export default Buttons;
