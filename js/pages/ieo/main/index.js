/**
 * @fileoverview IEO 主页
 */
import React, { Component } from 'react';

import List from './list';
import Advantage from './advantage';

class Page extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {}

    render() {
        return (
            <div className="ieo-wrapper">
                <List />
                <Advantage />
            </div>
        );
    }
}

export default Page;
