/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message } from 'antd'
import { Link } from 'react-router'
import Vcodebutton from '../common/sendAuthCodeBtn'
import md5 from '../../lib/md5';

@inject('userInfoStore', 'captchaStore')
@observer
export default class ModifyTradingPassword extends Component {

  constructor () {
    super()
    this.submit = this.submit.bind(this)
    this.passwordChange = this.passwordChange.bind(this)
    this.newPwdChange = this.newPwdChange.bind(this)
    this.comfirmChange = this.comfirmChange.bind(this)
    this.vCodeChange = this.vCodeChange.bind(this)
    this.ivCodeChange = this.ivCodeChange.bind(this)
    this.captchaChange = this.captchaChange.bind(this)
  }

  componentWillMount () {
    this.props.captchaStore.fetch()
  }

  state = {
    password: '',
    newPwd: '',
    comfirmPwd: '',
    vCode: '',
    ivCode: ''
  }

  passwordChange (e) {
    this.setState({
      password: e.target.value
    })
  }

  newPwdChange (e) {
    this.setState({
      newPwd: e.target.value
    })
  }

  comfirmChange (e) {
    this.setState({
      comfirmPwd: e.target.value
    })
  }

  vCodeChange (e) {
    this.setState({
      vCode: e.target.value
    })
  }

  ivCodeChange (e) {
    this.setState({
      ivCode: e.target.value
    })
  }

  captchaChange () {
    this.props.captchaStore.fetch()
  }

  submit () {
    const codeid = this.props.captchaStore.codeid
    if (!this.state.password) {
      message.error(UPEX.lang.template('交易密码不能为空'))
      return
    }
    if (!this.state.newPwd) {
      message.error(UPEX.lang.template('新交易密码不能为空'))
      return
    }
    if (!this.state.comfirmPwd) {
      message.error(UPEX.lang.template('确认密码不能为空'))
      return
    }
    if (this.state.newPwd !== this.state.comfirmPwd) {
      message.error(UPEX.lang.template('新交易密码和确认密码不一致'))
      return
    }
    if (!this.state.vCode) {
      message.error(UPEX.lang.template('短信验证码不能为空'))
      return
    }

    const checkPwd = /(?=.*[a-zA-Z])(?=.*[0-9])[0-9A-Za-z+-@_=*]{6,16}/.test(this.state.newPwd)

    if (this.state.newPwd && !checkPwd) {
      message.error(UPEX.lang.template('密码由6-18数字、字母和特殊字符组成'))
      return
    }
    
    const pwd = md5(this.state.password + UPEX.config.salt)
    this.props.userInfoStore.bindTradingPwd(this.state.newPwd, this.state.vCode, this.state.ivCode, codeid, pwd)
  }

  render() {
    const loading = this.props.userInfoStore.submit_loading_tpwd
    const codeid = this.props.captchaStore.codeid
    const captcha = this.props.captchaStore.captcha
    const userInfo = this.props.userInfoStore.userInfo || {}
    return (
      <div>
        <div className="modify-password-title">
          {UPEX.lang.template('修改交易密碼')}
        </div>
        <div className="modify-password-box">
          <div className="item new-pwd">
            <span className="lable">{UPEX.lang.template('交易密码')}</span>
            <input onChange={this.passwordChange} type="password" className="input" />
            <span className="item-left-meassage">*{UPEX.lang.template('密码由6-18数字、字母和特殊字符组成')}</span>
          </div>
          <div className="item">
            <span className="lable">{UPEX.lang.template('新交易密码')}</span>
            <input onChange={this.newPwdChange} type="password" className="input" />
          </div>
          <div className="item">
            <span className="lable">{UPEX.lang.template('确认密码')}</span>
            <input onChange={this.comfirmChange} type="password" className="input" />
          </div>
          <div>
            <div className="item v-code">
              <span className="lable">{UPEX.lang.template('图片验证码')}</span>
              <input onChange={this.ivCodeChange} className="input" />
            </div>
            <div className="item v-code-button">
              <img onClick={this.captchaChange} src={captcha} />
            </div>
          </div>
          <div>
            <div className="item v-code">
              <span className="lable">{UPEX.lang.template('短信验证码')}</span>
              <input onChange={this.vCodeChange} className="input" />
            </div>
            <div className="item v-code-button">
              <Vcodebutton imgCode={this.state.ivCode} codeid={codeid} type="phone"/>
            </div>
          </div>
          <div className="massage" style={{display: 'none'}}>
            {UPEX.lang.template('不方便接短信？可使用')}&nbsp;&nbsp;&nbsp;&nbsp;<Link>Google{UPEX.lang.template('驗證碼')}</Link>
          </div>
          <div className="submit">
            <Button loading={loading} onClick={this.submit}>{UPEX.lang.template('提交')}</Button>
          </div>
        </div>
      </div>
    )
  }
}