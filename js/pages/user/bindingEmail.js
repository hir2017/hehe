/**
 * @fileoverview  绑定邮箱
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BindingEmail from '../../mods/bindingEmail'

@observer
class BindingEmailPage extends Component {
    render() {
        return (
          <div>
            <div className="binding-phone-title">
              {UPEX.lang.template('邮箱绑定')}
            </div>
            <BindingEmail />
          </div>
        )
      }
  }
  
export default BindingEmailPage;