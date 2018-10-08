/**
 * @fileoverview 邀请返佣活动
 * @author 陈立英
 * @date 2018-10-01
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import UrlUtil from '../../../lib/url';

@observer
class PageView extends Component {
    constructor(props){
    	super(props);

        this.state = {
            username: ''
        }
    }

   	componentDidMount() {
        this.inviteCode && this.getInviterInfo();
    }

    checkUserLogin() {
        
    }

    render() {
        return (
          	<div className="invite-welcome">
                <p className="title">{UPEX.lang.template('邀请好友注册{sitename}，轻松获得交易返佣', { sitename: UPEX.config.sitename})}</p>
                <div className="btn">
                    <a href={`/login?backUrl=/activity/invite-home`}>{UPEX.lang.template('登录接受邀请拿返利')}</a>
                </div>
            </div>
        );
    }
}

export default PageView;