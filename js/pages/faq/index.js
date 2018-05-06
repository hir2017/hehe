/**
 * @fileoverview 常见问题
 * @author 陈立英
 * @date 2018-05-03
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


@observer
class FAQ extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        return (
            <div className="faq-wrapper">
                常见问题
            </div>
        );
    }
}

export default FAQ;
