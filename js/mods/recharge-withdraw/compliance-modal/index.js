import React from 'react';
import {Modal, Checkbox, Button} from 'antd';
import {browserHistory} from 'react-router';

export default class View extends React.Component {
    constructor() {
        super();
        this.state = {
            visible: true,
            disabled: true
        }
        this.content = UPEX.lang.template('澳洲合规说明文档网页链接');
    }

    onCheck = ({target}) => {
        this.setState({
            disabled: !target.checked
        })
    }

    onClick = (e) => {
        this.setState({
            visible: false
        })
    }

    onCancel() {
        browserHistory.push('/account')
    }

    render () {
        const {state} = this;
        return (
            <Modal
                // closable={false}
                visible={state.visible}
                width={700}
                onCancel={this.onCancel}
                wrapClassName="withdraw-compliance"
                footer={<Button disabled={state.disabled} onClick={this.onClick}>{UPEX.lang.template('继续')}</Button>}
            >
                <div className="content" dangerouslySetInnerHTML={{__html: this.content}} />
                <p>
                    <Checkbox onChange={this.onCheck}>{UPEX.lang.template('我已阅读并同意以上协议')}</Checkbox>
                </p>
            </Modal>
        )
    }
}
