/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Password from '../../mods/password-setting'

@observer
class PasswordSetting extends Component {
    render() {
        return (
          <div>
            <div className="password-setting-title">
              {UPEX.lang.template('密码设置')}
            </div>
            <Password />
          </div>
        )
      }
  }
  
export default PasswordSetting;