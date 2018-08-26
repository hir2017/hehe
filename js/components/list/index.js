import React from 'react';

const Thead = props => (
    <thead className="exc-list-thead">
        <tr>
            {props.columns.map((col, i) => {
                return (
                    <th key={i} className={`list-col column-${i + 1} ${col.className || ''}`}>
                        {col.title}
                    </th>
                );
            })}
        </tr>
    </thead>
);

// 暂不支持a.b.c
class Cell extends React.Component {
    render () {
        const { col, row, index } = this.props;
        return <span className="list-cell-text">{col.render ? col.render(row, col, index) : row[col.dataIndex]}</span>;
    }
}


const Tbody = props => {
    const { dataSource, columns } = props;
    let len = dataSource.length;
    if (len === 0) {
        return (
            <tbody className="exc-list-tbody">
                <tr>
                    <td colSpan={columns.length}>{UPEX.lang.template('暂无数据')}</td>
                </tr>
            </tbody>
        );
    }
    if (props.expandedRowRender) {
        return (
            <tbody className="exc-list-tbody">
                {Array.apply(null, { length: len * 2 }).map((a, i) => {
                    let rowData = null;
                    if(i === 0 || i === 1) {
                        rowData = dataSource[0]
                    } else {
                        rowData = dataSource[i%2 === 1 ? (i - 1)/2 : i/2]
                    }
                    if (i % 2 === 1) {
                        return (
                            <tr key={i} className="list-expanded-row">
                                <td colSpan={columns.length}>{props.expandedRowRender(rowData)}</td>
                            </tr>
                        );
                    } else {
                        return (
                            <tr key={i} className="list-row">
                                {columns.map((col, j) => {
                                    return (
                                        <td key={j} className={`list-col cell-${j + 1} ${col.className || ''}`}>
                                            <Cell col={col} row={rowData} />
                                        </td>
                                    );
                                })}
                            </tr>
                        );
                    }

                })}
            </tbody>
        );
    }
    return (
        <tbody className="exc-list-tbody">
            {dataSource.map((rowData, i) => {
                return (
                    <tr key={i} className="list-row">
                        {columns.map((col, j) => {
                            return (
                                <td key={j} className={`list-col row-cell cell-${j + 1} ${col.className || ''}`}>
                                    <Cell col={col} row={rowData} />
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
};

/*
TODO:
loading效果

*/
class View extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        return (
            <div className="exc-list-wrapper">
                <table className="exc-list">
                    <Thead {...props} />
                    <Tbody {...props} />
                </table>
            </div>
        );
    }
}

export default View;
