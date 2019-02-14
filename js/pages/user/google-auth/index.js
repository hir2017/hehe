import React from 'react';
import { observer, inject } from 'mobx-react';
import { Loading } from '@/mods/authhoc/user';
import { Link, browserHistory } from 'react-router';
import PageWrapper from '@/components/page-user/page-wrapper';
import { Row, Col, Button } from 'antd';

import Bind from './bind';

const HasBind = props => {
    return (
        <div className="common-setting-box">
            <Row className="pwd top-radius-6 bottom-radius-6">
                <Col className="title col-exc" span={8}>
                    <p>{UPEX.lang.template('解绑Google验证器')}</p>
                    <p>{UPEX.lang.template('提现、修改密码，及安全设置时接收短信使用')}</p>
                </Col>
                <Col className="col-exc" span={8} />
                <Col className="operator col-exc" span={8}>
                    <Button
                        className="exc-btn-white"
                        onClick={e => {
                            browserHistory.push('/user/unbinding-google');
                        }}
                    >
                        {UPEX.lang.template('解绑')}
                    </Button>
                </Col>
            </Row>
            <div className="message guide">
                {UPEX.lang.template('使用Google认证请详细阅读')}
                <Link to="/user/google-guide">{UPEX.lang.template('使用指南')}</Link>
            </div>
        </div>
    );
};

@inject('userInfoStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    init = () => {
        return this.props.userInfoStore.getUserInfo();
    };

    render() {
        const store = this.props.userInfoStore;
        return (
            <PageWrapper title={UPEX.lang.template('Google验证器')}>
                <Loading init={this.init} isAuth authList={['phone']} store={store} >
                    {
                        store.userInfo.isGoogleAuth === 0 ? <Bind /> : <HasBind></HasBind>
                    }
                </Loading>
            </PageWrapper>
        );
    }
}

export default View;
