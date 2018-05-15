/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, Switch, Popover} from 'antd';
import TradeCoinList from './coin-list';

@inject('tradeStore')
@observer
class CurrentTradeCoinInfo extends Component {
    constructor(props){
    	super(props);
    }

    switchTheme = (checked)=>{
        let store = this.props.tradeStore;

        if (checked) {
            store.changeThemeTo('dark');
        } else {
            store.changeThemeTo('light');
        }
    }

    render() {
        let store = this.props.tradeStore;
        let checked = store.theme === 'dark';
        let arrowCls = {}

        if (store.theme === 'dark') {
            arrowCls =  {
                fontSize: 14, 
                color: '#fff'
            }
        } else {
            arrowCls =  {
                fontSize: 14, 
                color:'#333333'
            }
        }
        return (
            <div className="trade-current-coin">
                <ul>
                    <li className="coin" ref="coin">
                        <Popover content={<TradeCoinList/>} placement="bottomLeft" trigger="click" getPopupContainer={()=>this.refs.coin} overlayClassName={ store.theme === 'dark' ? 'popover-tradecoins-dark' : 'popover-tradecoins-light'}>
                            <label>{ store.currentTradeCoin.currencyNameEn }/{store.currentTradeCoin.baseCurrencyNameEn}</label>
                            <Icon type="caret-down" style={arrowCls} />
                        </Popover>
                        <em>{ store.currentAmount }</em>
                    </li>
                    <li className={ store.changeRateStatus }>
                        <label>{ UPEX.lang.template('涨幅') }</label>
                        <em>{ store.currentCoinChangeRate }</em>
                    </li>
                    <li>
                        <label>{ UPEX.lang.template('高')}</label>
                        <em> { store.currentCoinHighPrice }</em>
                    </li>
                    <li>
                        <label>{ UPEX.lang.template('低')}</label>
                        <em>{ store.currentCoinLowPrice }</em>
                    </li>
                    <li>
                        <label>{ UPEX.lang.template('24H量')}</label>
                        <em>{ store.currentCoinVolume }</em>
                    </li>
                </ul>
                <div className="theme-menu">
                    <label>{ checked ? UPEX.lang.template('开灯') : UPEX.lang.template('关灯') }</label>
                    <Switch 
                        onChange={this.switchTheme} 
                        defaultChecked={ this.props.tradeStore.theme === 'dark'}
                    />
                </div>
            </div>
        );
    }
}

export default CurrentTradeCoinInfo;
