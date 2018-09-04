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

	componentDidMount() {
		this.getBarTransform();
	}

	handleClickTab(index){
		this.setState({
			tabIndex: index
		}, ()=>{
			this.getBarTransform();
		});
	}

	handleExpand=(e)=>{
		let status = !this.props.tradeStore.expandOrderTable;

		this.props.tradeStore.isExpandOrderTable(status);
	}

	getBarTransform() {
		let x = 0;
		let tabs = $(this.refs.tabs);
		let bar = $(this.refs.bar);
		
		if (tabs.length == 0 || bar.length == 0) {
			return;
		}

		let ulOffset = tabs.offset();
		let lis = $('[data-role="tab"]', tabs);
		let barOffset = $(bar).offset();
		let selectedLi = lis.eq(this.state.tabIndex);
		let liOffset = selectedLi.offset();

		x = liOffset.left -  ulOffset.left + (liOffset.width / 2  - barOffset.width / 2);

		//  为了改动小，先简单的处理

		bar.css({
			visibility: 'visible',
			msTransform: 'translate3d(' + x + 'px,0,0)',
            WebkitTransform: 'translate3d(' + x + 'px,0,0)',
            transform: 'translate3d(' + x + 'px,0,0)',
		})
	}

	render() {
		let store = this.props.tradeStore;
		let { tabIndex } = this.state;

		return (
			<div className="trade-order-wrapper">
				<div className="trade-order-hd clearfix">
					<ul ref="tabs">
						{
							this.tabs.map((item, index)=>{
								let cls = tabIndex == index ? 'selected' : '';
								
								return (
									<li key={index} data-key={ item.id} data-role="tab" className={cls} onClick={this.handleClickTab.bind(this, index)}>{item.title}</li>
								)
							})
						}
						<li key="bar" data-role="bar" ref="bar" className="tab-bar exc-tab-animated"></li>
					</ul>
					<div className="action-btn" onClick={this.handleExpand} ref="actionbtn">
                        {
                            store.expandOrderTable ?
                            <Tooltip placement="right" overlayClassName={store.theme == 'dark' ? 'ant-tooltip-dark' : 'ant-tooltip-light'} title={UPEX.lang.template('收起')}><i className="icon-close"/></Tooltip>:
                            <Tooltip placement="right" overlayClassName={store.theme == 'dark' ? 'ant-tooltip-dark' : 'ant-tooltip-light'} title={UPEX.lang.template('展开')}><i className="icon-open"/></Tooltip>
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
