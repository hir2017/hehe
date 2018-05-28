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

@observer
export default class FirstStep extends Component {

  constructor () {
    super()
    this.next = this.next.bind(this)
    this.nameChange = this.nameChange.bind(this)
    this.yearChange = this.yearChange.bind(this)
  }

  state = {
    name: '',
    year: '',
    birthday: '',
    idCardType: '',
    idCard: ''
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

  nameChange (e) {
    this.setState({
      name: e.target.value
    })
  }

  yearChange (val) {
    console.log(val)
    this.setState({
      year: val
    })
  }

  next () {
    this.props.changeStep(2)
  }

  render() {
    return (
      <div>
        <Steps step={1}/>
        <div className="item one-item">
          <span className="lable">
            {UPEX.lang.template('真实姓名')}
          </span>
          <span className="input">
            <Input onChange={this.nameChange}/>
            <span></span>
            <span className="message">
              *{UPEX.lang.template('填写之姓名必须与日后提领的银行账户名相同')}
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
                style={{ width: 110 }}>
                {
                  this.months().map((item, index) => {
                    return <Option key={index} value={item}>{item}&nbsp;&nbsp;&nbsp;&nbsp;{UPEX.lang.template('月')}</Option>
                  })
                }
              </Select>
              <Select 
                placeholder={UPEX.lang.template('请选择日')}
                style={{ width: 110 }}>
                {
                  this.days().map((item, index) => {
                    return <Option key={index} value={item}>{item}&nbsp;&nbsp;&nbsp;&nbsp;{UPEX.lang.template('日')}</Option>
                  })
                }
              </Select>
            </span>
            <span></span>
            <span className="message">
            </span>
          </span>
        </div>
        <div className="item">
          <span className="lable">
            {UPEX.lang.template('证件类型')}
          </span>
          <span className="input">
            <Select defaultValue="台湾身份证" style={{ width: 190 }}>
              <Option value="台湾身份证">台湾身份证</Option>
            </Select>
            <span></span>
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
            <Input />
            <span className="error-message">*{UPEX.lang.template('请输入正确内容')}</span>
            <span className="message">
              *{UPEX.lang.template('為保證款項可能有退還的情形，因此請填寫真實身分證字號')}
            </span>
          </span>
        </div>
        <div className="item">
          <Checkbox>
            <span className="checkbox-text">{UPEX.lang.template('勾選選礦表示您同意我們的')}</span>
            <span className="checkbox-text"><Link>{UPEX.lang.template('用戶條款')}</Link></span>
            <span className="checkbox-text"><Link>{UPEX.lang.template('隱私條款')}</Link></span>
          </Checkbox>
        </div>
        <div className="submit">
          <Button onClick={this.next}>{UPEX.lang.template('下一步')}</Button>
        </div>
      </div>
    )
  }

}