import React, {Component} from 'react';

class InfoView extends Component {
    render() {
        return (
            <div className="info">
                <p className="phone">{UPEX.lang.template("CustomerServicePhone")}</p>
                <p className="mail">{UPEX.lang.template("CustomerServiceEmail")}</p>
                <div className="icons">
                    <a href="/" title="/"><i className="icon telegram"></i></a>
                    <a href="/" title="/"><i className="icon line"></i></a>
                    <a href="/" title="/"><i className="icon facebook"></i></a>
                    <a href="/" title="/"><i className="icon twitter"></i></a>
                </div>
            </div>
        );
    }
}

export default  InfoView
