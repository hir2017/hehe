/**
 * @fileoverview 页尾
 * @author 陈立英
 * @date 2018-05-05
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'; 
import { Carousel } from 'antd';

@observer
class Banner extends Component {
	static defaultProps = {
		list: []
	}
	render() {
		let list = this.props.list;

		return (
			<div className="banner-wrapper">
				<div className="slider"  ref='banner'>
                    <Carousel autoplay dots={ list.length > 1 ? true : false}>
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