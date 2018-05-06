/**
 * 图片验证码
 */
import { observable, action } from 'mobx';
import { fetchPicCaptcha } from './api';

class CaptchaStore {
	@observable codeid = ''; // 图片验证码uuid
	@observable captcha = ''; // 图片验证码    

	@action
    fetch(){
        fetchPicCaptcha()
            .then((data) => {
                this.captcha = 'data:image/png;base64,' + data.attachment.IMGCode;
                this.codeid = data.attachment.codeUUID;
            })
    }
}

export default CaptchaStore;