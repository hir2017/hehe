import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Icon, Checkbox } from 'antd';
import Table from './table'

@inject('homeStore', 'marketListStore')
@observer
class MarketCoinList extends Component {
	constructor(props){
		super(props);

		this.state = {
			sort: '',
        	sortField: ''
		}
	}

	sortHandle=(field, e)=>{
		this.setState({
            sortField: field
        });

        if (!this.state.sort || this.state.sort === 'asc') {
            this.setState({
				sort: 'desc'
            },() => {
               	this.props.homeStore.sortCoin(field, 'desc');
			});
        } else if (this.state.sort === 'desc') {
        	this.setState({
				sort: 'asc'
            },() => {
               	this.props.homeStore.sortCoin(field, 'asc');
			});
        }
	}

	selectCoin=(item, e)=>{
		this.props.marketListStore.setSelectedCoin(item);
	}

	sortIcon(show, sort) {
        if (!show || !sort) return null;
        
        return <Icon type={ sort === 'desc' ? 'caret-down' : 'caret-up'} />;
    }

    changeHandle(value){

    }

    collectIcon(data) {
        const collectCoinsList = this.props.homeStore.collectCoinsList;
        const res = collectCoinsList.some(item => {
            return item.tradeCurrencyId === data.currencyId && item.baseCurrencyId === data.baseCurrencyId;
        });

        return <Icon onClick={e => this.collecthandle(e, data)} type={res ? 'star' : 'star-o'} />;
    }

	render(){
		let { marketListStore, homeStore } = this.props;
		
		return (
			<div className="coin-list">
				<div className="coin-list-title">
					<Checkbox onChange={this.collectHandle}>
                    	{UPEX.lang.template('只看收藏')}
                  	</Checkbox>
                  	<Input
                    	onChange={this.changeHandle}
                    	placeholder={UPEX.lang.template('搜索数字币')}
                    	prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)'}} />}
                  	/>
				</div>
				<div className="coin-list-content">
					<div className="">
						<div className="table-header">
							<table>
	                            <thead>
	                                <tr>
	                                    <th className="name">{UPEX.lang.template('币种')}</th>
	                                    <th className="amount" onClick={this.sortHandle.bind(this,'currentAmount')}>
	                                        {UPEX.lang.template('最新价')}
	                                        {this.sortIcon(this.state.sortField === 'currentAmount', this.state.sort)}
	                                    </th>
	                                    <th className="rate" onClick={this.sortHandle.bind(this, 'changeRate')}>
	                                        {UPEX.lang.template('24h涨跌')}
	                                        {this.sortIcon(this.state.sortField === 'changeRate', this.state.sort)}
	                                    </th>
	                                    <th className="volume" onClick={this.sortHandle.bind(this, 'volume')}>
	                                        {UPEX.lang.template('24h成交量')}
	                                        {this.sortIcon(this.state.sortField === 'volume', this.state.sort)}
	                                    </th>
	                                    <th className="action">{UPEX.lang.template('收藏')}</th>
	                                </tr>
	                            </thead>
	                        </table>
                        </div>
                        <div className="table-body">
                            { 
                                marketListStore.noCoin ? (
                                    <div className="mini-tip">{ UPEX.lang.template('暂无数据')}</div>
                                ) : (
                                    <table>
                                        <tbody className="ant-table-tbody">
                                            {
                                                marketListStore.tradeCoins.map((item, index) => {
                                                	let path;
                                                	
                                                	if (item.baseCurrencyNameEn && item.currencyNameEn) {
                                                		path = `/trade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`;	
                                                	}
                                                    
                                                    
                                                    return (
                                                        <tr key={item.id} onClick={this.selectCoin.bind(this, item)}>
                                                            <td className="name"><span className="icon">{item.currencyNameEn || '--'}</span></td>
                                                            <td className="amount">{item.currentAmount}</td>
                                                            <td className="rate">{item.changeRateText}</td>
                                                            <td className="volume">{item.volume}</td>
                                                            <td className="action">{this.collectIcon(item)}</td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                )
                            }
                        </div>
					</div>
				</div>
			</div>
		)
	}
}

export default MarketCoinList;