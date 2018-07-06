/**
 * 法币充值
 */
import { message } from 'antd';
import { orderFiatRecharge, getUserBankInfo } from '../../api/http';
import { browserHistory } from 'react-router';
import md5 from '../../lib/md5';

/**
 * 表单提交数据
 */
var ORDER_DATA = {
    SYS_CODE: "", // 系統信任碼
    SHOP_CODE: "", // 厂商信任碼
    SHOP_ID: '', // 廠商代碼
    ORDER_ID: '', // 订单编号
    ORDER_ITEM: '', // 商品名稱
    AMOUNT: '', // 金额
    CURRENCY: '', // 幣別 TWD
    CHECK_CODE: '', // 檢查碼 MD5([SYS_CODE, SHOP_ID, ORDER_ID, AMOUNT, SHOP_CODE].join('#'))
    PAY_TYPE: '', // 預設消費類型
    SUB_PAY_TYPE: '', // 子消費類型啟用
    PROD_ID: '', // 金流代碼
    SHOP_PARA: '', // 廠商自訂參數
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
        handleRecharge() {
            if (!store.selectedCard || store.selectedCard === 'none') {
                message.error(UPEX.lang.template('请选择一张绑定的银行账号'));
                return;
            }

            if (!store.balance) {
                message.error(UPEX.lang.template('请填写充值金额'));
                return;
            }
            // 避免重复提交
            if (store.$submiting) {
                return;
            }

            this.order();
        },
        /**
         * 下单，获取orderId等表单提交信息
         * @param {amount, prodId（金流id, 目前需要用户自选, PD-WEBATM-CTCB, accountCode（当前用户绑定银行id值) }
         */
        order() {
            orderFiatRecharge({
                prodId: store.cashType,
                amount: store.balance,
                accountCode: store.selectedCard
            }).then((data) => {
                if (data.status == 200) {
                    store.orderSuccess();
                    let temp;
                    temp = data.attachment || '{}';
                    try {
                        temp = JSON.parse(temp)
                    } catch (error) {
                        temp = {}
                    }
                    this.submitOrder(temp);
                } else {
                    message.error(data.message);
                }
                store.changeSubmitingStatusTo(false);
            }).catch((err) => {
                store.changeSubmitingStatusTo(false);
            })
        },
        /**
         * 提交订单去银行支付
         * @param data {Object} 表单数据
         * @param newWindow {Boolean}/{String} 是否打开新窗口（可选，默认：true，同时支持"_blank, _top, _self"）
         */
        submitOrder(data, newWindow = true) {
            if (data) {
                data = Object.assign(ORDER_DATA, data);
                let nodeForm = this.nodeForm,
                    fields, node, i;

                if (!nodeForm) {
                    nodeForm = this.initForm(); // 初始化表单
                }
                // https://gate.pepay.com.tw/pepay/paysel_amt.php
                nodeForm.attr('action', 'https://gate.pepay.com.tw/pepay/payselect_amt.php');
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
        }
    }
}
