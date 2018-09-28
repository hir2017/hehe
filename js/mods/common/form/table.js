import React from 'react';

// label before after tip error inputProps value
export default class View extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { props } = this;
        const { data } = this.props;
        return (
            <div className="table-wrapper">
                <table>
                    <tbody>
                        {data.map((item, i) => (
                            <tr key={i}>
                                <td>{item.label}</td>
                                <td>{item.text}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}
