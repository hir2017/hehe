/**
 * @fileoverview  绑定手机
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BindingPhone from '../../mods/bindingPhone'

@observer
class BindingPhonePage extends Component {
    render() {
        return (
          <div>
            <div className="binding-phone-title">
              {UPEX.lang.template('手机绑定')}
            </div>
            <BindingPhone />
          </div>
        )
      }
  }
  
export default BindingPhonePage;