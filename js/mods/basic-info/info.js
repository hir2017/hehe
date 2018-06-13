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
    let result;

    if (userInfo.authLevel == 1) {
      result = { img: gradeA, grade: 'A' }
    }

    if (userInfo.authLevel == 2) {
      result = { img: gradeB, grade: 'B' }
    }

    if (userInfo.authLevel == 3) {
      result = { img: gradeC, grade: 'C' }
    }

    if (userInfo.authLevel == 0) {
      result = { grade: 'Z' }
    }

    return result;
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    let gradeCfg = this.gradeImg();
    let $gradeInfo;

    if (gradeCfg) {
      
      if (gradeCfg.grade == 'Z') {
        $gradeInfo =  (
          <div>
            <div className="certification-grade">
              <div className="grade">
                {UPEX.lang.template('您还未进行安全级别认证')}
                <Link to="/user/authentication">{UPEX.lang.template('提升安全等级')}</Link>
              </div>
            </div>
          </div>
        )
      } else {
        let ugradeLink;

        switch (gradeCfg.grade) {
          case 'Z':
            ugradeLink = '/user/authentication';
            break;
          case 'A':
            ugradeLink = '/user/bankInfo';
            break;
          case 'B':
            ugradeLink = '/user/authentication';
            break;
        }

        $gradeInfo = (
          <div>
            <img src={gradeCfg.img} />
            <div className="certification-grade">
              <div className="grade">
                { UPEX.lang.template('安全级别 : {grade}', { grade: gradeCfg.grade})}
                { ugradeLink ? <Link to={ugradeLink}>{UPEX.lang.template('提升安全等级')}</Link> : null }
              </div>
              <div className="money">
                <span>{UPEX.lang.template('提现额度')}：</span>
                <span>NT${userInfo.dayLimit}</span>
              </div>
            </div>
          </div>
        )
      }
    } 

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
                <img src={userInfo.isValidatePhone ? bindPhone : unbindPhone} />
                <span>{UPEX.lang.template('手机绑定')}</span>
              </div>
              <div className="bind-email">
                <img src={userInfo.isValidateEmail ? bindEmail : unbindEmail} />
                <span>{UPEX.lang.template('邮箱绑定')}</span>
              </div>
            </div>
          </div>
          <div className="info-content-right">
            <div className="title">{UPEX.lang.template('当前认证等级')}</div>
            {$gradeInfo}
          </div>
        </div>
      </div>
    )
  }
}

export default Info;