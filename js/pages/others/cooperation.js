/**
 * @fileoverview 商务合作
 * @author 陈立英
 * @date 2018-05-03
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


@observer
class Cooperation extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        return (
            <div className="cooperation-wrapper">
                商务合作
            </div>
        );
    }
}

export default Cooperation;
