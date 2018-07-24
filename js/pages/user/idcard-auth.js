import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';
import { Steps } from 'antd';
const Step = Steps.Step;
import FirstStep from '../../mods/idcard-auth/first-step';
import SecondStep from '../../mods/idcard-auth/second-step';
import ThirdStep from '../../mods/idcard-auth/third-step';
import FourthStep from '../../mods/idcard-auth/fourth-step';

import PageWrapper from '../../components/page-user/page-wrapper';

@inject('userInfoStore')
@observer
class IdentityAuthentication extends Component {
    constructor() {
        super();
        this.changeStep = this.changeStep.bind(this);
    }

    state = {
        step: null
    };

    componentWillMount() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        this.props.userInfoStore.getUserInfo();
    }

    changeStep(num) {
        this.setState({
            step: num
        });
    }

    nowStep(step) {
        if (step === 1) {
            return <FirstStep changeStep={this.changeStep} />;
        }
        if (step === 2) {
            return <SecondStep changeStep={this.changeStep} />;
        }
        if (step === 3) {
            return <ThirdStep changeStep={this.changeStep} />;
        }
        if (step === 4) {
            return <FourthStep />;
        }
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        let step = 0;

        switch (userInfo.isAuthPrimary) {
            case 0:
                step = 1;
                break;
            case 1:
            case -1:
                step = 3;
                break;
            case 2:
                step = 4;
                break;
        }
        let _header_step = {
            '-1': 1,
            '1': 1,
            '2': 4,
        }
        let $rightContent = (
            <Steps size="small" current={_header_step[userInfo.isAuthPrimary] || userInfo.isAuthPrimary}>
                <Step title={UPEX.lang.template('基本信息')} />
                <Step title={UPEX.lang.template('身份认证')} />
                <Step title={UPEX.lang.template('完成认证')} />
            </Steps>
        );
        let _step = this.state.step || step;
        let bodyClass = 'height-full-1';
        if(userInfo.isValidatePhone && [1, 2].indexOf(_step) !== -1) {
            bodyClass = '';
        }
        return (
            <PageWrapper innerClass="authentication" bodyClass={bodyClass} title={UPEX.lang.template('身份认证')} rightContent={$rightContent}>
                <div className="authentication-content">
                    {userInfo.isValidatePhone ? (
                        this.nowStep(_step)
                    ) : (
                        <div className="no-auth-message  authentication-message">
                            <p>{UPEX.lang.template('请绑定手机')}</p>
                            <Link className="ace-btn" to="/user/setting-phone">{UPEX.lang.template('手机绑定')}</Link>
                        </div>
                    )}
                </div>
            </PageWrapper>
        );
    }
}

export default IdentityAuthentication;
