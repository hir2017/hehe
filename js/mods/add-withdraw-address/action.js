/**
 * 添加提币地址
 */
import { message } from 'antd';
import { addWithdrawAddress } from '../../api/http';

export default (store) => {
    return {
        onChangeAddress(e){
            let value = e.currentTarget.value.trim();

            store.setAddress(value);
        },

        onChangeNote(e){
            let value = e.currentTarget.value.trim();

            store.setNote(value);
        },

        onChangePwd(e){
            let value = e.currentTarget.value.trim();

            store.setPwd(value);
        },

        onChangeCurrencyId(value){
        	store.setCurrencyId(value);
        },

        onBlurToVerify(key){
        	switch(key) {
        		case 'address':
        			store.checkAddress();
        			break;
        		case 'note':
        			store.checkNote();
        			break;
        		case 'pwd':
        			store.checkPwd();
        			break;
        	}
        },
        /**
         *  点击保存按钮添加提币地址
         */
        handleSubmit() {
            let result = store.verifyInfoBeforeSubmit();

            if (result.pass) {
            	
            	if (store.$submiting) {
            		return;
            	}

            	store.changeSubmitingStatusTo(true);
                
                // 验证通过
                addWithdrawAddress({
                    address: store.address,
                    note: store.note,
                    fdPwd: store.md5TradePassword,
                    currencyId: store.currencyId
                }).then((data) => {
                	store.changeSubmitingStatusTo(false);

                    switch (data.status) {
                        case 200:
                            message.success(UPEX.lang.template('提币地址添加成功'));

                            // 添加成功返回上一个页面
                            setTimeout(() => {
                                history.back();
                            }, 1000);
                            break;
                        case 468:
                            message.error(UPEX.lang.template('交易密码输入错误'));
                            break;
                        default:
                            message.eror(data.message);
                            break;
                    }
                }).catch(()=>{
                	store.changeSubmitingStatusTo(false);
                })
            } else {
                message.error(result.message);
            }
        }
    }
}