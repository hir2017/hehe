import React, { Component } from 'react';
import { Button, Icon, Upload, message, Alert } from 'antd';
import FormItem from '@/mods/common/form/item';
import AceForm from '@/components/form/form';
import bindAction from '../action/upload';

@bindAction
export default class SecondStep extends Component {
    constructor(props) {
        super(props);
        this.sameTips = [
            UPEX.lang.template('证件正面照实例提示文字'),
            UPEX.lang.template('证件反面照实例提示文字'),
            UPEX.lang.template('手持证件照实例提示文字')
        ];
        this.picsData = [
            {
                title: UPEX.lang.template('护照页照片'),
                showTip: UPEX.lang.template('护照页照片示例'),
                url: 'oneUrl'
            },
            {
                title: UPEX.lang.template('手持证件照'),
                showTip: UPEX.lang.template('手持证件照示例'),
                url: 'threeUrl',
                bottomTip: UPEX.lang.template('请手持當天日期紙條,請勿遮挡住證件號碼')
            }
        ];
        this.state = {
            oneUrl: '',
            threeUrl: '',
            withdrawLimit: 0,
            sampleIndex: 0
        };
        const token = UPEX.cache.getCache('token');
        const uid = UPEX.cache.getCache('uid');
        this.uploadProps = {
            accept: 'image/jpg,image/Jpeg,image/png',
            name: 'file',
            listType: 'picture-card',
            action: UPEX.config.uploadImgHost + '?token=' + token + '&uid=' + uid + '&secret=' + 1,
            headers: {
                authorization: 'authorization-text'
            },
        }
    }



    componentDidMount() {
        //获取KYC1每日提币限额
        this.getLimit();
    }

    render() {
        const { sameTips, picsData } = this;
        let msgText = `${UPEX.lang.template('完成此步骤确认，可获得每日NT$300.000提现额度', { num: this.state.withdrawLimit })}. ${UPEX.lang.template(
            '身份证上传图片大小限制'
        )}`;

        return (
            <div className="auth-upload-img">
                <Alert className="ace-form-tips" type="warning" showIcon message={msgText} />
                <section className="upload-box">
                    <Upload className="target" {...uploadProps}>

                    </Upload>
                    <div className="example">
                    </div>
                </section>
                <AceForm>
                    <FormItem>
                        {this.state.loading ? (
                            <Button className="submit-btn" disabled={true}>
                                {UPEX.lang.template('发送中')}
                            </Button>
                        ) : (
                            <Button className="submit-btn" disabled={!(this.state.checked && this.state.isSlide)} onClick={this.submit.bind(this)}>
                                {UPEX.lang.template('下一步')}
                            </Button>
                        )}
                    </FormItem>
                </AceForm>
            </div>
        );
    }
}
