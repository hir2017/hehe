/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

@inject('userInfoStore')
@observer
export default class BankList extends Component {
  render() {
    const bankCardList = this.props.userInfoStore.bankCardList || []
    return (
      <div className="bank-list-box">
        <div>
          <div className="ant-table ant-table-large ant-table-fixed-header ant-table-scroll-position-left">
            <div className="ant-table-content">
              <div className="ant-table-scroll">
                <div className="ant-table-header">
                  <table className="">
                    <colgroup>
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                    </colgroup>
                    <thead className="ant-table-thead">
                      <tr>
                        <th>{UPEX.lang.template('提交时间')}</th>
                        <th>{UPEX.lang.template('银行')}</th>
                        <th>{UPEX.lang.template('分行')}</th>
                        <th>{UPEX.lang.template('账号')}</th>
                        <th>{UPEX.lang.template('状态')}</th>
                        <th>{UPEX.lang.template('操作')}</th>
                      </tr>
                    </thead>
                  </table>
                </div>
                <div className="ant-table-body">
                  <table className="">
                    <colgroup>
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                      <col style={{ width: '172px', minWidth: '172px' }} />
                    </colgroup>
                    <tbody className="ant-table-tbody">
                      {
                        bankCardList.map((item, index) => {
                          <tr key={index}>
                            <td>2018-5-20  23:34:23</td>
                            <td>中国民生银行</td>
                            <td>台北分行</td>
                            <td>6219********9623</td>
                            <td>等待审核</td>
                            <td>解绑</td>
                          </tr>
                        })
                      }
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}