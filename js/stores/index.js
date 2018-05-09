import CommonStore from './common';
import AuthStore from './auth';
import UserStore from './user';
import CaptchaStore from './captcha';
import AnnounceStore from './announce';
import HomeStore from './home';

class RootStore {
    constructor() {
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.captchaStore = new CaptchaStore(this);
        this.userStore = new UserStore(this);
        this.announceStore = new AnnounceStore(this);
        this.homeStore = new HomeStore(this);
    }
}

export default RootStore;