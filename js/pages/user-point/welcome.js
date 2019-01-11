/**
 * @fileoverview: 用户积分-落地页
 * @author: ShangJin
 * @date: 2019/1/8
 */

import '@/../css/user-point/index.less';
import React, { Component } from "react";
import UserInfo from './user';

class PageView extends Component{
    constructor(){
        super();
    }

    componentDidMount(){

    }
    render(){
        return(
            <div>
                <UserInfo/>
                BANNER
            </div>
        );

    }

}
export default PageView