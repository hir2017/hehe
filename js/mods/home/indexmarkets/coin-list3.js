/**
 * @fileoverview 首页币种列表
 * @author xia xiang feng
 * @date 2018-05-09
 */

import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Input, Icon, Checkbox } from 'antd';
import Table from './table'

@inject('homeStore')
@observer
class CoinList extends Component {

    constructor() {
        super()
        this.changeHandle = this.changeHandle.bind(this)
        this.collectHandle = this.collectHandle.bind(this)
    }

    state = {
        checked: false
    }

    changeHandle(e) {
        this.props.filterCoin(e.target.value)
    }

    collectHandle(e) {
        this.setState({
            checked: !this.state.checked
        }, () => {
            this.props.homeStore.filterCollectCoins(this.state.checked);
        })
    }


    render() {
        const { checked } = this.state

        return (
            <div className="coin-list">
              <div className="coin-list-title">
                <span>
                  <Checkbox onChange={this.collectHandle}>
                    {UPEX.lang.template('只看收藏')}
                  </Checkbox>
                </span>
                <span>
                  <Input
                    onChange={this.changeHandle}
                    placeholder={UPEX.lang.template('搜索数字币')}
                    prefix={<Icon type="search" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  />
                </span>
              </div>
              <div>
                <Table sortCoin={this.props.sortCoin} coins={this.props.coins}/>
              </div>
            </div>
        );

    }
}

export default CoinList;