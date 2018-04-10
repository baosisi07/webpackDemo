import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from "./bss.css";

class Index extends Component {
    render() {
        return (
            <div className = "App" >
        		<h1>嗨，你好吗？</h1>
            </div>
        );
    }
}

ReactDOM.render(< Index / >, document.getElementById('wrapper'));


