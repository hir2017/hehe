/**
 * 交易币小数位
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getCurrencyPoints } from '../api/http';

let isFirst = true;

class CurrencyStore {
    // 业务公用的数据
    @observable currencyList= [];
    @observable currencyDataReady = false;
    @observable currencyMap = {}; // { key:{}, key: {} } // 方便获取基础币信息 

    @action
    getCurrencyPoints() {
        if (!isFirst) {
            return;
        }
        this.currencyDataReady = false;

        getCurrencyPoints().then((data) => {
            runInAction('get all coin point', () => {
                if (data.status == 200) {
                    let  result = data.attachment;

                    this.currencyList = result;
                    this.currencyMap = this.parseCurrencyPoints(result);
                }

                this.currencyDataReady = true;
                isFirst = false;
            })

        }).catch(()=>{
            this.currencyDataReady = true;
        })
    }

    parseCurrencyPoints(list) {
        let map = {};

        for (let i = list.length; i--;) {
        	let item = list[i];
            map[item.baseCurrencyId + '-' + item.tradeCurrencyId] = list[i];
        }

        return map;
    }
    /**
     * 根据ID获取币信息
     */
    @action.bound
    getCurrencyById(key) {
        let ret = this.currencyMap[key] || {};

        return ret;
    }
}

export default CurrencyStore;