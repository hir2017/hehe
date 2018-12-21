/**
 * @fileoverview: IEO 主页特点部分
 * @author: ShangJin
 * @date: 2018/12/19
 */
import React, {Component} from 'react';

class View extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        let arr = [0, 0, 0, 0, 0];
        return (
            <div className="feature-wrap">
                <h2 className="title">{UPEX.lang.template('特点标题')}</h2>
                <ul className="content">
                    {
                        arr.map((item, i) => (
                            <li className="feature" key={i}>
                                <div className={`feature-icon icon${i + 1}`}></div>
                                <h3 className="sub-tit">{UPEX.lang.template('特点' + (i + 1))}</h3>
                                <p className="des">{UPEX.lang.template('特点' + (i + 1) + '描述')}</p>
                            </li>
                        ))
                    }

                </ul>
            </div>
        );
    }
}

export default View;
