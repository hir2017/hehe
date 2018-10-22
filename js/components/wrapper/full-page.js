import React from 'react';


export default class View extends React.Component {
    render() {
        const {props} = this;
        return (
            <div className={`exc-full-page-wrapper ${props.className}`}>
                <div className="exc-full-page">
                    <header className="page-title">{props.title} {props.headerAfter ? props.headerAfter : null}</header>
                    <div className="page-content">
                        {props.children}
                    </div>
                </div>
            </div>
        )
    }
}
