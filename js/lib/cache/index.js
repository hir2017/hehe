/**
 * 本地缓存组件
 * 本地存储的技术方案：
   1、localStorage
        只考虑localStorage的存储方式，不考虑cookie方式。原因：
        （1）cookie 存储上限只有 4KB，且会加重网络负担，cookie 会被发送到作用域之内的所有http请求，包括js请求，css请求，图片请求，很多异步的请求
        （2）localStorage 存储上线是5MB   
   2、组件规范
        （1）数据存储格式
            旧的游戏：prefix/env/ppuid/gameType/key
            新的游戏：prefix/env/openId/gameType/key
        （2）prefix
            key前缀。默认是ppcache
            如果同一款游戏，后期做推广，gameType或者用户openId(即appid)与自家版相同，推荐prefix改为package name
        （3）key
            存储数据的字段名
            推荐使用驼峰格式（首字母小写其他词首大写），如myFieldName
        （4）expires：-1
            有效期配置
            单位：毫秒
            -1  ：永久保存
            > 0 ：有设置有效期

 * 使用说明
    @method
        检测localstorage是否可用
            isEnable() // ==> true/false
        如果使用规范存储的字段格式，使用方法
            setCache(key, value, expires)
            getCache(key)
            removeCache(key)
        原生的自定义，存储的字段名，不遵循（prefix/env/XXX/gameType/key）格式；try()catch(e){}
            setItem(key, value, expires) // 设置；当存储到达上限之后，该方法不可用
            getItem(key)       // 获取
            removeItem(key)    // 清除
            getAll()           // 获取所有
            clear()            // 清除所有

 * @author 陈立英
 * @example 
 *      var cache = new Cache({
            prefix: 'knowme',
            gameType: 'knowme',
            uid: '123456'
        });

 */
class Cache {
    constructor(cfg) {
        this.options = Object.assign({
            prefix: 'ppcache', // 数据存储 key 的前缀，默认是ppcache。
            gameType: '', // 游戏类型，例如knowme
            uid: '', // 用户信息，新游戏是openId, 旧游戏是ppuid
            data: {}, // 存储缓存数据 data: {data: value, expires: 0}
            expires: -1, // 有效期，默认则为永久，单位毫秒
        }, cfg);

        this.enable = false;

        this.isEnable();
    }

    /**
     * 设置本地缓存
     * @name set
     * @param key {String} 存储key
     * @param value {string| JSON Object} 存储内容。value会序列化
     * @param expires {Number} 单位毫秒 内容有效期设置，不设置则为永久缓存
     * @example     
     *      cache.set(key, value, expires);
     */
    setCache(key, value, expires) {
        var name = this.getLocalKey(key);
        this.setItem(name, value, expires);
    }
    /**
     * 获取本地缓存
     * @name get
     * @param {string| JSON Object} 数据字段名。
     * @example
     *      cache.get(key);
     */
    getCache(key) {
        var name = this.getLocalKey(key);
        return this.getItem(name);
    }
    /**
     * 移除本地缓存的数据'key'
     * @name remove
     */
    removeCache(key) {
        var name = this.getLocalKey(key);
        this.removeItem(name);
    }
    /**
     * 获取本地缓存的key
     */
    getLocalKey(key) {
        var prefix = this.options.prefix,
            ret = [];
        var gameType = this.options.gameType || '';
        var uid = this.options.uid || '';
        var env;
        
        if (!env || env == 'null') {
            env = 'pro';
        }

        if (prefix !== '') {
            ret.push(prefix);
        }

        if (env !== '') {
            ret.push(env);
        }

        if (uid !== '') {
            ret.push(uid);
        }

        if (gameType !== '') {
            ret.push(gameType);
        }


        if (key !== '') {
            ret.push(key);
        }

        return ret.join('/');
    }
    /**
     * 序列化工具方法
     * @name serialize
     */
    serialize(value) {
        return JSON.stringify(value)
    }
    /**
     * 反序列化工具方法
     * @name deserialize
     */
    deserialize(value) {
        if (typeof value != 'string') {
            return undefined;
        }
        try {
            return JSON.parse(value)
        } catch (e) {
            return value || undefined;
        }
    }
    /**
     * 判断key是否失效
     * @return {Boolean}  true 无效； false未失效
     */
    isExpire(time) {
        if (time > 0) {
            return new Date().getTime() > Number(time);
        } else {
            return false;
        }
    }
    /**
     * 设置混存数据
     */
    setItem(key, value, expires) {
        var expires = expires || this.options.expires;
        var curStamp = +new Date;
        var newValue;
        try {
            // 存储设置的本地数据
            if (expires > 0) {
                newValue = {
                    data: value,
                    expires: curStamp + expires
                };
            } else {
                newValue = value;
            }
            newValue = this.serialize(newValue);
            localStorage.setItem(key, newValue);
        } catch (e) {
            // this.clear();
        }
    }
    /**
     * 获取缓存数据
     */
    getItem(key) {
        var ret = null;

        try {
            var ret = localStorage.getItem(key);
            var opt = this.deserialize(ret);
            var isExpire = this.isExpire(opt.expires);
            // 已经失效
            if (isExpire) {
                ret = null;
                this.removeItem(key);
            } else {
                return opt.expires > 0 ? opt.data : opt;
            }
        } catch (e) {}
    }
    /**
     * 清除全部数据
     */
    clear() {
        try {
            localStorage.clear();
        } catch (e) {

        }
    }
    /**
     * 移除数据key
     */
    removeItem(key) {
        try {
            localStorage.removeItem(key);
        } catch (e) {

        }
    }
    /**
     * 获得所有的本地缓存信息
     */
    getAll() {
        var ret = {}
        try {
            for (var i = 0; i < localStorage.length; ++i) {
                var key = localStorage.key(i)
                ret[key] = this.getItem(key);
            }
        } catch (e) {

        }
        return ret
    }
    /**
     * 浏览器是否支持localStorage。当存储达到上限值后。lcoalStorage.setItem()方法不可用
     * @return { Boolean } 如果浏览器支持 则返回 true, 否则返回 false.
     *  @example
     *      cache.isEnable() => true
     */
    isEnable() {
        var name = '__localStorageTest__';
        try {
            if ('localStorage' in win && win['localStorage'] && localStorage.setItem && localStorage.getItem) {

                localStorage.setItem(name, name);

                if (localStorage.getItem(name) == name) {
                    this.enable = true;
                }
                localStorage.removeItem(name)
            }
        } catch (e) {}

        return this.enable;
    }

}


export default Cache;