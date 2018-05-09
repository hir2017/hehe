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
	render() {
		let list = this.props.announcementStore.formatedList;
		
		if (list.length > 0) {
			return (
				<div className="announcement-wrapper">
					<div className="content">
						<Carousel autoplay vertical dots={false} speed={500}>
						{
							list.map((arr, i)=>{
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
		} else {	
			return null;
		}
	}
}

export default AnnouncementList;