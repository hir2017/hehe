import React, { Component } from 'react';

import AceForm from '../../common-mods/form/form';
import PageWrapper from '../../common-mods/page-user/page-wrapper';

export default class PageForm extends Component {
    render() {
        const {title, innerClass, bodyClass, formClass} = this.props;

        return (
            <PageWrapper {...{title, innerClass, bodyClass}}>
                <AceForm className={formClass}>
                    {this.props.children}
                </AceForm>
            </PageWrapper>
        );
    }
}

