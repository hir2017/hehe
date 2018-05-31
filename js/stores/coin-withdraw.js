import { observable, computed, autorun, action, runInAction } from 'mobx';
import { takeCoinSendPhoneCode, takeCoinSendEmailCode, takeCoin, getTakeCoinInfo } from '../api/http';

class CoinWithdrawStore {
    @observable addressList = [];
    @observable amountLowLimit = 0;
    @observable takeCoinInfo = {
        detail: {},
        resp: {}
    };

    @action
    getTakeCoinInfo(currencyId) {
        getTakeCoinInfo(currencyId)
            .then((data) => {
                data = require('../mock/coin-info.json');
                runInAction(() => {
                    if (data.status == 200) {
                        this.takeCoinInfo = data.attachment;
                        this.addressList = data.attachment.resp.addressList;
                        this.amountLowLimit = data.attachment.detail.amountLowLimit;
                        this.addressList = [{
                            address: '33'
                        }, {
                            address: '44'
                        }];
                    }
                })
            })
    }
    /**
     * 提币
     */
    @action
    takeCoin() {

    }

    /**
     * 
     */
}

export default CoinWithdrawStore;