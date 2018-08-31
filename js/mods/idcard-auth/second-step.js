import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { getUserActionLimit } from '../../api/http';
import NumberUtil from '../../lib/util/number';
import { Button, Icon, Upload, message, Tooltip } from 'antd';
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
    constructor() {
        super();
        this.sameTips = [
            UPEX.lang.template('证件正面照实例提示文字'),
            UPEX.lang.template('证件反面照实例提示文字'),
            UPEX.lang.template('手持证件照实例提示文字')
        ];
        this.picsData = [
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
                url: 'threeUrl'
            }
        ];
        this.next = this.next.bind(this);
    }

    componentDidMount() {
        getUserActionLimit()
            .then(res => {
                this.setState({
                    withdrawLimit: NumberUtil.separate(res.attachment.dayLimit)
                });
            })
            .catch(err => {
                console.error(err);
            });
    }

    getPopvoer(i) {
        return (
            <div className="tip-lines" dangerouslySetInnerHTML={{__html: this.sameTips[i]}}>
            </div>
        )
    }

    next() {
        if (!this.state.oneUrl || !this.state.twoUrl || !this.state.threeUrl) {
            message.error(UPEX.lang.template('请上传照片'));
            return;
        }

        const info = this.props.userInfoStore.identityInfo;
        this.props.userInfoStore.identityAuthentication({
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
        }).then(res => {
            if (res.status === 200) {

                this.props.changeStep(3);
            } else {
                this.props.changeStep(1);
            }
            this.props.userInfoStore.getUserInfo();
        }).catch(e => {
            console.error('idcard-auth-step-2 next', e)
        });

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
        uploading: false
    };

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
                    // console.log(info.file, info.fileList);
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
                        const url = info.file.response.attachment ? info.file.response.attachment.url : '';
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
        const { sameTips, picsData } = this;

        return (
            <AceForm className="auth-step-2">
                <div className="exc-top-tips">
                    <Icon type="info" />
                    {UPEX.lang.template('完成此步骤确认，可获得每日NT$300.000提现额度', { num: this.state.withdrawLimit })}。
                    {UPEX.lang.template('身份证上传图片大小限制')}
                </div>
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
                                    {/* <img className="pic-item-img target" src={_url ? UPEX.config.imgHost + '/' + _url : upload_pic} /> */}
                                    <img className="pic-item-img target" src={_url ? _url : upload_pic} />
                                    <img className="pic-item-img hover" src={upload_pic_hover} />
                                </Upload>
                                {_url ? null : (<span className="upload-icon-text">{UPEX.lang.template('点击上传')}</span>)}
                            </section>
                            <section className="pic-item-child sample-img">
                                <p className="pic-title">
                                    <Icon className="block-space" type="check" />
                                    {item.showTip}
                                    <Tooltip  overlayClassName="auth-step-2" placement="rightTop" arrowPointAtCenter={true} title={this.getPopvoer(i)}>
                                        <Icon type="question" />
                                    </Tooltip>

                                </p>
                                <img src={IDcardPics[`IDcard${i}`]} alt="" />
                            </section>
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
