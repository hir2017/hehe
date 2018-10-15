/**
 * 我的主页
 */
import '../../../../css/activity/invite.less';
import React, { Component } from "react";
import InviteWelcome from './welcome';
import InviteHome from './home';
import InviteRegister from '../invite-register';

class InviteView extends Component {
	static defaultProps = {
		uid: ''
	}

	constructor(props) {
		super(props);
	}

	render() {
		let type = this.props.params.type;
		let $content;
		
	
		switch(type) {
			case 'home':
				$content = <InviteHome/>
				break;
			case 'register':
				$content = <InviteRegister/>
				break;
			default:
				$content = <InviteWelcome/>
		}
		
		return $content;
	}
}

export default InviteView;
