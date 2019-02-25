/**
 * filename: 手续费展示列表
 */
import React from 'react'
import {Button} from 'antd';

const Item = ({data, onClick}) => {
    return (
        <div className="item">
            <p>{UPEX.lang.template('交易手续费折扣')}</p>
            <p className="discount">{UPEX.lang.template('{num}折', {num: data.discount})}</p>
            <p className="price">{UPEX.lang.template('{num}/月', {num: data.price + (data.unit || '')})}</p>
            <Button onClick={e => {
                onClick(data);
            }}>
                { UPEX.lang.template('开通') }
            </Button>
        </div>
    )
}

export default ({sourceData, onClick}) => {
    return (
        <div className="discount-list">
            {
                sourceData.map((item, i) => <Item key={i} data={item} onClick={onClick}></Item>)
            }
        </div>
    )
};
