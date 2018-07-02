/**
 * @fileoverview 新闻中心
 */
import React, { Component } from 'react';
import { message } from 'antd';
import { getAnnounceDetail } from '../../api/http';

import PageWrapper from '../../common-mods/page-user/page-wrapper';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null,
            isFetching: false
        };
    }

    componentDidMount() {
        this.getDetail(this.props.routeParams.id);
    }


    async getDetail(id) {
        let result = false;
        this.setState({
            isFetching: true
        });
        try {
            const res = await getAnnounceDetail({
                announceId: id
            });
            if (res.status !== 200) {
                message.error(res.message);
            } else {
                result = true;
                let temp = res.attachment || {};
                this.setState({
                    content: temp.content,
                    title: temp.title,
                    date: temp.publishTime
                });
            }
        } catch (e) {
            console.error(e);
            message.error('Network Error');
        }
        this.setState({
            isFetching: false
        });
    }

    render() {
        const state = this.state;
        let $rightContent = (<div className="date">{state.date}</div>)
        return (
            <div className="news-wrapper">
                <div className="news-body-inner clearfix">
                    <div className="news-main">
                        <PageWrapper title={state.title} innerClass="question-detail" rightContent={$rightContent}>
                            <div dangerouslySetInnerHTML={{__html: state.content}} />
                        </PageWrapper>
                    </div>
                </div>
            </div>
        );
    }
}

export default News;
