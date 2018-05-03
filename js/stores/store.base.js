/**
 * 封装请求数据API。备用
 */
class StoreBase {
    /**
     * 发送请求
     */
    fetch({ url = '', data = {}, type = 'GET', dataType = 'json', timeout = 10000 } = {}) {
        data.t = new Date().getTime();

        let promise = $.ajax({
            url: url,
            data: data,
            type: type,
            dataType: dataType,
            timeout: timeout
        });

        // 请求成功
        promise.done((res) => {
            // ... success do something
        });

        return promise;
    }
};

export default StoreBase;