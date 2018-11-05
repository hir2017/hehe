/**
 * @fileoverview 网站主题
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Switch } from 'antd';
import Gtag from '@/lib/ga-analytics';

@inject('commonStore', 'tradeStore')
@observer
class ThemeSwitchView extends Component {

	switchTheme = (checked)=>{
        let store = this.props.tradeStore;
        let theme;
        if (checked) {
            theme = 'dark';
        } else {
            theme = 'light';
        }
        // 谷歌埋点
        Gtag.click(`webtradeThemeIn${theme.replace(/\w{1}/i, (str) => str.toUpperCase())}`);
        store.changeThemeTo(theme);

        $.channel.emit('switchTheme', theme)
    }

	render() {
		let store = this.props.tradeStore;

		if (this.props.commonStore.isTradeCenter) {
			return (
				<ul>
					<li className="theme-menu" data-theme={store.theme}>
						<label className="on">{UPEX.lang.template('开灯')}</label>
	                    <Switch
	                        onChange={this.switchTheme}
	                        defaultChecked={store.theme === 'dark'}
	                    />
	                    <label className="off">{ UPEX.lang.template('关灯')}</label>
					</li>
					<li className="split">|</li>
				</ul>
			)
		} else {
			return (
				<ul><li className="theme-menu" style={{ display: 'none'}}></li></ul>
			);
		}

	}
}

export default ThemeSwitchView;
