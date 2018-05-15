/**
 * @fileoverview 页尾
 * @author 陈立英
 * @date 2018-04-26
 */

import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Link } from 'react-router';

@observer
class Footer extends Component {
 	render() {
 		return (
 			<div className="app-footer" id="J_AppFooter">
 				<div className="footer-box">
 					<ul>
 						<li>
 							<Link to="/about">{ UPEX.lang.template('关于我们')}</Link>
 						</li>
 						<li>
 							<Link to="/contact">{ UPEX.lang.template('联系我们')}</Link>
 						</li>
 						<li>
 							<Link to="/careers">{ UPEX.lang.template('招贤纳士')}</Link>
 						</li>
 						<li>
 							<Link to="/cooperation">{ UPEX.lang.template('商务合作')}</Link>
 						</li>
 						<li>
 							<Link to="/feedback">{ UPEX.lang.template('帮助与反馈')}</Link>
 						</li>
 					</ul>
 				</div>
 			</div>
 		);
 	}
 }

 export default Footer;