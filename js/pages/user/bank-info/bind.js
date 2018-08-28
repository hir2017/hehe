import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Button, Icon, message, Upload, Modal } from 'antd';
const Option = Select.Option;

import { createGetProp } from '@/components/utils';
import upload_pic from '@/../images/card-bg.png';
import upload_pic_hover from '@/../images/upload-pic-hover.png';
import BankList from './banklist.json';
import banckCardImg from '@/../images/bank-card.jpg';
import AceSection from '@/components/page-user/section';
import AceForm from '@/components/form/form';
import InputItem from '@/components/form/input-item';
import AutoCompleteHack from '@/mods/common/auto-complete-hack';

@inject('userInfoStore', 'authStore')
@observer
export default class BindingBank extends Component {
    constructor() {
        super();
        this.bankChange = this.bankChange.bind(this);
        this.branchesChange = this.branchesChange.bind(this);
        this.submit = this.submit.bind(this);
    }

    state = {
        branches: [],
        banckCode: '',
        banck: '',
        branchesCode: '',
        branche: '',
        cardNo: '',
        password: '',
        imgUrl: '',
        visible: false
    };

    _props = () => {
        const token = UPEX.cache.getCache('token');
        const uid = UPEX.cache.getCache('uid');
        const ctx = this;

        return {
            accept: 'image/jpg,image/Jpeg,image/png',
            name: 'file',
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
            onChange(info) {
                if (info.file.status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (info.file.status === 'done') {
                    if (info.file.response.status === 200) {
                        const url = info.file.response.attachment ? info.file.response.attachment.url : '';
                        ctx.setState({
                            imgUrl: url
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

    setVal(e, name) {
        const data = {};
        data[name] = e.target.value;
        this.setState(data);
    }

    bankChange(val, e) {
        const res = BankList.filter(item => {
            return item.code === val;
        });

        this.setState({
            branches: res[0].branches,
            banckCode: val,
            banck: res[0].name,
            branchesCode: '',
            branche: ''
        });
    }

    branchesChange(val) {
        const res = BankList.filter(item => {
            return item.code === this.state.banckCode;
        });
        const branche = res[0].branches.filter(item => {
            return item.code === val;
        });
        this.setState({
            branchesCode: val,
            branche: branche[0].name
        });
    }

    submit() {
        if (!this.state.banckCode) {
            message.error('请选择银行');
            return;
        }
        if (!this.state.branchesCode) {
            message.error('请选择银行分行');
            return;
        }
        if (!this.state.cardNo) {
            message.error('请填写银行卡号');
            return;
        }
        if (!this.state.password) {
            message.error('请输入资金密码');
            return;
        }
        if (!this.state.imgUrl) {
            message.error('请上传图片');
            return;
        }

        const userInfo = this.props.userInfoStore.userInfo || {};
        const pwd = md5(this.state.password + UPEX.config.dealSalt + this.props.authStore.uid);
        const userName = userInfo.uname;

        this.props.userInfoStore
            .bindVerifyCard(this.state.cardNo, userName, this.state.banck, this.state.branchesCode, this.state.branche, pwd, this.state.imgUrl)
            .then(data => {
                if (data) {
                    this.setState({
                        cardNo: '',
                        password: '',
                        imgUrl: ''
                    });
                    this.props.userInfoStore.bankCardInfo();
                }
            });
    }

    render() {
        const loading = this.props.userInfoStore.submit_loading;
        const userInfo = this.props.userInfoStore.userInfo || {};

        const getProp = createGetProp(this);

        const inputsData = {
            uname: {
                label: UPEX.lang.template('开户人'),
                inputProps: {
                    value: userInfo.uname,
                    disabled: true
                }
            },
            bank: {
                label: UPEX.lang.template('开户银行')
            },
            subBank: {
                label: UPEX.lang.template('分行信息')
            },
            cardNo: {
                label: UPEX.lang.template('银行账号'),
                inputProps: Object.assign(getProp('cardNo', 'none'), {
                    value: this.state.cardNo
                })
            },
            password: {
                label: UPEX.lang.template('资金密码'),
                inputProps: Object.assign(getProp('password'), {
                    value: this.state.password
                })
            }
        };

        return (
            <AceSection title={UPEX.lang.template('银行卡信息')} className="info">
                <AceForm>
                    <AutoCompleteHack />
                    <InputItem {...inputsData.uname} />
                    <InputItem {...inputsData.bank}>
                        <Select
                            showSearch
                            size="large"
                            placeholder={UPEX.lang.template('选择银行')}
                            onChange={this.bankChange}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {BankList.map(item => {
                                return (
                                    <Option key={item.id} value={item.code}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </InputItem>
                    <InputItem {...inputsData.subBank}>
                        <Select
                            showSearch
                            size="large"
                            value={this.state.branchesCode}
                            placeholder={UPEX.lang.template('选择银行分行')}
                            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                            onChange={this.branchesChange}
                        >
                            {this.state.branches.map((item, index) => {
                                return (
                                    <Option key={index} value={item.code}>
                                        {item.name}
                                    </Option>
                                );
                            })}
                        </Select>
                    </InputItem>
                    <InputItem {...inputsData.cardNo} />
                    <InputItem {...inputsData.password} />
                    <Modal
                        title={UPEX.lang.template('示例图片')}
                        onCancel={e => {
                            this.setState({
                                visible: false
                            });
                        }}
                        visible={this.state.visible}
                        footer={null}
                        style={
                            {textAlign: 'center'}
                        }
                    >
                        <img src={banckCardImg} style={{width: '300px', height: '180px'}}/>
                    </Modal>
                    <div className="pic-item exc-upload-mod">
                        <header>
                            <span className="item-title">{UPEX.lang.template('上传银行账户簿图片')}</span>
                            <span className="item-tip" onClick={e => {
                                    this.setState({
                                        visible: true
                                    });
                                }}>{UPEX.lang.template('图片示例')}</span>
                        </header>
                        <section className={`${this.state.imgUrl ? 'select' : 'no-select'} pic-upload-content`}>
                            <Upload className="pic-upload" {...this._props()}>
                                {/* <img className="pic-item-img target" src={this.state.imgUrl ? UPEX.config.imgHost + '/' + this.state.imgUrl : upload_pic} /> */}
                                <img className="pic-item-img target" src={this.state.imgUrl ? this.state.imgUrl : upload_pic} />
                                <img  className="pic-item-img hover" src={upload_pic_hover} />
                            </Upload>
                        </section>
                    </div>
                    <div className="tip">
                        <p>{UPEX.lang.template('上传银行账户簿图片大小限制文案')}</p>
                    </div>
                    <Button className="exc-submit-item" loading={loading} onClick={this.submit}>
                        {UPEX.lang.template('提交')}
                    </Button>
                    <div className="tip bottom" dangerouslySetInnerHTML={{__html: UPEX.lang.template('注意内容')}}></div>
                </AceForm>
            </AceSection>
        );
    }
}
