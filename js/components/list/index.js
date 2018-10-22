import React from 'react';

const Head = props => (
    <div className="exc-list-head-wrapper">
        <dl className="exc-list-head">
            {props.head.map((col, i) => {
                return (
                    <dt key={i} className={`list-col col-${i + 1} ${col.className || ''}`}>
                        {col.label}
                    </dt>
                );
            })}
        </dl>
    </div>
);

class Cell extends React.Component {
    render() {
        const { col, row, index } = this.props;
        return <span className="list-cell-text">{col.render ? col.render(row, col, index) : row[col.dataIndex]}</span>;
    }
}

// subData: Object,详情数据 subIndex:Number,详情的key subShow:Boolean,是否显示 subLoading:Boolean,subShow=true是否显示加载中
const Body = props => {
    const { data, body, subData, subIndex, subLoading = false, expandedRowRender } = props;

    return (
        <div className="exc-list-body-wrapper">
            <div className="exc-list-body">
                {data.map((rowData, i) => {
                    let $expandedRow = null;
                    let isExpanded = subIndex === i;
                    if (isExpanded) {
                        $expandedRow = <div className="list-expanded-row">{expandedRowRender(subData, rowData, i)}</div>;
                    }
                    return (
                        <dl key={i} className={`list-row ${isExpanded ? 'expanded-row' : ''}`}>
                            {body.map((col, j) => {
                                return (
                                    <dd key={j} className={`list-col row-cell cell-${j + 1} ${col.className || ''}`}>
                                        <Cell col={col} row={rowData} index={i}/>
                                    </dd>
                                );
                            })}
                            {$expandedRow}
                        </dl>
                    );
                })}
            </div>
        </div>
    );
};

const Footer = props => {
    return (
        <div className="exc-list-footer-wrapper">
            <div className="exc-list-footer">{props.children}</div>
        </div>
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
                <div className="exc-list">
                    <Head {...props} />
                    <Body {...props} />
                    {props.children ? <Footer>{props.children}</Footer> : null}
                </div>
            </div>
        );
    }
}

export default View;
