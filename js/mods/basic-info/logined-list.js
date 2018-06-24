import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import AceSection from '../../common-mods/page-user/section';

@inject('userInfoStore')
@observer
export default class List extends Component {
    componentWillMount() {
        this.props.userInfoStore.getLoginRecord();
    }

    render() {
        const loginRecord = this.props.userInfoStore.loginRecord || [];
        return (
            <AceSection title={UPEX.lang.template('最近登录信息')} className="list">
                <div className="ant-table ant-table-large ant-table-fixed-header ant-table-scroll-position-left">
                    <div className="ant-table-content">
                        <div className="ant-table-scroll">
                            <div className="ant-table-header">
                                <table className="">
                                    <colgroup>
                                        <col style={{ width: '172px', minWidth: '172px' }} />
                                        <col style={{ width: '172px', minWidth: '172px' }} />
                                        <col style={{ width: '172px', minWidth: '172px' }} />
                                    </colgroup>
                                    <thead className="ant-table-thead">
                                        <tr>
                                            <th>{UPEX.lang.template('时间')}</th>
                                            <th>{UPEX.lang.template('IP')}</th>
                                            <th>{UPEX.lang.template('所在地')}</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>
                            <div className="ant-table-body">
                                <table className="">
                                    <colgroup>
                                        <col style={{ width: '172px', minWidth: '172px' }} />
                                        <col style={{ width: '172px', minWidth: '172px' }} />
                                        <col style={{ width: '172px', minWidth: '172px' }} />
                                    </colgroup>
                                    <tbody className="ant-table-tbody">
                                        {loginRecord.map(item => {
                                            return (
                                                <tr key={item.id}>
                                                    <td>{item.time}</td>
                                                    <td>{item.host}</td>
                                                    <td>{item.location}</td>
                                                </tr>
                                            );
                                        })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </AceSection>
        );
    }
}
