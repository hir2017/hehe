const captchaIdCfg = {
	'register-login': 'c88c6015d79b4f26a3fbafae6bebe5c8',
	'modify-pwd': 'b0c4859cc2214bbdb4d54fb1f5e920d5'
}

class YidunCaptcha {
	/**
	 * cfg: {
		type: 'register-login', // register-login ; modify-pwd
		lang: '',
		verifySuccess: '',
		verifyFailure: ''
	 }
	 */
	constructor(cfg) {
		this.captchaIns = null;
		this.element = cfg.element || '#captcha';
		this.width = cfg.width || '320px';
		this.mode = cfg.mode || 'popup'; // float || popup
		this.captchaId = captchaIdCfg[cfg.type] || captchaIdCfg['register-login'];
		this.lang = cfg.lang || 'en';
	}

	init(verifySuccess, verifyFailure) {
		let self = this;

		initNECaptcha({
	        element: this.element,
	        captchaId: this.captchaId,
	        mode: this.mode,
	        width: this.width,
	        lang: this.lang,
	        onReady: function(instance) {
	            // 验证码一切准备就绪，此时可正常使用验证码的相关功能
	        },
	        onVerify: function(err, data) {
	            /**
	             * 第一个参数是err（Error的实例），验证失败才有err对象
	             * 第二个参数是data对象，验证成功后的相关信息，data数据结构为key-value，如下：
	             * {
	             *   validate: 'xxxxx' // 二次验证信息
	             * }
	             */
	            if (!err && data.validate) {
	              // 验证通过
	                // alert('进行登录操作');
	                if (typeof verifySuccess == 'function') {
	                	verifySuccess(data.validate, self.captchaId)	
	                }
	            } else {
	                // alert('验证失败');
	                if (typeof verifyFailure == 'function') {
	                	verifyFailure(data);
	                }
	            }
	        }
	    }, function onload(instance) {
	        // 初始化成功后得到验证实例instance，可以调用实例的方法
	    	self.captchaIns = instance;
	    }, function onerror(err) {
	       // 验证码初始化失败处理逻辑，例如：提示用户点击按钮重新初始化
	    })
	}

	show() {
		if (this.captchaIns) {
            this.captchaIns.refresh();
			this.captchaIns.popUp();
        }
	}
}

export default YidunCaptcha;