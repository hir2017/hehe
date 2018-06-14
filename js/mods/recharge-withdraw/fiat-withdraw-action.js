/**
 * 法币充值
 */
import { message } from 'antd';
import { orderFiatWithdraw, getUserBankInfo , takeCoinSendPhoneCode } from '../../api/http';
import { browserHistory } from 'react-router';
import Timer from '../../lib/timer';
import md5 from '../../lib/md5';

export default (store, userInfoStore) => {
    return {
        onChangeBalance(e) {
            let target = $(e.currentTarget);
            let value = target.val().trim();

            store.setBalance(value);
        },

        handleChangeBank(value){
        	store.selectCardForRecharge(value);
        },

        getInfo() {
        	store.getInfo();
        },
        /**
         * 下一步
         */
        nextStep() {
            if (!store.selectedCard || store.selectedCard === 'none') {
                message.error(UPEX.lang.template('请选择一张绑定的银行卡'));
                return;
            }

            if (!store.balance) {
                message.error(UPEX.lang.template('请填写提现金额'));
                return;
            }

            store.nextStep();

            if (userInfoStore.userInfo.isGoogleAuth == 1) {
	        	this.changeAuthTypeTo('google');
	        } else if (userInfoStore.userInfo.isValidatePhone) {
	            this.changeAuthTypeTo('phone');
	        }

	        store.getImgCaptcha();
        },

        changeAuthTypeTo(type){
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
                        store.getImgCaptcha();
                        break;
                    case 414: // 邮箱已经绑定
                    default:
                        // 其他错误
                        message.error(data.message);
                        store.getImgCaptcha();
                }
            });
        },

        handleSubmit() {
        	const { verifyBeforeSubmit } = store;

            if (store.$submiting) {
                return;
            }

            let result = verifyBeforeSubmit();

            if (result.pass) {
                store.changeSubmitingStatusTo(true);
                console.log(store.authType)
                // amount, currencyId, cardId（此用户当前绑定银行卡id）, validateType, tradePwd, gAuth/phoneCode
                orderFiatWithdraw({
		            tradePwd: store.md5TradePassword,
		            phoneCode: store.phoneCode,
		            cardId: store.selectedCard,
                    amount: store.balance,
                    codeId: store.captchaStore.codeid,
                    verCode: store.vercode,
                    gAuth: store.googleCode,
                    validateType: store.authType === 'google' ? 1 : 2,
		        }).then((data) => {
                    store.changeSubmitingStatusTo(false);
                    switch (data.status) {
                        case 200:
                            message.success(UPEX.lang.template('提币成功'));
                            browserHistory.push('/account/fiatrecord');
                            store.resetForm();
                            break;
                        default:
                            message.error(data.message);
                            store.getImgCaptcha();
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
