import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Input, Upload, Icon, Button, Pagination, Row, Col } from 'antd';
const { TextArea } = Input;


class ListView extends Component {

    status(num) {
        const _map = {
            '1': UPEX.lang.template('未回复'),
            '-1': UPEX.lang.template('逻辑删除'),
            '2': UPEX.lang.template('已回复')
        }
        return _map[num] || num;
    }

    render() {
        const {dataSource} = this.props
        return (
            <ul>
                {dataSource.map((item, index) => {
                    return (
                        <li key={index}>
                            <dl>
                                <dd className="content" onClick={e => {
                                    browserHistory.push(`/user/feedbackDetails/${item.qid}`);
                                }}>
                                     {item.detail}
                                </dd>
                                <dd className={`status lvl-${item.status + 1}`}>{this.status(item.status)}</dd>
                                <dd className="time" title={item.createTime}>{item.createTime}</dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

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

    render() {
        const count = this.props.userInfoStore.questionsLsit.count;
        const questionsLsit = this.props.userInfoStore.questionsLsit.list || [];
        let $content;
        if (questionsLsit.length == 0) {
            $content = <div className="mini-tip">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = <ListView dataSource={questionsLsit}/>;
        }
        return (
            <PageWrapper title={UPEX.lang.template('問題列表')}>
                <div className="account-result-list questions">
                    <div className="table-bd">
                        {$content}
                    </div>
                </div>

                <div className="question-page">
                    <Pagination onChange={this.pageChange} size="small" total={count} />
                </div>
            </PageWrapper>
        );
    }
}
