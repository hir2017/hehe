/**
 * 我的订单模块
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Tooltip } from 'antd';
import OpenOrder from '../../record-list/record-open';
import HistoryOrder from '../../record-list/record-success';

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
	}

	handleClickTab(index){
		this.props.tradeStore.setTabIndex(index);
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

		return (
			<div className="trade-order-wrapper">
				<div className="trade-order-hd clearfix">
					<ul>
						{
							this.tabs.map((item, index)=>{
								let cls = store.tabIndex == index ? 'selected' : '';
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
						store.tabIndex == 0 ? <OpenOrder pagination={false}/> : <HistoryOrder pagination={false}/>
					}
				</div>				
			</div>
		);
	}
}

export default MyOrder;