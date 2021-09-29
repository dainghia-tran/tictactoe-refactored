import React from "react";
import "../index.css";

class Square extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <button className={`square ${this.props.isWinSquare && 'win-square'} ${this.props.isCurrentSquare && 'current-square'}`} onClick={this.props.onClick}>
                {this.props.value}
            </button>
        )
    }
}
export default Square;
