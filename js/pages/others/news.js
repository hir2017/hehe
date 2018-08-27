/**
 * @fileoverview 新闻中心
 */
import React, { Component } from 'react';
import {Breadcrumb} from 'antd';


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

    render() {

        return (
            <div className="news-wrapper">
                <Breadcrumb className="user-breadcrumb" separator=">">
                    <Breadcrumb.Item>{UPEX.config.sitename}</Breadcrumb.Item>
                    <Breadcrumb.Item>{UPEX.lang.template('公告中心')}</Breadcrumb.Item>
                </Breadcrumb>
                <div className="news-body-inner clearfix">
                    <div className="news-main">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

export default News;
