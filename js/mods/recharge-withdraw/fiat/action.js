/**
 * 法币充值
 */
import { message } from 'antd';
import { orderFiatRecharge } from '@/api/http';


export default (store) => {
    return {
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
        validate(state, store) {
            if (!state.amount) {
                message.error(UPEX.lang.template('请填写充值金额'));
                return false;
            }
            // 500
            if (state.amount < 14) {
                message.error(UPEX.lang.template('最小充值金额为500'));
                return false;
            }
            if (state.amount >  store.rechargeDayLimit) {
                message.error(UPEX.lang.template('充值金额大于单日最大充值限额'));
                return false;
            }
            return true;
        },
        /**
         * 下单，获取orderId等表单提交信息
         * @param {amount, prodId（金流id, 目前需要用户自选, PD-WEBATM-CTCB, accountCode（当前用户绑定银行id值) }
         */
        getOrderInfo(data) {
            // TODO: 需要一个ReturnUrl
            return orderFiatRecharge({
                prodId: '111',
                accountCode: '222',
                tradeType: 2,
                payType: data.typeKey,
                bankType: data.bankKey,
                amount: data.amount,
                returnURL: ''
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
                // 错误统一由后端处理
                let status = data.status;
                return {
                    attachment: temp,
                    status
                }
            })
        },
        /**
         * 提交订单去银行支付
         * @param data {Object} 表单数据
         * @param newWindow {Boolean}/{String} 是否打开新窗口（可选，默认：true，同时支持"_blank, _top, _self"）
         */
        submitOrder(formData, newWindow = true) {
            if (formData) {
                let data = {
                    MerchantID_: formData.MerchantID_,
                    PostData_: formData.PostData_,
                };
                let nodeForm = this.nodeForm,
                    fields, node, i;

                if (!nodeForm) {
                    nodeForm = this.initForm(); // 初始化表单
                }
                // 测试
                nodeForm.attr('action', formData.url);
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
