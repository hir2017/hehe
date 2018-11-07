import { observable, action, computed, runInAction } from 'mobx';
import TimeUtil from '../lib/util/date';

import { getRefuseReason } from '@/api/http';



class Util {
    @observable
    submit_loading = false;




    constructor(stores) {
        // super(stores);
    }



    // 获取用户行为限制
    @action
    getRefuseReason(id) {
        return getRefuseReason(id).then(res => {
            let str = '';
            if(res.status === 200) {
                str = res.attachment.reason;
            } else {
                console.error('getRefuseReason', res.message);
            }
            return str;
        }).catch(err => {
            console.error('getRefuseReason', err);
            return '';
        })
    }


    @computed
    get authLevel() {
        let level = '';

        if (this.userInfo) {
            switch (this.userInfo.authLevel) {
                case 1:
                    level = 'A';
                    break;
                case 2:
                    level = 'B';
                    break;
                case 3:
                    level = 'C';
                    break;
                default:
                    level = '';
            }
        }

        return level;
    }


}

export default Util;
