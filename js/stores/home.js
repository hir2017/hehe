import { observable, computed, action, runInAction } from 'mobx';
import Select from 'antd';
import { addOptional, cancleOptional, listOptional } from '../api/http'
import { socket, baseCurrencyId } from '../api/socket';
import NumberUtil from '../lib/util/number';
import MarketListStore from './market';

class HomeStore {
    constructor(stores) {
        this.commonStore = stores.commonStore;
        this.marketListStore = new MarketListStore(stores);
    }

    @action
    getData() {
        this.marketListStore.getData();
    }
}

export default HomeStore;
