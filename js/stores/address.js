import { observable, computed, autorun, action } from 'mobx';
import { addCoinAddress } from '../api/http';
import md5 from '../lib/md5';

class AddressStore {    
    @observable address = ''; // 手机
    @observable note = ''; // 交易备注
    @observable pwd = ''; // 交易密码
    @observable currencyId = '';
    @observable validAddress = true;
    @observable validNote = true;
    @observable validPwd = true;

    constructor(stores) {
        this.authStore = stores.authStore;
    }

    // 检查密码是否合法
    @action
    checkPwd() {
        let ret = true;
        if (!this.pwd) {
            ret = false;
        }

        this.validPwd = ret;

        return ret;
    }

    // 检查地址
    @action
    checkAddress() {
        let ret = true;        
        if (!this.address) {
            ret = false;
        }

        this.validAddress = ret;

        return ret;
    }

    // 检查备注
    @action
    checkNote() {
        let ret = true;
        if (!this.note) {
            ret = false;
        }

        this.validNote = ret;

        return ret;
    }

    // 提交表单验证
    @computed 
    get verifyInfoBeforeSubmit() {
        let mode = this.mode;
        let result = {
            pass: true,
            message: ''
        };

        if (!this.checkPwd()) {
            result.pass = false;
            result.message = UPEX.lang.template('提币地址填写错误');
        } else if(!this.checkNote()) {
            result.pass = false;
            result.message = UPEX.lang.template('地址描述填写错误');
        } else if(!this.validNote()) {
            result.pass = false;
            result.message = UPEX.lang.template('交易密码填写错误');
        } 

        return result;
    }


    @action
    setAddress(value) {
        this.address = value;
    }

    @action
    setNote(value) {
        this.note = value;
    }

    @action
    setPwd(value) {
        this.pwd = value;
    }

    @action
    setCurrencyId(value) {
        this.currencyId = value;
    }

    @action 
    addCoinAddress(){
        let params = {
            address: this.address,
            note: this.node,
            fdPwd: md5(this.pwd + UPEX.config.config + this.authStore.uid),
            currencyId: this.currencyId
        }

        return addCoinAddress(params);
    }
}

export default AddressStore;