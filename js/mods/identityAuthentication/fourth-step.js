/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router'
import { Button } from 'antd'
import Steps from './steps'

@inject('userInfoStore')
@observer
export default class FourthStep extends Component {

  componentWillMount() {
    this.props.userInfoStore.bankCardInfo()
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    const bankCardList = this.props.userInfoStore.bankCardList || []
    return (
      <div>
        <Steps step={4}/>
        <div className="success-title">
          <span>{UPEX.lang.template('您已完成安全認證！')}</span>
        </div>
        <div className="success-user-info">
          <div>{UPEX.lang.template('姓名')}：{userInfo.name}</div>
          <div>{UPEX.lang.template('证件类型/证件号码')}：{UPEX.lang.template('台灣身份證')}/{userInfo.idNumber}</div>
          <div>{UPEX.lang.template('手機號碼')}：{userInfo.phone}</div>
        </div>
        <div className="success-prompt">
          {UPEX.lang.template('如填写有误需要修改，请 联系客服 support@ace.one 进行修改')}
        </div>
        <div className="success-money">
          <span className="success-money-title">{UPEX.lang.template('當前日限額')}：</span>
          NT$ 
          &nbsp;&nbsp;<span className="money">{userInfo.dayLimit}</span>
        </div>
        <div className="success-money-message">
          {UPEX.lang.template('日提現額度是=每日提現到銀行賬戶的額度+每日提幣的即時新台幣價值總額')}
        </div>
        <div className="submit">
        {
          bankCardList.length === 0
          ? <Button><Link to="/user/bankInfo">{UPEX.lang.template('绑定银行卡')}</Link></Button>
          : userInfo.isAuthVideo === 0
          ? <Button>{UPEX.lang.template('申請更高限額')}</Button>
          : userInfo.isAuthVideo === 2
          ? <Button><Link to="/user/bankInfo">{UPEX.lang.template('去交易中心')}</Link></Button>
          : <Button>{UPEX.lang.template('申請更高限額')}</Button>
        }
        </div>
      </div>
    )
  }

}