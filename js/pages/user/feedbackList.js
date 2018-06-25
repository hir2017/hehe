/**
 * @fileoverview  反馈列表
 * @author xia xiang feng
 * @date 2018-05-26
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Input, Upload, Icon, Button, Pagination, Row, Col } from 'antd';
const { TextArea } = Input;

import PageWrapper from '../../common-mods/page-user/page-wrapper';

@inject('userInfoStore')
@observer
export default class extends Component {
    componentDidMount() {
        this.props.userInfoStore.questions(1);
        this.props.userInfoStore.questionDetails(3);
    }

    pageChange = page => {
        this.props.userInfoStore.questions(page);
    };

    status(num) {
        const _map = {
            '1': UPEX.lang.template('未回复'),
            '-1': UPEX.lang.template('逻辑删除'),
            '2': UPEX.lang.template('已回复')
        }
        return _map[num] || num;
    }

    render() {
        const count = this.props.userInfoStore.questionsLsit.count;
        const questionsLsit = this.props.userInfoStore.questionsLsit.list || [];
        return (
            <PageWrapper title={UPEX.lang.template('問題列表')}>
                <ul className="question-content">
                    {questionsLsit.map((item, index) => {
                        return (
                            <li key={index}>
                                <span title={item.detail}>
                                    <Link to={`/user/feedbackDetails/${item.qid}`}>{item.detail}</Link>
                                </span>
                                <span className={`status lvl-${item.status + 1}`}>{this.status(item.status)}</span>
                                <span title={item.createTime}>{item.createTime}</span>
                            </li>
                        );
                    })}
                </ul>
                <div className="question-page">
                    <Pagination onChange={this.pageChange} size="small" total={count} />
                </div>
            </PageWrapper>
        );
    }
}
