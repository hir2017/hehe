import React from 'react';
import { Breadcrumb } from 'antd';
import List from '@/components/list';

import Wrapper from '@/components/wrapper';

class View extends React.Component {
    constructor(props) {
        super(props);
        const {type = ''} = props.params;
        
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
        this.pageInfo = {
            breadcrumbs: [
                UPEX.lang.template('ACE'),
                UPEX.lang.template('资产管理')
            ]
        }
    }

    render() {
        const {state, lists, pageInfo} = this;
        return (
            <Wrapper {...pageInfo}>
                <List dataSource={state.data} columns={lists} expandedRowRender={(row) => <p>{row.a}</p>}/>
            </Wrapper>
        );
    }
}

export default View;
