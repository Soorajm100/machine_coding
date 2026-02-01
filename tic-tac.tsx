import axios from "axios";
import React, { useEffect, useState } from "react";

/**Debounce frontend question  */
const MachineCode = () => {
  const createNbyNArray = (n: any, initialValue: any) => {
    return Array.from({ length: n }, () => Array(n).fill(initialValue));
  };
  const [gridSize, setgridSize] = useState(0);
  const [grid, setGrid] = useState(() => createNbyNArray(gridSize, 0));

  const countXox = (b: any, r: any, c: any) => {
    const dirs = [
      [0, 1],
      [1, 0],
      [1, 1],
      [1, -1],
    ];

    const matches: any = [];

    for (const [dr, dc] of dirs) {
      const mid = `${r}-${c}`;
      const left = `${r - dr}-${c - dc}`;
      const right = `${r + dr}-${c + dc}`;

      // X O X with O in middle
      if (
        b[mid]?.value === "O" &&
        b[left]?.value === "X" &&
        b[right]?.value === "X"
      ) {
        matches.push([left, mid, right]);
      }

      // X O X where placed cell is LEFT X
      const mid1 = `${r + dr}-${c + dc}`;
      const right1 = `${r + 2 * dr}-${c + 2 * dc}`;
      if (
        b[mid]?.value === "X" &&
        b[mid1]?.value === "O" &&
        b[right1]?.value === "X"
      ) {
        matches.push([mid, mid1, right1]);
      }

      // X O X where placed cell is RIGHT X
      const mid2 = `${r - dr}-${c - dc}`;
      const left2 = `${r - 2 * dr}-${c - 2 * dc}`;
      if (
        b[mid]?.value === "X" &&
        b[mid2]?.value === "O" &&
        b[left2]?.value === "X"
      ) {
        matches.push([left2, mid2, mid]);
      }
    }

    return matches;
  };

  const handleChange = (e: any) => {
    setgridSize(e.target.value);
  };

  useEffect(() => {
    setGrid(createNbyNArray(Number(gridSize), 0));
  }, [gridSize]);

  const [board, setBooard] = useState<any>({});
  const [plauyerprint, setPlayerprint] = useState<any>({});
  const [currentPlayer, setCurrentPlayer] = useState<"player1" | "player2">(
    "player1",
  );

  console.log(board, "the booard values");
  console.log(plauyerprint, "the player  print");

  const [score, SetScore] = useState({
    player1: 0,
    player2: 0,
  });
  console.log(score, "the score totaal");

  const handleChangeClick = (
    i: number,
    j: number,
    key: string,
    symbol: "X" | "O",
  ) => {
    if (board[key]) return;

    setBooard((prev: any) => {
      const nextBoard = {
        ...prev,
        [key]: { value: symbol, crossed: false },
      };

      const gained = countXox(nextBoard, i, j);
      if (gained.length > 0) {
        SetScore((prev: any) => ({
          ...prev,
          [currentPlayer]: prev[currentPlayer] + gained.length,
        }));

        for (const triplet of gained) {
          for (const cell of triplet) {
            nextBoard[cell] = {
              ...nextBoard[cell],
              crossed: true,
            };
          }
        }
      }

      return nextBoard;
    });
    setCurrentPlayer((prev) => (prev === "player1" ? "player2" : "player1"));
  };

  useEffect(() => {
    if (Object.keys(board).length=== gridSize * gridSize && gridSize > 0) {
      if (score["player1"] > score["player2"]) {
        alert("Player 1 wins the game");
      } else if (score["player1"] < score["player2"]) {
        alert("Player 2 wins the game");
      } else {
        alert("Game is a Draw");
      }
    }
  }, [board, score]);
  return (
    <div className="pt-4 pl-4  flex flex-col space-y-4 justify-between items-center">
      <select value={gridSize} onChange={(e) => handleChange(e)}>
        <option value={0}></option>
        <option value={3}>3</option>
        <option value={5}>5</option>
        <option value={6}>6</option>
      </select>

      <div
        className="grid gap-1"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {grid.map((ele, ind) => {
          return ele.map((t, i) => {
            const key = `${ind}-${i}`;
            const cell = board[key];
            return (
              <div
                key={key}
                className="h-20 w-20 border border-t-2 border-black"
              >
                <select
                  value={cell?.value || ""}
                  disabled={cell?.crossed}
                  onChange={(e: any) =>
                    handleChangeClick(ind, i, key, e.target.value)
                  }
                  className={`
    w-full h-full text-xl font-bold
    ${cell?.value === "X" ? "text-blue-600" : ""}
    ${cell?.value === "O" ? "text-green-600" : ""}
    ${cell?.crossed ? "bg-red-200 line-through text-red-800" : ""}`}
                >
                  <option value={""}></option>
                  <option value={"X"}>X</option>
                  <option value={"O"}>O</option>
                </select>
              </div>
            );
          });
        })}
      </div>
    </div>
  );
};

export default MachineCode;
