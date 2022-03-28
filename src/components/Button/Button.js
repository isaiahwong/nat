import React, { Component } from 'react';
import style from './Button.module.css';

class Button extends Component {

    render() {
        return (
            <button
                className={style.button}
                onClick={this.props.onClick}
            >
                Get Investment
            </button>
        );
    }
}


export default Button;