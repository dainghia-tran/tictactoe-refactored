import React from "react";
import Square from "./Square";
import "../index.css";

function Board(props) {
    const renderSquare = (i) => {
        return <Square key={i} isCurrentSquare={isCurrentSquare(i)} isWinSquare={isWinSquare(i)} value={props.squares[i]} onClick={() => props.onClick(i)} />;
    }
    const isWinSquare = (i) => {
        return props.line && props.line.indexOf(i) >= 0;
    }
    const isCurrentSquare = (i) => {
        return i === ((props.currentCoord.Y - 1) * (props.size || 3) + (props.currentCoord.X - 1));
    }
    const boardSize = props.size || 5;
    let squares = [];
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(renderSquare(i * boardSize + j));
        }
        squares.push(<div key={i} className="board-row">{row}</div>);
    }
    return (
        <div>{squares}</div>
    );

}
export default Board;