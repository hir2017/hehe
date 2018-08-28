import React from 'react';
import { Radio } from 'antd';
import { browserHistory } from 'react-router';
import { inject } from 'mobx-react';
import Wrapper from '@/components/wrapper';
import RecordHistory from './history';
import RecordOpen from './open';
import RecordSuccess from './success';

@inject('tradePwdStore', 'currencyStore', 'commonStore')
class View extends React.Component {
    constructor(props) {
        super(props);
        const { type = '' } = props.params;

        this.state = {
            page: type || 'open'
        };
        this.radios = [
            {
                path: 'open',
                title: UPEX.lang.template('当前委托')
            },
            {
                path: 'history',
                title: UPEX.lang.template('历史委托')
            },
            {
                path: 'success',
                title: UPEX.lang.template('已成交')
            }
        ];

        this.pageInfo = {
            breadcrumbs: [UPEX.lang.template('ACE'), UPEX.lang.template('订单中心')],
            className: 'page-order'
        };
    }

    handleChange({ target }) {
        browserHistory.push(`/account/record-order/${target.value}`);
        this.setState({
            page: target.value
        });
    }

    componentDidMount() {
		this.props.commonStore.getAllCoinPoint();
		this.props.currencyStore.getCurrencyPoints();
		this.props.tradePwdStore.getPersonalTradingPwd();
	}

    render() {
        const { state, pageInfo, radios, defaultRadio } = this;
        return (
            <Wrapper {...pageInfo}>
                <Radio.Group onChange={this.handleChange.bind(this)} value={state.page}>
                    {radios.map(item => (
                        <Radio.Button key={item.path} value={item.path}>
                            {item.title}
                        </Radio.Button>
                    ))}
                </Radio.Group>
                {state.page === 'history' ? <RecordHistory /> : null}
                {state.page === 'open' ? <RecordOpen /> : null}
                {state.page === 'success' ? <RecordSuccess /> : null}
            </Wrapper>
        );
    }
}

export default View;
