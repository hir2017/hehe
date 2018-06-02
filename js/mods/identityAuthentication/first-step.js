/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react';
import { Input, Select, Checkbox, Button } from 'antd'
import Steps from './steps'
import dayjs from 'dayjs'

const Option = Select.Option

@inject('userInfoStore')
@observer
export default class FirstStep extends Component {

  constructor () {
    super()
    this.next = this.next.bind(this)
    this.firstNameChange = this.firstNameChange.bind(this)
    this.secondNameChange = this.secondNameChange.bind(this)
    this.yearChange = this.yearChange.bind(this)
    this.monthChange = this.monthChange.bind(this)
    this.dayChange = this.dayChange.bind(this)
    this.idCardTypeChange = this.idCardTypeChange.bind(this)
    this.idCardChange = this.idCardChange.bind(this)
    this.checkHandel = this.checkHandel.bind(this)
  }

  state = {
    firstName: '',
    firstNameMes: '',
    secondName: '',
    secondNameMes: '',
    year: '',
    month: '',
    day: '',
    birthday: '',
    birthdayMes: '',
    idCardType: '',
    idCardTypeMes: '',
    idCard: '',
    idCardMes: '',
    check: false
  }

  years () {
    let count = 100
    const yearA = []
    while(count) {
      const year = dayjs().subtract(100 - count, 'year').format('YYYY')
      yearA.push(year)
      count--
    }
    return yearA
  }

  months () {
    let count = 12
    const monthA = []
    while(count) {
      let month = count--
      if (month < 10) month = `0${month}`
      monthA.push(month)
    }
    return monthA
  }

  days () {
    let count = 30
    const monthA = []
    while(count) {
      let month = count--
      if (month < 10) month = `0${month}`
      monthA.push(month)
    }
    return monthA
  }

  firstNameChange (e) {
    this.setState({
      firstName: e.target.value,
      firstNameMes: ''
    })
  }

  secondNameChange (e) {
    this.setState({
      secondName: e.target.value,
      secondNameMes: ''
    })
  }

  yearChange (val) {
    this.setState({
      year: val
    })
  }

  monthChange (val) {
    this.setState({
      month: val
    })
  }

  dayChange (val) {
    this.setState({
      day: val,
      birthdayMes: ''
    })
  }

  idCardTypeChange (val) {
    this.setState({
      idCardType: val,
      idCardTypeMes: ''
    })
  }

  idCardChange (e) {
    this.setState({
      idCard: e.target.value,
      idCardMes: ''
    })
  }

  checkHandel (e) {
    this.setState({
      check: e.target.checked
    })
  }

  next () {
    let valid1 = true, valid2 = true, valid3 = true, valid4 = true, valid5 = true
    if (!this.state.firstName) {
      this.setState({
        firstNameMes: UPEX.lang.template('*真实姓氏不能为空')
      })
      valid1 = false
    }
    if (!this.state.secondName) {
      this.setState({
        secondNameMes: UPEX.lang.template('*真实名字不能为空')
      })
      valid2 = false
    }
    if (!this.state.year || !this.state.month || !this.state.day) {
      this.setState({
        birthdayMes: UPEX.lang.template('*请完善出生日期')
      })
      valid3 = false
    }
    if (!this.state.idCardType) {
      this.setState({
        idCardTypeMes: UPEX.lang.template('*请选择证件类型')
      })
      valid4 = false
    }
    if (!this.state.idCard) {
      this.setState({
        idCardMes: UPEX.lang.template('*证件号码不能为空')
      })
      valid5 = false
    }
    if (valid1 && valid2 && valid3 && valid4 && valid5) {
      this.props.userInfoStore.addIdentityInfo({
        firstName: this.state.firstName,
        secondName: this.state.secondName,
        birthday: this.state.year + '-' + this.state.month + '-' + this.state.day,
        idType: this.state.idCardType,
        idNumber: this.state.idCard
      })
      this.props.changeStep(2)
    }
  }

  render() {
    return (
      <div>
        <Steps step={1}/>
        <div className="item one-item">
          <span className="lable">
            {UPEX.lang.template('真实姓氏')}
          </span>
          <span className="input">
            <Input onChange={this.firstNameChange}/>
            <span className="error-message">{this.state.firstNameMes}</span>
            <span className="message">
              *{UPEX.lang.template('填写之姓氏必须与日后提领的银行账户名相同')}
            </span>
          </span>
        </div>
        <div className="item">
          <span className="lable">
            {UPEX.lang.template('真实名字')}
          </span>
          <span className="input">
            <Input onChange={this.secondNameChange}/>
            <span className="error-message">{this.state.secondNameMes}</span>
            <span className="message">
              *{UPEX.lang.template('填写之名字必须与日后提领的银行账户名相同')}
            </span>
          </span>
        </div>
        <div className="item">
          <span className="lable time-lable">
            {UPEX.lang.template('出生日期')}
          </span>
          <span className="input">
            <span className="time-control">
              <Select showSearch 
                placeholder={UPEX.lang.template('可以输入年')}
                onChange={this.yearChange} style={{ width: 130 }}>
                {
                  this.years().map((item, index) => {
                    return  <Option key={index} value={item}>{item}&nbsp;&nbsp;&nbsp;&nbsp;{UPEX.lang.template('年')}</Option>
                  })
                }
              </Select>
              <Select 
                placeholder={UPEX.lang.template('请选择月')}
                onChange={this.monthChange}
                style={{ width: 110 }}>
                {
                  this.months().map((item, index) => {
                    return <Option key={index} value={item}>{item}&nbsp;&nbsp;&nbsp;&nbsp;{UPEX.lang.template('月')}</Option>
                  })
                }
              </Select>
              <Select 
                placeholder={UPEX.lang.template('请选择日')}
                onChange={this.dayChange}
                style={{ width: 110 }}>
                {
                  this.days().map((item, index) => {
                    return <Option key={index} value={item}>{item}&nbsp;&nbsp;&nbsp;&nbsp;{UPEX.lang.template('日')}</Option>
                  })
                }
              </Select>
            </span>
            <span className="error-message">{this.state.birthdayMes}</span>
            <span className="message">
            </span>
          </span>
        </div>
        <div className="item">
          <span className="lable">
            {UPEX.lang.template('证件类型')}
          </span>
          <span className="input">
            <Select style={{ width: 190 }}
              onChange={this.idCardTypeChange}
              placeholder={UPEX.lang.template('请选择')}>
              <Option value="台湾身份证">台湾身份证</Option>
            </Select>
            <span className="error-message">{this.state.idCardTypeMes}</span>
            <span className="message">
              *{UPEX.lang.template('目前暫時只開放給擁有台灣身分證的用戶使用')}
            </span>
          </span>
        </div>
        <div className="item">
          <span className="lable">
            {UPEX.lang.template('证件号码')}
          </span>
          <span className="input">
            <Input onChange={this.idCardChange}/>
            <span className="error-message">{this.state.idCardMes}</span>
            <span className="message">
              *{UPEX.lang.template('為保證款項可能有退還的情形，因此請填寫真實身分證字號')}
            </span>
          </span>
        </div>
        <div className="item">
          <Checkbox onChange={this.checkHandel}>
            <span className="checkbox-text">{UPEX.lang.template('勾選選礦表示您同意我們的')}</span>
            <span className="checkbox-text"><Link>{UPEX.lang.template('用戶條款')}</Link></span>
            <span className="checkbox-text"><Link>{UPEX.lang.template('隱私條款')}</Link></span>
          </Checkbox>
        </div>
        <div className="submit">
        {
          this.state.check 
          ? <Button onClick={this.next}>{UPEX.lang.template('下一步')}</Button>
          : <Button className="disabled" disabled>{UPEX.lang.template('下一步')}</Button>
        }
        </div>
      </div>
    )
  }

}