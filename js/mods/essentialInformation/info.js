/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router'
import bindPhone from '../../../images/bind-phone.png'
import bindEmail from '../../../images/bind-email.png'
import gradeC from '../../../images/grade-C.png'
import { Switch } from 'antd';

@observer
class Info extends Component {

  onChange(checked) {
    console.log(`switch to ${checked}`);
  }
  render() {
    return (
      <div className="info-box">
        <div className="info-title">
          {UPEX.lang.template('基本信息')}
        </div>
        <div className="info-content">
          <div className="info-content-left">
            <div className="phone">138****6712</div>
            <div className="login-time">{UPEX.lang.template('最后登录时间')}：2018年5月2日</div>
            <div className="bind">
              <div className="bind-phone">
                <img src={bindPhone} />
                <span>{UPEX.lang.template('手机绑定')}</span>
              </div>
              <div className="bind-email">
                <img src={bindEmail} />
                <span>{UPEX.lang.template('邮箱绑定')}</span>
              </div>
            </div>
          </div>
          <div className="info-content-right">
            <div className="title">{UPEX.lang.template('当前认证等级')}</div>
            <div>
              <img src={gradeC} />
              <div className="certification-grade">
                <div className="grade">
                  {UPEX.lang.template('安全级别')} C
                      <Link>{UPEX.lang.template('提升安全等级')}</Link>
                </div>
                <div className="money">
                  <span>{UPEX.lang.template('提现额度')}：</span>
                  NT300.00000
                    </div>
              </div>
              <div className="login-reminding">
                {UPEX.lang.template('异地登陆提醒')}
                <Switch defaultChecked onChange={this.onChange} />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Info;