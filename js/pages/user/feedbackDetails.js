/**
 * @fileoverview  反馈详情
 * @author xia xiang feng
 * @date 2018-06-12
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import {Modal} from 'antd';

import PageWrapper from '../../common-mods/page-user/page-wrapper';

@inject('userInfoStore')
@observer
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            visible: false
        };
    }

    componentDidMount() {
        this.props.userInfoStore.questionDetails(this.props.routeParams.id);

    }

    render() {
        const questionObj = this.props.userInfoStore.questionObj || {};
        const list = questionObj.list || [];
        const question = questionObj.question || { detail: '', urlkey: '' };
        return (
            <PageWrapper title={UPEX.lang.template('問題详情')} innerClass="question-detail">
                <div className="detail">
                    <p className="time">{question.createTime}</p>
                    <p className="content">{question.detail}</p>
                    <ul className="img-list">
                        {question.urlkey.split(',').map((item, index) => {
                            return item ? <li key={index} className="img" onClick={(e) => {
                                this.setState({
                                    visible: true,
                                    imgUrl: UPEX.config.imgHost + '/' + item
                                })
                            }}><img src={UPEX.config.imgHost + '/' + item} /></li> : null;
                        })}
                    </ul>
                </div>
                <div className="feedback">
                    <header>{UPEX.lang.template('客服反馈')}：</header>
                    <article>
                        {list.map((item, i) => {
                            return <li key={i}>{item.detail}</li>;
                        })}
                    </article>
                </div>
                <Modal
                    title={UPEX.lang.template('图片详情')}
                    visible={this.state.visible}
                    footer={null}
                    onCancel={e => {
                        this.setState({
                            visible: false,
                        })
                    }}
                >
                    <div style={{textAlign: 'center'}}>
                        <img  src={this.state.imgUrl} />
                    </div>
                </Modal>
            </PageWrapper>
        );
    }
}
