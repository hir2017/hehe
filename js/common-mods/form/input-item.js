import React, { Component } from 'react';

class InputItem extends Component {
    render() {
        const {label, inputProps, tip, error, className} = this.props;
        return (
            <div className={`ace-input-item ${className}`}>
                <span className="label">{label}</span>
                <input className="input" {...inputProps} />
                {tip ? (<span className="item-tip">*{tip}</span>) : ''}
                {error ? (<span className="item-error">*{error}</span>) : ''}
            </div>
        );
    }
}

export default InputItem;
