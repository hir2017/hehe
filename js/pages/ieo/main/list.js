/**
 * @fileoverview IEO 数字币列表
 */
import React, {Component} from 'react';

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
        $content = this.state.list.map((item, i) => (
            <li className="token-item">
                <a href="">
                    <div className="token-pic">
                        <img src={item.pic} alt=""/>
                    </div>
                    <div className="token-status"></div>
                    <div className="token-content">
                        <h3 className="name"></h3>
                        <p className="desc"></p>
                        <div className="progress"></div>
                        <div className="detail">
                            <div className="amount"></div>
                            <div className="time"></div>
                        </div>
                    </div>
                </a>
            </li>
        ));
        return (
            <div className="token-list-wrapper">
                <ul className="token-list">
                    {$content}
                </ul>
            </div>
        );
    }
}

export default View;
