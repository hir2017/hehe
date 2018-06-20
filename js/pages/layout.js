/**
 * @fileoverview 布局
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import Header from '../mods/header';
import Footer from '../mods/footer';

@inject('commonStore')
@observer
class Layout extends Component {
    constructor(props){
    	super(props);
    }

    componentWillReceiveProps(nextProps) {
        let { action, query } = this.props.location;
        let { action: actionNext, query: queryNext, pathname } = nextProps.location;
        
        if ((action == 'POP' || action == 'REPLACE') && actionNext == 'PUSH') {
            if (query.env && !queryNext.env) {
                browserHistory.replace(`${pathname}?env=${query.env}`);
            }
        }
    }

    render() {
        let commonStore = this.props.commonStore;
        
        if (commonStore.isTradeCenter) {
            return (
                <div className="app-trade">
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

export default Layout;
