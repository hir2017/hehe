import React, { Component } from 'react';

import AceForm from '../../components/form/form';
import PageWrapper from '../../components/page-user/page-wrapper';

export default class PageForm extends Component {
    render() {
        const {title, innerClass, bodyClass, formClass, tipComponent} = this.props;

        return (
            <PageWrapper {...{title, innerClass, bodyClass}}>
                { tipComponent }
                <AceForm className={formClass}>
                    {this.props.children}
                </AceForm>
            </PageWrapper>
        );
    }
}

