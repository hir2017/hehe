import React from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd';
import { updateAuthFailReasonStatus } from '@/api/http';

import AceForm from '@/components/form/form';

@inject('userInfoStore', 'UtilStore')
@observer
export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            reason: ''
        };
    }

    componentDidMount() {
        const { userInfo } = this.props.userInfoStore;
        if (userInfo.isAuthPrimary === -1) {
            this.props.UtilStore.getRefuseReason(userInfo.refuseReasonId).then(reason => {
                this.setState({
                    reason
                });
            });
        }
    }

    submit() {
        this.setState({
            loading: true
        });

        updateAuthFailReasonStatus({
            status: 0
        })
            .then(res => {
                if (res.status !== 200) {
                    if ([0, 9999, 9997].indexOf(res.status) === -1) {
                        message.error(res.message);
                    } else {
                        console.error(res.message);
                    }
                }
            })
            .catch(err => {
                console.error(err, 'updateAuthFailReasonStatus');
            })
            .then(data => {
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
        let _Primary = userInfo.isAuthPrimary;
        let $content = null;
        let $btn = null;
        // 审核中 复审中
        if ([1, 3].indexOf(_Primary) != -1) {
            $content = (
                <div className="info-line loading">
                    <p className="title">{UPEX.lang.template('已接受到您的信息，我们正在全力审核中')}……</p>
                    <p className="info">{UPEX.lang.template('一般状况下，审核周期为3个工作内')}</p>
                </div>
            );
        }
        // 被驳回
        if (_Primary == -1) {
            $content = (
                <div className="info-line fail">
                    <p className="title">{UPEX.lang.template('您的申请审核失败了，失败原因是')}</p>
                    <p className="info">{this.state.reason}</p>
                    <p className="tip">{UPEX.lang.template('请重新提交审核申请')}</p>
                </div>
            );
            $btn = (
                <Button disabled={this.state.loading} onClick={this.submit.bind(this)} className="exc-submit-item">
                    {UPEX.lang.template('重新提交')}
                </Button>
            );
        }
        return (
            <AceForm className="auth-step-3">
                {$content}
                <div>
                    <div className="submit">{$btn}</div>
                </div>
            </AceForm>
        );
    }
}
