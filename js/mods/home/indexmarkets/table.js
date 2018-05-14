/**
 * @fileoverview 首页币种table
 * @author xia xiang feng
 * @date 2018-05-10
 */
import React from 'react';
import { Icon } from 'antd'

export default class extends React.Component {

  constructor () {
    super()
    this.collecthandle = this.collecthandle.bind(this)
  }

  collecthandle (e) {
    const className = e.target.className
    if (className === 'anticon anticon-star') {
      e.target.className = 'anticon anticon-star-o'
    } else {
      e.target.className = 'anticon anticon-star'
    }
  }

  sortHandle (e) {
    const className = e.target.className
    if (className === 'anticon anticon-caret-down') {
      e.target.className = 'anticon anticon-caret-up'
    } else {
      e.target.className = 'anticon anticon-caret-down'
    }
  }

  render() {
    return (
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
                </colgroup>
                <thead className="ant-table-thead">
                  <tr>
                    <th>{UPEX.lang.template('币种')}</th>
                    <th>{UPEX.lang.template('最新价')}(TDW)
                      <Icon onClick={this.sortHandle} type="caret-down" />
                    </th>
                    <th>24h{UPEX.lang.template('涨跌')}
                      <Icon onClick={this.sortHandle} type="caret-down" /></th>
                    <th>24h{UPEX.lang.template('成交量')}
                      <Icon onClick={this.sortHandle} type="caret-down" />
                    </th>
                    <th>{UPEX.lang.template('收藏')}</th>
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
                </colgroup>
                <tbody className="ant-table-tbody">
                  {
                    this.props.coins.map((item, index) => {
                      return <tr key={item.id}>
                        <td>{item.currencyNameEn}</td>
                        <td>{item.price}</td>
                        <td>{item.hours24Chang}</td>
                        <td>{item.hours24Count}</td>
                        <td>
                          <Icon onClick={this.collecthandle} type="star-o" />
                        </td>
                      </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}