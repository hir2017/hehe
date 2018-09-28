/**
 * 法币充值
 */
import { message } from 'antd';
import { orderFiatRecharge, getSpgatewayATMInfo } from '@/api/http';

/**
 * 表单提交数据
 */
var ORDER_DATA = {
    MerchantID_: "", // 商店代號
    PostData_: "", // 加密資料
};

export default (store) => {
    return {
        getInfo() {
        	store.getInfo();
        },
        /**
         * 表单字段节点
         */
        fields: {},
        /**
         * 创建表单
         */
        initForm() {
            var nodeForm;
            nodeForm = $('<form/>');
            $('body').append(nodeForm);

            return nodeForm;
        },
        /**
         * 下单接口
         */
        validate(state) {
            if (!state.amount) {
                message.error(UPEX.lang.template('请填写充值金额'));
                return false;
            }
            if (state.amount < 500) {
                message.error(UPEX.lang.template('最小充值金额为500'));
                return false;
            }
            return true;
        },
        /**
         * 下单，获取orderId等表单提交信息
         * @param {amount, prodId（金流id, 目前需要用户自选, PD-WEBATM-CTCB, accountCode（当前用户绑定银行id值) }
         */
        getOrderInfo(data) {
            const url = 'https://www.baidu.com/'
            return orderFiatRecharge({
                prodId: '111',
                accountCode: '222',
                tradeType: 2,
                payType: data.typeKey,
                bankType: data.bankKey,
                amount: data.amount,
                returnURL: encodeURI(url)
            }).then(data => {
                let temp = {};
                if (data.status == 200) {
                    temp = data.attachment || '{}';
                    try {
                        temp = JSON.parse(temp)
                    } catch (error) {
                        temp = {}
                    }
                } else {
                    message.error(data.message);
                }
                return {
                    attachment: temp,
                    status: data.status
                }
            })
        },
        /**
         * 提交订单去银行支付
         * @param data {Object} 表单数据
         * @param newWindow {Boolean}/{String} 是否打开新窗口（可选，默认：true，同时支持"_blank, _top, _self"）
         */
        submitOrder(data, newWindow = true) {
            if (data) {
                console.log('submitOrder', data)
                let nodeForm = this.nodeForm,
                    fields, node, i;

                if (!nodeForm) {
                    nodeForm = this.initForm(); // 初始化表单
                }
                // https://gate.pepay.com.tw/pepay/paysel_amt.php
                // 测试
                nodeForm.attr('action', 'https://ccore.spgateway.com/API/gateway/webatm');
                // 生产
                // nodeForm.attr('action', 'https://core.spgateway.com/API/gateway/webatm');
                nodeForm.attr('method', 'post'); // POST提交
                nodeForm.attr('target', newWindow === true ? "_blank" : typeof newWindow == "string" ? newWindow : "_self") // 是否打开新窗口
                // 填充表单
                fields = this.fields;

                for (i in fields) // 更新已创建字段的值，删除无用字段
                {
                    if (fields.hasOwnProperty(i) && (node = fields[i])) // 已创建字段
                    {
                        if (data.hasOwnProperty(i)) // 设置了属性
                        {
                            node.value = data[i] == undefined ? "" : data[i]; // 设置字段值
                        } else // 未设置属性
                        {
                            node.remove(); // 删除无用字段
                        }
                    }
                }

                for (i in data) // 创建新字段
                {
                    if (data.hasOwnProperty(i) && !(node = fields[i])) // 字段未创建
                    {
                        nodeForm.append(fields[i] = $("<input type='hidden' name='" + i + "' value='" + (data[i] == undefined ? "" : data[i]) + "'/>"));
                    }
                }

                nodeForm.submit(); // 提交表单
            }
        },
    }
}
