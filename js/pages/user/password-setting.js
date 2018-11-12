import React, { Component } from 'react';
import Password from '@/mods/password-setting';

import PageWrapper from '@/components/page-user/page-wrapper';

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
