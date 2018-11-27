/**
 * @fileoverview IEO 数字币信息
 */
import React, { Component } from 'react';

class View extends Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
    }

    render() {
        const {data} = this.props;
        return (
            <div className="coin-info">
                <img src={data.picPath} alt=""/>
                <p className="symbol">{data.symbol}</p>
                <p className="time">{data.symbol}</p>
                <p className="price">{data.symbol}</p>
                <p className="progress">{data.symbol}</p>
            </div>
        );
    }
}

export default View;
