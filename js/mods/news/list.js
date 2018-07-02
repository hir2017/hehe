/**
 * @fileoverview 新闻中心
 */
import React, { Component } from 'react';
import {message, Pagination} from 'antd';
import {browserHistory} from 'react-router';
import { getAnnounceList } from '../../api/http';

import PageWrapper from '../../common-mods/page-user/page-wrapper';

class ListView extends Component {
    render() {
        const { dataSource } = this.props;
        return (
            <ul>
                {dataSource.map((item, index) => {
                    return (
                        <li key={index}>
                            <dl>
                                <dd
                                    className="content"
                                    onClick={e => {
                                        browserHistory.push(`/news/detail/${item.announceId}`);
                                    }}
                                >
                                    {item.title}
                                </dd>
                                <dd className="time" title={item.publishTime}>
                                    {item.publishTime}
                                </dd>
                            </dl>
                        </li>
                    );
                })}
            </ul>
        );
    }
}

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            list: [],
            isFetching: false,
            current: 1,
            total: 0,
            pageSize: 10
        };
    }

    componentDidMount() {
        this.questions(1);
    }

    async questions(pageNum) {
        let result = false;
        this.setState({
            isFetching: true
        })
        try {
            const res = await getAnnounceList({
                page: pageNum
            });
            if(res.empty) {
                message.error(res.message);
            } else {
                result = true;
                const {count = 0, list = [], page } = res;
                this.setState({
                    list,
                    total: count,
                    current: page
                });
            }

        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
        this.setState({
            isFetching: false
        })
    }

    pageChange(page) {
        this.questions(page);
    }

    render() {
        const { list, isFetching, count } = this.state;
        const state = this.state;
        let $content;
        if (list.length == 0) {
            $content = <div className="mini-tip">{UPEX.lang.template('暂无数据')}</div>;
        } else {
            $content = <ListView dataSource={list} />;
        }
        return (
            <PageWrapper title={UPEX.lang.template('新闻公告')}>
                <div className="news-result-list">
                    <div className="table-bd">{$content}</div>
                    <div className="table-ft">
                        {state.total > 0 ? (
                            <Pagination current={state.current} total={state.total} pageSize={10} onChange={this.pageChange.bind(this)} />
                        ) : null}
                    </div>
                </div>
            </PageWrapper>
        );
    }
}

export default News;
