import React from 'react';
import { Button} from 'antd';
import { browserHistory } from 'react-router';

export const NoAuth = ({title, link, linkTxt, name = 'phone'}) => {
    return (
        <div className={`exc-no-auth-content ${name}`}>
            {title}
            {
                link ? (
                    <div>
                        <Button className="link-btn" onClick={() => {
                            browserHistory.push(link);
                        }}>
                            {linkTxt}
                        </Button>
                    </div>
                ) : null
            }
        </div>
    )
}

/**
 * @fn: 校验
 * @param: {store, title, render, authList }
 * authList: [phone, kyc1, tradePwd, kyc2, GA]
 */
// TODO: 由于react14 还不支持Fragment，所以children不能是string/array, 只能是单一节点的
class Auth extends React.Component {

    authInfo = {
        phone: {
            title: UPEX.lang.template('添加Google绑定前，请先绑定手机号'),
            link: '/user/setting-phone',
            linkTxt: UPEX.lang.template('去绑定手机'),
        },
        kyc1: {
            title: UPEX.lang.template('请先身份认证'),
            link: '/user/authentication',
            linkTxt: UPEX.lang.template('身份认证'),
        },
        tradePwd: {
            title: UPEX.lang.template('请先设置资金密码'),
            link: '/user/set-trade-pwd',
            linkTxt: UPEX.lang.template('设置资金密码'),
        },
        kyc2: {
            title: UPEX.lang.template('请先身份认证'),
            link: '/user/authentication',
            linkTxt: UPEX.lang.template('身份认证'),
        },
        GA: {
            title: UPEX.lang.template('请先绑定谷歌验证码'),
            link: '/user/google',
            linkTxt: UPEX.lang.template('绑定谷歌验证码'),
        },
    }

    goTo(link = '/user/setting-phone') {
        browserHistory.push(link);
    }
    // 校验是否绑定手机
    phone() {
        const {store, title, render} = this.props;
        if (store.userInfo.isValidatePhone == 0) {
            if(render) {
                return render(store);
            }
            let authProps = {
                name: 'phone',
                ...this.authInfo.phone,
                title: title || this.authInfo.phone.title
            }
            return (
                <NoAuth {...authProps}/>
            )
        } else {
            return false;
        }
    }
    // 校验是否已完成身份验证
    kyc1() {
        const {store, title, render} = this.props;
        if (store.userInfo.authLevel < 1) {
            if(render) {
                return render(store);
            }
            let authProps = {
                name: 'kyc1',
                ...this.authInfo.kyc1,
                title: title || this.authInfo.kyc1.title
            }
            return (
                <NoAuth {...authProps}/>
            )
        } else {
            return false;
        }
    }
    // 资金密码设置
    tradePwd() {
        const {store, title, render} = this.props;
        if (store.userInfo.isValidatePass == 0) {
            if(render) {
                return render(store);
            }
            let authProps = {
                name: 'tradePwd',
                ...this.authInfo.tradePwd,
                title: title || this.authInfo.tradePwd.title
            }
            return (
                <NoAuth {...authProps}/>
            )
        } else {
            return false;
        }
    }
    // 校验是否进行身份验证  TODO: 条件不对
    kyc2() {
        const {store, title, render} = this.props;
        if (store.userInfo.isValidatePhone == 0) {
            if(render) {
                return render(store);
            }
            let authProps = {
                name: 'kyc2',
                ...this.authInfo.kyc2,
                title: title || this.authInfo.kyc2.title
            }
            return (
                <NoAuth {...authProps}/>
            )
        } else {
            return false;
        }
    }
    // 谷歌验证绑定
    GA() {
        const {store, title, render} = this.props;
        if (store.userInfo.isGoogleAuth == 0) {
            if(render) {
                return render(store);
            }
            let authProps = {
                name: 'GA',
                ...this.authInfo.GA,
                title: title || this.authInfo.GA.title
            }
            return (
                <NoAuth {...authProps}/>
            )
        } else {
            return false;
        }
    }


    render() {
        const {props} = this;
        const {authList = []} = this.props;
        let $content = props.children;
        if(authList.length !== 0) {
            for(let auth of authList) {
                if(this[auth]) {
                    let fobidContent = this[auth]();
                    if(fobidContent) {
                        $content = fobidContent;
                        break;
                    }
                }
            }
        }
        return $content;
    }
}


export default Auth;
