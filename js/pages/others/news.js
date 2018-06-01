/**
 * @fileoverview 新闻中心
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';

@observer
class News extends Component {
    constructor(props){
    	super(props);
    }
    render() {

        return (
            <div className="news-wrapper">
            	新闻中心
            </div> 
        );
    }
}

export default News;
