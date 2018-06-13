/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, message, Select } from 'antd'
import { Link } from 'react-router'
import Vcodebutton from '../common/authcode-btn'
import NumberUtil from '../../lib/util/number'
const Option = Select.Option;

@inject('userInfoStore', 'captchaStore', 'loginStore')
@observer
export default class BindingPhone extends Component {

  constructor() {
    super()
    this.phoneChange = this.phoneChange.bind(this)
    this.ivCodeChange = this.ivCodeChange.bind(this)
    this.submit = this.submit.bind(this)
    this.vCodeChange = this.vCodeChange.bind(this)
    this.onAreaCodeChange = this.onAreaCodeChange.bind(this)
    this.captchaChange = this.captchaChange.bind(this)
    this.evCodeChange = this.evCodeChange.bind(this)
  }

  componentWillMount() {
    this.setState({
      areacode: NumberUtil.prefixed(this.props.loginStore.selectedCountry.areacode, 4)
    })
    this.props.captchaStore.fetch()
  }

  state = {
    phone: '',
    vCode: '',
    ivCode: '',
    areacode: '',
    evCode: ''
  }

  onAreaCodeChange (val) {
    this.setState({
      areacode: NumberUtil.prefixed(this.props.loginStore.countries[val].areacode, 4)
    })
  }

  phoneChange(e) {
    this.setState({
      phone: e.target.value
    })
  }

  vCodeChange(e) {
    this.setState({
      vCode: e.target.value
    })
  }

  ivCodeChange(e) {
    this.setState({
      ivCode: e.target.value
    })
  }

  evCodeChange(e) {
    this.setState({
      evCode: e.target.value
    })
  }

  captchaChange() {
    this.props.captchaStore.fetch()
  }

  submit() {
    if (!this.state.phone) {
      message.error(UPEX.lang.template('手机号不能为空'))
      return
    }
    if (!this.state.vCode) {
      message.error(UPEX.lang.template('短信验证码不能为空'))
      return
    }
    if (!this.state.evCode) {
      message.error(UPEX.lang.template('邮箱验证码不能为空'))
      return
    }

    this.props.userInfoStore.bindPEAction(this.state.evCode, this.state.vCode, this.state.areacode + this.state.phone, 2)
  }

  render() {
    const loading = this.props.userInfoStore.submit_loading
    const codeid = this.props.captchaStore.codeid
    const captcha = this.props.captchaStore.captcha
    const loginStore = this.props.loginStore
    let options = [];
    $.map(loginStore.countries, (item, key) => {
      options[options.length] = <Option value={key} key={key}>{UPEX.lang.template(key)}(+{NumberUtil.prefixed(item.areacode,4)})</Option>
    })
    
    return (
      <div>
        <div className="modify-password-title">
          {UPEX.lang.template('绑定手机')}
        </div>
        <div className="modify-password-box">
          <div className="item-area">
            <Select 
              showSearch 
              size="large" 
              style={{ width: 360 }} 
              onChange={this.onAreaCodeChange} 
              defaultValue={loginStore.selectedCountry.code}>
              {options}
            </Select>
          </div>
          <div className="item">
            <span className="lable">{UPEX.lang.template('手机号')}</span>
            <input onChange={this.phoneChange} className="input" />
          </div>
          <div className="item v-code">
            <span className="lable">{UPEX.lang.template('图片验证码')}</span>
            <input onChange={this.ivCodeChange} onChange={this.ivCodeChange} className="input" />
          </div>
          <div className="item v-code-button">
            <img onClick={this.captchaChange} src={captcha} />
          </div>
          <div className="item">
            <span className="lable">{UPEX.lang.template('短信确认码')}</span>
            <input onChange={this.vCodeChange} className="input" />
          </div>
          <div className="item v-code">
            <span className="lable">{UPEX.lang.template('邮箱确认码')}</span>
            <input onChange={this.evCodeChange} className="input" />
          </div>
          <div className="item v-code-button">
            <Vcodebutton message="手机号不能为空" emailOrphone={this.state.phone} areacode={this.state.areacode} newBind={true} type={2} imgCode={this.state.ivCode} codeid={codeid} />
          </div>
          <div className="massage" style={{ display: 'none' }}>
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