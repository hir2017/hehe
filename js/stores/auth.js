import { observable, computed, autorun, action} from 'mobx';

class AuthStore {
	@observable uid = UPEX.cache.getCache('uid') || '';
	@observable token = UPEX.cache.getCache('token') || '';

	constructor() {
        var handler = autorun(() => {
            UPEX.cache.setCache('uid', this.uid);
            UPEX.cache.setCache('token', this.token);
        });
    }

	@computed get isLogin() {
		return this.uid && this.token;
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
}

export default AuthStore;