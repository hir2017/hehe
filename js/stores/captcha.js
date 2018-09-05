/**
 * 图片验证码
 * @author chenliying
 */
import { observable, action, runInAction } from 'mobx';
import { fetchIMGCaptcha } from '../api/http';

class CaptchaStore {
    // 图片验证码uuid
    @observable codeid = '';
    // 图片验证码imgurl
    @observable captcha = '';
    // 请求状态
    @observable isFetching = false;

    @action
    fetch() {
        // 防止一次性多次请求
        if (this.isFetching) {
            return;
        }

        this.isFetching = true;

        this.reset();

        fetchIMGCaptcha().then((data) => {
            runInAction('get pic captcha success', () => {
                if (data.status == 200) {
                    this.captcha = 'data:image/png;base64,' + data.attachment.IMGCode;
                    this.codeid = data.attachment.codeUUID;
                }
                this.isFetching = false;
            })
        }).catch((err) => {
            this.isFetching = false;
            // console.log('Error loading captcha', err.message);
        })
    }

    @action
    reset() {
        this.codeid = '';
        this.captcha = '';
    }
}

export default CaptchaStore;