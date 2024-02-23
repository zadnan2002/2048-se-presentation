import React, { useState } from "react";
import Cell from "./Cell";
import Tile from "./Tile";
import { Board } from "../helper/index.js";
import useEvents from "../hooks/useEvents.js";
import GameOverlay from "./GameOverlay.js";
const BoardView = () => {
  const [board, setBoard] = useState(new Board());

  useEvents("keydown", (event) => {
    handleKeyDown(event);
  });
  const handleKeyDown = (event) => {
    if (board.hasWon()) {
      return;
    }
    if (board.hasLost()) {
      return;
    }

    if (event.keyCode >= 37 && event.keyCode <= 40) {
      const direction = event.keyCode - 37;
      let boardCopy = Object.assign(
        Object.create(Object.getPrototypeOf(board)),
        board
      );
      let newBoard = boardCopy.move(direction);
      setBoard(newBoard);
    }
  };

  const resetGame = () => {
    setBoard(new Board());
  };

  const cells = board.cells.map((row, rowIndex) => {
    return (
      <div key={rowIndex} className="row">
        {row.map((cell, cellIndex) => {
          return (
            <Cell key={cellIndex * board.size + rowIndex}>
              {cell.value !== 0 ? <Tile value={cell.value} /> : ""}
            </Cell>
          );
        })}
      </div>
    );
  });

  const tiles = board.tiles
    .filter((tile) => tile.value !== 0)
    .map((tile, index) => {
      return (
        <Tile
          tile={tile}
          key={index}
          row={tile.row}
          column={tile.column}
          value={tile.value}
          previousRow={tile.oldRow}
          previousColumn={tile.oldColumn}
          mergedInto={tile.mergedInto}
        />
      );
    });

  return (
    <div>
      <div className="details-box">
        <div onClick={resetGame} className="resetButton">
          New Game
        </div>
        <div className="score-box">
          <div className="score-header">SCORE</div>
          <div>{board.score}</div>
        </div>
      </div>
      <div className="board">
        {cells}
        {tiles}
        <GameOverlay onRestart={resetGame} board={board} />
      </div>
    </div>
  );
};

export default BoardView;
