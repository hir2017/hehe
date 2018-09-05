/**
 * @fileoverview  绑定邮箱
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BindingEmail from '../../mods/binding-email';

import PageWrapper from '../../components/page-user/page-wrapper';

@observer
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
