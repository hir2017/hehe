import { observable, computed, autorun, action, runInAction } from 'mobx';
import { userLogout } from '../api/http';

class AuthStore {
	@observable uid = UPEX.cache.getCache('uid') || '';
	@observable token = UPEX.cache.getCache('token') || '';

	constructor() {
        var handler = autorun(() => {
        	if(this.uid) {
        		UPEX.cache.setCache('uid', this.uid);
        	} else {
        		UPEX.cache.removeCache('uid');
        	}

        	if (this.token) {
        		UPEX.cache.setCache('token', this.token);
        	} else {
        		UPEX.cache.removeCache('token');
        	}
        });
    }

	@computed
	get isLogin() {
		return this.uid && this.token;
	}

    @action
    checkLoginState() {
        return UPEX.cache.getCache('uid') && UPEX.cache.getCache('token');
    }

	@action
	update = (user)=>{
		this.token = user.token;
		this.uid = user.uid;
	}

	@action
	clear() {
		this.uid = '';
		this.token = '';
	}

	@action
	logout() {
		return userLogout().then((data)=>{
			if (data.status == 200) {
				runInAction('logout success', ()=>{
					this.clear();
				})
			}
			return data;
		})
	}
}

export default AuthStore;
