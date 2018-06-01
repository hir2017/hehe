/**
 * 交易密码。
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Modal,message} from 'antd';

class PopupTradePwd extends Component{
    static defaultProps  = {
        onSubmit: ()=>{}
    }
    
    constructor(props) {
        super(props); 

        this.state = {
            validPwd: true
        }
    }

    handleCancel=(e)=>{
        this.props.onHide();
    }

    handleSubmit =(e)=>{
        let value = this.refs.input.value.trim();

        if (value) {
            this.props.onSubmit(value);
        }
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
                title={UPEX.lang.template('输入交易密码')} 
                visible={true} 
                onCancel={this.handleCancel.bind(this)} 
                footer={null}
            >
                <div className="popup-trade-password">
                    <div className="input-area clearfix">
                        <div className={ !this.state.validPwd ? 'input-box wrong': 'input-box' }>
                            <input 
                                ref="input"
                                type="password" 
                                onBlur={this.onBlur.bind(this)}
                            />
                        </div>
                        <p className="warn-tip">{ !this.state.validPwd  ? `*${UPEX.lang.template('密码错误')}` : null }</p>
                    </div>
                    <button className="submit" onClick={this.handleSubmit.bind(this)}>{UPEX.lang.template('提交')}</button>
                </div>
            </Modal>
        )
    }
}


module.exports = {
    create: function (cfg) {
        cfg = cfg || {};
        
        if (this.layer) {
            this.destroy();
        }
        var mountNode = this.createMountNode();
        
        this.layer = ReactDOM.render(
            <PopupTradePwd {...cfg} onHide={this.onHide.bind(this)}/>,
            mountNode
        );
    },

    onHide: function(){
        this.destroy();
    },
    // 创建组件插入的DOM节点
    createMountNode: function() {
        this.mountNode = document.createElement("div");
        $(document.body).append(this.mountNode);
        return this.mountNode;
    },
    destroy : function () {
        ReactDOM.unmountComponentAtNode(this.mountNode);
        $(this.mountNode).remove();
        delete this.layer;
    }
};