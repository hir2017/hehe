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

@observer
export default class extends Component {
  render() {
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
            <li>
              <span>體現出問題了，已經申請了，等了三個工作日了，還沒有到賬，還要等麼？打電話問了也沒有結果怎麼辦？</span>
              <span>已解决</span>
              <span>2018-4-30</span>
            </li>
            <li>
              <span>體現出問題了，已經申請了，等了三個工作日了，還沒有到賬，還要等麼？打電話問了也沒有結果怎麼辦？</span>
              <span>已解决</span>
              <span>2018-4-30</span>
            </li>
            <li>
              <span>體現出問題了，已經申請了，等了三個工作日了，還沒有到賬，還要等麼？打電話問了也沒有結果怎麼辦？</span>
              <span>已解决</span>
              <span>2018-4-30</span>
            </li>
          </ul>
        </div>
        <div className="question-page">
            <Pagination size="small" total={50} />
        </div>
      </div>
    )
  }
}