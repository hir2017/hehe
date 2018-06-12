/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Steps from './steps'
import { Button, Icon, Upload, message } from 'antd'
import upload_pic from '../../../images/upload-pic.png'
import IDcard1 from '../../../images/IDcard1.png'
import IDcard0 from '../../../images/IDcard00.png'
import IDcard01 from '../../../images/IDcard01.png'

@inject('userInfoStore')
@observer
export default class SecondStep extends Component {

  constructor() {
    super()
    this.next = this.next.bind(this)
  }

  async next() {
    if (!this.state.oneUrl || !this.state.twoUrl || !this.state.threeUrl) {
      message.error(UPEX.lang.template('请上传照片'))
      return
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
      annualsalary: info.annualsalary,
      positiveImages: this.state.oneUrl,
      oppositeImages: this.state.twoUrl,
      handImages: this.state.threeUrl
    })

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
    uploading: false
  }

  _props = (urlKey) => {
    const token = UPEX.cache.getCache('token');
    const uid = UPEX.cache.getCache('uid');
    const ctx = this;
    return {
      accept: "image/jpg,image/Jpeg,image/png",
      name: 'file',
      listTyp: 'picture-card',
      action: UPEX.config.uploadImgHost + '?token=' + token + '&uid=' + uid,
      headers: {
        authorization: 'authorization-text',
      },
      // 限制图片大小10M
      beforeUpload: (file) =>{
        const isLt15M = file.size / 1024 / 1024 < 15;
       
        if (!isLt15M) {
          message.error('文件大小请控制在15MB以内!');
        }
        return isLt15M;
      },

      onChange : (info) =>{
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
            const url = info.file.response.attachment
            ctx.setState({
              [urlKey]: url
            })
            message.success(`${info.file.name} ${UPEX.lang.template('上传成功')}`);
          } else {
            message.error(`${info.file.name} ${UPEX.lang.template('上传失败')}`);
          }
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} ${UPEX.lang.template('上传失败')}`);
        }
      }
    }
  }

  render() {
    return (
      <div>
        <Steps step={2} />
        <div className="pic-title">{UPEX.lang.template('完成此步骤确认，可获得每日NT$300.000提现额度')}</div>
        <div className="pic-item">
          <span className="pic-item-lable">{UPEX.lang.template('证件正面照')}</span>
          <span>
            <Upload {...this._props('oneUrl')}>
              <img className="pic-item-img" src={ this.state.oneUrl ? UPEX.config.imgHost + '/' + this.state.oneUrl : upload_pic } />
            </Upload>
            {/*<span className="pic-item-message">{UPEX.lang.template('上传照片')}</span>*/}
            {
              !this.state.oneUrl
                ? <span className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
                : <span style={{ visibility: 'hidden' }} className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
            }

          </span>
          <span>
            <img className="pic-item-img" src={IDcard1} />
            <span className="pic-item-message">{UPEX.lang.template('正面实例')}</span>
          </span>
        </div>
        <div className="pic-item">
          <span className="pic-item-lable">{UPEX.lang.template('证件反面照')}</span>
          <span>
            <Upload {...this._props('twoUrl')}>
              <img className="pic-item-img" src={ this.state.twoUrl ? UPEX.config.imgHost + '/' + this.state.twoUrl : upload_pic } />
            </Upload>
            {/*<span className="pic-item-message">{UPEX.lang.template('上传照片')}</span>*/}
            {
              !this.state.twoUrl
                ? <span className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
                : <span style={{ visibility: 'hidden' }} className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
            }
          </span>
          <span>
            <img className="pic-item-img" src={IDcard0} />
            <span className="pic-item-message">{UPEX.lang.template('反面实例')}</span>
          </span>
        </div>
        <div className="pic-item">
          <span className="pic-item-lable">{UPEX.lang.template('手持证件照')}</span>
          <span>
            <Upload {...this._props('threeUrl')}>
              <img className="pic-item-img" src={ this.state.threeUrl ? UPEX.config.imgHost + '/' + this.state.threeUrl : upload_pic} />
            </Upload>
            {/*<span className="pic-item-message">{UPEX.lang.template('上传照片')}</span>*/}
            {
              !this.state.threeUrl
                ? <span className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
                : <span style={{ visibility: 'hidden' }} className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
            }
          </span>
          <span>
            <img className="pic-item-img" src={IDcard01} />
            <span className="pic-item-message">{UPEX.lang.template('手持证件实例')}</span>
          </span>
        </div>
        <div className="pic-items-message">
          <span>
            <Icon type="check" />{UPEX.lang.template(`面部清晰可见，无遮挡，无妆容`)}
            <Icon type="check" />{UPEX.lang.template(`完全漏出双手，手臂`)}
            <Icon type="check" />{UPEX.lang.template(`证件照片及内容清晰可见`)}
          </span>
          <span>
            {UPEX.lang.template('附带“为PrimeX注册会员使用”字条')}
          </span>
        </div>
        <div className="pic-format">
          {UPEX.lang.template('上传的文件格式必须是')}.jpg/.png/.jpeg
        </div>
        <div className="submit">
          <Button onClick={this.next}>{UPEX.lang.template('提交审核')}</Button>
        </div>
      </div>
    )
  }

}