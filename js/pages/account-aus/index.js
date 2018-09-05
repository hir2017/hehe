/**
 * @fileoverview 我的资产入口页面
 * @author 陈立英
 * @date 2018-05-19
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import List from './list';
import Info from './info';
import { Modal, Button } from 'antd';
import { browserHistory } from 'react-router';
import FormItem from '@/mods/common/form/item';

@inject('commonStore')
@observer
class AccountPage extends Component {
    componentWillMount() {
        let { commonStore } = this.props;

        commonStore.getAllCoinPoint();
    }

    render() {
        let { commonStore } = this.props;

        // 用于切换交易币时内容切换
        if (commonStore.productDataReady) {
            return <Account {...this.props} />;
        } else {
            return (
                <div className="home-wrapper">
                    <div className="mini-loading" />
                </div>
            );
        }
    }
}

@inject('accountStore', 'userInfoStore')
@observer
class Account extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
    }

    componentDidMount() {
        let store = this.props.accountStore;
        store.getUserCoinAccount();
    }

    render() {
        let visible = false;
        const { userInfo } = this.props.userInfoStore;
        if ([-1, 0, 1].indexOf(userInfo.isAuthPrimary) !== -1) {
            visible = true;
        }
        return (
            <div className="account-wrapper">
                <Modal className="account-no-auth" visible={visible} closable={false} footer={null}>
                    <p>{UPEX.lang.template('您尚未完成身份认证')}</p>
                    <p>{UPEX.lang.template('管理您的资金前请完成身份认证')}</p>
                    <FormItem>
                        <Button className="submit-btn width-auto" onClick={e => {
                            browserHistory.push('/user/authentication');
                        }}>
                            {UPEX.lang.template('去认证')}
                        </Button>
                    </FormItem>
                </Modal>
                <div className="account-hd">
                    <Info />
                </div>
                <div className="account-bd">
                    <List />
                </div>
            </div>
        );
    }
}

export default AccountPage;
