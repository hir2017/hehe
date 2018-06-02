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

  state = {
    sort: '',
    sortField: ''
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
    this.setState({
      sortField: field
    })
    if(!this.state.sort || this.state.sort === 'asc') {
      this.setState({
        sort: 'desc'
      },() => {
        this.props.sortCoin(field, 'desc')
      })
    } else if(this.state.sort === 'desc') {
      this.setState({
        sort: 'asc'
      },() => {
        this.props.sortCoin(field, 'asc')
      })
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

  sortIcon (show, sort) {
    if(!show || !sort) return null
    return sort === 'desc'
    ? <Icon type="caret-down" />
    : <Icon type="caret-up" />
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
                    <th onClick={(e) => this.sortHandle(e, 'currentAmount')}>{UPEX.lang.template('最新价')}(TDW)
                      {
                        this.sortIcon(this.state.sortField==='currentAmount', this.state.sort)
                      }
                    </th>
                    <th onClick={(e) => this.sortHandle(e, 'changeRate')}>24h{UPEX.lang.template('涨跌')}
                      {
                        this.sortIcon(this.state.sortField==='changeRate', this.state.sort)
                      }  
                    </th>
                    <th onClick={(e) => this.sortHandle(e, 'volume')}>24h{UPEX.lang.template('成交量')}
                      {
                        this.sortIcon(this.state.sortField==='volume', this.state.sort)
                      }
                    </th>
                    <th>{UPEX.lang.template('收藏')}</th>
                  </tr>
                </thead>
              </table>
            </div>
            <div className="ant-table-body">
              { this.props.homeStore.isFetchingList == true ? <div className="mini-loading"></div> : null }
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
                      return (
                          <tr key={item.id}>
                          <td>
                            <Link to={`/trade/${item.baseCurrencyNameEn}_${item.currencyNameEn}`}>
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
                      )
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