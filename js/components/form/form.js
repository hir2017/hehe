import React, { Component } from 'react';

/**
 * width: common=450
 */

export default class Form extends Component {
    render() {

        const {widthStyle = 'common', className} = this.props;
        return (
            <form className={`exchange-form ${className} width-${widthStyle}`}>
                {this.props.children}
            </form>
        );
    }
}

