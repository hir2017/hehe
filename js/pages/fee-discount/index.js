import React from 'react'
import {Breadcrumb, message} from 'antd';
import Card from '@/components/card';
import List from './list';
import Opt from './opt';
import Seccess from './success';

class View extends React.Component {
    constructor() {
        super();
        this.state = {
            isSuccess: false,
            optVisible: false,
            // 折扣列表
            list: [
                {
                    id: 1,
                   discount: '9',
                   price:  120,
                },
                {
                    id: 2,
                   discount: '8',
                   price:  1200,
                },
                {
                    id: 3,
                   discount: '7',
                   price:  6000,
                },
                {
                    id: 4,
                   discount: '6',
                   price:  12000,
                },
                {
                    id: 5,
                   discount: '5',
                   price:  18000,
                }
            ],
            // 选中的折扣
            item: {}
        };
    }
    // 关闭弹窗
    close = (status) => {
        console.log('close', status)
        this.setState({
            optVisible: false
        });
    }
    // 选中折扣
    onSelect= (item) => {
        console.log('onSelect', item, )
        this.setState({
            optVisible: true
        });
    }

    render() {
        const {state} = this;
        // 操作成功
        if(state.isSuccess) {
            return <Seccess />;
        }
        return (
            <div className="user-wrapper fee-discount">
                <Breadcrumb className="user-breadcrumb" separator=">">
                    <Breadcrumb.Item><a href="/home">{UPEX.config.sitename}</a></Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('手续费折扣')}</Breadcrumb.Item>
                </Breadcrumb>
                <Opt visible={state.optVisible} sourceData={state.list} onClose={this.close}></Opt>
                <Card title={UPEX.lang.template('开通手续费折扣特权')}>
                    <List onClick={this.onSelect} sourceData={state.list}></List>
                    <div className="bottom-tip" dangerouslySetInnerHTML={{__html: UPEX.lang.template('手续费折扣温馨提示...')}}></div>
                </Card>
            </div>
        )
    }
}

export default View;
