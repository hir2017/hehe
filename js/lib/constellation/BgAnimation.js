
import React from 'react';
import withInviewPort from './withInviewPort';

import {NetParticle, ParticleNetwork} from './ParticlesAnim';

const defaultProps = {
    max_particles: 100,
    velocity: {x: 2, y: 2},
    color: '#fff',
    opacity: 0.7,
    radius: 2,
    offset: 60,
    maxdistance: 150
};

@withInviewPort()
class AnimationBg extends React.Component {
    static defaultProps = {
        max_particles: 100,
        velocity: {x: 2, y: 2},
        color: '#fff',
        opacity: 0.4,
        radius: 2,
        offset: 60,
        maxdistance: 150
    }
    componentDidMount(props) {
        const {max_particles, velocity, color, opacity, radius, offset, maxdistance} = this.props;
        this.animate = new NetParticle(this.canvas, [new ParticleNetwork(this.canvas, {maxdistance, max_particles, velocity, color, opacity, radius, offset})]);
        this.animate.init();
        this.animate.play();
    }

    componentWillUnmount() {
        this.animate.pause();
    }

    // shouldComponentUpdate(props) {
    //     if (props.inviewport != this.props.inviewport) { props.inviewport ? this.animate.play() : this.animate.pause(); }
    //     return false;
    // }
    onref=(e) => {
        this.canvas = e;
        this.props.childref(e);
    }
    render () {
        return <canvas ref={this.onref} style={{
            position: 'fixed',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            zIndex: 0,
            pointerEvents: 'none',
            // background: 'linear-gradient(to bottom, #08090b 0%, #202326 100%)'
        }}/>;
    }
}
function getBgAnimationProps() {
    try {
        return window.innerWidth < 500 ? { max_particles: 150, maxdistance: 30 } : {};
    } catch (e) {
        return { max_particles: 50, maxdistance: 30 };
    }
}

export {getBgAnimationProps};
export default AnimationBg;
