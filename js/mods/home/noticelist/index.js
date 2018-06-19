/**
 * @fileoverview 最新公告
 * @author 陈立英
 * @date 2018-05-05
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {  Link } from 'react-router'; 
import { Carousel } from 'antd';

@inject('announcementStore')
@observer
class AnnouncementList extends Component {
	componentDidMount() {
		this.props.announcementStore.fetch(6);
	}
	
	render() {
		let store = this.props.announcementStore;
		
		if (store.formatedList.length == 0) {
			return null;
		}

		return (
			<div className="announcement-wrapper">
				<div className="content">
					<Carousel autoplay vertical dots={false} speed={500}>
					{
						store.formatedList.map((arr, i)=>{
							return (
								<ul className="clearfix" key={i}>
									{
										arr.map((item, index)=>{
											return (
												<li key={item.announceId}>
													<div className="info">
														<Link to={"/announcement/" + item.announceId}>
															{item.title}
														</Link>
													</div>
													<div className="time">{ item.publishTime.split(' ')[0] }</div>
												</li>
											);
										})
									}
								</ul>
							)
						})
					}
					</Carousel>
				</div>
			</div>
		);
	}
}

export default AnnouncementList;