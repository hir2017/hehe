/**
 * 提现/充值记录接口单挑数据包含字段
private Long id; //自增编号
private String orderNo; //订单号
private String customerUuid; //客户关联ID
private BigDecimal amount; //充值或提现金额 单位：元
private BigDecimal fee; //手续费
private Integer currencyId; //币种 1. 人民币 2. 美元
private Integer type; //充提类型  0.未知 1.充值 2.提现
private Integer status; //交易状态  0.待审核 1.成功 2.失败 3.支付中 4. 交易异常

private String tradeNo; //支付平台交易流水号（订单号）
private String tradeType; //类型类型
private BigDecimal tradeAmount; //支付金额
private Date tradeTime; //支付时间

private String cardNo; //银行卡号
private String cardName; //收款人
private String openBank; //开户银行
private Integer withdrawType; //提现类型 0-未知类型 1-实时提现 2-非实时提现

private String remark; //备注
private Date createTime;  //创建时间
private String createBy;  //创建人
private Date lastEditTime; //最后编辑时间
private String lastEditBy; //最后编辑人
 */

const mockFn = ({ pageNumber, type }) => {
    const _data = {
        // 订单号
        orderNo: '2018180114',
        // 支付平台交易流水号（订单号）
        tradeNo: '2018192480114',
        // 充值或提现金额 单位：元
        amount: 20180,
        // 手续费
        fee: 0,
        // 充提类型  0.未知 1.充值 2.提现
        type: 1,
        // 交易状态  0.待审核 1.成功 2.失败 3.支付中 4. 交易异常
        status: 1,
        // 支付金额
        tradeAmount: 20180,
        // 支付时间
        tradeTime: '2018-07-24 23:29:15',
        // 银行卡号
        cardNo: '20180640811700',
        // 收款人
        cardName: '何*蓉',
        // 开户银行
        openBank: '中信银行',
        // 备注
        remark: '测试',
        // 创建时间
        createTime: '2018-09-30 21:24:09'
    };
    return {
        attachment: {
            list: Array.apply(null, { length: 10 }).map(item => {
                let _type = type || (Math.random() > 0.5 ? 1 : 0)
                let temp = Object.assign({}, _data);
                temp.type = _type
                if(_type === 1) {
                    temp.tradeAmount = temp.amount
                } else {
                    temp.tradeAmount = temp.amount - 50
                    temp.fee = 50
                }
                return temp
            }),
            pageNumber,
            pageSize: 10,
            pageCount: 60
        },
        message: null,
        status: 200
    };
};

export default mockFn;
