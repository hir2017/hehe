/**
 * @fileoverview 邀请返佣活动
 * @author 陈立英
 * @date 2018-10-01
 */
import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {getInviterInfoByCode} from '../../../api/http';
import UrlUtil from '../../../lib/url';

@observer
class PageView extends Component {
    constructor(props) {
        super(props);

        this.invitedCode = UrlUtil.query('invite_code');

        this.state = {
            username: '',
            addClass:''
        }
    }

    componentDidMount() {
        this.invitedCode && this.getInviterInfo(this.invitedCode);
        let self = this;
        self.timeout = setTimeout(()=>{
            self.setState({
                addClass:'show-ani'
            })
        },500);
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    getInviterInfo(code) {
        getInviterInfoByCode(code).then((data) => {
            if (data.status == 200) {
                this.setState({
                    username: data.attachment
                });
            }
        })
    }

    render() {
        return (
            <div className="invite-register">
                <div className="register-wrap">
                    <div className="wrap-left">
                        <p className={`friend ${this.state.addClass}`}>{UPEX.lang.template('你的好友{name}', {name: this.state.username})}</p>
                        <p className={`title ${this.state.addClass}`}>{UPEX.lang.template('邀请您注册{sitename}', {sitename: UPEX.config.sitename})}</p>
                        <div className={`btn ${this.state.addClass}`}>
                            <a href={`/register?invite_code=${this.invitedCode}`}>{UPEX.lang.template('立即注册')}</a>
                        </div>
                    </div>
                    <div className={`wrap-right ${this.state.addClass}`}>
                        <div className="des">
                            <span>正规且可信</span>
                            <span>7X24小时委托交易</span>
                            <span>专业风控团队支撑 </span>
                            <span>丰富的货币交易 </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageView;