/**
 * @fileoverview  问题反馈
 * @author xia xiang feng
 * @date 2018-05-26
 */
import React, { Component } from 'react';
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react';
import { Input, Upload, Icon, Button } from 'antd';
const { TextArea } = Input;

@observer
export default class extends Component {

  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };

  uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  )
  
  handleChange = ({ fileList }) => this.setState({ fileList })
  
  render() {
    const { previewVisible, previewImage, fileList } = this.state;

    return (
      <div>
        <div className="question-title">
          {UPEX.lang.template('問題反饋')}
        </div>
        <div className="question-left">
          <TextArea placeholder={UPEX.lang.template('請輸入您要反饋的問題')} rows={7} />
          <div className="upload-box">
            <Upload
              action="//jsonplaceholder.typicode.com/posts/"
              listType="picture-card"
              fileList={fileList}
              onChange={this.handleChange}
            >
              { fileList.length >= 3 ? null : this.uploadButton }
            </Upload>
            <div className="upload-message">
              {UPEX.lang.template('可上傳3個附件')}，
              {UPEX.lang.template('每個文件大小不得超過5M。附件支持的格式有')}“jpg”，“Jpeg”,”bmp”,”png”,”gif”
            </div>
          </div>
          <div className="submit">
            <Button>{UPEX.lang.template('提交')}</Button>
          </div>
        </div>
        <div className="question-right">
          <div className="info">
            {UPEX.lang.template('請詳細描述您的問題，客服專員會在四個工作日內回復。請在提問之前瀏覽一下問題列表 ，也許您的問題在列表裡已解決')}
          </div>
          <div>
            <Link>{UPEX.lang.template('前往问题列表')}</Link>
          </div>
        </div>
      </div>
    )
  }
}