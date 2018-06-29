import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getBannerList } from '../api/http';

class BannerStore {
    @observable list = [];
    @observable isLoading = false;

    @action
    fetch() {

        this.isLoading = true;

        getBannerList()
            .then((data) => {
                runInAction('get banner success', () => {
                    if (data.status == 200) {
                        this.list = data.attachment.banners;
                    }

                    this.isLoading = false;
                })
            }).catch((err) => {
                console.log('Error loading banner', err.message);
            })
    }
}

export default BannerStore;