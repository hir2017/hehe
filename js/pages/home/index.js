/**
 * @fileoverview 首页
 * @author 陈立英
 * @date 2018-04-26
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import Header from '../../mods/header';
import Footer from '../../mods/footer';


@inject('commonStore')
@observer
class Home extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        let commonStore = this.props.commonStore;

        return (
            <div className="home-wrapper tobottom-footer" style={{ minHeight: commonStore.windowDimensions.height}}>
            	<Header/>
                <div className="home-main">
                    { UPEX.lang.template('页面内容')}
                    { commonStore.language }
                </div>
                <Footer/>
            </div> 
        );
    }
}

export default Home;
