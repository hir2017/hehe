import React from 'react';
// title, headerNode
export default (props) => {
    const {title, headerNode, children, className, ...other } = props;
    return (
        <section className={`excui-card ${className || ''}`} {...other}>
            {
                headerNode ? headerNode : (
                    <header className="card-header">{title}</header>
                )
            }
            <article className="card-body">
                {children}
            </article>
        </section>
    );
}

