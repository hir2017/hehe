/**
 * 资金密码。
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Modal,message} from 'antd';

class Popup extends Component{
    static defaultProps  = {
        onSubmit: ()=>{},
        title: ''
    }
    
    constructor(props) {
        super(props); 
    }

    handleCancel=(e)=>{
        this.props.onHide();
    }

    handleSubmit =(e)=>{
       
    }

    render() {
        return (
            <Modal 
                title={this.props.title} 
                visible={true} 
                onCancel={this.handleCancel.bind(this)} 
                footer={null}
            >
                <div className="popup-container">
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
            <Popup {...cfg} onHide={this.onHide.bind(this)}/>,
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