import React, { Component } from 'react';


export default class Wrapper extends Component {
    render() {
        const {title, innerClass, bodyClass, rightContent} = this.props;
        return (
            <div className={`page-content-inner ${innerClass}`}>
                {title ? (<div className="content-title">{title} {rightContent ? (<div className="title-right">{rightContent}</div>) : null}</div>) : ''}
                <section className={`content-body ${bodyClass}`}>
                    {this.props.children}
                </section>
            </div>
        );
    }
}

