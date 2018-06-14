/**
 * @fileoverview  反馈列表
 * @author xia xiang feng
 * @date 2018-05-26
 */
import React, { Component } from 'react';
import { Link } from 'react-router';
import { observer, inject } from 'mobx-react';
import { Input, Upload, Icon, Button, Pagination } from 'antd';
const { TextArea } = Input;

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
        switch (num) {
            case 1:
                return '未回复';
                break;
            case -1:
                return '逻辑删除';
                break;
            case 2:
                return '已回复';
                break;
            default:
                return num;
                break;
        }
    }

    render() {
        const count = this.props.userInfoStore.questionsLsit.count;
        const questionsLsit = this.props.userInfoStore.questionsLsit.list || [];
        return (
            <div className="page-content-inner">
                <div className="content-title">{UPEX.lang.template('問題列表')}</div>
                <div style={{ display: 'none' }} className="question-search">
                    <Icon type="search" />
                    <Input placeholder={UPEX.lang.template('搜索您的問題')} />
                    <span>{UPEX.lang.template('我反饋的問題')}</span>
                </div>
                <section className="content-body">
                    <div className="question-content">
                        <ul>
                            {questionsLsit.map((item, index) => {
                                return (
                                    <li key={index}>
                                        <span>
                                            <Link to={`/user/feedbackDetails/${item.qid}`}>{item.detail}</Link>
                                        </span>
                                        <span>{this.status(item.status)}</span>
                                        <span>{item.createTime}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                    <div className="question-page">
                        <Pagination onChange={this.pageChange} size="small" total={count} />
                    </div>
                </section>
            </div>
        );
    }
}
