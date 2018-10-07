/**
 * 邀请返佣 － top3
 */
import React, { Component } from "react";
import { getInviteTopList } from '../../../api/http';

class RankView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			list: [],
			isFetching: 1
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData() {
		getInviteTopList().then((data)=>{
			if (data.status ==  200) {
				this.setState({
                    list: data.attachment,
                    isFetching: 0
                });
			}
		})
	}

	render() {
		let { isFetching , list } = this.state;

		return (
			<div className="invite-rank">
				<ul>
					{
						list.map((item, index)=>{
							return (
								<li key={index} data-rank={index + 1}>
									<p className="name">{item.user}</p>
									<p className="desc" dangerouslySetInnerHTML={{__html: UPEX.lang.template('获得佣金估值{num}{unit}', { num: item.amount, unit: item.currencyNameEn}, 1)}}></p>
								</li>
							)
						})
					}
				</ul>
			</div>
		);
	}
}

export default RankView;
