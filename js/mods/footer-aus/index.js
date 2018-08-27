/**
 * @fileoverview 页尾
 * @author 陈立英
 * @date 2018-04-26
 */

import React, { Component } from "react";
import { observer, inject } from "mobx-react";

import NavsView from "./nav-list";
import InfoView from "./info";


@observer
class Footer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="app-footer" id="J_AppFooter">
                <div className="footer-box">
                    <div className="footer-box-top clearfix">
                        <NavsView />
                        <InfoView />
                    </div>
                    <div className="copyright">
                        {UPEX.lang.template('Copyright')}
                    </div>
                </div>
            </div>
        );
    }
}

export default Footer;
