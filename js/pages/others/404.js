/**
 * @fileoverview 404页面
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


@observer
class NotFound extends Component {
    constructor(props){
    	super(props);
    }

   	componentDidMount() {
        $('#wrap .app-page').css({
        	'background-color': '#fff'
        });
    }

    render() {
        return (
          	<div className="not-found">{UPEX.lang.template('抱歉，您的网页走丢了')}</div>
        );
    }
}

export default NotFound;