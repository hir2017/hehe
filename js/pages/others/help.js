/**
 * @fileoverview 帮助中心
 * @author 陈立英
 * @date 2018-05-03
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


@observer
class Help extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        return (
            <div className="help-wrapper">
                帮助中心
            </div>
        );
    }
}

export default Help;
