/**
 * 资金密码。
 */
import React, {Component} from 'react';
import ReactDOM, {render} from 'react-dom';
import { Modal,message} from 'antd';

class Popup extends Component{
    static defaultProps  = {
        onSubmit: ()=>{},
        title: '',
        children: null
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
            <div className="widget-popup-container">
                <div className="popup-container">  
                    <div className="popup-header">

                    </div>
                    <div className="popup-body">
                        
                    </div>
                    <div className="popup-footer">
                        <button className="submit" onClick={this.handleSubmit.bind(this)}>{UPEX.lang.template('提交')}</button>
                    </div>
                </div>
            </div>
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