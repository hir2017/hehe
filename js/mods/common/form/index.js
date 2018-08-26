import React from 'react';
import AutoCompleteHack from '@/mods/common/auto-complete-hack';

export default class View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        return (
            <div className={`exc-form ${props.className || ''}`}>
                <AutoCompleteHack />
                {props.children}
            </div>
        );
    }
}
