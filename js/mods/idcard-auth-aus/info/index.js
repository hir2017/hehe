import React, { Component } from 'react';
import Info from './info';
import Upload from './upload';
import {  submitUserInfo } from '@/api/http';
import { message } from 'antd';

export default class FirstStep extends Component {
    constructor(props) {
        super(props);
        this.state = {
            step: 'info', // info, upload,
            store: {}
        }
    }

    goToUpload = (store) => {
        this.setState({
            step: 'upload',
            store
        })
    }

    submit = (params) => {
        return submitUserInfo(params)
            .then(res => {
                if (res.status === 200) {
                    message.success(UPEX.lang.template('提交成功'));
                } else {
                    if ([0, 9999, 9997].indexOf(res.status) === -1) {
                        message.error(res.message);
                    } else {
                        console.error(res.message);
                    }
                }
            })

    }


    render() {
        let $content = null;
        let _props = {
            submit: this.submit,
            data: this.state.store,
            goToUpload: this.goToUpload
        }
        switch (this.state.step) {
            case 'info':
                $content = <Info {..._props} />;
                break;
            case 'upload':
                $content = <Upload  {..._props} />;
                break;
            default:
                break;
        }
        return $content;
    }
}
