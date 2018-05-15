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

        return (
            <div className="trade-current-coin">
                <ul>
                    <li className="coin" ref="coin">
                        <Popover content={<TradeCoinList/>} placement="bottomLeft" trigger="click" getPopupContainer={()=>this.refs.coin}>
                            <label>{ store.currentTradeCoin.currencyNameEn }</label>
                            <Icon type="caret-down" style={{ fontSize: 14, color: '#c5c5c5' }} />
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
