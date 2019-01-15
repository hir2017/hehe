/**
 * @fileoverview  用户个人信息
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd';
import {updateAuthFailReasonStatus} from '@/api/http';

import AceForm from '../../components/form/form';

@inject('userInfoStore', 'UtilStore')
@observer
export default class ThirdStep extends Component {
    constructor() {
        super();
        this.next = this.next.bind(this);
        this.state = {
            reason: ''
        }
    }

    componentDidMount() {
        const {userInfo} = this.props.userInfoStore;
        if(userInfo.isAuthPrimary === -1) {
            this.props.UtilStore.getRefuseReason(userInfo.refuseReasonId).then(reason => {
                this.setState({
                    reason
                })
            })
        }
    }

    next() {
        updateAuthFailReasonStatus({
            status: 0
        }).then(res => {
            if(res.status === 200) {
                setTimeout(() => {
                    this.props.userInfoStore.getUserInfo();
                }, 50);
            }
        });
        this.props.changeStep(1);
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        return (
            <AceForm className="auth-step-3">
                {userInfo.isAuthPrimary == 1 ? (
                    <div className="info-line loading">
                        <p className="title">{UPEX.lang.template('已接受到您的信息，我们正在全力审核中')}……</p>
                        <p className="info">{UPEX.lang.template('一般状况下，审核周期为3个工作内')}</p>
                    </div>
                ) : (
                    <div className="info-line fail">
                        <p className="title">{UPEX.lang.template('您的申请审核失败了，失败原因是')}</p>
                        <p className="info">{this.state.reason}</p>
                        <p className="tip">{UPEX.lang.template('请重新提交审核申请')}</p>
                    </div>
                )}
                <div>
                    <div className="submit">
                        {userInfo.isAuthPrimary == 1 ? null : (
                            <Button onClick={this.next} className="exc-submit-item">
                                {UPEX.lang.template('重新提交')}
                            </Button>
                        )}
                    </div>
                </div>
            </AceForm>
        );
    }
}
