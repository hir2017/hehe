/**
 * @fileoverview 货币行情模块
 * @author 陈立英
 * @date 2018-05-04
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Icon, Checkbox } from 'antd';
import { Link } from 'react-router'
import CoinList from './coin-list';

const Search = Input.Search;

@inject('tradeStore')
@observer
class Markets extends Component{
	constructor(props){
		super(props);
	}

	componentWillMount() {
		this.props.tradeStore.marketListStore.getData();
	}

	handleTab=(code)=>{
		let store = this.props.tradeStore.marketListStore;
		
		store.updateMarketCode(code);
		store.initMarket();
	}

	filterHandle=(e)=>{
		let store = this.props.tradeStore.marketListStore;
        let value = e.target.value.trim();

        store.updateSearchValue(value);
    }

	render() {
		let store = this.props.tradeStore.marketListStore;
		let pair;

		return (
  			<div className="coin-list-wrap">
     			<div className="coin-list-nav">
     				<ul>
     					{
     						store.marketNav.map((item, index)=>{
     							let clsName = item == store.selectedMarketCode ? 'selected' : '';
 								
     							return ( 
     								<li className={clsName} key={item} onClick={this.handleTab.bind(this, item)}>
     									{item}
     								</li>
     							);
     						})
     					}
     					<li className="marked" onClick={this.handleTab.bind(this, 'Marked')}>
     						{
     							store.selectedMarketCode == 'Marked' ?  
     							<Icon style={{color: '#e6bc1d', fontSize: '14'}} type='star' /> :
     							<Icon style={{color: '#999', fontSize: '14'}} type='star-o' />  
     						}
     					</li>
     				</ul>
     				<div className="search">
	 				  	<Search
	                        onChange={this.filterHandle}
	                        value={store.searchValue}
	                        placeholder={UPEX.lang.template('搜索数字币')}
	                    />
                    </div>
     			</div>
                <div className="coin-list-panel">
                	<CoinList/>
                </div>
  			</div>
		)
	}
}

export default Markets;