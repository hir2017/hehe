/**
 * 全局用户界面状态的store
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { socket } from '../api/socket';

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
    @observable allCoinPoint = [];
    @observable coinPointReady = false;

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
            document.title = UPEX.lang.template('页面标题');
        });
    }

    @computed get isTradeCenter() {
        return this.currentPathName.indexOf('/trade') > -1;
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
     * 币种列表、小数位点数
     */
    @action
    getAllCoinPoint() {
        let allCoinPoint = UPEX.cache.getCache('productlist');

        if (allCoinPoint) {
            this.allCoinPoint = allCoinPoint;
            this.coinPointReady = true;
            return;
        }

        socket.emit('coinPoint');

        socket.on('coinPoint', (data) => {
            // 有效期1小时
            if (data.status == 200) {

                UPEX.cache.setCache('productlist', data, 1 * 3600 * 1000);

                runInAction('get all coin point', () => {
                    this.allCoinPoint = data;
                    this.coinPointReady = true;
                })
            }
        })
    }

    @computed
    get productList() {
        let result = {};

        this.allCoinPoint.forEach((item, index) => {
            if (!result[item.baseCurrencyNameEn]) {
                result[item.baseCurrencyNameEn] = [];
            }

            result[item.baseCurrencyNameEn].push(item);
        })

        return result;
    }

    /**
     *
     */
    @action
    getTradeCoin(currencyId, baseCurrencyId) {
        let ret;

        let product = this.allCoinPoint.filter(function(item) {
            return item.currencyId === currencyId && item.baseCurrencyId === baseCurrencyId;
        })

        ret = product[0];

        return ret;
    }
    /**
     * 价格小数点后几位
     */
    @action
    getPointPrice(key, value) {
        let ret;

        key = key || 'currencyNameEn';

        let product = this.allCoinPoint.filter(function(item) {
            return item[key] === value;
        })[0];

        if (product) {
            ret = product.pointPrice;
        }

        return ret;
    }
    /**
     * 数量小数点后几位
     */
    @action
    getPointNum(key, value) {
        let ret;

        key = key || 'currencyNameEn';

        let product = this.allCoinPoint.filter(function(item) {
            return item[key] === value;
        })[0];

        if (product) {
            ret = product.pointNum;
        }

        return ret;
    }
}

export default CommonStore;