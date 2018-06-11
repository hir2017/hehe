/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router'
import bindPhone from '../../../images/bind-phone.png'
import unbindPhone from '../../../images/unbind-phone.png'
import bindEmail from '../../../images/bind-email.png'
import unbindEmail from '../../../images/unbind-email.png'
import gradeA from '../../../images/grade-a.png'
import gradeB from '../../../images/grade-b.png'
import gradeC from '../../../images/grade-c.png'
import { Switch } from 'antd';

@inject('userInfoStore')
@observer
class Info extends Component {

  constructor() {
    super()
    this.gradeImg = this.gradeImg.bind(this)
  }

  componentWillMount() {
    this.props.userInfoStore.getUserInfo()
  }

  gradeImg() {
    const userInfo = this.props.userInfoStore.userInfo || {}

    if (userInfo.authLevel == 1) {
      return { img: gradeA, grade: 'A' }
    }

    if (userInfo.authLevel == 2) {
      return { img: gradeB, grade: 'B' }
    }

    if (userInfo.authLevel == 3) {
      return { img: gradeC, grade: 'C' }
    }

    return {}
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}

    return (
      <div className="info-box">
        <div className="info-title">
          {UPEX.lang.template('基本信息')}
        </div>
        <div className="info-content">
          <div className="info-content-left">
            <div className="phone">
              {userInfo.phone || userInfo.email}</div>
            <div className="login-time">{UPEX.lang.template('最后登录时间')}：
            {
                userInfo.userLoginRecord && userInfo.userLoginRecord.time
              }</div>
            <div className="bind">
              <div className="bind-phone">
                <img src={userInfo.phone ? bindPhone : unbindPhone} />
                <span>{UPEX.lang.template('手机绑定')}</span>
              </div>
              <div className="bind-email">
                <img src={userInfo.email ? bindEmail : unbindEmail} />
                <span>{UPEX.lang.template('邮箱绑定')}</span>
              </div>
            </div>
          </div>
          <div className="info-content-right">
            <div className="title">{UPEX.lang.template('当前认证等级')}</div>
            <div>
              <img src={this.gradeImg().img} />
              <div className="certification-grade">
                <div className="grade">
                  {UPEX.lang.template('安全级别')} {this.gradeImg().grade}
                  <Link to="/user/authentication">{UPEX.lang.template('提升安全等级')}</Link>
                </div>
                <div className="money">
                  <span>{UPEX.lang.template('提现额度')}：</span>
                  <span>NT{userInfo.dayLimit}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Info;