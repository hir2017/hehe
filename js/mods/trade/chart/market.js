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

	filterHandler=(e)=>{
		let store = this.props.tradeStore.marketListStore;
        let value = e.target.value.trim();

        // 仅允许输入字母
        value = value.toUpperCase();
        store.updateSearchValue(value);
    }

	render() {
		let store = this.props.tradeStore.marketListStore;
		let pair;

		return (
  			<div className="coin-list-wrap">
     			<div className="coin-list-nav">
                    <h3 className="title">{store.selectedMarketCode == 'Marked' ? UPEX.lang.template('收藏') : store.selectedMarketCode }</h3>
                    <div className="search">
                        <Search
                            onChange={this.filterHandler}
                            value={store.searchValue}
                            placeholder={UPEX.lang.template('搜索数字币')}
                        />
                    </div>
     				<ul className="tabs">
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
     					<li className={`marked${store.selectedMarketCode == 'Marked' ? ' selected' : ''}`} onClick={this.handleTab.bind(this, 'Marked')}>
     						{
     							store.selectedMarketCode == 'Marked' ?  
     							<i className='exc-star selected' /> :
                                <i className='exc-star' />
     						}
     					</li>
     				</ul>
     			</div>
                <div className="coin-list-panel">
                	<CoinList/>
                </div>
  			</div>
		)
	}
}

export default Markets;