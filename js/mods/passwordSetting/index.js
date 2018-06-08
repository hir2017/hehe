/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Modal, Input } from 'antd'
import { Link } from 'react-router'

@inject('userInfoStore')
@observer
export default class BindingBank extends Component {

  componentWillMount() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo()
  }

  passwordSwitch = () => {
    this.setState({
      visible: true
    })
    // this.props.userInfoStore.fdPwdSwitch()
  }

  state = {
    visible: false
  }

  handleOk = () => {

  }

  cancelHandle = () => {
    this.setState({
      visible: false
    })
  }

  render() {
    const loading = this.props.userInfoStore.submit_loading
    const userInfo = this.props.userInfoStore.userInfo || {}
    const isEnableFdPassword = userInfo.isEnableFdPassword === 2 ? true : false
    return (
      <div className="password-setting-box">
        <div className="password">
          <div className="password-change">
            <span>{UPEX.lang.template('登录密码')}</span>
            <Button>
              <Link to="/user/modifyPassword">{UPEX.lang.template('修改')}</Link>
            </Button>
          </div>
          <div className="password-message">
            {UPEX.lang.template('用于用户的登录验证')}
          </div>
          <div style={{ display: 'none' }} className="password-leve">
            <div>
              <span className="leve-lable">{UPEX.lang.template('密码强度')}</span>
              <span className="leve">{UPEX.lang.template('强')}</span>
            </div>
            <div className="leve-show">
              <span className="leve1">
              </span>
            </div>
          </div>
        </div>
        <div className="password trading-password">
          <div className="password-change">
            <span>{UPEX.lang.template('交易密码')}</span>
            <Button>
              {
                userInfo.phone
                  ? !userInfo.isValidatePass
                    ? <Link to="/user/settingTraddingPassword">{UPEX.lang.template('添加')}</Link>
                    : <Link to="/user/modifyTraddingPassword">{UPEX.lang.template('修改')}</Link>
                  : <Link to="/user/settingPhone">{UPEX.lang.template('绑定手机')}</Link>
              }
            </Button>
          </div>
          <div className="password-message">
            {UPEX.lang.template('用於交易、綁定\解綁銀行卡\充幣提現等資金 操作，需要嚴格保密')}
          </div>
          <div className="password-leve">
            <div>
              <span style={{ visibility: 'hidden' }} className="leve-lable">{UPEX.lang.template('密码强度')}</span>
              <span style={{ visibility: 'hidden' }} className="leve">弱</span>
              <span className="switch">
                {UPEX.lang.template('啟用委託認證')}
                <Switch onChange={this.passwordSwitch} checked={isEnableFdPassword} />
              </span>
            </div>
            <div style={{ display: 'none' }} className="leve-show">
              <span className="leve2">
              </span>
            </div>
          </div>
        </div>
        <div className="message">
          {UPEX.lang.template('※為了您的資金安全，忘記交易密碼并修改成功后，24小時內不可以提現提幣。')}
        </div>
        <Modal
          title={UPEX.lang.template('请输入交易密码')}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={loading}
          onCancel={this.cancelHandle}
        >
          <div>
            <div className="item">
              <Input type='password' size="large" placeholder={UPEX.lang.template('请输入交易密码')} />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}