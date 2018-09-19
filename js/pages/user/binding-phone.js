/**
 * @fileoverview  绑定手机
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BindingPhone from '@/mods/binding-phone';

import PageWrapper from '@/components/page-user/page-wrapper';

@observer
class BindingPhonePage extends Component {
    render() {
        return (
            <PageWrapper title={UPEX.lang.template('手机绑定')}>
                <BindingPhone />
            </PageWrapper>
        );
    }
}

export default BindingPhonePage;
