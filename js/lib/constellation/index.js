/**
 * 背景动效
 * 依赖$或者jQuery
 */
import React from 'react';
import './constellation.min'

export default class View extends React.Component {
    constructor() {
        super();
        this.style = {
            width: '100%',
            height: '100%',
            zIndex: '0',
            position: 'fixed',
            left: '0',
            top: '0',
            backgroundImage: 'linear-gradient(to bottom, #08090b 0%, #202326 100%)'
        };
    }

    componentDidMount() {
        // TODO: 回来在优化吧

        ($.fn.dataAttr = function (a, b) {
            return $(this)[0].getAttribute('data-' + a) || b;
        });

        +(function ($, window) {
            var c = {name: 'TheSaaS', version: '1.5.0'};
            (c.constellation = function () {
                var c = 'rgba(255, 255, 255, .8)',
                    d = 120;
                $(window).width() < 700 && (d = 25),
                    $('.constellation').each(function () {
                        'dark' == $(this).data('color') && (c = 'rgba(0, 0, 0, .5)');
                        var b = $(this).dataAttr('length', 100),
                            e = $(this).dataAttr('radius', 150);
                        $(this).constellation({
                            distance: d,
                            length: b,
                            radius: e,
                            star: {color: c, width: 1},
                            line: {color: c, width: 0.2}
                        });
                    });
            }),
                (window.thesaas = c);
        })($, window);
        $(function () {
            thesaas.constellation();
        })
    }

    render() {
        return <canvas className="constellation" style={this.style}/>;
    }
}
