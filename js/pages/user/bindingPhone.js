/**
 * @fileoverview  绑定手机
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import BindingPhone from '../../mods/bindingPhone';

@observer
class BindingPhonePage extends Component {
    render() {
        return (
            <div className="page-content-inner">
                <div className="content-title">{UPEX.lang.template('手机绑定')}</div>
                <section className="content-body">
                    <BindingPhone />
                </section>
            </div>
        );
    }
}

export default BindingPhonePage;
