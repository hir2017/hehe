/**
 * 我的订单模块
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Tooltip } from 'antd';
import OpenOrder from '@/pages/record-list/order/open';
import HistoryOrder from '@/pages/record-list/order/success';

@inject('tradeStore')
@observer
class MyOrder extends Component {
	constructor(props){
		super(props);

		this.tabs = [{
			title: UPEX.lang.template('委托中订单')
		}, {
			title: UPEX.lang.template('已完成订单')
		}]

		this.state = {
			tabIndex: 0
		}
	}

	handleClickTab(index){
		this.setState({
			tabIndex: index
		});
	}

	componentDidMount() {
		$.channel.on('updateTradeUserAccount', ()=>{
			this.props.tradeStore.getUserAccount();
		})
	}

	componentWillUnmount(){
		$.channel.off('updateTradeUserAccount');
	}

	handleExpand=(e)=>{
		let status = !this.props.tradeStore.expandOrderTable;

		this.props.tradeStore.isExpandOrderTable(status);
	}

	render() {
		let store = this.props.tradeStore;
		let { tabIndex } = this.state;

		return (
			<div className="trade-order-wrapper">
				<div className="trade-order-hd clearfix">
					<ul>
						{
							this.tabs.map((item, index)=>{
								let cls = tabIndex == index ? 'selected' : '';
								return (
									<li key={index} className={cls} onClick={this.handleClickTab.bind(this, index)}>{item.title}</li>
								)
							})
						}
					</ul>
					<div className="action-btn" onClick={this.handleExpand}>
                        {
                            store.expandOrderTable ?
                            <Tooltip placement="right" title={UPEX.lang.template('收起')}><i className="icon-close"/></Tooltip>:
                            <Tooltip placement="right" title={UPEX.lang.template('展开')}><i className="icon-open"/></Tooltip>
                        }
                    </div>
				</div>
				<div className="trade-order-bd">
					{
						tabIndex == 0 ? <OpenOrder pagination={false}/> : <HistoryOrder pagination={false}/>
					}
				</div>
			</div>
		);
	}
}

export default MyOrder;
