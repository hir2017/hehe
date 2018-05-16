/**
 * @fileoverview 首页币种table
 * @author xia xiang feng
 * @date 2018-05-10
 */
import React from 'react';
import { Icon } from 'antd'
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router'

@inject('homeStore')
@observer
export default class extends React.Component {

  constructor () {
    super()
    this.collecthandle = this.collecthandle.bind(this)
  }

  collecthandle (e, item) {
    const className = e.target.className
    if (className === 'anticon anticon-star') {
      e.target.className = 'anticon anticon-star-o'
      this.props.homeStore.cancleCollectCoins(item);
    } else {
      e.target.className = 'anticon anticon-star'
      this.props.homeStore.collectCoins(item);
    }
  }

  sortHandle (e, field) {
    const className = e.target.className
    if (className === 'anticon anticon-caret-down') {
      e.target.className = 'anticon anticon-caret-up'
      this.props.sortCoin(field, 'asc')
    } else {
      e.target.className = 'anticon anticon-caret-down'
      this.props.sortCoin(field, 'desc')
    }
  }

  collectIcon (data) {
    const collectCoinsList = this.props.homeStore.collectCoinsList
    const res = collectCoinsList.some((item) => {
      return item.tradeCurrencyId === data.currencyId && item.baseCurrencyId === data.baseCurrencyId
    })

    if(res) {
      return <Icon onClick={(e) => this.collecthandle(e,data)} type="star" />
    } else {
      return <Icon onClick={(e) => this.collecthandle(e,data)} type="star-o" />
    }
  }

  selectCoin (baseID, id) {
    this.props.homeStore.selectCoin(baseID, id)
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
                      <Icon onClick={(e) => this.sortHandle(e, 'currentAmount')} type="caret-down" />
                    </th>
                    <th>24h{UPEX.lang.template('涨跌')}
                      <Icon onClick={(e) => this.sortHandle(e, 'changeRate')} type="caret-down" /></th>
                    <th>24h{UPEX.lang.template('成交量')}
                      <Icon onClick={(e) => this.sortHandle(e, 'volume')} type="caret-down" />
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
                        <td>
                          <Link to={{ pathname: '/trade', query: { currencyId: item.currencyId, baseCurrencyId: item.baseCurrencyId } }}>
                          {item.currencyNameEn}
                          </Link>
                        </td>
                        <td onClick={() => {this.selectCoin(item.baseCurrencyId, item.currencyId)}}>{item.currentAmount}</td>
                        <td onClick={() => {this.selectCoin(item.baseCurrencyId, item.currencyId)}}>{item.changeRate}</td>
                        <td onClick={() => {this.selectCoin(item.baseCurrencyId, item.currencyId)}}>{item.volume}</td>
                        <td>
                          {
                            this.collectIcon(item)
                          }
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