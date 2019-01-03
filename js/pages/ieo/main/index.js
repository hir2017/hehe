/**
 * @fileoverview IEO 主页
 */
import React, {Component} from 'react';
import BgAnimation from '@/lib/constellation/BgAnimation';

import List from './list';
import Features from './feature';

function getBgAnimationProps() {
    try {
        return window.innerWidth < 500 ? {max_particles: 50, maxdistance: 20} : {};
    } catch (e) {
        return {max_particles: 50, maxdistance: 20};
    }
}

class Page extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    render() {
        return (
            <div className="ieo-wrapper">
                <BgAnimation  {...getBgAnimationProps()} />
                <div className="ieo-apply">
                    <a href={UPEX.lang.template('申请发布IEO google文档链接')} target="_blank" className="apply-btn" dangerouslySetInnerHTML={{__html: UPEX.lang.template('申请发布IEO')}}></a>
                </div>
                <div className="ieo-main">
                    <div className="content">
                        <List/>
                    </div>
                </div>
                <Features/>
            </div>
        );
    }
}

export default Page;
