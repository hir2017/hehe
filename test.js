(this.webpackJsonp = this.webpackJsonp || []).push([
    [11], {
        1119: function (e, t, r) {
            "use strict";
            var o = r(29);
            r.d(t, "a", function () {
                return o.d
            })
        }, 1126: function (e, t, r) {
            "use strict";
            var o, n = r(1),
                i = r(34),
                a = r.n(i),
                l = r(1111),
                s = r.n(l),
                c = r(1171),
                u = r.n(c),
                d = (o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, function (e, t, r, n) {
                    var i = e && e.defaultProps,
                        a = arguments.length - 3;
                    if (t || 0 === a || (t = {}), t && i)
                        for (var l in i) void 0 === t[l] && (t[l] = i[l]);
                    else t || (t = i || {}); if (1 === a) t.children = n;
                    else if (a > 1) {
                        for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                        t.children = s
                    }
                    return {
                        $$typeof: o,
                        type: e,
                        key: void 0 === r ? null : "" + r,
                        ref: null,
                        props: t,
                        _owner: null
                    }
                }),
                f = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function p(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var h = s.a.bind(u.a),
                b = 1,
                v = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = p(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.modalDiv = null, o.onModalClick = function (e) {
                            return e.stopPropagation()
                        }, p(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, n["PureComponent"]), f(t, [{
                        key: "UNSAFE_componentWillMount",
                        value: function () {
                            if (document.body) {
                                var e = document.createElement("div");
                                e.setAttribute("style", "z-index: " + b + ";"), b++, document.body && document.body.appendChild(e), this.modalDiv = e
                            }
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            this.modalDiv && document.body && document.body.removeChild(this.modalDiv)
                        }
                    }, {
                        key: "render",
                        value: function () {
                            return a.a.createPortal(this.renderModalDiv, this.modalDiv)
                        }
                    }, {
                        key: "renderModalDiv",
                        get: function () {
                            var e = this.props,
                                t = e.onClose,
                                r = e.children,
                                o = e.title;
                            return d("div", {
                                onClick: t,
                                className: h("overlay")
                            }, void 0, d("div", {
                                onClick: this.onModalClick,
                                className: h("modal")
                            }, void 0, d("div", {
                                className: h("header")
                            }, void 0, d("div", {
                                className: h("title")
                            }, void 0, o), t && d("span", {
                                className: h("close"),
                                onClick: t
                            }, void 0, "脳")), r))
                        }
                    }]), t
                }();
            r.d(t, "a", function () {
                return v
            })
        }, 1127: function (e, t, r) {
            "use strict";
            var o, n = r(1),
                i = r.n(n),
                a = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                l = (o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, function (e, t, r, n) {
                    var i = e && e.defaultProps,
                        a = arguments.length - 3;
                    if (t || 0 === a || (t = {}), t && i)
                        for (var l in i) void 0 === t[l] && (t[l] = i[l]);
                    else t || (t = i || {}); if (1 === a) t.children = n;
                    else if (a > 1) {
                        for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                        t.children = s
                    }
                    return {
                        $$typeof: o,
                        type: e,
                        key: void 0 === r ? null : "" + r,
                        ref: null,
                        props: t,
                        _owner: null
                    }
                });
            var s = function (e) {
                    e.styles;
                    var t = function (e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    }(e, ["styles"]);
                    return i.a.createElement("svg", a({
                        width: "135",
                        height: "140",
                        viewBox: "0 0 135 140",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "#fff"
                    }, t), l("rect", {
                        y: "10",
                        width: "15",
                        height: "120",
                        rx: "6"
                    }, void 0, l("animate", {
                        attributeName: "height",
                        begin: "0.5s",
                        dur: "1s",
                        values: "120;110;100;90;80;70;60;50;40;140;120",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    }), l("animate", {
                        attributeName: "y",
                        begin: "0.5s",
                        dur: "1s",
                        values: "10;15;20;25;30;35;40;45;50;0;10",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })), l("rect", {
                        x: "30",
                        y: "10",
                        width: "15",
                        height: "120",
                        rx: "6"
                    }, void 0, l("animate", {
                        attributeName: "height",
                        begin: "0.25s",
                        dur: "1s",
                        values: "120;110;100;90;80;70;60;50;40;140;120",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    }), l("animate", {
                        attributeName: "y",
                        begin: "0.25s",
                        dur: "1s",
                        values: "10;15;20;25;30;35;40;45;50;0;10",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })), l("rect", {
                        x: "60",
                        width: "15",
                        height: "140",
                        rx: "6"
                    }, void 0, l("animate", {
                        attributeName: "height",
                        begin: "0s",
                        dur: "1s",
                        values: "120;110;100;90;80;70;60;50;40;140;120",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    }), l("animate", {
                        attributeName: "y",
                        begin: "0s",
                        dur: "1s",
                        values: "10;15;20;25;30;35;40;45;50;0;10",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })), l("rect", {
                        x: "90",
                        y: "10",
                        width: "15",
                        height: "120",
                        rx: "6"
                    }, void 0, l("animate", {
                        attributeName: "height",
                        begin: "0.25s",
                        dur: "1s",
                        values: "120;110;100;90;80;70;60;50;40;140;120",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    }), l("animate", {
                        attributeName: "y",
                        begin: "0.25s",
                        dur: "1s",
                        values: "10;15;20;25;30;35;40;45;50;0;10",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })), l("rect", {
                        x: "120",
                        y: "10",
                        width: "15",
                        height: "120",
                        rx: "6"
                    }, void 0, l("animate", {
                        attributeName: "height",
                        begin: "0.5s",
                        dur: "1s",
                        values: "120;110;100;90;80;70;60;50;40;140;120",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    }), l("animate", {
                        attributeName: "y",
                        begin: "0.5s",
                        dur: "1s",
                        values: "10;15;20;25;30;35;40;45;50;0;10",
                        calcMode: "linear",
                        repeatCount: "indefinite"
                    })))
                },
                c = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                u = function (e) {
                    var t = e.height,
                        r = void 0 === t ? 35 : t,
                        o = e.opacity;
                    return c(s, {
                        height: r,
                        style: {
                            opacity: void 0 === o ? .25 : o,
                            display: "inline-block"
                        }
                    })
                };
            r.d(t, "a", function () {
                return u
            })
        }, 1135: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "font-family": "opensans, sans-serif",
                fontFamily: "opensans, sans-serif",
                "font-size": "10",
                fontSize: "10",
                "font-weight": "bold",
                fontWeight: "bold",
                "text-color": "rgba(255, 255, 255, 0.7)",
                textColor: "rgba(255, 255, 255, 0.7)",
                "axis-color": "rgba(255, 255, 255, 0.4)",
                axisColor: "rgba(255, 255, 255, 0.4)",
                "axis-line-width": "0.5",
                axisLineWidth: "0.5",
                "x-axis-text-align": "center",
                xAxisTextAlign: "center",
                "x-axis-text-baseline": "top",
                xAxisTextBaseline: "top",
                "y-axis-text-align": "left",
                yAxisTextAlign: "left",
                "y-axis-text-baseline": "middle",
                yAxisTextBaseline: "middle",
                "y-axis-left-padding": "6",
                yAxisLeftPadding: "6",
                "y-axis-right-padding": "10",
                yAxisRightPadding: "10",
                "price-arrow-background": "#1e2b34",
                priceArrowBackground: "#1e2b34",
                "price-arrow-color": "#fff",
                priceArrowColor: "#fff",
                "price-arrow-line-width": "2",
                priceArrowLineWidth: "2",
                "position-font-size": "9",
                positionFontSize: "9",
                "position-text-align": "left",
                positionTextAlign: "left",
                "position-text-baseline": "top",
                positionTextBaseline: "top",
                "call-price-color": "#f9672d",
                callPriceColor: "#f9672d",
                "short-color": "#f9672d",
                shortColor: "#f9672d",
                "long-color": "#7bee5b",
                longColor: "#7bee5b",
                "crosshairs-color": "rgba(255, 255, 255, 0.3)",
                crosshairsColor: "rgba(255, 255, 255, 0.3)",
                "price-chart": "PriceChart_price-chart_19uB9",
                priceChart: "PriceChart_price-chart_19uB9",
                container: "PriceChart_container_2nAZt",
                center: "PriceChart_center_2JBZw",
                message: "PriceChart_message_1KWTt"
            }
        }, 1145: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "bids-stroke-style": "#84f766",
                bidsStrokeStyle: "#84f766",
                "bids-fill-style": "rgba(132, 247, 102, 0.15)",
                bidsFillStyle: "rgba(132, 247, 102, 0.15)",
                "asks-stroke-style": "#ff6939",
                asksStrokeStyle: "#ff6939",
                "asks-fill-style": "rgba(255, 105, 57, 0.2)",
                asksFillStyle: "rgba(255, 105, 57, 0.2)",
                "line-color": "rgba(255, 255, 255, 0.2)",
                lineColor: "rgba(255, 255, 255, 0.2)",
                "text-color": "rgba(255, 255, 255, 0.7)",
                textColor: "rgba(255, 255, 255, 0.7)"
            }
        }, 1146: function (e, t, r) {
            "use strict";
            var o = r(29);
            r.d(t, "a", function () {
                return o.b
            })
        }, 1147: function (e, t, r) {
            "use strict";
            var o, n, i, a = r(0),
                l = r(3),
                s = r.n(l),
                c = r(1138),
                u = r(1154),
                d = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function f(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function p(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function h(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var b = (o = function (e) {
                function t() {
                    var e, r, o;
                    ! function (e, t) {
                        if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                    }(this, t);
                    for (var a = arguments.length, l = Array(a), s = 0; s < a; s++) l[s] = arguments[s];
                    return r = o = p(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), f(o, "feeRate", n, o), f(o, "exchangeFeeRates", i, o), p(o, r)
                }
                return function (e, t) {
                    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                    e.prototype = Object.create(t && t.prototype, {
                        constructor: {
                            value: e,
                            enumerable: !1,
                            writable: !0,
                            configurable: !0
                        }
                    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                }(t, c["a"]), d(t, [{
                    key: "findRateForValue",
                    value: function (e) {
                        var t = this.exchangeFeeRates.find(function (t) {
                            return t.usd_to && t.usd_from && e.lte(t.usd_to) && e.gte(t.usd_from)
                        });
                        return t || null
                    }
                }, {
                    key: "_fetch",
                    value: function () {
                        var e, t = (e = regeneratorRuntime.mark(function e() {
                            var t, r, o = this;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return e.prev = 0, e.next = 3, u.a.exchange();
                                case 3:
                                    return t = e.sent, Object(a.runInAction)(function () {
                                        return o.exchangeFeeRates = t
                                    }), e.next = 7, u.a.user();
                                case 7:
                                    r = e.sent, Object(a.runInAction)(function () {
                                        return o.feeRate = r || null
                                    }), e.next = 14;
                                    break;
                                case 11:
                                    e.prev = 11, e.t0 = e.catch(0), Object(a.runInAction)(function () {
                                        o.feeRate = null
                                    });
                                case 14:
                                case "end":
                                    return e.stop()
                                }
                            }, e, this, [
                                [0, 11]
                            ])
                        }), function () {
                            var t = e.apply(this, arguments);
                            return new Promise(function (e, r) {
                                return function o(n, i) {
                                    try {
                                        var a = t[n](i),
                                            l = a.value
                                    } catch (e) {
                                        return void r(e)
                                    }
                                    if (!a.done) return Promise.resolve(l).then(function (e) {
                                        o("next", e)
                                    }, function (e) {
                                        o("throw", e)
                                    });
                                    e(l)
                                }("next")
                            })
                        });
                        return function () {
                            return t.apply(this, arguments)
                        }
                    }()
                }, {
                    key: "makerFee",
                    get: function () {
                        return s()(0)
                    }
                }, {
                    key: "takerFee",
                    get: function () {
                        return this.feeRate ? this.feeRate.fee.mul(100) : null
                    }
                }, {
                    key: "usdVolume",
                    get: function () {
                        return this.feeRate ? this.feeRate.usd_volume : null
                    }
                }, {
                    key: "feesAccrued",
                    get: function () {
                        var e = this.usdVolume,
                            t = this.exchangeFeeRates;
                        if (e) {
                            var r = s()(0);
                            return t.forEach(function (t) {
                                var o = t.usd_from,
                                    n = t.usd_to,
                                    i = t.fee;
                                if (n && o && e.gte(o)) {
                                    var a = (e.gt(n) ? n : e).sub(o).mul(i);
                                    r = r.add(a)
                                }
                            }), r
                        }
                    }
                }, {
                    key: "nextRate",
                    get: function () {
                        var e = (this.feeRate || {}).usd_to;
                        if (!e) return null;
                        var t = this.findRateForValue(e.add(1));
                        return {
                            rate: t ? t.fee.mul(100) : null,
                            nextVolume: e
                        }
                    }
                }]), t
            }(), n = h(o.prototype, "feeRate", [a.observable], {
                enumerable: !0,
                initializer: function () {
                    return null
                }
            }), i = h(o.prototype, "exchangeFeeRates", [a.observable], {
                enumerable: !0,
                initializer: function () {
                    return []
                }
            }), h(o.prototype, "makerFee", [a.computed], Object.getOwnPropertyDescriptor(o.prototype, "makerFee"), o.prototype), h(o.prototype, "takerFee", [a.computed], Object.getOwnPropertyDescriptor(o.prototype, "takerFee"), o.prototype), h(o.prototype, "usdVolume", [a.computed], Object.getOwnPropertyDescriptor(o.prototype, "usdVolume"), o.prototype), h(o.prototype, "feesAccrued", [a.computed], Object.getOwnPropertyDescriptor(o.prototype, "feesAccrued"), o.prototype), h(o.prototype, "nextRate", [a.computed], Object.getOwnPropertyDescriptor(o.prototype, "nextRate"), o.prototype), o);
            t.a = new b
        }, 1149: function (e, t, r) {
            "use strict";
            var o, n, i = r(1),
                a = r(7),
                l = r(1111),
                s = r.n(l),
                c = r(1173),
                u = r.n(c),
                d = (o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, function (e, t, r, n) {
                    var i = e && e.defaultProps,
                        a = arguments.length - 3;
                    if (t || 0 === a || (t = {}), t && i)
                        for (var l in i) void 0 === t[l] && (t[l] = i[l]);
                    else t || (t = i || {}); if (1 === a) t.children = n;
                    else if (a > 1) {
                        for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                        t.children = s
                    }
                    return {
                        $$typeof: o,
                        type: e,
                        key: void 0 === r ? null : "" + r,
                        ref: null,
                        props: t,
                        _owner: null
                    }
                }),
                f = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function p(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var h = s.a.bind(u.a),
                b = Object(a.c)(n = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = p(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.onScrollRef = function (e) {
                            o.scroller = e, o.hideScrollbars()
                        }, o.hideScrollbars = function () {
                            if (o.scroller) {
                                var e = o.scroller.offsetWidth - o.scroller.clientWidth;
                                e && (o.scroller.style.marginRight = -e + "px")
                            }
                        }, p(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, i["Component"]), f(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.children,
                                r = e.className,
                                o = void 0 === r ? "" : r;
                            return d("div", {
                                className: h("container") + " " + o
                            }, void 0, i.createElement("div", {
                                className: h("scroller"),
                                ref: this.onScrollRef
                            }, t))
                        }
                    }]), t
                }()) || n;
            r.d(t, "a", function () {
                return b
            })
        }, 1150: function (e, t, r) {
            "use strict";
            r(1);
            var o, n = r(1111),
                i = r.n(n),
                a = r(1175),
                l = r.n(a),
                s = (o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, function (e, t, r, n) {
                    var i = e && e.defaultProps,
                        a = arguments.length - 3;
                    if (t || 0 === a || (t = {}), t && i)
                        for (var l in i) void 0 === t[l] && (t[l] = i[l]);
                    else t || (t = i || {}); if (1 === a) t.children = n;
                    else if (a > 1) {
                        for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                        t.children = s
                    }
                    return {
                        $$typeof: o,
                        type: e,
                        key: void 0 === r ? null : "" + r,
                        ref: null,
                        props: t,
                        _owner: null
                    }
                }),
                c = i.a.bind(l.a),
                u = function (e) {
                    var t = e.children,
                        r = e.title,
                        o = e.full;
                    return s("aside", {
                        className: c("sidebar", {
                            full: o
                        })
                    }, void 0, r && s("h2", {
                        className: c("header")
                    }, void 0, r), t)
                };
            r.d(t, "a", function () {
                return u
            })
        }, 1151: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "volume-color": "rgba(255, 255, 255, 0.1)",
                volumeColor: "rgba(255, 255, 255, 0.1)",
                "candle-green-color": "rgba(132, 247, 102, 0.75)",
                candleGreenColor: "rgba(132, 247, 102, 0.75)",
                "candle-green-background": "#1e2b34",
                candleGreenBackground: "#1e2b34",
                "candle-red-color": "rgba(255, 105, 57, 0.75)",
                candleRedColor: "rgba(255, 105, 57, 0.75)",
                "candle-red-background": "#ff6939",
                candleRedBackground: "#ff6939",
                "ema-color1": "#e98e39",
                emaColor1: "#e98e39",
                "ema-color2": "#7f8b9e",
                emaColor2: "#7f8b9e",
                "ema-line-width": "1.5",
                emaLineWidth: "1.5",
                "highlight-volume-color": "rgba(255, 255, 255, 0.25)",
                highlightVolumeColor: "rgba(255, 255, 255, 0.25)",
                "highlight-green-color": "#97f87e",
                highlightGreenColor: "#97f87e",
                "highlight-red-color": "#ff7c53",
                highlightRedColor: "#ff7c53"
            }
        }, 1152: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "order-form": "OrderForm_order-form_3tYXA",
                orderForm: "OrderForm_order-form_3tYXA",
                form: "OrderForm_form_3G-1Y",
                "trade-type": "OrderForm_trade-type_2n2ja",
                tradeType: "OrderForm_trade-type_2n2ja",
                "trade-type-tab": "OrderForm_trade-type-tab_16x8b",
                tradeTypeTab: "OrderForm_trade-type-tab_16x8b",
                active: "OrderForm_active_1B_C9",
                toggle: "OrderForm_toggle_szRGD",
                small: "OrderForm_small_tOuvz",
                "toggle-tab": "OrderForm_toggle-tab_WdKMS",
                toggleTab: "OrderForm_toggle-tab_WdKMS",
                disabled: "OrderForm_disabled_18KS5",
                buy: "OrderForm_buy_1TgYM",
                sell: "OrderForm_sell_1Fb7k",
                section: "OrderForm_section_1Ul88",
                "section-header": "OrderForm_section-header_3jZci",
                sectionHeader: "OrderForm_section-header_3jZci",
                "input-box": "OrderForm_input-box_q2hVB",
                inputBox: "OrderForm_input-box_q2hVB",
                "advanced-section": "OrderForm_advanced-section_aHx_v",
                advancedSection: "OrderForm_advanced-section_aHx_v",
                header: "OrderForm_header_28iaj",
                spacer: "OrderForm_spacer_1fzOj",
                "advanced-content": "OrderForm_advanced-content_35it2",
                advancedContent: "OrderForm_advanced-content_35it2",
                show: "OrderForm_show_2IO-I",
                note: "OrderForm_note_2YX8W",
                estimations: "OrderForm_estimations_1Wdtj",
                "order-total": "OrderForm_order-total_M8rVd",
                orderTotal: "OrderForm_order-total_M8rVd",
                "fee-description": "OrderForm_fee-description_448iY",
                feeDescription: "OrderForm_fee-description_448iY",
                currency: "OrderForm_currency_3BQou",
                total: "OrderForm_total_dHv4y",
                fee: "OrderForm_fee_KyTNT",
                error: "OrderForm_error_32z0Y"
            }
        }, 1166: function (e, t, r) {
            "use strict";
            var o, n = r(1),
                i = r.n(n),
                a = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                l = (o = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, function (e, t, r, n) {
                    var i = e && e.defaultProps,
                        a = arguments.length - 3;
                    if (t || 0 === a || (t = {}), t && i)
                        for (var l in i) void 0 === t[l] && (t[l] = i[l]);
                    else t || (t = i || {}); if (1 === a) t.children = n;
                    else if (a > 1) {
                        for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                        t.children = s
                    }
                    return {
                        $$typeof: o,
                        type: e,
                        key: void 0 === r ? null : "" + r,
                        ref: null,
                        props: t,
                        _owner: null
                    }
                });
            t.a = function (e) {
                e.styles;
                var t = function (e, t) {
                    var r = {};
                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                    return r
                }(e, ["styles"]);
                return i.a.createElement("svg", a({
                    width: "77",
                    height: "77",
                    viewBox: "0 0 77 77",
                    xmlns: "http://www.w3.org/2000/svg"
                }, t), l("title", {}, void 0, "icon-success"), l("g", {
                    stroke: "#1F3543",
                    strokeWidth: "4",
                    fill: "none",
                    fillRule: "evenodd"
                }, void 0, l("path", {
                    d: "M52.35 30.38L33.054 48.39l-6.434-6.43"
                }), l("path", {
                    d: "M74.968 38.484c0 20.15-16.34 36.484-36.484 36.484C18.33 74.968 2 58.634 2 38.484 2 18.334 18.33 2 38.484 2c20.144 0 36.484 16.333 36.484 36.484z"
                })))
            }
        }, 1171: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                overlay: "Modal_overlay_1qU--",
                modal: "Modal_modal_299mq",
                header: "Modal_header_GHKeE",
                title: "Modal_title_302Ks",
                close: "Modal_close_3IHFG",
                error: "Modal_error_Zx795",
                button: "Modal_button_1Q5Lc",
                disabled: "Modal_disabled_3MfDs"
            }
        }, 1173: function (e, t, r) {
            e.exports = {
                container: "FlexHiddenScrollbars_container_2rcJs",
                scroller: "FlexHiddenScrollbars_scroller_3ko3v"
            }
        }, 1175: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                sidebar: "Sidebar_sidebar_3HKVm",
                full: "Sidebar_full_1F6Hj",
                header: "Sidebar_header_3RlqG"
            }
        }, 1191: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "candle-green-color": "rgba(132, 247, 102, 0.75)",
                candleGreenColor: "rgba(132, 247, 102, 0.75)",
                "candle-red-color": "#ff6939",
                candleRedColor: "#ff6939",
                "line-width": "1.5",
                lineWidth: "1.5",
                "line-color": "#4386c7",
                lineColor: "#4386c7",
                "line-gradient-color1": "rgba(67, 134, 199, 0.7)",
                lineGradientColor1: "rgba(67, 134, 199, 0.7)",
                "line-gradient-color2": "transparent",
                lineGradientColor2: "transparent"
            }
        }, 1192: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "fill-list": "FillList_fill-list_2PDVd",
                fillList: "FillList_fill-list_2PDVd",
                row: "FillList_row_2P1c8",
                column: "FillList_column_3AhAj",
                "fill-size": "FillList_fill-size_VR8IR",
                fillSize: "FillList_fill-size_VR8IR",
                "fill-price": "FillList_fill-price_IOBZk",
                fillPrice: "FillList_fill-price_IOBZk",
                "fill-fee": "FillList_fill-fee_3YU2z",
                fillFee: "FillList_fill-fee_3YU2z",
                "fill-time": "FillList_fill-time_3Ne61",
                fillTime: "FillList_fill-time_3Ne61",
                "fill-product": "FillList_fill-product_1YBvF",
                fillProduct: "FillList_fill-product_1YBvF",
                "list-header": "FillList_list-header_3I604",
                listHeader: "FillList_list-header_3I604",
                small: "FillList_small_1ORvK",
                list: "FillList_list_1ZOcI",
                "split-number": "FillList_split-number_2eMKo",
                splitNumber: "FillList_split-number_2eMKo",
                faded: "FillList_faded_1Fidx",
                red: "FillList_red_2OBYk",
                green: "FillList_green_3AJNz",
                "empty-message": "FillList_empty-message_1d1Q3",
                emptyMessage: "FillList_empty-message_1d1Q3",
                fill: "FillList_fill_2WvoC",
                "fill-tag": "FillList_fill-tag_2z94I",
                fillTag: "FillList_fill-tag_2z94I",
                buy: "FillList_buy_18n1H",
                sell: "FillList_sell_1GJxT"
            }
        }, 1246: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                scene: "Trade_scene_GDQ9V",
                "main-content": "Trade_main-content_3KO8p",
                mainContent: "Trade_main-content_3KO8p",
                "tab-bar": "Trade_tab-bar_uZsqk",
                tabBar: "Trade_tab-bar_uZsqk",
                tab: "Trade_tab_30lmU",
                active: "Trade_active_fVKrm"
            }
        }, 1248: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "trade-history-panel": "TradeHistoryPanel_trade-history-panel_2InIC",
                tradeHistoryPanel: "TradeHistoryPanel_trade-history-panel_2InIC"
            }
        }, 1250: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "chart-panel": "ChartPanel_chart-panel_3Ms26",
                chartPanel: "ChartPanel_chart-panel_3Ms26",
                charts: "ChartPanel_charts_1deCr",
                chart: "ChartPanel_chart_2xf5I",
                show: "ChartPanel_show_1fdQq",
                "header-tabs": "ChartPanel_header-tabs_1-c6m",
                headerTabs: "ChartPanel_header-tabs_1-c6m",
                "price-chart": "ChartPanel_price-chart_2IinR",
                priceChart: "ChartPanel_price-chart_2IinR",
                "depth-chart": "ChartPanel_depth-chart_2B5eL",
                depthChart: "ChartPanel_depth-chart_2B5eL"
            }
        }, 1252: function (e, t, r) {
            e.exports = {
                container: "DepthChart_container_27Kyt",
                spinner: "DepthChart_spinner_1cUp1"
            }
        }, 1254: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "chart-hover": "MouseInfo_chart-hover_Ooa6P",
                chartHover: "MouseInfo_chart-hover_Ooa6P",
                "is-bid": "MouseInfo_is-bid_1L2Pv",
                isBid: "MouseInfo_is-bid_1L2Pv",
                "hover-header": "MouseInfo_hover-header_9hpsE",
                hoverHeader: "MouseInfo_hover-header_9hpsE",
                "hover-content": "MouseInfo_hover-content_2Frgo",
                hoverContent: "MouseInfo_hover-content_2Frgo",
                left: "MouseInfo_left_2BI0X",
                label: "MouseInfo_label_8W5Jv"
            }
        }, 1257: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                controls: "ZoomControls_controls_3kwhH",
                "midprice-wrapper": "ZoomControls_midprice-wrapper_3HQzz",
                midpriceWrapper: "ZoomControls_midprice-wrapper_3HQzz",
                midprice: "ZoomControls_midprice_1Fccb",
                "zoom-out": "ZoomControls_zoom-out_8NZ9p",
                zoomOut: "ZoomControls_zoom-out_8NZ9p",
                "zoom-in": "ZoomControls_zoom-in_1EFH5",
                zoomIn: "ZoomControls_zoom-in_1EFH5"
            }
        }, 1258: function (e, t, r) {
            e.exports = function () {
                return r(546)('!function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="https://assets.coinbase.com/exchange/",r(r.s=4)}([function(e,t,r){var n;!function(i){"use strict";var s,o=20,u=1,l=1e6,a=-7,f=21,c="[big.js] ",h=c+"Invalid ",v=h+"decimal places",d=h+"rounding mode",p={},g=void 0,b=/^-?(\\d+(\\.\\d*)?|\\.\\d+)(e[+-]?\\d+)?$/i;function y(e,t,r,n){var i=e.c,s=e.e+t+1;if(s<i.length){if(1===r)n=i[s]>=5;else if(2===r)n=i[s]>5||5==i[s]&&(n||s<0||i[s+1]!==g||1&i[s-1]);else if(3===r)n=n||i[s]!==g||s<0;else if(n=!1,0!==r)throw Error(d);if(s<1)i.length=1,n?(e.e=-t,i[0]=1):i[0]=e.e=0;else{if(i.length=s--,n)for(;++i[s]>9;)i[s]=0,s--||(++e.e,i.unshift(1));for(s=i.length;!i[--s];)i.pop()}}else if(r<0||r>3||r!==~~r)throw Error(d);return e}function m(e,t,r,n){var i,s,o=e.constructor,u=!e.c[0];if(r!==g){if(r!==~~r||r<(3==t)||r>l)throw Error(3==t?h+"precision":v);for(r=n-(e=new o(e)).e,e.c.length>++n&&y(e,r,o.RM),2==t&&(n=e.e+r+1);e.c.length<n;)e.c.push(0)}if(i=e.e,r=(s=e.c.join("")).length,2!=t&&(1==t||3==t&&n<=i||i<=o.NE||i>=o.PE))s=s.charAt(0)+(r>1?"."+s.slice(1):"")+(i<0?"e":"e+")+i;else if(i<0){for(;++i;)s="0"+s;s="0."+s}else if(i>0)if(++i>r)for(i-=r;i--;)s+="0";else i<r&&(s=s.slice(0,i)+"."+s.slice(i));else r>1&&(s=s.charAt(0)+"."+s.slice(1));return e.s<0&&(!u||4==t)?"-"+s:s}p.abs=function(){var e=new this.constructor(this);return e.s=1,e},p.cmp=function(e){var t,r=this,n=r.c,i=(e=new r.constructor(e)).c,s=r.s,o=e.s,u=r.e,l=e.e;if(!n[0]||!i[0])return n[0]?s:i[0]?-o:0;if(s!=o)return s;if(t=s<0,u!=l)return u>l^t?1:-1;for(o=(u=n.length)<(l=i.length)?u:l,s=-1;++s<o;)if(n[s]!=i[s])return n[s]>i[s]^t?1:-1;return u==l?0:u>l^t?1:-1},p.div=function(e){var t=this,r=t.constructor,n=t.c,i=(e=new r(e)).c,s=t.s==e.s?1:-1,o=r.DP;if(o!==~~o||o<0||o>l)throw Error(v);if(!i[0])throw Error("[big.js] Division by zero");if(!n[0])return new r(0*s);var u,a,f,c,h,d=i.slice(),p=u=i.length,b=n.length,m=n.slice(0,u),w=m.length,D=e,_=D.c=[],E=0,k=o+(D.e=t.e-e.e)+1;for(D.s=s,s=k<0?0:k,d.unshift(0);w++<u;)m.push(0);do{for(f=0;f<10;f++){if(u!=(w=m.length))c=u>w?1:-1;else for(h=-1,c=0;++h<u;)if(i[h]!=m[h]){c=i[h]>m[h]?1:-1;break}if(!(c<0))break;for(a=w==u?i:d;w;){if(m[--w]<a[w]){for(h=w;h&&!m[--h];)m[h]=9;--m[h],m[w]+=10}m[w]-=a[w]}for(;!m[0];)m.shift()}_[E++]=c?f:++f,m[0]&&c?m[w]=n[p]||0:m=[n[p]]}while((p++<b||m[0]!==g)&&s--);return _[0]||1==E||(_.shift(),D.e--),E>k&&y(D,o,r.RM,m[0]!==g),D},p.eq=function(e){return!this.cmp(e)},p.gt=function(e){return this.cmp(e)>0},p.gte=function(e){return this.cmp(e)>-1},p.lt=function(e){return this.cmp(e)<0},p.lte=function(e){return this.cmp(e)<1},p.minus=p.sub=function(e){var t,r,n,i,s=this,o=s.constructor,u=s.s,l=(e=new o(e)).s;if(u!=l)return e.s=-l,s.plus(e);var a=s.c.slice(),f=s.e,c=e.c,h=e.e;if(!a[0]||!c[0])return c[0]?(e.s=-l,e):new o(a[0]?s:0);if(u=f-h){for((i=u<0)?(u=-u,n=a):(h=f,n=c),n.reverse(),l=u;l--;)n.push(0);n.reverse()}else for(r=((i=a.length<c.length)?a:c).length,u=l=0;l<r;l++)if(a[l]!=c[l]){i=a[l]<c[l];break}if(i&&(n=a,a=c,c=n,e.s=-e.s),(l=(r=c.length)-(t=a.length))>0)for(;l--;)a[t++]=0;for(l=t;r>u;){if(a[--r]<c[r]){for(t=r;t&&!a[--t];)a[t]=9;--a[t],a[r]+=10}a[r]-=c[r]}for(;0===a[--l];)a.pop();for(;0===a[0];)a.shift(),--h;return a[0]||(e.s=1,a=[h=0]),e.c=a,e.e=h,e},p.mod=function(e){var t,r=this,n=r.constructor,i=r.s,s=(e=new n(e)).s;if(!e.c[0])throw Error("[big.js] Division by zero");return r.s=e.s=1,t=1==e.cmp(r),r.s=i,e.s=s,t?new n(r):(i=n.DP,s=n.RM,n.DP=n.RM=0,r=r.div(e),n.DP=i,n.RM=s,this.minus(r.times(e)))},p.plus=p.add=function(e){var t,r=this,n=r.constructor,i=r.s,s=(e=new n(e)).s;if(i!=s)return e.s=-s,r.minus(e);var o=r.e,u=r.c,l=e.e,a=e.c;if(!u[0]||!a[0])return a[0]?e:new n(u[0]?r:0*i);if(u=u.slice(),i=o-l){for(i>0?(l=o,t=a):(i=-i,t=u),t.reverse();i--;)t.push(0);t.reverse()}for(u.length-a.length<0&&(t=a,a=u,u=t),i=a.length,s=0;i;u[i]%=10)s=(u[--i]=u[i]+a[i]+s)/10|0;for(s&&(u.unshift(s),++l),i=u.length;0===u[--i];)u.pop();return e.c=u,e.e=l,e},p.pow=function(e){var t=this,r=new t.constructor(1),n=r,i=e<0;if(e!==~~e||e<-1e6||e>1e6)throw Error(h+"exponent");for(i&&(e=-e);1&e&&(n=n.times(t)),e>>=1;)t=t.times(t);return i?r.div(n):n},p.round=function(e,t){var r=this.constructor;if(e===g)e=0;else if(e!==~~e||e<0||e>l)throw Error(v);return y(new r(this),e,t===g?r.RM:t)},p.sqrt=function(){var e,t,r,n=this,i=n.constructor,s=n.s,o=n.e,u=new i(.5);if(!n.c[0])return new i(n);if(s<0)throw Error(c+"No square root");0===(s=Math.sqrt(n.toString()))||s===1/0?((t=n.c.join("")).length+o&1||(t+="0"),(e=new i(Math.sqrt(t).toString())).e=((o+1)/2|0)-(o<0||1&o)):e=new i(s.toString()),o=e.e+(i.DP+=4);do{r=e,e=u.times(r.plus(n.div(r)))}while(r.c.slice(0,o).join("")!==e.c.slice(0,o).join(""));return y(e,i.DP-=4,i.RM)},p.times=p.mul=function(e){var t,r=this,n=r.constructor,i=r.c,s=(e=new n(e)).c,o=i.length,u=s.length,l=r.e,a=e.e;if(e.s=r.s==e.s?1:-1,!i[0]||!s[0])return new n(0*e.s);for(e.e=l+a,o<u&&(t=i,i=s,s=t,a=o,o=u,u=a),t=new Array(a=o+u);a--;)t[a]=0;for(l=u;l--;){for(u=0,a=o+l;a>l;)u=t[a]+s[l]*i[a-l-1]+u,t[a--]=u%10,u=u/10|0;t[a]=(t[a]+u)%10}for(u?++e.e:t.shift(),l=t.length;!t[--l];)t.pop();return e.c=t,e},p.toExponential=function(e){return m(this,1,e,e)},p.toFixed=function(e){return m(this,2,e,this.e+e)},p.toPrecision=function(e){return m(this,3,e,e-1)},p.toString=function(){return m(this)},p.valueOf=p.toJSON=function(){return m(this,4)},(s=function e(){function t(r){var n=this;if(!(n instanceof t))return r===g?e():new t(r);r instanceof t?(n.s=r.s,n.e=r.e,n.c=r.c.slice()):function(e,t){var r,n,i;if(0===t&&1/t<0)t="-0";else if(!b.test(t+=""))throw Error(h+"number");for(e.s="-"==t.charAt(0)?(t=t.slice(1),-1):1,(r=t.indexOf("."))>-1&&(t=t.replace(".","")),(n=t.search(/e/i))>0?(r<0&&(r=n),r+=+t.slice(n+1),t=t.substring(0,n)):r<0&&(r=t.length),i=t.length,n=0;n<i&&"0"==t.charAt(n);)++n;if(n==i)e.c=[e.e=0];else{for(;i>0&&"0"==t.charAt(--i););for(e.e=r-n-1,e.c=[],r=0;n<=i;)e.c[r++]=+t.charAt(n++)}}(n,r),n.constructor=t}return t.prototype=p,t.DP=o,t.RM=u,t.NE=a,t.PE=f,t.version="5.0.2",t}()).default=s.Big=s,void 0===(n=function(){return s}.call(t,r,t,e))||(e.exports=n)}()},function(e,t,r){var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,s=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,s=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw s}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}();var s=r(0),o=r(3),u=r(2),l=s(0);e.exports=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.levels=null}return i(e,[{key:"diff_books",value:function(e){var t=[];return o(t,e.asks,this.levels.sell,"sell"),o(t,e.bids,this.levels.buy,"buy"),t}},{key:"snapshot",value:function(e){return this.levels?{sequence:e,bids:this.levels.buy,asks:this.levels.sell}:null}},{key:"init",value:function(e,t){var r=this;this.levels={buy:[],sell:[]};var i=function(e,t){e.forEach(function(e){var i=n(e,2),o=i[0],u=i[1];return r.update_level(t,s(o),u)})};i(e,"buy"),i(t,"sell")}},{key:"update_level",value:function(e,t,r){var i=u(this.levels[e],e,t),s=n(i,2),o=s[0],a=s[1],f=(a?this.levels[e][o][1]:l).add(r);return this._set_value(e,t,f,o,a)}},{key:"set_level",value:function(e,t,r){var i=s(t),o=u(this.levels[e],e,i),l=n(o,2),a=l[0],f=l[1];return this._set_value(e,i,s(r),a,f)}},{key:"_set_value",value:function(e,t,r,n,i){return r.eq(l)?i&&(0===n?this.levels[e].shift():n===this.levels[e].length-1?this.levels[e].pop():this.levels[e].splice(n,1)):i?this.levels[e][n][1]=r:0===n?this.levels[e].unshift([t,r]):n===this.levels[e].length?this.levels[e].push([t,r]):this.levels[e].splice(n,0,[t,r]),r}},{key:"best_bid",get:function(){return this.levels&&this.levels.buy.length?this.levels.buy[0][0]:null}},{key:"best_ask",get:function(){return this.levels&&this.levels.sell.length?this.levels.sell[0][0]:null}}]),e}()},function(e,t){e.exports=function(e,t,r){if(!e.length)return[0,!1];var n="buy"===t?-1:1,i=0,s=e.length-1,o=n*r.cmp(e[i][0]);if(o<=0)return[0,0===o];var u=n*r.cmp(e[s][0]);if(u>0)return[e.length,!1];if(0===u)return[s,!0];for(;s-i>1;){var l=Math.floor(i+(s-i)/2),a=n*r.cmp(e[l][0]);if(0===a)return[l,!0];a<0?s=l:i=l}return[s===i?s+1:s,!1]}},function(e,t,r){var n=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,s=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,s=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw s}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),i=r(0)(0);e.exports=function(e,t,r,s){for(var o="buy"===s?-1:1,u=0,l=0;u<r.length&&l<t.length;){var a=n(r[u],2),f=a[0],c=a[1],h=n(t[l],2),v=h[0],d=h[1],p=o*f.cmp(v);0===p?(c.eq(d)||e.push([s,f,c]),l+=1,u+=1):p<0?(e.push([s,f,c]),u+=1):(e.push([s,v,i]),l+=1)}for(;u<r.length;){var g=n(r[u],2),b=g[0],y=g[1];e.push([s,b,y]),u+=1}for(;l<t.length;){var m=n(t[l],1)[0];e.push([s,m,i]),l+=1}return e}},function(e,t,r){"use strict";r.r(t),r.d(t,"default",function(){return l});var n=r(1),i=r.n(n),s=r(0),o=r.n(s),u=function(){return function(e,t){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,s=void 0;try{for(var o,u=e[Symbol.iterator]();!(n=(o=u.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,s=e}finally{try{!n&&u.return&&u.return()}finally{if(i)throw s}}return r}(e,t);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}();var l=function e(t){var r=this;!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.eventListener=function(e){var t=e.data,n=t.type,s=t.product_id,o=r.product_id!==s;if(r.product_id=s,"init"===n){var l=t.data,a=l.asks,f=l.bids;return r.manager=new i.a,r.manager.init(f,a),void r.sendDepth(s,!0)}if("l2update"===n){var c=t.data&&t.data.changes;if(!r.manager||!Array.isArray(c))return;return c.forEach(function(e){var t=u(e,3),n=t[0],i=t[1],s=t[2];return r.manager.set_level(n,i,s)}),void r.sendDepth(s)}if("depth zoom"===n){if(r.zoom=t.data,o)return;r.sendDepth(s,!0)}},this.sendDepth=function(e,t){(t||!r.timer)&&r.manager&&r.zoom&&(t&&(r.timer&&clearTimeout(r.timer),r.send(e)),r.timer=setTimeout(function(){r.timer=null,r.send(e)},500))},this.send=function(e){if(r.product_id===e){var t=r.buildDepth();t&&r.context.postMessage({depth:t,product_id:e},[t.asksData.buffer,t.bidsData.buffer])}},this.buildDepth=function(){var e=r.manager.snapshot(),t=e.asks,n=e.bids,i=n[0],s=t[0];if(!i||!s)return null;var u=+s[0].add(i[0]).div(2),l=t[t.length-1],a=n[n.length-1],f=Math.min(Number(l[0].sub(u).abs()),Number(a[0].sub(u).abs()))*(r.zoom/100),c=r.buildDepthData(t,o()(u+f),!1),h=r.buildDepthData(n,o()(u-f),!0);return{midprice:u,asksData:c,bidsData:h,maxSize:Math.max(c[c.length-2],h[h.length-2]),worstBid:Math.max(u-f,0),worstAsk:u+f}},this.buildDepthData=function(e,t,r){for(var n=[],i=o()(0),s=o()(0),l=r?t.gt.bind(t):t.lt.bind(t),a=0,f=e.length;a<f;a++){var c=u(e[a],2),h=c[0],v=c[1];if(l(h))break;s=s.add(v),i=i.add(v.mul(h)),n.push([+h,+s,+i])}for(var d=new Float32Array(3*n.length+3),p=0;p<n.length;p++)d.set(n[p],3*p);return d[d.length-3]=+t,d[d.length-2]=d[d.length-5],d[d.length-1]=d[d.length-4],d},this.context=t,t.addEventListener("message",this.eventListener)};new l(self)}]);', r.p + "1eb3a269c6a4f9fa145a.worker.js")
            }
        }, 1263: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "chart-header": "ChartHeader_chart-header_19rAO",
                chartHeader: "ChartHeader_chart-header_19rAO",
                dropdown: "ChartHeader_dropdown_1Aqir",
                title: "ChartHeader_title_1iPJj",
                list: "ChartHeader_list_4-FYB",
                item: "ChartHeader_item_3tE8Z",
                icon: "ChartHeader_icon_15LzL",
                active: "ChartHeader_active_2VvOF"
            }
        }, 1265: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "user-panel": "UserPanel_user-panel_2dFEI",
                userPanel: "UserPanel_user-panel_2dFEI",
                "user-history": "UserPanel_user-history_9ObQJ",
                userHistory: "UserPanel_user-history_9ObQJ",
                "main-panel": "UserPanel_main-panel_NOWxp",
                mainPanel: "UserPanel_main-panel_NOWxp",
                "cancel-all": "UserPanel_cancel-all_3IRYp",
                cancelAll: "UserPanel_cancel-all_3IRYp",
                show: "UserPanel_show_2lY0-",
                "sub-panel": "UserPanel_sub-panel_GdRvN",
                subPanel: "UserPanel_sub-panel_GdRvN",
                "view-only": "UserPanel_view-only_3Ek15",
                viewOnly: "UserPanel_view-only_3Ek15",
                "header-tabs": "UserPanel_header-tabs_T0TIo",
                headerTabs: "UserPanel_header-tabs_T0TIo"
            }
        }, 1267: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "margin-position": "MarginPosition_margin-position_3VQA5",
                marginPosition: "MarginPosition_margin-position_3VQA5",
                header: "MarginPosition_header_2T48X",
                title: "MarginPosition_title_3rUYs",
                "close-position": "MarginPosition_close-position_14rhw",
                closePosition: "MarginPosition_close-position_14rhw",
                position: "MarginPosition_position_3_1jI",
                spinner: "MarginPosition_spinner_1FzNE",
                row: "MarginPosition_row_1s3FO",
                loading: "MarginPosition_loading_2R10U",
                column: "MarginPosition_column_fIEj-",
                text: "MarginPosition_text_2bGK9",
                value: "MarginPosition_value_31z2z",
                "position-size": "MarginPosition_position-size_2Cj0o",
                positionSize: "MarginPosition_position-size_2Cj0o",
                subtext: "MarginPosition_subtext_gabSE",
                expanded: "MarginPosition_expanded_TGzlP",
                negative: "MarginPosition_negative_3BOdJ",
                short: "MarginPosition_short_3lkuc",
                positive: "MarginPosition_positive_1f3mA",
                long: "MarginPosition_long_1HVsx",
                "margin-ratio": "MarginPosition_margin-ratio_260lZ",
                marginRatio: "MarginPosition_margin-ratio_260lZ",
                cell: "MarginPosition_cell_bbOUf",
                "no-position": "MarginPosition_no-position_1yXfs",
                noPosition: "MarginPosition_no-position_1yXfs",
                "table-header": "MarginPosition_table-header_2p411",
                tableHeader: "MarginPosition_table-header_2p411",
                "table-title": "MarginPosition_table-title_194ly",
                tableTitle: "MarginPosition_table-title_194ly",
                tabs: "MarginPosition_tabs_Ex6Ge",
                tab: "MarginPosition_tab_1tNzc",
                active: "MarginPosition_active_1qjeu"
            }
        }, 1269: function (e, t, r) {
            e.exports = {
                content: "ClosePositionModal_content_22fz2",
                section: "ClosePositionModal_section_2qvo4",
                column: "ClosePositionModal_column_2QCSl",
                text: "ClosePositionModal_text_15C_k",
                value: "ClosePositionModal_value_1cqid",
                subtext: "ClosePositionModal_subtext_1-M9V",
                negative: "ClosePositionModal_negative_1kePX",
                short: "ClosePositionModal_short_1Kwrx",
                positive: "ClosePositionModal_positive_1h6LF",
                long: "ClosePositionModal_long_UFwec",
                types: "ClosePositionModal_types_21MMB",
                type: "ClosePositionModal_type_183X_",
                active: "ClosePositionModal_active_gvm8q",
                info: "ClosePositionModal_info_1EEuN"
            }
        }, 1273: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "order-book-panel": "OrderBookPanel_order-book-panel_1riya",
                orderBookPanel: "OrderBookPanel_order-book-panel_1riya",
                "header-tabs": "OrderBookPanel_header-tabs_49LB_",
                headerTabs: "OrderBookPanel_header-tabs_49LB_",
                content: "OrderBookPanel_content_2uRSW",
                "content-wrapper": "OrderBookPanel_content-wrapper_RKLFl",
                contentWrapper: "OrderBookPanel_content-wrapper_RKLFl",
                "table-head": "OrderBookPanel_table-head_35iHY",
                tableHead: "OrderBookPanel_table-head_35iHY",
                size: "OrderBookPanel_size_2Y68g",
                price: "OrderBookPanel_price_3mMQx",
                "my-size": "OrderBookPanel_my-size_1D2Ju",
                mySize: "OrderBookPanel_my-size_1D2Ju",
                "loading-wrapper": "OrderBookPanel_loading-wrapper_t8P6t",
                loadingWrapper: "OrderBookPanel_loading-wrapper_t8P6t",
                "order-book-wrapper": "OrderBookPanel_order-book-wrapper_OI0KZ",
                orderBookWrapper: "OrderBookPanel_order-book-wrapper_OI0KZ",
                "spread-wrapper": "OrderBookPanel_spread-wrapper_1_BVu",
                spreadWrapper: "OrderBookPanel_spread-wrapper_1_BVu",
                text: "OrderBookPanel_text_3Fdwi",
                spread: "OrderBookPanel_spread_usHrC",
                fixed: "OrderBookPanel_fixed_1VVzW",
                top: "OrderBookPanel_top_aRhUB",
                bottom: "OrderBookPanel_bottom_2W0Pa"
            }
        }, 1275: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                aggregation: "Aggregation_aggregation_3Lj5I",
                column: "Aggregation_column_1NrcX",
                value: "Aggregation_value_3qm2q",
                buttons: "Aggregation_buttons_1KL5z",
                button: "Aggregation_button_1r87H",
                disabled: "Aggregation_disabled_OSYnb",
                inc: "Aggregation_inc_2n2Pk",
                dec: "Aggregation_dec_3b-X8",
                text: "Aggregation_text_OhhsN"
            }
        }, 1277: function (e, t, r) {
            e.exports = {
                icon: "MouseLayer_icon_1FRQ5"
            }
        }, 1279: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "hover-color": "rgba(21, 35, 44, 0.85)",
                hoverColor: "rgba(21, 35, 44, 0.85)",
                "cancel-color": "rgba(255, 105, 57, 0.9)",
                cancelColor: "rgba(255, 105, 57, 0.9)"
            }
        }, 1281: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "font-family": "opensans, sans-serif",
                fontFamily: "opensans, sans-serif",
                "font-size": "11",
                fontSize: "11",
                "font-weight": "bold",
                fontWeight: "bold",
                "text-align": "right",
                textAlign: "right",
                "text-baseline": "middle",
                textBaseline: "middle",
                "dim-color": "rgba(206, 210, 213, 0.2)",
                dimColor: "rgba(206, 210, 213, 0.2)",
                "normal-color": "rgba(255, 255, 255, 0.85)",
                normalColor: "rgba(255, 255, 255, 0.85)",
                "whole-color": "rgba(206, 210, 213, 0.75)",
                wholeColor: "rgba(206, 210, 213, 0.75)",
                "asks-bar-color": "rgba(255, 105, 57, 0.5)",
                asksBarColor: "rgba(255, 105, 57, 0.5)",
                "asks-whole-color": "rgba(255, 105, 57, 0.55)",
                asksWholeColor: "rgba(255, 105, 57, 0.55)",
                "asks-decimal-color": "#ff6939",
                asksDecimalColor: "#ff6939",
                "asks-change-whole-color": "rgba(255, 105, 57, 0.9)",
                asksChangeWholeColor: "rgba(255, 105, 57, 0.9)",
                "asks-change-decimal-color": "rgba(255, 105, 57, 0.1)",
                asksChangeDecimalColor: "rgba(255, 105, 57, 0.1)",
                "bids-bar-color": "rgba(132, 247, 102, 0.5)",
                bidsBarColor: "rgba(132, 247, 102, 0.5)",
                "bids-whole-color": "rgba(132, 247, 102, 0.55)",
                bidsWholeColor: "rgba(132, 247, 102, 0.55)",
                "bids-decimal-color": "#84f766",
                bidsDecimalColor: "#84f766",
                "bids-change-whole-color": "rgba(132, 247, 102, 0.9)",
                bidsChangeWholeColor: "rgba(132, 247, 102, 0.9)",
                "bids-change-decimal-color": "rgba(132, 247, 102, 0.1)",
                bidsChangeDecimalColor: "rgba(132, 247, 102, 0.1)",
                "remove-from-color": "rgba(21, 35, 44, 0)",
                removeFromColor: "rgba(21, 35, 44, 0)",
                "remove-to-color": "rgba(21, 35, 44, 0.8)",
                removeToColor: "rgba(21, 35, 44, 0.8)"
            }
        }, 1283: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "trade-history": "TradeHistory_trade-history_1QdYH",
                tradeHistory: "TradeHistory_trade-history_1QdYH",
                "table-header": "TradeHistory_table-header_39mUM",
                tableHeader: "TradeHistory_table-header_39mUM",
                column: "TradeHistory_column_2adnB",
                time: "TradeHistory_time_3gfUW",
                centered: "TradeHistory_centered_1xzz1"
            }
        }, 1285: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "font-family": "opensans, sans-serif",
                fontFamily: "opensans, sans-serif",
                "font-size": "11",
                fontSize: "11",
                "text-align": "right",
                textAlign: "right",
                "text-baseline": "middle",
                textBaseline: "middle",
                "bar-column-x": "7",
                barColumnX: "7",
                "size-column-x": "38",
                sizeColumnX: "38",
                "price-column-x": "69",
                priceColumnX: "69",
                "size-column-padding": "6",
                sizeColumnPadding: "6",
                "price-column-padding": "16",
                priceColumnPadding: "16",
                "time-column-padding": "16",
                timeColumnPadding: "16",
                "size-color": "#ced2d5",
                sizeColor: "#ced2d5",
                "time-color": "rgba(206, 210, 213, 0.6)",
                timeColor: "rgba(206, 210, 213, 0.6)",
                "sell-bar-color": "rgba(255, 105, 57, 0.6)",
                sellBarColor: "rgba(255, 105, 57, 0.6)",
                "sell-price-color1": "rgba(255, 105, 57, 0.45)",
                sellPriceColor1: "rgba(255, 105, 57, 0.45)",
                "sell-price-color2": "#ff6939",
                sellPriceColor2: "#ff6939",
                "sell-bg-color1": "rgba(255, 105, 57, 0.05)",
                sellBgColor1: "rgba(255, 105, 57, 0.05)",
                "sell-bg-color2": "rgba(255, 105, 57, 0.2)",
                sellBgColor2: "rgba(255, 105, 57, 0.2)",
                "buy-bar-color": "rgba(132, 247, 102, 0.55)",
                buyBarColor: "rgba(132, 247, 102, 0.55)",
                "buy-price-color1": "rgba(132, 247, 102, 0.45)",
                buyPriceColor1: "rgba(132, 247, 102, 0.45)",
                "buy-price-color2": "#84f766",
                buyPriceColor2: "#84f766",
                "buy-bg-color1": "rgba(132, 247, 102, 0.05)",
                buyBgColor1: "rgba(132, 247, 102, 0.05)",
                "buy-bg-color2": "rgba(132, 247, 102, 0.2)",
                buyBgColor2: "rgba(132, 247, 102, 0.2)"
            }
        }, 1286: function (e, t) {
            e.exports = "data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='25px' height='25px' viewBox='0 0 25 25' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3Earrow-up%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Exchange' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='Artboard-2' transform='translate(-51.000000, -40.000000)' fill='%2384F766'%3E %3Cg id='arrow-up' transform='translate(63.000000, 52.000000) rotate(-315.000000) translate(-63.000000, -52.000000) translate(50.000000, 36.000000)'%3E %3Cpath d='M22.586,13.675 L16,7.089 L16,30 C16,31.1045695 15.1045695,32 14,32 C12.8954305,32 12,31.1045695 12,30 L12,6.782 L4.345,13.74 C3.81948856,14.2399551 3.06447939,14.4161999 2.37192886,14.2005818 C1.67937833,13.9849637 1.15785036,13.4112829 1.00901587,12.7013775 C0.860181394,11.9914721 1.10737164,11.2566265 1.655,10.781 L12.655,0.781 C12.69,0.749 12.73,0.726 12.767,0.697 C12.819,0.656 12.868,0.615 12.923,0.58 C12.98,0.543 13.04,0.514 13.1,0.484 C13.152,0.457 13.202,0.429 13.257,0.407 C13.329,0.378 13.402,0.359 13.477,0.339 C13.524,0.326 13.57,0.309 13.619,0.3 C13.745,0.275 13.872,0.261 14,0.261 L14.01,0.262 C14.138,0.262 14.266,0.276 14.391,0.3 C14.453,0.313 14.511,0.335 14.569,0.353 C14.635,0.373 14.701,0.387 14.765,0.414 C14.833,0.442 14.895,0.481 14.96,0.517 C15.01,0.544 15.062,0.566 15.11,0.598 C15.22,0.671 15.322,0.755 15.415,0.848 L25.415,10.847 C26.1959306,11.6282068 26.1957068,12.8945694 25.4145,13.6755 C24.6332932,14.4564306 23.3669306,14.4562068 22.586,13.675' id='Shape'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E"
        }, 1287: function (e, t) {
            e.exports = "data:image/svg+xml,%3C?xml version='1.0' encoding='UTF-8'?%3E %3Csvg width='25px' height='25px' viewBox='0 0 25 25' version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'%3E %3C!-- Generator: Sketch 47.1 (45422) - http://www.bohemiancoding.com/sketch --%3E %3Ctitle%3Earrow-down%3C/title%3E %3Cdesc%3ECreated with Sketch.%3C/desc%3E %3Cdefs%3E%3C/defs%3E %3Cg id='Exchange' stroke='none' stroke-width='1' fill='none' fill-rule='evenodd'%3E %3Cg id='Artboard-2' transform='translate(-51.000000, -96.000000)' fill='%23FF6939'%3E %3Cg id='arrow-down' transform='translate(63.000000, 109.034754) rotate(-45.000000) translate(-63.000000, -109.034754) translate(50.000000, 93.034754)'%3E %3Cpath d='M16,24.911 L16,2 C16,0.8954305 15.1045695,6.76353751e-17 14,0 C12.8954305,-6.76353751e-17 12,0.8954305 12,2 L12,25.218 L4.345,18.26 C3.81948856,17.7600449 3.06447939,17.5838001 2.37192886,17.7994182 C1.67937833,18.0150363 1.15785036,18.5887171 1.00901587,19.2986225 C0.860181394,20.0085279 1.10737164,20.7433735 1.655,21.219 L12.655,31.219 C12.69,31.251 12.73,31.274 12.767,31.303 C12.819,31.344 12.868,31.385 12.923,31.42 C12.98,31.457 13.04,31.486 13.1,31.516 C13.152,31.543 13.202,31.571 13.257,31.593 C13.329,31.622 13.402,31.641 13.477,31.661 C13.524,31.674 13.57,31.691 13.619,31.7 C13.745,31.725 13.872,31.739 14,31.739 C14.003,31.739 14.266,31.724 14.391,31.7 C14.453,31.687 14.511,31.665 14.569,31.647 C14.635,31.627 14.701,31.613 14.765,31.586 C14.833,31.558 14.895,31.519 14.96,31.483 C15.01,31.456 15.062,31.434 15.11,31.402 C15.219733,31.3290243 15.3219063,31.2452756 15.415,31.152 L25.415,21.153 C26.1959306,20.3717932 26.1957068,19.1054306 25.4145,18.3245 C24.6332932,17.5435694 23.3669306,17.5437932 22.586,18.325 L16,24.911 Z' id='Shape'%3E%3C/path%3E %3C/g%3E %3C/g%3E %3C/g%3E %3C/svg%3E"
        }, 1289: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "connection-status": "ConnectionStatus_connection-status_2p5jY",
                connectionStatus: "ConnectionStatus_connection-status_2p5jY",
                beacon: "ConnectionStatus_beacon_v7slj"
            }
        }, 1291: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                sidebar: "TradeSidebar_sidebar_yFRxN",
                loading: "TradeSidebar_loading_1stWU"
            }
        }, 1293: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "panel-header": "PanelHeader_panel-header_1ua58",
                panelHeader: "PanelHeader_panel-header_1ua58",
                title: "PanelHeader_title_2R_Ku",
                "title-and-children": "PanelHeader_title-and-children_20W1-",
                titleAndChildren: "PanelHeader_title-and-children_20W1-",
                tabs: "PanelHeader_tabs_3dSJw",
                tab: "PanelHeader_tab_2BlwO",
                active: "PanelHeader_active_3HCBE"
            }
        }, 1295: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                "account-messages": "AccountMessage_account-messages_1r-vS",
                accountMessages: "AccountMessage_account-messages_1r-vS",
                icon: "AccountMessage_icon_243-A",
                header: "AccountMessage_header_77ILX",
                error: "AccountMessage_error_3bDL7",
                "margin-active": "AccountMessage_margin-active_3UWJs",
                marginActive: "AccountMessage_margin-active_3UWJs",
                demo: "AccountMessage_demo_koteI",
                status: "AccountMessage_status_3ybVc",
                none: "AccountMessage_none_2iolV",
                minor: "AccountMessage_minor_2hBzZ",
                major: "AccountMessage_major_2KFZN",
                critical: "AccountMessage_critical_3MQ8O"
            }
        }, 1297: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                content: "OrderConfirmationModal_content_XV-bQ",
                buttons: "OrderConfirmationModal_buttons_3Q7tn",
                button: "OrderConfirmationModal_button_1OsNG",
                cancel: "OrderConfirmationModal_cancel_1VKho"
            }
        }, 1300: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                container: "BalanceInfo_container_1Zkha",
                "purchasing-power": "BalanceInfo_purchasing-power_1MLPJ",
                purchasingPower: "BalanceInfo_purchasing-power_1MLPJ",
                value: "BalanceInfo_value_vkcef",
                header: "BalanceInfo_header_31y3M",
                accounts: "BalanceInfo_accounts_c--xD",
                currencies: "BalanceInfo_currencies_6uTI-",
                balances: "BalanceInfo_balances_SARNz",
                "term-description": "BalanceInfo_term-description_1FF5_",
                termDescription: "BalanceInfo_term-description_1FF5_",
                spinner: "BalanceInfo_spinner_1qSdY",
                spacer: "BalanceInfo_spacer_39TnC",
                buttons: "BalanceInfo_buttons_1nhcC",
                marker: "BalanceInfo_marker_xsAni",
                button: "BalanceInfo_button_1s15H",
                withdraw: "BalanceInfo_withdraw_1Tfnl",
                disabled: "BalanceInfo_disabled_2SKYM"
            }
        }, 1302: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                content: "LegalModal_content_33PPD"
            }
        }, 1323: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                signin: "Signin_signin_2cwll",
                divider: "Signin_divider_Oh93E"
            }
        }, 1325: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                margin: "MarginToggle_margin_2K8s5",
                "margin-toggle": "MarginToggle_margin-toggle_31wSh",
                marginToggle: "MarginToggle_margin-toggle_31wSh",
                indicator: "MarginToggle_indicator_PP8vV",
                text: "MarginToggle_text_7Lgq1",
                off: "MarginToggle_off_3talM",
                on: "MarginToggle_on_3c-Rg",
                lock: "MarginToggle_lock_2RBcr"
            }
        }, 1327: function (e, t, r) {
            e.exports = {
                content: "MarginModal_content_1DS84",
                small: "MarginModal_small_1Egyz",
                panels: "MarginModal_panels_21gZH",
                "left-panel": "MarginModal_left-panel__m-_8",
                leftPanel: "MarginModal_left-panel__m-_8",
                "right-panel": "MarginModal_right-panel_1FpGz",
                rightPanel: "MarginModal_right-panel_1FpGz"
            }
        }, 1329: function (e, t, r) {
            e.exports = {
                "border-color": "#ddd",
                borderColor: "#ddd",
                "body-color": "#ced2d5",
                bodyColor: "#ced2d5",
                "light-color": "#fff",
                lightColor: "#fff",
                "dark-color": "#1f3543",
                darkColor: "#1f3543",
                "green-bg-color": "#4da53c",
                greenBgColor: "#4da53c",
                "red-bg-color": "#ff6939",
                redBgColor: "#ff6939",
                "blue-light-color": "#2ba6ed",
                blueLightColor: "#2ba6ed",
                "mobile-width": "600px",
                mobileWidth: "600px",
                "tablet-width": "768px",
                tabletWidth: "768px",
                "narrow-width": "1200px",
                narrowWidth: "1200px",
                "wide-width": "1800px",
                wideWidth: "1800px",
                content: "ECPForm_content_2Rs4V",
                small: "ECPForm_small_1zClV",
                panels: "ECPForm_panels_UHaB5",
                "left-panel": "ECPForm_left-panel_v8AR0",
                leftPanel: "ECPForm_left-panel_v8AR0",
                "right-panel": "ECPForm_right-panel_2wSIk",
                rightPanel: "ECPForm_right-panel_2wSIk",
                "ecp-form": "ECPForm_ecp-form_Z68jc",
                ecpForm: "ECPForm_ecp-form_Z68jc",
                "panel-title": "ECPForm_panel-title_2I4iY",
                panelTitle: "ECPForm_panel-title_2I4iY",
                "name-input": "ECPForm_name-input_11sTf",
                nameInput: "ECPForm_name-input_11sTf",
                text: "ECPForm_text_2dDbQ",
                types: "ECPForm_types_3AJwi",
                type: "ECPForm_type_sz2Cl",
                active: "ECPForm_active_3q-dQ",
                error: "ECPForm_error_91EJM",
                disabled: "ECPForm_disabled_1s3Rz",
                row: "ECPForm_row_2Eaj6"
            }
        }, 1330: function (e, t) {
            var r = /^(?:submit|button|image|reset|file)$/i,
                o = /^(?:input|select|textarea|keygen)/i,
                n = /(\[[^\[\]]*\])/g;

            function i(e, t, r) {
                if (t.match(n)) {
                    ! function e(t, r, o) {
                        if (0 === r.length) return t = o;
                        var n = r.shift(),
                            i = n.match(/^\[(.+?)\]$/);
                        if ("[]" === n) return t = t || [], Array.isArray(t) ? t.push(e(null, r, o)) : (t._values = t._values || [], t._values.push(e(null, r, o))), t;
                        if (i) {
                            var a = i[1],
                                l = +a;
                            isNaN(l) ? (t = t || {})[a] = e(t[a], r, o) : (t = t || [])[l] = e(t[l], r, o)
                        } else t[n] = e(t[n], r, o);
                        return t
                    }(e, function (e) {
                        var t = [],
                            r = new RegExp(n),
                            o = /^([^\[\]]*)/.exec(e);
                        for (o[1] && t.push(o[1]); null !== (o = r.exec(e));) t.push(o[1]);
                        return t
                    }(t), r)
                } else {
                    var o = e[t];
                    o ? (Array.isArray(o) || (e[t] = [o]), e[t].push(r)) : e[t] = r
                }
                return e
            }

            function a(e, t, r) {
                return r = r.replace(/(\r)?\n/g, "\r\n"), r = (r = encodeURIComponent(r)).replace(/%20/g, "+"), e + (e ? "&" : "") + encodeURIComponent(t) + "=" + r
            }
            e.exports = function (e, t) {
                "object" != typeof t ? t = {
                    hash: !!t
                } : void 0 === t.hash && (t.hash = !0);
                for (var n = t.hash ? {} : "", l = t.serializer || (t.hash ? i : a), s = e && e.elements ? e.elements : [], c = Object.create(null), u = 0; u < s.length; ++u) {
                    var d = s[u];
                    if ((t.disabled || !d.disabled) && d.name && o.test(d.nodeName) && !r.test(d.type)) {
                        var f = d.name,
                            p = d.value;
                        if ("checkbox" !== d.type && "radio" !== d.type || d.checked || (p = void 0), t.empty) {
                            if ("checkbox" !== d.type || d.checked || (p = ""), "radio" === d.type && (c[d.name] || d.checked ? d.checked && (c[d.name] = !0) : c[d.name] = !1), void 0 == p && "radio" == d.type) continue
                        } else if (!p) continue;
                        if ("select-multiple" !== d.type) n = l(n, f, p);
                        else {
                            p = [];
                            for (var h = d.options, b = !1, v = 0; v < h.length; ++v) {
                                var y = h[v],
                                    m = t.empty && !y.value,
                                    g = y.value || m;
                                y.selected && g && (b = !0, n = t.hash && "[]" !== f.slice(f.length - 2) ? l(n, f + "[]", y.value) : l(n, f, y.value))
                            }!b && t.empty && (n = l(n, f, ""))
                        }
                    }
                }
                if (t.empty)
                    for (var f in c) c[f] || (n = l(n, f, ""));
                return n
            }
        }, 1331: function (e, t, r) {
            e.exports = r.p + "assets/pro-trading-view.7c8e3d8b1d9b96ae5246e05bb9eab265.jpg"
        }, 1528: function (e, t, r) {
            "use strict";
            r.r(t);
            var o, n, i, a, l, s, c, u, d, f, p, h, b = r(1),
                v = r(353),
                y = r(1116),
                m = r(1112),
                g = r(1137),
                w = r(1125),
                _ = r(1115),
                O = r(1123),
                x = r(1119),
                k = r(1147),
                C = r(0),
                S = r(3),
                P = r.n(S),
                j = r(1113),
                T = r(20),
                A = r(29),
                E = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                z = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function M(e) {
                return function () {
                    var t = e.apply(this, arguments);
                    return new Promise(function (e, r) {
                        return function o(n, i) {
                            try {
                                var a = t[n](i),
                                    l = a.value
                            } catch (e) {
                                return void r(e)
                            }
                            if (!a.done) return Promise.resolve(l).then(function (e) {
                                o("next", e)
                            }, function (e) {
                                o("throw", e)
                            });
                            e(l)
                        }("next")
                    })
                }
            }

            function N(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function B(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var R, D, F, W, L, I, q, $, H, U = .02,
                G = (o = function () {
                    function e(t) {
                        var r = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), N(this, "type", n, this), N(this, "side", i, this), N(this, "_price", a, this), N(this, "_amount", l, this), N(this, "stop_price", s, this), N(this, "show_advanced", c, this), N(this, "time_in_force", u, this), N(this, "cancel_after", d, this), N(this, "post_only", f, this), this.disposers = [], N(this, "reset", p, this), N(this, "toggleAdvanced", h, this), this.validateOrder = M(regeneratorRuntime.mark(function e() {
                            var t, o, n, i, a, l, s, c, u, d, f, p, h, b, v;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t = r.amount, o = r.price, n = r.stop_price, i = r.type, a = m.a.product, l = a.base_min_size, s = a.base_max_size, c = a.min_market_funds, u = a.max_market_funds, d = a.quote.symbol, f = a.base.symbol, t) {
                                        e.next = 4;
                                        break
                                    }
                                    throw new Error("Amount must be specified");
                                case 4:
                                    p = void 0, e.prev = 5, p = P()(t), e.next = 12;
                                    break;
                                case 9:
                                    throw e.prev = 9, e.t0 = e.catch(5), new Error("Invalid amount");
                                case 12:
                                    if (!p.lte(0)) {
                                        e.next = 14;
                                        break
                                    }
                                    throw new Error("Amount must be greater than zero");
                                case 14:
                                    if ("limit" !== i || o) {
                                        e.next = 16;
                                        break
                                    }
                                    throw new Error("Price must be specified");
                                case 16:
                                    if (!("limit" === i || "stop" === i && o)) {
                                        e.next = 20;
                                        break
                                    }
                                    if ((h = r.price) && !h.lte(0)) {
                                        e.next = 20;
                                        break
                                    }
                                    throw new Error("Price must be greater than zero");
                                case 20:
                                    if ("stop" !== i || n) {
                                        e.next = 22;
                                        break
                                    }
                                    throw new Error("Stop price must be specified");
                                case 22:
                                    if ("stop" !== i) {
                                        e.next = 33;
                                        break
                                    }
                                    b = void 0, e.prev = 24, b = P()(n), e.next = 31;
                                    break;
                                case 28:
                                    throw e.prev = 28, e.t1 = e.catch(24), new Error("Invalid stop price");
                                case 31:
                                    if (!b.lte(0)) {
                                        e.next = 33;
                                        break
                                    }
                                    throw new Error("Stop price must be greater than zero");
                                case 33:
                                    if (!(v = r.buildOrder()).funds) {
                                        e.next = 41;
                                        break
                                    }
                                    if (!v.funds.gt(u)) {
                                        e.next = 39;
                                        break
                                    }
                                    throw new Error("Amount must be less than " + d + u.toFixed() + ".");
                                case 39:
                                    if (!v.funds.lt(c)) {
                                        e.next = 41;
                                        break
                                    }
                                    throw new Error("Amount must be greater than " + d + c.toFixed() + ".");
                                case 41:
                                    if (!v.size) {
                                        e.next = 48;
                                        break
                                    }
                                    if (!v.size.gt(s)) {
                                        e.next = 46;
                                        break
                                    }
                                    throw new Error("Amount must be less than " + f + s.toFixed() + ".");
                                case 46:
                                    if (!v.size.lt(l)) {
                                        e.next = 48;
                                        break
                                    }
                                    throw new Error("Amount must be greater than " + f + l.toFixed() + ".");
                                case 48:
                                    return e.abrupt("return", v);
                                case 49:
                                case "end":
                                    return e.stop()
                                }
                            }, e, r, [
                                [5, 9],
                                [24, 28]
                            ])
                        })), this.validateSlippage = M(regeneratorRuntime.mark(function e() {
                            var t, o, n, i, a, l, s, c;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t = r.type, o = r.side, "market" === t) {
                                        e.next = 3;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 3:
                                    if ("buy" !== o) {
                                        e.next = 11;
                                        break
                                    }
                                    if (n = A.h.bestAskPrice) {
                                        e.next = 7;
                                        break
                                    }
                                    throw new Error("No asks");
                                case 7:
                                    if (i = P()(n).mul(P()(1).add(U)), a = A.h.calculateBuyOrder(r.amount, i), !a.remaining.gt(0)) {
                                        e.next = 11;
                                        break
                                    }
                                    throw new Error("Order would move market more than " + P()(100).mul(U).toFixed(0) + "%");
                                case 11:
                                    if ("sell" !== o) {
                                        e.next = 19;
                                        break
                                    }
                                    if (l = A.h.bestBidPrice) {
                                        e.next = 15;
                                        break
                                    }
                                    throw new Error("No bids");
                                case 15:
                                    if (s = P()(l).mul(P()(1).sub(U)), c = A.h.calculateSellOrder(r.amount, s), !c.remaining.gt(0)) {
                                        e.next = 19;
                                        break
                                    }
                                    throw new Error("Order would move market more than " + P()(100).mul(U).toFixed(0) + "%");
                                case 19:
                                case "end":
                                    return e.stop()
                                }
                            }, e, r)
                        })), this.buildOrder = function () {
                            var e = m.a.product,
                                t = m.a.profile,
                                o = new j.j({
                                    profile_id: t.id,
                                    product_id: e.id,
                                    side: r.side,
                                    client_oid: j.j.generate_client_oid(),
                                    filled_size: P()(0),
                                    fill_fees: P()(0),
                                    status: "pending"
                                });
                            if ("market" === r.type && (o.type = r.type, "buy" === o.side ? o.funds = P()(r.amount) : o.size = P()(r.amount)), "limit" === r.type && (o.type = r.type, o.price = r.price || P()(0), o.size = r.amount, o.post_only = r.post_only, r.show_advanced && (o.time_in_force = r.time_in_force, o.cancel_after = "GTT" === r.time_in_force ? r.cancel_after : "")), "stop" === r.type)
                                if (o.type = "market", o.stop = "buy" === r.side ? "entry" : "loss", o.stop_price = P()(r.stop_price), r.show_advanced && r.price)
                                    if (o.type = "limit", o.price = P()(r.price), "entry" === o.stop) {
                                        var n = e.base.precision;
                                        o.size = P()(r.amount).div(o.price).round(n, 0)
                                    } else o.size = P()(r.amount);
                            else "entry" === o.stop ? o.funds = P()(r.amount) : o.size = P()(r.amount);
                            return t.margin_enabled && "stop" !== r.type && (o.overdraft_enabled = !0), o
                        }, this.ordersStore = t.ordersStore;
                        var o = _.a.user;
                        this.post_only = !!o && !o.has_flag("post_only_disabled")
                    }
                    return z(e, [{
                        key: "subscribe",
                        value: function () {
                            this.disposers.push(Object(C.observe)(m.a, "product", this.reset)), this.disposers.push(Object(C.observe)(m.a, "profile", this.reset)), A.h.addSubscriber(this)
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            this.disposers.forEach(function (e) {
                                return e()
                            }), this.disposers.length = 0, A.h.removeSubscriber(this)
                        }
                    }, {
                        key: "track",
                        value: function (e, t) {
                            Object(T.c)(e, E({}, t, {
                                product_id: m.a.product.id,
                                order_side: this.side,
                                order_type: this.type
                            }))
                        }
                    }, {
                        key: "setType",
                        value: function (e) {
                            this.type !== e && (this.type = e, this.track("order_tab_selected"), this._amount = "", this._price = "", this.stop_price = "")
                        }
                    }, {
                        key: "setSide",
                        value: function (e) {
                            this.side !== e && (this.side = e, this.track("order_side_selected"), "market" === this.type && (this._amount = ""))
                        }
                    }, {
                        key: "setAmount",
                        value: function (e) {
                            this._amount = e
                        }
                    }, {
                        key: "setPrice",
                        value: function (e) {
                            this._price = e
                        }
                    }, {
                        key: "setStopPrice",
                        value: function (e) {
                            this.stop_price = e
                        }
                    }, {
                        key: "setCancelAfter",
                        value: function (e) {
                            this.cancel_after = e, this.track("limit_order_cancel_after_updated", {
                                cancel_after: e
                            })
                        }
                    }, {
                        key: "setTimeInForce",
                        value: function (e) {
                            var t = _.a.user;
                            t && (this.time_in_force = e, this.post_only = ("GTT" === e || "GTC" === e) && !t.has_flag("post_only_disabled"), this.track("limit_order_time_in_force_policy_updated", {
                                time_in_force: e
                            }))
                        }
                    }, {
                        key: "setPostOnly",
                        value: function (e) {
                            if (this.post_only !== e) {
                                var t = _.a.user;
                                if (this.post_only = e, e ? this.track("post_only_limit_order_execution_selected") : this.track("allow_taker_limit_order_execution_selected"), t) return e ? t.remove_flag("post_only_disabled") : t.add_flag("post_only_disabled")
                            }
                        }
                    }, {
                        key: "prefillAll",
                        value: function (e, t) {
                            var r = m.a.product,
                                o = e;
                            if (!o || !o.lte(0)) {
                                var n = r.base.id === t ? r.base.precision : r.quote.precision;
                                if ("limit" === this.type && t === r.quote.id) {
                                    if (!this.price) return;
                                    n = r.base.precision, o = o.div(this.price)
                                }
                                "market" === this.type && (this.side = r.base.id === t ? "sell" : "buy"), this._amount = o.round(n, 0).toFixed(n)
                            }
                        }
                    }, {
                        key: "submit",
                        value: function () {
                            var e = this,
                                t = this.buildOrder();
                            this.track("place_order_clicked"), this.ordersStore.addOrUpdateOrder(t);
                            var r = {
                                profile_id: t.profile_id,
                                show_match: "market" === t.type
                            };
                            return t.save(r).then(Object(C.action)("saving order", function () {
                                if (e.ordersStore.addOrUpdateOrder(t), "rejected" === t.status) {
                                    var r = "";
                                    if (t.post_only)
                                        if ("post only" === t.reject_reason) {
                                            var o = t.product_id.split("-");
                                            r = "Post Only: Cannot place order at " + +t.price + " " + o[1] + "/" + o[0] + "."
                                        } else "cannot exceed leverage ratio" === t.reject_reason && (r = "Margin: Cannot exceed leverage ratio");
                                    else "FOK" === t.time_in_force && (r = "Time in Force: Cannot fill entire order.");
                                    throw !r && t.reject_reason && (r = t.reject_reason), new Error(r)
                                }
                                "pending" === t.status && (t.status = "received"), "market" !== t.type || t.stop || (t.status = "done", t.done_reason = "filled", t.executed_value.gt(0) && (t.avg_market_fill_price = t.executed_value.div(t.filled_size))), e._price = "", e._amount = "", e.stop_price = "", x.a.refreshAccounts()
                            })).catch(Object(C.action)(function (e) {
                                throw t.status = "rejected", e
                            }))
                        }
                    }, {
                        key: "calculateMarketTotal",
                        value: function (e) {
                            return ("buy" === this.side ? A.h.calculateBuyOrder(e) : A.h.calculateSellOrder(e)).total
                        }
                    }, {
                        key: "calculateLimitTotal",
                        value: function (e) {
                            return P()(e).mul(this.price || P()(0))
                        }
                    }, {
                        key: "calculateStopTotal",
                        value: function (e) {
                            var t = this.price,
                                r = this.side;
                            if (!this.show_advanced || !t) throw new Error("Cannot estimate stop market totals");
                            return e ? "buy" === r ? P()(e).div(t) : "sell" === r ? P()(e).mul(t) : void 0 : P()(0)
                        }
                    }, {
                        key: "amount",
                        get: function () {
                            return this._amount ? P()(this._amount) : P()(0)
                        }
                    }, {
                        key: "price",
                        get: function () {
                            return this._price ? P()(this._price) : null
                        }
                    }, {
                        key: "total",
                        get: function () {
                            var e = this.price,
                                t = this.amount,
                                r = P()(0);
                            try {
                                "market" === this.type && t ? r = this.calculateMarketTotal(t) : "limit" === this.type && t && e ? r = this.calculateLimitTotal(t) : "stop" === this.type && (r = this.calculateStopTotal(t))
                            } catch (e) {
                                return null
                            }
                            return r || P()(0)
                        }
                    }, {
                        key: "feeEstimation",
                        get: function () {
                            var e = k.a.feeRate || k.a.findRateForValue(P()(0));
                            if (!e || !this.total) return null;
                            if ("limit" === this.type && this.post_only) return P()(0);
                            if (!("stop" !== this.type || this.show_advanced && this.price)) return null;
                            var t = e.fee;
                            return "limit" !== this.type && "buy" === this.side ? t.mul(this.amount) : t.mul(this.total)
                        }
                    }, {
                        key: "postOnlyDisabled",
                        get: function () {
                            return !("GTC" === this.time_in_force || "GTT" === this.time_in_force)
                        }
                    }]), e
                }(), n = B(o.prototype, "type", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return "market"
                    }
                }), i = B(o.prototype, "side", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return "buy"
                    }
                }), a = B(o.prototype, "_price", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return ""
                    }
                }), l = B(o.prototype, "_amount", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return ""
                    }
                }), s = B(o.prototype, "stop_price", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return ""
                    }
                }), c = B(o.prototype, "show_advanced", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !1
                    }
                }), u = B(o.prototype, "time_in_force", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return "GTC"
                    }
                }), d = B(o.prototype, "cancel_after", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return "min"
                    }
                }), f = B(o.prototype, "post_only", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !0
                    }
                }), B(o.prototype, "amount", [C.computed], Object.getOwnPropertyDescriptor(o.prototype, "amount"), o.prototype), B(o.prototype, "price", [C.computed], Object.getOwnPropertyDescriptor(o.prototype, "price"), o.prototype), B(o.prototype, "total", [C.computed], Object.getOwnPropertyDescriptor(o.prototype, "total"), o.prototype), B(o.prototype, "feeEstimation", [C.computed], Object.getOwnPropertyDescriptor(o.prototype, "feeEstimation"), o.prototype), B(o.prototype, "postOnlyDisabled", [C.computed], Object.getOwnPropertyDescriptor(o.prototype, "postOnlyDisabled"), o.prototype), p = B(o.prototype, "reset", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.type = "market", e.side = "buy", e._amount = "", e._price = "", e.stop_price = "", e.time_in_force = "GTC", e.cancel_after = "min"
                        }
                    }
                }), h = B(o.prototype, "toggleAdvanced", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.show_advanced = !e.show_advanced, e.track("order_advanced_toggled")
                        }
                    }
                }), B(o.prototype, "setType", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setType"), o.prototype), B(o.prototype, "setSide", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setSide"), o.prototype), B(o.prototype, "setAmount", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setAmount"), o.prototype), B(o.prototype, "setPrice", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setPrice"), o.prototype), B(o.prototype, "setStopPrice", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setStopPrice"), o.prototype), B(o.prototype, "setCancelAfter", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setCancelAfter"), o.prototype), B(o.prototype, "setTimeInForce", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setTimeInForce"), o.prototype), B(o.prototype, "setPostOnly", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "setPostOnly"), o.prototype), B(o.prototype, "prefillAll", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "prefillAll"), o.prototype), B(o.prototype, "submit", [C.action], Object.getOwnPropertyDescriptor(o.prototype, "submit"), o.prototype), o),
                Y = r(1139),
                V = r(1130),
                Z = r(1133),
                X = r(1132),
                K = function () {
                    return function (e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function (e, t) {
                            var r = [],
                                o = !0,
                                n = !1,
                                i = void 0;
                            try {
                                for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !o && l.return && l.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                            return r
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                Q = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function J(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function ee(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var te, re = (R = function () {
                    function e(t) {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), J(this, "lastTradePrice", D, this), J(this, "lastUpdate", F, this), J(this, "feedLoaded", W, this), J(this, "accountsLoaded", L, this), J(this, "profileLoaded", I, this), J(this, "lastUpdateMsg", q, this), this.disposers = [], J(this, "onMarginProfileUpdateMsg", $, this), J(this, "startUpdater", H, this), this.orderFormStore = t.orderFormStore
                    }
                    return Q(e, [{
                        key: "feedSubscriptions",
                        get: function () {
                            return Y.a.hidden || !m.a.product ? [] : [{
                                name: "user",
                                product_ids: [m.a.product.id]
                            }]
                        }
                    }]), Q(e, [{
                        key: "subscribe",
                        value: function () {
                            var e = this;
                            Z.default.addSubscriber(this), this.disposers.push(Object(C.observe)(m.a, "profile", this.startUpdater)), this.disposers.push(Object(C.observe)(m.a, "product", function () {
                                e.startUpdater(), e.feedLoaded = !1
                            })), this.disposers.push(Object(C.observe)(X.a, "refreshingBalance", function () {
                                var t = m.a.profile;
                                if (t.margin_enabled && (e.accountsLoaded = !X.a.refreshingBalance, !X.a.refreshingBalance)) {
                                    e.profileLoaded = !1, e.updateInterval && Object(V.b)(e.updateInterval);
                                    var r = e.lastUpdateMsg;
                                    if (r) {
                                        var o = X.a.quoteAccount,
                                            n = X.a.baseAccount;
                                        !(o.balance.eq(r.quote_balance) && n.balance.eq(r.base_balance) && o.funded_amount.eq(r.quote_funding) && n.funded_amount.eq(r.base_funding)) ? e.refresh(): (e.applyMessage(), e.profileLoaded = !0)
                                    } else t.fetch().then(Object(C.action)(function () {
                                        e.profileLoaded = !0, e.startUpdater()
                                    })).catch(v.b)
                                }
                            })), this.setLastTradePrice(), this.startUpdater()
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            for (Z.default.removeSubscriber(this), Object(V.b)(this.updateInterval); this.disposers.length;) this.disposers.pop()()
                        }
                    }, {
                        key: "applyMessage",
                        value: function () {
                            var e = this.lastUpdateMsg;
                            if (e) {
                                var t = g.a.getMarginProfile(e.product_id);
                                t && t.update(e), this.lastUpdateMsg = null, this.startUpdater()
                            }
                        }
                    }, {
                        key: "refresh",
                        value: function () {
                            if (!X.a.refreshingBalance) {
                                this.updateInterval && Object(V.b)(this.updateInterval), this.refreshTimeout && Object(V.b)(this.refreshTimeout);
                                var e = m.a.profile,
                                    t = e.id;
                                this.refreshTimeout = Object(V.e)(Object(C.action)(function () {
                                    e.id === t && x.a.refreshAccounts()
                                }), 250)
                            }
                        }
                    }, {
                        key: "setLastTradePrice",
                        value: function () {
                            var e = m.a.product;
                            e && (this.lastTradePrice = w.a.lastTradePrice(e.id), this.lastUpdate = Date.now())
                        }
                    }, {
                        key: "loading",
                        get: function () {
                            return !(this.feedLoaded && this.accountsLoaded && this.profileLoaded)
                        }
                    }, {
                        key: "position",
                        get: function () {
                            var e = m.a.profile;
                            return e && e.margin_enabled && e.position_type || ""
                        }
                    }, {
                        key: "hasPosition",
                        get: function () {
                            return X.a.hasMarginPosition
                        }
                    }, {
                        key: "entryPrice",
                        get: function () {
                            var e = m.a.profile;
                            return !this.hasPosition || e.position_size.eq(0) ? P()(0) : e.position_complement.div(e.position_size).abs()
                        }
                    }, {
                        key: "callPrice",
                        get: function () {
                            var e = m.a.profile;
                            return !this.hasPosition || e.call_covered ? P()(0) : e.call_price
                        }
                    }, {
                        key: "marginRatio",
                        get: function () {
                            var e = X.a.baseAccount,
                                t = X.a.quoteAccount;
                            return m.a.profile.margin_enabled && e && t && !this.totalFundedValue.eq(0) ? e.balance.mul(this.lastTradePrice).add(t.balance).sub(this.totalFundedValue).div(this.totalFundedValue) : P()(0)
                        }
                    }, {
                        key: "leverage",
                        get: function () {
                            var e = X.a.baseAccount,
                                t = X.a.quoteAccount;
                            return m.a.profile.margin_enabled && e && t && !this.marginRatio.eq(0) ? P()(1).div(this.marginRatio).add(P()(1)) : P()(1)
                        }
                    }, {
                        key: "profitLoss",
                        get: function () {
                            var e = m.a.profile,
                                t = m.a.product;
                            return this.lastTradePrice, this.hasPosition && this.feedLoaded ? "long" === e.position_type ? A.h.calculateSellOrder(e.position_size).total.add(e.position_complement).mul(P()(1).minus(t.fee_rate)) : "short" === e.position_type ? e.position_complement.minus(A.h.calculateBaseBuyOrder(e.position_size).total.mul(P()(1).minus(t.fee_rate))) : P()(0) : P()(0)
                        }
                    }, {
                        key: "roe",
                        get: function () {
                            var e = m.a.profile;
                            return !this.hasPosition || e.position_complement.eq(0) ? P()(0) : this.profitLoss.div(e.position_complement.abs()).mul(100)
                        }
                    }, {
                        key: "totalProfileValue",
                        get: function () {
                            var e = X.a.baseAccount,
                                t = X.a.quoteAccount;
                            return e.balance.mul(this.lastTradePrice).add(t.balance)
                        }
                    }, {
                        key: "totalFundedValue",
                        get: function () {
                            var e = X.a.baseAccount,
                                t = X.a.quoteAccount;
                            return e.funded_amount.mul(this.lastTradePrice).add(t.funded_amount)
                        }
                    }, {
                        key: "buyingPower",
                        get: function () {
                            var e = X.a.quoteAccount,
                                t = X.a.baseAccount,
                                r = m.a.product,
                                o = m.a.profile,
                                n = this.orderFormStore,
                                i = n.side,
                                a = n.type;
                            if (this.lastUpdate, !(o.margin_enabled && "buy" === i && "stop" !== a && e && t && this.feedLoaded)) return null;
                            if (e.profile_id !== o.id || t.profile_id !== o.id) return null;
                            var l = A.h.bestBidPrice;
                            if (!l) return null;
                            var s = e.balance.minus(e.hold),
                                c = o.max_funding_value.sub(o.funded_value);
                            if (c.lte(0)) return s;
                            var u = t.balance.mul(l),
                                d = t.funded_amount.mul(l).add(e.funded_amount),
                                f = u.add(c).add(e.balance),
                                p = d.add(c),
                                h = f.sub(p).div(p);
                            if (o.initial_margin_ratio.lt(h)) return s.add(c);
                            for (var b = P()(s), v = P()(0), y = P()(0), g = A.h.asks, w = 0, _ = g.length; w < _; w++) {
                                var O = g[w],
                                    x = K(O, 2),
                                    k = x[0],
                                    C = x[1],
                                    S = C.mul(k);
                                if (b.gt(0)) {
                                    if (b.gte(S)) {
                                        y = y.add(C), b = b.sub(S);
                                        continue
                                    }
                                    var j = b.div(k);
                                    C = C.sub(j), S = S.sub(b), y = y.add(j), b = P()(0)
                                }
                                var T = !1;
                                if (v.add(S).gte(c) && (T = !0, C = (S = c.minus(v)).div(k)), f = u.add(y.add(C).mul(l)), p = d.add(v).add(S), h = f.sub(p).div(p), o.initial_margin_ratio.gte(h)) {
                                    var E = f.minus(C.mul(l)),
                                        z = p.minus(S),
                                        M = E.minus(z.mul(P()(1).add(o.initial_margin_ratio))).div(o.initial_margin_ratio.add(P()(1)).mul(k).minus(l));
                                    v = v.add(M.mul(k));
                                    break
                                }
                                if (y = y.add(C), v = v.add(S), T) break
                            }
                            v.lt(0) && (v = P()(0));
                            var N = s.add(v.mul(.95)),
                                B = N.mul(r.fee_rate).mul(2);
                            return N.minus(B)
                        }
                    }, {
                        key: "sellingPower",
                        get: function () {
                            var e = X.a.quoteAccount,
                                t = X.a.baseAccount,
                                r = m.a.product,
                                o = m.a.profile,
                                n = this.orderFormStore,
                                i = n.side,
                                a = n.type;
                            if (this.lastUpdate, !(o.margin_enabled && "sell" === i && "stop" !== a && e && t && this.feedLoaded)) return null;
                            if (e.profile_id !== o.id || t.profile_id !== o.id) return null;
                            var l = A.h.bestAskPrice;
                            if (!l) return null;
                            var s = t.balance.minus(t.hold),
                                c = o.max_funding_value.sub(o.funded_value);
                            if (c.lte(0)) return s;
                            var u = e.balance,
                                d = t.funded_amount.mul(l).add(e.funded_amount),
                                f = u.add(c).add(t.balance.mul(this.lastTradePrice)),
                                p = d.add(c),
                                h = f.sub(p).div(p);
                            if (o.initial_margin_ratio.lt(h)) return s.add(c.div(this.lastTradePrice));
                            for (var b = P()(s), v = P()(0), y = P()(0), g = A.h.bids, w = 0, _ = g.length; w < _; w++) {
                                var O = g[w],
                                    x = K(O, 2),
                                    k = x[0],
                                    C = x[1],
                                    S = C.mul(k);
                                if (b.gt(0)) {
                                    if (b.gte(C)) {
                                        y = y.add(S), b = b.sub(C);
                                        continue
                                    }
                                    var j = b.mul(k);
                                    C = C.sub(b), S = S.sub(j), y = y.add(j), b = P()(0)
                                }
                                var T = !1;
                                if (v.add(C).mul(l).gte(c) && (T = !0, C = (S = c.minus(v.mul(l))).div(k)), f = u.add(y).add(S), p = d.add(v.add(C).mul(l)), h = f.sub(p).div(p), o.initial_margin_ratio.gte(h)) {
                                    var E = f.minus(S),
                                        z = p.minus(C.mul(l)),
                                        M = E.minus(z.mul(P()(1).add(o.initial_margin_ratio))).div(o.initial_margin_ratio.add(P()(1)).mul(l).minus(k));
                                    v = v.add(M);
                                    break
                                }
                                if (y = y.add(S), v = v.add(C), T) break
                            }
                            v.lt(0) && (v = P()(0));
                            var N = s.add(v.mul(.95)),
                                B = N.mul(r.fee_rate).mul(2);
                            return N.minus(B)
                        }
                    }]), e
                }(), D = ee(R.prototype, "lastTradePrice", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return P()(0)
                    }
                }), F = ee(R.prototype, "lastUpdate", [C.observable], {
                    enumerable: !0,
                    initializer: null
                }), W = ee(R.prototype, "feedLoaded", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !1
                    }
                }), L = ee(R.prototype, "accountsLoaded", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !0
                    }
                }), I = ee(R.prototype, "profileLoaded", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !0
                    }
                }), q = ee(R.prototype, "lastUpdateMsg", [C.observable], {
                    enumerable: !0,
                    initializer: null
                }), ee(R.prototype, "feedSubscriptions", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "feedSubscriptions"), R.prototype), $ = ee(R.prototype, "onMarginProfileUpdateMsg", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            e.feedLoaded || (e.startUpdater(), e.feedLoaded = !0);
                            var r = t.product_id,
                                o = m.a.profile;
                            if (o.margin_enabled && o.product_id === r) {
                                e.lastUpdateMsg = t;
                                var n = X.a.quoteAccount,
                                    i = X.a.baseAccount;
                                !(n.balance.eq(t.quote_balance) && i.balance.eq(t.base_balance) && n.funded_amount.eq(t.quote_funding) && i.funded_amount.eq(t.base_funding)) ? e.refresh(): e.applyMessage()
                            }
                        }
                    }
                }), ee(R.prototype, "applyMessage", [C.action], Object.getOwnPropertyDescriptor(R.prototype, "applyMessage"), R.prototype), ee(R.prototype, "refresh", [C.action], Object.getOwnPropertyDescriptor(R.prototype, "refresh"), R.prototype), H = ee(R.prototype, "startUpdater", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            var t = m.a.profile;
                            t && (e.setLastTradePrice(), e.updateInterval && Object(V.b)(e.updateInterval), t.margin_enabled && (e.updateInterval = Object(V.d)(function () {
                                e.setLastTradePrice()
                            }, 3e3)))
                        }
                    }
                }), ee(R.prototype, "setLastTradePrice", [C.action], Object.getOwnPropertyDescriptor(R.prototype, "setLastTradePrice"), R.prototype), ee(R.prototype, "loading", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "loading"), R.prototype), ee(R.prototype, "position", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "position"), R.prototype), ee(R.prototype, "hasPosition", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "hasPosition"), R.prototype), ee(R.prototype, "entryPrice", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "entryPrice"), R.prototype), ee(R.prototype, "callPrice", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "callPrice"), R.prototype), ee(R.prototype, "marginRatio", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "marginRatio"), R.prototype), ee(R.prototype, "leverage", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "leverage"), R.prototype), ee(R.prototype, "profitLoss", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "profitLoss"), R.prototype), ee(R.prototype, "roe", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "roe"), R.prototype), ee(R.prototype, "totalProfileValue", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "totalProfileValue"), R.prototype), ee(R.prototype, "totalFundedValue", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "totalFundedValue"), R.prototype), ee(R.prototype, "buyingPower", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "buyingPower"), R.prototype), ee(R.prototype, "sellingPower", [C.computed], Object.getOwnPropertyDescriptor(R.prototype, "sellingPower"), R.prototype), R),
                oe = r(1136),
                ne = r(1146),
                ie = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function ae(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var le, se = (ae((te = function (e) {
                    function t() {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var e = function (e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, j.f));
                        return e.onMatchesMsg = function (t) {
                            for (var r = t.matches, o = 0, n = r.length; o < n; o++) {
                                if (r[o].user_id) return e.update()
                            }
                        }, e._refresh = function () {
                            var t = _.a.user,
                                r = m.a.product;
                            t && r && e.refresh({
                                product_id: r.id
                            })
                        }, e.visible = e._refresh, e
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, ne["a"]), ie(t, [{
                        key: "subscribe",
                        value: function () {
                            Z.default.addSubscriber(this), this.loading || this._refresh(), this.disposeProductObserver = Object(C.observe)(m.a, "product", this._refresh)
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            Z.default.removeSubscriber(this), this.disposeProductObserver && this.disposeProductObserver()
                        }
                    }, {
                        key: "refresh",
                        value: function (e) {
                            return this.pollTimeout && (Object(V.b)(this.pollTimeout), this.pollTimeout = null),
                                function e(t, r, o) {
                                    null === t && (t = Function.prototype);
                                    var n = Object.getOwnPropertyDescriptor(t, r);
                                    if (void 0 === n) {
                                        var i = Object.getPrototypeOf(t);
                                        return null === i ? void 0 : e(i, r, o)
                                    }
                                    if ("value" in n) return n.value;
                                    var a = n.get;
                                    return void 0 !== a ? a.call(o) : void 0
                                }(t.prototype.__proto__ || Object.getPrototypeOf(t.prototype), "refresh", this).call(this, e)
                        }
                    }, {
                        key: "poll",
                        value: function () {
                            var e, t = (e = regeneratorRuntime.mark(function e() {
                                var t, r, o, n, i, a, l = this;
                                return regeneratorRuntime.wrap(function (e) {
                                    for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        return t = Object.assign({}, this.query), r = this.refreshId, this.before && (t.before = this.before), e.next = 5, j.f.find(t);
                                    case 5:
                                        if (o = e.sent, n = o.models, i = o.res, r === this.refreshId) {
                                            e.next = 10;
                                            break
                                        }
                                        return e.abrupt("return", []);
                                    case 10:
                                        return a = [], Object(C.runInAction)(function () {
                                            var e = i.header["cb-before"];
                                            e && (l.before = e);
                                            var t = j.f.getConfig().primary;
                                            a = n.filter(function (e) {
                                                var r = e[t];
                                                if (!l.hash[r]) return l.hash[r] = e, !0
                                            }), l.models = a.concat(l.models.slice())
                                        }), e.abrupt("return", a);
                                    case 13:
                                    case "end":
                                        return e.stop()
                                    }
                                }, e, this)
                            }), function () {
                                var t = e.apply(this, arguments);
                                return new Promise(function (e, r) {
                                    return function o(n, i) {
                                        try {
                                            var a = t[n](i),
                                                l = a.value
                                        } catch (e) {
                                            return void r(e)
                                        }
                                        if (!a.done) return Promise.resolve(l).then(function (e) {
                                            o("next", e)
                                        }, function (e) {
                                            o("throw", e)
                                        });
                                        e(l)
                                    }("next")
                                })
                            });
                            return function () {
                                return t.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "update",
                        value: function () {
                            var e = this;
                            this.pollTimeout && (Object(V.b)(this.pollTimeout), this.pollTimeout = null), this.pollTimeout = Object(V.e)(function () {
                                e.poll()
                            }, 250)
                        }
                    }, {
                        key: "feedSubscriptions",
                        get: function () {
                            return Y.a.hidden || !m.a.product ? [] : [{
                                name: "user",
                                product_ids: [m.a.product.id]
                            }]
                        }
                    }, {
                        key: "fills",
                        get: function () {
                            return this.models.slice()
                        }
                    }]), t
                }()).prototype, "feedSubscriptions", [C.computed], Object.getOwnPropertyDescriptor(te.prototype, "feedSubscriptions"), te.prototype), ae(te.prototype, "fills", [C.computed], Object.getOwnPropertyDescriptor(te.prototype, "fills"), te.prototype), ae(te.prototype, "poll", [C.action], Object.getOwnPropertyDescriptor(te.prototype, "poll"), te.prototype), te),
                ce = r(1198),
                ue = r(7),
                de = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function fe(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var pe, he, be = Object(ue.c)(le = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = fe(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.originalTitle = document.title, fe(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), de(t, [{
                        key: "componentWillUnmount",
                        value: function () {
                            document.title = this.originalTitle
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props.children,
                                t = m.a.product;
                            if (!t) return e;
                            var r = (w.a.stats.get(t.id) || {}).last;
                            return r ? (document.title = "" + t.quote.symbol + r.toFixed(t.price_precision) + " Â· " + t.base.id + " to " + t.quote.id + " " + this.originalTitle, e) : e
                        }
                    }]), t
                }()) || le,
                ve = r(2),
                ye = r(1111),
                me = r.n(ye),
                ge = r(1122),
                we = r(1121),
                _e = r(1150),
                Oe = r(6),
                xe = r(254),
                ke = r(1331),
                Ce = r.n(ke),
                Se = (pe = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, function (e, t, r, o) {
                    var n = e && e.defaultProps,
                        i = arguments.length - 3;
                    if (t || 0 === i || (t = {}), t && n)
                        for (var a in n) void 0 === t[a] && (t[a] = n[a]);
                    else t || (t = n || {}); if (1 === i) t.children = o;
                    else if (i > 1) {
                        for (var l = Array(i), s = 0; s < i; s++) l[s] = arguments[s + 3];
                        t.children = l
                    }
                    return {
                        $$typeof: pe,
                        type: e,
                        key: void 0 === r ? null : "" + r,
                        ref: null,
                        props: t,
                        _owner: null
                    }
                }),
                Pe = ve.c.img(["width:80%;height:auto;@media (max-width:600px){width:100%;}"]),
                je = function () {
                    return Se(Pe, {
                        src: Ce.a,
                        role: "presentation"
                    })
                },
                Te = r(1149),
                Ae = r(16),
                Ee = r(1126),
                ze = r(1117),
                Me = r(1330),
                Ne = r.n(Me),
                Be = [{
                    id: "1",
                    content: "You are a corporation, partnership, proprietorship, organization, trust, or other entity that has a net worth exceeding $1,000,000 and you enter into margin trading in connection with the conduct of your business or to manage the risk associated with an asset or liability owned or incurred or reasonably likely to be owned or incurred by you in the conduct of your business.",
                    institution: !0
                }, {
                    id: "2",
                    content: "You are a corporation, partnership, proprietorship, organization, trust, or other entity that has total assets exceeding $10,000,000.",
                    institution: !0
                }, {
                    id: "3",
                    content: "You are a corporation, partnership, proprietorship, organization, trust, or other entity the obligations of which are guaranteed or otherwise supported by a letter of credit or keepwell, support, or other agreement by a corporation, partnership, proprietorship, organization, trust, or other entity that qualifies under any of the preceding sections.",
                    institution: !0
                }, {
                    id: "4",
                    content: "You are an individual who has amounts invested on a discretionary basis, the aggregate of which is in excess of $5,000,000 and you enter into margin trading in order to manage the risk associated with an asset owned or liability incurred, or reasonably likely to be owned or incurred, by the individual.",
                    individual: !0
                }, {
                    id: "5",
                    content: "You are an individual who has amounts invested on a discretionary basis, the aggregate of which is in excess of $10,000,000.",
                    individual: !0
                }, {
                    id: "6",
                    content: "You are a commodity pool that has total assets exceeding $5,000,000 and is formed and operated by a person subject to regulation under the Commodity Exchange Act or a foreign person performing a similar role or function subject as such to foreign regulation.",
                    individual: !0,
                    institution: !0
                }, {
                    id: "7",
                    content: "You are a financial institution as defined in Section 1a(21) of the Commodity Exchange Act.",
                    institution: !0
                }, {
                    id: "8",
                    content: "You are an insurance company that is regulated by a State, or that is regulated by a foreign government and is subject to comparable regulation as determined by the CFTC, including a regulated subsidiary or affiliate of such an insurance company.",
                    institution: !0
                }, {
                    id: "9",
                    content: "You are an investment company subject to regulation under the Investment Company Act of 1940, as amended, or a foreign person performing a similar role or function subject as such to foreign regulation (regardless of whether each investor in the investment company or the foreign person is itself an Eligible Contract Participant).",
                    institution: !0
                }, {
                    id: "10",
                    content: "You are a broker or dealer (other than a natural person or proprietorship) subject to regulation under the Securities Exchange Act, or a foreign person (other than a natural person or proprietorship) performing a similar role or function subject as such to foreign regulation.",
                    individual: !0,
                    institution: !0
                }, {
                    id: "11",
                    content: "You are an associated person of a registered broker or dealer concerning the financial or securities activities of which the registered broker or dealer makes and keeps records under Section 15C(b) or 17(h) of the Securities Exchange Act.",
                    individual: !0,
                    institution: !0
                }, {
                    id: "12",
                    content: "You are an investment bank holding company (as defined in Section 17(i) of the Securities Exchange Act).",
                    institution: !0
                }, {
                    id: "13",
                    content: "You are a futures commission merchant subject to regulation under the Commodity Exchange Act (other than a natural person or proprietorship) or a foreign person (other than a natural person or proprietorship) performing a similar role or function subject as such to foreign regulation.",
                    individual: !0,
                    institution: !0
                }, {
                    id: "14",
                    content: "You are a floor broker or floor trader subject to regulation under the Commodity Exchange Act in connection with any transaction that takes place on or through the facilities of a registered entity (other than an electronic trading facility with respect to a significant price discovery contract) or an exempt board of trade, or any affiliate thereof, on which such person regularly trades.",
                    individual: !0,
                    institution: !0
                }, {
                    id: "15",
                    content: "You are a governmental entity (Federal agency, State, State agency, city, county, municipality, other political subdivision of a State, or any instrumentality , department, or corporation of or established by a State or political subdivision of a State, ERISA entity or governmental plan or endowment.",
                    individual: !0,
                    institution: !0
                }, {
                    id: "16",
                    content: "You are an investment adviser subject to regulation under the Investment Advisers Act of 1940.",
                    individual: !0
                }, {
                    id: "17",
                    content: "You are a commodity trading advisor subject to regulation under the Commodities Exchange Act.",
                    individual: !0
                }],
                Re = r(1329),
                De = r.n(Re),
                Fe = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                We = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var Le, Ie = me.a.bind(De.a),
                qe = Object(ue.c)(he = function (e) {
                    function t(e) {
                        var r = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var o, n, i = function (e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                        i.setName = function (e) {
                            var t = e.target;
                            if (t instanceof HTMLInputElement) {
                                var r = t.value;
                                i.setState({
                                    name: r
                                })
                            }
                        }, i.setType = function (e) {
                            var t = e.target;
                            if (t instanceof HTMLElement) {
                                var r = t.dataset.type;
                                "individual" !== r && "institution" !== r || (i.refs.list.scrollTop = 0, i.setState({
                                    type: r,
                                    formReady: !1
                                }))
                            }
                        }, i.onSubmit = (o = regeneratorRuntime.mark(function e(t) {
                            var o, n, a, l, s;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (o = i.props.onSubmit, n = i.state, a = n.formReady, l = n.isLoading, t.preventDefault(), a && !l) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 5:
                                    if ((s = Ne()(t.target, {
                                        hash: !0
                                    })).is_me = "yes", s.name = s.name.trim(), s.name) {
                                        e.next = 10;
                                        break
                                    }
                                    return e.abrupt("return", i.setState({
                                        error: "Legal name cannot be blank"
                                    }));
                                case 10:
                                    return i.setState({
                                        isLoading: !0
                                    }), e.prev = 11, e.next = 14, o(s);
                                case 14:
                                    Object(v.c)({
                                        category: "Margin Trading",
                                        action: "ECP declared"
                                    }), e.next = 20;
                                    break;
                                case 17:
                                    e.prev = 17, e.t0 = e.catch(11), i.setState({
                                        error: e.t0.message
                                    });
                                case 20:
                                    i.setState({
                                        isLoading: !1
                                    });
                                case 21:
                                case "end":
                                    return e.stop()
                                }
                            }, e, r, [
                                [11, 17]
                            ])
                        }), n = function () {
                            var e = o.apply(this, arguments);
                            return new Promise(function (t, r) {
                                return function o(n, i) {
                                    try {
                                        var a = e[n](i),
                                            l = a.value
                                    } catch (e) {
                                        return void r(e)
                                    }
                                    if (!a.done) return Promise.resolve(l).then(function (e) {
                                        o("next", e)
                                    }, function (e) {
                                        o("throw", e)
                                    });
                                    t(l)
                                }("next")
                            })
                        }, function (e) {
                            return n.apply(this, arguments)
                        }), i.onFormChange = function () {
                            var e = Ne()(i.refs.form, {
                                hash: !0
                            });
                            if (e.name = e.name && e.name.trim(), !e.name) return i.setState({
                                formReady: !1
                            });
                            var t = !!Be.filter(function (t) {
                                return e["type-" + t.id]
                            }).length;
                            i.setState({
                                formReady: t
                            })
                        };
                        var a = _.a.user;
                        return i.state = {
                            error: "",
                            name: a && (a.legal_name || a.name) || "",
                            type: "individual",
                            formReady: !1,
                            isLoading: !1
                        }, i
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), We(t, [{
                        key: "render",
                        value: function () {
                            var e = this.state,
                                t = e.name,
                                r = e.type,
                                o = e.error,
                                n = e.formReady,
                                i = e.isLoading;
                            return Fe("div", {
                                className: Ie("ecp-form")
                            }, void 0, b.createElement("form", {
                                className: Ie("panels"),
                                ref: "form",
                                onSubmit: this.onSubmit,
                                onChange: this.onFormChange
                            }, Fe("div", {
                                className: Ie("left-panel")
                            }, void 0, Fe("div", {
                                className: Ie("panel-title")
                            }, void 0, "ECP Declaration"), Fe("p", {}, void 0, "In order to access Margin Trading on GDAX, you must be an Eligible Contract Participant (â€œECPâ€, as defined in Section 1a(18) of the Commodity Exchange Act and applicable regulations thereunder)."), Fe("p", {}, void 0, "The entity named in this declaration represents and warrants to Coinbase, Inc., that: (i) this declaration is true and accurate; (ii) the named entity is an Eligible Contract Participant by virtue of the selected statement; (iii) the person making this declaration is authorized to do so on behalf of the named entity; and (iv) that it will notify Coinbase, Inc. as soon as practicable of any changes to the contents of this declaration."), Fe("p", {}, void 0, "The named entity agrees to cooperate in any inquiry or investigation related to this declaration and its Margin Trading activity on GDAX."), Fe("div", {
                                className: Ie("name-input")
                            }, void 0, Fe("div", {
                                className: Ie("text")
                            }, void 0, "Legal Name of", " ", "individual" === r ? "Individual" : "Entity"), Fe("input", {
                                type: "text",
                                name: "name",
                                value: t,
                                onChange: this.setName
                            }))), Fe("div", {
                                className: Ie("right-panel")
                            }, void 0, Fe("p", {}, void 0, "Please select each of the following statements that is applicable to you (the entity applying to access Margin Trading on GDAX), in order to evidence your representation that you are an ECP."), Fe("div", {
                                className: Ie("types")
                            }, void 0, Fe("div", {
                                className: Ie("type", "individual" === r ? "active" : ""),
                                onClick: this.setType,
                                "data-type": "individual"
                            }, void 0, "Individual"), Fe("div", {
                                className: Ie("type", "institution" === r ? "active" : ""),
                                onClick: this.setType,
                                "data-type": "institution"
                            }, void 0, "Institution")), b.createElement("ul", {
                                ref: "list"
                            }, Be.map(function (e) {
                                return e[r] ? Fe("li", {}, e.id, Fe("label", {}, void 0, Fe("input", {
                                    type: "checkbox",
                                    name: "type-" + e.id,
                                    value: "yes"
                                }), Fe("span", {}, void 0, e.content))) : null
                            })), o ? Fe("div", {
                                className: Ie("error")
                            }, void 0, o) : null, Fe("button", {
                                className: Ie({
                                    disabled: !n || i
                                })
                            }, void 0, "Make Declaration"))))
                        }
                    }]), t
                }()) || he,
                $e = r(1327),
                He = r.n($e),
                Ue = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Ge = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var Ye = me.a.bind(He.a),
                Ve = Object(ue.c)(Le = function (e) {
                    function t(e) {
                        var r = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var o, n, i = function (e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this, e));
                        return i.onSubmit = (o = regeneratorRuntime.mark(function e(t) {
                            var o, n, a, l, s;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (o = i.state.step, n = i.props, a = n.onClose, l = n.createMarginProfile, s = _.a.user) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 5:
                                    if ("activate" !== o) {
                                        e.next = 13;
                                        break
                                    }
                                    if (!s.requires_ecp) {
                                        e.next = 8;
                                        break
                                    }
                                    return e.abrupt("return", i.setState({
                                        step: "ecp"
                                    }));
                                case 8:
                                    return e.next = 10, l();
                                case 10:
                                    return s.margin_enabled = !0, a(), e.abrupt("return");
                                case 13:
                                    if ("ecp" !== o) {
                                        e.next = 18;
                                        break
                                    }
                                    return e.next = 16, l(t);
                                case 16:
                                    s.margin_enabled = !0, a();
                                case 18:
                                case "end":
                                    return e.stop()
                                }
                            }, e, r)
                        }), n = function () {
                            var e = o.apply(this, arguments);
                            return new Promise(function (t, r) {
                                return function o(n, i) {
                                    try {
                                        var a = e[n](i),
                                            l = a.value
                                    } catch (e) {
                                        return void r(e)
                                    }
                                    if (!a.done) return Promise.resolve(l).then(function (e) {
                                        o("next", e)
                                    }, function (e) {
                                        o("throw", e)
                                    });
                                    t(l)
                                }("next")
                            })
                        }, function (e) {
                            return n.apply(this, arguments)
                        }), i.state = {
                            step: i.props.step || "activate"
                        }, i
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Ge(t, [{
                        key: "UNSAFE_componentWillReceiveProps",
                        value: function (e) {
                            var t = e.isOpen,
                                r = e.step;
                            t && this.setState({
                                step: r
                            })
                        }
                    }, {
                        key: "shouldComponentUpdate",
                        value: function (e, t) {
                            return this.state.step !== t.step
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props.onClose,
                                t = _.a.user,
                                r = this.state.step,
                                o = "ACTIVATE MARGIN TRADING",
                                n = null;
                            return "unavailable" === r ? (o = "MARGIN UNAVAILABLE", n = "Margin trading is currently not available for this product.") : "no-user" === r ? (o = "ACTION REQUIRED", n = "Please sign in to trade on margin.") : "ny-user" === r ? (o = "MARGIN UNAVAILABLE", n = "Margin trading is not yet available in your state. We will notify you when margin trading becomes available.") : "already-active" === r && t ? (o = "ACTION REQUIRED", n = Ue("div", {}, void 0, Ue("p", {}, void 0, "You can only have margin trading enabled on", " ", Ue("b", {}, void 0, "one order book at a time"), "."), Ue("p", {}, void 0, "Margin must first be turned off on", " ", Ue("b", {}, void 0, t.details.margin_product_id), " before you can enable it here."), Ue(Ae.a, {
                                to: "/trade/" + t.details.margin_product_id
                            }, void 0, Ue("button", {
                                onClick: e
                            }, void 0, "View and Manage ", t.details.margin_product_id)))) : "has-position" === r ? (o = "ACTION REQUIRED", n = "You cannot deactivate margin trading while you have an open position.") : "activate" === r && (o = "MARGIN TRADING", n = Ue("div", {}, void 0, Ue("p", {}, void 0, "Margin trading gives you access to additional funds to trade with, multiplying any gains or losses. This feature involves an increased risk of loss and is intended for use by sophisticated and experienced traders only. To learn more about margin trading, see our", " ", Ue(ze.a, {
                                href: "https://support.gdax.com/customer/portal/articles/2725963-intro-to-margin-trading"
                            }, void 0, "support article"), "."), Ue("p", {}, void 0, "By continuing, you accept the", " ", Ue(ze.a, {
                                href: "https://support.gdax.com/customer/portal/articles/2769116-margin-agreement"
                            }, void 0, "margin trading agreement"), "."), Ue("button", {
                                onClick: this.onSubmit
                            }, void 0, "Accept and Continue"))), Ue(Ee.a, {
                                onClose: e,
                                contentLabel: "MarginModal",
                                title: o
                            }, void 0, Ue("div", {
                                className: Ye("content", {
                                    small: n
                                })
                            }, void 0, "ecp" !== r ? null : Ue(qe, {
                                onSubmit: this.onSubmit
                            }), n || null))
                        }
                    }]), t
                }()) || Le,
                Ze = r(1325),
                Xe = r.n(Ze),
                Ke = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Qe = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Je(e) {
                return function () {
                    var t = e.apply(this, arguments);
                    return new Promise(function (e, r) {
                        return function o(n, i) {
                            try {
                                var a = t[n](i),
                                    l = a.value
                            } catch (e) {
                                return void r(e)
                            }
                            if (!a.done) return Promise.resolve(l).then(function (e) {
                                o("next", e)
                            }, function (e) {
                                o("throw", e)
                            });
                            e(l)
                        }("next")
                    })
                }
            }

            function et(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var tt = me.a.bind(Xe.a),
                rt = function (e) {
                    function t() {
                        var e, r, o, n, i, a, l = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var s = arguments.length, c = Array(s), u = 0; u < s; u++) c[u] = arguments[u];
                        return r = o = et(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(c))), o.state = {
                            marginModalStep: "",
                            loading: !1,
                            toggleLock: !1
                        }, o.toggleMargin = (a = Je(regeneratorRuntime.mark(function e(t) {
                            var r, n, i, a, s, c, u, d, f, p, h, b, y;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (r = X.a.baseAccount, n = X.a.quoteAccount, i = _.a.user, a = m.a.product, s = m.a.profile, c = g.a.getDefaultProfile(), u = o.state, d = u.loading, f = u.toggleLock, i) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return", o.setState({
                                        marginModalStep: "no-user"
                                    }));
                                case 7:
                                    if ("NY" !== i.state_code) {
                                        e.next = 9;
                                        break
                                    }
                                    return e.abrupt("return", o.setState({
                                        marginModalStep: "ny-user"
                                    }));
                                case 9:
                                    if (a && s && c && (!d || t) && !f) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 11:
                                    if (p = void 0, h = void 0, b = void 0, !s.margin_enabled) {
                                        e.next = 22;
                                        break
                                    }
                                    if (!r.funded_amount.gt(0) && !n.funded_amount.gt(0) && "short" !== s.position_type && "long" !== s.position_type) {
                                        e.next = 17;
                                        break
                                    }
                                    return e.abrupt("return", o.setState({
                                        marginModalStep: "has-position"
                                    }));
                                case 17:
                                    p = c, b = new j.g({
                                        profile_id: c.id,
                                        margin_profile_id: s.id,
                                        type: "withdraw",
                                        currency: a.base.id,
                                        amount: r.available
                                    }), h = new j.g({
                                        profile_id: c.id,
                                        margin_profile_id: s.id,
                                        type: "withdraw",
                                        currency: a.quote.id,
                                        amount: n.available
                                    }), e.next = 39;
                                    break;
                                case 22:
                                    if (a.margin_enabled) {
                                        e.next = 24;
                                        break
                                    }
                                    return e.abrupt("return", o.setState({
                                        marginModalStep: "unavailable"
                                    }));
                                case 24:
                                    if (!i.details.margin_product_id || i.details.margin_product_id === a.id) {
                                        e.next = 26;
                                        break
                                    }
                                    return e.abrupt("return", o.setState({
                                        marginModalStep: "already-active"
                                    }));
                                case 26:
                                    if (y = g.a.getMarginProfile(a.id)) {
                                        e.next = 36;
                                        break
                                    }
                                    if (a.accessible) {
                                        e.next = 31;
                                        break
                                    }
                                    return o.setLoading(!1), e.abrupt("return", o.setState({
                                        marginModalStep: "unavailable"
                                    }));
                                case 31:
                                    if (!i.margin_enabled) {
                                        e.next = 34;
                                        break
                                    }
                                    return o.setLoading(!0), e.abrupt("return", o.createMarginProfile().catch(function (e) {
                                        Object(v.b)(e), o.setLoading(!1), o.setState({
                                            marginModalStep: "unavailable"
                                        })
                                    }));
                                case 34:
                                    return Object(v.c)({
                                        category: "Margin Trading",
                                        action: "Activate"
                                    }), e.abrupt("return", o.setState({
                                        marginModalStep: "activate"
                                    }));
                                case 36:
                                    p = y, b = new j.g({
                                        profile_id: s.id,
                                        margin_profile_id: y.id,
                                        type: "deposit",
                                        currency: a.base.id,
                                        amount: r.available
                                    }), h = new j.g({
                                        profile_id: s.id,
                                        margin_profile_id: y.id,
                                        type: "deposit",
                                        currency: a.quote.id,
                                        amount: n.available
                                    });
                                case 39:
                                    return o.setLoading(!0), o.setState({
                                        toggleLock: !0
                                    }), setTimeout(function () {
                                        o.setState({
                                            toggleLock: !1
                                        })
                                    }, 500), e.prev = 42, e.next = 45, o.attemptTransfer(h, 2);
                                case 45:
                                    return e.next = 47, o.attemptTransfer(b, 2);
                                case 47:
                                    e.next = 52;
                                    break;
                                case 49:
                                    e.prev = 49, e.t0 = e.catch(42), Object(v.b)(e.t0);
                                case 52:
                                    m.a.setProfile(p), o.setLoading(!1), i.set_margin_product_id(p.product_id);
                                case 55:
                                case "end":
                                    return e.stop()
                                }
                            }, e, l, [
                                [42, 49]
                            ])
                        })), function (e) {
                            return a.apply(this, arguments)
                        }), o.onModalClose = function () {
                            o.setState({
                                marginModalStep: ""
                            })
                        }, o.attemptTransfer = (i = Je(regeneratorRuntime.mark(function e(t, r) {
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t.amount.gt(0)) {
                                        e.next = 2;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 2:
                                    return e.prev = 2, e.next = 5, t.save();
                                case 5:
                                    e.next = 12;
                                    break;
                                case 7:
                                    if (e.prev = 7, e.t0 = e.catch(2), !(r > 0)) {
                                        e.next = 11;
                                        break
                                    }
                                    return e.abrupt("return", o.attemptTransfer(t, r - 1));
                                case 11:
                                    throw new Error("Transfer failed");
                                case 12:
                                case "end":
                                    return e.stop()
                                }
                            }, e, l, [
                                [2, 7]
                            ])
                        })), function (e, t) {
                            return i.apply(this, arguments)
                        }), o.createMarginProfile = (n = Je(regeneratorRuntime.mark(function e(t) {
                            var r, n, i, a;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    return r = _.a.user, n = m.a.product, i = {
                                        margin_enabled: !0,
                                        product_id: n.id,
                                        name: n.id.toLowerCase() + "-margin"
                                    }, r && r.requires_ecp && t && (i.ecp_form = t), a = {
                                        method: "POST",
                                        body: i
                                    }, e.next = 7, j.l.request(a);
                                case 7:
                                    return e.next = 9, g.a.fetch();
                                case 9:
                                    o.toggleMargin(!0);
                                case 10:
                                case "end":
                                    return e.stop()
                                }
                            }, e, l)
                        })), function (e) {
                            return n.apply(this, arguments)
                        }), et(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Qe(t, [{
                        key: "setLoading",
                        value: function (e) {
                            this.props.setLoading(e), this.setState({
                                loading: e
                            })
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.state.toggleLock,
                                t = m.a.profile,
                                r = t && t.margin_enabled;
                            return Ke("article", {
                                className: tt("margin")
                            }, void 0, Ke(ot, {}, void 0, "MARGIN TRADING"), Ke("div", {
                                className: tt("margin-toggle", r ? "on" : "off", {
                                    lock: e
                                }),
                                onClick: this.toggleMargin
                            }, void 0, Ke("div", {
                                className: tt("indicator")
                            }), Ke("div", {
                                className: tt("text", "off")
                            }, void 0, "OFF"), Ke("div", {
                                className: tt("text", "on")
                            }, void 0, "ON"), this.state.marginModalStep && Ke(Ve, {
                                onClose: this.onModalClose,
                                step: this.state.marginModalStep,
                                createMarginProfile: this.createMarginProfile
                            })))
                        }
                    }]), t
                }(),
                ot = ve.c.h2(["flex:1;margin:0;font-size:14px;line-height:43px;letter-spacing:0;text-transform:uppercase;"]),
                nt = Object(ue.c)(rt),
                it = r(1128),
                at = r(1323),
                lt = r.n(at),
                st = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                ct = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function ut(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var dt, ft = me.a.bind(lt.a),
                pt = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = ut(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            signingIn: !1
                        }, o.onSignin = function () {
                            o.setState({
                                signingIn: !0
                            }), Object(it.b)()
                        }, o.onSignup = function () {
                            o.setState({
                                signingIn: !0
                            }), Object(it.c)()
                        }, ut(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ct(t, [{
                        key: "render",
                        value: function () {
                            var e = this.state.signingIn;
                            return st(bt, {}, void 0, st("div", {
                                className: ft("signin")
                            }, void 0, st(ht, {
                                onClick: this.onSignin,
                                disabled: e
                            }, void 0, "Sign in"), st("span", {
                                className: ft("divider")
                            }, void 0, "or"), st(ht, {
                                onClick: this.onSignup,
                                disabled: e
                            }, void 0, "create account")), st(vt, {
                                href: "/institutional-interest"
                            }, void 0, "Are you an institution?"))
                        }
                    }]), t
                }(),
                ht = ve.c.button(["padding:8px 12px 8px;border:none;border-radius:3px;font-size:13px;letter-spacing:0.5px;color:$light-color;background-color:fade-out-color($body-color,80%);&:hover{color:$light-color;background-color:fade-out-color($body-color,65%);}"]),
                bt = ve.c.div(["display:flex;flex-direction:column;"]),
                vt = ve.c.a(["margin:0;padding:10px 0 0 0 !important;border:none !important;font-size:11px !important;background-color:none !important;&:hover{text-decoration:underline;}"]),
                yt = r(1181),
                mt = r(1118),
                gt = r(1189),
                wt = r(1302),
                _t = r.n(wt),
                Ot = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                xt = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function kt(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Ct = me.a.bind(_t.a),
                St = Object(ue.c)(dt = function (e) {
                    function t() {
                        var e, r, o, n, i, a = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var l = arguments.length, s = Array(l), c = 0; c < l; c++) s[c] = arguments[c];
                        return r = o = kt(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(s))), o.onAccept = (n = regeneratorRuntime.mark(function e(t) {
                            var r;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t.stopPropagation(), r = _.a.user) {
                                        e.next = 4;
                                        break
                                    }
                                    throw new Error("No user found for accepting terms");
                                case 4:
                                    return e.next = 6, r.accept_terms();
                                case 6:
                                    o.props.onClose();
                                case 7:
                                case "end":
                                    return e.stop()
                                }
                            }, e, a)
                        }), i = function () {
                            var e = n.apply(this, arguments);
                            return new Promise(function (t, r) {
                                return function o(n, i) {
                                    try {
                                        var a = e[n](i),
                                            l = a.value
                                    } catch (e) {
                                        return void r(e)
                                    }
                                    if (!a.done) return Promise.resolve(l).then(function (e) {
                                        o("next", e)
                                    }, function (e) {
                                        o("throw", e)
                                    });
                                    t(l)
                                }("next")
                            })
                        }, function (e) {
                            return i.apply(this, arguments)
                        }), kt(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), xt(t, [{
                        key: "render",
                        value: function () {
                            return Ot(Ee.a, {
                                contentLabel: "LegalModal",
                                title: "Welcome to GDAX"
                            }, void 0, Ot("div", {
                                className: Ct("content")
                            }, void 0, Ot("p", {}, void 0, "GDAX allows you to trade digital currency. You can begin by transferring funds from your Coinbase Account to your GDAX Account or by depositing digital currency from an external address."), Ot("p", {}, void 0, Ot("b", {}, void 0, "GDAX is a professional trading platform designed for experienced traders."), " ", "The easiest way to buy and sell digital currency is", " ", Ot(ze.a, {
                                href: "https://www.coinbase.com/"
                            }, void 0, "Coinbase.com"), ". Please refer to", " ", Ot(ze.a, {
                                href: "https://support.gdax.com/"
                            }, void 0, "GDAX Support"), " ", "for more information."), Ot("p", {}, void 0, Ot("b", {}, void 0, "There is a risk of loss when you trade digital currency. All trades are final.")), Ot("br", {}), Ot("button", {
                                onClick: this.onAccept
                            }, void 0, "OK, I understand")))
                        }
                    }]), t
                }()) || dt,
                Pt = r(1300),
                jt = r.n(Pt),
                Tt = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                At = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Et(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var zt = me.a.bind(jt.a),
                Mt = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Et(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            modal: null
                        }, o.hideModal = function () {
                            o.setState({
                                modal: null
                            })
                        }, o.closeLegalModal = function () {
                            o.setState({
                                modal: "transfer_marker"
                            })
                        }, o.onSelectQuoteCurrency = function () {
                            var e = o.props.orderFormStore,
                                t = X.a.quoteAccount;
                            if (t) {
                                var r = t.available,
                                    n = t.currency;
                                e.prefillAll(r, n)
                            }
                        }, o.onSelectBaseCurrency = function () {
                            var e = o.props.orderFormStore,
                                t = X.a.baseAccount;
                            if (t) {
                                var r = t.available,
                                    n = t.currency;
                                e.prefillAll(r, n)
                            }
                        }, o.onSelectPurchasingPower = function () {
                            var e = o.props,
                                t = e.orderFormStore,
                                r = e.positionStore,
                                n = m.a.product,
                                i = t.side,
                                a = r.buyingPower,
                                l = r.sellingPower;
                            "buy" === i ? a && t.prefillAll(a, n.quote.id) : l && t.prefillAll(l, n.base.id)
                        }, o.onDeposit = function () {
                            o.setState({
                                modal: "deposit"
                            }), Object(T.c)("deposit_button_clicked")
                        }, o.onWithdraw = function () {
                            o.setState({
                                modal: "withdraw"
                            }), Object(T.c)("withdraw_button_clicked")
                        }, Et(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), At(t, [{
                        key: "componentDidMount",
                        value: function () {
                            x.a.refreshAccounts()
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.orderFormStore.side,
                                r = e.positionStore,
                                o = r.hasPosition,
                                n = r.buyingPower,
                                i = r.sellingPower,
                                a = X.a.quoteAccount,
                                l = X.a.baseAccount,
                                s = X.a.stale,
                                c = _.a.user,
                                u = m.a.product,
                                d = m.a.profile.margin_enabled,
                                f = this.state.modal,
                                p = void 0;
                            return d && (p = "buy" === t ? n : i), Tt("div", {
                                className: zt("container")
                            }, void 0, d ? Tt("div", {
                                className: zt("purchasing-power")
                            }, void 0, Tt("div", {
                                className: zt("header")
                            }, void 0, "buy" === t ? "BUYING" : "SELLING", " POWER â‰ˆ"), p ? Tt(yt.a, {
                                message: "Prefill all",
                                orientation: "middle left"
                            }, void 0, Tt(mt.a, {
                                roundingMode: 0,
                                className: zt("value"),
                                value: p,
                                unit: "buy" === t ? u.quote.id : u.base.id,
                                precision: "buy" === t ? u.quote.precision : u.base.precision,
                                onClick: this.onSelectPurchasingPower
                            })) : Tt("div", {
                                className: zt("value")
                            }, void 0, "N/A")) : null, Tt("div", {
                                className: zt("header")
                            }, void 0, "BALANCE"), Tt("div", {
                                className: zt("accounts")
                            }, void 0, Tt("div", {
                                className: zt("currencies")
                            }, void 0, Tt("div", {}, void 0, u.quote.id), Tt("div", {
                                className: zt("spacer")
                            }), Tt("div", {}, void 0, u.base.id)), s ? Tt("div", {
                                className: zt("spinner")
                            }) : Tt("div", {
                                className: zt("balances")
                            }, void 0, Tt(yt.a, {
                                message: "Prefill all",
                                orientation: "middle left"
                            }, void 0, Tt(mt.a, {
                                roundingMode: 0,
                                value: a ? a.available : 0,
                                className: zt("term-description"),
                                onClick: this.onSelectQuoteCurrency,
                                precision: u.quote.precision
                            })), Tt("div", {
                                className: zt("spacer")
                            }), Tt(yt.a, {
                                message: "Prefill all",
                                orientation: "middle left"
                            }, void 0, Tt(mt.a, {
                                roundingMode: 0,
                                value: l ? l.available : 0,
                                className: zt("term-description"),
                                onClick: this.onSelectBaseCurrency,
                                precision: u.base.precision
                            })))), Tt("div", {
                                className: zt("buttons", {
                                    marker: "transfer_marker" === f
                                })
                            }, void 0, Tt("div", {
                                className: zt("button", "deposit"),
                                onClick: this.onDeposit
                            }, void 0, "DEPOSIT"), Tt("div", {
                                className: zt("button", "withdraw", {
                                    disabled: o
                                }),
                                onClick: this.onWithdraw
                            }, void 0, "WITHDRAW")), c && !c.terms_accepted ? Tt(St, {
                                onClose: this.closeLegalModal
                            }) : "withdraw" === f || "deposit" === f ? Tt(gt.a, {
                                type: f,
                                onClose: this.hideModal
                            }) : null)
                        }
                    }]), t
                }(),
                Nt = Object(ue.b)("orderFormStore", "positionStore")(Object(ue.c)(Mt)),
                Bt = r(85),
                Rt = r(1127),
                Dt = r(109),
                Ft = r.n(Dt),
                Wt = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Lt = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                It = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var qt = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["PureComponent"]), It(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.step,
                                r = e.color,
                                o = e.children,
                                n = function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["step", "color", "children"]);
                            return b.createElement($t, Wt({
                                step: t,
                                color: r
                            }, n), "available" === t ? o : "loading" === t ? Lt(Rt.a, {
                                height: 21,
                                opacity: 1
                            }) : "success" === t ? "âœ“ Success!" : "âš  Error")
                        }
                    }]), t
                }(),
                $t = ve.c.button.attrs({
                    type: "submit",
                    disabled: function (e) {
                        return "loading" === e.step
                    }
                })(["width:100%;height:44px;margin:0 auto;padding:13px 5px;border-radius:3px;font-size:13px;font-weight:bold;text-align:center;text-transform:uppercase;color:#fff;background-color:", ";cursor:pointer;transition:background-color 0.3s ease,color 0.5s ease;", ";"], function (e) {
                    var t = e.step,
                        r = e.color;
                    switch (t) {
                    case "available":
                        return "green" === r ? Ft.a.greenBgColor : Ft.a.redBgColor;
                    case "loading":
                        return Object(Bt.b)(Ft.a.greenBgColor);
                    case "success":
                        return Object(Bt.c)(.2, Ft.a.greenBgColor);
                    case "failure":
                        return Object(Bt.c)(.2, Ft.a.redBgColor);
                    default:
                        throw new Error("Unknown step")
                    }
                }, function (e) {
                    var t = e.step,
                        r = e.color;
                    if ("available" === t) return Object(ve.b)([":hover{background-color:", ";}"], "green" === r ? Object(Bt.a)(.05, Ft.a.greenBgColor) : Object(Bt.a)(.05, Ft.a.redBgColor));
                    return ""
                });
            var Ht = r(1152),
                Ut = r.n(Ht),
                Gt = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Yt = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Vt(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Zt = me.a.bind(Ut.a),
                Xt = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Vt(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.setAmount = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setAmount(r)
                        }, Vt(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Yt(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props.orderFormStore,
                                t = m.a.product,
                                r = e._amount,
                                o = e.side;
                            return t ? Gt("div", {
                                className: Zt("market-order")
                            }, void 0, Gt("div", {
                                className: Zt("section")
                            }, void 0, Gt("div", {
                                className: Zt("section-header")
                            }, void 0, "Amount"), Gt("div", {
                                className: Zt("input-box")
                            }, void 0, Gt("input", {
                                type: "number",
                                min: 0,
                                step: "sell" === o ? Math.pow(10, -t.base.precision) : Math.pow(10, -t.quote.precision),
                                name: "amount",
                                onChange: this.setAmount,
                                placeholder: "0.00",
                                value: r,
                                autoComplete: "off"
                            }), Gt("span", {}, void 0, "sell" === o ? t.base.id : t.quote.id)))) : null
                        }
                    }]), t
                }(),
                Kt = Object(ue.b)("orderFormStore")(Object(ue.c)(Xt)),
                Qt = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Jt = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function er(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var tr = me.a.bind(Ut.a),
                rr = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = er(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.setAmount = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setAmount(r)
                        }, o.setPrice = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setPrice(r)
                        }, o.changeTimeInForce = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setTimeInForce(r)
                        }, o.changeCancelAfter = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setCancelAfter(r)
                        }, o.setPostOnly = function (e) {
                            var t = o.props.orderFormStore;
                            e && t.postOnlyDisabled || t.setPostOnly(e)
                        }, o.setPostOnlyFalse = o.setPostOnly.bind(o, !1), o.setPostOnlyTrue = o.setPostOnly.bind(o, !0), o.toggleAdvanced = function () {
                            o.props.orderFormStore.toggleAdvanced()
                        }, o.trackLearnMoreLink = function () {
                            var e = o.props.orderFormStore,
                                t = void 0;
                            t = e.post_only ? "post_only" : "allow_taker", e.track("limit_order_execution_learn_more_clicked", {
                                execution_type: t
                            })
                        }, er(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Jt(t, [{
                        key: "render",
                        value: function () {
                            var e = m.a.product;
                            if (!e) return null;
                            var t = this.props.orderFormStore,
                                r = t._amount,
                                o = t._price,
                                n = t.show_advanced,
                                i = t.time_in_force,
                                a = t.post_only,
                                l = t.cancel_after,
                                s = t.postOnlyDisabled;
                            return Qt("div", {
                                className: tr("limit-order")
                            }, void 0, Qt("div", {
                                className: tr("section")
                            }, void 0, Qt("div", {
                                className: tr("section-header")
                            }, void 0, "Amount"), Qt("div", {
                                className: tr("input-box")
                            }, void 0, Qt("input", {
                                type: "number",
                                name: "amount",
                                min: 0,
                                step: Math.pow(10, -e.base.precision),
                                onChange: this.setAmount,
                                placeholder: "0.00",
                                value: r,
                                autoComplete: "off"
                            }), Qt("span", {}, void 0, e.base.id))), Qt("div", {
                                className: tr("section")
                            }, void 0, Qt("div", {
                                className: tr("section-header")
                            }, void 0, "Limit Price"), Qt("div", {
                                className: tr("input-box")
                            }, void 0, Qt("input", {
                                type: "number",
                                min: 0,
                                step: Math.pow(10, -e.quote.precision),
                                onChange: this.setPrice,
                                placeholder: "0.00",
                                value: o,
                                autoComplete: "off"
                            }), Qt("span", {}, void 0, e.quote.id))), Qt("div", {
                                className: tr("section")
                            }, void 0, Qt("div", {
                                className: tr("section-header")
                            }, void 0, "Execution"), Qt("div", {
                                className: tr("toggle", "small")
                            }, void 0, Qt("div", {
                                className: tr("toggle-tab", {
                                    active: a,
                                    disabled: s
                                }),
                                onClick: this.setPostOnlyTrue
                            }, void 0, "Post Only"), Qt("div", {
                                className: tr("toggle-tab", {
                                    active: !a
                                }),
                                onClick: this.setPostOnlyFalse
                            }, void 0, "Allow Taker")), Qt("div", {
                                className: tr("note")
                            }, void 0, a ? "Your order will only execute as a maker order." : "Your order may execute as a maker order or taker order.", " ", Qt(ze.a, {
                                href: "https://support.gdax.com/customer/portal/articles/2426596",
                                style: {
                                    color: "#ced2d5",
                                    textDecoration: "underline"
                                },
                                onClick: this.trackLearnMoreLink
                            }, void 0, "Learn more"))), Qt("div", {
                                className: tr("advanced-section", {
                                    show: n
                                })
                            }, void 0, Qt("div", {
                                className: tr("header")
                            }, void 0, Qt("div", {
                                onClick: this.toggleAdvanced
                            }, void 0, Qt("span", {}), "Advanced"), Qt("div", {
                                className: tr("spacer")
                            })), Qt("div", {
                                className: tr("advanced-content")
                            }, void 0, Qt("div", {
                                className: tr("section")
                            }, void 0, Qt("div", {
                                className: tr("section-header")
                            }, void 0, "Time in Force Policy"), Qt("select", {
                                onChange: this.changeTimeInForce,
                                value: i
                            }, void 0, Qt("option", {
                                value: "GTC"
                            }, void 0, "Good Til Cancelled"), Qt("option", {
                                value: "GTT"
                            }, void 0, "Good Till Time"), Qt("option", {
                                value: "IOC"
                            }, void 0, "Immediate or Cancel"), Qt("option", {
                                value: "FOK"
                            }, void 0, "Fill or Kill"))), "GTT" === i ? Qt("div", {
                                className: tr("section")
                            }, void 0, Qt("div", {
                                className: tr("section-header")
                            }, void 0, "Cancel After"), Qt("select", {
                                onChange: this.changeCancelAfter,
                                value: l
                            }, void 0, Qt("option", {
                                value: "min"
                            }, void 0, "One Minute"), Qt("option", {
                                value: "hour"
                            }, void 0, "One Hour"), Qt("option", {
                                value: "day"
                            }, void 0, "One Day"))) : null)))
                        }
                    }]), t
                }(),
                or = Object(ue.b)("orderFormStore")(Object(ue.c)(rr)),
                nr = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                ir = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function ar(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var lr = me.a.bind(Ut.a),
                sr = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = ar(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.setAmount = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setAmount(r)
                        }, o.setStopPrice = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setStopPrice(r)
                        }, o.setLimitPrice = function (e) {
                            var t = o.props.orderFormStore,
                                r = e.target.value;
                            t.setPrice(r)
                        }, o.toggleAdvanced = function () {
                            o.props.orderFormStore.toggleAdvanced()
                        }, ar(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ir(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props.orderFormStore,
                                t = m.a.product,
                                r = e._amount,
                                o = e.side,
                                n = e._price,
                                i = e.stop_price,
                                a = e.show_advanced;
                            return t ? nr("div", {
                                className: lr("stop-order")
                            }, void 0, nr("div", {
                                className: lr("section")
                            }, void 0, nr("div", {
                                className: lr("section-header")
                            }, void 0, "Amount"), nr("div", {
                                className: lr("input-box")
                            }, void 0, nr("input", {
                                type: "number",
                                min: 0,
                                step: "sell" === o ? Math.pow(10, -t.base.precision) : Math.pow(10, -t.quote.precision),
                                name: "amount",
                                onChange: this.setAmount,
                                placeholder: "0.00",
                                value: r,
                                autoComplete: "off"
                            }), nr("span", {}, void 0, "sell" === o ? t.base.id : t.quote.id))), nr("div", {
                                className: lr("section")
                            }, void 0, nr("div", {
                                className: lr("section-header")
                            }, void 0, "Stop Price"), nr("div", {
                                className: lr("input-box")
                            }, void 0, nr("input", {
                                type: "number",
                                min: 0,
                                step: Math.pow(10, -t.quote.precision),
                                onChange: this.setStopPrice,
                                placeholder: "0.00",
                                value: i,
                                autoComplete: "off"
                            }), nr("span", {}, void 0, t.quote.id))), nr("div", {
                                className: lr("advanced-section", {
                                    show: a
                                })
                            }, void 0, nr("div", {
                                className: lr("header")
                            }, void 0, nr("div", {
                                onClick: this.toggleAdvanced
                            }, void 0, nr("span", {}), "Advanced")), nr("div", {
                                className: lr("advanced-content")
                            }, void 0, nr("div", {
                                className: lr("section")
                            }, void 0, nr("div", {
                                className: lr("section-header")
                            }, void 0, "Limit Price"), nr("div", {
                                className: lr("input-box")
                            }, void 0, nr("input", {
                                type: "number",
                                min: 0,
                                step: Math.pow(10, -t.quote.precision),
                                onChange: this.setLimitPrice,
                                placeholder: "0.00",
                                value: n,
                                autoComplete: "off"
                            }), nr("span", {}, void 0, t.quote.id)))))) : null
                        }
                    }]), t
                }(),
                cr = Object(ue.b)("orderFormStore")(Object(ue.c)(sr)),
                ur = r(1297),
                dr = r.n(ur),
                fr = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                pr = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function hr(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var br = me.a.bind(dr.a),
                vr = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = hr(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.keyPressed = function (e) {
                            var t = o.props.onSubmit;
                            13 === e.keyCode && t()
                        }, hr(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["PureComponent"]), pr(t, [{
                        key: "UNSAFE_componentWillMount",
                        value: function () {
                            window.addEventListener("keypress", this.keyPressed)
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            window.removeEventListener("keypress", this.keyPressed)
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.onClose,
                                r = e.onSubmit;
                            return fr(Ee.a, {
                                onClose: t,
                                contentLabel: "OrderConfirmationModal",
                                title: this.title
                            }, void 0, fr("div", {
                                className: br("content")
                            }, void 0, this.content, fr("div", {
                                className: br("buttons")
                            }, void 0, fr("div", {
                                className: br("button", "cancel"),
                                onClick: t
                            }, void 0, "Cancel"), fr("div", {
                                className: br("button"),
                                onClick: r
                            }, void 0, "Place Order"))))
                        }
                    }, {
                        key: "title",
                        get: function () {
                            return "slippage" === this.props.type ? "SLIPPAGE WARNING" : "WARNING"
                        }
                    }, {
                        key: "content",
                        get: function () {
                            var e = this.props.type;
                            return "slippage" === e ? fr("div", {}, void 0, "Placing this order will result in greater than 2% slippage. Are you sure you would like to continue?") : "stop" === e ? fr("div", {}, void 0, "This order may fill at a price less favorable than the stop price. Are you sure you would like to continue?") : "stop-limit" === e ? fr("div", {}, void 0, "This order may not fill immediately when executed. Are you sure you would like to continue?") : void 0
                        }
                    }]), t
                }(),
                yr = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                mr = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function gr(e) {
                return function () {
                    var t = e.apply(this, arguments);
                    return new Promise(function (e, r) {
                        return function o(n, i) {
                            try {
                                var a = t[n](i),
                                    l = a.value
                            } catch (e) {
                                return void r(e)
                            }
                            if (!a.done) return Promise.resolve(l).then(function (e) {
                                o("next", e)
                            }, function (e) {
                                o("throw", e)
                            });
                            e(l)
                        }("next")
                    })
                }
            }

            function wr(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var _r = me.a.bind(Ut.a),
                Or = function (e) {
                    function t() {
                        var e, r, o, n, i = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var a = arguments.length, l = Array(a), s = 0; s < a; s++) l[s] = arguments[s];
                        return r = o = wr(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))), o.state = {
                            step: "available",
                            error: null,
                            modal: ""
                        }, o.setError = function (e) {
                            o.setState({
                                error: e instanceof Error ? e.message : e,
                                step: "failure"
                            }), setTimeout(function () {
                                return o.setState({
                                    step: "available"
                                })
                            }, 1500)
                        }, o.clearError = function () {
                            o.setState({
                                error: ""
                            })
                        }, o.switchType = function (e) {
                            o.props.orderFormStore.setType(e)
                        }, o.switchTypeMarket = o.switchType.bind(o, "market"), o.switchTypeLimit = o.switchType.bind(o, "limit"), o.switchTypeStop = o.switchType.bind(o, "stop"), o.switchSide = function (e) {
                            o.props.orderFormStore.setSide(e)
                        }, o.switchSideBuy = o.switchSide.bind(o, "buy"), o.switchSideSell = o.switchSide.bind(o, "sell"), o.onSubmitOrder = (n = gr(regeneratorRuntime.mark(function e(t) {
                            var r, n;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t.preventDefault(), r = o.props.orderFormStore, n = _.a.user, "available" === o.state.step && n) {
                                        e.next = 5;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 5:
                                    return e.prev = 5, e.next = 8, r.validateOrder();
                                case 8:
                                    e.next = 13;
                                    break;
                                case 10:
                                    return e.prev = 10, e.t0 = e.catch(5), e.abrupt("return", o.setError(e.t0));
                                case 13:
                                    if ("market" !== r.type) {
                                        e.next = 22;
                                        break
                                    }
                                    return e.prev = 14, e.next = 17, r.validateSlippage();
                                case 17:
                                    e.next = 22;
                                    break;
                                case 19:
                                    return e.prev = 19, e.t1 = e.catch(14), e.abrupt("return", o.setState({
                                        modal: "slippage"
                                    }));
                                case 22:
                                    if ("stop" !== r.type) {
                                        e.next = 26;
                                        break
                                    }
                                    if (!r.show_advanced || !r.price) {
                                        e.next = 25;
                                        break
                                    }
                                    return e.abrupt("return", o.setState({
                                        modal: "stop-limit"
                                    }));
                                case 25:
                                    return e.abrupt("return", o.setState({
                                        modal: "stop"
                                    }));
                                case 26:
                                    o.placeOrder();
                                case 27:
                                case "end":
                                    return e.stop()
                                }
                            }, e, i, [
                                [5, 10],
                                [14, 19]
                            ])
                        })), function (e) {
                            return n.apply(this, arguments)
                        }), o.placeOrder = gr(regeneratorRuntime.mark(function e() {
                            var t, r;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t = o.props.orderFormStore, r = _.a.user, "available" === o.state.step && r) {
                                        e.next = 4;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 4:
                                    return o.setState({
                                        step: "loading"
                                    }), o.clearError(), e.prev = 6, e.next = 9, t.submit();
                                case 9:
                                    o.setState({
                                        step: "success"
                                    }), setTimeout(function () {
                                        return o.setState({
                                            step: "available"
                                        })
                                    }, 1500), e.next = 16;
                                    break;
                                case 13:
                                    e.prev = 13, e.t0 = e.catch(6), o.setError(e.t0);
                                case 16:
                                case "end":
                                    return e.stop()
                                }
                            }, e, i, [
                                [6, 13]
                            ])
                        })), o.onModalClose = function () {
                            o.setState({
                                modal: ""
                            })
                        }, o.onModalSubmit = function () {
                            o.setState({
                                modal: ""
                            }), o.placeOrder()
                        }, wr(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), mr(t, [{
                        key: "render",
                        value: function () {
                            var e = this.state,
                                t = e.error,
                                r = e.step,
                                o = e.modal,
                                n = this.props.orderFormStore,
                                i = n.type,
                                a = n.side;
                            return m.a.product ? yr("div", {
                                className: _r("order-form")
                            }, void 0, yr("form", {
                                className: _r("form"),
                                onSubmit: this.onSubmitOrder
                            }, void 0, yr("ul", {
                                className: _r("trade-type")
                            }, void 0, yr("li", {
                                className: _r("trade-type-tab", {
                                    active: "market" === i
                                }),
                                onClick: this.switchTypeMarket
                            }, void 0, "MARKET"), yr("li", {
                                className: _r("trade-type-tab", {
                                    active: "limit" === i
                                }),
                                onClick: this.switchTypeLimit
                            }, void 0, "LIMIT"), yr("li", {
                                className: _r("trade-type-tab", {
                                    active: "stop" === i
                                }),
                                onClick: this.switchTypeStop
                            }, void 0, "STOP")), yr("ul", {
                                className: _r("toggle")
                            }, void 0, yr("li", {
                                className: _r("toggle-tab", "buy", {
                                    active: "buy" === a
                                }),
                                onClick: this.switchSideBuy
                            }, void 0, "BUY"), yr("li", {
                                className: _r("toggle-tab", "sell", {
                                    active: "sell" === a
                                }),
                                onClick: this.switchSideSell
                            }, void 0, "SELL")), this.orderForm, this.estimations, yr(qt, {
                                step: r,
                                color: "buy" === a ? "green" : "red"
                            }, void 0, "Place ", a, " order"), yr("div", {
                                className: _r("error", {
                                    show: t
                                })
                            }, void 0, yr("span", {
                                onClick: this.clearError
                            }), yr("div", {}, void 0, t))), o ? yr(vr, {
                                type: o,
                                onClose: this.onModalClose,
                                onSubmit: this.onModalSubmit
                            }) : null) : null
                        }
                    }, {
                        key: "orderForm",
                        get: function () {
                            var e = this.props.orderFormStore.type;
                            return "market" === e ? yr(Kt, {}) : "limit" === e ? yr(or, {}) : "stop" === e ? yr(cr, {}) : void 0
                        }
                    }, {
                        key: "estimations",
                        get: function () {
                            var e = this.props.orderFormStore,
                                t = e.type,
                                r = e.side,
                                o = e.total,
                                n = e.feeEstimation,
                                i = m.a.product;
                            return yr("div", {
                                className: _r("estimations")
                            }, void 0, yr("div", {
                                className: _r("feeDescription")
                            }, void 0, yr("div", {}, void 0, yr("b", {}, void 0, "Fee"), " ", yr("span", {
                                className: _r("currency")
                            }, void 0, "(", i.quote.id, ")"), " ", yr("b", {}, void 0, "â‰ˆ")), yr("div", {
                                className: _r("fee")
                            }, void 0, n ? yr(mt.a, {
                                value: n,
                                currency: i.quote
                            }) : "N/A")), yr("div", {
                                className: _r("orderTotal")
                            }, void 0, yr("div", {}, void 0, yr("b", {}, void 0, "Total"), " ", yr("span", {
                                className: _r("currency")
                            }, void 0, "(", "buy" === r && "limit" !== t ? i.base.id : i.quote.id, ")"), " ", yr("b", {}, void 0, "â‰ˆ")), yr("div", {
                                className: _r("total")
                            }, void 0, o ? yr(mt.a, {
                                value: o,
                                currency: "buy" === r && "limit" !== t ? i.base : i.quote
                            }) : "N/A")))
                        }
                    }]), t
                }(),
                xr = Object(ue.b)("orderFormStore")(Object(ue.c)(Or)),
                kr = r(1295),
                Cr = r.n(kr),
                Sr = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Pr = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var jr, Tr, Ar = me.a.bind(Cr.a),
                Er = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["PureComponent"]), Pr(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.type,
                                r = e.impact,
                                o = e.children;
                            return Sr("article", {
                                className: Ar("account-messages", t, r)
                            }, void 0, Sr("div", {
                                className: Ar("header")
                            }, void 0, Sr("div", {
                                className: Ar("icon")
                            })), o)
                        }
                    }]), t
                }(),
                zr = function (e) {
                    var t = e.post_only,
                        r = e.message;
                    if (!r && !t) return null;
                    var o = t && Sr("p", {}, void 0, "Trading is currently in post-only mode for this product, so any orders placed on the books will not be matched.");
                    return Sr(Er, {
                        type: "status"
                    }, void 0, {}[r] || o || null)
                },
                Mr = function (e) {
                    var t = e.margin_product_id,
                        r = e.unavailable_currency;
                    return Sr(Er, {
                        type: "margin-active"
                    }, void 0, Sr("p", {}, void 0, "Margin active on", " ", Sr(Ae.a, {
                        to: "/trade/" + t
                    }, void 0, t), "."), r ? Sr("p", {}, void 0, "Disable margin to access ", r || "", ".") : null)
                },
                Nr = function () {
                    return Sr(Er, {
                        type: "error"
                    }, void 0, Sr("h4", {}, void 0, "RESTRICTED ACCESS"), Sr("p", {}, void 0, "Deposits and order placement are disabled on your account."), Sr(Ae.a, {
                        to: "/signup"
                    }, void 0, "Complete your account"))
                },
                Br = function (e) {
                    var t = e.productName;
                    return Sr(Er, {
                        type: "demo"
                    }, void 0, Sr("h3", {}, void 0, "View Only"), Sr("p", {}, void 0, t, " trading is not yet available in your region."))
                },
                Rr = r(1293),
                Dr = r.n(Rr),
                Fr = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Wr = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var Lr, Ir = me.a.bind(Dr.a),
                qr = (Tr = jr = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["PureComponent"]), Wr(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.title,
                                r = e.tab,
                                o = e.tabs,
                                n = e.tabsClassName,
                                i = e.children;
                            if (t) return Fr("div", {
                                className: Ir("panel-header")
                            }, void 0, Fr("div", {
                                className: Ir("title")
                            }, void 0, t), i);
                            if (!o) return null;
                            var a = o.find(function (e) {
                                return e.key === r
                            });
                            return a ? Fr("div", {
                                className: Ir("panel-header")
                            }, void 0, Fr("div", {
                                className: Ir("title-and-children")
                            }, void 0, Fr("div", {
                                className: Ir("title")
                            }, void 0, t || a.title), i), Fr("div", {
                                className: Ir("tabs") + " " + n
                            }, void 0, o ? o.map(function (e) {
                                return Fr($r, {
                                    tabObject: e,
                                    active: a === e
                                }, e.key)
                            }) : null)) : null
                        }
                    }]), t
                }(), jr.defaultProps = {
                    tabsClassName: ""
                }, Tr),
                $r = function (e) {
                    var t = e.tabObject,
                        r = e.active;
                    return Fr("div", {
                        className: Ir("tab", {
                            active: r
                        }),
                        onClick: t.onClick
                    }, void 0, t.name)
                },
                Hr = r(1291),
                Ur = r.n(Hr),
                Gr = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Yr = function () {
                    return function (e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function (e, t) {
                            var r = [],
                                o = !0,
                                n = !1,
                                i = void 0;
                            try {
                                for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !o && l.return && l.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                            return r
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                Vr = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Zr(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Xr, Kr, Qr, Jr, eo, to, ro, oo, no, io = me.a.bind(Ur.a),
                ao = Object(ue.c)(Lr = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Zr(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            loading: !1
                        }, o.setLoading = function (e) {
                            o.setState({
                                loading: e
                            })
                        }, Zr(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Vr(t, [{
                        key: "render",
                        value: function () {
                            var e = this.state.loading,
                                t = _.a.user,
                                r = m.a.profile,
                                o = m.a.product;
                            if (!o) return null;
                            var n = t && t.details && t.details.margin_product_id,
                                i = null;
                            if (n && n !== o.id) {
                                var a = n.split("-"),
                                    l = Yr(a, 2),
                                    s = l[0],
                                    c = l[1];
                                o.base.id === s && (i = s), o.quote.id === c && (i = c)
                            }
                            return Gr(Te.a, {
                                className: io("sidebar", {
                                    loading: e
                                })
                            }, void 0, r && r.margin_enabled ? Gr(nt, {
                                setLoading: this.setLoading
                            }) : Gr(qr, {
                                title: "ORDER FORM"
                            }), o.status_message && Gr(zr, {
                                message: o.status_message,
                                post_only: o.post_only
                            }), n && t && o.id !== t.details.margin_product_id && Gr(Mr, {
                                margin_product_id: t.details.margin_product_id,
                                unavailable_currency: i
                            }), t && o.accessible ? Gr("article", {}, void 0, Gr(Nt, {})) : null, !t || t.active_at ? null : Gr(Nr, {}), !t || o.accessible ? null : Gr(Br, {
                                productName: o.display_name
                            }), t ? null : Gr(Er, {
                                type: "demo"
                            }, void 0, Gr(pt, {})), Gr("article", {}, void 0, Gr(xr, {})))
                        }
                    }]), t
                }()) || Lr,
                lo = r(1289),
                so = r.n(lo),
                co = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                uo = me.a.bind(so.a),
                fo = Object(ue.c)(function () {
                    return Z.default.connected ? null : co("div", {
                        className: uo("connection-status")
                    }, void 0, co("span", {
                        className: uo("beacon")
                    }), co("strong", {}, void 0, "Realtime-Data offline"))
                }),
                po = r(1124),
                ho = r(132),
                bo = r.n(ho),
                vo = r(190),
                yo = r.n(vo),
                mo = r(315),
                go = r.n(mo),
                wo = function () {
                    return function (e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function (e, t) {
                            var r = [],
                                o = !0,
                                n = !1,
                                i = void 0;
                            try {
                                for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !o && l.return && l.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                            return r
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                _o = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Oo(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function xo(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var ko, Co, So, Po, jo, To, Ao = [1, 5, 10, 50, 100, 250, 500, 1e3],
                Eo = Ao.length - 1,
                zo = "orderbook-aggregation-level",
                Mo = (Xr = function () {
                    function e() {
                        var t = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), Oo(this, "aggregationIndex", Kr, this), Oo(this, "spread", Qr, this), Oo(this, "book", Jr, this), Oo(this, "boundingBox", eo, this), this.aggregationManager = new yo.a, this.onSnapshotMsg = function () {
                            t.initAggregationManager(), t.setSpread(), t.sendBookDebounced.clear(), t.sendBook()
                        }, this.onL2UpdateMsg = function (e) {
                            var r = t.hasAggregation,
                                o = t.aggregationManager;
                            if (r)
                                for (var n = e.changes, i = 0, a = n.length; i < a; i++) {
                                    var l = wo(n[i], 3),
                                        s = l[0],
                                        c = l[1],
                                        u = l[2],
                                        d = "buy" === s ? A.h.bids : A.h.asks,
                                        f = go()(d, s, P()(c)),
                                        p = wo(f, 2),
                                        h = p[0],
                                        b = void 0;
                                    if (p[1]) {
                                        var v = wo(d[h], 2)[1];
                                        b = P()(u).minus(v)
                                    } else b = P()(u);
                                    var y = t.bucket(s, c);
                                    o.update_level(s, y, b)
                                }
                            t.sendBookDebounced()
                        }, this.initAggregationManager = function () {
                            var e = A.h.asks,
                                r = A.h.bids;
                            if (t.hasAggregation) {
                                t.aggregationManager = new yo.a, t.aggregationManager.init([], []);
                                for (var o = 0, n = e.length; o < n; o++) {
                                    var i = wo(e[o], 2),
                                        a = i[0],
                                        l = i[1],
                                        s = t.bucket("sell", a);
                                    t.aggregationManager.update_level("sell", s, l)
                                }
                                for (var c = 0, u = r.length; c < u; c++) {
                                    var d = wo(r[c], 2),
                                        f = d[0],
                                        p = d[1],
                                        h = t.bucket("buy", f);
                                    t.aggregationManager.update_level("buy", h, p)
                                }
                            }
                        }, this.bucket = function (e, r) {
                            var o = t.aggregationValue;
                            return "sell" === e ? P()(r).div(o).round(0, 3).mul(o) : P()(r).div(o).round(0, 0).mul(o)
                        }, Oo(this, "increaseAggregation", to, this), Oo(this, "decreaseAggregation", ro, this), this.updateAggegation = function () {
                            t.initAggregationManager(), t.sendBook(), we.a.setItem(zo, Ao[t.aggregationIndex])
                        }, this.sendBookDebounced = bo()(function () {
                            return t.sendBook()
                        }, 50), Oo(this, "setBoundingBox", oo, this), Oo(this, "setSpread", no, this);
                        var r = Number(we.a.getItem(zo));
                        if (r) {
                            var o = Ao.findIndex(function (e) {
                                return e === r
                            });
                            o && (this.aggregationIndex = o)
                        }
                        this.initAggregationManager()
                    }
                    return _o(e, [{
                        key: "subscribe",
                        value: function () {
                            A.h.addSubscriber(this), this.sendBook()
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            A.h.removeSubscriber(this)
                        }
                    }, {
                        key: "sendBook",
                        value: function () {
                            var e = this.hasAggregation ? this.aggregationManager : A.h.manager;
                            if (e) {
                                var t = e.snapshot();
                                if (t) {
                                    var r = t.asks,
                                        o = t.bids;
                                    this.book = {
                                        asks: r.slice(0, 50),
                                        bids: o.slice(0, 50)
                                    }, this.setSpread()
                                }
                            }
                        }
                    }, {
                        key: "hasAggregation",
                        get: function () {
                            return 1 !== Ao[this.aggregationIndex]
                        }
                    }, {
                        key: "aggregationValue",
                        get: function () {
                            var e = m.a.product;
                            return e ? Math.pow(10, e.quote_increment.e) * Ao[this.aggregationIndex] : 1
                        }
                    }]), e
                }(), Kr = xo(Xr.prototype, "aggregationIndex", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), Qr = xo(Xr.prototype, "spread", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return P()(0)
                    }
                }), Jr = xo(Xr.prototype, "book", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return {
                            asks: [],
                            bids: []
                        }
                    }
                }), eo = xo(Xr.prototype, "boundingBox", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return {
                            asks: {
                                start: 0,
                                end: 0
                            },
                            bids: {
                                start: 0,
                                end: 0
                            }
                        }
                    }
                }), xo(Xr.prototype, "hasAggregation", [C.computed], Object.getOwnPropertyDescriptor(Xr.prototype, "hasAggregation"), Xr.prototype), xo(Xr.prototype, "aggregationValue", [C.computed], Object.getOwnPropertyDescriptor(Xr.prototype, "aggregationValue"), Xr.prototype), to = xo(Xr.prototype, "increaseAggregation", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.aggregationIndex >= Eo || (e.aggregationIndex += 1, e.updateAggegation())
                        }
                    }
                }), ro = xo(Xr.prototype, "decreaseAggregation", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.aggregationIndex <= 0 || (e.aggregationIndex -= 1, e.updateAggegation())
                        }
                    }
                }), xo(Xr.prototype, "sendBook", [C.action], Object.getOwnPropertyDescriptor(Xr.prototype, "sendBook"), Xr.prototype), oo = xo(Xr.prototype, "setBoundingBox", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            e.boundingBox = t
                        }
                    }
                }), no = xo(Xr.prototype, "setSpread", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            var t = A.h.bestBidPrice,
                                r = A.h.bestAskPrice;
                            e.spread = t && r ? P()(r).sub(t) : P()(0)
                        }
                    }
                }), Xr),
                No = r(1138),
                Bo = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Ro = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Do(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                    return r
                }
                return Array.from(e)
            }

            function Fo(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function Wo(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function Lo(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var Io = 16,
                qo = (ko = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Wo(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), Fo(o, "nodes", Co, o), Fo(o, "newTrades", So, o), o.trades = [], o.visible = o.fetch, Fo(o, "onMatchesMsg", Po, o), Fo(o, "clearNewTrades", jo, o), Fo(o, "renderAll", To, o), Wo(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, No["a"]), Ro(t, [{
                        key: "subscribe",
                        value: function () {
                            var e = this;
                            this.productDisposer = Object(C.observe)(m.a, "product", function () {
                                e.fetch()
                            }), Z.default.addSubscriber(this), m.a.product && this.fetch()
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            this.productDisposer && this.productDisposer(), Z.default.removeSubscriber(this)
                        }
                    }, {
                        key: "_fetch",
                        value: function () {
                            var e, t = (e = regeneratorRuntime.mark(function e() {
                                var t, r, o, n, i = this;
                                return regeneratorRuntime.wrap(function (e) {
                                    for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (t = m.a.product) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 3:
                                        return e.next = 5, t.trades();
                                    case 5:
                                        if (r = e.sent, o = r.body, t === m.a.product) {
                                            e.next = 9;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 9:
                                        return n = o.map(function (e) {
                                            return Bo({}, e, {
                                                id: e.trade_id
                                            })
                                        }), Object(C.runInAction)(function () {
                                            i.trades = n, i.nodes = o.map(function (e) {
                                                return {
                                                    trade: e,
                                                    render: !0,
                                                    dt: 500,
                                                    animation_time: 500,
                                                    y: 0
                                                }
                                            }), i.newTrades = i.nodes.length
                                        }), e.abrupt("return", n);
                                    case 12:
                                    case "end":
                                        return e.stop()
                                    }
                                }, e, this)
                            }), function () {
                                var t = e.apply(this, arguments);
                                return new Promise(function (e, r) {
                                    return function o(n, i) {
                                        try {
                                            var a = t[n](i),
                                                l = a.value
                                        } catch (e) {
                                            return void r(e)
                                        }
                                        if (!a.done) return Promise.resolve(l).then(function (e) {
                                            o("next", e)
                                        }, function (e) {
                                            o("throw", e)
                                        });
                                        e(l)
                                    }("next")
                                })
                            });
                            return function () {
                                return t.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "feedSubscriptions",
                        get: function () {
                            return Y.a.hidden || !m.a.product ? [] : [{
                                name: "matches",
                                product_ids: [m.a.product.id]
                            }]
                        }
                    }]), t
                }(), Co = Lo(ko.prototype, "nodes", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return []
                    }
                }), So = Lo(ko.prototype, "newTrades", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), Lo(ko.prototype, "feedSubscriptions", [C.computed], Object.getOwnPropertyDescriptor(ko.prototype, "feedSubscriptions"), ko.prototype), Lo(ko.prototype, "_fetch", [C.action], Object.getOwnPropertyDescriptor(ko.prototype, "_fetch"), ko.prototype), Po = Lo(ko.prototype, "onMatchesMsg", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            var r, o, n = t.batched,
                                i = n.map(function (e) {
                                    return {
                                        trade: e,
                                        render: !0,
                                        dt: 0,
                                        animation_time: 500,
                                        y: 0
                                    }
                                });
                            e.newTrades += i.length, (r = e.nodes).unshift.apply(r, Do(i)), (o = e.trades).unshift.apply(o, Do(n)), e.trades.length = 100
                        }
                    }
                }), jo = Lo(ko.prototype, "clearNewTrades", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.newTrades = 0
                        }
                    }
                }), To = Lo(ko.prototype, "renderAll", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            for (var t = 0, r = e.nodes.length; t < r; t++) {
                                e.nodes[t].render = !0
                            }
                        }
                    }
                }), ko),
                $o = document.createElement("canvas").getContext("2d");

            function Ho(e) {
                return Math.round(e) + .5
            }

            function Uo() {
                return $o ? (window.devicePixelRatio || 1) / ($o.backingStorePixelRatio || $o.webkitBackingStorePixelRatio || $o.mozBackingStorePixelRatio || $o.msBackingStorePixelRatio || $o.oBackingStorePixelRatio || 1) : 1
            }
            var Go, Yo, Vo, Zo, Xo, Ko, Qo = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Jo = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function en(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            }

            function tn(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function rn(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            }

            function on(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function nn(e, t) {
                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
            }

            function an(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var ln = new(Yo = an((Go = function e() {
                    nn(this, e), on(this, "pixelRatio", Yo, this), on(this, "update", Vo, this), Object(V.d)(this.update, 1e3)
                }).prototype, "pixelRatio", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return Uo()
                    }
                }), Vo = an(Go.prototype, "update", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.pixelRatio = Uo()
                        }
                    }
                }), Go),
                sn = function (e) {
                    function t() {
                        var e, r, o;
                        nn(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = tn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            width: 0,
                            height: 0
                        }, o.resize = function () {
                            o.timeout && clearTimeout(o.timeout), o.timeout = setTimeout(o.setSize, 50)
                        }, o.setSize = function () {
                            var e = o.props.onSize;
                            if (o.element) {
                                o.timeout = null;
                                var t = o.element.getBoundingClientRect(),
                                    r = t.width,
                                    n = t.height;
                                o.setState({
                                    width: r,
                                    height: n
                                }), e && e(r, n)
                            }
                        }, o.onElement = function (e) {
                            o.element = e, e && o.resize()
                        }, tn(o, r)
                    }
                    return rn(t, b["PureComponent"]), Jo(t, [{
                        key: "componentDidMount",
                        value: function () {
                            window.addEventListener("resize", this.resize), this.disposer = Object(C.observe)(ln, "pixelRatio", this.resize)
                        }
                    }, {
                        key: "UNSAFE_componentWillReceiveProps",
                        value: function () {
                            var e = this.state,
                                t = e.height,
                                r = e.width;
                            t && r || this.resize()
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            window.removeEventListener("resize", this.resize), this.disposer && this.disposer()
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.children,
                                r = e.className,
                                o = this.state,
                                n = o.width,
                                i = o.height;
                            return b.createElement("div", {
                                ref: this.onElement,
                                style: {
                                    display: "flex",
                                    position: "relative",
                                    flex: 1,
                                    overflow: "hidden"
                                },
                                className: r
                            }, b.Children.map(t, function (e) {
                                return e && b.cloneElement(e, {
                                    width: n,
                                    height: i
                                })
                            }))
                        }
                    }]), t
                }(),
                cn = function (e) {
                    var t = e.top,
                        r = e.right,
                        o = e.bottom,
                        n = e.left,
                        i = e.width,
                        a = e.height,
                        l = e.children,
                        s = e.style,
                        c = void 0 === s ? {} : s,
                        u = en(e, ["top", "right", "bottom", "left", "width", "height", "children", "style"]);
                    return b.createElement("div", Qo({}, u, {
                        style: Qo({
                            position: "absolute",
                            top: t && t < 0 ? (a || 0) + t : t,
                            right: r && r < 0 ? (i || 0) + r : r,
                            bottom: o && o < 0 ? (a || 0) + o : o,
                            left: n && n < 0 ? (i || 0) + n : n
                        }, c)
                    }), l)
                };
            var un = Object(ue.c)((Ko = Xo = function (e) {
                    function t() {
                        var e, r, o;
                        nn(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = tn(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.dt = 0, o.lastTick = 0, o._draw = function () {
                            var e = o.props,
                                t = e.fps,
                                r = e.draw,
                                n = e.buffer,
                                i = Date.now(),
                                a = o.lastTick ? i - o.lastTick : 0;
                            if (o.lastTick = i, o.dt += a, t && o.dt < 1e3 / t) return o.frame = Object(V.c)(o._draw);
                            var l = o.ctx;
                            if (l && (!n || o.buffer)) {
                                var s = o,
                                    c = s.canvasWidth,
                                    u = s.canvasHeight;
                                if (c && u) {
                                    var d, f, p, h = ln.pixelRatio;
                                    t ? (l.setTransform(h, 0, 0, h, 0, 0), r(l, o.canvasWidth, o.canvasHeight, o.dt, o.buffer), o.frame = Object(V.c)(o._draw), o.dt = 0) : (o.disposeDrawer && o.disposeDrawer(), o.disposeDrawer = (d = function () {
                                        l.setTransform(h, 0, 0, h, 0, 0), r(l, o.canvasWidth, o.canvasHeight, o.dt, o.buffer)
                                    }, f = !1, (p = new C.Reaction("autorunAnimFrame", function () {
                                        f || (f = !0, Object(V.c)(function () {
                                            f = !1, p.isDisposed || p.track(d)
                                        }))
                                    })).schedule(), p.getDisposer()))
                                }
                            }
                        }, o.onCanvas = function (e) {
                            e && (o.ctx = e.getContext("2d"), o.ctx && o.requestFrame())
                        }, o.onBufferCanvas = function (e) {
                            e && (o.buffer = e.getContext("2d"))
                        }, tn(o, r)
                    }
                    return rn(t, b["Component"]), Jo(t, [{
                        key: "componentWillUnmount",
                        value: function () {
                            this.frame && Object(V.a)(this.frame), this.disposeDrawer && this.disposeDrawer()
                        }
                    }, {
                        key: "requestFrame",
                        value: function () {
                            this.frame && Object(V.a)(this.frame), this.dt = 0, this.frame = Object(V.c)(this._draw)
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.canvasWidth,
                                t = this.canvasHeight;
                            this.requestFrame();
                            var r = this.props,
                                o = (r.draw, r.buffer),
                                n = en(r, ["draw", "buffer"]),
                                i = ln.pixelRatio;
                            return b.createElement(cn, n, b.createElement("canvas", {
                                ref: this.onCanvas,
                                width: e * i,
                                height: t * i,
                                style: {
                                    width: e,
                                    height: t
                                }
                            }), o ? b.createElement("canvas", {
                                ref: this.onBufferCanvas,
                                width: e * i,
                                height: t * i,
                                style: {
                                    display: "none",
                                    width: e,
                                    height: t
                                }
                            }) : null)
                        }
                    }, {
                        key: "canvasWidth",
                        get: function () {
                            var e = this.props,
                                t = e.width,
                                r = void 0 === t ? 0 : t,
                                o = e.left,
                                n = void 0 === o ? 0 : o,
                                i = e.right,
                                a = void 0 === i ? 0 : i;
                            return r ? n < 0 ? a < 0 ? Math.max(r + n + a, 0) : -n - a : a < 0 ? -a - n : r - n - a : 0
                        }
                    }, {
                        key: "canvasHeight",
                        get: function () {
                            var e = this.props,
                                t = e.height,
                                r = void 0 === t ? 0 : t,
                                o = e.top,
                                n = void 0 === o ? 0 : o,
                                i = e.bottom,
                                a = void 0 === i ? 0 : i;
                            return r ? n < 0 ? a < 0 ? Math.max(r + n + a, 0) : -n - a : a < 0 ? -a - n : r - n - a : 0
                        }
                    }]), t
                }(), Xo.defaultProps = {
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    width: 0,
                    height: 0
                }, Zo = Ko)) || Zo,
                dn = r(11),
                fn = r.n(dn),
                pn = r(1287),
                hn = r.n(pn),
                bn = r(1286),
                vn = r.n(bn),
                yn = r(1141),
                mn = r(1285),
                gn = r.n(mn),
                wn = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                _n = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function On(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var xn = new Image,
                kn = new Image;
            xn.src = hn.a, kn.src = vn.a;
            var Cn = {},
                
                Sn = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, 
                            i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = On(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.height = 0, o.width = 0, o.textYOffset = Math.round(Io / 2), o.draw = function (e, t, r, n, i) {
                            var a = o.props.tradeHistoryStore,
                                l = a.newTrades,
                                s = a.nodes,
                                c = a.clearNewTrades;
                            if (!i) throw new Error("buffer ctx is required");
                            var u = Uo(),
                                d = Math.round(t * u),
                                f = Math.round(r * u);
                            o.ctx = e, o.width = t, o.height = r, l && (o.ctx.globalAlpha = 1, e.clearRect(0, 0, t, r), e.imageSmoothingEnabled = !1, o.ctx.drawImage(i.canvas, 0, 0, d, f, 0, l * Io, o.width, o.height));
                            for (var p = 0, h = s.length; p < h; p++) {
                                var b = s[p];
                                if (!b.render) break;
                                b.y = p * Io, b.dt >= b.animation_time && (b.dt = b.animation_time, b.render = !1), o.ctx.clearRect(0, Io * p, o.width, Io), o.renderBG(b), o.ctx.globalAlpha = b.dt < 100 ? b.dt / 100 : 1, o.setTextStyles(!0), o.renderBar(b), o.renderSize(b), o.renderPrice(b), o.setTextStyles(!1), o.renderTime(b), b.dt += n
                            }
                            i.clearRect(0, 0, i.canvas.width, i.canvas.height), i.imageSmoothingEnabled = !1, i.drawImage(e.canvas, 0, 0, d, f, 0, 0, d, f), c()
                        }, On(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), _n(t, [{
                        key: "setTextStyles",
                        value: function (e) {
                            var t = this.ctx;
                            t && (t.font = (e ? "bold" : "normal") + " " + gn.a.fontSize + "px " + gn.a.fontFamily, t.textAlign = gn.a.textAlign, t.textBaseline = gn.a.textBaseline)
                        }
                    }, {
                        key: "renderBG",
                        value: function (e) {
                            var t = e.dt,
                                r = e.animation_time,
                                o = e.y,
                                n = e.trade.side;
                            if (!(t >= r)) {
                                var i = t / r,
                                    a = "sell" === n ? gn.a.buyBgColor1 : gn.a.sellBgColor1,
                                    l = "sell" === n ? gn.a.buyBgColor2 : gn.a.sellBgColor2;
                                i >= .6 && (a = l, l = "rgba(0,0,0,0)"), this.ctx.fillStyle = Object(Bt.d)(i, a, l), this.ctx.fillRect(0, o, this.width, Io)
                            }
                        }
                    }, {
                        key: "renderBar",
                        value: function (e) {
                            var t = m.a.product.maxBarSize,
                                r = e.trade,
                                o = r.side,
                                n = r.size,
                                i = e.y;
                            this.ctx.fillStyle = "sell" === o ? gn.a.buyBarColor : gn.a.sellBarColor;
                            var a = +gn.a.barColumnX / 100 * this.width * (Math.min(t, +n) / t);
                            this.ctx.fillRect(0, i, Math.max(a, 1), Io)
                        }
                    }, {
                        key: "renderSize",
                        value: function (e) {
                            var t = m.a.product,
                                r = e.trade.size,
                                o = e.y,
                                n = this.width * +gn.a.sizeColumnX / 100 - +gn.a.sizeColumnPadding,
                                i = P()(r).toFixed(t.base.precision);
                            this.ctx.fillStyle = gn.a.sizeColor, this.ctx.fillText(i, Math.round(n), Math.round(o + this.textYOffset))
                        }
                    }, {
                        key: "renderPrice",
                        value: function (e) {
                            var t = m.a.product,
                                r = e.trade,
                                o = r.side,
                                n = r.price,
                                i = e.y,
                                a = Object(yn.a)(+n, {
                                    formattedValue: P()(n).toFixed(t.price_precision)
                                }),
                                l = [gn.a.sellPriceColor1, gn.a.sellPriceColor2];
                            "sell" === o && (l = [gn.a.buyPriceColor1, gn.a.buyPriceColor2]);
                            var s = this.width * +gn.a.priceColumnX / 100 - +gn.a.priceColumnPadding,
                                c = "buy" === o ? xn : kn;
                            this.ctx.drawImage(c, s, Math.round(i + (Io - 8) / 2), 8, 8), this._renderMulticolorText(a, l, s - 3, i + this.textYOffset, !0)
                        }
                    }, {
                        key: "renderTime",
                        value: function (e) {
                            var t = e.trade.time,
                                r = e.y,
                                o = fn.a.utc(t).local().format("H:mm:ss"),
                                n = this.width - +gn.a.timeColumnPadding;
                            this.ctx.fillStyle = gn.a.timeColor, this.ctx.fillText(o, Math.round(n), Math.round(r + this.textYOffset))
                        }
                    }, {
                        key: "_renderMulticolorText",
                        value: function (e, t, r, o, n) {
                            for (var i = 0, a = e.length === t.length ? e : e.slice(0, t.length - 1).concat(e.slice(t.length - 1).join("")), l = this.ctx, s = 0, c = a.length; s < c; s++) {
                                var u = n ? c - s - 1 : s,
                                    d = a[u];
                                d && (l.fillStyle = t[u], l.fillText(d, Math.round(r - i), Math.round(o)), i += this._measureText(d))
                            }
                        }
                    }, {
                        key: "_measureText",
                        value: function (e) {
                            for (var t = 0, r = 0, o = e.length; r < o; r++) {
                                var n = e[r],
                                    i = Cn[n];
                                i || (i = this.ctx.measureText(n).width, Cn[n] = i), t += i
                            }
                            return t
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.tradeHistoryStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["tradeHistoryStore"]));
                            return b.createElement(un, wn({}, t, {
                                fps: ge.a.fps,
                                buffer: !0,
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                Pn = Object(ue.b)("tradeHistoryStore")(Object(ue.c)(Sn)),
                jn = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Tn = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function An(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var En = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = An(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.onSize = function () {
                            o.props.tradeHistoryStore.renderAll()
                        }, An(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Tn(t, [{
                        key: "render",
                        value: function () {
                            return jn(Te.a, {}, void 0, jn("div", {
                                style: {
                                    display: "flex",
                                    flex: 1,
                                    minHeight: 100 * Io
                                }
                            }, void 0, jn(sn, {
                                onSize: this.onSize
                            }, void 0, jn(Pn, {}))))
                        }
                    }]), t
                }(),
                zn = Object(ue.b)("tradeHistoryStore")(Object(ue.c)(En)),
                Mn = r(1283),
                Nn = r.n(Mn),
                Bn = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Rn = me.a.bind(Nn.a),
                Dn = Object(ue.b)("tradeHistoryStore")(Object(ue.c)(function (e) {
                    var t = e.tradeHistoryStore.loading,
                        r = m.a.product;
                    return r ? Bn("div", {
                        className: Rn("trade-history")
                    }, void 0, Bn("div", {
                        className: Rn("table-header")
                    }, void 0, Bn("span", {
                        className: Rn("column")
                    }, void 0, "Trade Size"), Bn("span", {
                        className: Rn("column", "price")
                    }, void 0, "Price (", r.quote.id, ")"), Bn("span", {
                        className: Rn("column", "time")
                    }, void 0, "Time")), t ? Bn("div", {
                        className: Rn("centered")
                    }, void 0, Bn(Rt.a, {})) : Bn(zn, {})) : null
                })),
                Fn = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Wn = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Ln(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var In, qn, $n = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Ln(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.tradeHistoryStore = new qo, Ln(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["PureComponent"]), Wn(t, [{
                        key: "render",
                        value: function () {
                            return Fn(y.a, {
                                tradeHistoryStore: this.tradeHistoryStore
                            }, void 0, Fn(Dn, {}))
                        }
                    }]), t
                }(),
                Hn = r(1153),
                Un = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Gn(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var Yn, Vn, Zn = (In = function () {
                    function e() {
                        var t, r, o, n, i = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), t = this, r = "_domain", n = this, (o = qn) && Object.defineProperty(t, r, {
                            enumerable: o.enumerable,
                            configurable: o.configurable,
                            writable: o.writable,
                            value: o.initializer ? o.initializer.call(n) : void 0
                        }), this.range = {
                            min: 0,
                            max: 0
                        }, this.isDate = !1, this.toRange = function (e) {
                            var t = e;
                            i.isDate && t instanceof Date && (t = t.getTime() - Hn.e);
                            var r = i.domain,
                                o = r.min,
                                n = r.max,
                                a = i.range,
                                l = a.min;
                            return l + (t - o) * (a.max - l) / (n - o)
                        }, this.toDomain = function (e) {
                            var t = i.domain,
                                r = t.min,
                                o = t.max,
                                n = i.range,
                                a = n.min,
                                l = n.max;
                            i.isDate && (r += Hn.e, o += Hn.e);
                            var s = r + (e - a) * (o - r) / (l - a);
                            return i.isDate ? new Date(s) : s
                        }
                    }
                    return Un(e, [{
                        key: "domain",
                        get: function () {
                            return this._domain
                        }, set: function (e) {
                            var t = e.min,
                                r = e.max;
                            t instanceof Date && r instanceof Date ? (this._domain = {
                                min: t.getTime() - Hn.e,
                                max: r.getTime() - Hn.e
                            }, this.isDate = !0) : this._domain = e
                        }
                    }, {
                        key: "delta",
                        get: function () {
                            var e = this.domain,
                                t = e.min;
                            return e.max - t
                        }
                    }]), e
                }(), qn = Gn(In.prototype, "_domain", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return {
                            min: 0,
                            max: 0
                        }
                    }
                }), Gn(In.prototype, "domain", [C.computed], Object.getOwnPropertyDescriptor(In.prototype, "domain"), In.prototype), In),
                Xn = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Kn = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Qn(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                    return r
                }
                return Array.from(e)
            }

            function Jn(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function ei(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var ti, ri, oi, ni = [5 * Hn.c, 10 * Hn.c, 15 * Hn.c, 30 * Hn.c, Hn.b, 2 * Hn.b, 3 * Hn.b, 6 * Hn.b, 12 * Hn.b, Hn.a, 2 * Hn.a, 3 * Hn.a, Hn.f, 2 * Hn.f, Hn.d, 3 * Hn.d, 6 * Hn.d],
                ii = [1, 2, 2.5, 4, 5],
                ai = (Yn = function (e) {
                    function t(e) {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var r, o, n, i, a = Jn(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        return r = a, o = "ticks", i = a, (n = Vn) && Object.defineProperty(r, o, {
                            enumerable: n.enumerable,
                            configurable: n.configurable,
                            writable: n.writable,
                            value: n.initializer ? n.initializer.call(i) : void 0
                        }), a._numTicks = 5, a._domain = {
                            min: 0,
                            max: 0
                        }, a.reformat = !1, e ? (a.reformat = e.reformat, a) : Jn(a)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, Zn), Kn(t, [{
                        key: "calculateTicks",
                        value: function () {
                            var e = void 0,
                                t = void 0,
                                r = void 0;
                            this.isDate ? (t = (e = this._dateTicks(this.numTicks))[e.length - 1], r = e[0]) : (t = (e = this._numberTicks(this.numTicks))[0], r = e[e.length - 1]), this.reformat && (this._domain = {
                                min: t,
                                max: r
                            }), this.ticks = e || []
                        }
                    }, {
                        key: "_dateTicks",
                        value: function (e) {
                            var t = this.originalDomain,
                                r = this.steps;
                            if (!e || !r || !r.length) return [];
                            for (var o = t.min, n = t.max, i = P()(n - o), a = i.div(e), l = P()(1), s = 0, c = r.length; s < c && (l = P()(r[s]), !a.lt(l)); s++);
                            var u = P()(n);
                            u = u.minus(u.mod(l));
                            var d = +i.div(l).round(0, 3);
                            return [].concat(Qn(Array(d))).map(function (e, t) {
                                return Number(u.minus(l.mul(t)))
                            })
                        }
                    }, {
                        key: "_numberTicks",
                        value: function (e) {
                            var t = this.originalDomain,
                                r = this.steps;
                            if (!e || !r || !r.length) return [];
                            var o = t.min,
                                n = t.max;
                            if (!isFinite(n - o)) return [];
                            for (var i = P()(n - o), a = i.div(e), l = P()(1), s = 1, c = -1; c < 2; c++) {
                                s = i.e + c;
                                for (var u = 0, d = r.length; u < d && ((l = P()(r[u])).e = s, !a.lt(l)); u++);
                                if (a.lt(l)) break
                            }
                            var f = P()(o),
                                p = P()(n);
                            f = f.minus(f.mod(l)), p = p.add(l.minus(p.mod(l)));
                            var h = Number(p.minus(f).div(l).round(0, 3)) + 1;
                            return [].concat(Qn(Array(h))).map(function (e, t) {
                                return Number(f.add(l.mul(t)))
                            })
                        }
                    }, {
                        key: "domain",
                        get: function () {
                            return this._domain
                        }, set: function (e) {
                            var t = e.min,
                                r = e.max;
                            t instanceof Date && r instanceof Date ? (this._domain = {
                                min: t.getTime() - Hn.e,
                                max: r.getTime() - Hn.e
                            }, this.isDate = !0, this.steps || (this.steps = ni)) : (this._domain = e, this.steps || (this.steps = ii)), this.originalDomain = Xn({}, this._domain), this.calculateTicks()
                        }
                    }, {
                        key: "numTicks",
                        get: function () {
                            return this._numTicks
                        }, set: function (e) {
                            e !== this._numTicks && (this._numTicks = e, this.calculateTicks())
                        }
                    }]), t
                }(), Vn = ei(Yn.prototype, "ticks", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return []
                    }
                }), ei(Yn.prototype, "domain", [C.computed], Object.getOwnPropertyDescriptor(Yn.prototype, "domain"), Yn.prototype), ei(Yn.prototype, "calculateTicks", [C.action], Object.getOwnPropertyDescriptor(Yn.prototype, "calculateTicks"), Yn.prototype), Yn),
                li = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function si(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function ci(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var ui, di, fi, pi, hi, bi = (ti = function () {
                    function e(t) {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), si(this, "periods", ri, this), si(this, "data", oi, this), this.periods = t
                    }
                    return li(e, [{
                        key: "update",
                        value: function (e) {
                            for (var t = this.periods, r = [], o = P()(0), n = 0, i = e.length; n < i; n++) {
                                var a = e[n];
                                o.add(a.close), n < t - 1 || (r.push({
                                    candle: e[n],
                                    sma: +o.div(t)
                                }), o.minus(e[n - t + 1].close))
                            }
                            this.data = r
                        }
                    }]), e
                }(), ri = ci(ti.prototype, "periods", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), oi = ci(ti.prototype, "data", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return []
                    }
                }), ci(ti.prototype, "update", [C.action], Object.getOwnPropertyDescriptor(ti.prototype, "update"), ti.prototype), ti),
                vi = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function yi(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function mi(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            we.a.getItem("show-ema") || we.a.setItem("show-ema", {});
            var gi, wi, _i, Oi, xi = (ui = function () {
                    function e(t) {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), yi(this, "periods", di, this), yi(this, "data", fi, this), yi(this, "show", pi, this), yi(this, "toggle", hi, this), this.periods = t, this.sma = new bi(t);
                        var r = we.a.getItem("show-ema") || {};
                        this.show = r[t]
                    }
                    return vi(e, [{
                        key: "update",
                        value: function (e) {
                            var t = this.periods,
                                r = this.sma;
                            r.update(e.slice(-t));
                            var o = 2 / (t + 1),
                                n = r.data[0] && r.data[0].sma || e[0] && e[0].close;
                            this.data = e.slice(t - 1).map(function (e) {
                                var t = (e.close - n) * o + n;
                                return n = t, {
                                    candle: e,
                                    ema: t
                                }
                            })
                        }
                    }]), e
                }(), di = mi(ui.prototype, "periods", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), fi = mi(ui.prototype, "data", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return []
                    }
                }), pi = mi(ui.prototype, "show", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !0
                    }
                }), mi(ui.prototype, "update", [C.action], Object.getOwnPropertyDescriptor(ui.prototype, "update"), ui.prototype), hi = mi(ui.prototype, "toggle", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.show = !e.show, Object(T.c)("chart_overlay_selected", {
                                overlay: "EMA" + e.periods,
                                showing: e.show
                            });
                            var t = we.a.getItem("show-ema") || {};
                            if (e.show) return t[e.periods] = !0, void we.a.setItem("show-ema", t);
                            t[e.periods] = !1, we.a.setItem("show-ema", t)
                        }
                    }
                }), ui),
                ki = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Ci(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function Si(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var Pi, ji, Ti, Ai, Ei, zi, Mi, Ni, Bi, Ri, Di, Fi, Wi, Li, Ii, qi = (gi = function () {
                    function e() {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), Ci(this, "x", wi, this), Ci(this, "y", _i, this), Ci(this, "active", Oi, this)
                    }
                    return ki(e, [{
                        key: "set",
                        value: function (e) {
                            if (!e) return this.active = !1;
                            this.x = e.x, this.y = e.y, this.active = !0
                        }
                    }]), e
                }(), wi = Si(gi.prototype, "x", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), _i = Si(gi.prototype, "y", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), Oi = Si(gi.prototype, "active", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !1
                    }
                }), Si(gi.prototype, "set", [C.action], Object.getOwnPropertyDescriptor(gi.prototype, "set"), gi.prototype), gi),
                $i = function () {
                    return function (e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function (e, t) {
                            var r = [],
                                o = !0,
                                n = !1,
                                i = void 0;
                            try {
                                for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !o && l.return && l.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                            return r
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                Hi = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Ui(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function Gi(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var Yi, Vi, Zi = (Pi = function () {
                    function e(t, r) {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), Ui(this, "nodes", ji, this), Ui(this, "mySizes", Ti, this), Ui(this, "mouse", Ai, this), Ui(this, "selected", Ei, this), this.lastTick = Date.now(), this.dt = 0, this.animationFrame = 0, this.columns = {
                            bar: {
                                x: 0,
                                width: .1
                            },
                            size: {
                                x: .1,
                                width: .3,
                                padding: 3
                            },
                            price: {
                                x: .4,
                                width: .3,
                                padding: 3
                            },
                            mySize: {
                                x: .7,
                                width: .3,
                                padding: 16
                            }
                        }, this.disposers = [], Ui(this, "resetBook", zi, this), Ui(this, "setSelected", Mi, this), Ui(this, "setMyOrders", Ni, this), Ui(this, "generate", Bi, this), Ui(this, "_setAnimation", Ri, this), Ui(this, "setNodeRender", Di, this), Ui(this, "setNodeY", Fi, this), Ui(this, "runAnimationLoop", Wi, this), Ui(this, "updateAnimations", Li, this), Ui(this, "renderAll", Ii, this), this.type = t, this.ordersStore = r.ordersStore, this.orderBookStore = r.orderBookStore
                    }
                    return Hi(e, [{
                        key: "subscribe",
                        value: function () {
                            this.disposers.push(Object(C.observe)(this.ordersStore, "asks" === this.type ? "activeSells" : "activeBuys", this.setMyOrders)), this.disposers.push(Object(C.observe)(this.orderBookStore, "book", this.generate)), this.disposers.push(Object(C.observe)(m.a, "product", this.resetBook)), this.disposers.push(Object(C.observe)(this.orderBookStore, "aggregationIndex", this.resetBook)), this.setMyOrders(), this.lastTick = Date.now(), this.runAnimationLoop(), this.orderBookStore.sendBook()
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            this.disposers.forEach(function (e) {
                                return e()
                            }), this.disposers = [], this.animationFrame && Object(V.a)(this.animationFrame)
                        }
                    }, {
                        key: "boundingBox",
                        get: function () {
                            return this.orderBookStore.boundingBox[this.type]
                        }
                    }, {
                        key: "firstLoad",
                        get: function () {
                            return !this.nodes.length
                        }
                    }]), e
                }(), ji = Gi(Pi.prototype, "nodes", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return []
                    }
                }), Ti = Gi(Pi.prototype, "mySizes", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return {}
                    }
                }), Ai = Gi(Pi.prototype, "mouse", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return new qi
                    }
                }), Ei = Gi(Pi.prototype, "selected", [C.observable], {
                    enumerable: !0,
                    initializer: null
                }), Gi(Pi.prototype, "boundingBox", [C.computed], Object.getOwnPropertyDescriptor(Pi.prototype, "boundingBox"), Pi.prototype), Gi(Pi.prototype, "firstLoad", [C.computed], Object.getOwnPropertyDescriptor(Pi.prototype, "firstLoad"), Pi.prototype), zi = Gi(Pi.prototype, "resetBook", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.nodes = [], e.setMyOrders()
                        }
                    }
                }), Mi = Gi(Pi.prototype, "setSelected", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            e.selected = t
                        }
                    }
                }), Ni = Gi(Pi.prototype, "setMyOrders", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            var t = e.type,
                                r = e.ordersStore,
                                o = r.activeSells,
                                n = r.activeBuys,
                                i = e.orderBookStore,
                                a = i.hasAggregation,
                                l = i.bucket,
                                s = "bids" === t ? n : o;
                            e.mySizes = s.reduce(function (e, t) {
                                var r = t.price.toString();
                                a && (r = l(t.side, r).toString());
                                var o = e[r],
                                    n = t.size.minus(t.filled_size);
                                return e[r] = o ? o.add(n) : n, e
                            }, {})
                        }
                    }
                }), Bi = Gi(Pi.prototype, "generate", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            var t = 0,
                                r = 0,
                                o = [],
                                n = !1,
                                i = e.type,
                                a = e.orderBookStore.book,
                                l = a.asks,
                                s = a.bids,
                                c = ("asks" === i ? l : s).slice(0, 50),
                                u = e.nodes.slice(0, 100);
                            if (c.length || u.length) {
                                for (; c[t] || u[r];) {
                                    var d = c[t],
                                        f = u[r],
                                        p = !1,
                                        h = P()(0),
                                        b = P()(0);
                                    if (d) {
                                        var v = $i(d, 2);
                                        h = v[0], b = v[1]
                                    }
                                    f ? d ? h.eq(f.price) ? (b.eq(f.size) || (f.size = b, e._setAnimation(f, "change")), t += 1, r += 1) : ("bids" === i ? h.gt(f.price) : h.lt(f.price)) ? (p = !0, t += 1) : (e._setAnimation(f, "remove"), r += 1) : (e._setAnimation(f, "remove"), r += 1) : (p = !0, t += 1), p ? (f = {
                                        price: h,
                                        size: b,
                                        render: !0,
                                        y: 0
                                    }, n = !0, e.firstLoad || e._setAnimation(f, "change")) : n && (f.render = !0), o.push(f)
                                }
                                e.nodes = o
                            }
                        }
                    }
                }), Ri = Gi(Pi.prototype, "_setAnimation", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        return function (e, t) {
                            if ("change" === t) return e.render = !0, void(e.animation = {
                                type: "change",
                                dt: 0,
                                time: 1e3,
                                done: !1
                            });
                            if ("remove" === t) {
                                if (e.animation && "remove" === e.animation.type) return;
                                e.render = !0, e.animation = {
                                    type: "remove",
                                    dt: 0,
                                    time: 400,
                                    done: !1
                                }
                            }
                        }
                    }
                }), Di = Gi(Pi.prototype, "setNodeRender", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        return function (e, t) {
                            e.render = t
                        }
                    }
                }), Fi = Gi(Pi.prototype, "setNodeY", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        return function (e, t) {
                            e.y = t
                        }
                    }
                }), Wi = Gi(Pi.prototype, "runAnimationLoop", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            var t = Date.now(),
                                r = t - e.lastTick;
                            e.lastTick = t, e.dt += r, e.dt >= ge.a.msPerFrame && (e.updateAnimations(e.dt), e.dt = 0), e.animationFrame = Object(V.c)(e.runAnimationLoop)
                        }
                    }
                }), Li = Gi(Pi.prototype, "updateAnimations", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            var r = [],
                                o = !1,
                                n = !1;
                            t >= 1e3 && (n = !0);
                            for (var i = 0, a = e.nodes.length; i < a; i++) {
                                var l = e.nodes[i],
                                    s = l.animation;
                                if (s && (s.dt += t, n || s.dt >= s.time)) {
                                    if ("remove" === s.type) {
                                        o = !0;
                                        continue
                                    }
                                    l.animation = null
                                }
                                o && (l.render = !0), r.push(l)
                            }
                            e.nodes = r
                        }
                    }
                }), Ii = Gi(Pi.prototype, "renderAll", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            for (var t = 0, r = e.nodes.length; t < r; t++) {
                                e.nodes[t].render = !0
                            }
                        }
                    }
                }), Pi),
                Xi = r(1281),
                Ki = r.n(Xi),
                Qi = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Ji = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var ea = {},
                ta = (Yi = function (e) {
                    function t(e) {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var r = function (e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        return Vi.call(r), "asks" === e.orderBookUIStore.type ? (r.barColor = Ki.a.asksBarColor, r.wholeColorHighlight = Ki.a.asksWholeColor, r.decimalColorHighlight = Ki.a.asksDecimalColor, r.changeWholeColor = Ki.a.asksChangeWholeColor, r.changeDecimalColor = Ki.a.asksChangeDecimalColor) : (r.barColor = Ki.a.bidsBarColor, r.wholeColorHighlight = Ki.a.bidsWholeColor, r.decimalColorHighlight = Ki.a.bidsDecimalColor, r.changeWholeColor = Ki.a.bidsChangeWholeColor, r.changeDecimalColor = Ki.a.bidsChangeDecimalColor), r
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Ji(t, [{
                        key: "setTextStyles",
                        value: function () {
                            var e = this.ctx;
                            e && (e.font = Ki.a.fontWeight + " " + Ki.a.fontSize + "px " + Ki.a.fontFamily, e.textAlign = Ki.a.textAlign, e.textBaseline = Ki.a.textBaseline)
                        }
                    }, {
                        key: "renderBG",
                        value: function (e) {
                            if (e.animation && "remove" === e.animation.type) {
                                var t = this.easeInOut(e.animation.dt / e.animation.time);
                                this.ctx.fillStyle = Object(Bt.d)(t, Ki.a.removeFromColor, Ki.a.removeToColor), this.ctx.fillRect(0, e.y, this.width, 16)
                            }
                        }
                    }, {
                        key: "renderBar",
                        value: function (e) {
                            var t = this.props.orderBookUIStore.columns,
                                r = m.a.product.maxBarSize;
                            this.ctx.fillStyle = this.barColor;
                            var o = t.bar.width * this.width * Math.min(r, +e.size) / r;
                            this.ctx.fillRect(0, e.y, Math.max(o, 1), 16)
                        }
                    }, {
                        key: "renderMarketSize",
                        value: function (e) {
                            var t = this.props.orderBookUIStore.columns,
                                r = m.a.product,
                                o = +e.size,
                                n = [Ki.a.wholeColor, Ki.a.normalColor, Ki.a.dimColor],
                                i = e.animation;
                            if (i && "change" === i.type) {
                                var a = this.easeInOut(i.dt / i.time);
                                n = [Object(Bt.d)(a, this.changeWholeColor, Ki.a.wholeColor), Object(Bt.d)(a, this.changeWholeColor, Ki.a.normalColor), Object(Bt.d)(a, this.changeDecimalColor, Ki.a.dimColor)]
                            } else i && "remove" === i.type && (n = [Ki.a.dimColor]);
                            var l = (t.size.x + t.size.width) * this.width - t.size.padding,
                                s = Object(yn.a)(o, {
                                    formattedValue: o.toFixed(r.base.precision)
                                });
                            this._renderMulticolorText(s, n, l, e.y + this.textYOffset, !0)
                        }
                    }, {
                        key: "renderPrice",
                        value: function (e) {
                            var t = this.props.orderBookUIStore.columns,
                                r = m.a.product,
                                o = +e.price,
                                n = Object(yn.a)(o, {
                                    formattedValue: o.toFixed(r.price_precision)
                                }),
                                i = [this.wholeColorHighlight, this.decimalColorHighlight];
                            e.animation && "remove" === e.animation.type && (i = [Ki.a.dimColor]);
                            var a = (t.price.x + t.price.width) * this.width - t.price.padding;
                            this._renderMulticolorText(n, i, a, e.y + this.textYOffset, !0)
                        }
                    }, {
                        key: "renderMySize",
                        value: function (e) {
                            var t = this.props.orderBookUIStore,
                                r = t.columns,
                                o = t.mySizes,
                                n = m.a.product,
                                i = [Ki.a.wholeColor, Ki.a.normalColor, Ki.a.dimColor],
                                a = e.animation,
                                l = e.price;
                            if (a && "change" === a.type) {
                                var s = this.easeInOut(a.dt / a.time);
                                i = [Object(Bt.d)(s, this.changeWholeColor, Ki.a.wholeColor), Object(Bt.d)(s, this.changeWholeColor, Ki.a.normalColor), Object(Bt.d)(s, this.changeDecimalColor, Ki.a.dimColor)]
                            } else a && "remove" === a.type && (i = [Ki.a.dimColor]);
                            var c = o[l.toString()] || 0,
                                u = Object(yn.a)(c, {
                                    formattedValue: c.toFixed(n.base.precision),
                                    zeroValue: "-"
                                }),
                                d = (r.mySize.x + r.mySize.width) * this.width - r.mySize.padding;
                            this._renderMulticolorText(u, i, d, e.y + this.textYOffset, !0)
                        }
                    }, {
                        key: "_renderMulticolorText",
                        value: function (e, t, r, o, n) {
                            for (var i = 0, a = e.length === t.length ? e : e.slice(0, t.length - 1).concat(e.slice(t.length - 1).join("")), l = this.ctx, s = 0, c = a.length; s < c; s++) {
                                var u = n ? c - s - 1 : s,
                                    d = a[u];
                                d && (l.fillStyle = t[u], l.fillText(d, Math.round(r - i), Math.round(o)), i += this._measureText(d))
                            }
                        }
                    }, {
                        key: "_measureText",
                        value: function (e) {
                            for (var t = 0, r = 0, o = e.length; r < o; r++) {
                                var n = e[r],
                                    i = ea[n];
                                i || (i = this.ctx.measureText(n).width, ea[n] = i), t += i
                            }
                            return t
                        }
                    }, {
                        key: "easeInOut",
                        value: function (e) {
                            return e < .5 ? 2 * e * e : (4 - 2 * e) * e - 1
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.orderBookUIStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["orderBookUIStore"]));
                            return b.createElement(un, Qi({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(), Vi = function () {
                    var e = this;
                    this.height = 0, this.width = 0, this.nodeCount = 0, this.textYOffset = Math.round(8), this.selectNode = function () {
                        var t = e.props.orderBookUIStore,
                            r = t.type,
                            o = t.nodes,
                            n = t.setSelected,
                            i = t.mouse,
                            a = i.active,
                            l = i.y;
                        if (!a) return n(null);
                        var s = "bids" === r ? Math.floor(l / 16) : Math.floor((e.height - l) / 16);
                        if (s < 0 || s >= o.length) return n(null);
                        n(o[s])
                    }, this.draw = function (t, r, o) {
                        var n = e.props.orderBookUIStore,
                            i = n.nodes,
                            a = n.type,
                            l = n.setNodeRender,
                            s = n.setNodeY,
                            c = n.boundingBox;
                        e.ctx = t, e.width = r, e.height = o, e.setTextStyles();
                        for (var u = Math.max(Math.floor(c.start / 16), 0), d = Math.min.apply(null, [Math.ceil(c.end / 16), i.length, 50]); u < d; u++) {
                            var f = i[u];
                            s(f, "bids" === a ? 16 * u : o - 16 * (u + 1)), f.render && (t.clearRect(0, f.y, r, 16), e.renderBG(f), e.renderBar(f), e.renderMarketSize(f), e.renderPrice(f), e.renderMySize(f)), f.animation || l(f, !1)
                        }
                        if (i.length < e.nodeCount) {
                            var p = 16 * (e.nodeCount - i.length),
                                h = "bids" === a ? 16 * i.length : e.height - 16 * e.nodeCount;
                            t.clearRect(0, h, r, p)
                        }
                        e.nodeCount = i.length, e.selectNode()
                    }
                }, Yi),
                ra = Object(ue.b)("orderBookUIStore")(Object(ue.c)(ta)),
                oa = r(1279),
                na = r.n(oa),
                ia = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                aa = Object(ue.b)("orderBookUIStore")(Object(ue.c)(function (e) {
                    var t = e.orderBookUIStore,
                        r = t.selected,
                        o = t.mouse.x,
                        n = t.columns,
                        i = t.mySizes,
                        a = e.width,
                        l = void 0 === a ? 0 : a,
                        s = e.height,
                        c = void 0 === s ? 0 : s;
                    if (!r) return null;
                    var u = l - n.mySize.width * l;
                    return ia(cn, {
                        top: r.y,
                        left: 0,
                        right: 0,
                        bottom: c - r.y - 16,
                        width: l,
                        height: 16,
                        style: {
                            background: na.a.hoverColor
                        }
                    }, void 0, o >= u && i[r.price.toString()] ? ia(cn, {
                        top: 0,
                        left: u,
                        right: 0,
                        bottom: 0,
                        width: l,
                        height: 16,
                        style: {
                            background: na.a.cancelColor
                        }
                    }) : null)
                })),
                la = r(1277),
                sa = r.n(la),
                ca = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                ua = function () {
                    return function (e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function (e, t) {
                            var r = [],
                                o = !0,
                                n = !1,
                                i = void 0;
                            try {
                                for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !o && l.return && l.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                            return r
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }(),
                da = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function fa(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var pa = me.a.bind(sa.a),
                ha = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = fa(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.onMarketSizeClick = function () {
                            var e = o.props,
                                t = e.orderFormStore,
                                r = e.orderBookUIStore,
                                n = r.type,
                                i = r.selected,
                                a = A.h.asks,
                                l = A.h.bids,
                                s = A.h.calculateBaseBuyOrder,
                                c = m.a.product;
                            if (i) {
                                for (var u = i.price, d = "bids" === n ? u.gt.bind(u) : u.lt.bind(u), f = "bids" === n ? l : a, p = P()(0), h = 0, b = f.length; h < b; h++) {
                                    var v = ua(f[h], 2),
                                        y = v[0],
                                        g = v[1];
                                    if (d(y)) break;
                                    p = p.add(g)
                                }
                                if (t.setType("market"), t.setPrice(""), "bids" === n) t.setSide("sell"), t.setAmount(p.toFixed(c.base.precision));
                                else {
                                    t.setSide("buy");
                                    var w = s(p).total,
                                        _ = w.mul(c.fee_rate);
                                    t.setAmount(w.add(_).toFixed(c.quote.precision))
                                }
                            }
                        }, o.onPriceClick = function () {
                            var e = o.props,
                                t = e.orderFormStore,
                                r = e.orderBookUIStore,
                                n = r.type,
                                i = r.selected,
                                a = m.a.product;
                            if (i) {
                                var l = i.price.toFixed(a.quote.precision);
                                if ("stop" === t.type) return t.setSide("bids" === n ? "sell" : "buy"), void t.setStopPrice(l);
                                t.setType("limit"), t.setSide("bids" === n ? "buy" : "sell"), t.setPrice(l)
                            }
                        }, o.onMySizeClick = function () {
                            var e = o.props,
                                t = e.ordersStore,
                                r = e.orderBookStore,
                                n = r.hasAggregation,
                                i = r.bucket,
                                a = e.orderBookUIStore,
                                l = a.type,
                                s = a.selected;
                            if (s) {
                                var c = s.price;
                                ("bids" === l ? t.activeBuys : t.activeSells).forEach(function (e) {
                                    var r = n ? i(e.side, e.price) : e.price;
                                    c && r.eq(c) && e.active && t.destroyOrder(e)
                                })
                            }
                        }, o.onMouseMove = function (e) {
                            var t = o.props.orderBookUIStore.mouse,
                                r = e.currentTarget.getBoundingClientRect(),
                                n = r.left,
                                i = r.top,
                                a = e.pageX - n,
                                l = e.pageY - i;
                            t.set({
                                x: a,
                                y: l
                            })
                        }, o.onMouseOut = function () {
                            o.props.orderBookUIStore.mouse.set()
                        }, fa(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), da(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.orderBookUIStore,
                                r = t.columns,
                                o = t.mouse.x,
                                n = t.selected,
                                i = t.mySizes,
                                a = e.width,
                                l = void 0 === a ? 0 : a,
                                s = e.height,
                                c = void 0 === s ? 0 : s,
                                u = (r.size.width + r.bar.width) * l,
                                d = u + r.price.width * l;
                            return ca(cn, {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                onMouseMove: this.onMouseMove,
                                onMouseOut: this.onMouseOut
                            }, void 0, ca(cn, {
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: l - u,
                                onClick: this.onMarketSizeClick,
                                style: {
                                    cursor: "pointer"
                                }
                            }), ca(cn, {
                                top: 0,
                                bottom: 0,
                                left: u,
                                right: l - d,
                                onClick: this.onPriceClick,
                                style: {
                                    cursor: "pointer"
                                }
                            }), ca(cn, {
                                top: 0,
                                bottom: 0,
                                left: d,
                                right: 0,
                                onClick: this.onMySizeClick
                            }, void 0, n && i[n.price.toString()] && o >= d ? ca(cn, {
                                top: n.y,
                                left: 0,
                                right: 0,
                                bottom: c - n.y - 16,
                                style: {
                                    cursor: "pointer"
                                }
                            }, void 0, ca("div", {
                                className: pa("icon")
                            })) : null))
                        }
                    }]), t
                }(),
                ba = Object(ue.b)("orderBookUIStore", "orderBookStore", "orderFormStore", "ordersStore")(Object(ue.c)(ha)),
                va = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                ya = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function ma(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var ga = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = ma(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.onSize = function () {
                            o.props.orderBookUIStore.renderAll()
                        }, ma(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ya(t, [{
                        key: "render",
                        value: function () {
                            return va(sn, {
                                onSize: this.onSize
                            }, void 0, va(aa, {}), va(ra, {}), va(ba, {}))
                        }
                    }]), t
                }(),
                wa = Object(ue.b)("orderBookUIStore")(Object(ue.c)(ga)),
                _a = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Oa = Object(ue.b)("ordersStore", "orderBookStore")(Object(ue.c)(function (e) {
                    var t = e.type,
                        r = e.ordersStore,
                        o = e.orderBookStore,
                        n = new Zi(t, {
                            ordersStore: r,
                            orderBookStore: o
                        });
                    return _a(y.a, {
                        orderBookUIStore: n
                    }, void 0, _a("div", {
                        style: {
                            display: "flex",
                            flex: 1,
                            height: "50%",
                            minHeight: 800
                        }
                    }, void 0, b.createElement(wa, e)))
                })),
                xa = r(1275),
                ka = r.n(xa),
                Ca = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Sa = me.a.bind(ka.a),
                Pa = Object(ue.b)("orderBookStore")(Object(ue.c)(function (e) {
                    var t = e.orderBookStore,
                        r = m.a.product;
                    if (!r) return null;
                    var o = t.aggregationIndex,
                        n = t.aggregationValue,
                        i = t.increaseAggregation,
                        a = t.decreaseAggregation;
                    return Ca("div", {
                        className: Sa("aggregation")
                    }, void 0, Ca("div", {
                        className: Sa("column")
                    }, void 0, Ca("div", {
                        className: Sa("text")
                    }, void 0, "AGGREGATION"), Ca("div", {
                        className: Sa("value")
                    }, void 0, n.toFixed(r.price_precision))), Ca("div", {
                        className: Sa("buttons")
                    }, void 0, Ca("div", {
                        className: Sa("button", "dec", {
                            disabled: o <= 0
                        }),
                        onClick: a
                    }), Ca("div", {
                        className: Sa("button", "inc", {
                            disabled: o >= Eo
                        }),
                        onClick: i
                    })))
                })),
                ja = r(1273),
                Ta = r.n(ja),
                Aa = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Ea = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function za(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Ma = me.a.bind(Ta.a),
                Na = 1400,
                Ba = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = za(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            tab: "orderBook",
                            spreadPosition: ""
                        }, o.firstLoad = !1, o.disposers = [], o.onResize = function () {
                            var e = o.state.tab;
                            window.outerWidth > Na && "orderBook" !== e && o.setTabOrderBook(), o.setDimensions(), o.centerBook()
                        }, o.setTab = function (e) {
                            o.firstLoad = !0, o.setState({
                                tab: e
                            })
                        }, o.setTabOrderBook = o.setTab.bind(o, "orderBook"), o.setTabTradeHistory = o.setTab.bind(o, "tradeHistory"), o.centerBook = function () {
                            if (o.scroller && o.scrollerDimensions) {
                                var e = o.scrollerDimensions,
                                    t = e.viewport,
                                    r = e.height;
                                o.scroller.scrollTop = r / 2 - t / 2, o.setState({
                                    spreadPosition: ""
                                })
                            }
                        }, o.onScrollRef = function (e) {
                            if (e) {
                                o.scroller = e, o.spread = o.scroller.getElementsByClassName(Ma("spread"))[0], o.scroller.addEventListener("scroll", o.onScroll);
                                var t = e.offsetWidth - e.clientWidth;
                                return t && (e.style.marginRight = -t + "px"), void o.setDimensions()
                            }
                            o.scroller.removeEventListener("scroll", o.onScroll)
                        }, o.setDimensions = function () {
                            o.scroller && (o.scrollerDimensions = {
                                viewport: o.scroller.offsetHeight,
                                height: o.scroller.scrollHeight
                            }, o.spread && (o.spreadDimensions = {
                                height: o.spread.offsetHeight
                            }))
                        }, o.setBoundingBox = function () {
                            var e = o.props.orderBookStore.setBoundingBox;
                            if (o.scrollerDimensions) {
                                var t = o.scrollerDimensions,
                                    r = t.height,
                                    n = t.viewport,
                                    i = r / 2,
                                    a = o.scroller.scrollTop;
                                e({
                                    asks: {
                                        start: i - a - n,
                                        end: i - a
                                    },
                                    bids: {
                                        start: a - i,
                                        end: a - i + n
                                    }
                                })
                            }
                        }, o.onScroll = function () {
                            var e = o.scrollerDimensions.viewport,
                                t = o.scroller.scrollTop,
                                r = o.spreadDimensions.height,
                                n = o.spread.offsetTop,
                                i = "";
                            n + r + 5 > t + e ? i = "bottom" : n - 5 < t && (i = "top"), o.setState({
                                spreadPosition: i
                            }), o.setBoundingBox()
                        }, za(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Ea(t, [{
                        key: "UNSAFE_componentWillMount",
                        value: function () {
                            var e = this;
                            this.disposers.push(Object(C.observe)(ge.a, "width", this.onResize)), this.disposers.push(Object(C.observe)(A.h, "loading", function () {
                                e.firstLoad = !0
                            })), this.firstLoad = !0
                        }
                    }, {
                        key: "componentDidUpdate",
                        value: function () {
                            this.firstLoad && (this.centerBook(), this.firstLoad = !1)
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            this.disposers.forEach(function (e) {
                                return e()
                            }), this.disposers = []
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = m.a.product;
                            if (!e) return null;
                            var t = this.props.orderBookStore.spread,
                                r = A.h.loading,
                                o = this.state,
                                n = o.spreadPosition,
                                i = o.tab;
                            return Aa("div", {
                                className: Ma("order-book-panel")
                            }, void 0, Aa(qr, {
                                tab: i,
                                tabs: this.tabs,
                                tabsClassName: Ma("header-tabs")
                            }), "orderBook" === i ? Aa("div", {
                                className: Ma("content")
                            }, void 0, Aa("div", {
                                className: Ma("table-head")
                            }, void 0, Aa("div", {
                                className: Ma("size")
                            }, void 0, "Market size"), Aa("div", {
                                className: Ma("price")
                            }, void 0, "Price ", Aa("span", {}, void 0, "(", e.quote.id, ")")), Aa("div", {
                                className: Ma("my-size")
                            }, void 0, "My size")), Aa("div", {
                                className: Ma("content-wrapper")
                            }, void 0, r ? Aa("div", {
                                className: Ma("loading-wrapper")
                            }, void 0, Aa(Rt.a, {})) : b.createElement("div", {
                                className: Ma("order-book-wrapper"),
                                ref: this.onScrollRef
                            }, Aa(Oa, {
                                type: "asks"
                            }), Aa("div", {
                                className: Ma("spread-wrapper"),
                                onClick: this.centerBook
                            }, void 0, Aa("div", {
                                className: Ma("text")
                            }, void 0, e.quote.id, " SPREAD"), Aa(po.a, {
                                value: t,
                                precision: e.price_precision,
                                className: Ma("spread")
                            })), Aa(Oa, {
                                type: "bids"
                            }), n ? Aa("div", {
                                className: Ma("spread-wrapper", "fixed", n),
                                onClick: this.centerBook
                            }, void 0, Aa("div", {
                                className: Ma("text")
                            }, void 0, e.quote.id, " SPREAD"), Aa(po.a, {
                                value: t,
                                precision: e.price_precision,
                                className: Ma("spread")
                            })) : null)), Aa(Pa, {})) : null, "tradeHistory" === i ? Aa($n, {}) : null)
                        }
                    }, {
                        key: "tabs",
                        get: function () {
                            return [{
                                key: "orderBook",
                                title: "ORDER BOOK",
                                name: "Order book",
                                onClick: this.setTabOrderBook
                            }, {
                                key: "tradeHistory",
                                title: "TRADE HISTORY",
                                name: "Trade history",
                                onClick: this.setTabTradeHistory
                            }]
                        }
                    }]), t
                }(),
                Ra = Object(ue.b)("orderBookStore")(Object(ue.c)(Ba)),
                Da = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Fa = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Wa(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var La, Ia = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Wa(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.orderBookStore = new Mo, Wa(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["PureComponent"]), Fa(t, [{
                        key: "render",
                        value: function () {
                            return Da(y.a, {
                                orderBookStore: this.orderBookStore
                            }, void 0, Da(Ra, {}))
                        }
                    }]), t
                }(),
                qa = r(1188),
                $a = r(1142),
                Ha = r(1163),
                Ua = r(1192),
                Ga = r.n(Ua),
                Ya = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Va = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var Za = me.a.bind(Ga.a),
                Xa = Object(ue.c)(La = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Va(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props.fill,
                                t = m.a.product;
                            return Ya("li", {
                                className: Za("fill", "row")
                            }, void 0, Ya("div", {
                                className: Za("fill-tag", e.side)
                            }, void 0, Ya("span", {})), Ya("div", {
                                className: Za("fill-size", "column")
                            }, void 0, Ya(po.a, {
                                value: e.size,
                                precision: 4,
                                approximate: !0,
                                className: Za("split-number"),
                                part2ClassName: Za("faded")
                            })), Ya("div", {
                                className: Za("fill-price", "column")
                            }, void 0, Ya(po.a, {
                                value: e.price,
                                precision: t.price_precision,
                                approximate: !0,
                                className: Za("split-number"),
                                part2ClassName: Za("faded")
                            })), Ya("div", {
                                className: Za("fill-fee", "column")
                            }, void 0, Ya(po.a, {
                                value: e.fee,
                                precision: 4,
                                approximate: !0,
                                className: Za("split-number", {
                                    green: e.fee.lt(0)
                                }, {
                                    red: e.fee.gt(0)
                                }),
                                part2ClassName: Za("faded")
                            })), Ya("div", {
                                className: Za("fill-time", "column")
                            }, void 0, Ya(Ha.a, {
                                moment: e.created_at,
                                withWords: !0
                            })), Ya("div", {
                                className: Za("fill-product", "column")
                            }, void 0, t.id))
                        }
                    }]), t
                }()) || La,
                Ka = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Qa = me.a.bind(Ga.a),
                Ja = function (e) {
                    return Ka(Xa, {
                        fill: e
                    }, e.trade_id)
                },
                el = Object(ue.b)("fillsStore")(Object(ue.c)(function (e) {
                    var t = e.fillsStore,
                        r = m.a.product;
                    return r ? Ka("div", {
                        className: Qa("fill-list")
                    }, void 0, Ka(tl, {
                        product: r
                    }), Ka($a.a, {
                        store: t,
                        itemMapper: Ja,
                        className: Qa("list")
                    }, void 0, Ka("div", {
                        className: Qa("empty-message")
                    }, void 0, "You have no ", r.display_name, " fills"))) : null
                })),
                tl = function (e) {
                    var t = e.product;
                    return Ka("div", {
                        className: Qa("list-header", "row")
                    }, void 0, Ka("div", {
                        className: Qa("fill-size", "column")
                    }, void 0, "Size ", Ka(rl, {}, void 0, t.base.id)), Ka("div", {
                        className: Qa("fill-price", "column")
                    }, void 0, "Price ", Ka(rl, {}, void 0, t.quote.id)), Ka("div", {
                        className: Qa("fill-fee", "column")
                    }, void 0, "Fee ", Ka(rl, {}, void 0, t.quote.id)), Ka("div", {
                        className: Qa("fill-time", "column")
                    }, void 0, "Time"), Ka("div", {
                        className: Qa("fill-product", "column")
                    }, void 0, "Product"))
                },
                rl = function (e) {
                    var t = e.children;
                    return Ka("span", {
                        className: Qa("small")
                    }, void 0, "(", t, ")")
                },
                ol = r(1148);
            var nl = function (e) {
                    var t = e.value,
                        r = e.currency,
                        o = function (e, t) {
                            var r = {};
                            for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                            return r
                        }(e, ["value", "currency"]),
                        n = r.symbol;
                    return b.createElement("span", o, n || "", Object(ol.a)(t), " ", n ? "" : r.id)
                },
                il = r(1269),
                al = r.n(il),
                ll = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                sl = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function cl(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var ul = me.a.bind(al.a),
                dl = function (e) {
                    function t() {
                        var e, r, o, n, i, a = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var l = arguments.length, s = Array(l), c = 0; c < l; c++) s[c] = arguments[c];
                        return r = o = cl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(s))), o.state = {
                            type: "settle",
                            loading: !1,
                            error: ""
                        }, o.switchType = function (e) {
                            o.setState({
                                type: e
                            })
                        }, o.switchTypeSettle = o.switchType.bind(o, "settle"), o.switchTypeRealize = o.switchType.bind(o, "realize"), o.onSubmit = (n = regeneratorRuntime.mark(function e(t) {
                            var r, n, i, l, s, c, u, d, f;
                            return regeneratorRuntime.wrap(function (e) {
                                for (;;) switch (e.prev = e.next) {
                                case 0:
                                    if (t.preventDefault(), r = o.props, n = r.onClose, i = r.positionStore, l = X.a.baseAccount, s = X.a.quoteAccount, c = m.a.profile, u = o.state, d = u.type, !u.loading) {
                                        e.next = 7;
                                        break
                                    }
                                    return e.abrupt("return");
                                case 7:
                                    return o.setState({
                                        loading: !0,
                                        error: ""
                                    }), f = {
                                        method: "POST",
                                        url: "/position/close",
                                        query: {
                                            profile_id: c.id
                                        }
                                    }, "settle" === d && (f.body = {
                                        repay_only: !0
                                    }), e.prev = 10, e.next = 13, j.h.request(f);
                                case 13:
                                    "settle" === d && l.funded_amount.eq(0) && s.funded_amount.eq(0) || i.refresh(), e.next = 19;
                                    break;
                                case 16:
                                    e.prev = 16, e.t0 = e.catch(10), o.setState({
                                        loading: !1,
                                        error: e.t0.message
                                    });
                                case 19:
                                    n();
                                case 20:
                                case "end":
                                    return e.stop()
                                }
                            }, e, a, [
                                [10, 16]
                            ])
                        }), i = function () {
                            var e = n.apply(this, arguments);
                            return new Promise(function (t, r) {
                                return function o(n, i) {
                                    try {
                                        var a = e[n](i),
                                            l = a.value
                                    } catch (e) {
                                        return void r(e)
                                    }
                                    if (!a.done) return Promise.resolve(l).then(function (e) {
                                        o("next", e)
                                    }, function (e) {
                                        o("throw", e)
                                    });
                                    t(l)
                                }("next")
                            })
                        }, function (e) {
                            return i.apply(this, arguments)
                        }), cl(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), sl(t, [{
                        key: "UNSAFE_componentWillReceiveProps",
                        value: function (e) {
                            e.isOpen && e.isOpen !== this.props.isOpen && this.setState({
                                type: "settle",
                                loading: !1,
                                error: ""
                            })
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.onClose,
                                r = e.positionStore,
                                o = m.a.product,
                                n = m.a.profile,
                                i = this.state,
                                a = i.error,
                                l = i.type,
                                s = i.loading;
                            return ll(Ee.a, {
                                onClose: t,
                                contentLabel: "ClosePositionModal",
                                title: "CLOSE POSITION"
                            }, void 0, ll("div", {
                                className: ul("content")
                            }, void 0, ll("form", {
                                onSubmit: this.onSubmit
                            }, void 0, ll(pl, {
                                product: o,
                                positionSize: n.position_size,
                                positionStore: r
                            }), ll("div", {
                                className: ul("types")
                            }, void 0, ll("div", {
                                className: ul("type", {
                                    active: "settle" === l
                                }),
                                onClick: this.switchTypeSettle
                            }, void 0, "Settle"), ll("div", {
                                className: ul("type", {
                                    active: "realize" === l
                                }),
                                onClick: this.switchTypeRealize
                            }, void 0, "Realize Profit/Loss")), ll("div", {
                                className: ul("info")
                            }, void 0, "settle" === l ? this.settleInfo : null, "realize" === l ? this.realizeInfo : null), ll(ze.a, {
                                href: "https://support.gdax.com/customer/portal/articles/2725963-intro-to-margin-trading"
                            }, void 0, "Learn More"), a ? ll("div", {
                                className: ul("error")
                            }, void 0, a) : null, ll("button", {
                                className: ul({
                                    disabled: s
                                }),
                                type: "submit"
                            }, void 0, "Close Position"))))
                        }
                    }, {
                        key: "settleInfo",
                        get: function () {
                            var e = this.props.positionStore.position,
                                t = X.a.quoteAccount,
                                r = X.a.baseAccount,
                                o = m.a.product;
                            if ("long" === e) {
                                var n = t.funded_amount.minus(t.balance);
                                return n = n.cmp(P()(0)) > 0 ? n : P()(0), ll("div", {}, void 0, "Sell", " ", ll(nl, {
                                    value: n.toFixed(o.quote.precision),
                                    currency: o.quote
                                }), " ", "worth of ", o.base.id, " at market to close your position.")
                            }
                            var i = r.funded_amount.minus(r.balance);
                            return i = i.cmp(P()(0)) > 0 ? i : P()(0), ll("div", {}, void 0, "Buy", " ", ll(nl, {
                                value: i.toFixed(o.base.precision),
                                currency: o.base
                            }), " ", "at market to close your position.")
                        }
                    }, {
                        key: "realizeInfo",
                        get: function () {
                            var e = this.props.positionStore.position,
                                t = m.a.profile,
                                r = m.a.product;
                            return ll("div", {}, void 0, "long" === e ? "Sell â‰ˆ" : "Buy â‰ˆ", ll(nl, {
                                value: t.position_size.toFixed(r.base.precision),
                                currency: r.base
                            }), " ", "at market to close your position.")
                        }
                    }]), t
                }(),
                fl = Object(ue.b)("positionStore")(Object(ue.c)(dl)),
                pl = function (e) {
                    var t = e.product,
                        r = e.positionSize,
                        o = e.positionStore,
                        n = o.position,
                        i = o.profitLoss,
                        a = o.roe;
                    return ll("div", {
                        className: ul("section")
                    }, void 0, ll("div", {
                        className: ul("column", n)
                    }, void 0, ll("div", {
                        className: ul("text")
                    }, void 0, "Position"), ll("div", {
                        className: ul("value")
                    }, void 0, r.toFixed(t.base.precision), " ", t.base.id), ll("div", {
                        className: ul("subtext")
                    }, void 0, n)), ll("div", {
                        className: ul("column", i.gte(0) ? "positive" : "negative")
                    }, void 0, ll("div", {
                        className: ul("text")
                    }, void 0, "Unrealized P/L"), ll("div", {
                        className: ul("value")
                    }, void 0, a.toFixed(2), "%"), ll("div", {
                        className: ul("subtext")
                    }, void 0, t.quote.symbol + i.abs().toFixed(t.quote.precision))))
                },
                hl = r(1267),
                bl = r.n(hl),
                vl = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                yl = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function ml(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var gl = me.a.bind(bl.a),
                wl = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = ml(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            isModalOpen: !1
                        }, o.openModal = function () {
                            o.setState({
                                isModalOpen: !0
                            })
                        }, o.closeModal = function () {
                            o.setState({
                                isModalOpen: !1
                            })
                        }, o.onSizeClick = function () {
                            var e = o.props,
                                t = e.orderFormStore,
                                r = e.positionStore.loading,
                                n = m.a.product,
                                i = m.a.profile;
                            if (!r) {
                                var a = i.position_size,
                                    l = void 0;
                                "short" === i.position_type && (t.setSide("buy"), "market" === t.type && (a = i.position_complement, l = n.quote.id)), "long" === i.position_type && (t.setSide("sell"), l = n.base.id), !a.lte(0) && l && t.prefillAll(a, l)
                            }
                        }, ml(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), yl(t, [{
                        key: "render",
                        value: function () {
                            var e = this.state.isModalOpen,
                                t = this.props.positionStore,
                                r = t.loading,
                                o = t.hasPosition;
                            return vl("div", {
                                className: gl("margin-position")
                            }, void 0, vl("div", {
                                className: gl("header")
                            }, void 0, vl("div", {
                                className: gl("title")
                            }, void 0, "POSITION"), o ? vl("div", {
                                className: gl("close-position"),
                                onClick: this.openModal
                            }, void 0, "CLOSE POSITION") : null), vl("div", {
                                className: gl("position")
                            }, void 0, o ? this.positionRow : vl("div", {
                                className: gl("no-position")
                            }, void 0, "You do not have an open position"), r ? vl("span", {
                                className: gl("spinner") + " spinner"
                            }) : null), e && vl(fl, {
                                onClose: this.closeModal
                            }))
                        }
                    }, {
                        key: "positionRow",
                        get: function () {
                            var e = this.props.positionStore,
                                t = e.loading,
                                r = e.position,
                                o = e.entryPrice,
                                n = e.marginRatio,
                                i = e.leverage,
                                a = e.profitLoss,
                                l = e.roe,
                                s = e.callPrice,
                                c = m.a.product,
                                u = m.a.profile;
                            return vl("div", {
                                className: gl("row", {
                                    loading: t
                                })
                            }, void 0, vl("div", {
                                className: gl("column", r)
                            }, void 0, vl("div", {
                                className: gl("text")
                            }, void 0, "Position Size"), vl(yt.a, {
                                message: "Prefill all",
                                orientation: "middle left"
                            }, void 0, vl("div", {
                                className: gl("value", "position-size"),
                                onClick: this.onSizeClick
                            }, void 0, vl(po.a, {
                                value: u.position_size,
                                precision: c.base.precision,
                                unit: c.base.id
                            }))), vl("div", {
                                className: gl("subtext")
                            }, void 0, o.eq(0) ? r : vl("div", {}, void 0, vl("span", {}, void 0, r, " @ "), vl(nl, {
                                value: o.toFixed(c.quote.precision),
                                currency: c.quote
                            })))), vl("div", {
                                className: gl("column", a.gte(0) ? "positive" : "negative")
                            }, void 0, vl("div", {
                                className: gl("text")
                            }, void 0, "Unrealized P/L"), vl("div", {
                                className: gl("value")
                            }, void 0, l.toFixed(2), "%"), vl("div", {
                                className: gl("subtext")
                            }, void 0, a.eq(0) ? "--" : vl(nl, {
                                value: a.abs().toFixed(c.quote.precision),
                                currency: c.quote
                            }))), vl("div", {
                                className: gl("column", "margin-ratio")
                            }, void 0, vl("div", {
                                className: gl("text")
                            }, void 0, "Margin Ratio"), vl("div", {
                                className: gl("value")
                            }, void 0, n.eq(0) ? "--" : n.mul(100).toFixed(0) + "%"), vl("div", {
                                className: gl("subtext")
                            }, void 0, "MMR:", " ", vl("span", {}, void 0, u.min_margin_ratio.mul(100).toFixed(0), "%"))), vl("div", {
                                className: gl("column", "expanded")
                            }, void 0, vl("div", {
                                className: gl("cell")
                            }, void 0, vl("div", {
                                className: gl("text")
                            }, void 0, "Call Price"), vl("div", {
                                className: gl("value")
                            }, void 0, s.eq(0) ? "--" : 2 !== c.quote.precision ? vl(po.a, {
                                value: s,
                                precision: c.quote.precision,
                                unit: c.quote.id
                            }) : vl(nl, {
                                value: s.toFixed(c.quote.precision),
                                currency: c.quote
                            }))), vl("div", {
                                className: gl("cell")
                            }, void 0, vl("div", {
                                className: gl("text")
                            }, void 0, "Leverage"), vl("div", {
                                className: gl("value")
                            }, void 0, i.toFixed(1), "x"))), vl("div", {
                                className: gl("column", "expanded")
                            }, void 0, vl("div", {
                                className: gl("cell")
                            }, void 0, vl("div", {
                                className: gl("text")
                            }, void 0, "Fees Due"), vl("div", {
                                className: gl("value")
                            }, void 0, vl(nl, {
                                value: "0.00",
                                currency: c.quote
                            }))), vl("div", {
                                className: gl("cell")
                            }, void 0, vl("div", {
                                className: gl("text")
                            }, void 0, "Position Expires"), vl("div", {
                                className: gl("value")
                            }, void 0, u.next_expire_time ? vl(Ha.a, {
                                moment: u.next_expire_time
                            }) : "--"))))
                        }
                    }]), t
                }(),
                _l = Object(ue.b)("positionStore", "orderFormStore")(Object(ue.c)(wl)),
                Ol = r(1265),
                xl = r.n(Ol),
                kl = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Cl = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Sl(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Pl = me.a.bind(xl.a),
                jl = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Sl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            tab: "orders"
                        }, o.setTab = function (e) {
                            o.setState({
                                tab: e
                            })
                        }, o.setTabOrders = o.setTab.bind(o, "orders"), o.setTabFills = o.setTab.bind(o, "fills"), o.cancelAllOrders = function () {
                            o.props.ordersStore.destroyAllOrders().catch(v.b)
                        }, Sl(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Cl(t, [{
                        key: "render",
                        value: function () {
                            var e = this.renderedTab,
                                t = m.a.profile;
                            return kl("div", {
                                className: Pl("user-panel", {
                                    viewOnly: !t
                                })
                            }, void 0, t && t.margin_enabled ? kl(_l, {}) : null, kl("div", {
                                className: Pl("user-history")
                            }, void 0, kl("div", {
                                className: Pl("main-panel")
                            }, void 0, kl(qr, {
                                tab: e,
                                tabs: this.tabs,
                                tabsClassName: Pl("header-tabs")
                            }, void 0, this.cancelAllButton), this.list), kl("div", {
                                className: Pl("sub-panel")
                            }, void 0, kl(qr, {
                                title: "FILLS"
                            }), kl(el, {}))))
                        }
                    }, {
                        key: "tabs",
                        get: function () {
                            return [{
                                key: "orders",
                                title: "OPEN ORDERS",
                                name: "Orders",
                                onClick: this.setTabOrders
                            }, {
                                key: "fills",
                                title: "FILLS",
                                name: "Fills",
                                onClick: this.setTabFills
                            }]
                        }
                    }, {
                        key: "list",
                        get: function () {
                            var e = this.state.tab;
                            return "orders" === e ? kl(qa.a, {}) : "fills" === e ? kl(el, {}) : void 0
                        }
                    }, {
                        key: "cancelAllButton",
                        get: function () {
                            var e = this.state.tab,
                                t = this.props.ordersStore,
                                r = "orders" === e && t.hasOpenOrders;
                            return kl("div", {
                                className: Pl("cancel-all", {
                                    show: r
                                }),
                                onClick: this.cancelAllOrders
                            }, void 0, "CANCEL OPEN ORDERS")
                        }
                    }, {
                        key: "renderedTab",
                        get: function () {
                            return "wide" === ge.a.size ? "orders" : this.state.tab
                        }
                    }]), t
                }(),
                Tl = Object(ue.b)("ordersStore")(Object(ue.c)(jl)),
                Al = r(1263),
                El = r.n(Al),
                zl = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Ml = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Nl(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Bl = me.a.bind(El.a),
                Rl = ["30m", "1h", "6h", "1d", "7d", "14d", "30d"],
                Dl = ["1m", "5m", "15m", "1h", "6h", "1d"],
                Fl = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Nl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.setChartType = function (e) {
                            o.props.candlesStore.setType(e)
                        }, o.setChartTypeCandle = o.setChartType.bind(o, "candle"), o.setChartTypeLine = o.setChartType.bind(o, "line"), o.setDuration = function (e) {
                            o.props.candlesStore.setDuration(e)
                        }, Nl(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Ml(t, [{
                        key: "render",
                        value: function () {
                            return zl("div", {
                                className: Bl("chart-header")
                            }, void 0, this.chartType, this.durations, this.overlay, this.ohlcv)
                        }
                    }, {
                        key: "ohlcv",
                        get: function () {
                            var e = this.props.candlesStore,
                                t = m.a.product,
                                r = e.selected,
                                o = e.candles,
                                n = e.loading,
                                i = e.durationMS;
                            if (n || !o || !o.length || "line" === e.type) return null;
                            var a = r || o[0];
                            return zl(Wl, {}, void 0, zl(Il, {}, void 0, a.formatBucketDate(i), " â†’ "), zl(Ll, {}, void 0, "O: "), zl(ql, {
                                value: a.open,
                                precision: t.price_precision
                            }), zl(Ll, {}, void 0, "H: "), zl(ql, {
                                value: a.high,
                                precision: t.price_precision
                            }), zl(Ll, {}, void 0, "L: "), zl(ql, {
                                value: a.low,
                                precision: t.price_precision
                            }), zl(Ll, {}, void 0, "C: "), zl(ql, {
                                value: a.close,
                                precision: t.price_precision
                            }), zl(Ll, {}, void 0, "V: "), zl(ql, {
                                value: a.volume,
                                precision: 0
                            }))
                        }
                    }, {
                        key: "chartType",
                        get: function () {
                            var e = this.props.candlesStore.type;
                            return zl("div", {
                                className: Bl("dropdown")
                            }, void 0, zl("div", {
                                className: Bl("title")
                            }, void 0, e), zl("ul", {
                                className: Bl("list")
                            }, void 0, zl("li", {
                                className: Bl("item", {
                                    active: "candle" === e
                                }),
                                onClick: this.setChartTypeCandle
                            }, void 0, "Candle"), zl("li", {
                                className: Bl("item", {
                                    active: "line" === e
                                }),
                                onClick: this.setChartTypeLine
                            }, void 0, "Line")))
                        }
                    }, {
                        key: "overlay",
                        get: function () {
                            var e = this.props,
                                t = e.candlesStore.type,
                                r = e.priceChartStore.emas;
                            return "candle" !== t ? null : zl("div", {
                                className: Bl("dropdown")
                            }, void 0, zl("div", {
                                className: Bl("title")
                            }, void 0, "Overlay"), zl("ul", {
                                className: Bl("list")
                            }, void 0, Object.keys(r).map(function (e) {
                                var t = r[e],
                                    o = t.show,
                                    n = t.toggle,
                                    i = t.periods;
                                return zl("li", {
                                    className: Bl("item", {
                                        active: o
                                    }),
                                    onClick: n
                                }, e, zl("span", {
                                    className: Bl("icon")
                                }), "EMA" + i)
                            })))
                        }
                    }, {
                        key: "durations",
                        get: function () {
                            var e = this,
                                t = this.props.candlesStore,
                                r = t.type,
                                o = t.duration,
                                n = "candle" === r ? Dl : Rl;
                            return zl("div", {
                                className: Bl("dropdown")
                            }, void 0, zl("div", {
                                className: Bl("title")
                            }, void 0, o), zl("ul", {
                                className: Bl("list")
                            }, void 0, n.map(function (t) {
                                return zl("li", {
                                    className: Bl("item", {
                                        active: t === o
                                    }),
                                    onClick: function () {
                                        return e.setDuration(t)
                                    }
                                }, t, t)
                            })))
                        }
                    }]), t
                }(),
                Wl = ve.c.div(["display:flex;flex:1;justify-content:flex-end;align-items:center;font-weight:bold;text-align:right;white-space:nowrap;overflow:hidden;@media (max-width:1100px) and (min-width:1000px){display:none;}@media (max-width:", "){display:none;}"], Ft.a.mobileWidth),
                Ll = ve.c.span(["margin-left:8px;white-space:pre;color:", ";"], Ft.a.bodyColor),
                Il = ve.c.span(["color:", ";"], Ft.a.lightColor),
                ql = Object(ve.c)(mt.a)(["color:", ";"], Ft.a.lightColor),
                $l = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)(Fl)),
                Hl = r(1135),
                Ul = r.n(Hl),
                Gl = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Yl = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Vl(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Zl = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Vl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.priceChartStore,
                                a = i.xAxis,
                                l = i.candleWidth,
                                s = n.yAxisWidth;
                            e.clearRect(0, 0, t, r), e.strokeStyle = Ul.a.axisColor, e.lineWidth = +Ul.a.axisLineWidth, e.beginPath(), e.moveTo(0, .5), e.lineTo(t - s, .5), e.stroke(), o.setTextStyle(e);
                            for (var c = a.ticks, u = 0, d = c.length; u < d; u++) {
                                var f = fn.a.utc(c[u]),
                                    p = f.hour(),
                                    h = f.minutes(),
                                    b = "";
                                p || h ? h ? h && (b = f.format("h:mm A")) : b = f.format("h A") : b = f.format("MMM D");
                                var v = Math.round(a.toRange(f.valueOf()) - l) + .5;
                                e.fillText(b, v, 7), e.beginPath(), e.moveTo(v, 0), e.lineTo(v, 5), e.stroke()
                            }
                        }, Vl(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Yl(t, [{
                        key: "setTextStyle",
                        value: function (e) {
                            e.font = Ul.a.fontWeight + " " + Ul.a.fontSize + "px " + Ul.a.fontFamily, e.textAlign = Ul.a.xAxisTextAlign, e.textBaseline = Ul.a.xAxisTextBaseline, e.fillStyle = Ul.a.textColor
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.yAxisWidth, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "yAxisWidth"]));
                            return b.createElement(un, Gl({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                Xl = Object(ue.b)("priceChartStore")(Object(ue.c)(Zl)),
                Kl = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Ql = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Jl(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var es = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Jl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props.priceChartStore.yAxis,
                                i = m.a.product;
                            e.clearRect(0, 0, t, r), o.setTextStyle(e);
                            for (var a = i.quote.symbol, l = n.ticks, s = 0, c = l.length; s < c; s++) {
                                var u = l[s],
                                    d = n.toRange(u);
                                e.fillText("" + a + u.toLocaleString("en-US"), +Ul.a.yAxisLeftPadding, d)
                            }
                        }, Jl(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Ql(t, [{
                        key: "setTextStyle",
                        value: function (e) {
                            e.font = Ul.a.fontWeight + " " + Ul.a.fontSize + "px " + Ul.a.fontFamily, e.textAlign = Ul.a.yAxisTextAlign, e.textBaseline = Ul.a.yAxisTextBaseline, e.fillStyle = Ul.a.textColor
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore"]));
                            return b.createElement(un, Kl({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                ts = Object(ue.b)("priceChartStore")(Object(ue.c)(es)),
                rs = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                os = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function ns(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var is = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = ns(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.offsets = {
                            left: 0,
                            top: 0
                        }, o.onClick = function () {
                            var e = o.props,
                                t = e.priceChartStore,
                                r = t.yAxis,
                                n = t.mouse.y,
                                i = e.orderFormStore,
                                a = m.a.product,
                                l = i.type,
                                s = Number(r.toDomain(n));
                            if (s = s.toFixed(a.quote.precision), "stop" === l) return i.setStopPrice(s);
                            i.setType("limit"), i.setPrice(s)
                        }, o.onMouseOver = function (e) {
                            o.offsets = e.target.getBoundingClientRect()
                        }, o.onMouseMove = function (e) {
                            var t = o.props,
                                r = t.priceChartStore,
                                n = r.mouse,
                                i = r.xAxis,
                                a = r.candleWidth,
                                l = t.candlesStore,
                                s = o.offsets,
                                c = s.left,
                                u = s.top;
                            n.set({
                                x: e.clientX - c,
                                y: e.clientY - u
                            });
                            var d = i.toDomain(n.x + a),
                                f = l.bucket(d),
                                p = l.hash[f];
                            l.setSelected(p)
                        }, o.onMouseOut = function () {
                            var e = o.props,
                                t = e.priceChartStore.mouse,
                                r = e.candlesStore;
                            t.set(), r.setSelected(null)
                        }, ns(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), os(t, [{
                        key: "render",
                        value: function () {
                            return rs(cn, {
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                onMouseOver: this.onMouseOver,
                                onMouseMove: this.onMouseMove,
                                onMouseOut: this.onMouseOut,
                                onClick: this.onClick
                            })
                        }
                    }]), t
                }(),
                as = Object(ue.b)("candlesStore", "orderFormStore", "priceChartStore")(Object(ue.c)(is)),
                ls = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                ss = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function cs(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var us = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = cs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            e.clearRect(0, 0, t, r);
                            var n = o.props,
                                i = n.priceChartStore.mouse,
                                a = n.candlesStore.type;
                            if (i.active) {
                                e.strokeStyle = Ul.a.crosshairsColor, e.setLineDash([4, 4]);
                                var l = Ho(i.x),
                                    s = Ho(i.y);
                                e.beginPath(), e.moveTo(t, s), e.lineTo(0, s), "line" === a && (e.moveTo(l, r), e.lineTo(l, 0)), e.stroke()
                            }
                        }, cs(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ss(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.candlesStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "candlesStore"]));
                            return b.createElement(un, ls({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                ds = Object(ue.b)("priceChartStore", "candlesStore")(Object(ue.c)(us)),
                fs = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                ps = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function hs(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var bs = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = hs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.arrowWidth = 6, o.arrowHeight = 20, o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.priceChartStore,
                                a = i.mouse,
                                l = i.yAxis,
                                s = n.candlesStore.candles,
                                c = m.a.product;
                            if (e.clearRect(0, 0, t, r), s.length) {
                                var u = a.y,
                                    d = c.price_precision,
                                    f = void 0;
                                if (a.active) f = Number(l.toDomain(u)).toLocaleString("en-US", {
                                    minimumFractionDigits: d,
                                    maximumFractionDigits: d
                                });
                                else {
                                    var p = s[0].close;
                                    u = l.toRange(p), f = p.toLocaleString("en-US", {
                                        minimumFractionDigits: d,
                                        maximumFractionDigits: d
                                    })
                                }
                                var h = "" + c.quote.symbol + f,
                                    b = e.measureText(h).width,
                                    v = o,
                                    y = v.arrowWidth,
                                    g = 2 + y,
                                    w = v.arrowHeight / 2;
                                e.strokeStyle = Ul.a.priceArrowColor, e.fillStyle = Ul.a.priceArrowBackground, e.lineWidth = +Ul.a.priceArrowLineWidth, e.beginPath(), e.moveTo(g - y, u), e.lineTo(g, u - w), e.lineTo(g + b + 3, u - w), e.lineTo(g + b + 3, u + w), e.lineTo(g, u + w), e.lineTo(g - y, u), e.stroke(), e.fill(), o.setTextStyle(e), e.fillText(h, g, u)
                            }
                        }, hs(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ps(t, [{
                        key: "setTextStyle",
                        value: function (e) {
                            e.font = Ul.a.fontWeight + " " + Ul.a.fontSize + "px " + Ul.a.fontFamily, e.textAlign = Ul.a.yAxisTextAlign, e.textBaseline = Ul.a.yAxisTextBaseline, e.fillStyle = Ul.a.priceArrowColor
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.candlesStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "candlesStore"]));
                            return b.createElement(un, fs({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                vs = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)(bs)),
                ys = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                ms = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function gs(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var ws = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = gs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.priceChartStore.yAxis,
                                a = n.positionStore,
                                l = a.position,
                                s = a.hasPosition,
                                c = a.entryPrice,
                                u = a.callPrice,
                                d = m.a.product;
                            if (e.clearRect(0, 0, t, r), s) {
                                if (o.setTextStyle(e), e.setLineDash([7, 4]), !u.eq(0)) {
                                    var f = Ul.a.callPriceColor;
                                    e.strokeStyle = f, e.fillStyle = f;
                                    var p = i.toRange(+u);
                                    e.beginPath(), e.moveTo(0, p), e.lineTo(t, p), e.stroke();
                                    var h = d.quote.symbol;
                                    e.fillText("Call Price (" + h + u.toFixed(d.price_precision) + ")", 10, p + 2)
                                }
                                if (!c.eq(0)) {
                                    var b = "short" === l ? Ul.a.shortColor : Ul.a.longColor;
                                    e.strokeStyle = b, e.fillStyle = b;
                                    var v = i.toRange(+c);
                                    e.beginPath(), e.moveTo(0, v), e.lineTo(t, v), e.stroke();
                                    var y = d.quote.symbol;
                                    e.fillText("Entry Price (" + y + c.toFixed(d.price_precision) + ")", 10, v + 2)
                                }
                            }
                        }, gs(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ms(t, [{
                        key: "setTextStyle",
                        value: function (e) {
                            e.font = Ul.a.fontWeight + " " + Ul.a.positionFontSize + "px " + Ul.a.fontFamily, e.textAlign = Ul.a.positionTextAlign, e.textBaseline = Ul.a.positionTextBaseline
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.positionStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "positionStore"]));
                            return b.createElement(un, ys({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                _s = Object(ue.b)("positionStore", "priceChartStore")(Object(ue.c)(ws)),
                Os = r(1191),
                xs = r.n(Os),
                ks = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Cs = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Ss(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Ps = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Ss(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.candlesStore.candles,
                                a = n.priceChartStore,
                                l = a.xAxis,
                                s = a.volumeScale,
                                c = a.candleWidth;
                            e.clearRect(0, 0, t, r);
                            for (var u = 0, d = i.length; u < d; u++) {
                                var f = i[u];
                                e.fillStyle = f.close >= f.open ? xs.a.candleGreenColor : xs.a.candleRedColor;
                                var p = l.toRange(f.date),
                                    h = s.toRange(f.volume);
                                e.fillRect(p - c, h, c, r - h)
                            }
                        }, Ss(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Cs(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.candlesStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "candlesStore"]));
                            return b.createElement(un, ks({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                js = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)(Ps)),
                Ts = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                As = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Es(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var zs, Ms = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Es(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.priceChartStore,
                                a = i.xAxis,
                                l = i.yAxis,
                                s = n.candlesStore.candles;
                            if (s.length) {
                                e.clearRect(0, 0, t, r), e.lineWidth = +xs.a.lineWidth, e.strokeStyle = xs.a.lineColor, e.beginPath();
                                var c = l.toRange(s[0].close);
                                e.moveTo(t, c);
                                for (var u = 0, d = s.length; u < d; u++) {
                                    var f = s[u],
                                        p = a.toRange(f.date),
                                        h = l.toRange(f.close);
                                    e.lineTo(p, h)
                                }
                                c = l.toRange(s[s.length - 1].close), e.lineTo(0, c), e.stroke(), e.lineTo(0, r), e.lineTo(t, r);
                                var b = e.createLinearGradient(t / 2, 0, t / 2, r);
                                b.addColorStop(0, xs.a.lineGradientColor1), b.addColorStop(1, xs.a.lineGradientColor2), e.fillStyle = b, e.fill()
                            }
                        }, Es(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), As(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.candlesStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "candlesStore"]));
                            return b.createElement(un, Ts({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                Ns = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)(Ms)),
                Bs = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Rs = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var Ds = Object(ue.c)(zs = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Rs(t, [{
                        key: "render",
                        value: function () {
                            return Bs(sn, {}, void 0, b.createElement(js, this.props), b.createElement(Ns, this.props))
                        }
                    }]), t
                }()) || zs,
                Fs = r(1151),
                Ws = r.n(Fs),
                Ls = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Is = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function qs(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var $s = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = qs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.priceChartStore,
                                a = i.yAxis,
                                l = i.xAxis,
                                s = i.candleWidth,
                                c = n.candlesStore.candles;
                            e.clearRect(0, 0, t, r);
                            for (var u = 0, d = c.length; u < d; u++) {
                                var f = c[u],
                                    p = f.close >= f.open ? "green" : "red",
                                    h = l.toRange(f.date),
                                    b = a.toRange(f.high),
                                    v = a.toRange(f.low),
                                    y = a.toRange(f.open),
                                    m = a.toRange(f.close);
                                e.strokeStyle = "green" === p ? Ws.a.candleGreenColor : Ws.a.candleRedColor, e.fillStyle = "green" === p ? Ws.a.candleGreenBackground : Ws.a.candleRedBackground, e.beginPath(), e.rect(h - s, Math.min(y, m), s, Math.abs(m - y)), e.fill();
                                var g = h - s / 2;
                                e.moveTo(g, Math.min(y, m)), e.lineTo(g, b), e.moveTo(g, Math.max(y, m)), e.lineTo(g, v), e.stroke()
                            }
                        }, qs(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Is(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.candlesStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "candlesStore"]));
                            return b.createElement(un, Ls({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                Hs = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)($s)),
                Us = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Gs = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Ys(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Vs = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Ys(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.candlesStore.candles,
                                a = n.priceChartStore,
                                l = a.xAxis,
                                s = a.volumeScale,
                                c = a.candleWidth;
                            e.clearRect(0, 0, t, r), e.fillStyle = Ws.a.volumeColor;
                            for (var u = 0, d = i.length; u < d; u++) {
                                var f = i[u],
                                    p = l.toRange(f.date),
                                    h = s.toRange(f.volume);
                                e.fillRect(p - c, h, c, r - h)
                            }
                        }, Ys(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Gs(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.candlesStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "candlesStore"]));
                            return b.createElement(un, Us({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                Zs = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)(Vs)),
                Xs = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Ks = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Qs(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Js = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Qs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props.priceChartStore,
                                i = n.xAxis,
                                a = n.yAxis,
                                l = n.candleWidth,
                                s = n.emas;
                            e.clearRect(0, 0, t, r), Object.keys(s).forEach(function (t, r) {
                                var o = s[t],
                                    n = o.show,
                                    c = o.data;
                                if (n) {
                                    e.lineWidth = +Ws.a.emaLineWidth, e.strokeStyle = Ws.a["emaColor" + (r + 1)] || "#fff", e.beginPath();
                                    for (var u = 0, d = c.length; u < d; u++) {
                                        var f = c[u].candle,
                                            p = i.toRange(f.date) - l / 2,
                                            h = a.toRange(c[u].ema);
                                        u ? e.lineTo(p, h) : e.moveTo(p, h)
                                    }
                                    e.stroke()
                                }
                            })
                        }, Qs(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Ks(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore"]));
                            return b.createElement(un, Xs({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                ec = Object(ue.b)("priceChartStore")(Object(ue.c)(Js)),
                tc = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                rc = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function oc(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var nc, ic = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = oc(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props,
                                i = n.candlesStore.selected,
                                a = n.priceChartStore,
                                l = a.xAxis,
                                s = a.yAxis,
                                c = a.volumeScale,
                                u = a.candleWidth;
                            if (e.clearRect(0, 0, t, r), i) {
                                e.fillStyle = Ws.a.highlightVolumeColor;
                                var d = l.toRange(i.date);
                                e.fillStyle = "rgba(255,255,255, 0.05)", e.fillRect(d - u, 0, u, r);
                                var f = c.toRange(i.volume);
                                e.fillRect(d - u, f, u, r - f);
                                var p = s.toRange(i.high),
                                    h = s.toRange(i.low),
                                    b = s.toRange(i.open),
                                    v = s.toRange(i.close),
                                    y = i.close >= i.open ? "green" : "red";
                                e.strokeStyle = "green" === y ? Ws.a.highlightGreenColor : Ws.a.highlightRedColor, e.fillStyle = "green" === y ? Ws.a.candleGreenBackground : Ws.a.highlightRedColor, e.beginPath(), e.rect(d - u, Math.min(b, v), u, Math.abs(v - b)), e.fill();
                                var m = d - u / 2;
                                e.moveTo(m, Math.min(b, v)), e.lineTo(m, p), e.moveTo(m, Math.max(b, v)), e.lineTo(m, h), e.stroke()
                            }
                        }, oc(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), rc(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.priceChartStore, e.candlesStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["priceChartStore", "candlesStore"]));
                            return b.createElement(un, tc({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                ac = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)(ic)),
                lc = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                sc = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var cc = Object(ue.c)(nc = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), sc(t, [{
                        key: "render",
                        value: function () {
                            return lc(sn, {}, void 0, b.createElement(Zs, this.props), b.createElement(ec, this.props), b.createElement(Hs, this.props), b.createElement(ac, this.props))
                        }
                    }]), t
                }()) || nc,
                uc = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                dc = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function fc(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var pc, hc, bc, vc, yc, mc, gc, wc, _c, Oc, xc, kc, Cc, Sc = me.a.bind(Ul.a),
                Pc = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = fc(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.xAxisHeight = 24, o.yAxisWidth = 0, o.height = 0, o.width = 0, o.onSize = function (e, t) {
                            o.width = e, o.height = t, o.adjustRanges()
                        }, o.adjustRanges = function () {
                            var e = o.props,
                                t = e.priceChartStore,
                                r = t.yAxis,
                                n = t.xAxis,
                                i = t.volumeScale,
                                a = e.candlesStore,
                                l = a.type,
                                s = a.maxCandles,
                                c = o,
                                u = c.height,
                                d = c.width;
                            if (u && d) {
                                u -= o.xAxisHeight, d -= o.yAxisWidth;
                                var f = 1;
                                f = "line" === l ? 1 : 3;
                                var p = Math.floor((d - f * (s - 1)) / (s + 1));
                                p = Math.max(p, 1);
                                r.numTicks = Math.floor(u / 50), r.range = {
                                    min: u,
                                    max: 10
                                };
                                n.numTicks = Math.floor(d / 75), n.range = {
                                    min: 0,
                                    max: d - p / 2
                                }, i.range = {
                                    min: u,
                                    max: 2 * u / 3
                                }, o.props.priceChartStore.setCandleWidth(p)
                            }
                        }, fc(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), dc(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props.candlesStore,
                                t = e.loading,
                                r = e.candles,
                                o = void 0;
                            return o = t ? uc("div", {
                                className: Sc("center")
                            }, void 0, uc(Rt.a, {
                                height: 34,
                                opacity: .25
                            })) : r && r.length ? this.chartContent : uc("div", {
                                className: Sc("center", "message")
                            }, void 0, "Unable to load chart data"), uc("div", {
                                className: Sc("price-chart")
                            }, void 0, uc($l, {}), o)
                        }
                    }, {
                        key: "chartContent",
                        get: function () {
                            var e = this.props,
                                t = e.redraw,
                                r = e.candlesStore.type,
                                o = e.priceChartStore.yAxis,
                                n = m.a.product,
                                i = 0;
                            if (o.domain.max) {
                                var a = Ul.a.fontWeight + " " + Ul.a.fontSize + "px " + Ul.a.fontFamily,
                                    l = function (e, t) {
                                        return $o ? (t && ($o.font = t), $o.measureText(e)) : null
                                    }("" + n.quote.symbol + Number(o.domain.max).toFixed(n.price_precision), a);
                                l && (i = l.width)
                            }
                            this.yAxisWidth = i + Number(Ul.a.yAxisLeftPadding) + Number(Ul.a.yAxisRightPadding), this.adjustRanges();
                            var s = void 0;
                            return "candle" === r && (s = uc(cc, {
                                right: this.yAxisWidth,
                                bottom: this.xAxisHeight
                            })), "line" === r && (s = uc(Ds, {
                                right: this.yAxisWidth,
                                bottom: this.xAxisHeight
                            })), uc(sn, {
                                className: Sc("container"),
                                redraw: t,
                                onSize: this.onSize
                            }, void 0, uc(Xl, {
                                top: -this.xAxisHeight,
                                yAxisWidth: this.yAxisWidth
                            }), uc(ts, {
                                left: -this.yAxisWidth
                            }), s, uc(_s, {}), uc(ds, {}), uc(vs, {
                                left: -this.yAxisWidth - 2
                            }), uc(as, {}))
                        }
                    }]), t
                }(),
                jc = Object(ue.b)("candlesStore", "priceChartStore")(Object(ue.c)(Pc)),
                Tc = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Ac(e) {
                return function () {
                    var t = e.apply(this, arguments);
                    return new Promise(function (e, r) {
                        return function o(n, i) {
                            try {
                                var a = t[n](i),
                                    l = a.value
                            } catch (e) {
                                return void r(e)
                            }
                            if (!a.done) return Promise.resolve(l).then(function (e) {
                                o("next", e)
                            }, function (e) {
                                o("throw", e)
                            });
                            e(l)
                        }("next")
                    })
                }
            }

            function Ec(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function zc(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var Mc, Nc, Bc = "candles-store-type",
                Rc = {
                    "1m": Hn.c,
                    "5m": 5 * Hn.c,
                    "15m": 15 * Hn.c,
                    "30m": 30 * Hn.c,
                    "1h": 1 * Hn.b,
                    "4h": 4 * Hn.b,
                    "6h": 6 * Hn.b,
                    "1d": Hn.a,
                    "7d": 7 * Hn.a,
                    "14d": 14 * Hn.a,
                    "30d": 30 * Hn.a
                },
                Dc = {
                    "30m": Hn.c,
                    "1h": 2 * Hn.c,
                    "6h": 15 * Hn.c,
                    "1d": Hn.b,
                    "7d": 6 * Hn.b,
                    "14d": 12 * Hn.b,
                    "30d": Hn.a
                },
                Fc = (pc = function (e) {
                    function t() {
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        var e = function (e, t) {
                            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                            return !t || "object" != typeof t && "function" != typeof t ? e : t
                        }(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                        Ec(e, "type", hc, e), Ec(e, "duration", bc, e), Ec(e, "candles", vc, e), Ec(e, "data", yc, e), Ec(e, "end", mc, e), Ec(e, "selected", gc, e), e.hash = {}, e.disposers = [], e.hidden = function () {
                            e.lastPrice = null
                        }, e.visible = function () {
                            e.fetch()
                        }, Ec(e, "updateTimer", wc, e), Ec(e, "onMatchesMsg", _c, e), Ec(e, "onLastMatchMsg", Oc, e), Ec(e, "applyMatch", xc, e), Ec(e, "setType", kc, e), Ec(e, "setDuration", Cc, e);
                        var r = we.a.getItem(Bc);
                        return "candle" === r || "line" === r ? e.setType(r) : e.setType("candle"), e
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, No["a"]), Tc(t, [{
                        key: "bucket",
                        value: function (e) {
                            var t = e instanceof Date ? e.getTime() : e;
                            return t - t % this.granularity
                        }
                    }, {
                        key: "feedSubscriptions",
                        get: function () {
                            return Y.a.hidden || !m.a.product ? [] : [{
                                name: "matches",
                                product_ids: [m.a.product.id]
                            }]
                        }
                    }, {
                        key: "durationMS",
                        get: function () {
                            return Rc[this.duration]
                        }
                    }, {
                        key: "granularity",
                        get: function () {
                            return "line" === this.type ? Dc[this.duration] / 10 : this.durationMS
                        }
                    }, {
                        key: "start",
                        get: function () {
                            var e = this.type,
                                t = this.end.getTime();
                            return "line" === e ? new Date(t - this.durationMS) : new Date(t - this.maxCandles * this.durationMS)
                        }
                    }, {
                        key: "maxCandles",
                        get: function () {
                            return "line" === this.type ? (this.end.getTime() - this.start.getTime()) / Dc[this.duration] * 10 : 60
                        }
                    }]), Tc(t, [{
                        key: "subscribe",
                        value: function () {
                            var e = this;
                            this.updateTimer(), Z.default.addSubscriber(this), this.disposers.push(Object(C.observe)(m.a, "product", function () {
                                e.lastPrice = null, e.fetch()
                            })), this.disposers.push(Object(C.observe)(Z.default, "connected", function () {
                                e.lastPrice = null
                            }))
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            Object(V.b)(this.timer), Z.default.removeSubscriber(this), this.disposers.forEach(function (e) {
                                return e()
                            }), this.disposers = []
                        }
                    }, {
                        key: "_fetch",
                        value: function () {
                            var e = this.type;
                            return this.data.clear(), this.candles.clear(), "line" === e ? this.loadLineData() : this.loadCandleData()
                        }
                    }, {
                        key: "loadLineData",
                        value: function () {
                            var e = Ac(regeneratorRuntime.mark(function e() {
                                var t, r, o, n;
                                return regeneratorRuntime.wrap(function (e) {
                                    for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (t = m.a.product) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 3:
                                        return r = t.id, this.end = new Date(this.bucket(Date.now())), o = {
                                            granularity: this.granularity / 1e3,
                                            start: this.start.toISOString(),
                                            end: (new Date).toISOString()
                                        }, e.next = 8, t.candles(o);
                                    case 8:
                                        n = e.sent, t.id === r && this.setCandles(n);
                                    case 10:
                                    case "end":
                                        return e.stop()
                                    }
                                }, e, this)
                            }));
                            return function () {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "loadCandleData",
                        value: function () {
                            var e = Ac(regeneratorRuntime.mark(function e() {
                                var t, r, o;
                                return regeneratorRuntime.wrap(function (e) {
                                    for (;;) switch (e.prev = e.next) {
                                    case 0:
                                        if (t = m.a.product) {
                                            e.next = 3;
                                            break
                                        }
                                        return e.abrupt("return");
                                    case 3:
                                        return r = t.id, this.end = new Date(this.bucket(Date.now())), e.next = 7, t.cachedCandles(this.duration);
                                    case 7:
                                        o = e.sent, t.id === r && this.setCandles(o);
                                    case 9:
                                    case "end":
                                        return e.stop()
                                    }
                                }, e, this)
                            }));
                            return function () {
                                return e.apply(this, arguments)
                            }
                        }()
                    }, {
                        key: "setCandles",
                        value: function (e) {
                            if (this.lastPrice && e.length) {
                                var t = e[0];
                                t.close = this.lastPrice, t.high = Math.max(t.high, this.lastPrice || -1 / 0), t.low = Math.min(t.low, this.lastPrice || 1 / 0)
                            }
                            this.data = e, this.candles.replace(e.slice(0, this.maxCandles)), this.hash = this.candles.reduce(function (e, t) {
                                return e[t.date.getTime()] = t, e
                            }, {}), this.updateTimer()
                        }
                    }, {
                        key: "setSelected",
                        value: function (e) {
                            this.selected = e
                        }
                    }]), t
                }(), hc = zc(pc.prototype, "type", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return "candle"
                    }
                }), bc = zc(pc.prototype, "duration", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return "5m"
                    }
                }), vc = zc(pc.prototype, "candles", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return []
                    }
                }), yc = zc(pc.prototype, "data", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return []
                    }
                }), mc = zc(pc.prototype, "end", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return new Date
                    }
                }), gc = zc(pc.prototype, "selected", [C.observable], {
                    enumerable: !0,
                    initializer: null
                }), zc(pc.prototype, "feedSubscriptions", [C.computed], Object.getOwnPropertyDescriptor(pc.prototype, "feedSubscriptions"), pc.prototype), zc(pc.prototype, "durationMS", [C.computed], Object.getOwnPropertyDescriptor(pc.prototype, "durationMS"), pc.prototype), zc(pc.prototype, "granularity", [C.computed], Object.getOwnPropertyDescriptor(pc.prototype, "granularity"), pc.prototype), zc(pc.prototype, "start", [C.computed], Object.getOwnPropertyDescriptor(pc.prototype, "start"), pc.prototype), zc(pc.prototype, "maxCandles", [C.computed], Object.getOwnPropertyDescriptor(pc.prototype, "maxCandles"), pc.prototype), wc = zc(pc.prototype, "updateTimer", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            var t = e.granularity - Date.now() % e.granularity;
                            e.timer && Object(V.b)(e.timer), e.timer = Object(V.e)(function () {
                                Object(C.runInAction)(function () {
                                    e.end = new Date(e.bucket(Date.now()));
                                    for (var t = e.bucket(e.start), r = 0, o = 0, n = e.candles.length; o < n; o++) {
                                        var i = e.bucket(e.candles[n - 1 - o].date);
                                        if (i >= t) break;
                                        delete e.hash[i], r += 1
                                    }
                                    e.candles.splice(e.candles.length - r, r)
                                }), e.updateTimer()
                            }, t)
                        }
                    }
                }), _c = zc(pc.prototype, "onMatchesMsg", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            if (!e.loading) {
                                for (var r = t.batched, o = 0, n = r.length; o < n; o++) e.applyMatch(r[o]);
                                e.candles.replace(e.candles)
                            }
                        }
                    }
                }), Oc = zc(pc.prototype, "onLastMatchMsg", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            e.lastPrice = +t.price
                        }
                    }
                }), xc = zc(pc.prototype, "applyMatch", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            var r = +t.price,
                                o = new Date(t.time).getTime(),
                                n = +t.size,
                                i = e.bucket(o),
                                a = e.hash[i];
                            a ? (a.high = Math.max(a.high, r), a.low = Math.min(a.low, r), a.close = r, a.volume += n) : (a = new j.c({
                                date: new Date(i),
                                low: r,
                                high: r,
                                open: r,
                                close: r,
                                volume: n
                            }), e.candles.unshift(a), e.data.unshift(a)), e.hash[i] = a, e.lastPrice = r
                        }
                    }
                }), kc = zc(pc.prototype, "setType", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            if (we.a.setItem(Bc, t), e.type = t, "candle" === e.type) {
                                var r = we.a.getItem("candles-store-candle-duration");
                                e.setDuration(r || "5m")
                            } else {
                                var o = we.a.getItem("candles-store-line-duration");
                                e.setDuration(o || "1d")
                            }
                        }
                    }
                }), Cc = zc(pc.prototype, "setDuration", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            "candle" === e.type ? we.a.setItem("candles-store-candle-duration", t) : "line" === e.type && we.a.setItem("candles-store-line-duration", t), e.duration = t, e.fetch()
                        }
                    }
                }), zc(pc.prototype, "_fetch", [C.action], Object.getOwnPropertyDescriptor(pc.prototype, "_fetch"), pc.prototype), zc(pc.prototype, "loadLineData", [C.action], Object.getOwnPropertyDescriptor(pc.prototype, "loadLineData"), pc.prototype), zc(pc.prototype, "loadCandleData", [C.action], Object.getOwnPropertyDescriptor(pc.prototype, "loadCandleData"), pc.prototype), zc(pc.prototype, "setCandles", [C.action], Object.getOwnPropertyDescriptor(pc.prototype, "setCandles"), pc.prototype), zc(pc.prototype, "setSelected", [C.action], Object.getOwnPropertyDescriptor(pc.prototype, "setSelected"), pc.prototype), pc),
                Wc = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Lc(e) {
                if (Array.isArray(e)) {
                    for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
                    return r
                }
                return Array.from(e)
            }

            function Ic(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var qc = (Mc = function () {
                    function e(t) {
                        var r, o, n, i, a = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), r = this, o = "candleWidth", i = this, (n = Nc) && Object.defineProperty(r, o, {
                            enumerable: n.enumerable,
                            configurable: n.configurable,
                            writable: n.writable,
                            value: n.initializer ? n.initializer.call(i) : void 0
                        }), this.emas = {}, this.updateTime = function () {
                            var e = a.candlesStore,
                                t = e.start,
                                r = e.end;
                            a.xAxis.domain = {
                                min: t,
                                max: r
                            }
                        }, this.updateCandles = function () {
                            var e = a.candlesStore,
                                t = e.candles,
                                r = e.data,
                                o = e.type,
                                n = e.maxCandles,
                                i = a.volumeScale,
                                l = a.yAxis;
                            t.length && (l.domain = {
                                min: Math.min.apply(Math, Lc(t.map(function (e) {
                                    return e.low
                                }))),
                                max: Math.max.apply(Math, Lc(t.map(function (e) {
                                    return e.high
                                })))
                            }, i.domain = {
                                min: 0,
                                max: Math.max.apply(Math, Lc(t.map(function (e) {
                                    return e.volume
                                })))
                            }, "candle" === o && Object.keys(a.emas).forEach(function (e) {
                                var t = a.emas[e],
                                    o = Math.min(r.length, n + t.periods);
                                t.update(r.slice(0, o).reverse())
                            }))
                        }, this.candlesStore = t, this.yAxis = new ai({
                            reformat: !0
                        }), this.xAxis = new ai, this.mouse = new qi, this.volumeScale = new Zn, this.emas = {
                            12: new xi(12),
                            26: new xi(26)
                        }
                    }
                    return Wc(e, [{
                        key: "subscribe",
                        value: function () {
                            this.candlesDisposer = Object(C.observe)(this.candlesStore.candles, this.updateCandles), this.timeDisposer = Object(C.observe)(this.candlesStore, "end", this.updateTime), this.updateTime(), this.updateCandles()
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            this.candlesDisposer && this.candlesDisposer(), this.timeDisposer && this.timeDisposer()
                        }
                    }, {
                        key: "setCandleWidth",
                        value: function (e) {
                            this.candleWidth = e
                        }
                    }]), e
                }(), Nc = Ic(Mc.prototype, "candleWidth", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), Ic(Mc.prototype, "setCandleWidth", [C.action], Object.getOwnPropertyDescriptor(Mc.prototype, "setCandleWidth"), Mc.prototype), Mc),
                $c = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Hc = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Uc(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Gc = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Uc(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.candlesStore = new Fc, o.priceChartStore = new qc(o.candlesStore), Uc(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["PureComponent"]), Hc(t, [{
                        key: "render",
                        value: function () {
                            return $c(y.a, {
                                candlesStore: this.candlesStore,
                                priceChartStore: this.priceChartStore
                            }, void 0, $c(jc, {}))
                        }
                    }]), t
                }(),
                Yc = function () {
                    return function (e, t) {
                        if (Array.isArray(e)) return e;
                        if (Symbol.iterator in Object(e)) return function (e, t) {
                            var r = [],
                                o = !0,
                                n = !1,
                                i = void 0;
                            try {
                                for (var a, l = e[Symbol.iterator](); !(o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                            } catch (e) {
                                n = !0, i = e
                            } finally {
                                try {
                                    !o && l.return && l.return()
                                } finally {
                                    if (n) throw i
                                }
                            }
                            return r
                        }(e, t);
                        throw new TypeError("Invalid attempt to destructure non-iterable instance")
                    }
                }();
            new function e(t) {
                var r = this;
                ! function (e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                }(this, e), this.eventListener = function (e) {
                    var t = e.data,
                        o = t.type,
                        n = t.product_id,
                        i = r.product_id !== n;
                    if (r.product_id = n, "init" === o) {
                        var a = t.data,
                            l = a.asks,
                            s = a.bids;
                        return r.manager = new yo.a, r.manager.init(s, l), void r.sendDepth(n, !0)
                    }
                    if ("l2update" === o) {
                        var c = t.data && t.data.changes;
                        if (!r.manager || !Array.isArray(c)) return;
                        return c.forEach(function (e) {
                            var t = Yc(e, 3),
                                o = t[0],
                                n = t[1],
                                i = t[2];
                            return r.manager.set_level(o, n, i)
                        }), void r.sendDepth(n)
                    }
                    if ("depth zoom" === o) {
                        if (r.zoom = t.data, i) return;
                        r.sendDepth(n, !0)
                    }
                }, this.sendDepth = function (e, t) {
                    (t || !r.timer) && r.manager && r.zoom && (t && (r.timer && clearTimeout(r.timer), r.send(e)), r.timer = setTimeout(function () {
                        r.timer = null, r.send(e)
                    }, 500))
                }, this.send = function (e) {
                    if (r.product_id === e) {
                        var t = r.buildDepth();
                        t && r.context.postMessage({
                            depth: t,
                            product_id: e
                        }, [t.asksData.buffer, t.bidsData.buffer])
                    }
                }, this.buildDepth = function () {
                    var e = r.manager.snapshot(),
                        t = e.asks,
                        o = e.bids,
                        n = o[0],
                        i = t[0];
                    if (!n || !i) return null;
                    var a = +i[0].add(n[0]).div(2),
                        l = t[t.length - 1],
                        s = o[o.length - 1],
                        c = Math.min(Number(l[0].sub(a).abs()), Number(s[0].sub(a).abs())) * (r.zoom / 100),
                        u = r.buildDepthData(t, P()(a + c), !1),
                        d = r.buildDepthData(o, P()(a - c), !0);
                    return {
                        midprice: a,
                        asksData: u,
                        bidsData: d,
                        maxSize: Math.max(u[u.length - 2], d[d.length - 2]),
                        worstBid: Math.max(a - c, 0),
                        worstAsk: a + c
                    }
                }, this.buildDepthData = function (e, t, r) {
                    for (var o = [], n = P()(0), i = P()(0), a = r ? t.gt.bind(t) : t.lt.bind(t), l = 0, s = e.length; l < s; l++) {
                        var c = Yc(e[l], 2),
                            u = c[0],
                            d = c[1];
                        if (a(u)) break;
                        i = i.add(d), n = n.add(d.mul(u)), o.push([+u, +i, +n])
                    }
                    for (var f = new Float32Array(3 * o.length + 3), p = 0; p < o.length; p++) f.set(o[p], 3 * p);
                    return f[f.length - 3] = +t, f[f.length - 2] = f[f.length - 5], f[f.length - 1] = f[f.length - 4], f
                }, this.context = t, t.addEventListener("message", this.eventListener)
            }(self);
            var Vc, Zc, Xc, Kc, Qc, Jc, eu, tu, ru, ou, nu, iu, au, lu, su, cu, uu = r(1258),
                du = r.n(uu),
                fu = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function pu(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function hu(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var bu = [.5, 1, 2, 5, 10, 25, 50, 75],
                vu = (Vc = C.observable.ref, Zc = C.observable.ref, Xc = function () {
                    function e() {
                        var t = this;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, e), pu(this, "loading", Kc, this), pu(this, "midprice", Qc, this), pu(this, "worstAsk", Jc, this), pu(this, "worstBid", eu, this), pu(this, "maxSize", tu, this), pu(this, "asksData", ru, this), pu(this, "bidsData", ou, this), pu(this, "zoomIdx", nu, this), pu(this, "_onWorkerMessage", iu, this), pu(this, "visible", au, this), this.onSnapshotMsg = function (e) {
                            var r = e.asks,
                                o = e.bids;
                            t._sendToWorker("init", {
                                asks: r,
                                bids: o
                            })
                        }, this.onL2UpdateMsg = function (e) {
                            t._sendToWorker("l2update", e)
                        }, pu(this, "zoomIn", lu, this), pu(this, "zoomOut", su, this), pu(this, "resetZoom", cu, this)
                    }
                    return fu(e, [{
                        key: "subscribe",
                        value: function () {
                            Z.default.addSubscriber(this), this.worker = new du.a, this.worker.addEventListener("message", this._onWorkerMessage), A.h.loading || this._sendToWorker("init", JSON.parse(JSON.stringify({
                                asks: A.h.asks,
                                bids: A.h.bids
                            }))), this.sendZoom()
                        }
                    }, {
                        key: "unsubscribe",
                        value: function () {
                            Z.default.removeSubscriber(this);
                            var e = this.worker;
                            e && (e.removeEventListener("message", this._onWorkerMessage), e.terminate()), this.worker = null
                        }
                    }, {
                        key: "_sendToWorker",
                        value: function (e, t) {
                            var r = m.a.product;
                            r && this.worker && this.worker.postMessage({
                                type: e,
                                data: t,
                                product_id: r.id
                            })
                        }
                    }, {
                        key: "sendZoom",
                        value: function () {
                            m.a.product && this._sendToWorker("depth zoom", bu[this.zoomIdx])
                        }
                    }, {
                        key: "setLoading",
                        value: function () {
                            this.loading = !0
                        }
                    }, {
                        key: "feedSubscriptions",
                        get: function () {
                            return Y.a.hidden || !m.a.product ? [] : [{
                                name: "level2_50",
                                product_ids: [m.a.product.id]
                            }]
                        }
                    }]), e
                }(), Kc = hu(Xc.prototype, "loading", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return !0
                    }
                }), Qc = hu(Xc.prototype, "midprice", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), Jc = hu(Xc.prototype, "worstAsk", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), eu = hu(Xc.prototype, "worstBid", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), tu = hu(Xc.prototype, "maxSize", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 0
                    }
                }), ru = hu(Xc.prototype, "asksData", [Vc], {
                    enumerable: !0,
                    initializer: function () {
                        return new Float32Array(0)
                    }
                }), ou = hu(Xc.prototype, "bidsData", [Zc], {
                    enumerable: !0,
                    initializer: function () {
                        return new Float32Array(0)
                    }
                }), nu = hu(Xc.prototype, "zoomIdx", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return 2
                    }
                }), hu(Xc.prototype, "feedSubscriptions", [C.computed], Object.getOwnPropertyDescriptor(Xc.prototype, "feedSubscriptions"), Xc.prototype), iu = hu(Xc.prototype, "_onWorkerMessage", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            var r = m.a.product,
                                o = t.data,
                                n = o.product_id,
                                i = o.depth;
                            i && r && r.id === n && (e.loading = !1, Object(C.extendShallowObservable)(e, i))
                        }
                    }
                }), au = hu(Xc.prototype, "visible", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.loading = !0
                        }
                    }
                }), hu(Xc.prototype, "sendZoom", [C.action], Object.getOwnPropertyDescriptor(Xc.prototype, "sendZoom"), Xc.prototype), lu = hu(Xc.prototype, "zoomIn", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.zoomIdx - 1 < 0 || (e.zoomIdx -= 1, e.sendZoom())
                        }
                    }
                }), su = hu(Xc.prototype, "zoomOut", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.zoomIdx + 1 > bu.length || (e.zoomIdx += 1, e.sendZoom())
                        }
                    }
                }), cu = hu(Xc.prototype, "resetZoom", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function () {
                            e.zoomIdx = 2, e.sendZoom()
                        }
                    }
                }), hu(Xc.prototype, "setLoading", [C.action], Object.getOwnPropertyDescriptor(Xc.prototype, "setLoading"), Xc.prototype), Xc),
                yu = r(1257),
                mu = r.n(yu),
                gu = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                wu = me.a.bind(mu.a),
                _u = Object(ue.b)("depthStore")(Object(ue.c)(function (e) {
                    var t = e.depthStore,
                        r = t.midprice,
                        o = t.zoomIdx,
                        n = t.zoomIn,
                        i = t.zoomOut;
                    return gu("div", {
                        className: wu("controls")
                    }, void 0, gu("button", {
                        className: wu("zoomOut"),
                        onClick: i,
                        disabled: o + 1 >= bu.length
                    }), gu("div", {
                        className: wu("midpriceWrapper")
                    }, void 0, gu(mt.a, {
                        value: r,
                        precision: m.a.product.price_precision + 1,
                        className: wu("midprice")
                    }), "Mid Market Price"), gu("button", {
                        className: wu("zoomIn"),
                        onClick: n,
                        disabled: o <= 0
                    }))
                }));

            function Ou(e, t) {
                return function (r) {
                    return t - r / e * t * .9
                }
            }

            function xu(e, t, r) {
                for (var o = t - e, n = o / r, i = Math.log(n) / Math.log(10), a = i < 0 ? Math.floor(i) : Math.ceil(i), l = Math.pow(10, a), s = Math.floor(o / l); s < r;) a -= 1, l = Math.pow(10, a), s = Math.floor(o / l);
                var c = Math.floor(s / r) * l;
                return {
                    initial: Math.ceil(e / l) * l,
                    unitStepWidth: c,
                    precision: a < 0 ? -a : 0
                }
            }

            function ku(e, t, r, o, n) {
                e.beginPath(), e.moveTo(t, r), e.lineTo(t + o, r + n), e.stroke()
            }
            var Cu = r(1145),
                Su = r.n(Cu),
                Pu = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                ju = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Tu(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Au = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Tu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props.depthStore,
                                i = n.worstBid,
                                a = n.worstAsk,
                                l = m.a.product.quote;
                            e.clearRect(0, 0, t, r);
                            var s = a - i;
                            e.lineWidth = 1, e.strokeStyle = Su.a.lineColor, e.fillStyle = Su.a.textColor, e.font = "bold 10px sans-serif", e.textBaseline = "top", e.textAlign = "center", ku(e, 0, 0, t, 0);
                            for (var c = Math.floor(t / 100), u = xu(i, a, c), d = u.initial, f = u.unitStepWidth, p = u.precision, h = d; h < a; h += f) {
                                var b = (h - i) * t / s;
                                ku(e, b, 0, 0, 7);
                                var v = l.symbol + Object(ol.a)(h.toFixed(p));
                                e.fillText(v, b, 8)
                            }
                        }, Tu(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ju(t, [{
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.depthStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["depthStore"]));
                            return b.createElement(un, Pu({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                Eu = Object(ue.b)("depthStore")(Object(ue.c)(Au)),
                zu = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                Mu = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Nu(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Bu = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Nu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props.depthStore.maxSize,
                                i = r - 5;
                            e.clearRect(0, 0, t, r), e.lineWidth = 1, e.strokeStyle = Su.a.lineColor, e.fillStyle = Su.a.textColor, e.font = "10px sans-serif", ku(e, Math.floor(t / 2), 100, 0, i - 100);
                            var a = function (e) {
                                    return i - e * i / n
                                },
                                l = Math.floor(i / 50),
                                s = xu(0, n, l),
                                c = s.initial,
                                u = s.unitStepWidth,
                                d = (i - 5) * n / i;
                            o.drawYAxis(e, c, u, d, a, t, "left"), o.drawYAxis(e, c, u, d, a, t, "right")
                        }, Nu(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Mu(t, [{
                        key: "drawYAxis",
                        value: function (e, t, r, o, n, i, a) {
                            var l, s = "left" === a ? 0 : i,
                                c = "left" === a ? 1 : -1;
                            e.textBaseline = "middle", e.textAlign = a;
                            for (var u = t; u < o; u += r) {
                                var d = n(u);
                                ku(e, s, d, 6 * c, 0);
                                var f = (l = u) > 1e6 ? (l / 1e6).toString() + "M" : l > 1e3 ? (l / 1e3).toString() + "k" : l.toString();
                                e.fillText(f, s + 8 * c, d)
                            }
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.depthStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["depthStore"]));
                            return b.createElement(un, zu({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                Ru = Object(ue.b)("depthStore")(Object(ue.c)(Bu)),
                Du = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Fu = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Wu(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Lu, Iu = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Wu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r, n) {
                            t.clearRect(0, 0, r, n);
                            var i = Math.floor(n / 2),
                                a = r / 2;
                            t.strokeStyle = "buy" === e.side ? Su.a.bidsStrokeStyle : Su.a.asksStrokeStyle, t.beginPath(), t.moveTo(a - 5, i), t.lineTo(a, i - 5), t.lineTo(a + 5, i), t.lineTo(a, i + 5), t.closePath(), t.stroke(), o.props.ordersStore.selected === e && (t.fillStyle = t.strokeStyle, t.fill())
                        }, Wu(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Fu(t, [{
                        key: "render",
                        value: function () {
                            var e = this,
                                t = this.props,
                                r = t.width,
                                o = t.height,
                                n = t.top,
                                i = t.bottom,
                                a = t.ordersStore,
                                l = t.depthStore,
                                s = l.worstBid,
                                c = l.worstAsk,
                                u = a.models.filter(function (e) {
                                    var t = e.price || e.stop_price;
                                    return e.active && t && t.gte(s) && t.lte(c)
                                });
                            return Du("div", {}, void 0, u.map(function (t) {
                                var l = function (e) {
                                    return Math.floor(r * ((Number(e.price || e.stop_price) - s) / (c - s)))
                                }(t);
                                return Du(un, {
                                    onMouseEnter: function () {
                                        return a.selectOrder(t)
                                    }, onMouseLeave: function () {
                                        return a.selectOrder(null)
                                    }, height: o,
                                    width: r,
                                    top: n,
                                    bottom: i,
                                    left: l,
                                    right: -l - 10,
                                    draw: function (r, o, n) {
                                        return e.draw(t, r, o, n)
                                    }
                                }, t.id)
                            }))
                        }
                    }]), t
                }(),
                qu = Object(ue.b)("depthStore", "ordersStore")(Object(ue.c)(Iu)),
                $u = r(1254),
                Hu = r.n($u),
                Uu = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Gu = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Yu(e, t, r) {
                return t in e ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                }) : e[t] = r, e
            }
            var Vu, Zu = me.a.bind(Hu.a),
                Xu = Object(ue.c)(Lu = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Gu(t, [{
                        key: "render",
                        value: function () {
                            var e, t = this.props,
                                r = t.data,
                                o = r.value,
                                n = r.sum,
                                i = r.amount,
                                a = r.x,
                                l = r.y,
                                s = r.isBid,
                                c = t.width,
                                u = t.height,
                                d = m.a.product;
                            if (d) {
                                var f = d.base,
                                    p = d.quote,
                                    h = l > u / 2;
                                return Uu("div", {
                                    className: Zu("chart-hover", {
                                        isBid: s
                                    }),
                                    style: (e = {
                                        position: "absolute"
                                    }, Yu(e, s ? "left" : "right", s ? a : c - a), Yu(e, h ? "bottom" : "top", h ? u - l : l), e)
                                }, void 0, Uu("div", {
                                    className: Zu("hoverHeader")
                                }, void 0, Uu(po.a, {
                                    localeFormat: !0,
                                    value: P()(o),
                                    precision: p.precision,
                                    unit: p.id
                                })), Uu("div", {
                                    className: Zu("hoverContent")
                                }, void 0, Uu("div", {
                                    className: Zu("left")
                                }, void 0, Uu("div", {
                                    className: Zu("label")
                                }, void 0, "Can be ", s ? "sold" : "bought", ":"), Uu("div", {}, void 0, Uu(po.a, {
                                    localeFormat: !0,
                                    value: P()(n),
                                    precision: f.precision,
                                    unit: f.id
                                }))), Uu("div", {
                                    className: Zu("right")
                                }, void 0, Uu("div", {
                                    className: Zu("label")
                                }, void 0, "For a total of:"), Uu("div", {}, void 0, Uu(po.a, {
                                    localeFormat: !0,
                                    value: P()(i),
                                    precision: p.precision,
                                    unit: p.id
                                })))))
                            }
                        }
                    }]), t
                }()) || Lu,
                Ku = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Qu = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function Ju(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var ed = 3;
            var td, rd, od, nd, id, ad, ld = (Vu = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Ju(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            mouse: null,
                            elementOffsetX: 0,
                            width: 0,
                            height: 0
                        }, o.onMouseMove = function (e) {
                            var t = e.clientX - o.state.elementOffsetX;
                            o.setState({
                                mouse: {
                                    x: t
                                }
                            })
                        }, o.onMouseOver = function (e) {
                            var t = e.target.getBoundingClientRect().left;
                            o.setState({
                                elementOffsetX: t
                            })
                        }, o.onMouseOut = function () {
                            o.setState({
                                mouse: null
                            })
                        }, o.onClick = function () {
                            var e = o.mouseData,
                                t = o.props.orderFormStore,
                                r = m.a.product;
                            if (e && r) {
                                var n = r.base,
                                    i = r.quote,
                                    a = e.value,
                                    l = e.sum,
                                    s = e.amount,
                                    c = e.isBid,
                                    u = "limit" === t.type;
                                if (t.setSide(u === c ? "buy" : "sell"), "market" !== t.type) {
                                    var d = a.toFixed(i.precision);
                                    "limit" !== t.type ? "stop" === t.type && t.setStopPrice(d) : t.setPrice(d)
                                } else {
                                    var f = c ? l.toFixed(n.precision) : s.toFixed(i.precision);
                                    t.setAmount(f)
                                }
                            }
                        }, o.draw = function (e, t, r) {
                            var n = Object(C.expr)(function () {
                                return (o.state.mouse ? o.state.mouse.x : 0) < o.state.width / 2
                            }) ? Su.a.bidsStrokeStyle : Su.a.asksStrokeStyle;
                            e.clearRect(0, 0, t, r), e.strokeStyle = n, e.fillStyle = n;
                            var i = Math.floor(t / 2);
                            e.setLineDash([3, 3]), ku(e, i, 6, 0, r - 6), e.setLineDash([]), e.beginPath(), e.arc(i, 6, 4, 0, 2 * Math.PI, !1), e.fill(), e.beginPath(), e.arc(i, 6, 6, 0, 2 * Math.PI, !1), e.stroke()
                        }, Ju(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Qu(t, [{
                        key: "UNSAFE_componentWillReceiveProps",
                        value: function (e) {
                            var t = e.width,
                                r = e.height;
                            this.setState({
                                width: t,
                                height: r
                            })
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.width,
                                r = void 0 === t ? 0 : t,
                                o = e.height,
                                n = void 0 === o ? 0 : o,
                                i = this.mouseData,
                                a = i || {},
                                l = a.x,
                                s = void 0 === l ? 0 : l,
                                c = a.y,
                                u = void 0 === c ? 0 : c;
                            return Ku(cn, {
                                width: r,
                                height: n,
                                top: 0,
                                left: 0,
                                bottom: 0,
                                right: 0,
                                onMouseOver: this.onMouseOver,
                                onMouseMove: this.onMouseMove,
                                onMouseOut: this.onMouseOut,
                                onClick: this.onClick
                            }, void 0, i && Ku(cn, {
                                width: r,
                                height: n,
                                top: u - 6,
                                left: s - 6,
                                bottom: 20,
                                right: 0,
                                style: {
                                    overflow: "hidden",
                                    pointerEvents: "none"
                                }
                            }, void 0, Ku(un, {
                                height: n,
                                width: 12,
                                draw: this.draw
                            })), i && Ku(Xu, {
                                width: r,
                                height: n,
                                data: i
                            }))
                        }
                    }, {
                        key: "mouseData",
                        get: function () {
                            var e = this.state,
                                t = e.mouse,
                                r = e.width,
                                o = e.height,
                                n = this.props.depthStore,
                                i = n.bidsData,
                                a = n.asksData,
                                l = n.worstBid,
                                s = n.worstAsk,
                                c = n.midprice,
                                u = n.maxSize;
                            if (t) {
                                var d = (s - l) * (t.x / r) + l,
                                    f = d <= c,
                                    p = f ? i : a,
                                    h = function (e, t, r) {
                                        for (var o = 0, n = e.length / ed - 1; n - o > 1;) {
                                            var i = Math.floor(o + (n - o) / 2);
                                            e[i * ed] < t === r ? n = i : o = i
                                        }
                                        return (r ? n : o) * ed
                                    }(p, d, f);
                                if (h) {
                                    var b = p[h],
                                        v = p[h + 1],
                                        y = p[h + 2],
                                        m = Ou(u, o - 20)(v);
                                    return {
                                        value: b,
                                        sum: v,
                                        amount: y,
                                        x: t.x,
                                        y: m,
                                        isBid: f
                                    }
                                }
                            }
                        }
                    }]), t
                }(), td = Vu.prototype, rd = "mouseData", od = [C.computed], nd = Object.getOwnPropertyDescriptor(Vu.prototype, "mouseData"), id = Vu.prototype, ad = {}, Object.keys(nd).forEach(function (e) {
                    ad[e] = nd[e]
                }), ad.enumerable = !!ad.enumerable, ad.configurable = !!ad.configurable, ("value" in ad || ad.initializer) && (ad.writable = !0), ad = od.slice().reverse().reduce(function (e, t) {
                    return t(td, rd, e) || e
                }, ad), id && void 0 !== ad.initializer && (ad.value = ad.initializer ? ad.initializer.call(id) : void 0, ad.initializer = void 0), void 0 === ad.initializer && (Object.defineProperty(td, rd, ad), ad = null), Vu),
                sd = Object(ue.b)("depthStore", "orderFormStore")(Object(ue.c)(ld)),
                cd = Object.assign || function (e) {
                    for (var t = 1; t < arguments.length; t++) {
                        var r = arguments[t];
                        for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
                    }
                    return e
                },
                ud = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function dd(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var fd = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = dd(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.draw = function (e, t, r) {
                            var n = o.props.depthStore,
                                i = n.bidsData,
                                a = n.asksData;
                            e.clearRect(0, 0, t, r), e.lineWidth = 2, e.strokeStyle = Su.a.bidsStrokeStyle, e.fillStyle = Su.a.bidsFillStyle, o.drawData(e, t, r, i, !1), e.strokeStyle = Su.a.asksStrokeStyle, e.fillStyle = Su.a.asksFillStyle, o.drawData(e, t, r, a, !0)
                        }, dd(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), ud(t, [{
                        key: "drawData",
                        value: function (e, t, r, o, n) {
                            var i = this.props.depthStore,
                                a = i.worstBid,
                                l = i.worstAsk,
                                s = Ou(i.maxSize, r),
                                c = l - a,
                                u = n ? t : 0;
                            e.beginPath(), e.moveTo(Math.floor(t / 2), r);
                            for (var d = r, f = 0; f < o.length; f += 3) {
                                var p = t / c * (o[f] - a),
                                    h = s(o[f + 1]);
                                e.lineTo(p, d), e.lineTo(p, h), d = h
                            }
                            e.stroke(), e.lineTo(u, d), e.lineTo(u, r), e.closePath(), e.fill()
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = (e.depthStore, function (e, t) {
                                    var r = {};
                                    for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                                    return r
                                }(e, ["depthStore"]));
                            return b.createElement(un, cd({}, t, {
                                draw: this.draw
                            }))
                        }
                    }]), t
                }(),
                pd = Object(ue.b)("depthStore")(Object(ue.c)(fd)),
                hd = r(1252),
                bd = r.n(hd),
                vd = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                yd = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();
            var md = me.a.bind(bd.a),
                gd = function (e) {
                    function t() {
                        return function (e, t) {
                                if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                            }(this, t),
                            function (e, t) {
                                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                                return !t || "object" != typeof t && "function" != typeof t ? e : t
                            }(this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), yd(t, [{
                        key: "componentDidMount",
                        value: function () {
                            var e = this.props.depthStore;
                            this.disposeObserver = Object(C.observe)(m.a, "product", function () {
                                e.setLoading(), e.resetZoom()
                            })
                        }
                    }, {
                        key: "componentWillUnmount",
                        value: function () {
                            this.disposeObserver && this.disposeObserver()
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = this.props,
                                t = e.redraw;
                            return e.depthStore.loading ? vd("div", {
                                className: md("spinner")
                            }, void 0, vd(Rt.a, {})) : vd(market_depth_chart, {
                                className: md("container"),
                                redraw: t
                            }, void 0, vd(pd, {
                                bottom: 20
                            }), vd(Ru, {
                                bottom: 15
                            }), vd(Eu, {
                                top: -20
                            }), vd(sd, {}), vd(qu, {
                                top: -25,
                                bottom: 15
                            }), vd(cn, {
                                top: 5,
                                left: 0,
                                right: 0
                            }, void 0, vd(_u, {})))
                        }
                    }]), t
                }(),
                wd = Object(ue.b)("depthStore")(Object(ue.c)(gd)),
                _d = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Od = new vu,
                xd = function (e) {
                    return _d(y.a, {
                        depthStore: Od
                    }, void 0, b.createElement(wd, e))
                },
                kd = r(1250),
                Cd = r.n(kd),
                Sd = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Pd = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }();

            function jd(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }
            var Td, Ad, Ed, zd, Md = me.a.bind(Cd.a),
                Nd = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = jd(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            tab: "priceChart"
                        }, o.setTab = function (e) {
                            o.setState({
                                tab: e
                            })
                        }, o.setTabPriceChart = o.setTab.bind(o, "priceChart"), o.setTabDepthChart = o.setTab.bind(o, "depthChart"), jd(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), Pd(t, [{
                        key: "render",
                        value: function () {
                            var e = this.state.tab;
                            return Sd("div", {
                                className: Md("chart-panel")
                            }, void 0, Sd(qr, {
                                tab: e,
                                tabs: this.tabs,
                                tabsClassName: Md("header-tabs")
                            }), Sd("div", {
                                className: Md("charts")
                            }, void 0, Sd("div", {
                                className: Md("chart", "price-chart", {
                                    show: "priceChart" === e
                                })
                            }, void 0, Sd(Gc, {
                                redraw: "priceChart" === e
                            })), Sd("div", {
                                className: Md("chart", "depth-chart", {
                                    show: "depthChart" === e
                                })
                            }, void 0, Sd(xd, {
                                redraw: "depthChart" === e
                            }))))
                        }
                    }, {
                        key: "tabs",
                        get: function () {
                            return [{
                                key: "priceChart",
                                title: "PRICE CHART",
                                name: "Price chart",
                                onClick: this.setTabPriceChart
                            }, {
                                key: "depthChart",
                                title: "DEPTH CHART",
                                name: "Depth chart",
                                onClick: this.setTabDepthChart
                            }]
                        }
                    }]), t
                }(),
                Bd = r(1248),
                Rd = r.n(Bd),
                Dd = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }(),
                Fd = me.a.bind(Rd.a),
                Wd = function () {
                    return Dd("div", {
                        className: Fd("trade-history-panel")
                    }, void 0, Dd(qr, {
                        title: "TRADE HISTORY"
                    }), Dd($n, {}))
                },
                Ld = r(1246),
                Id = r.n(Ld),
                qd = function () {
                    function e(e, t) {
                        for (var r = 0; r < t.length; r++) {
                            var o = t[r];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, o.key, o)
                        }
                    }
                    return function (t, r, o) {
                        return r && e(t.prototype, r), o && e(t, o), t
                    }
                }(),
                $d = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }();

            function Hd(e, t, r, o) {
                r && Object.defineProperty(e, t, {
                    enumerable: r.enumerable,
                    configurable: r.configurable,
                    writable: r.writable,
                    value: r.initializer ? r.initializer.call(o) : void 0
                })
            }

            function Ud(e, t) {
                if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !t || "object" != typeof t && "function" != typeof t ? e : t
            }

            function Gd(e, t, r, o, n) {
                var i = {};
                return Object.keys(o).forEach(function (e) {
                    i[e] = o[e]
                }), i.enumerable = !!i.enumerable, i.configurable = !!i.configurable, ("value" in i || i.initializer) && (i.writable = !0), i = r.slice().reverse().reduce(function (r, o) {
                    return o(e, t, r) || r
                }, i), n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0), void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null), i
            }
            var Yd = me.a.bind(Id.a),
                Vd = function () {
                    return $d(Jd, {
                        column: !0,
                        align: "center"
                    }, void 0, $d(tf, {
                        fontWeight: "bold"
                    }, void 0, "New features, new look, same low fees."), $d(rf, {}, void 0, "GDAX is becoming Coinbase Pro on June 29, 2018. Try the Coinbase Pro beta now for early access."), $d(je, {}))
                },
                Zd = function () {
                    return $d(Qd, {
                        column: !0,
                        align: "center"
                    }, void 0, $d(nf, {}, void 0, "Per our recent blog post announcements", " ", $d(xe.c, {
                        to: "https://blog.coinbase.com/coinbase-institutional-deea317d23af"
                    }, void 0, "here"), " ", "and", " ", $d(xe.c, {
                        to: "https://blog.coinbase.com/gdax-is-now-coinbase-pro-b062a12758a0"
                    }, void 0, "here"), ", Coinbase is retiring the GDAX brand and replacing GDAX with two new trading platforms: Coinbase Pro, for active individual traders, and Coinbase Prime, for qualifying institutional investors and corporate clients."), $d(tf, {
                        fontWeight: "bold"
                    }, void 0, "Your account has been identified as a qualifying institutional account and therefore you will automatically become a Coinbase Prime customer starting on June 29th, 2018.", " "), $d(af, {}, void 0, "The GDAX web interface will no longer be available after June 29th, 2018. However, API URLs will remain available through the end of the year. We encourage you to begin using Prime immediately in order to avoid any last-minute transition challenges. Please contact the Client Services team at", " ", $d(xe.c, {
                        to: "mailto: clientservices@coinbase.com"
                    }, void 0, "clientservices@coinbase.com"), " ", "with any questions."))
                },
                Xd = function (e) {
                    var t = e.isPrime,
                        r = e.tryCoinbase,
                        o = e.skip;
                    return $d(ve.a, {
                        theme: Oe.k.light
                    }, void 0, $d(ef, {
                        column: !0,
                        align: "center"
                    }, void 0, $d(lf, {
                        to: "https://" + (t ? "prime" : "pro") + ".coinbase.com",
                        textDecoration: "none"
                    }, void 0, $d(sf, {
                        onClick: r
                    }, void 0, t ? "Upgrade to Coinbase Prime" : "Try Coinbase  Pro")), $d(cf, {
                        onClick: o
                    }, void 0, "Skip for now")))
                },
                Kd = Object(ue.c)((Ad = function (e) {
                    function t() {
                        var e, r, o;
                        ! function (e, t) {
                            if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
                        }(this, t);
                        for (var n = arguments.length, i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                        return r = o = Ud(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))), o.state = {
                            tryModal: !we.a.getItem("try-modal-clicked")
                        }, Hd(o, "tab", Ed, o), Hd(o, "setTab", zd, o), o.setTabOrderBook = o.setTab.bind(o, "orderbook"), o.setTabOrderForm = o.setTab.bind(o, "orderForm"), o.setTabCharts = o.setTab.bind(o, "charts"), o.setTabUser = o.setTab.bind(o, "user"), o.setTabHistory = o.setTab.bind(o, "history"), Ud(o, r)
                    }
                    return function (e, t) {
                        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                        e.prototype = Object.create(t && t.prototype, {
                            constructor: {
                                value: e,
                                enumerable: !1,
                                writable: !0,
                                configurable: !0
                            }
                        }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
                    }(t, b["Component"]), qd(t, [{
                        key: "hideTryModal",
                        value: function (e) {
                            var t = this;
                            return function () {
                                t.setState({
                                    tryModal: null
                                }), we.a.setItem("try-modal-clicked", !0);
                                var r = A.m.user,
                                    o = r && r.is_prime ? "prime" : "pro";
                                Object(T.c)(e + "_coinbase_" + o + "_modal_click")
                            }
                        }
                    }, {
                        key: "render",
                        value: function () {
                            var e = ge.a.size,
                                t = this.tab,
                                r = A.m.user;
                            return Object(T.c)("trade_page_viewed"), "mobile" === e ? $d("div", {
                                className: Yd("scene")
                            }, void 0, $d("section", {
                                className: Yd("main-content")
                            }, void 0, "orderbook" === t ? $d(Ia, {}) : null, "charts" === t ? $d(Nd, {}) : null, "user" === t ? $d(Tl, {}) : null, "history" === t ? $d(Wd, {}) : null, "orderForm" === t ? $d(_e.a, {
                                full: !0
                            }, void 0, $d(ao, {}), $d(fo, {})) : null), $d("div", {
                                className: Yd("tab-bar")
                            }, void 0, $d("div", {
                                className: Yd({
                                    tab: t,
                                    active: "orderForm" === t
                                }),
                                onClick: this.setTabOrderForm
                            }, void 0, "TRADE"), $d("div", {
                                className: Yd({
                                    tab: t,
                                    active: "orderbook" === t
                                }),
                                onClick: this.setTabOrderBook
                            }, void 0, "BOOK"), $d("div", {
                                className: Yd({
                                    tab: t,
                                    active: "charts" === t
                                }),
                                onClick: this.setTabCharts
                            }, void 0, "CHARTS"), $d("div", {
                                className: Yd({
                                    tab: t,
                                    active: "user" === t
                                }),
                                onClick: this.setTabUser
                            }, void 0, "ORDERS"), $d("div", {
                                className: Yd({
                                    tab: t,
                                    active: "history" === t
                                }),
                                onClick: this.setTabHistory
                            }, void 0, "HISTORY")), r && this.state.tryModal && $d(ve.a, {
                                theme: Oe.k.noir
                            }, void 0, $d(xe.e, {
                                onClose: this.hideTryModal("close"),
                                title: r.is_prime ? "Important Message Regarding Your GDAX Account" : "Try Coinbase Pro",
                                titleFontSize: Oe.k.noir.fonts.size.larger
                            }, void 0, $d(Oe.e, {
                                column: !0,
                                align: "center"
                            }, void 0, r.is_prime ? $d(Zd, {}) : $d(Vd, {}), $d(Xd, {
                                isPrime: r.is_prime,
                                tryCoinbase: this.hideTryModal("try"),
                                skip: this.hideTryModal("skip")
                            }))))) : $d("div", {
                                className: Yd("scene")
                            }, void 0, $d(_e.a, {}, void 0, $d(ao, {}), $d(fo, {})), $d("div", {
                                className: Yd("main-content")
                            }, void 0, $d(Ia, {}), $d(Nd, {}), $d(Tl, {}), $d(Wd, {})), r && this.state.tryModal && $d(ve.a, {
                                theme: Oe.k.noir
                            }, void 0, $d(xe.e, {
                                onClose: this.hideTryModal("close"),
                                title: r.is_prime ? "Important message regarding your GDAX account" : "Try Coinbase Pro",
                                titleFontSize: Oe.k.noir.fonts.size.larger
                            }, void 0, $d(Oe.e, {
                                column: !0,
                                align: "center"
                            }, void 0, r.is_prime ? $d(Zd, {}) : $d(Vd, {}), $d(Xd, {
                                isPrime: r.is_prime,
                                tryCoinbase: this.hideTryModal("try"),
                                skip: this.hideTryModal("skip")
                            })))))
                        }
                    }]), t
                }(), Ed = Gd(Ad.prototype, "tab", [C.observable], {
                    enumerable: !0,
                    initializer: function () {
                        return "orderForm"
                    }
                }), zd = Gd(Ad.prototype, "setTab", [C.action], {
                    enumerable: !0,
                    initializer: function () {
                        var e = this;
                        return function (t) {
                            e.tab = t
                        }
                    }
                }), Td = Ad)) || Td,
                Qd = Object(ve.c)(Oe.e)(["padding:", ";font-family:", ";"], function (e) {
                    return e.theme.spacing.padding
                }, function (e) {
                    return e.theme.fonts.family.regular
                }),
                Jd = Object(ve.c)(Qd)(["max-height:380px;"]),
                ef = Object(ve.c)(Oe.e)(["width:100%;padding:", ";background:", ";"], function (e) {
                    return e.theme.spacing.padding
                }, function (e) {
                    return e.theme.colors.base.default
                }),
                tf = Object(ve.c)(Oe.i)(["max-width:80%;font-size:", ";text-align:center;"], function (e) {
                    return e.theme.fonts.size.larger
                }),
                rf = Object(ve.c)(Oe.i)(["max-width:60%;margin:15px 0 30px;font-size:", ";text-align:center;"], function (e) {
                    return e.theme.fonts.size.small
                }),
                of = Object(ve.c)(Oe.i)(["max-width:80%;font-size:", ";text-align:center;&:first-child{margin-top:30px;}&:last-child{margin-bottom:30px;}"], function (e) {
                    return e.theme.fonts.size.small
                }),
                nf = Object(ve.c)(of)(["", ";"], function (e) {
                    var t = e.theme;
                    return Object(ve.b)(["&::after{content:'';display:block;width:30px;margin:20px auto;border-bottom:1px solid ", ";}"], t.colors.border.default)
                }),
                af = Object(ve.c)(of)(["", ";"], function (e) {
                    var t = e.theme;
                    return Object(ve.b)(["&::before{content:'';display:block;width:30px;margin:20px auto;border-bottom:1px solid ", ";}"], t.colors.border.default)
                }),
                lf = Object(ve.c)(xe.c)(["&:hover{text-decoration:none;}"]),
                sf = Object(ve.c)(Oe.c).attrs({
                    intent: "brand",
                    primary: !0
                })(["width:250px;color:", ";"], function (e) {
                    return e.theme.colors.base.default
                }),
                cf = Object(ve.c)(Oe.c)(["border:none;color:", ";&:hover{border:none;}"], function (e) {
                    return e.theme.colors.label.default
                }),
                uf = function () {
                    var e = "function" == typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103;
                    return function (t, r, o, n) {
                        var i = t && t.defaultProps,
                            a = arguments.length - 3;
                        if (r || 0 === a || (r = {}), r && i)
                            for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                        else r || (r = i || {}); if (1 === a) r.children = n;
                        else if (a > 1) {
                            for (var s = Array(a), c = 0; c < a; c++) s[c] = arguments[c + 3];
                            r.children = s
                        }
                        return {
                            $$typeof: e,
                            type: t,
                            key: void 0 === o ? null : "" + o,
                            ref: null,
                            props: r,
                            _owner: null
                        }
                    }
                }();

            function df(e) {
                return function () {
                    var t = e.apply(this, arguments);
                    return new Promise(function (e, r) {
                        return function o(n, i) {
                            try {
                                var a = t[n](i),
                                    l = a.value
                            } catch (e) {
                                return void r(e)
                            }
                            if (!a.done) return Promise.resolve(l).then(function (e) {
                                o("next", e)
                            }, function (e) {
                                o("throw", e)
                            });
                            e(l)
                        }("next")
                    })
                }
            }
            t.default = df(regeneratorRuntime.mark(function e() {
                var t, r, o, n, i, a = (t = df(regeneratorRuntime.mark(function e() {
                    var t, r;
                    return regeneratorRuntime.wrap(function (e) {
                        for (;;) switch (e.prev = e.next) {
                        case 0:
                            return e.next = 2, _.a.loader;
                        case 2:
                            if (!e.sent) {
                                e.next = 23;
                                break
                            }
                            return e.next = 6, k.a.loader;
                        case 6:
                            return e.next = 8, g.a.fetch();
                        case 8:
                            if (t = e.sent, r = t.find(function (e) {
                                return "default" === e.name
                            })) {
                                e.next = 12;
                                break
                            }
                            throw Error("No profile");
                        case 12:
                            return m.a.setProfile(r), e.prev = 13, e.next = 16, j.a.refresh();
                        case 16:
                            e.next = 21;
                            break;
                        case 18:
                            e.prev = 18, e.t0 = e.catch(13), Object(v.b)(e.t0, "unable to refresh accounts");
                        case 21:
                            return e.next = 23, x.a.loader;
                        case 23:
                        case "end":
                            return e.stop()
                        }
                    }, e, this, [
                        [13, 18]
                    ])
                })), function () {
                    return t.apply(this, arguments)
                });
                return regeneratorRuntime.wrap(function (e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return Object(v.c)({
                            category: "General",
                            action: "Trade page view"
                        }), e.next = 3, Promise.all([a(), O.a.loader]);
                    case 3:
                        return r = new se, o = new oe.a({
                            sort: "smart"
                        }), n = new G({
                            ordersStore: o
                        }), i = new re({
                            orderFormStore: n
                        }), e.abrupt("return", uf(y.a, {
                            profilesStore: g.a,
                            appStore: m.a,
                            orderFormStore: n,
                            positionStore: i,
                            accountBalanceStore: X.a,
                            accountsStore: x.a,
                            ordersStore: o,
                            fillsStore: r,
                            productsStatsStore: w.a
                        }, void 0, uf(be, {}, void 0, uf(ce.a, {
                            path: "/trade",
                            component: Kd
                        }))));
                    case 8:
                    case "end":
                        return e.stop()
                    }
                }, e, void 0)
            }))
        }
    }
]);