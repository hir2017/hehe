/**
 * 充币记录
 */
import { observable, computed, autorun, action, runInAction} from 'mobx';
import { getCoinWithdrawList } from '../api/http';
import TimeUtil from '../lib/util/date';
import NumberUtil from '../lib/util/number';

class CoinWithdrawRecordStore {
	@observable orderList = [];
    @observable current = 1; // 当前页数
    @observable total = 0; // 总页数
    @observable isFetching = false;

    pageSize = 10;

    constructor(stores) {
        this.commonStore = stores.commonStore;
        // this.params = {
        //     start: this.current,
        //     size: this.pageSize,
        //     beginTime: '2018-05-30',
        //     endTime: '2018-05-31',
        //     status: 0, // 0全部；1充值中；2充值成功；3充值失败
        //     currencyId: 0
        // }
        this.params = {
        	status: 0, // 0全部；1充值中；2充值成功；3充值失败
			start: this.current,
			size: this.pageSize,
			currentyId: 0,
			beginTime: '',
			endTime: ''
        }
    }

    @action
    getData(params = {}) {
        // 防止重复提交
        if (this.isFetching) {
            return;
        }

        this.isFetching = true;

        this.params = Object.assign(this.params, params);

        // 更新当前页数
        if (params.start && params.start !== this.current) {
            this.current = params.start;
        }

        getCoinWithdrawList(this.params).then((data) => {
            runInAction(() => {
                if (data.status == 200) {
                    this.orderList = this.parseData(data.attachment.list);
                    this.total = data.attachment.total;
                    this.isFetching = false;
                }
            })
        }).catch(() => {
            runInAction(() => {
                this.isFetching = false;
            })
        })
    }


    parseData(arr) {
        arr.forEach((item, index) => {
            item.id = this.current + '' + index;
            let _time = item.createTime;
            // TODO: 需要后端去掉.0
            if(_time && _time.indexOf('.0') !== -1) {
                _time = _time.replace('.0', '')
            }
            item.createTime = _time;
            // item.createTime = TimeUtil.formatDate(item.createTime, 'yyyy-MM-dd HH:mm:ss');
        })

        return arr;
    }
}

export default CoinWithdrawRecordStore;
