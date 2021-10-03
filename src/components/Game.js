import React, { useState } from "react";
import Board from "./Board";
import { calculateWinner } from "../utils";
import "../index.css";

function Game(props) {
    const [history, setHistory] = useState([{
        squares: Array(5 * 5).fill(null),
        coord: {
            X: null,
            Y: null
        },
        isXTurn: true
    }]);
    const [stepNumber, setStepNumber] = useState(0);
    const [isXNext, setIsXNext] = useState(true);
    const [sortAsc, setSortAsc] = useState(false);
    const [size, setSize] = useState(5);

    const handleClick = (i) => {
        const currentHistory = history.slice(0, stepNumber + 1);
        const currentGame = currentHistory[stepNumber];
        const squares = currentGame.squares.slice();
        const winInfo = calculateWinner(squares, size);
        if (winInfo.winner || squares[i] || winInfo.isDraw) {
            return;
        }
        squares[i] = isXNext ? 'X' : 'O';

        setHistory(currentHistory.concat([{
            squares: squares,
            coord: {
                X: i % size + 1,
                Y: parseInt(i / size + 1),
            },
            isXTurn: isXNext
        }]));

        setStepNumber(currentHistory.length);
        setIsXNext(!isXNext);
    }

    const jumpTo = (step) => {
        setStepNumber(step);
        setIsXNext((step % 2) === 0);
        setHistory(history.slice(0, step + 1));
    }

    const reverseMovesOrder = () => {
        setSortAsc(!sortAsc);
    }

    const handleChange = (event) => {
        let size = Number(event.target.value) || 5;
        if (size < 5) {
            size = 5;
        } else {
            size = Math.min(50, size);
        }

        setHistory([{
            squares: Array(size * size).fill(null),
            coord: {
                X: null,
                Y: null
            },
            isXTurn: true
        }]);
        setStepNumber(0);
        setIsXNext(true);
        setSortAsc(false);
        setSize(size);
    }

    const currentHistory = history;
    const currentGame = currentHistory[stepNumber];
    const winInfo = calculateWinner(currentGame.squares, size);
    const winner = winInfo.winner;
    let status;
    if (!winner && !winInfo.isDraw) {
        status = 'Next player: ' + (isXNext ? 'X' : 'O');
    } else if (!winner && winInfo.isDraw) {
        status = 'Draw';
    } else {
        status = 'Winner: ' + winner;
    }
    const _isSortAsc = sortAsc;
    const _moves = currentHistory.map((step, move) => {
        if (!move) {
            return
        }
        const desc = 'Go back to this move';
        const coordX = step.coord.X ? step.coord.X : null;
        const coordY = step.coord.Y ? step.coord.Y : null;
        const player = step.isXTurn ? 'X' : 'O';
        const isCurrentMove = move === stepNumber;
        return (
            <li key={move}>
                <div>
                    {coordX && coordY &&
                        <span className={`move ${isCurrentMove && 'current-move'}`}>Player: {player}, ({coordX}:{coordY})</span>
                    }
                    <button onClick={() => jumpTo(move)}>{desc}</button>
                </div>
            </li>
        );
    });
    const _movesShow = _isSortAsc ? _moves.slice().reverse() : _moves;
    return (
        <div className="container">
            <div className="size-input">
                <label>
                    Board size:
                    <input type="number" id="size" name="size" min="5" max="50" value={size} onChange={handleChange}></input>
                </label>
            </div>
            <div className="game">
                <div className="game-board">
                    <Board currentCoord={currentGame.coord} size={size} line={winInfo.line} squares={currentGame.squares} onClick={(i) => handleClick(i)} />
                </div>
                <div className="game-info">
                    <p>{status}</p>
                    <button onClick={() => reverseMovesOrder()}>Toggle sort {_isSortAsc ? 'ascending' : 'descending'}</button>
                    {_moves.length > 1 && <p>Moves</p>}
                    <ol reversed={_isSortAsc}>{_movesShow}</ol>
                </div>
            </div>
        </div>
    );
}
export default Game;