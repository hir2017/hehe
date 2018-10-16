/**
 * 提币
 * TODO 不满足提币条件，引导绑定手机、身份认证等操作
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import WithdrawCoinView from '@/mods/recharge-withdraw/coin-withdraw-aus';
import RecordList from '@/mods/record-list/coin-withdraw-record';
import PageWrapper from '@/mods/common/wrapper/full-page';
import AuthWrapper from '@/mods/authhoc/recharge-withdraw';

@inject('userInfoStore', 'coinWithdrawStore')
@observer
class Withdraw extends Component {
    componentDidMount() {
        let { userInfoStore } = this.props;

        // 获取用户信息
        userInfoStore.getUserInfo();
    }

    clickSetTradePwd = e => {
        browserHistory.push('/user/set-trade-pwd');
    };

    clickAuthUserIDCard = e => {
        browserHistory.push('/user/authentication');
    };

    render() {
        let store = this.props.coinWithdrawStore;
        let { userInfoStore } = this.props;
        let $content;

        if(userInfoStore.isFetchingInfo == false) {
            $content = <WithdrawCoinView {...this.props} />;
        } else {
            $content = <div className="mini-loading" />;
        }

        let pageInfo = {
            title: UPEX.lang.template('提币'),
            className: 'coin-withdraw-aus header-shadow'
        };
        return (
            <AuthWrapper pageInfo={pageInfo} name="withdraw coin">
                <PageWrapper {...pageInfo}>
                    {$content}
                    <div className="module-box">
                        <h2 className="title">{UPEX.lang.template('提币记录')}</h2>
                        <div className="content">
                            <div className="order-main-box">
                                <RecordList currencyId={store.currentCoin.currencyId} key={store.currentCoin.currencyId} />
                                {store.isFetching ? <div className="mini-loading" /> : null}
                            </div>
                        </div>
                    </div>
                </PageWrapper>
            </AuthWrapper>
        );
    }
}

export default Withdraw;
