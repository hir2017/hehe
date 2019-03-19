import React from 'react';
import { Breadcrumb, message } from 'antd';
import Card from '@ui/card';
import Info from './info';
import Opt from './opt';
import Api from '@/api';


class View extends React.Component {
    constructor() {
        super();
        this.state = {
            isSuccess: false,
            loading: true,
            // 是否已购买
            isPurchase: false,
            // 是否已过期
            isExpire: false,
            // 用户订单信息
            bill: {},
            // 折扣列表
            list: [],
            dateStamp: 0,
        };
    }

    componentDidMount() {

        Promise.all([Api.feeDiscount.getPackage(), Api.feeDiscount.getList()]).then(([billData, listData]) => {
            let isPurchase = false;
            if(billData.status === 200) {
                // 存在信息且未过期
                if(billData.attachment !== null && billData.attachment.status == 1) {
                    isPurchase = true;
                    this.setState({
                        isPurchase,
                        bill: billData.attachment || {}
                    })
                }
            }
            if(!isPurchase) {
                if(listData.status === 200) {
                    this.setState({
                        list: listData.attachment || [],
                    })
                }
            }
        }).then(res => {
            this.setState({
                loading: false
            })
        });
    }



    render() {
        const { state } = this;
        let $content = null;
        if(state.loading) {
            $content = <div className="mini-loading"></div>
        } else {
            $content = state.isPurchase ? <Info data={state.bill} /> : <Opt source={state.list} />;
        }
        return (
            <div className="user-wrapper fee-discount">
                <Breadcrumb className="user-breadcrumb" separator=">">
                    <Breadcrumb.Item>
                        <a href="/home">{UPEX.config.sitename}</a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('手续费折扣')}</Breadcrumb.Item>
                </Breadcrumb>
                <Card title={UPEX.lang.template('开通手续费折扣特权')}>
                    <div className="container">
                        {$content}
                        <div className="bottom-tip" dangerouslySetInnerHTML={{ __html: UPEX.lang.template('手续费折扣温馨提示...') }} />
                    </div>
                </Card>
            </div>
        );
    }
}

export default View;
