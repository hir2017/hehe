/**
 * @fileoverview  银行卡信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react';
import BindingBank from '../../mods/bankInfo/index'
import BankList from '../../mods/bankInfo/list'
import { Button, message } from 'antd'

@inject('userInfoStore')
@observer
class BankInfo extends Component {

  constructor () {
    super()
    this.submit = this.submit.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
  }

  componentWillMount() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo()
  }

  state = {
    goBank: false,
    pwd: ''
  }

  passwordChange (e) {
    this.setState({
      pwd: e.target.value
    })
  }

  submit () {
    if (!this.state.pwd) {
      message.error('请输入交易密码')
      return 
    }
    this.setState({
      goBank: true
    })
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    return (
      <div>
        <div className="bank-info-title">
          {UPEX.lang.template('银行卡信息')}
        </div>
        {
          this.state.goBank
            ? <div>
              <BindingBank />
              <BankList />
            </div>
            : userInfo.isValidatePass === 2
            ? <div className="bank-message">
                {UPEX.lang.template('请先身份认证')}<Link to="/user/authentication">{UPEX.lang.template('身份认证')}</Link>
              </div>
            : !userInfo.isValidatePass
              ? <div className="bank-message">
                {UPEX.lang.template('请先设置交易密码')}<Link to="/user/settingTraddingPassword">{UPEX.lang.template('设置交易密码')}</Link>
              </div>
              : <div>
                <BindingBank />
                <BankList />
                {/*<div className="modify-password-box">
                  <div className="item">
                    <span className="lable">{UPEX.lang.template('交易密码')}</span>
                    <input type="password" onChange={this.passwordChange} className="input" />
                  </div>
                  <div className="submit">
                    <Button onClick={this.submit} style={{marginTop: '0px'}}>{UPEX.lang.template('提交')}</Button>
                  </div>
                </div>*/}
              </div>
        }
      </div>
    )
  }
}

export default BankInfo;