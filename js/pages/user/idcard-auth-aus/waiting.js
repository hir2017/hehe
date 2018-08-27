import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import {updateAuthFailReasonStatus} from '@/api/http';

import AceForm from '@/components/form/form';

@inject('userInfoStore')
@observer
export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false
        }
    }

    submit() {
        this.setState({
            loading: true
        });

        updateAuthFailReasonStatus({
            status: 0
        }).then(res => {
            if(res.status !== 200) {
                message.error(res.message);
            }
        }).catch(err => {
            console.error(err, 'updateAuthFailReasonStatus');
        }).then(data => {
            this.setState({
                loading: false
            });
            setTimeout(() => {
                this.props.userInfoStore.getUserInfo();
            }, 100);

        });
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
                        <p className="info">{userInfo.authFailReason}</p>
                        <p className="tip">{UPEX.lang.template('请重新提交审核申请')}</p>
                    </div>
                )}
                <div>
                    <div className="submit">
                        {userInfo.isAuthPrimary == 1 ? null : (
                            <Button disabled={this.state.loading} onClick={this.submit.bind(this)} className="ace-submit-item">
                                {UPEX.lang.template('重新提交')}
                            </Button>
                        )}
                    </div>
                </div>
            </AceForm>
        );
    }
}
