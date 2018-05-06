/**
 * @fileoverview 帮助与反馈
 * @author 陈立英
 * @date 2018-05-03
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


@observer
class Feedback extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        return (
            <div className="feedback-wrapper">
                帮助与反馈
            </div>
        );
    }
}

export default Feedback;
