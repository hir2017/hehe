/**
 * @fileoverview 邀请返佣活动
 * @author 陈立英
 * @date 2018-10-01
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { getInviterInfoByCode } from '../../../api/http';
import UrlUtil from '../../../lib/url';

@observer
class PageView extends Component {
    constructor(props){
    	super(props);

        this.inviteCode = UrlUtil.query('invite_code');

        this.state = {
            username: ''
        }
    }

   	componentDidMount() {
        this.inviteCode && this.getInviterInfo();
    }

    getInviterInfo() {
        getInviterInfoByCode().then((data)=>{
            if (data.status == 200) {
                this.setState({
                    username: data.attachment.user
                });
            }
        })
    }

    render() {
        return (
          	<div className="invite-register">
                <p className="friend">{UPEX.lang.template('你的好友{name}', {name: this.state.username})}</p>
                <p className="title">{UPEX.lang.template('邀请您注册{sitename}', { sitename: UPEX.config.sitename})}</p>
                <div className="btn">
                    <a href={`/register?invite_code=${this.inviteCode}`}>{UPEX.lang.template('立即注册')}</a>
                </div>
            </div>
        );
    }
}

export default PageView;