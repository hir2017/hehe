import React, {Component} from 'react';
import { Icon , Popover, Select , Modal } from 'antd';
const Option = Select.Option;
import CountryMap, { Countries } from '../../mods/select-country/country-list';

/**
 * tab切换
 * <TabView data={this.tabs} current={store.mode}/>
 */
export const TabView = (props)=>{
	let { data, current, onClick } = props;

	return (
		<ul className="register-mode-tabs clearfix">
            {
                data.map((item, index) => {
                    return (
                        <li key={item.id}>
                            <button
                                type="button"
                                className={ current === item.id ? 'register-mode-tab selected' : 'register-mode-tab'}
                                onClick={onClick.bind(this, item.id)}
                            >
                                { item.title }
                            </button>
                        </li>
                    );
                })
            }
        </ul>
	)
}

/**
 * 手机区域码选择
 * <AreaCodeSelectView defaultValue={store.selectedCountry.code} onChange={action.onAreaCodeChange}/>
 */
export class AreaCodeSelectView extends Component  {
    constructor(props) {
        super(props);
    }

    filterOption = (input, option) => {
        let arr = option.props.children || [];
        return arr.join('').indexOf(input) !== -1;
    }

    render(){
        const {props} = this;
        let { defaultValue, onChange } = props;
        let options = [];

        $.each(Countries, (index, item) => {
            options[options.length] = (
                <Option value={item.code} key={item.code}>
                    {UPEX.lang.template(item.code)}(+{item.areacode})
                </Option>
            );
        });

        return (
            <div className="input-wrapper area-code" ref="box">
                <div className="input-box">
                    <Select showSearch filterOption={this.filterOption} onChange={onChange} defaultValue={defaultValue} dropdownClassName="country-select-menu">
                        {options}
                    </Select>
                </div>
            </div>
        )
    }
}
/**
 * 短信验证码
 * <SMSCodeView onClick={this.sendVercode} disabled={store.sendingcode} fetching={}/>
 */
export const SMSCodeView =(props) =>{
	let { onClick , disabled, fetching } = props;

	if (fetching) {
        return (
            <div className="yzcode">
                <button type="button" className="disabled">
                    <div className='code-sending'>{UPEX.lang.template('发送中')}<Icon type="loading" style={{ fontSize: 16, color: '#666' }}/></div>
                </button>
            </div>
        )
    } else {
    	let _props = {};

    	if (disabled) {
    		_props.className = 'disabled';
    	} else {
    		_props.onClick = onClick;
    	}

    	return (
    		<div className="yzcode">
    			<button type="button" {..._props}>
                    <div className={disabled ? 'code-sending' : 'code-sending hidden'}>
                        {UPEX.lang.template('重发')}（<span data-second="second" />s）
                    </div>
                    <div className={disabled ? 'code-txt hidden' : 'code-txt'}>{UPEX.lang.template('发送验证码')}</div>
                </button>
            </div>
    	)
    }
}

