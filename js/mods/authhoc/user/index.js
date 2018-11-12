import React from 'react';

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
        return this.state.loading ? null : this.props.children;
    }

}
