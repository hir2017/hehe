/**
 * @fileoverview 关于我们
 * @author 陈立英
 * @date 2018-05-03
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


@observer
class AboutUs extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        return (
            <div className="about-wrapper">
                关于我们
            </div>
        );
    }
}

export default AboutUs;
