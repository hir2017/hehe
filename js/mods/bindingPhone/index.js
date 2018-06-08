/**
 * @fileoverview  绑定手机
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button, Switch, Modal, Input } from 'antd'
import { Link } from 'react-router'
import Vcodebutton from '../common/sendAuthCodeBtn'

@inject('userInfoStore')
@observer
export default class Phone extends Component {

  componentWillMount() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo()
  }

  phoneSwitch = (checked) => {
    this.setState({
      visible: true
    })
    // this.props.userInfoStore.phoneSwitch(checked ? 1 : 0)
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
    const checked = userInfo.isPhoneAuth ? true : false
    return (
      <div className="binding-phone-content">
        <div className="binding-phone-left">
          <div>
            <span className="phone">{userInfo.phone || UPEX.lang.template('请添加手机')}</span>
            <Button>
              {
                userInfo.phone
                ? <Link to="/user/modifyPhone">
                    {UPEX.lang.template('修改')}
                  </Link>
                : <Link to="/user/settingPhone">
                    {UPEX.lang.template('添加')}
                  </Link>
              }
            </Button>
          </div>
          <div className="message">
            {UPEX.lang.template('提現、修改密碼，及安全設置時接收短信使用')}
          </div>
          <div className="switch">
            {UPEX.lang.template('启用登录手机认证')}&nbsp;&nbsp;&nbsp;<Switch onChange={this.phoneSwitch} loading={loading} checked={checked}/>
          </div>
        </div>
        <div className="binding-phone-right">
          <ul>
            <li>※{UPEX.lang.template('為了您的安全或者降低手機遺失的風險，請在綁定手機號后立即綁定Google驗證器')}。</li>
            <li>※{UPEX.lang.template('為了您的資金安全，修改手機綁定后，24小時內不可以提現提幣')}</li>
          </ul>
        </div>
        <Modal
          title={UPEX.lang.template('请输入短信验证码')}
          visible={this.state.visible}
          onOk={this.handleOk}
          confirmLoading={loading}
          onCancel={this.cancelHandle}
        >
          <div>
            <div className="item">
              <Input addonAfter={<Vcodebutton style={{lineHeight: 'normal', height: 'auto'}}/>} type='password' size="large" placeholder={UPEX.lang.template('请输入交易密码')} />
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}