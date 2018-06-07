/**
 * 全局用户界面状态的store
 */
import { observable, autorun, computed, action, runInAction } from 'mobx';
import { socket } from '../api/socket';
import { getBaseCoin } from '../api/http';

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
    
    coinsMap = {}; // { key:{}, key: {} } // 方便获取基础币信息 

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
     * 币种列表、以及币种对应的小数位点数
     * 按数字币的权重排序
     * TODO 基础信息缓存
     */
    @action
    getAllCoinPoint() {
        let list = UPEX.cache.getCache('productlist');

        this.productDataReady = false;

        if (list) {
            this.productList = list;
            this.coinsMap = this.getCoinsMap(list);
            this.productDataReady = true;
            return;
        }

        getBaseCoin().then((data) => {
            runInAction('get all coin point', () => {
                if (data.status == 200) {
                    let list = data.attachment;
                    
                    this.productList = list;
                    this.coinsMap = this.getCoinsMap(list);
                    UPEX.cache.setCache('productlist', list, 8 * 3600 * 1000);  // 8小时
                    
                }
                this.productDataReady = true;
            })
        }).catch(()=>{
            this.productDataReady = true;
        })
    }

    @action
    getCoinsMap(list) {
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
        let ret;

        let product = this.productList.filter(function(item) {
            return item.currencyId === currencyId;
        })

        ret = product[0];

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
        return Number(this.coinsMap[name].pointPrice);
    }
    /**
     * 数量小数点后几位
     */
    @action.bound
    getPointNum(key, value) {
        return Number(this.coinsMap[name].pointNum);
    }
}

export default CommonStore;