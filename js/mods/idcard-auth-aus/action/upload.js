import { twdGetQuotaManagementInfo } from '@/api/http';
import React from 'react';
import { message } from 'antd';

const action = {};



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
    if (!this.state.url0 || !this.state.url2) {
        message.error(UPEX.lang.template('请上传照片'));
        return;
    }
    let params = {
        positiveImages: this.state.url0_fileKey,
        oppositeImages: this.state.url1_fileKey,
        handImages: this.state.url2_fileKey
    };
    this.setState({
        loading: true
    });

    this.props.submit(Object.assign(params, this.props.data)).then(res => {
        this.setState({
            loading: false
        });
        this.props.userInfoStore.getUserInfo();
    })
}

action.onChange = function(urlKey, {file}) {
    if(file.status == 'done') {
        const {attachment, status} = file.response;
        if (status === 200) {
            this.setState({
                [urlKey]: attachment.url,
                [urlKey + '_fileKey']: attachment.fileKey
            });
            message.success(`${file.name} ${UPEX.lang.template('上传成功')}`);
        } else {
            message.error(`${file.name} ${UPEX.lang.template('上传失败')}`);
        }
    }
    if(file.status == 'error') {
        message.error(`${file.name} ${UPEX.lang.template('上传失败')}`);
    }
}
// 限制图片大小10M
action.beforeUpload = function(file) {
    const isLtM = file.size / 1024 / 1024 < 10;
    const fileType = ['image/jpeg', 'image/jpg', 'image/png'];
    const isPic = fileType.indexOf(file.type);
    // console.log(isPic);

    if (isPic === -1) {
        message.error(UPEX.lang.template('只支持jpg|jpeg|png格式的图片上传'));
        return false;
    }

    if (!isLtM) {
        message.error(UPEX.lang.template('文件大小请控制在10MB以内'));
        return false;
    }
    return isPic && isLtM;
}

export default function(target, name, descriptor) {
    Object.assign(target.prototype, action);
}
