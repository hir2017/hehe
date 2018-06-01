/**
 * @fileoverview 客户端下载聚合页
 * @author 陈立英
 * @date 2018-05-03
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';


@observer
class Download extends Component {
    constructor(props){
    	super(props);
    }
    render() {
        return (
            <div className="download-wrapper">
                客户端下载聚合页
            </div>
        );
    }
}

export default Download;
