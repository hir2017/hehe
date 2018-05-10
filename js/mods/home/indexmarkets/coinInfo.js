/**
 * @fileoverview 首页币种信息
 * @author xia xiang feng
 * @date 2018-05-09
 */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Line from './chart'
import klineCoin from '../../../../images/kline-coin.jpg'

class CoinInfo extends Component {
  render() {
    return (
      <div>
        <div className="coinInfo-title">
          {UPEX.lang.template('货币行情')}
        </div>
        <div className="coinInfo-content">
          <div>
            <span className="coinInfo-content-name-box">
              <span>BTC</span>
              <span>0.01613939</span>
            </span>
            <span className="coinInfo-content-percent">+6.31%</span>
          </div>
          <div className="coinInfo-content-item">
            <span>
              <span className="coinInfo-content-lable">{UPEX.lang.template('成交量')}</span>
              <span>11.67</span>
            </span>
            <span>
              <span className="coinInfo-content-lable">24h{UPEX.lang.template('最高价')}</span>
              <span>11.67</span>
            </span>
          </div>
          <div className="coinInfo-content-item">
            <span>
              <span className="coinInfo-content-lable">{UPEX.lang.template('成交额')}</span>
              <span>11.67</span>
            </span>
            <span>
              <span className="coinInfo-content-lable">24h{UPEX.lang.template('低高价')}</span>
              <span>11.67</span>
            </span>
          </div>
        </div>
        <div className="coinInfo-line">
          <div className="coinInfo-line-title">
            <span>{UPEX.lang.template('实时行情')}</span>
            <span>
              <img src={klineCoin} />
              {UPEX.lang.template('K线')}
            </span>
          </div>
          <div>
            <Line/>
          </div>
        </div>
      </div>
    );
  }
}

export default CoinInfo;