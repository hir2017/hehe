import React from 'react';
import { observer, inject } from 'mobx-react';
import { Loading } from '@/mods/authhoc/user';
import PageWrapper from '@/components/page-user/page-wrapper';

@inject('userInfoStore')
@observer
class View extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    init = () => {
        return this.props.userInfoStore.getUserInfo();
    };

    render() {
        return (
            <PageWrapper title={UPEX.lang.template('Google验证器')}>
                <Loading init={this.init} isAuth store={this.props.userInfoStore}>
                    <div>2222 22</div>
                </Loading>
            </PageWrapper>
        );
    }
}

export default View;
