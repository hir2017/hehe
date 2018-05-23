/**
 * @fileoverview  银行卡信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BindingBank from '../../mods/bankInfo/index'
import BankList from '../../mods/bankInfo/list'

@observer
class BankInfo extends Component {
    render() {
        return (
          <div>
            <div className="bank-info-title">
              {UPEX.lang.template('银行卡信息')}
            </div>
            <BindingBank />
            <BankList />
          </div>
        )
      }
  }
  
export default BankInfo;