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

  componentWillMount() {
    this.props.userInfoStore.bankCardInfo()
  }

  status (num) {
    switch(num) {
      case 3 : return '等待审核'; break;
      case 2 : return '已拒绝'; break;
      case 1 : return '已绑定'; break;
      default : return num; break;
    }
  }

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
                          return <tr key={index}>
                            <td>{item.createTime}</td>
                            <td>{item.branchName}</td>
                            <td>{item.openBank}</td>
                            <td>{item.cardNo}</td>
                            <td>{this.status(item.status)}</td>
                            <td>-</td>
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