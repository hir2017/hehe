import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { twdGetQuotaManagementInfo } from '../../api/http';
import NumberUtil from '../../lib/util/number';
import { Button, Icon, Upload, message, Tooltip, Alert } from 'antd';
import upload_pic from '../../../images/upload-pic.png';
import upload_pic_hover from '../../../images/upload-pic-hover.png';
import IDcard0 from '../../../images/idcard-1.png';
import IDcard1 from '../../../images/idcard-2.png';
import IDcard2 from '../../../images/idcard-3.png';

import AceForm from '../../components/form/form';

const IDcardPics = {
    IDcard0,
    IDcard1,
    IDcard2
};

@inject('userInfoStore')
@observer
export default class SecondStep extends Component {
    constructor(props) {
        super(props);
        this.sameTips = [
            UPEX.lang.template('证件正面照实例提示文字'),
            UPEX.lang.template('证件反面照实例提示文字'),
            UPEX.lang.template('手持证件照实例提示文字')
        ];
        let picsData = [
            {
                title: UPEX.lang.template('证件正面照'),
                showTip: UPEX.lang.template('查看证件正面照实例'),
                url: 'oneUrl'
            },
            {
                title: UPEX.lang.template('证件反面照'),
                showTip: UPEX.lang.template('查看证件反面照实例'),
                url: 'twoUrl'
            },
            {
                title: UPEX.lang.template('手持证件照'),
                showTip: UPEX.lang.template('查看手持证件照实例'),
                url: 'threeUrl',
                bottomTip: UPEX.lang.template('请手持當天日期紙條,請勿遮挡住證件號碼'),
            }
        ];
        let passPortData = [
            {
                title: UPEX.lang.template('护照页照片'),
                showTip: UPEX.lang.template('护照页照片示例'),
                url: 'oneUrl'
            },
            {
                title: UPEX.lang.template('手持证件照'),
                showTip: UPEX.lang.template('手持证件照示例'),
                url: 'threeUrl',
                bottomTip: UPEX.lang.template('请手持當天日期紙條,請勿遮挡住證件號碼'),
            }
        ];
        const {cacheData} = props;
        this.isPassPort = cacheData.realLocation != '1';
        this.picsData =  this.isPassPort ? passPortData : picsData;
        this.next = this.next.bind(this);
    }

    state = {
        oneUrl: '',
        twoUrl: '',
        threeUrl: '',
        withdrawLimit: 0,
        sampleShow: false,
        samplePic: '',
        sampleTitle: '',
        sampleIndex: 0,
        uploading: false,
        activeIndex: 'none',
    };

    componentDidMount() {
        //获取KYC1每日提币限额
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

    getPopvoer(i) {
        return <div className="tip-lines" dangerouslySetInnerHTML={{ __html: this.sameTips[i] }} />;
    }


    next() {
        // 非护照
        if(!this.isPassPort) {
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
            .identityAuthentication(Object.assign({
                positiveImages: this.state.oneUrl_fileKey,
                oppositeImages: this.state.twoUrl_fileKey,
                handImages: this.state.threeUrl_fileKey
            }, info))
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

    onHover(index, action) {
        this.setState({
            activeIndex: action === 'enter' ? index : 'none'
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
            action: UPEX.config.uploadImgHost + '?token=' + token + '&uid=' + uid + '&secret=' + 1,
            headers: {
                authorization: 'authorization-text'
            },
            // 限制图片大小10M
            beforeUpload: file => {
                const isLtM = file.size / 1024 / 1024 < 10;
                const fileType = ['image/jpeg', 'image/jpg', 'image/png'];
                const isPic = fileType.indexOf(file.type);
                console.log(isPic);

                if (isPic === -1) {
                    message.error(UPEX.lang.template('只支持jpg|jpeg|png格式的图片上传'));
                    return false;
                }

                if (!isLtM) {
                    message.error(UPEX.lang.template('文件大小请控制在10MB以内'));
                    return false;
                }
                return isPic && isLtM;
            },

            onChange: info => {
                // console.log(info);
                if (info.file.status !== 'uploading') {
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
                        let data = info.file.response.attachment;
                        const url = data ? data.url : '';
                        ctx.setState({
                            [urlKey]: url,
                            [urlKey + '_fileKey']: data.fileKey
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
        const { sameTips, picsData } = this;
        return (
            <AceForm className={`auth-step-2 ${this.isPassPort ? 'passport' : ''}`}>
                <Alert
                    className="ace-form-tips"
                    type="warning"
                    showIcon
                    message={
                        UPEX.lang.template('完成此步骤确认，可获得每日NT$300.000提现额度', { num: this.state.withdrawLimit }) +
                        '。' +
                        UPEX.lang.template('身份证上传图片大小限制')
                    }
                />
                {picsData.map((item, i) => {
                    let _url = this.state[item.url];
                    return (
                        <div key={i} className="pic-item exc-upload-mod clearfix">
                            <section className={`${this.state[item.url] ? 'select' : 'no-select'} pic-item-child pic-upload-content`}>
                                <p className="pic-title">
                                    <Icon className="block-space" type="check" />
                                    {item.title}
                                    <Icon className={_url ? '' : 'block-space'} type="check" />
                                </p>
                                <Upload className="pic-upload" {...this._props(item.url)}>
                                    <img className="pic-item-img target" src={_url ? _url : upload_pic} />
                                    <img className="pic-item-img hover" src={upload_pic_hover} />
                                </Upload>
                                {_url ? null : <span className="upload-icon-text">{UPEX.lang.template('点击上传')}</span>}
                            </section>
                            <section className="pic-item-child sample-img" >
                                <p className="pic-title">
                                    <Icon className="block-space" type="check" />
                                    {item.showTip}
                                    <Icon type="question" onMouseEnter={this.onHover.bind(this, i, 'enter')} onMouseLeave={this.onHover.bind(this, i, 'leave')}/>
                                </p>
                                <div className={`img-content ${this.state.activeIndex === i ? 'active' : ''}`}>
                                    <img src={IDcardPics[`IDcard${i}`]} alt="" />
                                    {this.getPopvoer(i)}
                                </div>
                            </section>
                            {item.bottomTip ? <div className="bottom-tip" dangerouslySetInnerHTML={{ __html: item.bottomTip }}/> : null}
                        </div>
                    );
                })}
                <div className="submit">
                    <Button className="exc-submit-item" onClick={this.next}>
                        {UPEX.lang.template('提交审核')}
                    </Button>
                </div>
            </AceForm>
        );
    }
}
