import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {browserHistory} from 'react-router';
import { Steps, Button } from 'antd';
const Step = Steps.Step;
import InfoFormView from './info';
import WaitView from './waiting';
import SuccessView from './success';

import PageWrapper from '@/components/page-user/page-wrapper';
import AceForm from '@/components/form/form';

@inject('userInfoStore')
@observer
class PageView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
    }

    componentWillMount() {
        this.props.userInfoStore.getUserInfo().then(res => {
            this.setState({
                loading: false
            });
        });
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};

        let _header_step = {
            '-1': 1,
            '1': 1,
            '2': 4
        };
        let $rightContent = (
            <Steps size="small" current={_header_step[userInfo.isAuthPrimary] || userInfo.isAuthPrimary}>
                <Step title={UPEX.lang.template('基本信息')} />
                <Step title={UPEX.lang.template('身份认证')} />
                <Step title={UPEX.lang.template('完成认证')} />
            </Steps>
        );

        // TODO: 手机未认证
        if (!userInfo.isValidatePhone) {
            return (
                <PageWrapper innerClass="authentication" title={UPEX.lang.template('身份认证')} rightContent={$rightContent}>
                    {this.state.loading ? null : (
                        <div className="authentication-content">
                            <AceForm className="auth-step-3">
                                <div className="submit">
                                    <Button  onClick={e => {
                                        browserHistory.push('/user/setting-phone');
                                    }} className="exc-submit-item">
                                        {UPEX.lang.template('请先绑定手机')}
                                    </Button>
                                </div>
                            </AceForm>
                        </div>
                    )}
                </PageWrapper>
            );
        } else {
            let $content = null;
            // 未认证
            if(userInfo.isAuthPrimary === 0) {
                $content = <InfoFormView />
            }
            // 审核中
            if(userInfo.isAuthPrimary === 1) {
                $content = <WaitView />
            }
            // 成功
            if(userInfo.isAuthPrimary === 2) {
                $content = <SuccessView />
            }
            // 驳回
            if (userInfo.isAuthPrimary === -1) {
                $content = userInfo.readFailReason === 1 ? <WaitView /> : <InfoFormView />;
            }
            // $content = <InfoFormView />

            return (
                <PageWrapper innerClass="authentication" title={UPEX.lang.template('身份认证')} rightContent={$rightContent}>
                    {this.state.loading ? null : (
                        <div className="authentication-content">
                            {$content}
                        </div>
                    )}
                </PageWrapper>
            );
        }
    }
}

export default PageView;
