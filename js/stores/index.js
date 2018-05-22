import CommonStore from './common';
import AuthStore from './auth';
import UserStore from './user';
import CaptchaStore from './captcha';
import AnnouncementStore from './announcement';
import HomeStore from './home';
import TradeStore from './trade';
import AssetsStore from './assets';
import OrderStore from './order';

class RootStore {
    constructor() {
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.captchaStore = new CaptchaStore(this);
        this.userStore = new UserStore(this);
        this.announcementStore = new AnnouncementStore(this);
        this.homeStore = new HomeStore(this);
        this.tradeStore = new TradeStore(this);
        this.assetsStore = new AssetsStore(this);
        this.orderStore = new OrderStore(this);
    }
}

export default RootStore;