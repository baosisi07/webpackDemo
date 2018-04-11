import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from "./bss.scss";

class Index extends Component {
    render() {
        return (
            <div className = "App" >
        		<h1>嗨，你好吗？不好 哈哈</h1>
            </div>
        );
    }
}

ReactDOM.render(< Index / >, document.getElementById('wrapper'));


