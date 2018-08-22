import React from 'react';
import Form from './form';
import List from '@/components/list';


class View extends React.Component {
    constructor(props) {
        super(props);

        this.lists = [
            {title: 'columns1', dataIndex: 'a'},
            {title: 'columns2', dataIndex: 'b'}
        ];

        this.state = {
            data: [
                {a: 11, b: 22},
                {a: 211, b: 222}
            ]
        };

        this.params = {
            beginTime: '',
            endTime: '',
            status: '12',
            buyOrSell: '0',
            currencyId: '0',
            baseCurrencyId: '0',
            priceType: 0,
        };
    }

    onQuery(data) {
        for (const key in this.params) {
            this.params[key] =  data[key] === '' ? this.params[key] : data[key];
        }
        this.action.getData({
            ...this.params,
            size: !this.props.pagination ? 100 : 10
        });
    }

    render() {
        const {state, lists} = this;
        return (
            <div className="record-box">
                <Form onClick={this.onQuery.bind(this)} action="history"/>
                <List dataSource={state.data} columns={lists} expandedRowRender={(row) => <p>{row.a}</p>}/>
            </div>
        );
    }
}

export default View;
