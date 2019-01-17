import React, {Component} from 'react';
import {observer, inject} from 'mobx-react';
import {Icon, Popover} from 'antd';
import {browserHistory} from 'react-router';

@inject('commonStore', 'tradeStore')
@observer
class LanguageSwitchView extends Component {
    static defaultProps = {
        root: null
    }

    onSwitch(item) {
        // 拿不到router
        // console.log(this.props, this.props.router , this.props.route)
        try {
            if (window.location.pathname.indexOf('/news/detail') !== -1) {
                browserHistory.push('/news');
            }
        } catch (error) {
            console.error('language onSwitch', error);
        }

        this.props.commonStore.changeLanguageTo(item);
    }

    render() {
        let {commonStore, tradeStore} = this.props;
        let list = UPEX.config.languages;
        let cfg = UPEX.languagesMap;
        let curLang = cfg[commonStore.language];
        let $content;

        $content = (
            <dl className="menu-list">
                {
                    list.map((item, index) => {
                        let selectedCls = item === commonStore.language ? ' selected' : '';

                        return (
                            <dd key={index} className={`${item}${selectedCls}`}
                                onClick={this.onSwitch.bind(this, item)}>
                                <span className="txt" dangerouslySetInnerHTML={{__html: cfg[item].option}}></span>
                            </dd>
                        )
                    })
                }
            </dl>
        );

        return (
            <div className="language-menu">
                <Popover content={$content} placement="bottomRight" getPopupContainer={this.props.root}
                         overlayClassName={tradeStore.theme=='dark'?"widget-tooltip  dark":"widget-tooltip"}>
                    <span className="langtxt">{curLang.text}</span>
                    <Icon type="down" style={{fontSize: 12, color: '#ebeff5'}}/>
                </Popover>
            </div>
        );
    }
}

export default LanguageSwitchView;
