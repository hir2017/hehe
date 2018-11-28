import React from 'react';
import FormItem from '@/mods/common/form/item';
import ClipboardJS from 'clipboard';
import {Button, message, Icon} from 'antd';
import TableView from '@/mods/common/form/table';

export default class extends React.Component {
    constructor() {
        super();
        this.bpayUrl = '';
        this.clip = null;
    }

    componentDidMount() {
        this.clip = new ClipboardJS('.copy.copy-btn');
        this.clip.on('success', e => {
            message.success(UPEX.lang.template('复制成功'));
            e.clearSelection();
        });

        this.clip.on('error', () => {
            message.error(UPEX.lang.template('复制失败'));
        });
    }

    componentWillUnmount() {
        this.clip.destroy();
    }

    render() {
        const {props} = this;
        const disableTxt = UPEX.lang.template('此功能暂停');
        let tableData = [
            {
                label: UPEX.lang.template('Biller'),
                text: ''
            },
            {
                label: UPEX.lang.template('Biller Code'),
                text: ''
            },
            {
                label: UPEX.lang.template('Customer reference no.'),
                text: ''
            }
        ];
        // 禁止
        if (props.actionStatus === 2) {
            tableData[0].text = disableTxt;
            tableData[1].text = disableTxt;
            tableData[2].text = disableTxt;
        }
        // 允许
        if (props.actionStatus === 1) {
            tableData[0].text = props.Biller;
            tableData[1].text = (
                <div className="right-part">
                    <span className="val" id="biller-code">
                        {props.BillerCode}
                    </span>
                    <button type="button" className="copy copy-btn" data-clipboard-target="#biller-code">
                        {UPEX.lang.template('Copy')}
                    </button>
                </div>
            );
            tableData[2].text = (
                <div className="right-part">
                    <span className="val" id="reference-no">
                        {props.referenceNo}
                    </span>
                    <button type="button" className="copy copy-btn" data-clipboard-target="#reference-no">
                        {UPEX.lang.template('Copy')}
                    </button>
                </div>
            );
        }

        return (
            <div>
                <FormItem label={UPEX.lang.template('请通过BPAY向如下账号进行汇款来完成充值:')}>
                    {/*<TableView data={tableData} />*/}
                    <div className="bpay-wrap">
                        <p className="bpay-title">
                            <span>{tableData[0].label}</span>
                            <span>{tableData[0].text}</span>
                        </p>
                        <ul className="bpay-content">
                            <li>
                                <div className="left-part">{tableData[1].label}</div>
                                {tableData[1].text}
                            </li>
                            <li>
                                <div className="left-part">{tableData[2].label}</div>
                                {tableData[2].text}
                            </li>
                        </ul>
                        {
                            props.feeInfo.feeType === 1 ? <div className="warn-tip">
                                <Icon type="exclamation-circle" theme="outlined"/>
                                {UPEX.lang.template('bpay充值提示{num}', {num: props.feeInfo.fee})}
                            </div> : null
                        }
                    </div>
                </FormItem>
                <FormItem>
                    <div className="bottom-tips"
                         dangerouslySetInnerHTML={{__html: UPEX.lang.template('使用BPAY充值操作温馨提示,受银行处理时间影响...')}}/>
                </FormItem>
            </div>
        );
    }
}
