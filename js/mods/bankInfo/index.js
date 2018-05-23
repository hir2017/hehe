/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Button } from 'antd';
const Option = Select.Option;

@observer
export default class BindingBank extends Component {
  render() {
    return (
      <div>
        <div className="binding-bank-box">
          <div className="item">
            {UPEX.lang.template('开户人')}：**淼
        </div>
          <div className="item">
            <Select size='large' placeholder={UPEX.lang.template('选择银行')}
              style={{ width: 400 }}>
              <Option value="jack">Jack</Option>
            </Select>
          </div>
          <div className="item">
            <Select size='large' placeholder={UPEX.lang.template('选择银行分行')}
              style={{ width: 400 }}>
              <Option value="jack">Jack</Option>
            </Select>
          </div>
          <div className="item">
            <div className="bank-card-num">
              <span className="input-lable">{UPEX.lang.template('银行账号')}</span>
              <input className="input" />
            </div>
          </div>
          <div className="item submit">
            <Button onClick={this.next}>{UPEX.lang.template('提交')}</Button>
          </div>
        </div>
        <div className="binding-bank-message">
          <ul>
            <li>行賬戶一旦新增就不能修改，請在提交前再三確認您的銀行賬戶是否正確，如有任何問題請聯繫我們；</li>
            <li>當設定銀行賬號之後，我們會在銀行賬號上存入一元新台幣來確定賬號是否正確，这個過程大致需要三個工作日；</li>
            <li>請按照您開戶的信息正確填寫姓名、賬戶號碼信息，并選擇正確開戶的分行名稱。有些銀行銀行會使用分行代碼中的三碼或四碼作為賬戶的開頭，這些也是需要填寫的，請不要忽略掉；</li>
            <li>請優先依照分行代碼(並不是分行名稱)選取銀行分行，因為銀行可能隨時更改名稱，所以分行名稱並不一定準確。如果您的分行代碼並不在我們的列表中，請與我們聯繫，切勿自行選擇其他分行。</li>
          </ul>
        </div>
      </div>
    )
  }
}