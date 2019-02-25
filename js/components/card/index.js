import React from 'react';
// title, headerNode, bodyClass
export default (props) => {
    const {title, headerNode, children, bodyClass, ...other} = props;
    return (
        <section className="excui-card" {...other}>
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

