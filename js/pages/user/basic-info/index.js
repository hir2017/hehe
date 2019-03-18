import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Info from './info';
import InfoAus from './info-aus';
import List from './logined-list';
import NumberUtils from '@/lib/util/number';
import { ausGetQuotaManagementInfo, twdGetQuotaManagementInfo } from '@/api/http';

@inject('userInfoStore')
@observer
class Information extends Component {

    constructor() {
        super();
        this.state = {
            cashLimit: 0,
            coinLimit: 0
        }
        this.unmount = 0;
    }

    componentWillUnmount() {
        this.unmount = 1;
    }

    getLimit() {
        let request = UPEX.config.version === 'ace' ? twdGetQuotaManagementInfo : ausGetQuotaManagementInfo;
        Promise.all([
            request({
                actionId: 2,
                currencyId: 1
            }),
            request({
                actionId: 4,
                currencyId: 2
            })
        ])
            .then(([res1, res2]) => {
                if (this.unmount == 1) {
                    return;
                }
                const { authLevel = 1 } = this.props.userInfoStore.userInfo || {};
                let result = {};
                if (res1.status === 200) {
                    result.cashLimit = NumberUtils.separate(res1.attachment[0][`kyc${authLevel}DayLimit`]);
                }
                if (res2.status === 200) {
                    result.coinLimit = NumberUtils.separate(res2.attachment[0][`kyc${authLevel}DayLimit`]);
                }
                this.setState(result);
            })
            .catch(err => {
                console.error('GetQuotaManagementInfo', err);
            });
    }

    componentDidMount() {
        // 初始化个人中心数据
        const userInfo = this.props.userInfoStore.userInfo || {};
        const gaBindSuccess = this.props.userInfoStore.gaBindSuccess;
        // Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo();
        gaBindSuccess || this.props.userInfoStore.isGoogleAuth();

        this.props.userInfoStore.getUserInfo().then(res => {
           if(res.status === 200) {
               this.getLimit();
           }
        });

    }

    render() {
        const cash = {
            cashLimit: this.state.cashLimit,
            coinLimit: this.state.coinLimit,
        }
        return (
            <div className="page-content-inner  clearfix base-info">
                { UPEX.config.version === 'ace' ?<Info {...cash} /> : <InfoAus {...cash}/>}
                <List />
            </div>
        );
    }
}

export default Information;
