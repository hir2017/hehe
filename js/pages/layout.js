/**
 * @fileoverview 布局
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../mods/header';
import Footer from '../mods/footer';

@inject('commonStore')
@observer
class News extends Component {
    constructor(props){
    	super(props);
    }

    render() {
        return (
            <div className="tobottom-footer" style={{ minHeight: this.props.commonStore.windowDimensions.height}}>
            	<Header/>
                <div className="app-content">
                    { this.props.children }
                </div>
                <Footer/>
            </div> 
        );
    }
}

export default News;
