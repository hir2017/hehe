import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, Popover } from 'antd';

@inject('commonStore')
@observer
class LanguageSwitchView extends Component {
	static defaultProps = {
		root: null
	}
	
	onSwitch(item) {
		this.props.commonStore.changeLanguageTo(item);
	}
	render() {
		let commonStore = this.props.commonStore;
		let { list, cfg } = UPEX.languages;
		let curLang = cfg[commonStore.language];
		let $content;

		$content = (
			<dl className="language-menu-list">
				{
					list.map((item, index)=>{
						let selectedCls = item === commonStore.language ? ' selected' : '';

						return (
							<dd key={index} className={`${item}${selectedCls}`} onClick={this.onSwitch.bind(this, item)}>
								<span className="txt" dangerouslySetInnerHTML={{__html: cfg[item].option}}></span>
							</dd>
						)	
					})
				}
			</dl>
		);

		return (
			<div className="language-menu">
				<Popover content={$content} placement="bottom" getPopupContainer={this.props.root}>
					<span className="langtxt">{ curLang.text }</span>
					<Icon type="caret-down"/> 
				</Popover>
			</div>
		);
	}
}

export default LanguageSwitchView;