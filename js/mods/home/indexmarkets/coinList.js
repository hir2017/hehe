/**
 * @fileoverview 首页币种列表
 * @author xia xiang feng
 * @date 2018-05-09
 */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Icon } from 'antd';
import Table from './table'

class CoinList extends Component {

  constructor () {
    super()
    this.changgeHandle = this.changgeHandle.bind(this)
  }

  changgeHandle (e) {
    this.props.filterCoin(e.target.value)
  }

  render() {
    return (
      <div className="coin-list">
        <div className="coin-list-title">
          <span>
            <input type="checkbox" /> {UPEX.lang.template('只看收藏')}
          </span>
          <span>
            <Input
              onChange={this.changgeHandle}
              placeholder={UPEX.lang.template('搜索数字币')}
              prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
            />
          </span>
        </div>
        <div>
          <Table coins={this.props.coins}/>
        </div>
      </div>
    );
  }
}

export default CoinList;