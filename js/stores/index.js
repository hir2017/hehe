import CommonStore from './common';
import AuthStore from './auth';
import UserStore from './user';
import CaptchaStore from './captcha';
import HotMarketStore from './hotmarkets';
import AnnounceStore from './announce';

class RootStore {
    constructor() {
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.captchaStore = new CaptchaStore(this);
        this.userStore = new UserStore(this);
        this.hotMarketStore = new HotMarketStore(this);
        this.announceStore = new AnnounceStore();
    }
}

export default RootStore;