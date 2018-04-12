import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import style from "./bss.scss";
import img from "./demo.png";
import img1 from "./demo1.png";
class Index extends Component {
    render() {
        return (
            <div className = "App" >
        		<h1>嗨，你好吗？</h1>
        		<img className="image" src={img}/>
        		<img className="image" src={img1}/>
            </div>
        );
    }
}

ReactDOM.render(< Index / >, document.getElementById('wrapper'));


