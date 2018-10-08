/**
 * 邀请返佣 － 我的返佣资产
 */
import React, { Component } from "react";
import { getInviteTopList } from '../../../api/http';

class BonusView extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isFetching: 1,
			list: []
		}
	}

	componentDidMount(){
		this.fetchData();
	}

	fetchData() {
		getInviteTopList().then((data)=>{
			if (data.status ==  200) {
				this.setState({
                    // list: data.attachment,
                    isFetching: 0
                });
			}
		})
	}

	render() {
		let { list, isFetching } = this.state;
		return (
			<div className="invite-bonus">
				<div className="bonus-hd">{ UPEX.lang.template('我的返佣资产')}</div>
				<div className="bonus-bd">
					{ 
						isFetching == 0 &&  list.length == 0 ? <div className="mini-tip exc-list-empty">{UPEX.lang.template('暂无记录，快去邀请好友')}</div> : null
					}
				</div>
			</div>
		);
	}
}

export default BonusView;
