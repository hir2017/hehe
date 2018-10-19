/**
 * 法币充值
 */
import { observable, computed, autorun, action, runInAction } from 'mobx';
import { getUserAvailableAmount, getUserBindCards, getUserActionLimit, twdGetQuotaManagementInfo, ausGetQuotaManagementInfo } from '../api/http';

class FiatRechargeStore {
    @observable bankCardsList = []; // 银行列表
    @observable accountAmount = 0; // 当前余额
    @observable selectedCard = 'none'; // 选中的银行卡
    @observable balance = '000'; // 金额
    @observable cashType = 'PD-ATM-CTCB';
    @observable step = 'start';
    @observable $submiting = false;
    @observable currStep = 'start'; // 充值页面状态
    @observable rechargeDayLimit = 0; // 充值单日限额
    @observable dayLimit = 0; // 充值单日限额
    @observable lowLimit = 0; // 充值最低限额
    @observable highLimit = 0; // 充值最高限额

    @action
    setCurrStep(action) {
        this.currStep = action;
    }
    @action
    getRechargeDayLimit(action) {
        getUserActionLimit(1, 1).then(res => {
            runInAction(() => {
                if(res.status === 200) {
                    const data = res.attachment.limits[0];
                    this.rechargeDayLimit = data.highLimit;
                    this.highLimit = data.highLimit;
                    this.lowLimit = data.lowLimit;
                } else {
                    console.error('getUserActionLimit status not 200', res)
                }
            })
        }).catch(err => {
            console.error('getUserActionLimit', err)
        })

    }
    @action
    getInfo() {
        getUserAvailableAmount().then(data => {
            runInAction(() => {
                if (data.status == 200) {
                    this.accountAmount = parseInt(data.attachment)
                }
            });
        });

        getUserBindCards().then(data => {
            runInAction(() => {
                if (data.status == 200) {
                    this.bankCardsList = data.attachment;
                }
            });
        });
    }

    @computed
    get selectBindCardInfo() {
        const { bankCardsList, selectedCard } = this;
        let result = bankCardsList.filter(item => {
            return item.id === selectedCard;
        });
        return result[0] || {};
    }

    /**
     * 重置属性，临时的，后期把这些都放进state里面
     */
    @action
    resetProps() {
        const defaultVals = {
            accountAmount: 0,
            selectedCard: 'none',
            balance: '000',
            cashType: 'PD-ATM-CTCB',
            step: 'start',
            $submiting: false,
        };
        for(let _name in defaultVals) {
            this[_name] = defaultVals[_name];
        }
        // Object.entries(defaultVals).map(([key, val]) => {
        //     this[key] = val;
        // });
    }

    /**
     * 属性变更
     */
    @action
    setVal(val, field) {
        this[field] = val;
    }

    /**
     * 选中的充值银行卡
     */
    // @action.bound
    // selectCardForRecharge(cardId) {
    //     this.selectedCard = cardId;
    // 	// let result = this.bankCardsList.filter((item)=>{
    // 	// 	return item.providerId === cardId;
    // 	// })

    // 	// this.selectedCard = result[0];
    // }

    // @computed
    // get cardId() {
    // 	return this.selectedCard.providerId;
    // }

    @action
    changeSubmitingStatusTo(status) {
        this.$submiting = status;
    }

    @action.bound
    orderSuccess() {
        this.step = 'success';
    }
}

export default FiatRechargeStore;
