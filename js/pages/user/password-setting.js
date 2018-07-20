/**
 * @fileoverview  密码设置
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Password from '../../mods/password-setting';

import PageWrapper from '../../components/page-user/page-wrapper';

@observer
class PasswordSetting extends Component {
    render() {
        return (
            <PageWrapper title={UPEX.lang.template('密码设置')}>
                <Password />
            </PageWrapper>
        );
    }
}

export default PasswordSetting;
