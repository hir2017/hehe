/**
 * @fileoverview 最新公告
 * @author 陈立英
 * @date 2018-05-05
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import {  Link } from 'react-router'; 

@observer
class AnnounceList extends Component{
	render(){
		let list = this.props.list;

		return (
			<div className="announce-wrapper">
				<h3 className="title">{ UPEX.lang.template('最新公告')}</h3>
				<div className="content">
				{
					list.length == 0 ? (
						<div className="list-tip">{ UPEX.lang.template('暂无数据') }</div>
					) : (
						<ul>
							{
								list.map((item, index)=>{
									return (
										<li key={item.announceId}>
											<div className="info">
												<Link to={"/announce/preview/" + item.announceId}>
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
				}
				</div>
			</div>
		);
	}
}

export default AnnounceList;