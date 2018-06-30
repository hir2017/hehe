/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Icon, Upload, message } from 'antd';
import upload_pic from '../../../images/upload-pic.png';
import upload_pic_hover from '../../../images/upload-pic-hover.png';
import IDcard0 from '../../../images/IDcard1.png';
import IDcard1 from '../../../images/IDcard00.png';
import IDcard2 from '../../../images/IDcard01.png';

import AceForm from '../../common-mods/form/form';

const IDcardPics = {
    IDcard0,
    IDcard1,
    IDcard2
};

@inject('userInfoStore')
@observer
export default class SecondStep extends Component {
    constructor() {
        super();
        this.next = this.next.bind(this);
    }

    changeSamplePic(num) {}

    async next() {
        if (!this.state.oneUrl || !this.state.twoUrl || !this.state.threeUrl) {
            message.error(UPEX.lang.template('请上传照片'));
            return;
        }

        const info = this.props.userInfoStore.identityInfo;
        const res = await this.props.userInfoStore.identityAuthentication({
            firstName: info.firstName,
            secondName: info.secondName,
            birthday: info.birthday,
            idType: info.idType,
            idNumber: info.idNumber,
            resortType: info.resortType,
            resortTypeOther: info.resortTypeOther,
            address: info.address,
            postCode: info.postCode,
            profession: info.profession,
            annualSalary: info.annualsalary,
            positiveImages: this.state.oneUrl,
            oppositeImages: this.state.twoUrl,
            handImages: this.state.threeUrl
        });

        if (res.status === 200) {
            this.props.changeStep(3);
        } else {
            this.props.changeStep(1);
        }
    }

    state = {
        oneUrl: '',
        twoUrl: '',
        threeUrl: '',
        sampleShow: false,
        samplePic: '',
        sampleTitle: '',
        uploading: false
    };

    toggleSample(item, index) {

        this.setState({
            samplePic: item ? IDcardPics['IDcard' + index]  : '',
            sampleTitle: item ? item.showTip : '',
            sampleShow: item ? true: false,
        })
    }

    _props = urlKey => {
        const token = UPEX.cache.getCache('token');
        const uid = UPEX.cache.getCache('uid');
        const ctx = this;
        return {
            accept: 'image/jpg,image/Jpeg,image/png',
            name: 'file',
            listTyp: 'picture-card',
            action: UPEX.config.uploadImgHost + '?token=' + token + '&uid=' + uid,
            headers: {
                authorization: 'authorization-text'
            },
            // 限制图片大小10M
            beforeUpload: file => {
                const isLtM = file.size / 1024 / 1024 < 10;

                if (!isLtM) {
                    message.error('文件大小请控制在10MB以内!');
                }
                return isLtM;
            },

            onChange: info => {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status == 'uploading') {
                    this.setState({
                        loading: true
                    });
                }
                if (info.file.status === 'done') {
                    this.setState({
                        loading: false
                    });
                    if (info.file.response.status === 200) {
                        const url = info.file.response.attachment;
                        ctx.setState({
                            [urlKey]: url
                        });
                        message.success(`${info.file.name} ${UPEX.lang.template('上传成功')}`);
                    } else {
                        message.error(`${info.file.name} ${UPEX.lang.template('上传失败')}`);
                    }
                } else if (info.file.status === 'error') {
                    message.error(`${info.file.name} ${UPEX.lang.template('上传失败')}`);
                }
            }
        };
    };

    render() {
        const picsData = [
            {
                title: UPEX.lang.template('证件正面照'),
                showTip: UPEX.lang.template('查看证件正面示例'),
                url: 'oneUrl'
            },
            {
                title: UPEX.lang.template('证件反面照'),
                showTip: UPEX.lang.template('查看证件反面照示例'),
                url: 'twoUrl'
            },
            {
                title: UPEX.lang.template('手持证件照'),
                showTip: UPEX.lang.template('查看手持证件照实例'),
                url: 'threeUrl'
            }
        ];
        return (
            <AceForm className="auth-step-2">
                <div className={`sample-pic-content ${this.state.sampleShow ? 'show' : ''}`}  onClick={() => {this.toggleSample(false)}}>
                    <div className="sample-inner">
                        <header>{this.state.sampleTitle}</header>
                        <article className="clearfix">
                            <img className="pic-img" src={this.state.samplePic} />
                            <ul className="pic-message">
                                <li>{UPEX.lang.template('面部清晰可见，无遮挡，无妆容')}</li>
                                <li>{UPEX.lang.template('完全漏出双手，手臂')}</li>
                                <li>{UPEX.lang.template('证件照片及内容清晰可见')}</li>
                                <li>{UPEX.lang.template('附带“为PrimeX注册会员使用”字条')}</li>
                            </ul>
                        </article>
                    </div>
                </div>
                <div className="ace-top-tips">{UPEX.lang.template('完成此步骤确认，可获得每日NT$300.000提现额度')}</div>
                {picsData.map((item, i) => {
                    return (
                        <div key={i} className="pic-item ace-upload-mod">
                            <header>
                                <span className="item-title">{item.title}</span>
                                <span className="item-tip" onClick={() => {this.toggleSample(item, i)}}>{item.showTip}</span>
                            </header>
                            <section className={`${this.state[item.url] ? 'select' : 'no-select'} pic-upload-content`}>
                                <Upload className="pic-upload" {...this._props(item.url)}>
                                    <img  className="pic-item-img target" src={this.state[item.url] ? UPEX.config.imgHost + '/' + this.state[item.url] : upload_pic} />
                                    <img  className="pic-item-img hover" src={upload_pic_hover} />
                                </Upload>
                                {this.state[item.url] ? (<Icon type="check-circle" />) : null}
                            </section>
                        </div>
                    );
                })}

                <div className="pic-format">{UPEX.lang.template('上传的文件格式必须是.jpg/.png/.jpeg,文件大小控制在 10M 以内')}</div>
                <div className="submit">
                    <Button  className="ace-submit-item" onClick={this.next}>{UPEX.lang.template('提交审核')}</Button>
                </div>
            </AceForm>
        );
    }
}
