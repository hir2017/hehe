import { observable, autorun, computed, action, runInAction } from 'mobx';
import { getOrderListByCustomer } from '../api/http';

class Order {
	@observable tabIndex = 0; // 0 当前委托；1：历史委托；3：已成交
	@observable orderlist = []; // 订单列表

	@action
	setTabIndex(index) {
		this.tabIndex = index;
	}

	@action
	getOrderList() {
		getOrderListByCustomer().then((data)=>{
			runInAction('get user order list success', ()=>{
				if (data.status === 200) {
                    // if(prev === data.currencyId) {
                    //     startTime = moment(data.beginTime, dateFormat)
                    //     endTime = moment(data.endTime, dateFormat)
                    // } else {
                    //     prev = data.currencyId
                    //     startTime = moment(getBeforeDate(1), dateFormat)
                    //     endTime = moment(getBeforeDate(), dateFormat)
                    // }
                    // let info = {
                    //     details: {
                    //         isPage: res.data.attachment.list.length,
                    //         total: res.data.attachment.total,
                    //         data: res.data.attachment.list
                    //     },
                    //     startTime: startTime,
                    //     endTime: endTime
                    // }
                }
			})
		})
	}
}

export default Order;