import CommonStore from './common';
import CurrencyStore from './currency-point';
import AuthStore from './auth';
import LoginStore from './login';
import CaptchaStore from './captcha';
import AnnouncementStore from './announcement';
import HomeStore from './home';
import BannerStore from './banner';
import TradeStore from './trade';
import AccountStore from './account';
import TradePwdStore from './tradepwd';
import OrderOpenStore from './order-open';
import OrderHistoryStore from './order-history';
import OrderSuccessStore from './order-success';
import AddressStore from './address';
import UserInfoStore from './userInfo';
import CoinRechargeRecordStore from './coin-recharge-record';
import CoinWithdrawRecordStore from './coin-withdraw-record';
import CoinWithdrawStore from './coin-withdraw';
import FiatRechargeStore from './fiat-recharge';
import FiatWithdrawStore from './fiat-withdraw';
import FundChangeRecordStore from './fund-change-record';

class RootStore {
    constructor() {
        /**
         * 基础store
         */
        this.commonStore = new CommonStore(this);
        this.authStore = new AuthStore(this);
        this.currencyStore = new CurrencyStore();
        this.captchaStore = new CaptchaStore(this);
        this.tradePwdStore = new TradePwdStore(this);
        /**
         * 页面级store
         */
        this.loginStore = new LoginStore(this);
        this.announcementStore = new AnnouncementStore(this);
        this.homeStore = new HomeStore(this);
        this.bannerStore = new BannerStore(this);
        this.openStore = new OrderOpenStore(this);
        this.historyStore = new OrderHistoryStore(this);
        this.successStore = new OrderSuccessStore(this);
        
        this.tradeStore = new TradeStore(this);
        this.accountStore = new AccountStore(this);
        this.userInfoStore = new UserInfoStore(this);
        this.coinRechargeRecordStore = new CoinRechargeRecordStore(this);
        this.coinWithdrawRecordStore = new CoinWithdrawRecordStore(this);
        this.coinWithdrawStore = new CoinWithdrawStore(this);
        this.fiatRechargeStore = new FiatRechargeStore(this);
        this.fiatWithdrawStore = new FiatWithdrawStore(this);
        this.addressStore = new AddressStore(this);
        this.fundChangeRecordStore = new FundChangeRecordStore(this);
    }
}

export default RootStore;
