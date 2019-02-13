import React from 'react';
import { Button} from 'antd';
import { browserHistory } from 'react-router';

/**
 * @param: {store, title, render }
 */
// TODO: 由于react14 还不支持Fragment，所以children不能是string/array, 只能是单一节点的
class Auth extends React.Component {

    goTo(link = '/user/setting-phone') {
        browserHistory.push(link);
    }

    render() {
        const {props} = this;
        const {store, title, render} = props;
        if (store.userInfo.isValidatePhone == 0) {
            if(render) {
                return render(store);
            }
            return (
                <div className="no-auth-content phone">
                    {title || UPEX.lang.template('添加Google绑定前，请先绑定手机号')}
                    <div>
                        <Button onClick={this.goTo}>
                            {UPEX.lang.template('去绑定手机')}
                        </Button>
                    </div>
                </div>
            )
        }
        return props.children;
    }
}


export default Auth;
