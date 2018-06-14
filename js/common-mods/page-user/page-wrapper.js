import React, { Component } from 'react';


export default class Wrapper extends Component {
    render() {
        const {title, innerClass, bodyClass} = this.props;
        return (
            <div className={`page-content-inner ${innerClass}`}>
                <div className="content-title">{title}</div>
                <section className={`content-body ${bodyClass}`}>
                    {this.props.children}
                </section>
            </div>
        );
    }
}

