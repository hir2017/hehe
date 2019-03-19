import React from 'react';
import { Button, Icon } from 'antd';
import { Link } from 'react-router';

const Success = ({ userInfo }) => {
    const authLvl = UPEX.config.version === 'infinitex' ? 1 : 2;
    let $content = null;
    // 用户认证级别不足 ace：2  aus：1
    if (userInfo.authLevel < authLvl) {
        let $link = <Link to="/user/authentication">{UPEX.lang.template('去身份验证')}</Link>;
        // ace 才需要绑定银行卡
        if (UPEX.config.version === 'ace' && userInfo.authLevel === 1) {
            $link = <Link to="/user/bankInfo">{UPEX.lang.template('绑定银行卡')}</Link>;
        }
        $content = (
            <div>
                <p>{UPEX.lang.template('还差一步，您就可以开始交易了')}</p>
                <div className="item">
                    <Button className="exc-main">{$link}</Button>
                </div>
            </div>
        );
    }
    return (
        <div className="bind-success">
            <div className="item">
                <span className="icon">
                    <Icon type="check" />
                </span>
                <span className="icon-text">{UPEX.lang.template('恭喜您')}！</span>
            </div>
            <div className="item">
                {UPEX.lang.template('您已经成功绑定邮箱')} <span className="email">{userInfo.email}</span>
            </div>
            {$content}
        </div>
    );
};

export default Success;
