import CommonStore from './common';
import AuthStore from './auth';
import UserStore from './user';
import CaptchaStore from './captcha';
import AnnouncementStore from './announcement';
import HomeStore from './home';
import TradeStore from './trade';
import AccountStore from './account';
import OrderStore from './order';
import RechargeStore from './recharge'
import UserInfoStore from './userInfo';

class RootStore {
    constructor() {
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.captchaStore = new CaptchaStore(this);
        this.userStore = new UserStore(this);
        this.announcementStore = new AnnouncementStore(this);
        this.homeStore = new HomeStore(this);
        this.tradeStore = new TradeStore(this);
        this.accountStore = new AccountStore(this);
        this.orderStore = new OrderStore(this);
        this.rechargeStore = new RechargeStore(this);
        this.userInfoStore = new UserInfoStore(this);
    }
}

export default RootStore;