/**
 * @fileoverview 首页币种信息
 * @author xia xiang feng
 * @date 2018-05-09
 */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router'
import Line from './chart'
import klineCoin from '../../../../images/kline-coin.jpg'

@inject('homeStore')
@observer
class CoinInfo extends Component {
  render() {
    const coin = this.props.homeStore.coin
    return (
      <div>
        <div className="coinInfo-title">
          {UPEX.lang.template('货币行情')}
        </div>
        <div className="coinInfo-content">
          <div>
            <span className="coinInfo-content-name-box">
              <span>{coin.currencyNameEn}</span>
              <span>{coin.currentAmount}</span>
            </span>
            <span className={ coin.changeRate > 0 
              ? 'coinInfo-content-percent greedBgc' 
              : 'coinInfo-content-percent redBgc' }
              >
              {coin.changeRate}%
            </span>
          </div>
          <div className="coinInfo-content-item">
            <span>
              <span className="coinInfo-content-lable">{UPEX.lang.template('成交量')}</span>
              <span>{coin.volume}</span>
            </span>
            <span>
              <span className="coinInfo-content-lable">24h{UPEX.lang.template('最高价')}</span>
              <span>{coin.highPrice}</span>
            </span>
          </div>
          <div className="coinInfo-content-item">
            <span>
              <span className="coinInfo-content-lable">{UPEX.lang.template('成交额')}</span>
              <span>{coin.amount}</span>
            </span>
            <span>
              <span className="coinInfo-content-lable">24h{UPEX.lang.template('最低价')}</span>
              <span>{coin.lowPrice}</span>
            </span>
          </div>
        </div>
        <div className="coinInfo-line">
          <div className="coinInfo-line-title">
            <span>{UPEX.lang.template('实时行情')}</span>
            <span>
              <Link to={`/trade/${coin.baseCurrencyNameEn}_${coin.currencyNameEn}`}>
                <img src={klineCoin} />
                {UPEX.lang.template('K线')}
              </Link>
            </span>
          </div>
          <div>
            <Line hours24TrendList={coin.hours24TrendList}/>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinInfo;