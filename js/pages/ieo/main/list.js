/**
 * @fileoverview IEO 数字币列表
 */
import React, { Component } from 'react';

class View extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
        }
    }

    componentDidMount() {
    }

    render() {
        let $content = null;
        $content = this.state.list.map((item, i) => {
            return (<li className="item">
                <img src={item.pic} alt=""/>
            </li>)
        })
        return (
            <div className="list-wrapper">
                <ul className="list">
                    {$content}
                </ul>
            </div>
        );
    }
}

export default View;
