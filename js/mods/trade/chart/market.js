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

    componentDidMount(){
        $.channel.on('selectedMarketCode', ()=>{
            let timer = setTimeout(()=>{
                clearTimeout(timer);
                this.getBarTransform();        
            }, 300);
        })
    }

    componentWillUnmount() {
        $.channel.off('selectedMarketCode');
    }

	handleTab=(code)=>{
		let store = this.props.tradeStore.marketListStore;
		
		store.updateMarketCode(code);
		store.initMarket();
        this.getBarTransform();
	}

	filterHandler=(e)=>{
		let store = this.props.tradeStore.marketListStore;
        let value = e.target.value.trim();

        // 仅允许输入字母
        // value = value.toUpperCase();
        store.updateSearchValue(value);
    }

    getBarTransform() {
        let x = 0;
        let tabs = $(this.refs.tabs);
        let bar = $(this.refs.bar);
        let key = this.props.tradeStore.marketListStore.selectedMarketCode;

        if (tabs.length == 0 || bar.length == 0 || !key) {
            return;
        }
        let ulOffset = tabs.offset();
        let barOffset = $(bar).offset();
        let selectedLi = $('[data-key="' + key + '"]', tabs);
        
        
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
		let store = this.props.tradeStore.marketListStore;
		let pair;

		return (
  			<div className="coin-list-wrap">
     			<div className="coin-list-nav">
                    <h3 className="title hidden">{store.selectedMarketCode == 'Marked' ? UPEX.lang.template('收藏') : store.selectedMarketCode }</h3>
                    <div className="search">
                        <Search
                            onChange={this.filterHandler}
                            value={store.searchValue}
                            placeholder={UPEX.lang.template('搜索数字币')}
                        />
                    </div>
     				<ul className="tabs" ref="tabs">
     					{
     						store.marketNav.map((item, index)=>{
     							let clsName = item == store.selectedMarketCode ? 'selected' : '';
 								
     							return ( 
     								<li data-role="tab" data-key={item} className={clsName} key={item} onClick={this.handleTab.bind(this, item)}>
     									{item}
     								</li>
     							);
     						})
     					}
     					<li data-role="tab" data-key="Marked" className={`marked${store.selectedMarketCode == 'Marked' ? ' selected' : ''}`} onClick={this.handleTab.bind(this, 'Marked')}>
     						{
     							store.selectedMarketCode == 'Marked' ?  
     							<i className='exc-star selected' /> :
                                <i className='exc-star' />
     						}
     					</li>
                        <li key="bar" data-role="bar" ref="bar" className="tab-bar exc-tab-animated"></li>
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