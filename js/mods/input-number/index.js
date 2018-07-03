import React, { Component, PropTypes } from 'react';
// 判断输入的是否为数字

function isValueNumber (value) {
	return (/(^-?[0-9]+\.{1}\d+$)|(^-?[1-9][0-9]*$)|(^-?0{1}$)/).test(value + '')
}

class NumberInput extends Component {
    static propTypes = {
        value: PropTypes.number,
        negative: PropTypes.bool
    }

    constructor(props) {
        super(props);
        
        let defaultValue = props.value;
        
        if (defaultValue === 0) {
            defaultValue = 0;
        } else if (isNaN(defaultValue) || !defaultValue) {
            defaultValue = '';
        }

        this.state = {
            value: defaultValue
        };
    }

    componentWillReceiveProps(nextProps) {
		if (nextProps.value !==  this.state.value) {
			this.setState({
				value: nextProps.value
			});
		}        
    }

    keydown=(e)=>{

    }

    keyup=(e)=>{

    }

    // 点击选中
    click = (e) => {
        
    }
    change = (e) => {
    	const targetValue = e.target.value;
    	
    	let formatValue = targetValue === '.' ? '0.' : targetValue.trim();

        if (this.props.onChange) {
	        e.target.value = formatValue;
	        this.props.onChange(e, formatValue);
	    }
    }

    blur = (e) => {
    	const targetValue = e.target.value;
    	
    	let formatValue = targetValue === '.' ? '0.' : targetValue.trim();

       	if (this.props.onBlur) {
	    	e.target.value = formatValue;
	    	this.props.onBlur(e, formatValue);
	    } 
    }

    render() {
        const { value } = this.state;
        const { onChange, onBlur, ...props } = this.props;
        
        return (
        	<input {...props} 
                value={value} 
                onChange={this.change} 
                onBlur={this.blur} 
                onKeyDown={this.keydown}
                onKeyUp={this.keyup}
            />
        );
    }
}

export default NumberInput;