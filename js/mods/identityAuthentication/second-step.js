/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Steps from './steps'
import { Button, Icon } from 'antd'
import upload_pic from '../../../images/upload-pic.png'
import IDcard1 from '../../../images/IDcard1.png'
import IDcard0 from '../../../images/IDcard0.png'
import IDcard01 from '../../../images/IDcard01.png'

@observer
export default class SecondStep extends Component {

  constructor () {
    super()
    this.next = this.next.bind(this)
  }

  next () {
    this.props.changeStep(3)
  }

  render() {
    return (
      <div>
        <Steps step={2}/>
        <div className="pic-title">{UPEX.lang.template('完成此步骤确认，可获得每日NT$300.000提现额度')}</div>
        <div className="pic-item">
          <span className="pic-item-lable">{UPEX.lang.template('证件正面照')}</span>
          <span>
            <img className="pic-item-img" src={upload_pic} />
            {/*<span className="pic-item-message">{UPEX.lang.template('上传照片')}</span>*/}
            <span className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
          </span>
          <span>
            <img className="pic-item-img" src={IDcard1} />
            <span className="pic-item-message">{UPEX.lang.template('正面实例')}</span>
          </span>
        </div>
        <div className="pic-item">
          <span className="pic-item-lable">{UPEX.lang.template('证件反面照')}</span>
          <span>
            <img className="pic-item-img" src={upload_pic} />
            {/*<span className="pic-item-message">{UPEX.lang.template('上传照片')}</span>*/}
            <span className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
          </span>
          <span>
            <img className="pic-item-img" src={IDcard0} />
            <span className="pic-item-message">{UPEX.lang.template('反面实例')}</span>
          </span>
        </div>
        <div className="pic-item">
          <span className="pic-item-lable">{UPEX.lang.template('手持证件照')}</span>
          <span>
            <img className="pic-item-img" src={upload_pic} />
            {/*<span className="pic-item-message">{UPEX.lang.template('上传照片')}</span>*/}
            <span className="pic-item-error-message error-message">*{UPEX.lang.template('请上传照片')}</span>
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
          {UPEX.lang.template('上传的文件格式必须是')}.jpg&nbsp;&nbsp;&nbsp;&nbsp;.png&nbsp;&nbsp;&nbsp;&nbsp;.jpeg
        </div>
        <div className="submit">
          <Button onClick={this.next}>{UPEX.lang.template('提交审核')}</Button>
        </div>
      </div>
    )
  }
  
}