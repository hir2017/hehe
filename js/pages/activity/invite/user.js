/**
 * 邀请返佣 － 个人信息
 */
import React, {Component} from "react";
import {getInviteUserInfo} from '../../../api/http';
import {message} from 'antd';
import ClipboardJS from 'clipboard';
import qrcode from '../../../lib/qrcode';


class UserView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
        this.clip = null;
    }

    componentDidMount() {
        this.fetchData();

        this.clip = new ClipboardJS('.copy-txt');
        this.clip.on('success', (e) => {
            message.success(UPEX.lang.template('复制成功'));
            e.clearSelection();
        });

        this.clip.on('error', () => {
            message.error(UPEX.lang.template('复制失败'));
        });
    }

    componentWillUnmount() {
        this.clip.destroy();
    }

    fetchData() {
        getInviteUserInfo().then((data) => {
            if (data.status == 200) {
                this.setState({
                    user: data.attachment
                });
            }
        })
    }

    insertQrcode(shareUrl) {
        let el = $(this.refs.qrcode);
        let url = shareUrl;
        el.qrcode({
            text: url,
            width: 100,
            height: 100,
            render: "canvas"
        });
    }

    shareFB(shareUrl) {
        let url = window.encodeURI(shareUrl);
        let link = 'https://www.facebook.com/dialog/share?app_id=&display=popup&href=' + url;
        window.open(link);
    }

    shareTW(shareUrl) {
        let url = window.encodeURI(shareUrl);
        let link = `https://twitter.com/intent/tweet?url=${url}`;
        window.open(link);
    }


    render() {
        let {friendCount = 0, myInvitedCode = '', amount = 0, currencyNameEn = ''} = this.state.user;
        let self = this;
        let shareLink = `${UPEX.config.origin}/invite-register?invite_code=${myInvitedCode}`;

        shareLink && this.insertQrcode(shareLink);

        return (
            <div className="invite-user clearfix">
                <ul className="user-left">
                    <li className="user-mod">
                        <label>{UPEX.lang.template('我的佣金估值')}</label>
                        <p>
                            <em>{amount}</em>
                            <span>{currencyNameEn}</span>
                        </p>
                    </li>
                    <li className="user-mod mt10">
                        <label>{UPEX.lang.template('我邀请的好友')}</label>
                        <p>
                            <em>{friendCount}</em>
                            <span>{UPEX.lang.template('人')}</span>
                        </p>
                    </li>
                </ul>
                <div className="user-right">
                    <ul>
                        <li className="share-item">
                            <label>{UPEX.lang.template('我的邀请码')}</label>
                            <p className="info">
                                <em className="code">{myInvitedCode.replace(/(\w{3})(?=\w)/g,"$1 ")}</em>
                            </p>
                        </li>
                        <li className="share-item">
                            <label>{UPEX.lang.template('邀请链接')}</label>
                            <p className="link-wrap">
                                <span  id="invitedLink" className="link">{shareLink}</span>
                                <span className="copy-txt"
                                      data-clipboard-target="#invitedLink">{UPEX.lang.template('复制')}</span>
                            </p>
                        </li>
                        <li className="share-item icons">
                            <label>{UPEX.lang.template('分享至')}</label>
                            <div className="icon-bd">
                                <i className="icon qrcode">
                                    <div className="qrcode-big">
                                        <div ref="qrcode"></div>
                                    </div>
                                </i>
                            </div>
                            <div className="icon-bd">
                                <i className="icon facebook" onClick={() => this.shareFB(shareLink)}></i>
                            </div>
                            <div className="icon-bd">
                                <i className="icon twitter" onClick={() => this.shareTW(shareLink)}></i>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default UserView;
