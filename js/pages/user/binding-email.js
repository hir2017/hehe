import React, { Component } from 'react';
import BindingEmail from '@/mods/binding-email';
import PageWrapper from '@/components/page-user/page-wrapper';

class BindingEmailPage extends Component {
    render() {
        return (
            <PageWrapper title={UPEX.lang.template('邮箱绑定')}>
                <BindingEmail />
            </PageWrapper>
        );
    }
}

export default BindingEmailPage;
