import { twdGetQuotaManagementInfo } from '@/api/http';
import React from 'react';
const action = {};


action.getPopvoer = function (i) {
    return <div className="tip-lines" dangerouslySetInnerHTML={{ __html: this.sameTips[i] }} />;
}

action.getLimit = function () {
    twdGetQuotaManagementInfo({
        actionId: 4,
        currencyId: 2
    })
        .then(res => {
            this.setState({
                withdrawLimit: NumberUtil.separate(res.attachment[0].kyc1DayLimit)
            });
        })
        .catch(err => {
            console.error(err);
        });
}

action.submit = function () {
    // 非护照
    if (!this.isPassPort) {
        if (!this.state.twoUrl) {
            message.error(UPEX.lang.template('请上传照片'));
            return;
        }
    }
    if (!this.state.oneUrl || !this.state.threeUrl) {
        message.error(UPEX.lang.template('请上传照片'));
        return;
    }
    const info = this.props.cacheData;
    // 基础信息
    this.props.userInfoStore
        .identityAuthentication(
            Object.assign(
                {
                    positiveImages: this.state.oneUrl_fileKey,
                    oppositeImages: this.state.twoUrl_fileKey,
                    handImages: this.state.threeUrl_fileKey
                },
                info
            )
        )
        .then(res => {
            if (res.status === 200) {
                this.props.changeStep(3);
            } else {
                this.props.changeStep(1);
            }
            this.props.userInfoStore.getUserInfo();
        })
        .catch(e => {
            console.error('idcard-auth-step-2 next', e);
        });
}

action.onHover = function (index, action) {
    this.setState({
        activeIndex: action === 'enter' ? index : 'none'
    });
}

action.upload = function(urlKey) {
};


export default function(target, name, descriptor) {
    Object.assign(target.prototype, action);
}
