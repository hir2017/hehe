import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Icon, Upload, message, Alert } from 'antd';
import FormItem from '@/mods/common/form/item';
import AceForm from '@/components/form/form';
import bindAction from '../action/upload';



class UploadImg extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visiable: false
        };
        const token = UPEX.cache.getCache('token');
        const uid = UPEX.cache.getCache('uid');
        this.uploadProps = {
            accept: 'image/jpg,image/Jpeg,image/png',
            name: 'file',
            action: UPEX.config.uploadImgHost + '?token=' + token + '&uid=' + uid + '&secret=' + 1,
            headers: {
                authorization: 'authorization-text'
            },
            onChange: props.onChange,
            beforeUpload: props.beforeUpload
        }
    }

    onHover = function (action) {
        this.setState({
            visiable: action === 'enter'
        });
    }

    render () {
        const {props} = this;
        return (
            <section className={`upload-box ${props.className}`}>
                <div className="wrapper target">
                    <header>
                    <Icon type="check" />
                    {props.title}
                    <Icon type="check" className={`${props.value ? 'show' : ''}`} />
                    </header>
                    <Upload  {...this.uploadProps}>
                        <div className="img-content">
                            {
                                props.value ? <img src={props.value} alt=""/> : <p className="text">{UPEX.lang.template('点击上传')}</p>
                            }
                        </div>
                    </Upload>
                </div>
                <div className="wrapper example">
                    <header>
                        <Icon type="check" />
                        {props.tipTitle}
                        <Icon type="question" className="show" onMouseEnter={this.onHover.bind(this, 'enter')} onMouseLeave={this.onHover.bind(this, 'leave')}/>
                    </header>
                    <div className="img-content">
                        <div className={`tip-content ${this.state.visiable ? 'show' : ''}`} dangerouslySetInnerHTML={{__html: props.tips}} />
                    </div>
                </div>
            </section>
        )
    }
}

@inject('userInfoStore')
@observer
@bindAction
export default class SecondStep extends Component {
    constructor(props) {
        super(props);
        this.sameTips = {
            url0: UPEX.lang.template('证件正面照实例提示文字'),
            url1: UPEX.lang.template('证件反面照实例提示文字'),
            url2: UPEX.lang.template('手持证件照实例提示文字')
        };
        this.picsData = [
            {
                title: UPEX.lang.template('护照页照片'),
                tipTitle: UPEX.lang.template('护照页照片示例'),
                url: 'url0'
            },
            {
                title: UPEX.lang.template('手持证件照'),
                tipTitle: UPEX.lang.template('手持证件照示例'),
                url: 'url2',
            }
        ];
        this.state = {
            url0: '',
            url0_fileKey: '',
            url2: '',
            url2_fileKey: '',
            withdrawLimit: 0,
            loading: false
        };
        this.handlePorps = {
            beforeUpload: this.beforeUpload.bind(this),
        }
    }


    componentDidMount() {
        //获取KYC1每日提币限额
        this.getLimit();
    }

    render() {
        const { state } = this;
        let msgText = `${UPEX.lang.template('完成此步骤确认，可获得每日NT$300.000提现额度', { num: this.state.withdrawLimit })}. ${UPEX.lang.template(
            '身份证上传图片大小限制'
        )}`;

        return (
            <div className="auth-upload-img passport">
                <Alert className="ace-form-tips" type="warning" showIcon message={msgText} />
                {
                    this.picsData.map((item, i) => {
                        return <UploadImg key={i} value={state[item.url]} onChange={this.onChange.bind(this, item.url)} {...this.handlePorps} className={`pic${i + 1}`} {...item} tips={this.sameTips[item.url]}/>
                    })
                }
                <p className="bottom-tip">{UPEX.lang.template('请手持當天日期紙條,請勿遮挡住證件號碼')}</p>
                <AceForm>
                    <FormItem>
                        {this.state.loading ? (
                            <Button className="submit-btn" disabled={true}>
                                {UPEX.lang.template('发送中')}
                            </Button>
                        ) : (
                            <Button className="submit-btn" onClick={this.submit.bind(this)}>
                                {UPEX.lang.template('提交')}
                            </Button>
                        )}
                    </FormItem>
                </AceForm>
            </div>
        );
    }
}
