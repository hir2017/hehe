import React, { Component } from 'react';


export default class Wrapper extends Component {
    render() {
        const {title, innerClass, noPadding, bodyClass, rightContent} = this.props;
        return (
            <div className={`page-content-inner ${innerClass  || ''} ${noPadding ? 'no-padding' : 'test'}`}>
                {title ? (<div className="content-title">{title} {rightContent ? (<div className="title-right">{rightContent}</div>) : null}</div>) : ''}
                <div className={`content-body ${bodyClass  || ''}`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

