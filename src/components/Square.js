import React from "react";
import "../index.css";

function Square(props) {
    return (
        <button className={`square ${props.isWinSquare && 'win-square'} ${props.isCurrentSquare && 'current-square'}`} onClick={props.onClick}>
            {props.value}
        </button>
    )
}
export default Square;
