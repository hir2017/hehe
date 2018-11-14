import React, { Component } from 'react';
import { Select } from 'antd';
import CountryMap, { Countries } from '@/mods/select-country/country-list';
const Option = Select.Option;

export default class View extends Component {
    constructor(props) {
        super(props);
        let options = [];
        $.each(Countries, (index, item) => {
            options[options.length] = (
                <Option value={item.code} key={item.code}>
                    {UPEX.lang.template(item.code)}(+{item.areacode})
                </Option>
            );
        });
        this.options = options;
        this.self_porps = Object.assign({}, props, {
            onChange(val) {
                props.onChange(val, CountryMap);
            }
        })
    }

    filterOption = (input, option) => {
        let arr = option.props.children || [];
        let str = arr.join('');
        let result = false;
        try {
            let reg = new RegExp(input, 'i');
            result = reg.test(str);

        } catch (error) {
            console.error('filterOption', input, str, arr, error);
        }
        return result;
    }


    render() {

        return (
            <Select showSearch filterOption={this.filterOption} size="large" style={{ width: '100%' }} {...this.self_porps}>
                {this.options}
            </Select>
        );
    }
}
