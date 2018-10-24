import React, {Component} from 'react';
import {Tooltip} from 'antd';

const des = UPEX.lang.template('ADCA');

class InfoView extends Component{
    render() {
        return (
            <div className="info">
                <p className="phone">{UPEX.lang.template("CustomerServicePhone")}</p>
                <p className="mail">{UPEX.lang.template("CustomerServiceEmail")}</p>
                {
                    UPEX.config.version == 'infinitex'?( <Tooltip title={des} placement="leftBottom">
                        <p className="brand" ref="brand"></p>
                    </Tooltip>):null
                }
                <div className="icons">
                    <a href={UPEX.config.csurls.youtube} target="_blank"><i className="icon youtube"></i></a>
                    <a href={UPEX.config.csurls.telegram} target="_blank" ><i className="icon telegram"></i></a>
                    <a href={UPEX.config.csurls.linkedin} target="_blank"><i className="icon linkedin"></i></a>
                    <a href={UPEX.config.csurls.facebook} target="_blank"><i className="icon facebook"></i></a>
                    <a href={UPEX.config.csurls.twitter} target="_blank"><i className="icon twitter"></i></a>
                </div>
            </div>
        );
    }
}

export default  InfoView
