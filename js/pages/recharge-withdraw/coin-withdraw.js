/**
 * 提币
 * TODO 不满足提币条件，引导绑定手机、身份认证等操作
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {browserHistory} from 'react-router';
import WithdrawCoinView from '@/mods/recharge-withdraw/coin-withdraw-aus';
import RecordList from '@/mods/record-list/coin-withdraw-record';
import PageWrapper from '@/mods/common/wrapper/full-page';
import AuthWrapper from '@/mods/authhoc/recharge-withdraw';

@inject('userInfoStore', 'coinWithdrawStore')
@observer
class Withdraw extends Component {
    constructor() {
        super();
        this.pageInfo = {
            form: {
                title: UPEX.lang.template('提币'),
                className: 'coin-withdraw-aus header-shadow'
            },
            list: {
                title: UPEX.lang.template('提币记录'),
                className: 'header-shadow record'
            }
        }
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        let {userInfoStore} = this.props;
        // 获取用户信息
        userInfoStore.getUserInfo().then(res => {
            this.setState({
                loading: false
            })
        });
    }

    clickSetTradePwd = e => {
        browserHistory.push('/user/set-trade-pwd');
    };

    clickAuthUserIDCard = e => {
        browserHistory.push('/user/authentication');
    };

    render() {
        let store = this.props.coinWithdrawStore;
        let {userInfoStore} = this.props;
        let $content;

        if (this.state.loading) {
            $content = <div className="mini-loading"/>;
        } else {
            $content = <WithdrawCoinView {...this.props} />;
        }

        return (
            <div className="coin-withdraw">
                <AuthWrapper pageInfo={this.pageInfo.form} name="withdraw coin">
                    <PageWrapper {...this.pageInfo.form}>
                        {$content}
                    </PageWrapper>
                </AuthWrapper>
                <PageWrapper {...this.pageInfo.list}>
                    <div className="content">
                        <div className="order-main-box">
                            <RecordList currencyId={store.currentCoin.currencyId}
                                        key={store.currentCoin.currencyId}/>
                            {store.isFetching ? <div className="mini-loading"/> : null}
                        </div>
                    </div>
                </PageWrapper>
            </div>
        );
    }
}

export default Withdraw;
