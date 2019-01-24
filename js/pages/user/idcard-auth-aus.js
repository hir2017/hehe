import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { browserHistory } from 'react-router';
import { Steps, Button } from 'antd';
const Step = Steps.Step;
import InfoFormView from '@/mods/idcard-auth-aus/info';
import WaitView from '@/mods/idcard-auth-aus/waiting';
import SuccessView from '@/mods/idcard-auth-aus/success';

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
            '-1': 1, // 驳回
            '1': 1, // 审核中
            '3': 1, // 复审中
            '2': 4 // 通过
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
                                    <Button
                                        onClick={e => {
                                            browserHistory.push('/user/setting-phone');
                                        }}
                                        className="exc-submit-item"
                                    >
                                        {UPEX.lang.template('请先绑定手机')}
                                    </Button>
                                </div>
                            </AceForm>
                        </div>
                    )}
                </PageWrapper>
            );
        }

        let $content = null;
        switch (userInfo.isAuthPrimary) {
            // 驳回
            case -1:
            $content = userInfo.readFailReason === 1 ? <WaitView /> : <InfoFormView />;
                break;
            // 未认证
            case 0:
            $content = <InfoFormView />;
                break;
            // 审核中
            case 1:
            $content = <WaitView />;
                break;
            // 复审中
            case 3:
            $content = <WaitView />;
                break;
            // 成功
            case 2:
            $content = <SuccessView />;
                break;
            default:
                break;
        }
        return (
            <PageWrapper innerClass="authentication" title={UPEX.lang.template('身份认证')} rightContent={$rightContent}>
                {this.state.loading ? null : <div className="authentication-content">{$content}</div>}
            </PageWrapper>
        );
    }
}

export default PageView;
