import React, { Component } from 'react';

export default class Wrapper extends Component {
    render() {
        const { title, className, rightContent } = this.props;
        return (
            <section className={`ace-section ${className || ''}`}>
                {title ? (
                    <header className="section-title">
                        {title}
                        {rightContent ? <div className="title-right">{rightContent}</div> : null}
                    </header>
                ) : null}
                <article className="section-body">{this.props.children}</article>
            </section>
        );
    }
}
