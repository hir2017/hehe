import React from 'react';
import Auth from './auth';
// TODO: 以后这里面可以添加各种校验
export class Loading extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: true
        }
    }

    componentDidMount() {
        this.props.init().then(res => {
            this.setState({
                loading: false
            })
        })
    }

    render() {
        if(this.state.loading) {
            return null;
        }
        return this.props.isAuth ? <Auth authList={this.props.authList} store={this.props.store}>{this.props.children}</Auth> : this.props.children;
    }

}
