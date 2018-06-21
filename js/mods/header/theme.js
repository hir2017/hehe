/**
 * @fileoverview 网站主题
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Switch } from 'antd';

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

        setTimeout(()=>{
            store.changeThemeTo(theme);
        }, 0);

        $.channel.emit('switchTheme', theme)
    }
	
	render() {
		let store = this.props.tradeStore;
        let checked = store.theme === 'dark';

		if (this.props.commonStore.isTradeCenter) {
			return (
				<li className="theme-menu">
					<label>{ checked ? UPEX.lang.template('开灯') : UPEX.lang.template('关灯') }</label>
                        <Switch
                            onChange={this.switchTheme}
                            defaultChecked={store.theme === 'dark'}
                        />
				</li>
			)
		} else {
			return (
				<li className="theme-menu" style={{ display: 'none'}}></li>
			);
		}
		
	}
}

export default ThemeSwitchView;