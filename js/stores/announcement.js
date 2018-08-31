import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getAnnounceList, getAnnounceDetail } from '../api/http';
import NumberUtil from '../lib/util/number';
import TimeUtil from '@/lib/util/date';

class AnnouncementStore {
    @observable list = [];
    @observable isLoading = false;
    @observable detail = {};

    @action
    fetch(count) {

        this.isLoading = true;

        getAnnounceList(count)
            .then((data) => {
                runInAction('get announcement success', () => {

                    this.list = data.attachment ? data.attachment.list.map(item => {
                        item.publishTime = TimeUtil.formatDate(item.publishTime);
                        return item;
                    }) : [];

                    this.isLoading = false;
                })
            }).catch((err) => {
                // console.log('Error loading announcement', err.message);
            })
    }

    @action
    fetchInfo(id) {
        getAnnounceDetail({
            announceId: id
        }).then((data) => {
                runInAction('get announcement detail success', () => {
                    if (data.status == 200) {
                        this.detail = data.attachment;
                    }
                })
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
