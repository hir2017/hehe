import { observable, autorun, computed, action } from 'mobx';
import { getAnnounceList } from './api';

class NewsStore {
    @observable list = [];
    @observable isLoading = false

    @action
    fetch(count) {

        this.isLoading = true;

        getAnnounceList(count)
            .then((data) => {
                data = require('../mock/notice.json');
                console.log(data)
                if (data.status == 200) {
                    this.list = data.attachment;
                }
                this.isLoading = false;
            }).catch((err) => {
                console.log('Error loading news', err.message);
            })
    }
}

export default NewsStore;