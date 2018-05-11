/**
 * 全局用户界面状态的store
 */
import { observable, autorun, computed, action} from 'mobx';

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
    updatePathName = (url)=>{
        this.currentPathName = url;
    }
}

export default CommonStore;