/**
 * 全局用户界面状态的store
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { socket } from '../api/socket';
import { getBaseCoin , getCurrencyPoints } from '../api/http';

const getWindowDimensions = () => {
    return {
        width: $(window).width(),
        height: $(window).height()
    }
}

class CommonStore {
    @observable currentPathName = '';
    // 当前语言
    @observable language = UPEX.cache.getCache('lang') || UPEX.config.defaultLanguage;
    // 页面主题。浅色：light；深色：dark
    @observable theme = 'dark';
    // 窗口尺寸
    @observable.struct windowDimensions = getWindowDimensions();
    // 业务公用的数据
    @observable productList = [];
    @observable productDataReady = false;
    @observable coinDataReady = false;
    @observable coinsMap = {}; // { key:{}, key: {} } // 方便获取基础币信息 
    @observable coinsMapId = {};

    constructor() {
        $(window).resize(() => {
            this.windowDimensions = getWindowDimensions();
        });

        var handler = autorun(() => {
            let lang = this.language;

            $('html').attr('lang', lang);
            $('html').attr('xml:lang', lang);

            UPEX.cache.setCache('lang', lang);
            UPEX.lang.language = lang;
            // 设置页面标题
            document.title = UPEX.lang.template('ACE王牌数字币交易');
        });
    }

    @computed get isTradeCenter() {
        return this.currentPathName.indexOf('/webtrade') > -1;
    }

    @action
    changeLanguageTo = (value) => {
        this.language = value
    }

    @action
    changeThemeTo = (value) => {
        this.theme = value
    }

    @action
    updatePathName = (url) => {
        this.currentPathName = url;
    }
    /**
     */
    @action
    getAllTradeCoinPoint() {
        this.coinDataReady = false;

        getCurrencyPoints().then((data) => {
            runInAction('get all coin point', () => {
                if (data.status == 200) {
                    
                }

                this.coinDataReady = true;
            })
        }).catch(()=>{
            this.coinDataReady = true;
        })
    }

    @action
    getAllCoinPoint() {

        this.productDataReady = false;

        // if (list) {
        //     this.productList = list;
        //     this.coinsMap = this.getCoinsMap(list);
        //     this.productDataReady = true;
        //     return;
        // }

        getBaseCoin().then((data) => {
            runInAction('get all coin point', () => {
                if (data.status == 200) {
                    let list = data.attachment;
                    
                    this.productList = list;
                    this.coinsMapId = this.getCoinsMapById(list);
                    this.coinsMap = this.getCoinsMapByName(list);
                    // UPEX.cache.setCache('productlist', list, 1 * 60 * 60 * 1000);  // 1小时
                }

                this.productDataReady = true;
            })
        }).catch(()=>{
            this.productDataReady = true;
        })
    }

    getCoinsMapById(list) {
        let map = {};

        for (let i = list.length; i--;) {
            map[list[i].currencyId] = list[i];
        }

        return map;
    }

    getCoinsMapByName(list) {
        let map = {};

        for (let i = list.length; i--;) {
            map[list[i].currencyNameEn] = list[i];
        }

        return map;
    }
    /**
     * 根据ID获取币信息
     */
    @action.bound
    getTradeCoinById(currencyId) {
        let ret = this.coinsMapId[currencyId] || {};

        return ret;
    }
    /**
     * 根据币名称获取币信息
     */
    @action.bound
    getTradeCoinByName(name) {
        return this.coinsMap[name] || {};
    }
    /**
     * 价格小数点后几位
     */
    @action.bound
    getPointPrice(name) {
        if (!name) {
            return ;
        }
        return Number(this.coinsMap[name].pointPrice);
    }
    /**
     * 数量小数点后几位
     */
    @action.bound
    getPointNum(name) {
        if (!name) {
            return ;
        }
        return Number(this.coinsMap[name].pointNum);
    }

    // 基础币TWD的价格
    @computed
    get pointPrice() {
        let point;

        let product = this.productList.filter(function(item) {
            return item.currencyNameEn === UPEX.config.baseCurrencyEn && item.baseType == 1;
        })[0]

        point = product.pointPrice;
        
        return point;
    }

    // 基础币TWD的数量
    @computed
    get pointNum() {
        let point;

        let product = this.productList.filter(function(item) {
            return item.currencyNameEn === UPEX.config.baseCurrencyEn && item.baseType == 1;
        })[0]

        point = product.pointNum;
        
        return point;
    }
}

export default CommonStore;