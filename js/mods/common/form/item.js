import React from 'react';
import { Input } from 'antd';

// label before after tip error inputProps value
export default class View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        const {inputProps = {}} = props;
        const temp = { inputProps };
        if (props.hasOwnProperty('value')) {
            temp.value = props.value;
        }
        temp.placeholder = props.placeholder || inputProps.placeholder;
        if(props.onChange) {
            temp.onChange = props.onChange;
        }
        return (
            <div className={`exc-form-item ${props.className || ''}`}>
                {props.label ? <label className="inner-label">{props.label}</label> : null}
                {props.before ? props.before : null}
                <div className="inner-item">{props.children ? props.children : <Input className="exc-input" {...temp} />}</div>
                {props.after ? props.after : null}
                {props.tip ? <p className="inner-tip">{props.tip}</p> : null}
                {props.error ? <p className="inner-error">{props.error}</p> : null}
            </div>
        );
    }
}
