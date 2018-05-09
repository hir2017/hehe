import { observable, autorun, computed, action } from 'mobx';
import { getAnnounceList, getAnnounceDetail } from '../api/http';
import NumberUtil from '../lib/util/number';

class AnnouncementStore {
    @observable list = [];
    @observable isLoading = false; 
    @observable detail = {};   

    @action
    fetch(count) {

        this.isLoading = true;

        getAnnounceList(count)
            .then((data) => {
                data = require('../mock/notice.json');
                
                if (data.status == 200) {
                    this.list = data.attachment;
                }

                this.isLoading = false;
            }).catch((err) => {
                console.log('Error loading announcement', err.message);
            })
    }

    @action
    fetchInfo(id) {
        getAnnounceDetail(id)
            .then((data)=>{
                data = require('../mock/notice-detail.json');

                if ( data.status == 200) {
                    this.detail = data.attachment;
                }
                console.log('getAnnounceDetail', data);
            })
    }

    @computed 
    get getLength() {
        return this.list.length;
    }

    @computed 
    get formatedList() {
        return NumberUtil.splitData(this.list, 3);
    }
}

export default AnnouncementStore;