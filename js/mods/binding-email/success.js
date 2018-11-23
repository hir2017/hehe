/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-24
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Button, Icon} from 'antd';
import {Link} from 'react-router';

import PageWrapper from '../../components/page-user/page-wrapper';

@inject('userInfoStore')
@observer
export default class extends Component {
    constructor() {
        super();
        this.authLvl = UPEX.config.version === 'infinitex' ? 1 : 2;
    }

    componentWillMount() {
        this.props.userInfoStore.getUserInfo();
    }

    render() {
        const userInfo = this.props.userInfoStore.userInfo || {};
        let $content = null;

        if (UPEX.config.version === 'infinitex') {
            $content = userInfo.authLevel < this.authLvl ? (
                <div>
                    <p>{UPEX.lang.template('还差一步，您就可以开始交易了')}</p>
                    <div className="item">
                        <Button className="exc-main">
                            <Link to="/user/authentication">
                                {UPEX.lang.template('去身份验证')}
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : null;
        } else {
            if (userInfo.authLevel < this.authLvl) {
                if (userInfo.authLevel === 0) {
                    $content = (
                        <div>
                            <p>{UPEX.lang.template('还差一步，您就可以开始交易了')}</p>
                            <div className="item">
                                <Button className="exc-main">
                                    <Link to="/user/authentication">
                                        {UPEX.lang.template('去身份验证')}
                                    </Link>
                                </Button>
                            </div>
                        </div>);
                } else {
                    $content = (
                        <div>
                            <p>{UPEX.lang.template('还差一步，您就可以开始交易了')}</p>
                            <div className="item">
                                <Button className="exc-main">
                                    <Link to="/user/bankInfo">
                                        {UPEX.lang.template('绑定银行卡')}
                                    </Link>
                                </Button>
                            </div>
                        </div>);
                }
            }else{
                $content = null;
            }
        }

        return (
            <PageWrapper innerClass="bind-success">
                <div className="item">
                    <span className="icon">
                        <Icon type="check"/>
                    </span>
                    <span className="icon-text">{UPEX.lang.template('恭喜您')}！</span>
                </div>
                <div className="item">
                    {UPEX.lang.template('您已经成功绑定邮箱')} <span className="email">{userInfo.email}</span>
                </div>
                {$content}
            </PageWrapper>
        );
    }
}
