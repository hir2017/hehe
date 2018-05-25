import React, {Component} from 'react';
import { Modal,message} from 'antd';
class PopupTradePwd extends Component{
    constructor(props){
        super(props);

        this.state = {
            visible: false,
            validPwd: true
        }
    }

    handleCancel=(e)=>{
        this.setState({
            visible: false
        });
    }

    handleSubmit =(e)=>{

    }

    onBlur=(e)=>{
        let value = this.refs.input.value.trim()
        
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
                title={UPEX.lang.template('输入交易密码')} 
                visible={this.state.visible} 
                onCancel={this.handleCancel.bind(this)} 
                footer={null}
            >
                <div className="popup-trade-password">
                    <div className="input-area clearfix">
                        <div className="input-box">
                            <input 
                                ref="input"
                                type="password" 
                                onBlur={this.onBlur.bind(this)}
                            />
                        </div>
                        <p className="warn-tip">{ !this.state.validPwd ? `*${UPEX.lang.template('密码错误')}` : null }</p>
                    </div>
                    <button className="submit" onClick={this.handleSubmit.bind(this)}>{UPEX.lang.template('提交')}</button>
                </div>
            </Modal>
        )
    }
}

export default PopupTradePwd;