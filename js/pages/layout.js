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
        let commonStore = this.props.commonStore;
        
        if (commonStore.isTradeCenter) {
            return (
                <div>
                    <Header/>
                    <div className="app-content">
                        { this.props.children }
                    </div>
                </div>
            );
        } else {
            return (
                <div className="tobottom-footer" style={{ minHeight: commonStore.windowDimensions.height }}>
                    <Header/>
                    <div className="app-content">
                        { this.props.children }
                    </div>

                    <Footer/>
                </div> 
            );
        }
    }
}

export default News;
