import { takeCoinSendPhoneCode, takeCoin, getTakeCoinInfo } from '../../api/http';
import { message } from 'antd';
import Timer from '../../lib/timer';

export default (store) => {
    return {
    	initWithdrawCoin(coinInfo) {
    		store.reset();

    		store.updateCurrentCoin({
            	currencyId: coinInfo.currencyId,
            	currencyNameEn: coinInfo.currencyNameEn
            });

            store.getTakeCoinInfo(coinInfo.currencyId);
    	},

        selectWithdrawCoin(value) {
        	this.initWithdrawCoin({
        		currencyId: value.key,
                currencyNameEn: value.label
        	});
        },

        selectChangeAddress(value){
        	let address = value;
        	let note = store.getNoteByAddress(address);
            store.defaultAddress.address = value;
        	store.setAddress(address);
        	store.setNote(note);
        },

        changeAuthTypeTo(type){
            if (type == 'google') {
                store.setPhoneCode('');
            } else {
                store.setGoogleCode('');
            }
            store.changeAuthTypeTo(type);
        },

        // 输入框选择
        onChangeInput(e) {
            let target = $(e.currentTarget);
            let key = target.attr('data-key');
            let value = target.val().trim();

            switch (key) {
                case 'address':
                    store.setAddress(value);
                    break;
                case 'note':
                    store.setNote(value);
                    break;
                case 'amount':
                    store.setAmount(value);
                    break;
                case 'vercode':
                    store.setVercode(value);
                    break;
                case 'tradepwd':
                    store.setTradePassword(value);
                    break;
                case 'googlecode':
                    store.setGoogleCode(value);
                    break;
                case 'phonecode':
                    store.setPhoneCode(value);
                    break;
            }
        },
        /**
         * 填写邮箱验证码
         */
        sendEmailPhoneCode(e) {
            if (!store.vercode) {
                store.changeImgCodeTo(false);
                return;
            }

            if (store.sendingcode) {
            	return;
            }

            // 邮件验证码
            takeCoinSendPhoneCode({
            	type: 2,
	            vercode: store.vercode,
	            codeid: store.captchaStore.codeid,
	        }).then((data) => {
                switch (data.status) {
                    case 200:
                        // 发送成功
                        let timer = this.timer = new Timer({
                            remainTime: 60,
                            isDoubleBit: true,
                            selector: {
                                second: '[data-second]'
                            }
                        });

                        this.timer.on('end', () => {
                            store.changeSendingCodeTo(false);
                        });

                        store.changeSendingCodeTo(true);
                        store.changeImgCodeTo(true);
                        break;
                    case 412:
                        // 图片验证码错误
                        message.error(data.message);
                        store.changeImgCodeTo(false);
                        break;
                    case 414: // 邮箱已经绑定
                    default:
                        // 其他错误
                        message.error(data.message);
                }
            });
        },

        handleSubmit(params) {
        	const { verifyBeforeSubmit } = store;
            if (store.$submiting) {
                return;
            }

            let result = verifyBeforeSubmit();

            if (result.pass) {
                store.changeSubmitingStatusTo(true);

                takeCoin({
		            currencyId: store.currentCoin.currencyId,
		            fdPwd: store.md5TradePassword,
		            note: store.note,
		            address: store.address,
		            phoneCode: params.smsCode,
		            vercode: '1',
		            codeid: '1',
		            amount: store.amount,
		            gAuth: params.gaCode,
		        }).then((data) => {
                    store.changeSubmitingStatusTo(false);
                    switch (data.status) {
                        case 200:
                            message.success(UPEX.lang.template('提币成功'));
                            store.resetForm();
                            break;
                        default:
                            message.error(data.message);
                    }
		        }).catch(()=>{
                    store.changeSubmitingStatusTo(false);
                })
			} else {
                if (result.message) {
                    message.error(result.message);
                }
            }
        },

        destroy() {
            this.timer && this.timer.destroy();
        }
    }
}
