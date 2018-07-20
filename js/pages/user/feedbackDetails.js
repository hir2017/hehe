/**
 * @fileoverview  反馈详情
 * @author xia xiang feng
 * @date 2018-06-12
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Modal } from 'antd';

import PageWrapper from '../../components/page-user/page-wrapper';

@inject('userInfoStore')
@observer
export default class extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imgUrl: '',
            visible: false,
            imgStyle: {},
            boxStyle: {
            }
        };
        this.scrollFn = function() {
            let $dom = $('.ant-modal.feedback-modal .ant-modal-content .img-box');
            $dom.width($dom.height());
        }
    }

    async showImage(src) {
        var image = new Image();
        image.onload = () => {
            const imgStyle = {};
            const field = image.width > image.height ? 'width' : 'height';
            imgStyle[field] = '100%';
            this.setState({
                visible: true,
                imgUrl: src,
                imgStyle
            });
        };
        image.src = src;
    }

    componentDidMount() {
        this.props.userInfoStore.questionDetails(this.props.routeParams.id);
        window.addEventListener('resize', this.scrollFn, false);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.scrollFn, false);
    }


    render() {
        const questionObj = this.props.userInfoStore.questionObj || {};
        const list = questionObj.list || [];
        const question = questionObj.question || { detail: '', urlkey: '' };
        return (
            <PageWrapper title={UPEX.lang.template('问题详情')} innerClass="question-detail">
                <div className="detail">
                    <p className="time">{question.createTime}</p>
                    <p className="content">{question.detail}</p>
                    <ul className="img-list">
                        {question.urlkey.split(',').map((item, index) => {
                            let url = UPEX.config.imgHost + '/' + item;
                            return item ? (
                                <li
                                    key={index}
                                    className="img"
                                    onClick={e => {
                                        this.showImage(url);
                                    }}
                                >
                                    <img src={url} />
                                </li>
                            ) : null;
                        })}
                    </ul>
                </div>
                {list.map((item, i) => {
                    return (
                        <div key={i} className="feedback-answer">
                            <div className="create-time">{item.createTime}</div>
                            <section>
                                <header>{UPEX.lang.template('客服反馈')}：</header>
                                <article>
                                    {item.detail}
                                </article>
                            </section>
                        </div>
                    )
                })}

                <Modal
                    className="feedback-modal"
                    title={UPEX.lang.template('图片详情')}
                    visible={this.state.visible}
                    footer={null}
                    width="85%"
                    onCancel={e => {
                        this.setState({
                            visible: false
                        });
                    }}
                >
                    <div className="img-box" style={this.state.boxStyle}>
                        <img style={this.state.imgStyle} src={this.state.imgUrl} />
                    </div>
                </Modal>
            </PageWrapper>
        );
    }
}
