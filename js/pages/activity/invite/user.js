/**
 * 邀请返佣 － 个人信息
 */
import React, {Component} from "react";
import {getInviteUserInfo} from '../../../api/http';
import { message } from 'antd';
import QRCode from 'qrcode';

class UserView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {}
        }
    }

    componentDidMount() {
        this.fetchData();
        this.useQRCode();
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

    copyLink(){
        document.getElementById('invitedLink').select();
        document.execCommand("Copy");
        message.config({
            duration:.2
        })
        message.success(UPEX.lang.template('复制成功'));
    }

    useQRCode(){
        url = 'https://www.baidu.com';
        let qrcode = new QRCode({
            width: '100',
            height: '100',
            tex
        })


    }


    render() {
        let {friendCount = 0, invitedCode = '', amount = 0, currencyNameEn = ''} = this.state.user;
        let self = this;
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
                                <em className="code">{invitedCode}</em>
                            </p>
                        </li>
                        <li className="share-item">
                            <label>{UPEX.lang.template('邀请链接')}</label>
                            <p className="link-wrap">
                                <input type="text" id="invitedLink" value={`http://asss${invitedCode}`} className="link"></input>
                                <span className="copy-txt" onClick={self.copyLink}>{UPEX.lang.template('复制')}</span>
                            </p>
                        </li>
                        <li className="share-item icons">
                            <label>{UPEX.lang.template('分享至')}</label>
                            <a href=""  target="_blank">
                                <i className="icon qrcode">
                                    <div className="qrcode-big">
                                        <div id="canvas"></div>
                                    </div>
                                </i>
                            </a>
                            <a href=""  target="_blank">
                                <i className="icon twitter"></i>
                            </a>
                            <a href=""  target="_blank">
                                <i className="icon facebook"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}


export default UserView;
