/**
 * @fileoverview  反馈详情
 * @author xia xiang feng
 * @date 2018-06-12
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import PageWrapper from '../../common-mods/page-user/page-wrapper';

@inject('userInfoStore')
@observer
export default class extends Component {
    componentDidMount() {
        this.props.userInfoStore.questionDetails(this.props.routeParams.id);
    }

    render() {
        const questionObj = this.props.userInfoStore.questionObj || {};
        const list = questionObj.list || [];
        const question = questionObj.question || { detail: '', urlkey: '' };
        return (
            <PageWrapper title={UPEX.lang.template('問題详情')}>
                <div>
                    <div style={{ padding: '20px', textIndent: '24px' }}>{question.detail}</div>
                    <div>
                        {question.urlkey.split(',').map((item, index) => {
                            return <img key={index} src={UPEX.config.imgHost + '/' + item} />;
                        })}
                    </div>
                </div>
                <div style={{ backgroundColor: '#f3f3f3', padding: '20px' }}>
                    <div style={{ fontSize: '14px', fontWeight: '600' }}>{UPEX.lang.template('客服反馈')}：</div>
                    <ul style={{ padding: '10px' }}>
                        {list.map(item => {
                            return <li>{item.detail}</li>;
                        })}
                    </ul>
                </div>
            </PageWrapper>
        );
    }
}
