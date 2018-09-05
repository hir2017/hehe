/**
 * 交易币小数位
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getCurrencyPoints } from '../api/http';

let isFirst = true;

class CurrencyStore {
    // 业务公用的数据
    @observable currencyList = [];
    @observable currencyDataReady = false;
    @observable currencyMap = {}; // { key:{}, key: {} } // 方便获取基础币信息 
    @observable currencyRelationMap = {};

    /**
     * 获取所有币种数据
     */
    @action getAllCurrencyRelations() {
        if (!isFirst) {
            return;
        }

        this.currencyDataReady = false;

        getCurrencyPoints().then((data) => {
            runInAction('get all coin relation', () => {
                if (data.status == 200) {
                    data = data.attachment || [];

                    let currencyRelationMap = {}; // 'TWD_BTC': {}, 'TWD_ETH': {}
                    let currencyMap = {}; // "1_2": {}, "1_3": {}

                    for (var i = data.length - 1; i >= 0; i--) {
                        let item = data[i];
                        let key = [item.baseCurrencyNameEn, item.tradeCurrencyNameEn].join('_');
                        let idKey = [item.baseCurrencyId, item.tradeCurrencyId].join('_');

                        // for test，最后要删除掉
                        item.pointNum = item.pointNum || 4;
                        item.pointPrice = item.pointPrice || 4;

                        currencyRelationMap[key] = item;
                        currencyMap[idKey] = item
                    }

                    this.currencyRelationMap = currencyRelationMap;
                    this.currencyMap = currencyMap;

                    this.dataReady = true;
                }

                this.currencyDataReady = true;
                isFirst = false;
            })
        }).catch(() => {
            this.currencyDataReady = true;
        })
    }


    parseCurrencyPoints(list) {
        let map = {};

        for (let i = list.length; i--;) {
            let item = list[i];
            let key = item.baseCurrencyId + '-' + item.tradeCurrencyId;

            map[key] = list[i];
        }

        return map;
    }
    /**
     * 根据ID获取币信息
     */
    @action.bound getCurrencyById(key) {
        let ret = this.currencyMap[key] || {};

        return ret;
    }

    @action.bound getCurrencyByPair(key) {
        let ret = this.currencyRelationMap[key] || {};

        return ret;
    }
}

export default CurrencyStore;