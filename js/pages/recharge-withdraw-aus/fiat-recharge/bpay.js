import React from 'react';
import FormItem from '@/mods/common/form/item';
import ClipboardJS from 'clipboard';
import {Button, message} from 'antd';

export default class extends React.Component {

    constructor() {
        super();

        this.bpayUrl = '';
        this.clip = null;
    }

    componentDidMount() {
        this.clip = new ClipboardJS('.copy.copy-btn');
        this.clip.on('success', (e) => {
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
        const { props} = this;
        return (
            <div>
            <FormItem label={UPEX.lang.template('请通过BPAY向如下账号进行汇款来完成充值:')}>
                <div className="table-wrapper">
                    <table>
                        <tbody>
                            <tr>
                                <td>Biller</td>
                                <td>{props.Biller}</td>
                            </tr>
                            <tr>
                                <td>Biller Code</td>
                                <td>
                                    <span className="val" id="biller-code">{props.BillerCode}</span>
                                    <span
                                        className="copy copy-btn"
                                        data-clipboard-target="#biller-code"
                                    >
                                        {UPEX.lang.template('Copy')}
                                    </span>
                                </td>
                            </tr>
                            <tr>
                                <td>Customer reference no.</td>
                                <td>
                                    <span className="val" id="reference-no">{props.referenceNo}</span>
                                    <span
                                        className="copy copy-btn"
                                        data-clipboard-target="#reference-no"
                                    >
                                        {UPEX.lang.template('Copy')}
                                    </span>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </FormItem>
            <FormItem>
                <div
                    className="bottom-tips"
                    dangerouslySetInnerHTML={{ __html: UPEX.lang.template('使用BPAY充值操作温馨提示,受银行处理时间影响...') }}
                />
            </FormItem>
        </div>

        )
    }
}
