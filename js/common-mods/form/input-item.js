import React, { Component } from 'react';

class InputItem extends Component {
    render() {
        const {label, inputProps, tip, error, className} = this.props;
        return (
            <div className={`ace-input-item ${className || ''}`}>
                <span className="label">{label}</span>
                {
                    this.props.children ? this.props.children : (<input className="input" {...inputProps} />)
                }
                {tip ? (<div className="item-tip">*{tip}</div>) : ''}
                {error ? (<div className="item-error">*{error}</div>) : ''}
            </div>
        );
    }
}

export default InputItem;
