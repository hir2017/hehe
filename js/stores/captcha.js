/**
 * 图片验证码
 */
import { observable, action, runInAction } from 'mobx';
import { fetchPicCaptcha } from '../api/http';

class CaptchaStore {
    @observable codeid = ''; // 图片验证码uuid
    @observable captcha = ''; // 图片验证码    

    @action
    fetch() {
        fetchPicCaptcha()
            .then((data) => {
                runInAction('get pic captcha success', () => {
                    if (data.status == 200) {
                        this.captcha = 'data:image/png;base64,' + data.attachment.IMGCode;
                        this.codeid = data.attachment.codeUUID;
                    }
                })
            })
    }
}

export default CaptchaStore;