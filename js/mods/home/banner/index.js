/**
 * @fileoverview 页尾
 * @author 陈立英
 * @date 2018-05-05
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'; 
import { Carousel } from 'antd';

const bannerImage = require('../../../../images/banner1.jpg');

@observer
class Banner extends Component {
	static defaultProps = {
		list: [bannerImage]
	}
	render() {
		let list = this.props.list;
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
                    				<div className="slider-item" key={index}>
			                            <img src={item} />                              
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