/**
 * 全局用户界面状态的store
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { socket } from '../api/socket';
import { getBaseCoin , getCurrencyPoints } from '../api/http';
let isFirst = true;

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
    // 窗口尺寸
    @observable.struct windowDimensions = getWindowDimensions();
    // 业务公用的数据
    @observable productList = [];
    @observable productDataReady = false;

    constructor() {
        $(window).resize(() => {
            this.windowDimensions = getWindowDimensions();
        });
        // 切换zendesk语言
        // TODO: 临时方案
        setTimeout(() => {
            try {
                zE && zE(function() {
                    zE.setLocale(UPEX.cache.getCache('lang'));
                });
            } catch (error) {
                console.error('commonStore', error);
            }
        }, 500);
        var handler = autorun(() => {
            let lang = this.language;

            $('html').attr('lang', lang);
            $('html').attr('xml:lang', lang);
            UPEX.cache.setCache('lang', lang);
            UPEX.lang.language = lang;
            // 设置页面标题
            document.title = UPEX.lang.template('PageTitle');
            // 切换zendesk语言
            setTimeout(() => {
                try {
                    zE(function() {
                        zE.setLocale(lang);
                    });
                } catch (error) {
                    console.error('commonStore', error);
                }
            }, 500);

        });


    }

    @computed get isTradeCenter() {
        return this.currentPathName.indexOf('/webtrade') > -1;
    }

    @computed get pageClassName() {
        if (this.currentPathName.indexOf('/webtrade') > -1) {
            return 'app-trade';
        } else if (this.currentPathName.indexOf('/news') > -1){
            return 'app-news';
        } else {
            return '';
        }
    }

    @action
    changeLanguageTo = (value) => {
        this.language = value
    }

    @action
    updatePathName = (url) => {
        this.currentPathName = url;
    }

    @action
    getCoinInfo(val, type = 'name') {
        let field = type === 'name' ? 'coinsMap' : 'coinsMapId'
        return this[field][val] || {};
    }

    @action
    getAllCoinPoint() {
        if (!isFirst) {
            return;
        }
        this.productDataReady = false;

        // if (list) {
        //     this.productList = list;
        //     this.coinsMap = this.getCoinsMap(list);
        //     this.productDataReady = true;
        //     return;
        // }

        return getBaseCoin().then((data) => {
            runInAction('get all coin point', () => {
                if (data.status == 200) {
                    let list = data.attachment;

                    this.productList = list;
                    this.coinsMapId = this.getCoinsMapById(list);
                    this.coinsMap = this.getCoinsMapByName(list);
                    // UPEX.cache.setCache('productlist', list, 1 * 60 * 60 * 1000);  // 1小时

                    isFirst = true; // 第一次成功
                }

                this.productDataReady = true;
            })
            return data;
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
    @action.bound getTradeCoinById(currencyId) {
        let ret = this.coinsMapId[currencyId] || {};

        return ret;
    }
    /**
     * 根据币名称获取币信息
     */
    @action.bound getTradeCoinByName(name) {
        return this.coinsMap[name] || {};
    }
    /**
     * 价格小数点后几位
     */
    @action.bound getPointPrice(name) {
        if (!name) {
            return ;
        }
        return Number(this.coinsMap[name].pointPrice);
    }
    /**
     * 数量小数点后几位
     */
    @action.bound getPointNum(name) {
        if (!name) {
            return ;
        }
        return Number(this.coinsMap[name].pointNum);
    }

    // 基础币TWD的价格
    @computed get pointPrice() {
        let point;

        let product = this.productList.filter(function(item) {
            return item.currencyNameEn === UPEX.config.baseCurrencyEn && item.baseType == 1;
        })[0]

        point = product.pointPrice;

        return point;
    }

    // 基础币TWD的数量
    @computed get pointNum() {
        let point;

        let product = this.productList.filter(function(item) {
            return item.currencyNameEn === UPEX.config.baseCurrencyEn && item.baseType == 1;
        })[0]

        point = product.pointNum;

        return point;
    }
}

export default CommonStore;
