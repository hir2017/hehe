/**
 * @fileoverview: 用户积分基础信息
 * @author: ShangJin
 * @date: 2019/1/8
 */

import React, { Component } from "react";

export default class UserView extends Component{
    constructor(props){
        super(props);
    }

    componentDidMount(){

    }

    render(){
        const {data} = this.props;

        return (
            <div className="point-info">
                <div>{data.level}</div>
                <div>{data.totalPoint}</div>
                <div>{data.availablePoint}</div>
                <div>{data.diffPoint}</div>
            </div>
        );
    }
}