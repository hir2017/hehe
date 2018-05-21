/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import OneStep from '../../mods/identityAuthentication/first-step'

@observer
class IdentityAuthentication extends Component {
    render() {
        return (
          <div className="authentication">
            <div className="authentication-title">
              {UPEX.lang.template('身份认证')}
            </div>
            <div className="authentication-content">
              <OneStep />
            </div>
          </div>
        )
      }
  }
  
  export default IdentityAuthentication;