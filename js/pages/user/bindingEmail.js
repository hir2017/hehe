/**
 * @fileoverview  绑定邮箱
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BindingEmail from '../../mods/bindingEmail';

@observer
class BindingEmailPage extends Component {
    render() {
        return (
            <div className="page-content-inner">
                <div className="content-title">{UPEX.lang.template('邮箱绑定')}</div>
                <section className="content-body">
                    <BindingEmail />
                </section>
            </div>
        );
    }
}

export default BindingEmailPage;
