import React from 'react';
import { browserHistory } from 'react-router';
import { Row, Col } from 'antd';
import TimeUtil from '@/lib/util/date';
import bindPhone from '@/../images/bind-phone.png';
import unbindPhone from '@/../images/unbind-phone.png';
import bindEmail from '@/../images/bind-email.png';
import unbindEmail from '@/../images/unbind-email.png';

export default ({userInfo = {}}) => {
    return (
        <Col span={12} className="left">
            <div className="phone">{userInfo.phone || userInfo.email}</div>
            <div className="login-time">
                {UPEX.lang.template('最后登录时间')}：{userInfo.userLoginRecord && TimeUtil.formatDate(userInfo.userLoginRecord.timeStamp)}
            </div>
            <Row className="bind-status">
                <Col
                    span={12}
                    className={userInfo.isValidatePhone ? 'auth' : ''}
                    onClick={e => {
                        if (userInfo.isValidatePhone !== 1) {
                            browserHistory.push('/user/setting-phone');
                        }
                    }}
                >
                    <img src={userInfo.isValidatePhone ? bindPhone : unbindPhone} />
                    <p>{userInfo.isValidatePhone ? UPEX.lang.template('手机已绑定') : UPEX.lang.template('手机未绑定')}</p>
                </Col>
                <Col span={12} className={userInfo.isValidateEmail ? 'auth' : ''}>
                    <img
                        src={userInfo.isValidateEmail ? bindEmail : unbindEmail}
                        onClick={e => {
                            if (userInfo.isValidateEmail !== 1) {
                                browserHistory.push('/user/setting-email');
                            }
                        }}
                    />
                    <p>{userInfo.isValidateEmail ? UPEX.lang.template('邮箱已绑定') : UPEX.lang.template('邮箱未绑定')}</p>
                </Col>
            </Row>
        </Col>
    );
}
