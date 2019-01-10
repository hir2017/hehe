import React from 'react';
import ReactDOM from 'react-dom';
import debounce from 'lodash/debounce';
import wrapDisplayName from 'recompose/wrapDisplayName';

export default ({thredsort = 20} = {}) => BaseComponent => class extends React.Component {

    static displayName = process.env.NODE_ENV !== 'production' 
        ? wrapDisplayName(BaseComponent, 'withInviewPort') 
        : ''

    constructor(props) {
        super(props);
        this.state = { inviewport: props.alwaysVisible || false, enable: !props.delay };
    }

    componentDidMount() {
        this.props.delay && setTimeout(() => this.setState({ enable: true }), this.props.delay);
        if (!this.props.alwaysVisible) {
            window.addEventListener('scroll', this.onScroll);
            window.addEventListener('load', this.onSize);
            window.addEventListener('resize', this.onSize);
            setTimeout(this.onScroll, 50);
        }
    }

    componentWillUnmount() {
        if (!this.props.alwaysVisible) {
            window.removeEventListener('scroll', this.onScroll);
            window.removeEventListener('resize', this.onSize);
            window.removeEventListener('load', this.onSize);
            this.onScroll.cancel();
        }
    }

    onScroll = debounce((e) => {
        /**
         * @type {HTMLVideoElement}
         */
        var scroll = window.scrollY || document.body.scrollTop;

        if (this.preSize) {
            var top = this.preSize.top - scroll;
            var bottom = this.preSize.bottom - scroll;
        } else {
            var element = this.element instanceof HTMLElement ? this.element : ReactDOM.findDOMNode(this.element);
            if (!element) { return; }
            var { top, bottom } = element.getBoundingClientRect();
            this.preSize = {
                top: top + scroll,
                bottom: bottom + scroll
            };
        }

        var start = innerHeight * thredsort / 100;
        var end = innerHeight * (100 - thredsort) / 100;
        var isInviewport = bottom > start && top < end;

        if (this.state.c != isInviewport) { this.setState({ inviewport: isInviewport }); }
    }, 16)

    onSize = (e) => {
        this.preSize = null;
        this.onScroll();
    }

    onRef = (e) => this.element = e

    render() {
        return <BaseComponent {...this.props} {...this.state} childref={this.onRef}/>;
    }
};
