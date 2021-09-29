import React from "react";
import Square from "./Square";
import "../index.css";

class Board extends React.Component {
    constructor(props) {
        super(props);
    }
    renderSquare(i) {
        return <Square key={i} isCurrentSquare={this.isCurrentSquare(i)} isWinSquare={this.isWinSquare(i)} value={this.props.squares[i]} onClick={() => this.props.onClick(i)} />;
    }
    isWinSquare(i) {
        return this.props.line && this.props.line.indexOf(i) >= 0;
    }
    isCurrentSquare(i) {
        return i === ((this.props.currentCoord.Y - 1) * (this.props.size || 3) + (this.props.currentCoord.X - 1));
    }
    render() {
        const boardSize = this.props.size || 5;
        let squares = [];
        for (let i = 0; i < boardSize; i++) {
            let row = [];
            for (let j = 0; j < boardSize; j++) {
                row.push(this.renderSquare(i * boardSize + j));
            }
            squares.push(<div key={i} className="board-row">{row}</div>);
        }
        return (
            <div>{squares}</div>
        );
    }
}
export default Board;