/**
 * 交易密码
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getPersonalTradingPwd } from '../api/http';
import md5 from '../lib/md5';

class TradePwd {
    @observable tradePasswordStatus = 2; // 交易.  1：需要交易密码；2：不需要交易密码
    @observable tradePassword = '';

    constructor(stores) {
        this.authStore = stores.authStore;
    }
     /**
     *  获取用户交易密码设置状态
     */
    @action
    getPersonalTradingPwd() {
        getPersonalTradingPwd().then((data) => {
            runInAction(()=>{
                if (data.status ==  200) {
                    this.tradePasswordStatus = data.attachment.enabled; // 1: 启用 ; 2: 不启用        
                }
            })
        })
    }

    @action
    setTradePassword(password) {
        this.tradePassword = password;
    }

    @computed
    get md5TradePassword(){
        return md5(this.tradePassword + UPEX.config.dealSalt + this.authStore.uid);
    }
}

export default TradePwd;