import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Input, Upload, Icon, Button, message, Row, Col } from 'antd';
const { TextArea } = Input;
// import bitLength from '../../lib/util/bit-length';

import PageWrapper from '../../common-mods/page-user/page-wrapper';

@inject('userInfoStore')
@observer
export default class extends Component {
    constructor() {
        super();
        this.submit = this.submit.bind(this);
        this.textAreaChange = this.textAreaChange.bind(this);
    }

    uploudUrlS = [];

    state = {
        previewVisible: false,
        previewImage: '',
        fileList: [],
        text: '',
        textLen: 450
    };

    uploadButton = (
        <div>
            <Icon type="plus" />
            <div className="ant-upload-text">Upload</div>
        </div>
    );

    handleChange = info => {
        this.setState({
            fileList: info.fileList
        });
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
            if (info.file.response.status === 200) {
                const url = info.file.response.attachment;
                this.uploudUrlS.push(url);
                message.success(`${info.file.name} ${UPEX.lang.template('上传成功')}`);
            } else {
                message.error(`${info.file.name} ${UPEX.lang.template('上传失败')}`);
            }
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} ${UPEX.lang.template('上传失败')}`);
        }
    };

    textAreaChange(e) {
        let str = e.target.value;
        let len = str.length;
        if(len > 450) {
            return;
        }
        this.setState({
            text: str,
            textLen: 450 - len
        });
    }

    submit() {
        if (!this.state.text) {
            message.error('請輸入您要反饋的問題');
            return;
        }
        // const imgS = this.uploudUrlS.join(',');
        const { fileList } = this.state;
        const imgS = fileList
            .filter(item => {
                if (item.response && item.response.status === 200) {
                    return true;
                }
            })
            .map(item => {
                if (item.response) {
                    return item.response.attachment;
                }
            })
            .join(',');
        this.props.userInfoStore.ask(this.state.text, imgS).then(data => {
            if (data) {
                this.setState({
                    text: '',
                    fileList: [],
                    textLen: 200
                });
            }
        });
    }

    render() {
        const { fileList } = this.state;
        const loading = this.props.userInfoStore.submit_loading;
        const token = UPEX.cache.getCache('token');
        const uid = UPEX.cache.getCache('uid');
        return (
            <PageWrapper title={UPEX.lang.template('問題反饋')} bodyClass="feedback">
                <Row className="title">
                    <Col span={20}>
                        {UPEX.lang.template('請詳細描述您的問題，客服專員會在四個工作日內回復。請在提問之前瀏覽一下問題列表 ，也許您的問題在列表裡已解決')}
                    </Col>
                    <Col className="align-right" span={4}>
                        <Link to="/user/questionList">{UPEX.lang.template('前往反馈列表')}</Link>
                    </Col>
                </Row>
                <Row className="text-area">
                    <Col span={24}>
                        <TextArea value={this.state.text} onChange={this.textAreaChange} rows={7} />
                        <p className={`placeholder ${this.state.text ? '' : 'show'}`}>{UPEX.lang.template('請輸入您要反饋的問題')}</p>
                        <div className="text-stats">{UPEX.lang.template('还可以输入')}<span className="count">{this.state.textLen}</span>{UPEX.lang.template('个字')}</div>
                    </Col>
                </Row>

                <div className="upload-box">
                    <Upload
                        action={UPEX.config.uploadImgHost + '?token=' + token + '&uid=' + uid}
                        listType="picture-card"
                        fileList={fileList}
                        onChange={this.handleChange}
                        accept="image/jpg,image/Jpeg,image/bmp,image/png,image/gif"
                    >
                        {fileList.length >= 1 ? null : this.uploadButton}
                    </Upload>
                </div>
                <Row className="submit">
                    <Col span={16}>
                        {UPEX.lang.template('可上傳1個附件')}，
                        {UPEX.lang.template('每个文件大小不得超过5M。附件支持的格式有')}“jpg”，“Jpeg”,”bmp”,”png”,”gif”
                    </Col>
                    <Col className="align-right" span={8}>
                        <Button loading={loading} className="ace-secondary" onClick={this.submit}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </Col>
                </Row>
            </PageWrapper>
        );
    }
}
