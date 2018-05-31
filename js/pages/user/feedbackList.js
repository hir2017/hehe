/**
 * @fileoverview  反馈列表
 * @author xia xiang feng
 * @date 2018-05-26
 */
import React, { Component } from 'react';
import { Link } from 'react-router'
import { observer, inject } from 'mobx-react';
import { Input, Upload, Icon, Button, Pagination } from 'antd';
const { TextArea } = Input;

@inject('userInfoStore')
@observer
export default class extends Component {

  componentDidMount() {
    this.props.userInfoStore.questions(1)
  }

  pageChange = (page) => {
    this.props.userInfoStore.questions(page)
  }

  render() {
    const count = this.props.userInfoStore.questionsLsit.count
    const questionsLsit = this.props.userInfoStore.questionsLsit.list || []
    return (
      <div>
        <div className="question-title">
          {UPEX.lang.template('問題列表')}
        </div>
        <div className="question-search">
          <Icon type="search" />
          <Input placeholder={UPEX.lang.template('搜索您的問題')} />
          <span>{UPEX.lang.template('我反饋的問題')}</span>
        </div>
        <div className="question-content">
          <ul>
            {
              questionsLsit.map((item, index) => {
                return <li key={index}>
                  <span>{item.detail}</span>
                  <span>已解决</span>
                  <span>{item.createTime}</span>
                </li>
              })
            }
          </ul>
        </div>
        <div className="question-page">
          <Pagination onChange={this.pageChange} size="small" total={count} />
        </div>
      </div>
    )
  }
}