/**
 * @fileoverview 新闻中心
 */
import React, { Component } from 'react';
import { message } from 'antd';
import { getAnnounceDetail } from '@/api/http';
import TimeUtil from '@/lib/util/date';

import PageWrapper from '@/components/page-user/page-wrapper';

class News extends Component {
    constructor(props) {
        super(props);
        this.state = {
            content: null
        };
    }

    componentDidMount() {
        this.getDetail(this.props.params.id);
    }

    getDetail(id) {
        getAnnounceDetail({
            announceId: id
        }).then((res)=>{
            if (res.status == 200) {
                let temp = res.attachment || {};
                this.setState({
                    content: temp.content,
                    title: temp.title,
                    date: TimeUtil.formatDate(temp.publishTimeStamp)
                });
            }
        })
    }

    render() {
        const state = this.state;

        let $rightContent = (<div className="date">{state.date}</div>)

        return (
            <PageWrapper title={state.title} rightContent={$rightContent}>
                <div className="news-detail" dangerouslySetInnerHTML={{__html: state.content}} />
            </PageWrapper>
        );
    }
}

export default News;
