/**
 * @fileoverview 新闻中心
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../../mods/header';
import Footer from '../../mods/footer';


@inject('commonStore')
@observer
class News extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        let commonStore = this.props.commonStore;

        return (
            <div className="news-wrapper tobottom-footer" style={{ minHeight: commonStore.windowDimensions.height}}>
            	<Header/>
                <div className="news-main">
                  
                </div>
                <Footer/>
            </div> 
        );
    }
}

export default News;
