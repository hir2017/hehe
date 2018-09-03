import React, {Component} from 'react';

class InfoView extends Component {
    render() {
        return (
            <div className="info">
                <p className="phone">{UPEX.lang.template("CustomerServicePhone")}</p>
                <p className="mail">{UPEX.lang.template("CustomerServiceEmail")}</p>
                <div className="icons">
                    <a href={UPEX.config.csurls.telegram} target="_blank" ><i className="icon telegram"></i></a>
                    <a href={UPEX.config.csurls.whatapp} target="_blank"><i className="icon whatapp"></i></a>
                    {/* <a href={UPEX.config.csurls.line} target="_blank"><i className="icon line"></i></a> */}
                    <a href={UPEX.config.csurls.facebook} target="_blank"><i className="icon facebook"></i></a>
                    <a href={UPEX.config.csurls.twitter} target="_blank"><i className="icon twitter"></i></a>
                </div>
            </div>
        );
    }
}

export default  InfoView
