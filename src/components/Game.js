import React from "react";
import Board from "./Board";
import { calculateWinner } from "../utils";
import "../index.css";

const initState = (size) => ({
    history: [{
        squares: Array(size * size).fill(null),
        coord: {
            X: null,
            Y: null
        },
        isXTurn: true
    }],
    stepNumber: 0,
    isXNext: true,
    sortAsc: false,
    size: size
});

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = initState(5);  //min 5
        this.handleChange = this.handleChange.bind(this);
    }
    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[this.state.stepNumber];
        const squares = current.squares.slice();
        const winInfo = calculateWinner(squares, this.state.size);
        if (winInfo.winner || squares[i] || winInfo.isDraw) {
            return;
        }
        squares[i] = this.state.isXNext ? 'X' : 'O';
        this.setState({
            history: history.concat([{
                squares: squares,
                coord: {
                    X: i % this.state.size + 1,
                    Y: parseInt(i / this.state.size + 1),
                },
                isXTurn: this.state.isXNext
            }]),
            stepNumber: history.length,
            isXNext: !this.state.isXNext
        });
    }
    jumpTo(step) {
        this.setState({
            stepNumber: step,
            isXNext: (step % 2) === 0,
            history: this.state.history.slice(0, step + 1)
        });
    }
    reverseMovesOrder() {
        this.setState({
            sortAsc: !this.state.sortAsc,
        })
    }
    handleChange(event) {
        let size = Number(event.target.value) || 5;
        if (size < 5) {
            size = 5;
        } else {
            size = Math.min(50, size);
        }
        this.setState({
            ...initState(size)
        });
    }
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winInfo = calculateWinner(current.squares, this.state.size);
        const winner = winInfo.winner;
        let status;
        if (!winner && !winInfo.isDraw) {
            status = 'Next player: ' + (this.state.isXNext ? 'X' : 'O');
        } else if (!winner && winInfo.isDraw) {
            status = 'Draw';
        } else {
            status = 'Winner: ' + winner;
        }
        const isSortAsc = this.state.sortAsc;
        const moves = history.map((step, move) => {
            if (!move) {
                return
            }
            const desc = 'Go back to this move';
            const coordX = step.coord.X ? step.coord.X : null;
            const coordY = step.coord.Y ? step.coord.Y : null;
            const player = step.isXTurn ? 'X' : 'O';
            const isCurrentMove = move === this.state.stepNumber;
            return (
                <li key={move}>
                    <div>
                        {coordX && coordY &&
                            <span className={`move ${isCurrentMove && 'current-move'}`}>Player: {player}, ({coordX}:{coordY})</span>
                        }
                        <button onClick={() => this.jumpTo(move)}>{desc}</button>
                    </div>
                </li>
            );
        });
        const movesShow = isSortAsc ? moves.slice().reverse() : moves;
        return (
            <div className="container">
                <div className="size-input">
                    <label>
                        Board size:
                        <input type="number" id="size" name="size" min="5" max="50" value={this.state.size} onChange={this.handleChange}></input>
                    </label>
                </div>
                <div className="game">
                    <div className="game-board">
                        <Board currentCoord={current.coord} size={this.state.size} line={winInfo.line} squares={current.squares} onClick={(i) => this.handleClick(i)} />
                    </div>
                    <div className="game-info">
                        <p>{status}</p>
                        <button onClick={() => this.reverseMovesOrder()}>Toggle sort { isSortAsc ? 'ascending' : 'descending'}</button>
                        {moves.length > 1 && <p>Moves</p>}
                        <ol reversed={isSortAsc}>{movesShow}</ol>
                    </div>
                </div>
            </div>
        );
    }
}
export default Game;