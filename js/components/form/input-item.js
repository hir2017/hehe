import React, { Component } from 'react';

class InputItem extends Component {
    render() {
        const {label, inputProps, tip, error, className, afterNode} = this.props;
        // 奇葩的实现方式，先这样吧
        let _props = {};
        
        if(this.props.hasOwnProperty('value')) {
            _props.value = this.props.value;
        }

        return (
            <div className={`exc-input-item ${className || ''}`}>
                <span className="label">{label}</span>
                {
                    this.props.children ? this.props.children : (<input autoComplete="off" {..._props} className="input" {...inputProps} />)
                }
                {tip ? (<div className="item-tip">{tip}</div>) : ''}
                {error ? (<div className="item-error">{error}</div>) : ''}
                {afterNode ? afterNode : null}
            </div>
        );
    }
}

export default InputItem;
