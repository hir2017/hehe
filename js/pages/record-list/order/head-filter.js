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
            currencyIdData: [],
            baseCurrencyIdData: []
        };
        // 币对映射关系
        this.tradeMap = {};
        this.baseCoins = [];
    }

    componentDidMount() {
        getCurrencyPoints().then(res => {
            // 交易货币
            let tradeCoins = {};
            // 基础货币
            const temp_base = {};
            let baseCoins = [];
            // 币种关系
            let coinMap = {};
            let _state = {
                currencyIdData: [],
            };
            if (res.status === 200) {
                // 去重 ie11 set
                res.attachment.forEach(item => {
                    const id = item.tradeCurrencyId;
                    // 收集交易货币
                    tradeCoins[id] = item;
                    // 收集基础货币
                    temp_base[item.baseCurrencyNameEn] = item;
                    // 收集币种关系
                    if(coinMap[id]) {
                        coinMap[id].bases.push(item);
                    } else {
                        coinMap[id] = {
                            info: item,
                            bases : [item]
                        };
                    }
                });
                for (const key in tradeCoins) {
                    _state.currencyIdData.push({
                        name: tradeCoins[key].tradeCurrencyNameEn,
                        id: key
                    });
                }
                for (const key in temp_base) {
                    baseCoins.push(temp_base[key]);
                }
                this.baseCoins = baseCoins;
                this.tradeMap = coinMap;
                _state.baseCurrencyIdData = baseCoins;
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
        if (name === 'currencyId') {
            this.setState({
                [name]: param1,
                baseCurrencyId: '0',
                baseCurrencyIdData: param1=== '0' ? this.baseCoins : this.tradeMap[param1].bases
            });
            return ;
        }
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
                            <Select size="large"  defaultValue={state.currencyId} onChange={this.onChange.bind(this, 'currencyId')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                {state.currencyIdData.map((item, i) => (
                                    <Option value={item.id} key={i + 1}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                            <label></label><label>/</label>
                            <Select size="large" defaultValue={state.baseCurrencyId} value={state.baseCurrencyId} onChange={this.onChange.bind(this, 'baseCurrencyId')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                {state.baseCurrencyIdData.map((item, i) => (
                                    <Option value={item.baseCurrencyId} key={i + 10}>
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
