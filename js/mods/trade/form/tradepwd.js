/**
 * 资金密码。
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Modal,message} from 'antd';

class PopupTradePwd extends Component{
    static defaultProps = {
        prefix: ''
    }

    constructor(props) {
        super(props);

        this.state = {
            validPwd: true,
            visible: false
        }
    }

    show=(callback)=>{
        this.onSubmit = callback;
        this.setState({
            validPwd: true,
            visible: true,
        }, ()=>{
            this.refs.input.value = '';
        });
    }

    handleCancel=(e)=>{
        this.hideModal();
    }

    handleSubmit =(e)=>{
        let value = this.refs.input.value.trim();

        if (value) {
            this.handleCancel();
            this.onSubmit(value);
        }
    }

    hideModal = () => {
        this.setState({
            visible: false,
        });
    }

    onBlur=(e)=>{
        let value = this.refs.input.value.trim();

        if (!value) {
            this.setState({
                validPwd: false
            })
        } else {
            this.setState({
                validPwd: true
            })
        }
    }

    render() {
        return (
            <Modal
                ref="modal"
                wrapClassName={`vertical-center-modal ${this.props.prefix}`}
                title={UPEX.lang.template('输入资金密码')}
                visible={this.state.visible}
                onCancel={this.handleCancel.bind(this)}
                footer={null}
            >
                <div className="popup-trade-password">
                    <div className="input-area clearfix">
                        <div className={ !this.state.validPwd ? 'input-box': 'input-box' }>
                            <input 
                                ref="input"
                                type="password"
                                onBlur={this.onBlur.bind(this)}
                            />
                        </div>
                        <p className="warn-tip"></p>
                    </div>
                    <button className="submit" onClick={this.handleSubmit.bind(this)}>{UPEX.lang.template('提交')}</button>
                </div>
            </Modal>
        )
    }
}

export default PopupTradePwd;
