import React, { Component, PropTypes } from 'react';

class NumberInput extends Component {
    static defaultProps = {
        value: '',
        negative: false,
        precision: 4
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
        if (nextProps.value !== this.state.value) {
            this.setState({
                value: nextProps.value
            });
        }
    }

    keydown = (e) => {
        var key = e.which || e.keyCode;

        if (!e.shiftKey && !e.altKey && !e.ctrlKey &&
            // numbers   
            key >= 48 && key <= 57 ||
            // Numeric keypad
            key >= 96 && key <= 105 ||
            // comma, period and minus, . on keypad
            key == 190 || key == 188 || key == 109 || key == 110 ||
            // Backspace and Tab and Enter
            key == 8 || key == 9 || key == 13 ||
            // Home and End
            key == 35 || key == 36 ||
            // left and right arrows
            key == 37 || key == 39 ||
            // Del and Ins
            key == 46 || key == 45) {
            
        } else {
            e.preventDefault(); // 只允许输入数字
        }
    }

    keyup = (e) => {

    }

    change = (e) => {
        // negative->判断能否输负数 true->可为负数 false->不可为负数 默认为不可为负数
        const { negative } = this.props;
        const targetValue = e.target.value;
        const oldValue = this.state.value || '';
        const precision = this.props.precision;
        let formatValue;

        // 可以为负数
        const canNegative = isNaN(targetValue) && targetValue !== '-';
        // 不可以为负数
        const noNegative = isNaN(targetValue) || targetValue < 0 || targetValue === '-';
        // 关于负数的判定
        const negativeJudgment = negative ? canNegative : noNegative;

        if (negativeJudgment && targetValue !== '.' && targetValue !== '+') {
            // 不合法时的处理...
        } else {
            formatValue = targetValue === '.' ? '0.' : targetValue.trim();

            this.setState({
                value: formatValue
            });

            if (formatValue.indexOf('.') > -1 && typeof precision !== 'undefined') {
                let str = "" + formatValue, idx = str.indexOf(".") + Number(precision) + 1;
                
                if (idx > precision && idx < str.length)  // 超过N位小数
                {
                    formatValue = str.substring(0, idx);  // 截取N位小数

                    this.setState({
                        value: formatValue
                    });
                }
            }

            if (targetValue === '.' || targetValue === '+' || targetValue === '-') {
                formatValue = 0;
            }

            if (this.props.onChange) {
                e.target.value = formatValue;
                this.props.onChange(e, formatValue);
            }
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