import React from 'react';
import { Select, DatePicker, Button } from 'antd';
import { getAllCurrencyRelations } from '@/api/http';
const Option = Select.Option;
const { RangePicker } = DatePicker;

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
            currencyId: '',
            baseCurrencyId: '',
            priceType: 0,
            currencyIdData: [],
            baseCurrencyIdData: []
        };
    }

    componentDidMount() {
        getAllCurrencyRelations().then(res => {
            let temp = {
                currency: {},
                base: {}
            };
            let _state = {
                currencyIdData: [],
                baseCurrencyIdData: []
            };
            if (res.status === 200) {
                // 去重 ie11 set
                res.attachment.forEach(item => {
                    temp.currency[item.tradeCurrencyNameEn] = item.tradeCurrencyId;
                    temp.base[item.baseCurrencyNameEn] = item.baseCurrencyId;
                });
                for (const key in temp.currency) {
                    _state.currencyIdData.push({
                        name: key,
                        id: temp.currency[key]
                    });
                }
                for (const key in temp.base) {
                    _state.baseCurrencyIdData.push({
                        name: key,
                        id: temp.base[key]
                    });
                }
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
        } else {
            this.setState({
                [name]: param1
            });
        }
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
                            <RangePicker size="large" onChange={this.onChange.bind(this, 'date')} placeholder={['', '']} allowClear={false} />
                        </li>
                        <li>
                            <label>{UPEX.lang.template('币种')}</label>
                            <Select size="large" defaultValue="0" onChange={this.onChange.bind(this, 'currencyId')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                {state.currencyIdData.map(item => (
                                    <Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                            /<label>{UPEX.lang.template('市场')}</label>
                            <Select size="large" defaultValue="0" onChange={this.onChange.bind(this, 'baseCurrencyId')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                {state.baseCurrencyIdData.map(item => (
                                    <Option value={item.id} key={item.id}>
                                        {item.name}
                                    </Option>
                                ))}
                            </Select>
                        </li>

                        <li>
                            <label>{UPEX.lang.template('类型')}</label>
                            <Select size="large" defaultValue="0" onChange={this.onChange.bind(this, 'buyOrSell')}>
                                <Option value="0">{UPEX.lang.template('全部')}</Option>
                                <Option value="1">{UPEX.lang.template('买')}</Option>
                                <Option value="2">{UPEX.lang.template('卖')}</Option>
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
