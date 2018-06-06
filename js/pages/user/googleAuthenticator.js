/**
 * @fileoverview  google 认证
 * @author xia xiang feng
 * @date 2018-05-25
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Button } from 'antd'
import { Link } from 'react-router'
import BindingGoogle from '../../mods/bindingGoogle'
import Success from '../../mods/bindingGoogle/success'

@inject('userInfoStore')
@observer
class GoogleAuthenticator extends Component {

  componentWillMount() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    const gaBindSuccess = this.props.userInfoStore.gaBindSuccess
    userInfo.phone || this.props.userInfoStore.getUserInfo()
    gaBindSuccess || this.props.userInfoStore.isGoogleAuth()
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    const gaBindSuccess = this.props.userInfoStore.gaBindSuccess
    console.log(gaBindSuccess, 'ga')
    return (
      <div>
        <div className="google-auth-title">
          {UPEX.lang.template('google验证器')}
        </div>
        {
          userInfo.phone
            ? !(gaBindSuccess === 1)
            ? <BindingGoogle />
            : <Success />
            : <div className="google-no-binding-phone">
              {UPEX.lang.template('添加Google绑定前，请先绑定手机号')}
              <div>
                <Button>
                  <Link to="/user/settingPhone">
                    {UPEX.lang.template('去绑定手机')}
                  </Link>
                </Button>
              </div>
            </div>
        }
      </div>
    )
  }
}

export default GoogleAuthenticator;