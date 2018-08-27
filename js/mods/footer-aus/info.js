import React, {Component} from 'react';

class InfoView extends Component {
    render() {
        return (
            <div className="info">
                <p className="phone">{UPEX.lang.template("400-666-8888")}</p>
                <p className="mail">{UPEX.lang.template("support@infinitex.com.au")}</p>
                <div className="icons">
                    <a href={UPEX.lang.template("页脚telegram链接")} title="/"><i className="icon telegram"></i></a>
                    <a href={UPEX.lang.template("页脚line链接")} title="/"><i className="icon line"></i></a>
                    <a href={UPEX.lang.template("页脚facebook链接")} title="/"><i className="icon facebook"></i></a>
                    <a href={UPEX.lang.template("页脚twitter链接")} title="/"><i className="icon twitter"></i></a>
                </div>
            </div>
        );
    }
}

export default  InfoView
