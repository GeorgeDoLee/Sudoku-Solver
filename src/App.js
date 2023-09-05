import { useState } from "react";

function App() {
  const [table, setTable] = useState(Array.from({ length: 9 }, () => Array(9).fill("")));
  const [selectedCell, setSelectedCell] = useState({
    i: null,
    j: null,
  });

  const handleInput = (I, J, value) => {
    if (value.length <= 1){
      const newTable = [...table];
      newTable[I][J] = value;
      setTable(newTable);
      let foundEmptyCell = false;
      for(let i = I; i < 9; i++){
        for(let j = J; j < 9; j++){
          if(newTable[i][j] === ""){
            setSelectedCell({i, j});
            foundEmptyCell = true;
            break;
          }
        }
        if(foundEmptyCell){
          break;
        } else {
          J = 0;
        }
      }
      if(!foundEmptyCell){
        setSelectedCell({i: null, j: null});
      }
    } 
  };

  console.log(selectedCell);

  return (
    <div className="w-screen h-screen bg-gray-700 flex justify-center items-center">
      <div className="flex flex-col justify-center items-center gap-5">
        <table>
          {Array.from({ length: 9 }).map((_, i) => (
            <tr key={i} className={`${i % 3 === 0 ? 'border-t-[4px]' : ''} ${i % 3 === 2 ? 'border-b-[4px]' : ''}`}>
              {Array.from({ length: 9 }).map((_, j) => (
                <td
                  key={j}
                  className={`border-gray-200 border-[2px] 
                  ${j % 3 === 0 ? 'border-l-[4px]' : ''} ${j % 3 === 2 ? 'border-r-[4px]' : ''} 
                  text-center text-gray-200 ${selectedCell.i === i && selectedCell.j === j ? 'bg-slate-500' : ''}`}
                >
                  <input 
                    type="text" 
                    className="w-[50px] h-[50px] bg-transparent text-center outline-none text-xl cursor-pointer caret-transparent"
                    value={table[i][j]} 
                    onClick={() => setSelectedCell({i, j})}
                    onChange={(e) => handleInput(i, j, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          ))}
        </table>

        <button className="bg-gray-200 p-2 w-[100px] font-bold text-gray-700 rounded-md duration-200 ease-linear
         hover:bg-gray-400 active:scale-95">Solve</button>
      </div>
    </div>
  );
}

export default App;
