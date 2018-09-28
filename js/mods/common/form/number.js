import React from 'react';
import Item from './item';

// label before after tip error inputProps value
export default class View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        const changeCb = props.inputProps.onChange;
        props.inputProps.onChange = function(e) {
            console.log('props.inputProps.onChange')
            changeCb(e);
        }
        return <Item {...this.props}  />;
    }
}
