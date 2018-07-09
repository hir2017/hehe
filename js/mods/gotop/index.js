import React, { Component } from "react";

class GoTop extends Component {
    static defaultProps = {
        visibleHeight: 400,  // 只有当滚动到该高度时，才显示“跳转到顶部”
        scrollDuration: 0.3 // 滚动到顶部动画时间（单位：秒）
    }
    constructor(props) {
        super(props);

        this.state = {
            show: 0
        }
    }
    componentDidMount() {
        this.node = $(this.refs.gotop);

        $(window).on('scroll', () => {
            this.scrollHandle();
        })

        this.node.on('click', () => {
            this.goTop();
        })
    }
    componentWillUnmount() {
        $(window).off('scroll');
    }

    scrollHandle() {
        let scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
        
        if (scrollTop >= this.props.visibleHeight) {
        	this.show();	
        } else {
        	this.hide();	
        }
    }

    goTop() {
        window.scroll(0,0);
    }

    show() {
    	if (this.state.show == 1) {
    		return;
    	}
    	this.setState({
			show: 1
		});

        this.node.css({
            opacity: 1,
            display: 'block'
        });
    }

    hide() {
    	if (this.state.show == 0) {
    		return;
    	}
    	this.setState({
			show: 0
		});

        this.node.css({
            opacity: 0,
            display: 'none'
        });
    }
    render() {
    	return <div className="J_Gotop" ref="gotop"/>;
    }
}

export default GoTop;
