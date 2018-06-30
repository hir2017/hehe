/**
 * @fileoverview 页尾
 * @author 陈立英
 * @date 2018-05-05
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'; 
import { Carousel } from 'antd';

const bannerImage = require('../../../../images/banner1.jpg');

@inject('bannerStore')
@observer
class Banner extends Component {
	static defaultProps = {
		list: [bannerImage, bannerImage, bannerImage]
	}

	componentDidMount(){
		this.props.bannerStore.fetch();
	}

	handleClickBanner=(item, e)=>{
		if (item.url) {
			window.open(item.url);
		}
	}

	render() {
		let list = this.props.bannerStore.list;
		let multi = false;

		if (list.length > 1 ) {
			multi = true;
		}

		return (
			<div className="banner-wrapper">
				<div className="slider"  ref='banner'>
                    <Carousel autoplay={multi} dots={multi}>
                    	{
                    		list.map((item, index)=>{
                    			return (
                    				<div className="slider-item" key={index} onClick={this.handleClickBanner.bind(this, item)}>
			                            <img src={item.image} />                              
			                        </div>
                    			)
                    		})
                    	}
                    </Carousel>
                </div>
			</div>
		);
	}
}

export default Banner;