/**
 * @fileoverview  banner每4秒轮播一次
 * @author 陈立英
 * @date 2018-05-05
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react'; 
import { Carousel } from 'antd';

@inject('bannerStore')
@observer
class Banner extends Component {
	static defaultProps = {
		list: []
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
		let store = this.props.bannerStore;
		let list = store.list;
		let multi = false, $content;

		if (list.length > 1 ) {
			multi = true;
		}

		if (!store.$loading) {
			$content = (
				<Carousel autoplay={true} dots={multi} effect="fade">
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
			)
		}
		
		return (
			<div className="banner-wrapper">
				<div className="slider"  ref='banner'>
                    {$content}
                </div>
                { this.props.children }
			</div>
		);
	}
}

export default Banner;