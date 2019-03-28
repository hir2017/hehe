import React, { Component } from 'react';
import { Tooltip } from 'antd';

class InfoView extends Component {
    render() {
        return (
            <div className="info">
                <p className="phone">{UPEX.lang.template('CustomerServicePhone')}</p>
                <p className="mail">{UPEX.lang.template('CustomerServiceEmail')}</p>
                {/* {UPEX.config.version == 'infinitex' ? (
                    <div className="brand">
                        <Tooltip title={UPEX.lang.template('GTOfooterbrand提示语')} placement="left" overlayClassName="footer-tooltip">
                            <span className="GTO" />
                        </Tooltip>
                        <Tooltip title={UPEX.lang.template('AFCA')} placement="left" overlayClassName="footer-tooltip">
                            <span className="AFCA" />
                        </Tooltip>
                        <Tooltip title={UPEX.lang.template('ADCA')} placement="left" overlayClassName="footer-tooltip">
                            <span className="ADCA" />
                        </Tooltip>
                    </div>
                ) : (
                    <p className="brand" />
                )} */}
                <div className="icons">
                    {
                        UPEX.config.version === 'ace' ? (
                            <a href={UPEX.config.csurls.line} target="_blank">
                                <i className="icon line" />
                            </a>
                        ) : null
                    }
                    <a href={UPEX.config.csurls.youtube} target="_blank">
                        <i className="icon youtube" />
                    </a>
                    <a href={UPEX.config.csurls.telegram} target="_blank">
                        <i className="icon telegram" />
                    </a>
                    <a href={UPEX.config.version === 'ace' ? UPEX.config.csurls.medium : UPEX.config.csurls.linkedin} target="_blank">
                        <i className={UPEX.config.version === 'ace' ? 'icon media' : 'icon linkedin'} />
                    </a>
                    <a href={UPEX.config.csurls.facebook} target="_blank">
                        <i className="icon facebook" />
                    </a>
                    <a href={UPEX.config.csurls.twitter} target="_blank">
                        <i className="icon twitter" />
                    </a>
                </div>
            </div>
        );
    }
}

export default InfoView;
