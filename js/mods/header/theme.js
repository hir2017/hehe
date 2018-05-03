/**
 * @fileoverview 网站主题
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Switch } from 'antd';

@inject('commonStore')
@observer
class ThemeSwitchView extends Component {
	
	switchTheme = (checked)=>{
		let commonStore = this.props.commonStore;

		if (checked) {
			commonStore.changeThemeTo('dark');
		} else {
			commonStore.changeThemeTo('light');
		}
	}
	
	render() {
		if (this.props.commonStore.isTradeCenter) {
			return (
				<div className="theme-menu">
					<label>{ UPEX.lang.template('主题颜色') }</label>
		            <Switch checkedChildren={ UPEX.lang.template('黑')} unCheckedChildren={ UPEX.lang.template('亮')} onChange={this.switchTheme} defaultChecked={ this.props.commonStore.theme === 'dark'}/>
				</div>
			)
		} else {
			return (
				<div className="theme-menu" style={{ display: 'none'}}></div>
			);
		}
		
	}
}

export default ThemeSwitchView;