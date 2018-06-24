/**
 * @fileoverview  问题反馈
 * @author xia xiang feng
 * @date 2018-05-26
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Input, Upload, Icon, Button, message } from 'antd';
const { TextArea } = Input;

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
        text: ''
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
        this.setState({
            text: e.target.value
        });
    }

    submit() {
        if (!this.state.text) {
            message.error('請輸入您要反饋的問題');
            return;
        }
        const imgS = this.uploudUrlS.join(',');
        this.props.userInfoStore.ask(this.state.text, imgS);
    }

    render() {
        const { previewVisible, previewImage, fileList } = this.state;
        const loading = this.props.userInfoStore.submit_loading;
        const token = UPEX.cache.getCache('token');
        const uid = UPEX.cache.getCache('uid');
        return (
            <PageWrapper title={UPEX.lang.template('問題反饋')} bodyClass="feedback">
                <div className="question-left">
                    <TextArea onChange={this.textAreaChange} placeholder={UPEX.lang.template('請輸入您要反饋的問題')} rows={7} />
                    <div className="upload-box">
                        <Upload
                            action={UPEX.config.uploadImgHost + '?token=' + token + '&uid=' + uid}
                            listType="picture-card"
                            fileList={fileList}
                            onChange={this.handleChange}
                            accept="image/jpg,image/Jpeg,image/bmp,image/png,image/gif"
                        >
                            {fileList.length >= 3 ? null : this.uploadButton}
                        </Upload>
                        <div className="upload-message">
                            {UPEX.lang.template('可上傳3個附件')}，
                            {UPEX.lang.template('每個文件大小不得超過5M。附件支持的格式有')}“jpg”，“Jpeg”,”bmp”,”png”,”gif”
                        </div>
                    </div>
                    <div className="submit">
                        <Button loading={loading} onClick={this.submit}>
                            {UPEX.lang.template('提交')}
                        </Button>
                    </div>
                </div>
                <div className="question-right">
                    <div className="info">{UPEX.lang.template('請詳細描述您的問題，客服專員會在四個工作日內回復。請在提問之前瀏覽一下問題列表 ，也許您的問題在列表裡已解決')}</div>
                    <div>
                        <Link to="/user/questionList">{UPEX.lang.template('前往问题列表')}</Link>
                    </div>
                </div>
            </PageWrapper>
        );
    }
}
