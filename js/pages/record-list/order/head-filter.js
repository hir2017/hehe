import React from 'react';
import { observer, inject } from 'mobx-react';
import { Select, DatePicker, Button } from 'antd';
import { getCurrencyPoints } from '@/api/http';
const Option = Select.Option;
const { RangePicker } = DatePicker;

@inject('tradeStore')
@observer
class View extends React.Component {
    /*
    beginTime: 2018-08-10
    endTime: 2018-09-09
    status: 2
    buyOrSell: 2
    currencyId: 7
    baseCurrencyId: 0
    priceType: 0
    */
    constructor(props) {
        super(props);
        this.state = {
            beginTime: '',
            endTime: '',
            status: '',
            buyOrSell: '',
            currencyId: '0',
            baseCurrencyId: '0',
            priceType: 0,
            tradeCoins: [],
            baseCoins: []
        };
        // 币对映射关系
        this.tradeCoinMap = {};
        this.baseCoinMap = {};
        // 货币store
        this.allBaseCoins = [];
        this.allTradeCoins = [];
    }

    componentDidMount() {
        getCurrencyPoints().then(res => {
            if (res.status === 200) {
                // 收集交易货币、基础货币信息、关系
                let temp = {
                    base: {},
                    trade: {}
                };
                let tempAll = {
                    base: [],
                    trade: []
                }
                let _state = {
                    tradeCoins: [],
                    baseCoins: []
                };
                res.attachment.forEach(item => {
                    const {baseCurrencyId, tradeCurrencyId} = item;
                    // 去重收集信息
                    if(temp.base[baseCurrencyId]) {
                        temp.base[baseCurrencyId].push(item);
                    } else {
                        tempAll.base.push(item);
                        temp.base[baseCurrencyId] = [item];
                    }
                    if(temp.trade[tradeCurrencyId]) {
                        temp.trade[tradeCurrencyId].push(item);
                    } else {
                        tempAll.trade.push(item);
                        temp.trade[tradeCurrencyId] = [item];
                    }
                });
                _state.baseCoins = tempAll.base;
                _state.tradeCoins = tempAll.trade;
                this.tradeCoinMap = temp.trade;
                this.baseCoinMap = temp.base;
                this.allBaseCoins = tempAll.base;
                this.allTradeCoins = tempAll.trade;
                this.setState(_state);
            }
        });
    }

    onChange(name, param1, param2) {
        if (name === 'date') {
            this.setState({
                beginTime: param2[0],
                endTime: param2[1]
            });
            return ;
        }
        // 货币变更，切换市场
        if (name === 'currencyId') {
            this.setState({
                [name]: param1,
                baseCurrencyId: '0',
                baseCoins: param1 === '0' ? this.allBaseCoins : this.tradeCoinMap[param1]
            });
            return ;
        }
        // 市场变更，切换货币
        if (name === 'baseCurrencyId') {
            this.setState({
                [name]: param1,
                currencyId: '0',
                tradeCoins: param1 === '0' ? this.allTradeCoins : this.baseCoinMap[param1]
            });
            return ;
        }
        baseCurrencyId
        this.setState({
            [name]: param1
        });
    }

    handleClick() {
        this.props.onClick(this.state);
    }

    render() {
        const { state, props } = this;
        const { action } = props;
        return (
            <div className="order-header">
                <div className="filter-box">
                    <ul className="form-content">
                        <li>
                            {state.beginTime ? null : (
                                <div className="ie11-hack">
                                    <span className="placeholder">{UPEX.lang.template('选择日期')}</span>
                                    <span className="placeholder">{UPEX.lang.template('选择日期')}</span>
                                </div>
                            )}
                            <RangePicker size="small" onChange={this.onChange.bind(this, 'date')} placeholder={['', '']} allowClear={false} />
                        </li>
                        <li>
                            <label>{UPEX.lang.template('币种')}/{UPEX.lang.template('市场')}</label>
                            <Select size="large"  defaultValue={state.currencyId} value={state.currencyId} onChange={this.onChange.bind(this, 'currencyId')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                {state.tradeCoins.map((item, i) => (
                                    <Option value={item.tradeCurrencyId} key={i + 1}>
                                        {item.tradeCurrencyNameEn}
                                    </Option>
                                ))}
                            </Select>
                            <label></label><label>/</label>
                            <Select size="large" defaultValue={state.baseCurrencyId} value={state.baseCurrencyId} onChange={this.onChange.bind(this, 'baseCurrencyId')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                {state.baseCoins.map((item, i) => (
                                    <Option value={item.baseCurrencyId} key={i + 1}>
                                        {item.baseCurrencyNameEn}
                                    </Option>
                                ))}
                            </Select>
                        </li>

                        <li>
                            <label>{UPEX.lang.template('类型')}</label>
                            <Select size="large" defaultValue="0" onChange={this.onChange.bind(this, 'buyOrSell')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                <Option value="1">{UPEX.lang.template('买入')}</Option>
                                <Option value="2">{UPEX.lang.template('卖出')}</Option>
                            </Select>
                        </li>
                        {action === 'history' ? (
                            <li>
                                <label>{UPEX.lang.template('状态')}</label>
                                <Select size="large" defaultValue="12" onChange={this.onChange.bind(this, 'status')}>
                                    <Option value="12">{UPEX.lang.template('全部')}</Option>
                                    <Option value="2">{UPEX.lang.template('全部成交')}</Option>
                                    <Option value="4">{UPEX.lang.template('全部撤单')}</Option>
                                    <Option value="5">{UPEX.lang.template('部分成交')}</Option>
                                </Select>
                            </li>
                        ) : null}
                    </ul>
                    <Button className="exc-btn-submit" icon="search" onClick={this.handleClick.bind(this)}>{UPEX.lang.template('搜索')}</Button>
                </div>
            </div>
        );
    }
}

export default View;
