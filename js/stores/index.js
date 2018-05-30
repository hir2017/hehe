import CommonStore from './common';
import AuthStore from './auth';
import UserStore from './user';
import CaptchaStore from './captcha';
import AnnouncementStore from './announcement';
import HomeStore from './home';
import TradeStore from './trade';
import AccountStore from './account';
import TradePwdStore from './tradepwd';
import OrderOpenStore from './order-open';
import OrderHistoryStore from './order-history';
import OrderSuccessStore from './order-success';
import RechargeStore from './recharge';
import UserInfoStore from './userInfo';

class RootStore {
    constructor() {
        /**
         * 基础store
         */
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.captchaStore = new CaptchaStore(this);
        this.tradePwdStore = new TradePwdStore(this);
        /**
         * 页面级store
         */
        this.userStore = new UserStore(this);
        this.announcementStore = new AnnouncementStore(this);
        this.homeStore = new HomeStore(this);
        this.tradeStore = new TradeStore(this);
        this.accountStore = new AccountStore(this);
        this.rechargeStore = new RechargeStore(this);
        this.userInfoStore = new UserInfoStore(this);
        this.openStore = new OrderOpenStore(this);
        this.historyStore = new OrderHistoryStore(this);
        this.successStore = new OrderSuccessStore(this);

    }
}

export default RootStore;