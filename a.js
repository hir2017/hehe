(this.webpackJsonp = this.webpackJsonp || []).push([[7], {
    1144 : function(e, t, r) {
        "use strict";
        r.d(t, "b",
        function() {
            return n
        }),
        r.d(t, "a",
        function() {
            return i
        });
        var o = function(e) {
            for (var t = e.toDataURL("image/jpeg", 1), r = atob(t.split(",")[1]), o = [], n = 0; n < r.length; n++) o.push(r.charCodeAt(n));
            return new Blob([new Uint8Array(o)], {
                type: "image/jpeg"
            })
        },
        n = function(e) {
            var t = document.createElement("canvas");
            return t.width = e.videoWidth,
            t.height = e.videoHeight,
            t.getContext("2d").drawImage(e, 0, 0),
            o(t)
        },
        i = function(e, t) {
            return new Promise(function(r) {
                var n = t.getContext("2d"),
                i = new Image,
                a = URL.createObjectURL(e);
                i.onload = function() {
                    var e = i.naturalWidth,
                    a = i.naturalHeight,
                    l = t.width,
                    c = l / e * a,
                    u = (c - t.height) / 2 * -1;
                    n.drawImage(i, 0, 0, e, a, 0, u, l, c),
                    r(o(t))
                },
                i.src = a
            })
        }
    },
    1224 : function(e, t, r) {
        e.exports = r.p + "favicon-price-down.ico"
    },
    1225 : function(e, t, r) {
        e.exports = r.p + "favicon-price-up.ico"
    },
    1486 : function(e, t, r) {
        "use strict";
        r.r(t);
        var o, n, i, a, l, c, u, s = r(1),
        f = r.n(s),
        p = r(24),
        d = r(36),
        h = r(44),
        b = r(13),
        y = r(31),
        v = r(21),
        m = r(1117),
        g = r(0),
        O = r(42),
        w = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function j(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function S(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var _, x, k, P, C, T, A, E, z, R, M, D, B, F = new(o = function() {
            function e() { !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, e),
                this.disposers = [],
                j(this, "refreshingBalance", n, this),
                j(this, "stale", i, this),
                j(this, "quoteAccount", a, this),
                j(this, "baseAccount", l, this),
                j(this, "refresh", c, this),
                j(this, "_getAccounts", u, this)
            }
            return w(e, [{
                key: "subscribe",
                value: function() {
                    this.disposers.push(Object(g.observe)(m.a, "product", this.refresh)),
                    this.disposers.push(Object(g.observe)(m.a, "profile", this.refresh)),
                    this.disposers.push(Object(g.observe)(y.o, "accounts", this.refreshAvailableBalance.bind(this))),
                    this.refresh()
                }
            },
            {
                key: "unsubscribe",
                value: function() {
                    this.disposers.forEach(function(e) {
                        return e()
                    }),
                    this.disposers = []
                }
            },
            {
                key: "refreshAvailableBalance",
                value: function(e, t) {
                    var r, o = this;
                    this.baseAccount && this.quoteAccount && (this.refreshingBalance = !0, this.refreshTimeout && Object(O.b)(this.refreshTimeout), this.refreshTimeout = Object(O.e)(Object(g.action)((r = regeneratorRuntime.mark(function r() {
                        var n;
                        return regeneratorRuntime.wrap(function(r) {
                            for (;;) switch (r.prev = r.next) {
                            case 0:
                                return (n = e || {}).quoteAvailable = n.quoteAvailable || o.quoteAccount.available,
                                n.quoteFunded = n.quoteFunded || o.quoteAccount.funded_amount,
                                n.baseAvailable = n.baseAvailable || o.baseAccount.available,
                                n.baseFunded = n.baseFunded || o.baseAccount.funded_amount,
                                r.next = 7,
                                o._getAccounts();
                            case 7:
                                o._checkIfRefreshNeedsRetry(n, t);
                            case 8:
                            case "end":
                                return r.stop()
                            }
                        },
                        r, o)
                    }),
                    function() {
                        var e = r.apply(this, arguments);
                        return new Promise(function(t, r) {
                            return function o(n, i) {
                                try {
                                    var a = e[n](i),
                                    l = a.value
                                } catch(e) {
                                    return void r(e)
                                }
                                if (!a.done) return Promise.resolve(l).then(function(e) {
                                    o("next", e)
                                },
                                function(e) {
                                    o("throw", e)
                                });
                                t(l)
                            } ("next")
                        })
                    })), 250))
                }
            },
            {
                key: "_checkIfRefreshNeedsRetry",
                value: function(e) {
                    var t = this,
                    r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 4,
                    o = this.quoteAccount.available.eq(e.quoteAvailable) && this.quoteAccount.funded_amount.eq(e.quoteFunded) && this.baseAccount.available.eq(e.baseAvailable) && this.baseAccount.funded_amount.eq(e.baseFunded),
                    n = Math.pow(4 - r, 2);
                    o && r > 0 ? Object(O.e)(function() {
                        t.refreshAvailableBalance(e, r - 1)
                    },
                    1e3 * n) : this.refreshingBalance = !1
                }
            },
            {
                key: "hasMarginPosition",
                get: function() {
                    var e = this.baseAccount,
                    t = this.quoteAccount,
                    r = m.a.profile;
                    return r && r.margin_enabled && e && t && (e.funded_amount.gt(0) || t.funded_amount.gt(0) || "short" === r.position_type || "long" === r.position_type)
                }
            }]),
            e
        } (), n = S(o.prototype, "refreshingBalance", [g.observable], {
            enumerable: !0,
            initializer: null
        }), i = S(o.prototype, "stale", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ! 1
            }
        }), a = S(o.prototype, "quoteAccount", [g.observable], {
            enumerable: !0,
            initializer: null
        }), l = S(o.prototype, "baseAccount", [g.observable], {
            enumerable: !0,
            initializer: null
        }), S(o.prototype, "hasMarginPosition", [g.computed], Object.getOwnPropertyDescriptor(o.prototype, "hasMarginPosition"), o.prototype), c = S(o.prototype, "refresh", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.refreshTimeout && Object(O.b)(e.refreshTimeout),
                    e.stale = !0,
                    e.refreshTimeout = Object(O.e)(e._getAccounts, 250)
                }
            }
        }), u = S(o.prototype, "_getAccounts", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = m.a.profile,
                    r = m.a.product;
                    if (t && r) {
                        var o = t.id,
                        n = r.id,
                        i = y.o.getAccountByProfileId(o);
                        i && o === t.id && n === r.id && Object(g.runInAction)(function() {
                            i.forEach(function(t) {
                                t.currency === r.base.id && (e.baseAccount = t),
                                t.currency === r.quote.id && (e.quoteAccount = t)
                            }),
                            e.stale = !1
                        })
                    }
                }
            }
        }), S(o.prototype, "refreshAvailableBalance", [g.action], Object.getOwnPropertyDescriptor(o.prototype, "refreshAvailableBalance"), o.prototype), S(o.prototype, "_checkIfRefreshNeedsRetry", [g.action], Object.getOwnPropertyDescriptor(o.prototype, "_checkIfRefreshNeedsRetry"), o.prototype), o),
        I = r(1130),
        L = r(1154),
        $ = r(3),
        W = r.n($),
        q = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        U = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function N(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function H(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var G, Y = (_ = function() {
            function e(t) {
                var r = this; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, e),
                N(this, "type", x, this),
                N(this, "side", k, this),
                N(this, "price", P, this),
                N(this, "amount", C, this),
                N(this, "stop_price", T, this),
                N(this, "show_advanced", A, this),
                N(this, "time_in_force", E, this),
                N(this, "cancel_after", z, this),
                N(this, "post_only", R, this),
                this.disposers = [],
                N(this, "reset", M, this),
                N(this, "toggleAdvanced", D, this),
                this.setTypeMarket = function() {
                    return r.setType("market")
                },
                this.setTypeLimit = function() {
                    return r.setType("limit")
                },
                this.setTypeStop = function() {
                    return r.setType("stop")
                },
                N(this, "prefillMax", B, this),
                this.buildOrder = function() {
                    var e = m.a.product,
                    t = m.a.profile,
                    o = new v.h({
                        profile_id: t.id,
                        product_id: e.id,
                        side: r.side,
                        client_oid: v.h.generate_client_oid(),
                        filled_size: W()(0),
                        fill_fees: W()(0),
                        status: "pending"
                    });
                    if ("market" === r.type && (o.type = r.type, "buy" === o.side ? o.funds = W()(r.amount) : o.size = W()(r.amount)), "limit" === r.type && (o.type = r.type, o.price = W()(r.price), o.size = W()(r.amount), o.post_only = r.post_only, r.show_advanced && (o.time_in_force = r.time_in_force, o.cancel_after = "GTT" === r.time_in_force ? r.cancel_after: "")), "stop" === r.type) if (o.type = "market", o.stop = "buy" === r.side ? "entry": "loss", o.stop_price = W()(r.stop_price), r.show_advanced && r.price) if (o.type = "limit", o.price = W()(r.price), "entry" === o.stop) {
                        var n = e.base.precision;
                        o.size = W()(r.amount).div(o.price).round(n, 0)
                    } else o.size = W()(r.amount);
                    else "entry" === o.stop ? o.funds = W()(r.amount) : o.size = W()(r.amount);
                    return t.margin_enabled && "stop" !== r.type && (o.overdraft_enabled = !0),
                    o
                },
                this.ordersStore = t.ordersStore;
                var o = y.y.user;
                this.post_only = !!o && !o.has_flag("post_only_disabled")
            }
            return U(e, [{
                key: "subscribe",
                value: function() {
                    this.disposers.push(Object(g.observe)(m.a, "product", this.reset)),
                    this.disposers.push(Object(g.observe)(m.a, "profile", this.reset)),
                    y.t.addSubscriber(this)
                }
            },
            {
                key: "unsubscribe",
                value: function() {
                    this.disposers.forEach(function(e) {
                        return e()
                    }),
                    this.disposers.length = 0,
                    y.t.removeSubscriber(this)
                }
            },
            {
                key: "track",
                value: function(e, t) {
                    Object(p.d)(e, q({},
                    t, {
                        product_id: m.a.product.id,
                        order_side: this.side,
                        order_type: this.type
                    }))
                }
            },
            {
                key: "setType",
                value: function(e) {
                    this.type !== e && (this.type = e, this.track("order_tab_selected"), this.amount = "", this.price = "", this.stop_price = "")
                }
            },
            {
                key: "setSide",
                value: function(e) {
                    this.side !== e && (this.side = e, this.track("order_side_selected"), "limit" !== this.type && (this.amount = ""))
                }
            },
            {
                key: "setAmount",
                value: function(e) {
                    this.amount = e
                }
            },
            {
                key: "setPrice",
                value: function(e) {
                    this.price = e
                }
            },
            {
                key: "setStopPrice",
                value: function(e) {
                    this.stop_price = e
                }
            },
            {
                key: "setCancelAfter",
                value: function(e) {
                    this.cancel_after = e,
                    this.track("limit_order_cancel_after_updated", {
                        cancel_after: e
                    })
                }
            },
            {
                key: "setTimeInForce",
                value: function(e) {
                    var t = y.y.user;
                    this.time_in_force = e,
                    this.track("limit_order_time_in_force_policy_updated", {
                        time_in_force_policy: e
                    }),
                    this.post_only = ("GTT" === e || "GTC" === e) && !(t && t.has_flag("post_only_disabled"))
                }
            },
            {
                key: "setPostOnly",
                value: function(e) {
                    if (this.post_only !== e) {
                        var t = y.y.user;
                        if (this.post_only = e, e ? this.track("post_only_limit_order_execution_selected") : this.track("allow_taker_limit_order_execution_selected"), t) return e ? t.remove_flag("post_only_disabled") : t.add_flag("post_only_disabled")
                    }
                }
            },
            {
                key: "submit",
                value: function() {
                    var e = this,
                    t = this.buildOrder();
                    this.track("place_order_clicked"),
                    this.ordersStore.addOrUpdateOrder(t);
                    var r = {
                        profile_id: t.profile_id,
                        show_match: "market" === t.type
                    };
                    return t.save(r).then(Object(g.action)("saving order",
                    function() {
                        if (e.ordersStore.addOrUpdateOrder(t), "rejected" === t.status) {
                            var r = "";
                            if (t.post_only) if ("post only" === t.reject_reason) {
                                var o = t.product_id.split("-");
                                r = "Post Only: Cannot place order at " + +t.price + " " + o[1] + "/" + o[0] + "."
                            } else "cannot exceed leverage ratio" === t.reject_reason && (r = "Margin: Cannot exceed leverage ratio");
                            else "FOK" === t.time_in_force && (r = "Time in Force: Cannot fill entire order.");
                            throw ! r && t.reject_reason && (r = t.reject_reason),
                            new b.j(r)
                        }
                        "pending" === t.status && (t.status = "received"),
                        "market" !== t.type || t.stop || (t.status = "done", t.done_reason = "filled", t.executed_value.gt(0) && (t.avg_market_fill_price = t.executed_value.div(t.filled_size))),
                        e.price = "",
                        e.amount = "",
                        e.stop_price = "",
                        y.o.refreshAccounts()
                    })).
                    catch(Object(g.action)(function(e) {
                        throw t.status = "rejected",
                        e
                    }))
                }
            },
            {
                key: "validateOrder",
                value: function() {
                    var e = this.amount,
                    t = this.price,
                    r = this.stop_price,
                    o = this.type,
                    n = m.a.product,
                    i = n.base_min_size,
                    a = n.base_max_size,
                    l = n.min_market_funds,
                    c = n.max_market_funds,
                    u = n.quote.symbol,
                    s = n.base.symbol;
                    if (!e) return "Amount must be specified";
                    var f = void 0;
                    try {
                        f = W()(e)
                    } catch(e) {
                        return "Invalid amount"
                    }
                    if (f.lte(0)) return "Amount must be greater than zero";
                    if ("limit" === o && !t) return "Price must be specified";
                    if ("limit" === o || "stop" === o && t) {
                        var p = this.price;
                        try {
                            p = W()(t)
                        } catch(e) {
                            return "Invalid price"
                        }
                        if (!p || p.lte(0)) return "Price must be greater than zero"
                    }
                    if ("stop" === o && !r) return "Stop price must be specified";
                    if ("stop" === o) {
                        var d = void 0;
                        try {
                            d = W()(r)
                        } catch(e) {
                            return "Invalid stop price"
                        }
                        if (d.lte(0)) return "Stop price must be greater than zero"
                    }
                    var h = this.buildOrder();
                    if (h.funds) {
                        if (h.funds.gt(c)) return "Amount must be less than " + u + c.toFixed() + ".";
                        if (h.funds.lt(l)) return "Amount must be greater than " + u + l.toFixed() + "."
                    }
                    if (h.size) {
                        if (h.size.gt(a)) return "Amount must be less than " + s + a.toFixed() + ".";
                        if (h.size.lt(i)) return "Amount must be greater than " + s + i.toFixed() + "."
                    }
                }
            },
            {
                key: "validateSlippage",
                value: function() {
                    var e = this.type,
                    t = this.side;
                    if ("market" === e) {
                        if ("buy" === t) {
                            var r = y.t.bestAskPrice;
                            if (!r) return "No asks";
                            var o = W()(r).mul(W()(1).add(.02));
                            if (y.t.calculateBuyOrder(this.amount, o).remaining.gt(0)) return "Order would move market more than " + W()(100).mul(.02).toFixed(0) + "%"
                        }
                        if ("sell" === t) {
                            var n = y.t.bestBidPrice;
                            if (!n) return "No bids";
                            var i = W()(n).mul(W()(1).sub(.02));
                            if (y.t.calculateSellOrder(this.amount, i).remaining.gt(0)) return "Order would move market more than " + W()(100).mul(.02).toFixed(0) + "%"
                        }
                    }
                }
            },
            {
                key: "calculateMarketTotal",
                value: function(e) {
                    return ("buy" === this.side ? y.t.calculateBuyOrder(e) : y.t.calculateSellOrder(e)).total
                }
            },
            {
                key: "calculateLimitTotal",
                value: function(e) {
                    return W()(e).mul(this.price || W()(0))
                }
            },
            {
                key: "calculateStopTotal",
                value: function(e) {
                    var t = this.price,
                    r = this.side;
                    if (!this.show_advanced || !t) throw new b.e("Cannot estimate stop market totals");
                    return e ? "buy" === r ? W()(e).div(t) : "sell" === r ? W()(e).mul(t) : void 0 : W()(0)
                }
            },
            {
                key: "total",
                get: function() {
                    var e = this.price,
                    t = this.amount,
                    r = W()(0);
                    try {
                        "market" === this.type && t ? r = this.calculateMarketTotal(t) : "limit" === this.type && t && e ? r = this.calculateLimitTotal(t) : "stop" === this.type && (r = this.calculateStopTotal(t))
                    } catch(e) {
                        return null
                    }
                    return r || W()(0)
                }
            },
            {
                key: "totalCurrency",
                get: function() {
                    var e = this.type,
                    t = this.side,
                    r = m.a.product;
                    return "buy" === t && "limit" !== e ? r.base: r.quote
                }
            },
            {
                key: "feeEstimation",
                get: function() {
                    var e = y.r.feeRate || y.r.findRateForValue(W()(0));
                    if (!e || !this.total) return null;
                    if ("limit" === this.type && this.post_only) return W()(0);
                    if (! ("stop" !== this.type || this.show_advanced && this.price)) return null;
                    var t = e.fee;
                    return "limit" !== this.type && "buy" === this.side ? t.mul(this.amount || 0) : t.mul(this.total)
                }
            },
            {
                key: "postOnlyDisabled",
                get: function() {
                    return ! ("GTC" === this.time_in_force || "GTT" === this.time_in_force)
                }
            }]),
            e
        } (), x = H(_.prototype, "type", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return "market"
            }
        }), k = H(_.prototype, "side", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return "buy"
            }
        }), P = H(_.prototype, "price", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ""
            }
        }), C = H(_.prototype, "amount", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ""
            }
        }), T = H(_.prototype, "stop_price", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ""
            }
        }), A = H(_.prototype, "show_advanced", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ! 1
            }
        }), E = H(_.prototype, "time_in_force", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return "GTC"
            }
        }), z = H(_.prototype, "cancel_after", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return "min"
            }
        }), R = H(_.prototype, "post_only", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ! 0
            }
        }), H(_.prototype, "total", [g.computed], Object.getOwnPropertyDescriptor(_.prototype, "total"), _.prototype), H(_.prototype, "totalCurrency", [g.computed], Object.getOwnPropertyDescriptor(_.prototype, "totalCurrency"), _.prototype), H(_.prototype, "feeEstimation", [g.computed], Object.getOwnPropertyDescriptor(_.prototype, "feeEstimation"), _.prototype), H(_.prototype, "postOnlyDisabled", [g.computed], Object.getOwnPropertyDescriptor(_.prototype, "postOnlyDisabled"), _.prototype), M = H(_.prototype, "reset", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.amount = "",
                    e.price = "",
                    e.stop_price = "",
                    e.time_in_force = "GTC",
                    e.cancel_after = "min"
                }
            }
        }), D = H(_.prototype, "toggleAdvanced", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.show_advanced = !e.show_advanced,
                    e.track("order_advanced_toggled")
                }
            }
        }), H(_.prototype, "setType", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setType"), _.prototype), H(_.prototype, "setSide", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setSide"), _.prototype), H(_.prototype, "setAmount", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setAmount"), _.prototype), H(_.prototype, "setPrice", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setPrice"), _.prototype), H(_.prototype, "setStopPrice", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setStopPrice"), _.prototype), H(_.prototype, "setCancelAfter", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setCancelAfter"), _.prototype), H(_.prototype, "setTimeInForce", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setTimeInForce"), _.prototype), H(_.prototype, "setPostOnly", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "setPostOnly"), _.prototype), B = H(_.prototype, "prefillMax", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = m.a.product,
                    r = F.quoteAccount,
                    o = F.baseAccount,
                    n = y.r.feeRate || y.r.findRateForValue(W()(0)),
                    i = e.type,
                    a = e.side,
                    l = e.price,
                    c = W()(0);
                    if ("market" === i || "stop" === i) c = "buy" === a ? r.available.round(t.quote.precision, 0) : o.available.round(t.base.precision, 0);
                    else if ("limit" === i) if ("buy" === a && l) try {
                        if (c = r.available.div(l).round(t.base.precision, 0), !e.post_only && n) {
                            var u = n.fee;
                            c = c.mul(W()(1).minus(u))
                        }
                    } catch(e) {} else "sell" === a && (c = o.available.round(t.base.precision, 0));
                    e.amount = c.toString()
                }
            }
        }), H(_.prototype, "submit", [g.action], Object.getOwnPropertyDescriptor(_.prototype, "submit"), _.prototype), _),
        K = r(7),
        X = r(2),
        V = r(6),
        J = (r(12), r(357)),
        Q = r(18),
        Z = r(194),
        ee = (G = "function" == typeof Symbol && Symbol.
        for && Symbol.
        for ("react.element") || 60103,
        function(e, t, r, o) {
            var n = e && e.defaultProps,
            i = arguments.length - 3;
            if (t || 0 === i || (t = {}), t && n) for (var a in n) void 0 === t[a] && (t[a] = n[a]);
            else t || (t = n || {});
            if (1 === i) t.children = o;
            else if (i > 1) {
                for (var l = Array(i), c = 0; c < i; c++) l[c] = arguments[c + 3];
                t.children = l
            }
            return {
                $$typeof: G,
                type: e,
                key: void 0 === r ? null: "" + r,
                ref: null,
                props: t,
                _owner: null
            }
        });
        var te = Object(X.c)(Z.e)(["margin-right:8px;"]),
        re = Object(K.c)(function(e) {
            var t = e.product,
            r = t.base_currency,
            o = t.display_name,
            n = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["product"]);
            return ee(V.d, {
                align: "center"
            },
            void 0, ee(te, {
                currency: r
            }), f.a.createElement(V.h, n, o))
        }),
        oe = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var ne = Object(K.c)(function(e) {
            var t = e.price,
            r = e.product,
            o = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["price", "product"]);
            return f.a.createElement(Z.r, oe({
                value: t,
                precision: r.price_precision,
                symbol: r.quote.symbol,
                approximate: !0
            },
            o))
        }),
        ie = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var ae = Object(K.c)(function(e) {
            var t = e.change,
            r = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["change"]);
            if (!t) return f.a.createElement(V.h, ie({
                mono: !0,
                tone: "weak"
            },
            r), "---");
            var o = t.gt(0);
            return f.a.createElement(Z.r, ie({
                value: t.abs(),
                intent: o ? "buy": "sell",
                symbol: o ? "+": "-",
                unit: "%",
                precision: 2
            },
            r))
        }),
        le = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        ce = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ue(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var se, fe = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ue(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.setProduct = function(e) {
                    Object(p.d)("market_select_product_selected", {
                        selected_product: e.id
                    });
                    var t = o.props.dropdownStore;
                    Q.d.push("/trade/" + e.id),
                    t.hide()
                },
                ue(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, f.a.Component),
            ce(t, [{
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props.currency,
                    r = t ? y.v.products.filter(function(e) {
                        return e.quote.id === t
                    }) : y.v.products,
                    o = v.i.sort(r).map(function(e) {
                        return {
                            product: e,
                            name: e.display_name,
                            price: y.u.lastTradePrice(e.id),
                            change: y.u.percentChange(e.id)
                        }
                    });
                    return le(Z.E, {
                        rowCount: o.length,
                        rowGetter: function(e) {
                            var t = e.index;
                            return o[t]
                        },
                        rowHeight: 40,
                        onRowClick: function(t) {
                            var r = t.rowData,
                            o = t.event;
                            o.metaKey || o.ctrlKey || o.altKey || o.shiftKey || e.setProduct(r.product)
                        },
                        useAnchors: !0,
                        backgroundIntent: "navbar",
                        disableHeader: !0
                    },
                    void 0, le(Z.c, {
                        label: "",
                        dataKey: "product",
                        width: 170,
                        flexGrow: 0,
                        flexShrink: 0,
                        cellRenderer: function(e) {
                            var t = e.cellData;
                            return le(re, {
                                product: t
                            })
                        },
                        style: {
                            paddingLeft: "18px"
                        }
                    }), le(Z.c, {
                        label: "",
                        dataKey: "price",
                        width: 160,
                        flexGrow: 1,
                        cellRenderer: function(e) {
                            var t = e.rowData;
                            return f.a.createElement(ne, t)
                        },
                        style: {
                            textAlign: "right"
                        }
                    }), le(Z.c, {
                        label: "",
                        dataKey: "change",
                        width: 240,
                        flexGrow: 0,
                        cellRenderer: function(e) {
                            var t = e.cellData;
                            return le(ae, {
                                change: t
                            })
                        },
                        style: {
                            textAlign: "right",
                            paddingRight: "18px"
                        }
                    }))
                }
            }]),
            t
        } (),
        pe = Object(K.b)("dropdownStore")(Object(K.c)(fe)),
        de = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        he = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function be(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var ye = Object(K.c)(se = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = be(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.state = {
                    currency: "ALL"
                },
                o.updateCurrency = function(e) {
                    Object(p.d)("market_selector_currency_clicked", {
                        currency: e
                    }),
                    o.setState({
                        currency: e
                    })
                },
                be(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, f.a.Component),
            he(t, [{
                key: "render",
                value: function() {
                    var e = this,
                    t = this.state.currency,
                    r = [];
                    return y.v.products.forEach(function(e) {
                        r.find(function(t) {
                            return t.id === e.quote.id
                        }) || r.push(e.quote)
                    }),
                    de(me, {
                        column: !0
                    },
                    void 0, de(ge, {},
                    void 0, de(ve, {
                        id: "ALL",
                        currency: t,
                        onClick: this.updateCurrency
                    }), r.map(function(r) {
                        var o = r.id;
                        return de(ve, {
                            id: o,
                            currency: t,
                            onClick: e.updateCurrency
                        },
                        o)
                    })), de(Z.z, {},
                    void 0, de(pe, {
                        currency: "ALL" === t ? null: t
                    })))
                }
            }]),
            t
        } ()) || se,
        ve = function(e) {
            var t = e.id,
            r = e.currency,
            o = e.onClick;
            return de(Oe, {
                primary: !0,
                onClick: function(e) {
                    function t(t) {
                        return e.apply(this, arguments)
                    }
                    return t.toString = function() {
                        return e.toString()
                    },
                    t
                } (function(e) {
                    e.stopPropagation(),
                    o(t)
                }),
                intent: r === t ? "primary": "highlight",
                active: r === t
            },
            void 0, t)
        },
        me = Object(X.c)(V.d)(["display:flex;width:440px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border:1px solid ", ";border-left:none;background:", ";"], t.colors.divider.
        default, t.colors.navbar.
        default)
        }),
        ge = Object(X.c)(V.d)(["flex-shrink:0;align-items:center;height:60px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:0 ", ";border-bottom:1px solid ", ";"], t.spacing.paddingLeftRight, t.colors.divider.
        default)
        }),
        Oe = Object(X.c)(Z.b).attrs({
            compact: !0
        })(["margin-left:10px;", ";&:first-child{margin-left:0;}"],
        function(e) {
            var t = e.theme;
            return ! e.active && Object(X.b)(["color:", ";"], t.colors.label.
        default)
        }),
        we = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        je = Object(X.c)(V.d)(["align-items:center;overflow:hidden;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:0 ", ";"], t.spacing.paddingLeftRight)
        }),
        Se = Object(X.c)(V.h)(["margin-left:9px;"]),
        _e = Object(X.c)(V.d)(["align-items:center;margin-right:30px;", ";&:last-child{margin-right:0;}"],
        function(e) {
            return e.mobile && Object(X.b)(["flex-direction:column;align-items:flex-start;> ", "{margin-left:0;}"], V.h)
        }),
        xe = Object(K.c)(function() {
            var e = m.a.product,
            t = e && y.u.stats.get(e.id) || {},
            r = t.last,
            o = t.volume_24h,
            n = e && e.price_precision,
            i = e && y.u.percentChange(e.id),
            a = "mobile" === Q.b.size;
            return we(je, {},
            void 0, r && we(_e, {
                mobile: a
            },
            void 0, we(Z.r, {
                value: r,
                precision: n,
                unit: e.quote.id,
                fontWeight: "bold"
            }), we(Se, {
                tone: "weak",
                fontSize: "small"
            },
            void 0, "Last trade price")), i && we(_e, {
                mobile: a
            },
            void 0, we(Z.r, {
                intent: i.lt(0) ? "sell": "buy",
                symbol: i.lt(0) ? "": "+",
                unit: "%",
                value: i,
                precision: 2,
                fontWeight: "bold"
            }), we(Se, {
                tone: "weak",
                fontSize: "small"
            },
            void 0, "24h price")), o && !a && we(_e, {},
            void 0, we(Z.r, {
                value: o,
                unit: e.base.id,
                precision: 0,
                fontWeight: "bold"
            }), we(Se, {
                tone: "weak",
                fontSize: "small"
            },
            void 0, "24h volume")))
        }),
        ke = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Pe = Object(K.b)("dropdownStore")(Object(K.c)(function(e) {
            var t = e.dropdownStore,
            r = m.a.product,
            o = "mobile" === Q.b.size;
            return ke(Ce, {
                noShrink: !0
            },
            void 0, t.hidden ? null: ke(Z.t, {
                top: "92px"
            }), ke(Te, {
                onMouseLeave: t.hide,
                onMouseOver: o ? null: t.show,
                onClick: o ? t.toggle: null,
                mobile: o
            },
            void 0, ke(V.d, {
                center: !0,
                noShrink: !0
            },
            void 0, ke(Ee, {
                currency: r.base_currency
            }), ke(V.h, {
                fontSize: "large",
                fontWeight: "bold"
            },
            void 0, r ? r.id: "")), ke(V.d, {
                center: !0
            },
            void 0, o ? ke(Ae, {
                tone: "default"
            }) : ke(V.h, {
                fontSize: "small"
            },
            void 0, "Select Market", ke(Ae, {
                tone: "default"
            }))), ke(Z.g, {
                hidden: t.hidden,
                left: "0",
                right: o ? "0": "auto",
                height: "400px"
            },
            void 0, ke(ye, {}))), ke(xe, {}))
        })),
        Ce = Object(X.c)(V.d)(["position:relative;height:", "px;", ";"], 46,
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-bottom:1px solid ", ";background:", ";"], t.colors.divider.
        default, t.colors.navbar.
        default)
        }),
        Te = Object(X.c)(V.d)(["flex-shrink:0;justify-content:space-between;cursor:pointer;", ";"],
        function(e) {
            var t = e.theme,
            r = e.mobile;
            return Object(X.b)(["", ";", ";padding:0 ", ";border-right:1px solid ", ";"], !r && Object(X.b)(["position:relative;width:", "px;"], t.spacing.subSidebarWidth), r && Object(X.b)(["flex:0 0 auto;"]), t.spacing.paddingLeftRight, t.colors.divider.
        default)
        }),
        Ae = Object(X.c)(Z.a)(["margin-left:10px;"]),
        Ee = Object(X.c)(Z.e)(["margin-right:8px;"]),
        ze = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Re = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Me(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var De, Be = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Me(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.visibilityStore = new Q.a("market_selector_hovered"),
                Me(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["PureComponent"]),
            Re(t, [{
                key: "render",
                value: function() {
                    return ze(h.b, {
                        dropdownStore: this.visibilityStore
                    },
                    void 0, ze(Pe, {}))
                }
            }]),
            t
        } (),
        Fe = r(11),
        Ie = r.n(Fe),
        Le = r(53),
        $e = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        We = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function qe(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ue = Object(K.c)(De = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = qe(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.dropdownStore = new Q.a("trade_settings_hovered"),
                o.selectTheme = function(e) {
                    Q.f.setTheme(e)
                },
                qe(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            We(t, [{
                key: "render",
                value: function() {
                    var e = this,
                    t = Q.f.selectableThemes,
                    r = Q.f.theme,
                    o = "mobile" === Q.b.size;
                    return $e(Ne, {
                        onMouseLeave: this.dropdownStore.hide,
                        onMouseOver: o ? null: this.dropdownStore.show,
                        onClick: o ? this.dropdownStore.toggle: null
                    },
                    void 0, $e(Le.B, {}), $e(Z.g, {
                        hidden: this.dropdownStore.hidden,
                        right: "0",
                        bottom: "100%",
                        height: "400px"
                    },
                    void 0, $e(He, {},
                    void 0, $e(Ge, {},
                    void 0, "Theme"), t.map(function(t) {
                        return $e(Ye, {
                            onClick: function() {
                                return e.selectTheme(t.name)
                            }
                        },
                        t.name, $e(Ke, {
                            active: r.name === t.name
                        }), $e(V.h, {},
                        void 0, t.displayName))
                    }))))
                }
            }]),
            t
        } ()) || De,
        Ne = Object(X.c)(V.d)(["position:relative;justify-content:center;align-items:center;width:60px;cursor:pointer;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-left:1px solid ", ";"], t.colors.divider.
        default)
        }),
        He = Object(X.c)(V.d)(["flex-direction:column;width:140px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border:1px solid ", ";border-right:none;background:", ";"], t.colors.divider.
        default, t.colors.navbar.
        default)
        }),
        Ge = Object(X.c)(V.h)(["line-height:40px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:0 ", ";border-bottom:1px solid ", ";color:", ";"], t.spacing.paddingLeftRight, t.colors.divider.
        default, t.colors.text.
        default)
        }),
        Ye = Object(X.c)(V.d)(["align-items:center;text-transform:capitalize;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:10px ", ";&:hover{background:", ";}"], t.spacing.paddingLeftRight, t.colors.accent.
        default)
        }),
        Ke = X.c.span(["position:relative;display:block;width:14px;height:14px;margin-right:10px;border-radius:50%;", ";", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border:1px solid ", ";background:", ";"], t.colors.highlight.
        default, t.colors.accent.
        default)
        },
        function(e) {
            var t = e.theme;
            return e.active && Object(X.b)(["::after{content:'';position:absolute;top:50%;left:50%;width:9px;height:9px;border-radius:50%;background:", ";transform:translate(-50%,-50%);}"], t.colors.primary.
        default)
        }),
        Xe = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ve = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Je(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Qe = "pro",
        Ze = /^\/trade/,
        et = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Je(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.visibilityStore = new Q.a("footer_status_hovered"),
                o.statusLinks = {
                    tradingFees: {
                        name: "Trading Fees",
                        href: "/fees"
                    },
                    tradingRules: {
                        name: "Trading Rules",
                        href: "https://www.coinbase.com/legal/trading_rules"
                    },
                    statusPage: {
                        name: "Status Page",
                        href: "https://status." + Qe + ".coinbase.com/"
                    }
                },
                Je(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ve(t, [{
                key: "render",
                value: function() {
                    var e = this.status,
                    t = this.maintenance,
                    r = this.visibilityStore,
                    o = t || "minor" === e.type || "major" === e.type || "critical" === e.type;
                    return Xe(tt, {
                        noShrink: !0
                    },
                    void 0, Xe(ot, {
                        hasExtraInfo: !!e.extraInfo,
                        onMouseOver: e.extraInfo ? r.show: null,
                        onMouseLeave: e.extraInfo ? r.hide: null
                    },
                    void 0, r.hidden ? null: Xe(Z.t, {
                        bottom: "30px",
                        onMouseEnter: r.hide
                    }), Xe(yt, {
                        status: e && e.type
                    }), Xe(V.h, {
                        fontSize: "smaller",
                        tone: "weak"
                    },
                    void 0, e ? e.description: "All systems operational"), "update" === e.type && Xe(nt, {
                        compact: !0,
                        primary: !0,
                        intent: "primary",
                        onClick: Q.e.update
                    },
                    void 0, "鈫� Update"), e.extraInfo ? this.statusDropdown: null), t, o && Xe(rt, {},
                    void 0, Xe(it, {
                        to: "https://status." + Qe + ".coinbase.com"
                    },
                    void 0, "View Status")), Xe(V.d, {
                        auto: !0
                    }), Xe(Ue, {}))
                }
            },
            {
                key: "maintenance",
                get: function() {
                    var e = y.x.scheduledMaintenances,
                    t = e && e.length && e[0];
                    return t ? Xe(rt, {},
                    void 0, "in_progress" === t.status ? Xe(V.h, {
                        fontSize: "smaller",
                        tone: "weak"
                    },
                    void 0, "Maintenance in Progress:", " ", Ie()(t.scheduled_until).format("MMMM Do, h:mm a")) : Xe(V.h, {
                        fontSize: "smaller",
                        tone: "weak"
                    },
                    void 0, "Scheduled Maintenance:", " ", Ie()(t.scheduled_for).format("MMMM Do, h:mm a"))) : null
                }
            },
            {
                key: "status",
                get: function() {
                    var e = Q.e.updateReady,
                    t = m.a.product,
                    r = y.x.status,
                    o = y.q.connected,
                    n = Q.d.pathname;
                    return Ze.test(n) && !o ? {
                        type: "critical",
                        description: "Real-time data offline. Please check your internet connection"
                    }: e ? {
                        type: "update",
                        description: "Updates and enhancements are available"
                    }: t && t.limit_only ? {
                        type: "minor",
                        description: "Limit-Only",
                        extraInfo: "In this state, traders can only place and cancel limit orders. Any market order will be rejected. This ensures customers have full control of the fill price by only allowing orders with an explicitly set limit.",
                        links: ["tradingRules", "statusPage"]
                    }: t && t.post_only ? {
                        type: "minor",
                        description: "Post-Only",
                        extraInfo: "In this state, traders can only place maker orders. No market orders can be placed or filled 鈥� any taker order will be rejected. Users pay 0% trading fees during post-only mode. Open orders can be canceled in this state.",
                        links: ["tradingFees", "tradingRules", "statusPage"]
                    }: r ? {
                        type: r.indicator,
                        description: r.description
                    }: {
                        type: "none",
                        description: "All Systems Operational"
                    }
                }
            },
            {
                key: "statusDropdown",
                get: function() {
                    var e = this.status,
                    t = this.visibilityStore,
                    r = this.statusLinks;
                    return Xe(at, {
                        hidden: t.hidden,
                        left: "0",
                        bottom: "100%",
                        height: "400px"
                    },
                    void 0, Xe(lt, {},
                    void 0, Xe(ct, {},
                    void 0, e.description, " Mode"), Xe(ut, {},
                    void 0, Xe(st, {
                        tone: "weak"
                    },
                    void 0, e.extraInfo), Xe(st, {
                        tone: "weak"
                    },
                    void 0, "For more information, visit:"), e.links && e.links.map(function(e) {
                        return Xe(ft, {
                            to: r[e].href
                        },
                        e, r[e].name)
                    }))))
                }
            }]),
            t
        } (),
        tt = Object(X.c)(V.d)(["position:relative;height:30px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-top:1px solid ", ";background:", ";"], t.colors.divider.
        default, t.colors.navbar.
        default)
        }),
        rt = Object(X.c)(V.d)(["align-items:center;padding:0 10px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-right:1px solid ", ";&:first-child{padding-left:", ";}"], t.colors.divider.weak, t.spacing.paddingLeftRight)
        }),
        ot = Object(X.c)(rt)(["cursor:", ";"],
        function(e) {
            return e.hasExtraInfo ? "pointer": "auto"
        }),
        nt = Object(X.c)(Z.b)(["height:20px;margin-left:10px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";"], t.fonts.size.smaller)
        }),
        it = Object(X.c)(Z.p)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";color:", ";"], t.fonts.size.smaller, t.colors.label.
        default)
        }),
        at = Object(X.c)(Z.g)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["width:", "px;background-color:", ";"], t.spacing.subSidebarWidth, t.colors.accent.
        default)
        }),
        lt = Object(X.c)(V.d)(["flex-direction:column;width:100%;cursor:auto;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border:1px solid ", ";border-left:none;"], t.colors.divider.
        default)
        }),
        ct = X.c.div(["", ";line-height:40px;"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:0 ", ";border-bottom:1px solid ", ";color:", ";"], t.spacing.paddingLeftRight, t.colors.divider.
        default, t.colors.text.
        default)
        }),
        ut = X.c.div(["display:flex;flex-direction:column;padding:", ";"],
        function(e) {
            return e.theme.spacing.padding
        }),
        st = Object(X.c)(V.h)(["margin-bottom:20px;"]),
        ft = Object(X.c)(Z.p)(["align-self:flex-start;line-height:1.5;color:", ";&:last-child{margin-bottom:20px;}"],
        function(e) {
            return e.theme.colors.primary.
        default
        }),
        pt = "#7bee5b",
        dt = "#e5ee5b",
        ht = "#de8a00",
        bt = "#f6500c";
        var yt = X.c.span(["width:9px;height:9px;margin-right:8px;border-radius:100%;", ";"],
        function(e) {
            var t = e.theme,
            r = e.status,
            o = void 0 === r ? "none": r;
            return Object(X.b)(["background:", ";"],
            function(e, t) {
                return "update" === e ? t.colors.primary.
            default:
                "minor" === e ? dt: "major" === e ? ht: "critical" === e ? bt: pt
            } (o, t))
        }),
        vt = Object(K.c)(et),
        mt = r(1125),
        gt = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ot = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        function wt(e, t) {
            var r = {};
            for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
            return r
        }
        var jt = function(e) {
            var t = e.children,
            r = e.borderTop,
            o = e.borderBottom,
            n = e.className,
            i = wt(e, ["children", "borderTop", "borderBottom", "className"]);
            return s.createElement(_t, Ot({
                borderTop: r,
                borderBottom: o,
                className: n
            },
            i), t)
        },
        St = 31,
        _t = Object(X.c)(V.d)(["position:relative;flex-shrink:0;height:", "px;", ";"], St,
        function(e) {
            var t = e.theme,
            r = e.borderTop,
            o = e.borderBottom,
            n = void 0 === o || o;
            return Object(X.b)(["border-top:", ";border-bottom:", ";font-size:", ";color:", ";background:", ";"], r ? "1px solid " + t.colors.divider.
        default:
            "none", n ? "1px solid " + t.colors.divider.
        default:
            "none", t.fonts.size.small, t.colors.text.weak, t.colors.base.
        default)
        }),
        xt = function(e) {
            var t = e.children,
            r = e.justify,
            o = e.className,
            n = wt(e, ["children", "justify", "className"]);
            return s.createElement(kt, Ot({
                auto: !0,
                align: "center",
                justify: r,
                className: o
            },
            n), gt(V.h, {
                intent: "label",
                fontSize: "small"
            },
            void 0, t))
        },
        kt = Object(X.c)(V.d)(["display:flex;white-space:pre;", ";"],
        function(e) {
            var t = e.basis,
            r = e.padding,
            o = e.justify,
            n = void 0 === o ? "flex-end": o;
            return Object(X.b)(["flex-basis:", "%;justify-content:", ";padding-right:", "px;"], t, n, r ? "" + r: 0)
        }),
        Pt = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Ct = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } ();
        var Tt = function(e) {
            var t = e.children,
            r = e.className,
            o = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["children", "className"]);
            return s.createElement(Et, Pt({
                className: r
            },
            o), s.Children.map(t,
            function(e, t) {
                return Ct(At, {},
                t, e)
            }))
        },
        At = X.c.li(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-bottom:1px solid ", ";background:", ";&:last-child{border-bottom:none;}&:hover{background:", ";}"], t.colors.divider.
        default, t.colors.base.
        default, t.colors.accent.
        default)
        }),
        Et = X.c.ul(["display:flex;flex:1;flex-direction:column;margin:0;padding:0;list-style:none;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border:1px solid ", ";"], t.colors.divider.
        default)
        }),
        zt = r(38),
        Rt = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Mt = function(e) {
            var t = e.title,
            r = e.noFlex,
            o = e.children,
            n = e.type,
            i = e.showOverflow;
            return Rt(Dt, {
                column: !0,
                noFlex: r,
                type: n,
                showOverflow: i
            },
            void 0, Rt(zt.a, {},
            void 0, Rt(Bt, {},
            void 0, t), Rt(Ft, {
                showOverflow: i
            },
            void 0, Rt(zt.a, {},
            void 0, o))))
        },
        Dt = Object(X.c)(V.d)(["", ";", ";", ";"],
        function(e) {
            var t = e.showOverflow;
            return Object(X.b)(["overflow:", ";"], t ? "visible": "hidden")
        },
        function(e) {
            var t = e.theme,
            r = e.type,
            o = void 0 === r ? "secondary": r;
            return Object(X.b)(["color:", ";background:", ";"], t.colors.text.
        default, "primary" === o ? t.colors.accent.
        default:
            t.colors.base.
        default)
        },
        function(e) {
            return e.noFlex ? "": Object(X.b)(["flex:1 1 auto;"])
        }),
        Bt = Object(X.c)(V.d)(["flex-shrink:0;align-items:center;height:46px;font-size:12px;font-weight:bold;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:0 ", ";border-bottom:1px solid ", ";background:", ";"], t.spacing.paddingLeftRight, t.colors.divider.
        default, t.colors.accent.
        default)
        }),
        Ft = Object(X.c)(V.d)(["flex:1;flex-direction:column;", ";"],
        function(e) {
            var t = e.showOverflow;
            return Object(X.b)(["overflow:", ";"], t ? "visible": "hidden")
        }),
        It = Object(X.c)(V.h)(["padding:0 5px 2px;cursor:pointer;transition:color 0.15s ease-in-out,border-color 0.15s ease-in-out;", ";&:first-child{padding-left:0;}&:last-child{padding-right:0;}"],
        function(e) {
            var t = e.theme,
            r = e.active;
            return Object(X.b)(["border-bottom:1px solid ", ";font-size:", ";color:", ";"], r ? t.colors.text.
        default:
            t.colors.label.weak, t.fonts.size.smaller, r ? t.colors.text.
        default:
            t.colors.label.weak)
        }),
        Lt = r(1143),
        $t = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Wt = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function qt(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ut = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = qt(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.state = {
                    modal: null
                },
                o.hideModal = function() {
                    o.setState({
                        modal: null
                    })
                },
                o.onDeposit = function() {
                    o.setState({
                        modal: "deposit"
                    })
                },
                o.onWithdraw = function() {
                    o.setState({
                        modal: "withdraw"
                    })
                },
                o.onSelectQuoteBalance = function() {
                    var e = o.props.orderFormStore;
                    e.setSide("buy"),
                    e.prefillMax()
                },
                o.onSelectBaseBalance = function() {
                    var e = o.props.orderFormStore;
                    e.setSide("sell"),
                    e.prefillMax()
                },
                qt(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Wt(t, [{
                key: "componentDidMount",
                value: function() {
                    y.o.refreshAccounts()
                }
            },
            {
                key: "render",
                value: function() {
                    var e = F.quoteAccount,
                    t = F.baseAccount,
                    r = F.stale,
                    o = m.a.product,
                    n = this.state.modal;
                    return $t(Mt, {
                        title: "Wallet Balance",
                        type: "primary",
                        noFlex: !0
                    },
                    void 0, $t(Gt, {
                        type: "primary"
                    },
                    void 0, $t(xt, {
                        justify: "flex-start"
                    },
                    void 0, "Asset"), $t(V.d, {
                        auto: !0
                    }), $t(xt, {},
                    void 0, "Amount")), $t(Ht, {
                        column: !0
                    },
                    void 0, $t(V.d, {
                        auto: !0
                    },
                    void 0, $t(V.d, {
                        column: !0,
                        auto: !0
                    },
                    void 0, $t(Yt, {
                        justify: "flex-start"
                    },
                    void 0, o.quote.id), $t(Yt, {},
                    void 0, o.base.id)), r ? $t(Le.C, {}) : $t(V.d, {
                        column: !0
                    },
                    void 0, $t(Kt, {
                        roundingMode: 0,
                        value: e ? e.available: 0,
                        precision: o.quote.precision,
                        onClick: this.onSelectQuoteBalance
                    }), $t(Kt, {
                        roundingMode: 0,
                        value: t ? t.available: 0,
                        precision: o.base.precision,
                        onClick: this.onSelectBaseBalance
                    }))), $t(V.d, {},
                    void 0, $t(Xt, {
                        onClick: this.onDeposit,
                        eventName: "deposit_button_clicked"
                    },
                    void 0, $t(Vt, {}), " DEPOSIT"), $t(Xt, {
                        onClick: this.onWithdraw,
                        eventName: "withdrawal_button_clicked"
                    },
                    void 0, $t(Jt, {}), " WITHDRAW"))), n && $t(Lt.a, {
                        type: n,
                        onClose: this.hideModal,
                        suggestedCurrencies: [o.base, o.quote],
                        refreshStore: y.o.refreshAccounts
                    }))
                }
            }]),
            t
        } (),
        Nt = Object(K.b)("orderFormStore")(Object(K.c)(Ut)),
        Ht = Object(X.c)(V.d)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:", ";"], t.spacing.padding)
        }),
        Gt = Object(X.c)(jt)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:0 ", ";background:", ";"], t.spacing.paddingLeftRight, t.colors.accent.
        default)
        }),
        Yt = Object(X.c)(V.h)(["margin-bottom:14px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";"], t.fonts.size.small)
        }),
        Kt = Object(X.c)(Z.r)(["margin-bottom:14px;font-weight:bold;text-align:right;cursor:pointer;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";"], t.fonts.size.small)
        }),
        Xt = Object(X.c)(Z.b)(["&:not(:first-child){margin-left:20px;}"]),
        Vt = Object(X.c)(Le.i)(["margin-top:1px;margin-right:5px;"]),
        Jt = Object(X.c)(Le.G)(["margin-top:1px;margin-right:5px;"]),
        Qt = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Zt = Object(X.c)(Z.b)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["color:", ";"], t.colors.text.
        default)
        }),
        er = Object(X.c)(Z.p)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";color:", ";"], t.fonts.size.smaller, t.colors.text.
        default)
        }),
        tr = Object(X.c)(V.d)(["flex:0 0 auto;", ";> ", ",> ", "{margin-bottom:", ";&:last-child{margin-bottom:0;}}"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:", ";background:", ";"], t.spacing.padding, t.colors.primary.
        default)
        },
        V.h, Zt,
        function(e) {
            return e.theme.spacing.halfPaddingTopBottom
        }),
        rr = Object(K.c)(function() {
            var e = y.y.user,
            t = m.a.product;
            return e ? e.active_at ? t && !t.accessible ? Qt(tr, {
                column: !0,
                "data-pup": mt.TRADE.USER_PANEL_VIEW_ONLY
            },
            void 0, Qt(V.h, {
                fontSize: "large"
            },
            void 0, "View Only"), Qt(V.h, {
                fontSize: "small"
            },
            void 0, t.display_name, " trading is not yet available in your region.")) : Qt(V.d, {
                column: !0,
                none: !0,
                "data-pup": mt.TRADE.USER_PANEL_ACTIVE
            },
            void 0, t.status_message && Qt(tr, {
                column: !0
            },
            void 0, Qt(V.h, {},
            void 0, t.status_message)), Qt(Nt, {})) : Qt(tr, {
                column: !0,
                "data-pup": mt.TRADE.USER_PANEL_RESTRICTED
            },
            void 0, Qt(V.h, {
                fontSize: "large"
            },
            void 0, "Restricted Access"), Qt(V.h, {
                fontSize: "small"
            },
            void 0, "Deposits and order placement are disabled on your account."), Qt(er, {
                to: "/signup"
            },
            void 0, "Complete your account")) : Qt(tr, {
                column: !0,
                "data-pup": mt.TRADE.USER_PANEL_UNAUTH
            },
            void 0, Qt(Zt, {
                intent: "primary",
                onClick: v.l.signin
            },
            void 0, "Sign in"), Qt(V.h, {
                align: "center"
            },
            void 0, "or"), Qt(Zt, {
                intent: "primary",
                onClick: v.l.signup
            },
            void 0, "Create account"))
        }),
        or = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        nr = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ir(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var ar = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ir(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.switchSide = function(e) {
                    o.props.orderFormStore.setSide(e)
                },
                o.switchSideBuy = o.switchSide.bind(o, "buy"),
                o.switchSideSell = o.switchSide.bind(o, "sell"),
                ir(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            nr(t, [{
                key: "render",
                value: function() {
                    var e = this.props.orderFormStore.side;
                    return or(lr, {},
                    void 0, or(Z.G, {
                        "data-pup": mt.TRADE.ORDER_SIDE_BUY,
                        intent: "buy",
                        active: "buy" === e,
                        onClick: this.switchSideBuy
                    },
                    void 0, "BUY"), or(Z.G, {
                        "data-pup": mt.TRADE.ORDER_SIDE_SELL,
                        intent: "sell",
                        active: "sell" === e,
                        onClick: this.switchSideSell
                    },
                    void 0, "SELL"))
                }
            }]),
            t
        } (),
        lr = Object(X.c)(Z.F)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["margin-bottom:", ";padding:0 ", ";"], t.spacing.paddingTopBottom, t.spacing.padding)
        }),
        cr = Object(K.b)("orderFormStore")(Object(K.c)(ar)),
        ur = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        sr = Object(K.b)("orderFormStore")(Object(K.c)(function(e) {
            var t = e.orderFormStore,
            r = t.type,
            o = t.setTypeMarket,
            n = t.setTypeLimit,
            i = t.setTypeStop;
            return ur(V.d, {},
            void 0, ur(Z.B, {
                type: r
            },
            void 0, ur(Z.C, {
                onClick: o,
                title: "Market",
                type: "market",
                "data-pup": mt.TRADE.MARKET_ORDER_TAB
            }), ur(Z.C, {
                onClick: n,
                title: "Limit",
                type: "limit",
                "data-pup": mt.TRADE.LIMIT_ORDER_TAB
            }), ur(Z.C, {
                onClick: i,
                title: "Stop",
                type: "stop",
                "data-pup": mt.TRADE.STOP_ORDER_TAB
            })))
        })),
        fr = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        pr = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function dr(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var hr = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = dr(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.setAmount = function(e) {
                    var t = o.props.orderFormStore,
                    r = e.target.value;
                    t.setAmount(r)
                },
                dr(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            pr(t, [{
                key: "render",
                value: function() {
                    var e = this.props.orderFormStore,
                    t = m.a.product,
                    r = e.amount,
                    o = e.side,
                    n = e.prefillMax;
                    return t ? fr(Z.f, {
                        "data-pup": mt.TRADE.MARKET_ORDER_AMOUNT,
                        label: "Amount",
                        currency: "sell" === o ? t.base.id: t.quote.id,
                        precision: "sell" === o ? t.base.precision: t.quote.precision,
                        value: r,
                        onChange: this.setAmount,
                        action: {
                            onClick: n,
                            text: "Max"
                        }
                    }) : null
                }
            }]),
            t
        } (),
        br = Object(K.b)("orderFormStore")(Object(K.c)(hr)),
        yr = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        vr = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function mr(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var gr = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = mr(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.setPostOnly = function(e) {
                    var t = o.props.orderFormStore;
                    e && t.postOnlyDisabled || t.setPostOnly(e)
                },
                o.setPostOnlyFalse = o.setPostOnly.bind(o, !1),
                o.setPostOnlyTrue = o.setPostOnly.bind(o, !0),
                mr(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            vr(t, [{
                key: "render",
                value: function() {
                    var e = this.props.orderFormStore,
                    t = e.post_only,
                    r = e.postOnlyDisabled,
                    o = e.side;
                    return yr(V.d, {
                        column: !0
                    },
                    void 0, yr(Z.n, {},
                    void 0, "Execution"), yr(Z.F, {},
                    void 0, yr(Z.G, {
                        active: t,
                        disabled: r,
                        onClick: this.setPostOnlyTrue
                    },
                    void 0, "Post Only"), yr(Z.G, {
                        active: !t,
                        onClick: this.setPostOnlyFalse
                    },
                    void 0, "Allow Taker")), yr(wr, {},
                    void 0, this.note, " ", yr(jr, {
                        to: "https://support.pro.coinbase.com/customer/en/portal/articles/2945313-overview-of-order-types-and-settings-stop-limit-market-?b_id=17474",
                        eventName: "limit_order_execution_learn_more_clicked",
                        eventProperties: {
                            order_side: o,
                            product_id: m.a.product.id
                        }
                    },
                    void 0, "Learn more")))
                }
            },
            {
                key: "note",
                get: function() {
                    return this.props.orderFormStore.post_only ? "Your order will only execute as a maker order.": "Your order may execute as a maker order or taker order."
                }
            }]),
            t
        } (),
        Or = function(e) {
            var t = e.theme,
            r = t.colors,
            o = t.fonts;
            return Object(X.b)(["font-size:", ";color:", ";"], o.size.smaller, r.text.weak)
        },
        wr = X.c.div(["", ";margin:14px 0;"], Or),
        jr = Object(X.c)(Z.p)(["", ";"], Or),
        Sr = Object(K.b)("orderFormStore")(Object(K.c)(gr)),
        _r = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        xr = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function kr(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Pr, Cr = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = kr(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.changeTimeInForce = function(e) {
                    var t = e;
                    o.props.orderFormStore.setTimeInForce(t)
                },
                o.changeCancelAfter = function(e) {
                    var t = e;
                    o.props.orderFormStore.setCancelAfter(t)
                },
                o.toggleAdvanced = function() {
                    o.props.orderFormStore.toggleAdvanced()
                },
                kr(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            xr(t, [{
                key: "render",
                value: function() {
                    var e = this.props.orderFormStore,
                    t = e.show_advanced,
                    r = e.time_in_force,
                    o = e.cancel_after,
                    n = {
                        GTC: "Good Til Cancelled",
                        GTT: "Good Till Time",
                        IOC: "Immediate or Cancel",
                        FOK: "Fill or Kill"
                    },
                    i = {
                        min: "One Minute",
                        hour: "One Hour",
                        day: "One Day"
                    };
                    return _r(Z.j, {
                        title: _r(V.h, {
                            fontSize: "smaller"
                        },
                        void 0, "Advanced"),
                        show: t,
                        onClick: this.toggleAdvanced
                    },
                    void 0, _r(V.d, {
                        column: !0
                    },
                    void 0, _r(Ar, {},
                    void 0, _r(Tr, {},
                    void 0, "Time In Force Policy"), _r(Z.A, {
                        onChange: this.changeTimeInForce,
                        value: r,
                        font: "small",
                        compact: !0
                    },
                    void 0, Object.keys(n).map(function(e) {
                        return _r(Z.v, {
                            value: e
                        },
                        e, n[e])
                    }))), "GTT" !== r ? null: _r(Ar, {},
                    void 0, _r(Tr, {},
                    void 0, "Cancel After"), _r(Z.A, {
                        onChange: this.changeCancelAfter,
                        value: o,
                        font: "small",
                        compact: !0
                    },
                    void 0, Object.keys(i).map(function(e) {
                        return _r(Z.v, {
                            value: e
                        },
                        e, i[e])
                    })))))
                }
            }]),
            t
        } (),
        Tr = Object(X.c)(V.h)(["margin-bottom:5px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";color:", ";"], t.fonts.size.small, t.colors.label.
        default)
        }),
        Ar = X.c.div(["display:flex;flex-direction:column;margin-top:10px;"]),
        Er = Object(K.b)("orderFormStore")(Object(K.c)(Cr)),
        zr = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Rr = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Mr(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Dr = Object(K.c)(Pr = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Mr(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.setAmount = function(e) {
                    var t = o.props.orderFormStore,
                    r = e.target.value;
                    t.setAmount(r)
                },
                o.setPrice = function(e) {
                    var t = o.props.orderFormStore,
                    r = e.target.value;
                    t.setPrice(r)
                },
                Mr(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Rr(t, [{
                key: "render",
                value: function() {
                    var e = m.a.product;
                    if (!e) return null;
                    var t = this.props.orderFormStore,
                    r = t.amount,
                    o = t.price,
                    n = t.prefillMax;
                    return zr("div", {},
                    void 0, zr(Br, {
                        "data-pup": mt.TRADE.LIMIT_ORDER_AMOUNT,
                        label: "Amount",
                        currency: e.base.id,
                        precision: e.base.precision,
                        value: r,
                        onChange: this.setAmount,
                        action: {
                            onClick: n,
                            text: "Max"
                        }
                    }), zr(Br, {
                        "data-pup": mt.TRADE.LIMIT_ORDER_PRICE,
                        label: "Limit Price",
                        currency: e.quote.id,
                        precision: e.quote.precision,
                        value: o,
                        onChange: this.setPrice
                    }), zr(Sr, {}), zr(Er, {}))
                }
            }]),
            t
        } ()) || Pr,
        Br = Object(X.c)(Z.f)(["", ";"],
        function(e) {
            return "\n        margin-bottom: " + e.theme.spacing.halfPaddingTopBottom + ";\n    "
        }),
        Fr = Object(K.b)("orderFormStore")(Object(K.c)(Dr)),
        Ir = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Lr = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function $r(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Wr = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = $r(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.setAmount = function(e) {
                    var t = o.props.orderFormStore,
                    r = e.target.value;
                    t.setAmount(r)
                },
                o.setStopPrice = function(e) {
                    var t = o.props.orderFormStore,
                    r = e.target.value;
                    t.setStopPrice(r)
                },
                o.setLimitPrice = function(e) {
                    var t = o.props.orderFormStore,
                    r = e.target.value;
                    t.setPrice(r)
                },
                o.toggleAdvanced = function() {
                    o.props.orderFormStore.toggleAdvanced()
                },
                $r(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Lr(t, [{
                key: "render",
                value: function() {
                    var e = this.props.orderFormStore,
                    t = m.a.product,
                    r = e.amount,
                    o = e.stop_price,
                    n = e.price,
                    i = e.side,
                    a = e.show_advanced,
                    l = e.prefillMax;
                    return t ? Ir("div", {},
                    void 0, Ir(qr, {
                        "data-pup": mt.TRADE.STOP_ORDER_AMOUNT,
                        label: "Amount",
                        currency: "sell" === i ? t.base.id: t.quote.id,
                        precision: "sell" === i ? t.base.precision: t.quote.precision,
                        value: r,
                        onChange: this.setAmount,
                        action: {
                            onClick: l,
                            text: "Max"
                        }
                    }), Ir(qr, {
                        "data-pup": mt.TRADE.STOP_ORDER_PRICE,
                        label: "Stop Price",
                        currency: t.quote.id,
                        precision: t.quote.precision,
                        value: o,
                        onChange: this.setStopPrice
                    }), Ir(Z.j, {
                        title: Ir(V.h, {
                            fontSize: "small"
                        },
                        void 0, "Advanced"),
                        show: a,
                        onClick: this.toggleAdvanced
                    },
                    void 0, Ir(Ur, {
                        label: "Limit Price",
                        currency: t.quote.id,
                        precision: t.quote.precision,
                        value: n,
                        onChange: this.setLimitPrice
                    }))) : null
                }
            }]),
            t
        } (),
        qr = Object(X.c)(Z.f)(["", ";"],
        function(e) {
            return "\n        margin-bottom: " + e.theme.spacing.halfPaddingTopBottom + ";\n    "
        }),
        Ur = Object(X.c)(Z.f)(["", ";"],
        function(e) {
            return "\n        margin-top: " + e.theme.spacing.halfPaddingTopBottom + ";\n    "
        }),
        Nr = Object(K.b)("orderFormStore")(Object(K.c)(Wr)),
        Hr = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Gr = function(e) {
            var t = e.label,
            r = e.value,
            o = e.currency,
            n = o.id,
            i = o.precision,
            a = o.symbol;
            return Hr(Yr, {
                align: "center",
                justify: "space-between"
            },
            void 0, Hr(V.h, {
                fontSize: "smaller"
            },
            void 0, t, " (", n, ") 鈮�"), Hr(V.h, {
                mono: !0,
                fontSize: "smaller"
            },
            void 0, r ? Hr(Z.r, {
                value: r,
                symbol: a,
                precision: i,
                fontSize: "smaller"
            }) : "N/A"))
        },
        Yr = Object(X.c)(V.d)(["margin-top:3px;&:first-child{margin-top:0;}"]),
        Kr = Object(K.b)("orderFormStore")(Object(K.c)(function(e) {
            var t = e.orderFormStore,
            r = m.a.product,
            o = t.feeEstimation,
            n = t.total,
            i = t.totalCurrency;
            return r ? Hr(V.d, {
                column: !0
            },
            void 0, Hr(Gr, {
                label: "Fee",
                value: o,
                currency: r.quote
            }), Hr(Gr, {
                label: "Total",
                value: n,
                currency: i
            })) : null
        })),
        Xr = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Vr = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Jr = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        var Qr = function(e) {
            function t() {
                return function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return ! t || "object" != typeof t && "function" != typeof t ? e: t
                } (this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["PureComponent"]),
            Jr(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.step,
                    r = e.children,
                    o = function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["step", "children"]);
                    return s.createElement(Z.b, Xr({
                        primary: !0,
                        intent: this.intent,
                        inactive: "available" !== t
                    },
                    o), "available" === t ? r: "loading" === t ? Vr(Le.C, {
                        height: 21,
                        opacity: 1
                    }) : "success" === t ? "鉁� Success!": "鈿� Error")
                }
            },
            {
                key: "intent",
                get: function() {
                    var e = this.props,
                    t = e.side;
                    switch (e.step) {
                    case "available":
                        return "buy" === t ? "buy": "sell";
                    case "loading":
                        return "secondary";
                    case "success":
                        return "primary";
                    case "failure":
                        return "alert";
                    default:
                        throw new b.e("Unknown step")
                    }
                }
            }]),
            t
        } (),
        Zr = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        eo = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function to(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var ro = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = to(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.keyPressed = function(e) {
                    var t = o.props.onSubmit;
                    13 === e.keyCode && t()
                },
                to(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["PureComponent"]),
            eo(t, [{
                key: "componentDidMount",
                value: function() {
                    window.addEventListener("keypress", this.keyPressed)
                }
            },
            {
                key: "componentWillUnmount",
                value: function() {
                    window.removeEventListener("keypress", this.keyPressed)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.onClose,
                    r = e.onSubmit;
                    return Zr(Z.u, {
                        onClose: t,
                        title: this.title,
                        maxWidth: 400
                    },
                    void 0, Zr(oo, {
                        column: !0,
                        auto: !0
                    },
                    void 0, Zr(no, {
                        auto: !0
                    },
                    void 0, this.message), Zr(V.d, {
                        noShrink: !0
                    },
                    void 0, Zr(io, {
                        "data-pup": mt.TRADE.ORDER_CONFIRMATION_MODAL_CANCEL,
                        onClick: t,
                        intent: "accent"
                    },
                    void 0, "Cancel"), Zr(io, {
                        "data-pup": mt.TRADE.ORDER_CONFIRMATION_MODAL_CONFIRM,
                        onClick: r,
                        intent: "primary",
                        primary: !0
                    },
                    void 0, "Place Order"))))
                }
            },
            {
                key: "title",
                get: function() {
                    return this.props.type + " warning"
                }
            },
            {
                key: "message",
                get: function() {
                    var e = this.props.type;
                    if ("slippage" === e) return Zr(V.h, {},
                    void 0, "Placing this order will result in greater than 2% slippage. Are you sure you would like to continue?");
                    if ("stop" === e) return Zr(V.h, {},
                    void 0, "This order may fill at a price less favorable than the stop price. Are you sure you would like to continue?");
                    if ("stop-limit" === e) return Zr(V.h, {},
                    void 0, "This order may not fill immediately when executed. Are you sure you would like to continue?");
                    throw new b.e("modal type not provided")
                }
            }]),
            t
        } (),
        oo = Object(X.c)(V.d)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:", ";"], t.spacing.padding)
        }),
        no = Object(X.c)(V.d)(["margin:30px 0;"]),
        io = Object(X.c)(Z.b)(["margin-top:20px;&:not(:first-child){margin-left:20px;}"]),
        ao = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        lo = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function co(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var uo, so, fo, po, ho, bo, yo = function(e) {
            function t() {
                var e, r, o, n, i = this; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var a = arguments.length,
                l = Array(a), c = 0; c < a; c++) l[c] = arguments[c];
                return r = o = co(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(l))),
                o.state = {
                    step: "available",
                    error: null,
                    modal: ""
                },
                o.setError = function(e) {
                    o.setState({
                        error: e instanceof Error ? e.message: e,
                        step: "failure"
                    }),
                    setTimeout(function() {
                        return o.setState({
                            step: "available"
                        })
                    },
                    1500)
                },
                o.clearError = function() {
                    o.setState({
                        error: ""
                    })
                },
                o.onReset = function() {
                    o.props.orderFormStore.reset()
                },
                o.onSubmitOrder = function(e) {
                    e.preventDefault();
                    var t = o.props.orderFormStore,
                    r = y.y.user;
                    if ("available" === o.state.step && r) {
                        var n = t.validateOrder();
                        if (n) return o.setError(n);
                        if ("market" === t.type) if (t.validateSlippage()) return o.setState({
                            modal: "slippage"
                        });
                        if ("stop" === t.type) return t.show_advanced && t.price ? o.setState({
                            modal: "stop-limit"
                        }) : o.setState({
                            modal: "stop"
                        });
                        o.placeOrder()
                    }
                },
                o.placeOrder = (n = regeneratorRuntime.mark(function e() {
                    var t, r;
                    return regeneratorRuntime.wrap(function(e) {
                        for (;;) switch (e.prev = e.next) {
                        case 0:
                            if (t = o.props.orderFormStore, r = y.y.user, "available" === o.state.step && r) {
                                e.next = 4;
                                break
                            }
                            return e.abrupt("return");
                        case 4:
                            return o.setState({
                                step:
                                "loading"
                            }),
                            o.clearError(),
                            e.prev = 6,
                            e.next = 9,
                            t.submit();
                        case 9:
                            t.track("successful_order_through_UI"),
                            o.setState({
                                step: "success"
                            }),
                            setTimeout(function() {
                                return o.setState({
                                    step: "available"
                                })
                            },
                            1500),
                            e.next = 18;
                            break;
                        case 14:
                            e.prev = 14,
                            e.t0 = e.
                            catch(6),
                            o.setError(e.t0),
                            t.track("unsuccessful_order_through_UI", {
                                error: e.t0
                            });
                        case 18:
                        case "end":
                            return e.stop()
                        }
                    },
                    e, i, [[6, 14]])
                }),
                function() {
                    var e = n.apply(this, arguments);
                    return new Promise(function(t, r) {
                        return function o(n, i) {
                            try {
                                var a = e[n](i),
                                l = a.value
                            } catch(e) {
                                return void r(e)
                            }
                            if (!a.done) return Promise.resolve(l).then(function(e) {
                                o("next", e)
                            },
                            function(e) {
                                o("throw", e)
                            });
                            t(l)
                        } ("next")
                    })
                }),
                o.onModalClose = function() {
                    o.setState({
                        modal: ""
                    })
                },
                o.onModalSubmit = function() {
                    o.setState({
                        modal: ""
                    }),
                    o.placeOrder()
                },
                co(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            lo(t, [{
                key: "render",
                value: function() {
                    var e = this.state,
                    t = e.error,
                    r = e.step,
                    o = e.modal,
                    n = this.props.orderFormStore.side;
                    return m.a.product ? ao(Mt, {
                        title: "Order Form",
                        type: "primary"
                    },
                    void 0, ao("form", {
                        onSubmit: this.onSubmitOrder
                    },
                    void 0, ao(vo, {},
                    void 0, ao(cr, {})), ao(sr, {}), ao(mo, {
                        column: !0
                    },
                    void 0, this.orderForm, ao(go, {}), ao(Kr, {}), ao(Qr, {
                        "data-pup": mt.TRADE.PLACE_ORDER_BUTTON,
                        side: n,
                        step: r,
                        onClick: this.onSubmitOrder
                    },
                    void 0, "PLACE ", n.toUpperCase(), " ORDER"), t && ao(Oo, {
                        onClick: this.clearError
                    },
                    void 0, ao(wo, {},
                    void 0, t), ao(V.c, {}))), ao(jo, {})), o && ao(ro, {
                        type: o,
                        onClose: this.onModalClose,
                        onSubmit: this.onModalSubmit
                    })) : null
                }
            },
            {
                key: "orderForm",
                get: function() {
                    var e = this.props.orderFormStore.type;
                    return "market" === e ? ao(br, {}) : "limit" === e ? ao(Fr, {}) : "stop" === e ? ao(Nr, {}) : void 0
                }
            }]),
            t
        } (),
        vo = Object(X.c)(V.d)(["padding:", ";"],
        function(e) {
            var t = e.theme;
            return t.spacing.paddingTopBottom + " " + t.spacing.paddingLeftRight + " 0 " + t.spacing.paddingLeftRight
        }),
        mo = Object(X.c)(V.d)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["padding:", ";> div{margin-bottom:", ";}"], t.spacing.padding, t.spacing.paddingTopBottom)
        }),
        go = X.c.div(["flex:1;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-top:2px solid ", ";"], t.colors.highlight.
        default)
        }),
        Oo = X.c.div(["display:flex;padding:7px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["background:", ";"], t.colors.alert.
        default)
        }),
        wo = Object(X.c)(V.h)(["flex:1;margin-left:8px;"]),
        jo = X.c.button(["display:none;"]),
        So = Object(K.b)("orderFormStore")(Object(K.c)(yo)),
        _o = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        xo = Object(X.c)(V.d)(["flex:1;overflow:hidden;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["background:", ";"], t.colors.accent.
        default)
        }),
        ko = Object(X.c)(V.d)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-top:1px solid ", ";"], t.colors.divider.
        default)
        }),
        Po = function() {
            return _o(xo, {},
            void 0, _o(Z.z, {},
            void 0, _o(rr, {}), _o(ko, {}), _o(So, {})))
        },
        Co = r(355),
        To = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Ao = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Eo(e, t) {
            var r = {};
            for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
            return r
        }
        function zo(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function Ro(e, t) {
            if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
            e.prototype = Object.create(t && t.prototype, {
                constructor: {
                    value: e,
                    enumerable: !1,
                    writable: !0,
                    configurable: !0
                }
            }),
            t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
        }
        function Mo(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function Do(e, t) {
            if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
        }
        function Bo(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var Fo = new(so = Bo((uo = function e() {
            Do(this, e),
            Mo(this, "pixelRatio", so, this),
            Mo(this, "update", fo, this),
            Object(O.d)(this.update, 1e3)
        }).prototype, "pixelRatio", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return Object(Co.getPixelRatio)()
            }
        }), fo = Bo(uo.prototype, "update", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.pixelRatio = Object(Co.getPixelRatio)()
                }
            }
        }), uo),
        Io = function(e) {
            function t() {
                var e, r, o;
                Do(this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = zo(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.state = {
                    width: 0,
                    height: 0
                },
                o.resize = function() {
                    o.timeout && clearTimeout(o.timeout),
                    o.timeout = setTimeout(o.setSize, 50)
                },
                o.setSize = function() {
                    var e = o.props.onSize;
                    if (o.element) {
                        o.timeout = null;
                        var t = o.element.getBoundingClientRect(),
                        r = t.width,
                        n = t.height;
                        o.setState({
                            width: r,
                            height: n
                        }),
                        e && e(r, n)
                    }
                },
                o.onElement = function(e) {
                    o.element = e,
                    e && o.resize()
                },
                zo(o, r)
            }
            return Ro(t, s["PureComponent"]),
            Ao(t, [{
                key: "componentDidMount",
                value: function() {
                    window.addEventListener("resize", this.resize),
                    this.disposer = Object(g.observe)(Fo, "pixelRatio", this.resize)
                }
            },
            {
                key: "UNSAFE_componentWillReceiveProps",
                value: function() {
                    var e = this.state,
                    t = e.height,
                    r = e.width;
                    t && r || this.resize()
                }
            },
            {
                key: "componentWillUnmount",
                value: function() {
                    window.removeEventListener("resize", this.resize),
                    this.disposer && this.disposer()
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.children,
                    r = e.className,
                    o = this.state,
                    n = o.width,
                    i = o.height;
                    return s.createElement("div", {
                        ref: this.onElement,
                        style: {
                            display: "flex",
                            position: "relative",
                            flex: 1
                        },
                        className: r
                    },
                    s.Children.map(t,
                    function(e) {
                        return e && s.cloneElement(e, {
                            width: n,
                            height: i
                        })
                    }))
                }
            }]),
            t
        } (),
        Lo = function(e) {
            var t = e.top,
            r = e.right,
            o = e.bottom,
            n = e.left,
            i = e.width,
            a = e.height,
            l = e.children,
            c = e.style,
            u = void 0 === c ? {}: c,
            f = Eo(e, ["top", "right", "bottom", "left", "width", "height", "children", "style"]);
            return s.createElement("div", To({},
            f, {
                style: To({
                    position: "absolute",
                    top: t && t < 0 ? (a || 0) + t: t,
                    right: r && r < 0 ? (i || 0) + r: r,
                    bottom: o && o < 0 ? (a || 0) + o: o,
                    left: n && n < 0 ? (i || 0) + n: n
                },
                u)
            }), l)
        };
        var $o = Object(K.c)((bo = ho = function(e) {
            function t() {
                var e, r, o;
                Do(this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = zo(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.dt = 0,
                o.lastTick = 0,
                o._draw = function() {
                    var e = o.props,
                    t = e.fps,
                    r = e.draw,
                    n = e.buffer,
                    i = Date.now(),
                    a = o.lastTick ? i - o.lastTick: 0;
                    if (o.lastTick = i, o.dt += a, t && o.dt < 1e3 / t) return o.frame = Object(O.c)(o._draw);
                    var l = o.ctx;
                    if (l && (!n || o.buffer)) {
                        var c = o,
                        u = c.canvasWidth,
                        s = c.canvasHeight;
                        if (u && s) {
                            var f, p, d, h = Fo.pixelRatio;
                            t ? (l.setTransform(h, 0, 0, h, 0, 0), r(l, o.canvasWidth, o.canvasHeight, o.dt, o.buffer), o.frame = Object(O.c)(o._draw), o.dt = 0) : (o.disposeDrawer && o.disposeDrawer(), o.disposeDrawer = (f = function() {
                                l.setTransform(h, 0, 0, h, 0, 0),
                                r(l, o.canvasWidth, o.canvasHeight, o.dt, o.buffer)
                            },
                            p = !1, (d = new g.Reaction("autorunAnimFrame",
                            function() {
                                p || (p = !0, Object(O.c)(function() {
                                    p = !1,
                                    d.isDisposed || d.track(f)
                                }))
                            })).schedule(), d.getDisposer()))
                        }
                    }
                },
                o.onCanvas = function(e) {
                    e && (o.ctx = e.getContext("2d"), o.ctx && o.requestFrame())
                },
                o.onBufferCanvas = function(e) {
                    e && (o.buffer = e.getContext("2d"))
                },
                zo(o, r)
            }
            return Ro(t, s["Component"]),
            Ao(t, [{
                key: "componentWillUnmount",
                value: function() {
                    this.frame && Object(O.a)(this.frame),
                    this.disposeDrawer && this.disposeDrawer()
                }
            },
            {
                key: "requestFrame",
                value: function() {
                    this.frame && Object(O.a)(this.frame),
                    this.dt = 0,
                    this.frame = Object(O.c)(this._draw)
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.canvasWidth,
                    t = this.canvasHeight;
                    this.requestFrame();
                    var r = this.props,
                    o = (r.draw, r.buffer),
                    n = Eo(r, ["draw", "buffer"]),
                    i = Fo.pixelRatio;
                    return s.createElement(Lo, n, s.createElement("canvas", {
                        ref: this.onCanvas,
                        width: e * i,
                        height: t * i,
                        style: {
                            width: e,
                            height: t
                        }
                    }), o ? s.createElement("canvas", {
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
            },
            {
                key: "canvasWidth",
                get: function() {
                    var e = this.props,
                    t = e.width,
                    r = void 0 === t ? 0 : t,
                    o = e.left,
                    n = void 0 === o ? 0 : o,
                    i = e.right,
                    a = void 0 === i ? 0 : i;
                    return r ? n < 0 ? a < 0 ? Math.max(r + n + a, 0) : -n - a: a < 0 ? -a - n: r - n - a: 0
                }
            },
            {
                key: "canvasHeight",
                get: function() {
                    var e = this.props,
                    t = e.height,
                    r = void 0 === t ? 0 : t,
                    o = e.top,
                    n = void 0 === o ? 0 : o,
                    i = e.bottom,
                    a = void 0 === i ? 0 : i;
                    return r ? n < 0 ? a < 0 ? Math.max(r + n + a, 0) : -n - a: a < 0 ? -a - n: r - n - a: 0
                }
            }]),
            t
        } (), ho.defaultProps = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            width: 0,
            height: 0
        },
        po = bo)) || po,
        Wo = (r(1144),
        function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ());
        function qo(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Uo, No, Ho = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = qo(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.onRef = function(e) {
                    var t = o.props.onLoad;
                    if (e) {
                        var r = e.querySelector("svg");
                        if (!r) throw new b.e("svg is required for SVGLoader");
                        var n = (new XMLSerializer).serializeToString(r),
                        i = "data:image/svg+xml;base64," + btoa(n),
                        a = new Image;
                        a.src = i,
                        t(a)
                    }
                },
                qo(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Wo(t, [{
                key: "render",
                value: function() {
                    var e = this.props.component;
                    return s.createElement("div", {
                        style: {
                            display: "none"
                        },
                        ref: this.onRef
                    },
                    e)
                }
            }]),
            t
        } (),
        Go = r(108),
        Yo = r(8),
        Ko = r(47),
        Xo = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Vo(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var Jo, Qo, Zo = (Uo = function() {
            function e() {
                var t, r, o, n, i = this; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, e),
                t = this,
                r = "_domain",
                n = this,
                (o = No) && Object.defineProperty(t, r, {
                    enumerable: o.enumerable,
                    configurable: o.configurable,
                    writable: o.writable,
                    value: o.initializer ? o.initializer.call(n) : void 0
                }),
                this.range = {
                    min: 0,
                    max: 0
                },
                this.isDate = !1,
                this.toRange = function(e) {
                    var t = e;
                    i.isDate && t instanceof Date && (t = t.getTime() - Ko.e);
                    var r = i.domain,
                    o = r.min,
                    n = r.max,
                    a = i.range,
                    l = a.min;
                    return l + (t - o) * (a.max - l) / (n - o)
                },
                this.toDomain = function(e) {
                    var t = i.domain,
                    r = t.min,
                    o = t.max,
                    n = i.range,
                    a = n.min,
                    l = n.max;
                    i.isDate && (r += Ko.e, o += Ko.e);
                    var c = r + (e - a) * (o - r) / (l - a);
                    return i.isDate ? new Date(c) : c
                }
            }
            return Xo(e, [{
                key: "domain",
                get: function() {
                    return this._domain
                },
                set: function(e) {
                    var t = e.min,
                    r = e.max;
                    t instanceof Date && r instanceof Date ? (this._domain = {
                        min: t.getTime() - Ko.e,
                        max: r.getTime() - Ko.e
                    },
                    this.isDate = !0) : this._domain = e
                }
            },
            {
                key: "delta",
                get: function() {
                    var e = this.domain,
                    t = e.min;
                    return e.max - t
                }
            }]),
            e
        } (), No = Vo(Uo.prototype, "_domain", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return {
                    min: 0,
                    max: 0
                }
            }
        }), Vo(Uo.prototype, "domain", [g.computed], Object.getOwnPropertyDescriptor(Uo.prototype, "domain"), Uo.prototype), Uo),
        en = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        tn = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function rn(e) {
            if (Array.isArray(e)) {
                for (var t = 0,
                r = Array(e.length); t < e.length; t++) r[t] = e[t];
                return r
            }
            return Array.from(e)
        }
        function on(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function nn(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var an, ln, cn, un = [5 * Ko.c, 10 * Ko.c, 15 * Ko.c, 30 * Ko.c, Ko.b, 2 * Ko.b, 3 * Ko.b, 6 * Ko.b, 12 * Ko.b, Ko.a, 2 * Ko.a, 3 * Ko.a, Ko.f, 2 * Ko.f, Ko.d, 3 * Ko.d, 6 * Ko.d],
        sn = [1, 2, 2.5, 4, 5],
        fn = (Jo = function(e) {
            function t(e) { !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                var r, o, n, i, a = on(this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                return r = a,
                o = "ticks",
                i = a,
                (n = Qo) && Object.defineProperty(r, o, {
                    enumerable: n.enumerable,
                    configurable: n.configurable,
                    writable: n.writable,
                    value: n.initializer ? n.initializer.call(i) : void 0
                }),
                a._numTicks = 5,
                a._domain = {
                    min: 0,
                    max: 0
                },
                a.reformat = !1,
                e ? (a.reformat = e.reformat, a) : on(a)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, Zo),
            tn(t, [{
                key: "calculateTicks",
                value: function() {
                    var e = void 0,
                    t = void 0,
                    r = void 0;
                    this.isDate ? (t = (e = this._dateTicks(this.numTicks))[e.length - 1], r = e[0]) : (t = (e = this._numberTicks(this.numTicks))[0], r = e[e.length - 1]),
                    this.reformat && (this._domain = {
                        min: t,
                        max: r
                    }),
                    this.ticks = e || []
                }
            },
            {
                key: "_dateTicks",
                value: function(e) {
                    var t = this.originalDomain,
                    r = this.steps;
                    if (!e || !r || !r.length) return [];
                    for (var o = t.min,
                    n = t.max,
                    i = W()(n - o), a = i.div(e), l = W()(1), c = 0, u = r.length; c < u && (l = W()(r[c]), !a.lt(l)); c++);
                    var s = W()(n);
                    s = s.minus(s.mod(l));
                    var f = +i.div(l).round(0, 3);
                    return [].concat(rn(Array(f))).map(function(e, t) {
                        return Number(s.minus(l.mul(t)))
                    })
                }
            },
            {
                key: "_numberTicks",
                value: function(e) {
                    var t = this.originalDomain,
                    r = this.steps;
                    if (!e || !r || !r.length) return [];
                    var o = t.min,
                    n = t.max;
                    if (!isFinite(n - o)) return [];
                    for (var i = W()(n - o), a = i.div(e), l = W()(1), c = 1, u = -1; u < 2; u++) {
                        c = i.e + u;
                        for (var s = 0,
                        f = r.length; s < f && ((l = W()(r[s])).e = c, !a.lt(l)); s++);
                        if (a.lt(l)) break
                    }
                    var p = W()(o),
                    d = W()(n);
                    p = p.minus(p.mod(l)),
                    d = d.add(l.minus(d.mod(l)));
                    var h = Number(d.minus(p).div(l).round(0, 3)) + 1;
                    return [].concat(rn(Array(h))).map(function(e, t) {
                        return Number(p.add(l.mul(t)))
                    })
                }
            },
            {
                key: "domain",
                get: function() {
                    return this._domain
                },
                set: function(e) {
                    var t = e.min,
                    r = e.max;
                    t instanceof Date && r instanceof Date ? (this._domain = {
                        min: t.getTime() - Ko.e,
                        max: r.getTime() - Ko.e
                    },
                    this.isDate = !0, this.steps || (this.steps = un)) : (this._domain = e, this.steps || (this.steps = sn)),
                    this.originalDomain = en({},
                    this._domain),
                    this.calculateTicks()
                }
            },
            {
                key: "numTicks",
                get: function() {
                    return this._numTicks
                },
                set: function(e) {
                    e !== this._numTicks && (this._numTicks = e, this.calculateTicks())
                }
            }]),
            t
        } (), Qo = nn(Jo.prototype, "ticks", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return []
            }
        }), nn(Jo.prototype, "domain", [g.computed], Object.getOwnPropertyDescriptor(Jo.prototype, "domain"), Jo.prototype), nn(Jo.prototype, "calculateTicks", [g.action], Object.getOwnPropertyDescriptor(Jo.prototype, "calculateTicks"), Jo.prototype), Jo),
        pn = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function dn(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function hn(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var bn, yn, vn, mn, gn, On = (an = function() {
            function e(t) { !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, e),
                dn(this, "periods", ln, this),
                dn(this, "data", cn, this),
                this.periods = t
            }
            return pn(e, [{
                key: "update",
                value: function(e) {
                    for (var t = this.periods,
                    r = [], o = W()(0), n = 0, i = e.length; n < i; n++) {
                        var a = e[n];
                        o.add(a.close),
                        n < t - 1 || (r.push({
                            candle: e[n],
                            sma: +o.div(t)
                        }), o.minus(e[n - t + 1].close))
                    }
                    this.data = r
                }
            }]),
            e
        } (), ln = hn(an.prototype, "periods", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 0
            }
        }), cn = hn(an.prototype, "data", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return []
            }
        }), hn(an.prototype, "update", [g.action], Object.getOwnPropertyDescriptor(an.prototype, "update"), an.prototype), an),
        wn = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function jn(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function Sn(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        Yo.f.getItem("show-ema") || Yo.f.setItem("show-ema", {});
        var _n, xn, kn, Pn, Cn = (bn = function() {
            function e(t) { !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, e),
                jn(this, "periods", yn, this),
                jn(this, "data", vn, this),
                jn(this, "show", mn, this),
                jn(this, "toggle", gn, this),
                this.periods = t,
                this.sma = new On(t);
                var r = Yo.f.getItem("show-ema") || {};
                this.show = r[t]
            }
            return wn(e, [{
                key: "update",
                value: function(e) {
                    var t = this.periods,
                    r = this.sma;
                    r.update(e.slice( - t));
                    var o = 2 / (t + 1),
                    n = r.data[0] && r.data[0].sma || e[0] && e[0].close;
                    this.data = e.slice(t - 1).map(function(e) {
                        var t = (e.close - n) * o + n;
                        return n = t,
                        {
                            candle: e,
                            ema: t
                        }
                    })
                }
            }]),
            e
        } (), yn = Sn(bn.prototype, "periods", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 0
            }
        }), vn = Sn(bn.prototype, "data", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return []
            }
        }), mn = Sn(bn.prototype, "show", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ! 0
            }
        }), Sn(bn.prototype, "update", [g.action], Object.getOwnPropertyDescriptor(bn.prototype, "update"), bn.prototype), gn = Sn(bn.prototype, "toggle", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.show = !e.show,
                    Object(p.d)("chart_overlay_selected", {
                        overlay: "EMA" + e.periods,
                        showing: e.show
                    });
                    var t = Yo.f.getItem("show-ema") || {};
                    if (e.show) return t[e.periods] = !0,
                    void Yo.f.setItem("show-ema", t);
                    t[e.periods] = !1,
                    Yo.f.setItem("show-ema", t)
                }
            }
        }), bn),
        Tn = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function An(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function En(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var zn, Rn, Mn, Dn, Bn, Fn, In, Ln, $n, Wn, qn, Un, Nn, Hn, Gn, Yn, Kn, Xn, Vn = (_n = function() {
            function e() { !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, e),
                An(this, "x", xn, this),
                An(this, "y", kn, this),
                An(this, "active", Pn, this)
            }
            return Tn(e, [{
                key: "set",
                value: function(e) {
                    if (!e) return this.active = !1;
                    this.x = e.x,
                    this.y = e.y,
                    this.active = !0
                }
            }]),
            e
        } (), xn = En(_n.prototype, "x", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 0
            }
        }), kn = En(_n.prototype, "y", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 0
            }
        }), Pn = En(_n.prototype, "active", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ! 1
            }
        }), En(_n.prototype, "set", [g.action], Object.getOwnPropertyDescriptor(_n.prototype, "set"), _n.prototype), _n),
        Jn = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                    o = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var a, l = e[Symbol.iterator](); ! (o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                    } catch(e) {
                        n = !0,
                        i = e
                    } finally {
                        try { ! o && l.
                            return && l.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                    return r
                } (e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        } (),
        Qn = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Zn(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function ei(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var ti = 16,
        ri = (zn = function() {
            function e(t, r) { !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, e),
                Zn(this, "nodes", Rn, this),
                Zn(this, "mySizes", Mn, this),
                Zn(this, "mouse", Dn, this),
                Zn(this, "selected", Bn, this),
                Zn(this, "renderIndex", Fn, this),
                Zn(this, "renderEndIndex", In, this),
                this.lastTick = Date.now(),
                this.dt = 0,
                this.animationFrame = 0,
                this.columns = {
                    bar: {
                        x: 0,
                        width: .1
                    },
                    size: {
                        x: .1,
                        width: .28,
                        padding: 3
                    },
                    price: {
                        x: .38,
                        width: .3,
                        padding: 3
                    },
                    mySize: {
                        x: .68,
                        width: .32,
                        padding: 16
                    }
                },
                this.disposers = [],
                Zn(this, "resetBook", Ln, this),
                Zn(this, "setSelected", $n, this),
                Zn(this, "setMyOrders", Wn, this),
                Zn(this, "setRenderIndex", qn, this),
                Zn(this, "generate", Un, this),
                Zn(this, "_setAnimation", Nn, this),
                Zn(this, "setNodeRender", Hn, this),
                Zn(this, "setNodeY", Gn, this),
                Zn(this, "runAnimationLoop", Yn, this),
                Zn(this, "updateAnimations", Kn, this),
                Zn(this, "renderAll", Xn, this),
                this.type = t,
                this.ordersStore = r.ordersStore,
                this.orderBookStore = r.orderBookStore,
                this.scrollerStore = r.scrollerStore
            }
            return Qn(e, [{
                key: "subscribe",
                value: function() {
                    var e = this;
                    this.disposers.push(Object(g.observe)(this.ordersStore, "asks" === this.type ? "activeSells": "activeBuys", this.setMyOrders)),
                    this.disposers.push(Object(g.observe)(this.orderBookStore, "book", this.generate)),
                    this.disposers.push(Object(g.observe)(m.a, "product", this.resetBook)),
                    this.disposers.push(Object(g.observe)(this.orderBookStore, "aggregationIndex", this.resetBook)),
                    this.disposers.push(Object(g.observe)(this.scrollerStore, "dimensions", this.setRenderIndex)),
                    this.disposers.push(Object(g.observe)(Q.f, "fontsLoaded",
                    function() {
                        e.renderAll()
                    })),
                    this.disposers.push(Object(g.observe)(Q.f, "theme",
                    function() {
                        e.renderAll()
                    })),
                    this.setRenderIndex(),
                    this.setMyOrders(),
                    this.lastTick = Date.now(),
                    this.runAnimationLoop(),
                    this.orderBookStore.setBook()
                }
            },
            {
                key: "unsubscribe",
                value: function() {
                    this.disposers.forEach(function(e) {
                        return e()
                    }),
                    this.disposers = [],
                    this.animationFrame && Object(O.a)(this.animationFrame)
                }
            },
            {
                key: "firstLoad",
                get: function() {
                    return ! this.nodes.length
                }
            },
            {
                key: "styles",
                get: function() {
                    var e = Q.f.theme,
                    t = e.colors,
                    r = t.base,
                    o = t.accent,
                    n = t.text,
                    i = t.chartSell,
                    a = t.chartBuy,
                    l = t.alert;
                    return {
                        fontFamily: e.fonts.family.mono,
                        fontSize: 10,
                        fontWeight: "500",
                        textAlign: "right",
                        textBaseline: "middle",
                        dimColor: Object(Go.e)(.8, n.
                    default),
                        normalColor: Object(Go.e)(.2, n.
                    default),
                        wholeColor: Object(Go.e)(.2, n.
                    default),
                        asksBarColor: Object(Go.e)(.55, i.
                    default),
                        asksWholeColor: Object(Go.e)(.4, i.
                    default),
                        asksDecimalColor: Object(Go.e)(0, i.
                    default),
                        asksChangeWholeColor: Object(Go.e)(.1, i.
                    default),
                        asksChangeDecimalColor: Object(Go.e)(.8, i.
                    default),
                        bidsBarColor: Object(Go.e)(.55, a.
                    default),
                        bidsWholeColor: Object(Go.e)(.4, a.
                    default),
                        bidsDecimalColor: Object(Go.e)(0, a.
                    default),
                        bidsChangeWholeColor: Object(Go.e)(.1, a.
                    default),
                        bidsChangeDecimalColor: Object(Go.e)(.8, a.
                    default),
                        removeFromColor: r.
                    default,
                        removeToColor: Object(Go.a)(.02, r.
                    default),
                        hoverColor: o.
                    default,
                        cancelColor: l.
                    default
                    }
                }
            }]),
            e
        } (), Rn = ei(zn.prototype, "nodes", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return []
            }
        }), Mn = ei(zn.prototype, "mySizes", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return {}
            }
        }), Dn = ei(zn.prototype, "mouse", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return new Vn
            }
        }), Bn = ei(zn.prototype, "selected", [g.observable], {
            enumerable: !0,
            initializer: null
        }), Fn = ei(zn.prototype, "renderIndex", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 0
            }
        }), In = ei(zn.prototype, "renderEndIndex", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 0
            }
        }), ei(zn.prototype, "firstLoad", [g.computed], Object.getOwnPropertyDescriptor(zn.prototype, "firstLoad"), zn.prototype), Ln = ei(zn.prototype, "resetBook", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.nodes = [],
                    e.setMyOrders()
                }
            }
        }), $n = ei(zn.prototype, "setSelected", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t) {
                    e.selected = t
                }
            }
        }), Wn = ei(zn.prototype, "setMyOrders", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = e.type,
                    r = e.ordersStore,
                    o = r.activeSells,
                    n = r.activeBuys,
                    i = e.orderBookStore,
                    a = i.hasAggregation,
                    l = i.bucket,
                    c = "bids" === t ? n: o;
                    e.mySizes = c.reduce(function(e, t) {
                        var r = t.price.toString();
                        a && (r = l(t.side, r).toString());
                        var o = e[r],
                        n = t.size.minus(t.filled_size);
                        return e[r] = o ? o.add(n) : n,
                        e
                    },
                    {})
                }
            }
        }), qn = ei(zn.prototype, "setRenderIndex", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = e.type,
                    r = e.scrollerStore,
                    o = r.height,
                    n = r.top,
                    i = r.viewport,
                    a = o / 2,
                    l = void 0,
                    c = void 0;
                    "bids" === t ? (c = n - a, l = n - a + i) : (c = a - n - i, l = a - n),
                    e.renderIndex = Math.max(Math.floor(c / ti), 0),
                    e.renderEndIndex = Math.min.apply(null, [Math.ceil(l / ti), 50])
                }
            }
        }), Un = ei(zn.prototype, "generate", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = 0,
                    r = 0,
                    o = [],
                    n = !1,
                    i = e.type,
                    a = e.orderBookStore.book,
                    l = a.asks,
                    c = a.bids,
                    u = ("asks" === i ? l: c).slice(0, 50),
                    s = e.nodes.slice(0, 100);
                    if (u.length || s.length) {
                        for (; u[t] || s[r];) {
                            var f = u[t],
                            p = s[r],
                            d = !1,
                            h = W()(0),
                            b = W()(0);
                            if (f) {
                                var y = Jn(f, 2);
                                h = y[0],
                                b = y[1]
                            }
                            p ? f ? h.eq(p.price) ? (b.eq(p.size) || (p.size = b, e._setAnimation(p, "change")), t += 1, r += 1) : ("bids" === i ? h.gt(p.price) : h.lt(p.price)) ? (d = !0, t += 1) : (e._setAnimation(p, "remove"), r += 1) : (e._setAnimation(p, "remove"), r += 1) : (d = !0, t += 1),
                            d ? (p = {
                                price: h,
                                size: b,
                                render: !0,
                                y: 0
                            },
                            n = !0, e.firstLoad || e._setAnimation(p, "change")) : n && (p.render = !0),
                            o.push(p)
                        }
                        e.nodes = o
                    }
                }
            }
        }), Nn = ei(zn.prototype, "_setAnimation", [g.action], {
            enumerable: !0,
            initializer: function() {
                return function(e, t) {
                    if ("change" === t) return e.render = !0,
                    void(e.animation = {
                        type: "change",
                        dt: 0,
                        time: 1e3,
                        done: !1
                    });
                    if ("remove" === t) {
                        if (e.animation && "remove" === e.animation.type) return;
                        e.render = !0,
                        e.animation = {
                            type: "remove",
                            dt: 0,
                            time: 500,
                            done: !1
                        }
                    }
                }
            }
        }), Hn = ei(zn.prototype, "setNodeRender", [g.action], {
            enumerable: !0,
            initializer: function() {
                return function(e, t) {
                    e && (e.render = t)
                }
            }
        }), Gn = ei(zn.prototype, "setNodeY", [g.action], {
            enumerable: !0,
            initializer: function() {
                return function(e, t) {
                    e && (e.y = t)
                }
            }
        }), Yn = ei(zn.prototype, "runAnimationLoop", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = Date.now(),
                    r = t - e.lastTick;
                    e.lastTick = t,
                    e.dt += r,
                    e.dt >= Q.b.msPerFrame && (e.updateAnimations(e.dt), e.dt = 0),
                    e.animationFrame = Object(O.c)(e.runAnimationLoop)
                }
            }
        }), Kn = ei(zn.prototype, "updateAnimations", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t) {
                    var r = [],
                    o = !1,
                    n = !1;
                    t >= 1e3 && (n = !0);
                    for (var i = 0,
                    a = e.nodes.length; i < a; i++) {
                        var l = e.nodes[i],
                        c = l.animation;
                        if (c && (c.dt += t, n || c.dt >= c.time)) {
                            if ("remove" === c.type) {
                                o = !0;
                                continue
                            }
                            l.animation = null
                        }
                        o && (l.render = !0),
                        r.push(l)
                    }
                    e.nodes = r
                }
            }
        }), Xn = ei(zn.prototype, "renderAll", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    for (var t = 0,
                    r = e.nodes.length; t < r; t++) {
                        e.nodes[t].render = !0
                    }
                }
            }
        }), ei(zn.prototype, "styles", [g.computed], Object.getOwnPropertyDescriptor(zn.prototype, "styles"), zn.prototype), zn),
        oi = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        ni = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ii(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var ai = {},
        li = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ii(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.height = 0,
                o.width = 0,
                o.nodeCount = 0,
                o.textYOffset = Math.round(ti / 2),
                o.selectNode = function() {
                    var e = o.props.orderBookUIStore,
                    t = e.type,
                    r = e.nodes,
                    n = e.setSelected,
                    i = e.mouse,
                    a = i.active,
                    l = i.y;
                    if (!a) return n(null);
                    var c = "bids" === t ? Math.floor(l / ti) : Math.floor((o.height - l) / ti);
                    if (c < 0 || c >= r.length) return n(null);
                    n(r[c])
                },
                o.draw = function(e, t, r) {
                    var n = o.props.orderBookUIStore,
                    i = n.nodes,
                    a = n.type,
                    l = n.setNodeRender,
                    c = n.setNodeY,
                    u = n.renderIndex,
                    s = n.renderEndIndex,
                    f = n.styles;
                    o.ctx = e,
                    o.width = t,
                    o.height = r,
                    "asks" === a ? (o.barColor = f.asksBarColor, o.wholeColorHighlight = f.asksWholeColor, o.decimalColorHighlight = f.asksDecimalColor, o.changeWholeColor = f.asksChangeWholeColor, o.changeDecimalColor = f.asksChangeDecimalColor) : (o.barColor = f.bidsBarColor, o.wholeColorHighlight = f.bidsWholeColor, o.decimalColorHighlight = f.bidsDecimalColor, o.changeWholeColor = f.bidsChangeWholeColor, o.changeDecimalColor = f.bidsChangeDecimalColor),
                    o.setTextStyles();
                    for (var p = u,
                    d = Math.min(i.length, s); p < d; p++) {
                        var h = i[p];
                        c(h, "bids" === a ? ti * p: r - ti * (p + 1)),
                        h.render && (e.clearRect(0, h.y, t, ti), o.renderBG(h), o.renderBar(h), o.renderMarketSize(h), o.renderPrice(h), o.renderMySize(h)),
                        h.animation || l(h, !1)
                    }
                    if (i.length < o.nodeCount) {
                        var b = (o.nodeCount - i.length) * ti,
                        y = "bids" === a ? i.length * ti: o.height - ti * o.nodeCount;
                        e.clearRect(0, y, t, b)
                    }
                    o.nodeCount = i.length,
                    o.selectNode()
                },
                ii(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            ni(t, [{
                key: "setTextStyles",
                value: function() {
                    var e = this.props.orderBookUIStore.styles,
                    t = this.ctx;
                    t && (t.font = e.fontWeight + " " + e.fontSize + "px " + e.fontFamily, t.textAlign = e.textAlign, t.textBaseline = e.textBaseline)
                }
            },
            {
                key: "renderBG",
                value: function(e) {
                    var t = this.props.orderBookUIStore.styles;
                    if (e.animation && "remove" === e.animation.type) {
                        var r = this.easeInOut(e.animation.dt / e.animation.time),
                        o = t.removeFromColor,
                        n = t.removeToColor;
                        this.ctx.fillStyle = Object(Go.c)(r, n, o),
                        this.ctx.fillRect(0, e.y, this.width, ti)
                    }
                }
            },
            {
                key: "renderBar",
                value: function(e) {
                    var t = this.props.orderBookUIStore.columns,
                    r = m.a.product.maxBarSize;
                    this.ctx.fillStyle = this.barColor;
                    var o = t.bar.width * this.width * Math.min(r, +e.size) / r;
                    this.ctx.fillRect(0, e.y, Math.max(o, 1), ti)
                }
            },
            {
                key: "renderMarketSize",
                value: function(e) {
                    var t = this.props.orderBookUIStore,
                    r = t.columns,
                    o = t.styles,
                    n = +e.size,
                    i = [o.wholeColor, o.normalColor, o.dimColor],
                    a = e.animation;
                    if (a && "change" === a.type) {
                        var l = this.easeInOut(a.dt / a.time);
                        i = [Object(Go.c)(l, this.changeWholeColor, o.wholeColor), Object(Go.c)(l, this.changeWholeColor, o.normalColor), Object(Go.c)(l, this.changeDecimalColor, o.dimColor)]
                    } else a && "remove" === a.type && (i = [o.dimColor]);
                    var c = (r.size.x + r.size.width) * this.width - r.size.padding,
                    u = Object(Yo.g)(n, {
                        formattedValue: n.toFixed(4)
                    });
                    this._renderMulticolorText(u, i, c, e.y + this.textYOffset, !0)
                }
            },
            {
                key: "renderPrice",
                value: function(e) {
                    var t = this.props.orderBookUIStore,
                    r = t.columns,
                    o = t.styles,
                    n = m.a.product,
                    i = +e.price,
                    a = Object(Yo.g)(i, {
                        formattedValue: i.toFixed(n.price_precision)
                    }),
                    l = [this.wholeColorHighlight, this.decimalColorHighlight];
                    e.animation && "remove" === e.animation.type && (l = [o.dimColor]);
                    var c = (r.price.x + r.price.width) * this.width - r.price.padding;
                    this._renderMulticolorText(a, l, c, e.y + this.textYOffset, !0)
                }
            },
            {
                key: "renderMySize",
                value: function(e) {
                    var t = this.props.orderBookUIStore,
                    r = t.columns,
                    o = t.mySizes,
                    n = t.styles,
                    i = m.a.product,
                    a = [n.wholeColor, n.normalColor, n.dimColor],
                    l = e.animation,
                    c = e.price;
                    if (l && "change" === l.type) {
                        var u = this.easeInOut(l.dt / l.time);
                        a = [Object(Go.c)(u, this.changeWholeColor, n.wholeColor), Object(Go.c)(u, this.changeWholeColor, n.normalColor), Object(Go.c)(u, this.changeDecimalColor, n.dimColor)]
                    } else l && "remove" === l.type && (a = [n.dimColor]);
                    var s = o[c.toString()] || 0,
                    f = Object(Yo.g)(s, {
                        formattedValue: s.toFixed(i.base.precision),
                        zeroValue: "-"
                    }),
                    p = (r.mySize.x + r.mySize.width) * this.width - r.mySize.padding;
                    this._renderMulticolorText(f, a, p, e.y + this.textYOffset, !0)
                }
            },
            {
                key: "_renderMulticolorText",
                value: function(e, t, r, o, n) {
                    for (var i = 0,
                    a = e.length === t.length ? e: e.slice(0, t.length - 1).concat(e.slice(t.length - 1).join("")), l = this.ctx, c = 0, u = a.length; c < u; c++) {
                        var s = n ? u - c - 1 : c,
                        f = a[s];
                        f && (l.fillStyle = t[s], l.fillText(f, Math.round(r - i), Math.round(o)), i += this._measureText(f))
                    }
                }
            },
            {
                key: "_measureText",
                value: function(e) {
                    for (var t = 0,
                    r = 0,
                    o = e.length; r < o; r++) {
                        var n = e[r],
                        i = ai[n];
                        i || (i = this.ctx.measureText(n).width, ai[n] = i),
                        t += i
                    }
                    return t
                }
            },
            {
                key: "easeInOut",
                value: function(e) {
                    return e < .5 ? 2 * e * e: (4 - 2 * e) * e - 1
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.orderBookUIStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["orderBookUIStore"]));
                    return s.createElement($o, oi({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        ci = Object(K.b)("orderBookUIStore")(Object(K.c)(li)),
        ui = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        si = Object(K.b)("orderBookUIStore")(Object(K.c)(function(e) {
            var t = e.orderBookUIStore,
            r = t.selected,
            o = t.styles,
            n = t.mouse.x,
            i = t.columns,
            a = t.mySizes,
            l = e.width,
            c = void 0 === l ? 0 : l,
            u = e.height,
            s = void 0 === u ? 0 : u;
            if (!r) return null;
            var f = c - i.mySize.width * c;
            return ui(Lo, {
                top: r.y,
                left: 0,
                right: 0,
                bottom: s - r.y - ti,
                width: c,
                height: ti,
                style: {
                    background: o.hoverColor
                }
            },
            void 0, n >= f && a[r.price.toString()] ? ui(Lo, {
                top: 0,
                left: f,
                right: 0,
                bottom: 0,
                width: c,
                height: ti,
                style: {
                    background: o.cancelColor
                }
            }) : null)
        })),
        fi = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        pi = function() {
            return function(e, t) {
                if (Array.isArray(e)) return e;
                if (Symbol.iterator in Object(e)) return function(e, t) {
                    var r = [],
                    o = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var a, l = e[Symbol.iterator](); ! (o = (a = l.next()).done) && (r.push(a.value), !t || r.length !== t); o = !0);
                    } catch(e) {
                        n = !0,
                        i = e
                    } finally {
                        try { ! o && l.
                            return && l.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                    return r
                } (e, t);
                throw new TypeError("Invalid attempt to destructure non-iterable instance")
            }
        } (),
        di = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function hi(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var bi = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = hi(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.onMarketSizeClick = function() {
                    var e = o.props,
                    t = e.orderFormStore,
                    r = e.orderBookUIStore,
                    n = r.type,
                    i = r.selected,
                    a = y.t.asks,
                    l = y.t.bids,
                    c = y.t.calculateBaseBuyOrder,
                    u = m.a.product;
                    if (i) {
                        for (var s = i.price,
                        f = "bids" === n ? s.gt.bind(s) : s.lt.bind(s), p = "bids" === n ? l: a, d = W()(0), h = 0, b = p.length; h < b; h++) {
                            var v = pi(p[h], 2),
                            g = v[0],
                            O = v[1];
                            if (f(g)) break;
                            d = d.add(O)
                        }
                        if (t.setType("market"), t.setPrice(""), "bids" === n) t.setSide("sell"),
                        t.setAmount(d.toFixed(u.base.precision));
                        else {
                            t.setSide("buy");
                            var w = c(d).total,
                            j = w.mul(u.fee_rate);
                            t.setAmount(w.add(j).toFixed(u.quote.precision))
                        }
                    }
                },
                o.onPriceClick = function() {
                    var e = o.props,
                    t = e.orderFormStore,
                    r = e.orderBookUIStore,
                    n = r.type,
                    i = r.selected,
                    a = m.a.product;
                    if (i) {
                        var l = i.price.toFixed(a.quote.precision);
                        if ("stop" === t.type) return t.setSide("bids" === n ? "sell": "buy"),
                        void t.setStopPrice(l);
                        t.setType("limit"),
                        t.setSide("bids" === n ? "buy": "sell"),
                        t.setPrice(l)
                    }
                },
                o.onMySizeClick = function() {
                    var e = o.props,
                    t = e.ordersStore,
                    r = e.orderBookStore,
                    n = r.hasAggregation,
                    i = r.bucket,
                    a = e.orderBookUIStore,
                    l = a.type,
                    c = a.selected;
                    if (c) {
                        var u = c.price; ("bids" === l ? t.activeBuys: t.activeSells).forEach(function(e) {
                            var r = n ? i(e.side, e.price) : e.price;
                            u && r.eq(u) && e.active && t.destroyOrder(e)
                        })
                    }
                },
                o.onMouseMove = function(e) {
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
                },
                o.onMouseOut = function() {
                    o.props.orderBookUIStore.mouse.set()
                },
                hi(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            di(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.orderBookUIStore,
                    r = t.columns,
                    o = t.mouse.x,
                    n = t.selected,
                    i = t.mySizes,
                    a = e.width,
                    l = void 0 === a ? 0 : a,
                    c = e.height,
                    u = void 0 === c ? 0 : c,
                    s = (r.size.width + r.bar.width) * l,
                    f = s + r.price.width * l;
                    return fi(Lo, {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        onMouseMove: this.onMouseMove,
                        onMouseOut: this.onMouseOut
                    },
                    void 0, fi(Lo, {
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: l - s,
                        onClick: this.onMarketSizeClick,
                        style: {
                            cursor: "pointer"
                        }
                    }), fi(Lo, {
                        top: 0,
                        bottom: 0,
                        left: s,
                        right: l - f,
                        onClick: this.onPriceClick,
                        style: {
                            cursor: "pointer"
                        }
                    }), fi(Lo, {
                        top: 0,
                        bottom: 0,
                        left: f,
                        right: 0,
                        onClick: this.onMySizeClick
                    },
                    void 0, n && i[n.price.toString()] && o >= f ? fi(Lo, {
                        top: n.y,
                        left: 0,
                        right: 0,
                        bottom: u - n.y - ti,
                        style: {
                            cursor: "pointer"
                        }
                    },
                    void 0, fi(yi, {})) : null))
                }
            }]),
            t
        } (),
        yi = Object(X.c)(V.c)(["position:absolute;top:-2px;right:4px;width:8px;height:8px;"]),
        vi = Object(K.b)("orderBookUIStore", "orderBookStore", "orderFormStore", "ordersStore")(Object(K.c)(bi)),
        mi = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        gi = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Oi(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var wi, ji = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Oi(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.onSize = function() {
                    o.props.orderBookUIStore.renderAll()
                },
                Oi(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            gi(t, [{
                key: "render",
                value: function() {
                    return mi(Si, {},
                    void 0, mi(Io, {
                        onSize: this.onSize
                    },
                    void 0, mi(si, {}), mi(ci, {}), mi(vi, {})))
                }
            }]),
            t
        } (),
        Si = X.c.div(["display:flex;flex:1;height:50%;min-height:", "px;"], 50 * ti),
        _i = Object(K.b)("orderBookUIStore")(Object(K.c)(ji)),
        xi = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        ki = Object(K.b)("ordersStore", "orderBookStore", "scrollerStore")(Object(K.c)(function(e) {
            var t = e.type,
            r = e.ordersStore,
            o = e.orderBookStore,
            n = e.scrollerStore,
            i = new ri(t, {
                ordersStore: r,
                orderBookStore: o,
                scrollerStore: n
            });
            return xi(h.b, {
                orderBookUIStore: i
            },
            void 0, s.createElement(_i, e))
        })),
        Pi = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ci = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Ti(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ai = Object(K.c)(wi = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Ti(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.disposers = [],
                o.onClick = function() {
                    o.props.scrollerStore.center()
                },
                Ti(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ci(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this.props,
                    t = e.fixed,
                    r = e.scrollerStore;
                    r.center(),
                    t || (this.disposers.push(Object(g.observe)(r, "height", r.center)), this.disposers.push(Object(g.observe)(r, "viewport", r.center)))
                }
            },
            {
                key: "componentWillUnmount",
                value: function() {
                    this.disposers.forEach(function(e) {
                        return e()
                    }),
                    this.disposers.length = 0
                }
            },
            {
                key: "render",
                value: function() {
                    var e = m.a.product,
                    t = this.renderPosition;
                    return e && t ? Pi(Ei, {
                        borderTop: !0,
                        position: t,
                        onClick: this.onClick
                    },
                    void 0, Pi(xt, {
                        basis: 38,
                        padding: 3
                    },
                    void 0, e.quote.id, " Spread"), Pi(xt, {
                        basis: 30,
                        padding: 3
                    },
                    void 0, this.spread), Pi(xt, {
                        basis: 32,
                        padding: 3
                    })) : null
                }
            },
            {
                key: "renderPosition",
                get: function() {
                    var e = this.props,
                    t = e.fixed,
                    r = e.scrollerStore,
                    o = r.top,
                    n = r.viewport;
                    if (!t) return "static";
                    var i = 50 * ti;
                    return i + St > o + n ? "bottom": i < o ? "top": null
                }
            },
            {
                key: "spread",
                get: function() {
                    var e = m.a.product.price_precision,
                    t = this.props.orderBookStore.spread;
                    return Pi(zi, {
                        value: t,
                        precision: e
                    })
                }
            }]),
            t
        } ()) || wi,
        Ei = Object(X.c)(jt)(["cursor:pointer;", ";", ";"],
        function(e) {
            return "top" === e.position && Object(X.b)(["position:absolute;top:-1px;right:0;left:0;"])
        },
        function(e) {
            return "bottom" === e.position && Object(X.b)(["position:absolute;right:0;bottom:-1px;left:0;"])
        }),
        zi = Object(X.c)(Z.r)(["font-size:inherit;color:inherit;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";"], t.fonts.size.small)
        }),
        Ri = Object(K.b)("orderBookStore", "scrollerStore")(Object(K.c)(Ai)),
        Mi = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Di = X.c.div.attrs({
            role: "button"
        })(["display:flex;justify-content:center;align-items:center;cursor:pointer;user-select:none;", ";"],
        function(e) {
            return e.disabled && Object(X.b)(["opacity:0.2;cursor:default;"])
        }),
        Bi = Object(X.c)(Z.r)(["font-size:inherit;color:inherit;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["font-size:", ";"], t.fonts.size.small)
        }),
        Fi = Object(X.c)(Le.v)(["width:16px;height:16px;margin-right:8px;"]),
        Ii = Object(X.c)(Le.y)(["width:16px;height:16px;margin-right:12px;"]),
        Li = Object(K.b)("orderBookStore")(Object(K.c)(function(e) {
            var t = e.orderBookStore,
            r = m.a.product;
            if (!r) return null;
            var o = t.aggregationIndex,
            n = t.aggregationValue,
            i = t.increaseAggregation,
            a = t.decreaseAggregation;
            return Mi(jt, {
                borderTop: !0,
                borderBottom: !1
            },
            void 0, Mi(xt, {
                basis: 38,
                padding: 3
            },
            void 0, "Aggregation"), Mi(xt, {
                basis: 30,
                padding: 3
            },
            void 0, Mi(Bi, {
                value: n,
                precision: r.price_precision
            })), Mi(V.d, {
                flex: "1 0 32%",
                justify: "flex-end"
            },
            void 0, Mi(Di, {
                disabled: o <= y.j,
                onClick: a
            },
            void 0, Mi(Fi, {})), Mi(Di, {
                disabled: o >= y.h,
                onClick: i
            },
            void 0, Mi(Ii, {}))))
        })),
        $i = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Wi = Object(X.c)(V.d)(["flex:1;flex-direction:column;overflow:hidden;"]),
        qi = Object(K.b)("orderBookStore")(Object(K.c)(function(e) {
            var t = e.contentOnly,
            r = y.t.loading,
            o = m.a.product;
            if (!o) return null;
            var n = $i(Wi, {},
            void 0, $i(jt, {},
            void 0, $i(xt, {
                basis: 38,
                padding: 3
            },
            void 0, "Market Size"), $i(xt, {
                basis: 30,
                padding: 3
            },
            void 0, "Price (", o.quote.id, ")"), $i(xt, {
                basis: 32,
                padding: 16
            },
            void 0, "My Size")), r ? $i(V.d, {
                auto: !0,
                center: !0
            },
            void 0, $i(Le.C, {})) : $i(Z.z, {},
            void 0, $i(ki, {
                type: "asks"
            }), $i(Ri, {}), $i(ki, {
                type: "bids"
            }), $i(Ri, {
                fixed: !0
            })), $i(Li, {}));
            return t ? n: $i(Mt, {
                title: "Order Book"
            },
            void 0, n)
        })),
        Ui = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ni = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Hi(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Gi = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Hi(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.orderBookStore = new y.k,
                Hi(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["PureComponent"]),
            Ni(t, [{
                key: "render",
                value: function() {
                    var e = this.props.contentOnly;
                    return Ui(h.b, {
                        orderBookStore: this.orderBookStore
                    },
                    void 0, Ui(qi, {
                        contentOnly: e
                    }))
                }
            }]),
            t
        } (),
        Yi = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ki = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Xi(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Vi = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Xi(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.chartTypeStore = new Q.a("chart_chart_type_hovered"),
                o.durationsStore = new Q.a("chart_time_interval_hovered"),
                o.overlayStore = new Q.a("chart_overlay_hovered"),
                o.setChartType = function(e) {
                    var t = o.props.candlesStore;
                    Object(p.d)("chart_chart_type_selected", {
                        chart_type: e
                    }),
                    o.chartTypeStore.hide(),
                    t.setType(e)
                },
                o.setChartTypeCandle = o.setChartType.bind(o, "candle"),
                o.setChartTypeLine = o.setChartType.bind(o, "line"),
                o.setDuration = function(e) {
                    var t = o.props.candlesStore;
                    Object(p.d)("chart_time_interval_selected", {
                        time_interval: e
                    }),
                    o.durationsStore.hide(),
                    t.setDuration(e)
                },
                o.resumeChart = function() {
                    o.props.priceChartStore.resume()
                },
                Xi(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ki(t, [{
                key: "render",
                value: function() {
                    var e = this.props.priceChartStore.manualScroll;
                    return Yi(jt, {},
                    void 0, this.durations, this.chartType, this.overlay, Yi(V.d, {
                        auto: !0
                    }), Yi(ra, {
                        onClick: this.resumeChart
                    },
                    void 0, Yi(oa, {
                        fontSize: "small",
                        active: e
                    },
                    void 0, "鈻�")))
                }
            },
            {
                key: "chartType",
                get: function() {
                    var e = this.props.candlesStore.type,
                    t = this.chartTypeStore;
                    return Yi(Ji, {
                        onMouseLeave: t.hide,
                        onMouseEnter: t.show
                    },
                    void 0, Yi(V.d, {
                        center: !0
                    },
                    void 0, Yi(Qi, {},
                    void 0, "line" === e ? "Line": "Candle", Yi(Zi, {}))), Yi(Z.g, {
                        hidden: t.hidden,
                        left: "-1px",
                        right: "-1px",
                        height: "200px"
                    },
                    void 0, Yi(Tt, {},
                    void 0, Yi(ea, {
                        onClick: this.setChartTypeCandle
                    },
                    void 0, "Candle"), Yi(ea, {
                        onClick: this.setChartTypeLine
                    },
                    void 0, "Line"))))
                }
            },
            {
                key: "durations",
                get: function() {
                    var e = this,
                    t = this.props.candlesStore,
                    r = t.duration,
                    o = t.durations,
                    n = this.durationsStore;
                    return Yi(Ji, {
                        onMouseLeave: n.hide,
                        onMouseEnter: n.show
                    },
                    void 0, Yi(V.d, {
                        center: !0
                    },
                    void 0, Yi(Qi, {},
                    void 0, r, Yi(Zi, {}))), Yi(Z.g, {
                        hidden: n.hidden,
                        left: "-1px",
                        right: "-1px",
                        height: "400px"
                    },
                    void 0, Yi(Tt, {},
                    void 0, o.map(function(t) {
                        return Yi(ea, {
                            onClick: function() {
                                return e.setDuration(t)
                            }
                        },
                        t, t)
                    }))))
                }
            },
            {
                key: "overlay",
                get: function() {
                    var e = this.props.priceChartStore,
                    t = e.emas,
                    r = e.styles,
                    o = this.overlayStore;
                    return Yi(Ji, {
                        onMouseLeave: o.hide,
                        onMouseEnter: o.show
                    },
                    void 0, Yi(V.d, {
                        center: !0
                    },
                    void 0, Yi(Qi, {},
                    void 0, "Overlay", Yi(Zi, {}))), Yi(Z.g, {
                        hidden: o.hidden,
                        left: "-1px",
                        right: "-1px",
                        height: "200px"
                    },
                    void 0, Yi(Tt, {},
                    void 0, Object.keys(t).map(function(e, o) {
                        var n = t[e],
                        i = n.periods,
                        a = n.toggle,
                        l = n.show,
                        c = r["emaColor" + (o + 1)];
                        return Yi(ea, {
                            onClick: a
                        },
                        e, Yi(ta, {
                            color: c,
                            active: l
                        }), "EMA" + i)
                    }))))
                }
            }]),
            t
        } (),
        Ji = Object(X.c)(V.d)(["position:relative;cursor:pointer;", ";"],
        function(e) {
            return "\n        border-right: 1px solid " + e.theme.colors.divider.
        default + ";\n    "
        }),
        Qi = Object(X.c)(xt)(["padding:0 14px;"]),
        Zi = Object(X.c)(Z.a)(["margin-left:10px;"]),
        ea = Object(X.c)(xt).attrs({
            justify: "flex-start"
        })(["padding:10px 14px;text-align:left;cursor:pointer;"]),
        ta = X.c.span(["display:inline-block;width:8px;height:8px;margin-right:8px;border-radius:50%;", ";"],
        function(e) {
            var t = e.color,
            r = e.active;
            return Object(X.b)(["background:", ";opacity:", ";"], t, r ? 1 : .2)
        }),
        ra = Object(X.c)(V.d)(["flex-shrink:0;align-items:center;padding:0 10px;cursor:pointer;", ";"],
        function(e) {
            return "\n        border-left: 1px solid " + e.theme.colors.divider.
        default + ";\n    "
        }),
        oa = Object(X.c)(V.h)(["", ";"],
        function(e) {
            return "\n        opacity: " + (e.active ? 1 : .2) + ";\n    "
        }),
        na = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(Vi)),
        ia = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        aa = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function la(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var ca = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = la(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.priceChartStore,
                    i = n.candleWidth,
                    a = n.xAxis,
                    l = n.yAxis,
                    c = n.styles;
                    e.clearRect(0, 0, t, r),
                    e.strokeStyle = c.gridColor,
                    e.beginPath();
                    for (var u = a.ticks,
                    s = 0,
                    f = u.length; s < f; s++) {
                        var p = Ie.a.utc(u[s]),
                        d = Math.round(a.toRange(p.valueOf()) - i) + .5;
                        e.moveTo(d, 0),
                        e.lineTo(d, r)
                    }
                    for (var h = l.ticks,
                    b = 0,
                    y = h.length; b < y; b++) {
                        var v = h[b],
                        m = l.toRange(v);
                        e.moveTo(0, m),
                        e.lineTo(t, m)
                    }
                    e.stroke()
                },
                la(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            aa(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore"]));
                    return s.createElement($o, ia({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        ua = Object(K.b)("priceChartStore")(Object(K.c)(ca)),
        sa = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        fa = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function pa(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var da = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = pa(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props,
                    i = n.priceChartStore,
                    a = i.xAxis,
                    l = i.candleWidth,
                    c = i.styles,
                    u = n.yAxisWidth;
                    e.clearRect(0, 0, t, r),
                    e.strokeStyle = c.axisColor,
                    e.lineWidth = c.axisLineWidth,
                    e.beginPath(),
                    e.moveTo(0, .5),
                    e.lineTo(t - u, .5),
                    e.stroke(),
                    o.setTextStyle(e);
                    for (var s = a.ticks,
                    f = 0,
                    p = s.length; f < p; f++) {
                        var d = Ie.a.utc(s[f]),
                        h = d.hour(),
                        b = d.minutes(),
                        y = "";
                        h || b ? b ? b && (y = d.format("h:mm A")) : y = d.format("h A") : y = d.format("MMM D");
                        var v = Math.round(a.toRange(d.valueOf()) - l) + .5;
                        e.fillText(y, v, 7)
                    }
                },
                pa(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            fa(t, [{
                key: "setTextStyle",
                value: function(e) {
                    var t = this.props.priceChartStore.styles;
                    e.font = t.fontWeight + " " + t.fontSize + "px " + t.fontFamily,
                    e.textAlign = t.xAxisTextAlign,
                    e.textBaseline = t.xAxisTextBaseline,
                    e.fillStyle = t.textColor
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore"]));
                    return s.createElement($o, sa({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        ha = Object(K.b)("priceChartStore")(Object(K.c)(da)),
        ba = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        ya = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function va(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var ma = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = va(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.priceChartStore,
                    i = n.yAxis,
                    a = n.styles,
                    l = m.a.product;
                    e.clearRect(0, 0, t, r),
                    o.setTextStyle(e);
                    for (var c = l.quote.symbol,
                    u = i.ticks,
                    s = 0,
                    f = u.length; s < f; s++) {
                        var p = u[s],
                        d = i.toRange(p);
                        e.fillText("" + c + p.toLocaleString("en-US"), a.yAxisLeftPadding, d)
                    }
                },
                va(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            ya(t, [{
                key: "setTextStyle",
                value: function(e) {
                    var t = this.props.priceChartStore.styles;
                    e.font = t.fontWeight + " " + t.fontSize + "px " + t.fontFamily,
                    e.textAlign = t.yAxisTextAlign,
                    e.textBaseline = t.yAxisTextBaseline,
                    e.fillStyle = t.textColor
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore"]));
                    return s.createElement($o, ba({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        ga = Object(K.b)("priceChartStore")(Object(K.c)(ma)),
        Oa = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        wa = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ja(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Sa = 2,
        _a = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ja(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.lastX = 0,
                o.lastY = 0,
                o.draw = function(e, t, r) {
                    var n = o.props,
                    i = n.priceChartStore,
                    a = i.mouse,
                    l = i.styles,
                    c = n.candlesStore.type;
                    if (e.clearRect(o.lastX - Sa, 0, 2 * Sa, r), e.clearRect(0, o.lastY - Sa, t, 2 * Sa), a.active) {
                        e.strokeStyle = l.crosshairsColor,
                        e.setLineDash([2, 2]);
                        var u = Co.round(a.x),
                        s = Co.round(a.y);
                        o.lastX = u,
                        o.lastY = s,
                        e.beginPath(),
                        e.moveTo(t, s),
                        e.lineTo(0, s),
                        "line" === c && (e.moveTo(u, r), e.lineTo(u, 0)),
                        e.stroke()
                    }
                },
                ja(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            wa(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, Oa({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        xa = Object(K.b)("priceChartStore", "candlesStore")(Object(K.c)(_a)),
        ka = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Pa = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Ca(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ta = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Ca(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props,
                    i = n.candlesStore.candles,
                    a = n.priceChartStore,
                    l = a.xAxis,
                    c = a.volumeScale,
                    u = a.candleWidth,
                    s = a.styles;
                    e.clearRect(0, 0, t, r);
                    for (var f = {
                        green: {
                            styles: {
                                fillStyle: s.lineVolumeGreenColor
                            },
                            calls: []
                        },
                        red: {
                            styles: {
                                fillStyle: s.lineVolumeRedColor
                            },
                            calls: []
                        }
                    },
                    p = 0, d = i.length; p < d; p++) {
                        var h = i[p],
                        b = h.close >= h.open ? "green": "red",
                        y = l.toRange(h.date),
                        v = c.toRange(h.volume);
                        f[b].calls.push(e.rect.bind(e, y - u, v, u, r - v))
                    }
                    o.drawBatchedCalls(e, f)
                },
                o.drawBatchedCalls = function(e, t) {
                    for (var r in t) {
                        var o = t[r];
                        for (var n in o.styles) e[n] = o.styles[n];
                        e.beginPath();
                        var i = !0,
                        a = !1,
                        l = void 0;
                        try {
                            for (var c, u = o.calls[Symbol.iterator](); ! (i = (c = u.next()).done); i = !0) { (0, c.value)()
                            }
                        } catch(e) {
                            a = !0,
                            l = e
                        } finally {
                            try { ! i && u.
                                return && u.
                                return ()
                            } finally {
                                if (a) throw l
                            }
                        }
                        e.fill()
                    }
                },
                Ca(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Pa(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, ka({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        Aa = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(Ta)),
        Ea = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        za = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Ra(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ma = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Ra(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props,
                    i = n.priceChartStore,
                    a = i.xAxis,
                    l = i.yAxis,
                    c = i.styles,
                    u = n.candlesStore.candles;
                    if (u.length) {
                        e.clearRect(0, 0, t, r),
                        e.lineWidth = c.lineWidth,
                        e.strokeStyle = c.lineColor,
                        e.beginPath();
                        for (var s = t,
                        f = 0,
                        p = 0,
                        d = u.length; p < d; p++) {
                            var h = u[p],
                            b = a.toRange(h.date),
                            y = l.toRange(h.close);
                            p ? (f = b, e.lineTo(b, y)) : (s = b, e.moveTo(b, y))
                        }
                        e.stroke(),
                        e.lineTo(f, r),
                        e.lineTo(s, r);
                        var v = e.createLinearGradient(t / 2, 0, t / 2, r);
                        v.addColorStop(0, c.lineGradientColor1),
                        v.addColorStop(1, c.lineGradientColor2),
                        e.fillStyle = v,
                        e.fill()
                    }
                },
                Ra(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            za(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, Ea({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        Da = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(Ma)),
        Ba = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Fa = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Ia(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var La, $a = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Ia(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.priceChartStore,
                    i = n.xAxis,
                    a = n.yAxis,
                    l = n.candleWidth,
                    c = n.emas,
                    u = n.styles;
                    e.clearRect(0, 0, t, r),
                    Object.keys(c).forEach(function(t, r) {
                        var o = c[t],
                        n = o.show,
                        s = o.data;
                        if (n) {
                            e.lineWidth = u.emaLineWidth,
                            e.strokeStyle = u["emaColor" + (r + 1)] || "#fff",
                            e.beginPath();
                            for (var f = 0,
                            p = s.length; f < p; f++) {
                                var d = s[f].candle,
                                h = i.toRange(d.date) - l / 2,
                                b = a.toRange(s[f].ema);
                                f ? e.lineTo(h, b) : e.moveTo(h, b)
                            }
                            e.stroke()
                        }
                    })
                },
                Ia(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Fa(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore"]));
                    return s.createElement($o, Ba({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        Wa = Object(K.b)("priceChartStore")(Object(K.c)($a)),
        qa = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ua = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        var Na = Object(K.c)(La = function(e) {
            function t() {
                return function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return ! t || "object" != typeof t && "function" != typeof t ? e: t
                } (this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ua(t, [{
                key: "render",
                value: function() {
                    return qa(Io, {},
                    void 0, s.createElement(Aa, this.props), s.createElement(Da, this.props), s.createElement(Wa, this.props))
                }
            }]),
            t
        } ()) || La,
        Ha = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Ga = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Ya(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ka = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Ya(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.priceChartStore,
                    i = n.yAxis,
                    a = n.xAxis,
                    l = n.candleWidth,
                    c = n.styles,
                    u = n.candles;
                    e.clearRect(0, 0, t, r);
                    for (var s = {
                        green: {
                            styles: {
                                strokeStyle: c.candleGreenColor,
                                fillStyle: c.candleGreenBackground
                            },
                            calls: []
                        },
                        red: {
                            styles: {
                                strokeStyle: c.candleRedColor,
                                fillStyle: c.candleRedBackground
                            },
                            calls: []
                        }
                    },
                    f = 0, p = u.length; f < p; f++) {
                        var d = u[f],
                        h = d.close >= d.open ? "green": "red",
                        b = a.toRange(d.date),
                        y = i.toRange(d.high),
                        v = i.toRange(d.low),
                        m = i.toRange(d.open),
                        g = i.toRange(d.close),
                        O = s[h].calls;
                        O.push(e.rect.bind(e, b - l, Math.min(m, g), l, Math.abs(g - m)));
                        var w = b - l / 2;
                        O.push(e.moveTo.bind(e, w, Math.min(m, g))),
                        O.push(e.lineTo.bind(e, w, y)),
                        O.push(e.moveTo.bind(e, w, Math.max(m, g))),
                        O.push(e.lineTo.bind(e, w, v))
                    }
                    o.drawBatchedCalls(e, s)
                },
                o.drawBatchedCalls = function(e, t) {
                    for (var r in t) {
                        var o = t[r];
                        for (var n in o.styles) e[n] = o.styles[n];
                        e.beginPath();
                        var i = !0,
                        a = !1,
                        l = void 0;
                        try {
                            for (var c, u = o.calls[Symbol.iterator](); ! (i = (c = u.next()).done); i = !0) { (0, c.value)()
                            }
                        } catch(e) {
                            a = !0,
                            l = e
                        } finally {
                            try { ! i && u.
                                return && u.
                                return ()
                            } finally {
                                if (a) throw l
                            }
                        }
                        e.stroke(),
                        e.fill()
                    }
                },
                Ya(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ga(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, Ha({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        Xa = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(Ka)),
        Va = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Ja = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Qa(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Za = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Qa(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.priceChartStore,
                    i = n.candles,
                    a = n.xAxis,
                    l = n.volumeScale,
                    c = n.candleWidth,
                    u = n.styles;
                    e.clearRect(0, 0, t, r);
                    for (var s = {
                        styles: {
                            fillStyle: u.volumeColor
                        },
                        calls: []
                    },
                    f = 0, p = i.length; f < p; f++) {
                        var d = i[f],
                        h = a.toRange(d.date),
                        b = l.toRange(d.volume),
                        y = e.rect.bind(e, h - c, b, c, r - b);
                        s.calls.push(y)
                    }
                    o.drawBatchedCalls(e, s)
                },
                o.drawBatchedCalls = function(e, t) {
                    for (var r in t.styles) e[r] = t.styles[r];
                    e.beginPath();
                    var o = !0,
                    n = !1,
                    i = void 0;
                    try {
                        for (var a, l = t.calls[Symbol.iterator](); ! (o = (a = l.next()).done); o = !0) { (0, a.value)()
                        }
                    } catch(e) {
                        n = !0,
                        i = e
                    } finally {
                        try { ! o && l.
                            return && l.
                            return ()
                        } finally {
                            if (n) throw i
                        }
                    }
                    e.fill()
                },
                Qa(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ja(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, Va({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        el = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(Za)),
        tl = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        rl = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ol(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var nl = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ol(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.priceChartStore,
                    i = n.xAxis,
                    a = n.yAxis,
                    l = n.candleWidth,
                    c = n.emas,
                    u = n.styles;
                    e.clearRect(0, 0, t, r),
                    Object.keys(c).forEach(function(t, r) {
                        var o = c[t],
                        n = o.show,
                        s = o.data;
                        if (n) {
                            e.lineWidth = u.emaLineWidth,
                            e.strokeStyle = u["emaColor" + (r + 1)] || "#fff",
                            e.beginPath();
                            for (var f = 0,
                            p = s.length; f < p; f++) {
                                var d = s[f].candle,
                                h = i.toRange(d.date) - l / 2,
                                b = a.toRange(s[f].ema);
                                f ? e.lineTo(h, b) : e.moveTo(h, b)
                            }
                            e.stroke()
                        }
                    })
                },
                ol(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            rl(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore"]));
                    return s.createElement($o, tl({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        il = Object(K.b)("priceChartStore")(Object(K.c)(nl)),
        al = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        ll = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function cl(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var ul, sl = 2,
        fl = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = cl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.lastX = 0,
                o.lastCandleWidth = 0,
                o.draw = function(e, t, r) {
                    var n = o.props.priceChartStore,
                    i = n.xAxis,
                    a = n.yAxis,
                    l = n.volumeScale,
                    c = n.candleWidth,
                    u = n.selected,
                    s = n.styles;
                    if (e.clearRect(o.lastX - sl - o.lastCandleWidth, 0, o.lastCandleWidth + 2 * sl, r), u) {
                        e.fillStyle = s.highlightVolumeColor;
                        var f = i.toRange(u.date);
                        o.lastX = f,
                        o.lastCandleWidth = c,
                        e.fillStyle = "rgba(255,255,255, 0.05)",
                        e.fillRect(f - c, 0, c, r);
                        var p = l.toRange(u.volume);
                        e.fillRect(f - c, p, c, r - p);
                        var d = a.toRange(u.high),
                        h = a.toRange(u.low),
                        b = a.toRange(u.open),
                        y = a.toRange(u.close),
                        v = u.close >= u.open ? "green": "red";
                        e.strokeStyle = "green" === v ? s.highlightGreenColor: s.highlightRedColor,
                        e.fillStyle = "green" === v ? s.candleGreenBackground: s.highlightRedColor,
                        e.beginPath(),
                        e.rect(f - c, Math.min(b, y), c, Math.abs(y - b)),
                        e.fill();
                        var m = f - c / 2;
                        e.moveTo(m, Math.min(b, y)),
                        e.lineTo(m, d),
                        e.moveTo(m, Math.max(b, y)),
                        e.lineTo(m, h),
                        e.stroke()
                    }
                },
                cl(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            ll(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, al({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        pl = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(fl)),
        dl = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        hl = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        var bl = Object(K.c)(ul = function(e) {
            function t() {
                return function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return ! t || "object" != typeof t && "function" != typeof t ? e: t
                } (this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            hl(t, [{
                key: "render",
                value: function() {
                    return dl(Io, {},
                    void 0, s.createElement(el, this.props), s.createElement(il, this.props), s.createElement(Xa, this.props), s.createElement(pl, this.props))
                }
            }]),
            t
        } ()) || ul,
        yl = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        vl = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ml(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var gl = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ml(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.arrowWidth = 6,
                o.arrowHeight = 20,
                o.draw = function(e, t, r) {
                    var n = o.props,
                    i = n.priceChartStore,
                    a = i.mouse,
                    l = i.yAxis,
                    c = i.styles,
                    u = n.candlesStore.candles,
                    s = m.a.product;
                    if (e.clearRect(0, 0, t, r), u.length) {
                        var f = a.y,
                        p = s.price_precision,
                        d = void 0;
                        if (a.active) d = Number(l.toDomain(f)).toLocaleString("en-US", {
                            minimumFractionDigits: p,
                            maximumFractionDigits: p
                        });
                        else {
                            var h = u[0].close;
                            f = l.toRange(h),
                            d = h.toLocaleString("en-US", {
                                minimumFractionDigits: p,
                                maximumFractionDigits: p
                            })
                        }
                        if (d) {
                            o.setTextStyle(e);
                            var b = "" + s.quote.symbol + d,
                            y = e.measureText(b).width;
                            e.fillStyle = c.axesLabelBackground,
                            e.beginPath();
                            e.moveTo(8, f - c.axesLabelPadding),
                            e.lineTo(8 + y, f - c.axesLabelPadding),
                            e.lineTo(8 + y, f + c.axesLabelPadding),
                            e.lineTo(8, f + c.axesLabelPadding),
                            e.fill(),
                            o.setTextStyle(e),
                            e.fillText(b, 8, f)
                        }
                    }
                },
                ml(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            vl(t, [{
                key: "setTextStyle",
                value: function(e) {
                    var t = this.props.priceChartStore.styles;
                    e.font = t.fontWeight + " " + t.fontSize + "px " + t.fontFamily,
                    e.textAlign = t.yAxisTextAlign,
                    e.textBaseline = t.yAxisTextBaseline,
                    e.fillStyle = t.axesLabelText
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, yl({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        Ol = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(gl)),
        wl = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        jl = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Sl(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var _l = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Sl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.arrowWidth = 6,
                o.arrowHeight = 20,
                o.draw = function(e, t, r) {
                    var n = o.props,
                    i = n.priceChartStore,
                    a = i.mouse,
                    l = i.xAxis,
                    c = i.candleWidth,
                    u = i.styles,
                    s = n.candlesStore,
                    f = s.candles,
                    p = s.end,
                    d = s.bucket,
                    h = s.granularity;
                    if (e.clearRect(0, 0, t, r), f.length && a.active) {
                        var b = a.x,
                        y = l.toDomain(a.x + c),
                        v = Ie()(d(y));
                        if (!v.isAfter(p)) {
                            var m = void 0;
                            m = h % Ko.b * 6 == 0 ? "MMM D": h % Ko.b == 0 ? "ha": "h:mma",
                            o.setTextStyle(e);
                            var g = "" + v.format(m),
                            O = e.measureText(g).width;
                            e.fillStyle = u.axesLabelBackground,
                            e.beginPath(),
                            e.moveTo(b - O / 2 - u.axesLabelPadding, 0),
                            e.lineTo(b - O / 2 - u.axesLabelPadding, 20),
                            e.lineTo(b + O / 2 + u.axesLabelPadding, 20),
                            e.lineTo(b + O / 2 + u.axesLabelPadding, 0),
                            e.fill(),
                            o.setTextStyle(e),
                            e.fillText(g, b, 7)
                        }
                    }
                },
                Sl(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            jl(t, [{
                key: "setTextStyle",
                value: function(e) {
                    var t = this.props.priceChartStore.styles;
                    e.font = t.fontWeight + " " + t.fontSize + "px " + t.fontFamily,
                    e.textAlign = t.xAxisTextAlign,
                    e.textBaseline = t.xAxisTextBaseline,
                    e.fillStyle = t.axesLabelText
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"]));
                    return s.createElement($o, wl({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        xl = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(_l)),
        kl = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Pl = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Cl(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Tl = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Cl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.offsets = {
                    left: 0,
                    top: 0
                },
                o.onClick = function() {
                    var e = o.props,
                    t = e.priceChartStore,
                    r = t.yAxis,
                    n = t.mouse.y,
                    i = e.orderFormStore,
                    a = m.a.product,
                    l = i.type,
                    c = Number(r.toDomain(n));
                    if (c = c.toFixed(a.quote.precision), "stop" === l) return i.setStopPrice(c);
                    i.setType("limit"),
                    i.setPrice(c)
                },
                o.onMouseOver = function(e) {
                    o.offsets = e.target.getBoundingClientRect()
                },
                o.onMouseMove = function(e) {
                    var t = o.props,
                    r = t.priceChartStore,
                    n = r.mouse,
                    i = r.xAxis,
                    a = r.candleWidth,
                    l = r.setSelected,
                    c = t.candlesStore,
                    u = o.offsets,
                    s = u.left,
                    f = u.top;
                    n.set({
                        x: e.clientX - s,
                        y: e.clientY - f
                    });
                    var p = i.toDomain(n.x + a),
                    d = c.bucket(p);
                    l(c.hash[d])
                },
                o.onMouseOut = function() {
                    var e = o.props.priceChartStore,
                    t = e.mouse,
                    r = e.setSelected;
                    t.set(),
                    r(null)
                },
                o.onWheel = function(e) {
                    var t = e.deltaX,
                    r = e.deltaY,
                    n = o.props.priceChartStore;
                    e.preventDefault(),
                    n.scroll(t, r)
                },
                o.onTouchStart = function(e) {
                    e.preventDefault(),
                    o.offsets = e.target.getBoundingClientRect();
                    var t = o.props.priceChartStore,
                    r = e.touches,
                    n = o.offsets,
                    i = n.left,
                    a = n.top,
                    l = r[0],
                    c = t.mouse,
                    u = l.clientX - i,
                    s = l.clientY - a;
                    c.set({
                        x: u,
                        y: s
                    })
                },
                o.onTouchMove = function(e) {
                    e.preventDefault();
                    var t = o.props.priceChartStore,
                    r = e.touches,
                    n = o.offsets,
                    i = n.left,
                    a = n.top,
                    l = r[0],
                    c = t.mouse,
                    u = c.x,
                    s = c.y,
                    f = l.clientX - i,
                    p = l.clientY - a,
                    d = f - u,
                    h = p - s;
                    c.set({
                        x: f,
                        y: p
                    }),
                    t.scroll(d, h)
                },
                Cl(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Pl(t, [{
                key: "render",
                value: function() {
                    return kl(Lo, {
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        onMouseOver: this.onMouseOver,
                        onMouseMove: this.onMouseMove,
                        onMouseOut: this.onMouseOut,
                        onWheel: this.onWheel,
                        onTouchMove: this.onTouchMove,
                        onTouchStart: this.onTouchStart,
                        onClick: this.onClick
                    })
                }
            }]),
            t
        } (),
        Al = Object(K.b)("candlesStore", "orderFormStore", "priceChartStore")(Object(K.c)(Tl)),
        El = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        zl = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Rl(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ml = 10,
        Dl = 4,
        Bl = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Rl(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props,
                    i = n.candlesStore,
                    a = n.priceChartStore,
                    l = m.a.product,
                    c = i.candles,
                    u = i.loading,
                    s = a.selected,
                    f = a.styles;
                    if (e.clearRect(0, 0, t, r), !u && c && c.length) {
                        e.fillStyle = f.textColor,
                        e.font = f.fontSize + "px " + f.fontFamily,
                        e.textBaseline = "center";
                        var p = s || c[0],
                        d = "O: " + p.open.toLocaleString("en-US", {
                            maximumFractionDigits: l.price_precision
                        }),
                        h = "C: " + p.close.toLocaleString("en-US", {
                            maximumFractionDigits: l.price_precision
                        }),
                        b = [d, "H: " + p.high.toLocaleString("en-US", {
                            maximumFractionDigits: l.price_precision
                        }), "L: " + p.low.toLocaleString("en-US", {
                            maximumFractionDigits: l.price_precision
                        }), h, "V: " + p.volume.toLocaleString("en-US", {
                            maximumFractionDigits: 0
                        })].join("  "),
                        y = e.measureText(b).width;
                        y > t || e.fillText(b, t - y - Ml, St / 2 + Dl)
                    }
                },
                Rl(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            zl(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.priceChartStore, e.candlesStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["priceChartStore", "candlesStore"])),
                    r = {
                        position: "absolute",
                        top: "-" + St + "px",
                        bottom: "100%"
                    };
                    return s.createElement($o, El({},
                    t, {
                        draw: this.draw,
                        style: r
                    }))
                }
            }]),
            t
        } (),
        Fl = Object(K.b)("priceChartStore", "candlesStore")(Object(K.c)(Bl)),
        Il = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ll = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function $l(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Wl, ql, Ul, Nl, Hl, Gl, Yl, Kl, Xl, Vl, Jl, Ql, Zl, ec, tc, rc, oc = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = $l(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.onSize = function(e, t) {
                    o.props.priceChartStore.setDimensions(e, t)
                },
                $l(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ll(t, [{
                key: "render",
                value: function() {
                    var e = this.props.candlesStore,
                    t = e.loading,
                    r = e.candles,
                    o = void 0;
                    return o = t ? Il(nc, {},
                    void 0, Il(ic, {})) : r && r.length ? this.chartContent: Il(V.d, {
                        center: !0,
                        auto: !0
                    },
                    void 0, Il(V.h, {},
                    void 0, "Unable to load chart data")),
                    Il(V.d, {
                        column: !0,
                        auto: !0
                    },
                    void 0, Il(na, {}), o)
                }
            },
            {
                key: "chartContent",
                get: function() {
                    var e = this.props,
                    t = e.candlesStore.type,
                    r = e.priceChartStore,
                    o = r.yAxisWidth,
                    n = r.xAxisHeight;
                    return Il(Io, {
                        onSize: this.onSize,
                        redraw: !0
                    },
                    void 0, Il(ua, {
                        bottom: n,
                        right: o
                    }), Il(ha, {
                        top: -n,
                        right: o
                    }), Il(ga, {
                        left: -o
                    }), Il("candle" === t ? bl: Na, {
                        right: o,
                        bottom: n
                    }), Il(Fl, {
                        left: 250,
                        right: 32
                    }), Il(xa, {}), Il(Ol, {
                        left: -o - 2
                    }), Il(xl, {
                        top: -n
                    }), Il(Al, {}))
                }
            }]),
            t
        } (),
        nc = Object(X.c)(V.d)(["position:relative;flex:1;"]),
        ic = Object(X.c)(Le.C)(["position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);"]),
        ac = Object(K.b)("candlesStore", "priceChartStore")(Object(K.c)(oc)),
        lc = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function cc(e) {
            if (Array.isArray(e)) {
                for (var t = 0,
                r = Array(e.length); t < e.length; t++) r[t] = e[t];
                return r
            }
            return Array.from(e)
        }
        function uc(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function sc(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var fc = "price-chart-candle-width",
        pc = (Wl = function(e) {
            function t(e) { !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                var r = function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return ! t || "object" != typeof t && "function" != typeof t ? e: t
                } (this, (t.__proto__ || Object.getPrototypeOf(t)).call(this));
                uc(r, "candleWidth", ql, r),
                uc(r, "start", Ul, r),
                uc(r, "end", Nl, r),
                uc(r, "candles", Hl, r),
                uc(r, "selected", Gl, r),
                uc(r, "manualScroll", Yl, r),
                uc(r, "yAxisWidth", Kl, r),
                r.numCandles = 0,
                r.candleSpacing = 1,
                r.width = 0,
                r.height = 0,
                r.xAxisHeight = 24,
                r.xAxis = new fn,
                r.yAxis = new fn({
                    reformat: !0
                }),
                r.mouse = new Vn,
                r.volumeScale = new Zo,
                r.emas = {
                    12 : new Cn(12),
                    26 : new Cn(26)
                },
                r.disposers = [],
                r.onHide = function() {
                    r.manualScroll = !1
                },
                uc(r, "setSelected", Xl, r),
                uc(r, "scroll", Vl, r),
                uc(r, "updateTime", Jl, r),
                uc(r, "disableManualScroll", Ql, r),
                uc(r, "setCandleWidth", Zl, r),
                uc(r, "setDimensions", ec, r),
                uc(r, "adjustAxes", tc, r),
                uc(r, "resume", rc, r),
                r.candlesStore = e;
                var o = Yo.f.getItem(fc);
                return o && r.setCandleWidth(o),
                r
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, y["b"]),
            lc(t, [{
                key: "subscribe",
                value: function() {
                    var e = this;
                    this.disposers.push(Object(g.observe)(this.candlesStore.candles, this.adjustAxes)),
                    this.disposers.push(Object(g.observe)(this.candlesStore, "end", this.updateTime)),
                    this.disposers.push(Object(g.observe)(this.candlesStore, "loading", this.disableManualScroll)),
                    this.disposers.push(Object(g.observe)(this.candlesStore, "paging", this.adjustAxes)),
                    this.disposers.push(Object(g.observe)(Q.f, "theme",
                    function() {
                        e.adjustAxes
                    })),
                    this.updateTime(),
                    this.adjustAxes()
                }
            },
            {
                key: "unsubscribe",
                value: function() {
                    this.disposers.forEach(function(e) {
                        return e()
                    }),
                    this.disposers.length = 0
                }
            },
            {
                key: "styles",
                get: function() {
                    var e = Q.f.theme,
                    t = e.colors,
                    r = t.text,
                    o = t.base,
                    n = t.label,
                    i = t.primary,
                    a = t.highlight,
                    l = t.chartBuy,
                    c = t.chartSell,
                    u = t.chartAccent,
                    s = t.chartHighlight1,
                    f = t.chartHighlight2;
                    return {
                        fontFamily: e.fonts.family.mono,
                        fontSize: 10,
                        fontWeight: "normal",
                        textColor: n.
                    default,
                        gridColor: Object(Go.e)(.85, r.
                    default),
                        axisColor: Object(Go.e)(.85, r.
                    default),
                        axisLineWidth: .5,
                        xAxisTextAlign: "center",
                        xAxisTextBaseline: "top",
                        yAxisTextAlign: "left",
                        yAxisTextBaseline: "middle",
                        yAxisLeftPadding: 6,
                        yAxisRightPadding: 10,
                        axesLabelText: r.
                    default,
                        axesLabelBackground: o.
                    default,
                        axesLabelPadding: 10,
                        crosshairsColor: Object(Go.e)(.7, r.
                    default),
                        lineVolumeGreenColor: Object(Go.e)(.4, l.
                    default),
                        lineVolumeRedColor: Object(Go.e)(.2, c.
                    default),
                        lineWidth: 2,
                        lineColor: i.
                    default,
                        lineGradientColor1: Object(Go.e)(.3, i.
                    default),
                        lineGradientColor2: "transparent",
                        volumeColor: u.
                    default,
                        candleGreenColor: Object(Go.e)(.1, l.
                    default),
                        candleGreenBackground: o.
                    default,
                        candleRedColor: Object(Go.e)(.1, c.
                    default),
                        candleRedBackground: Object(Go.e)(.1, c.
                    default),
                        emaColor1: s.
                    default,
                        emaColor2: f.
                    default,
                        emaLineWidth: 1,
                        highlightVolumeColor: a.
                    default,
                        highlightGreenColor: Object(Go.b)(.1, l.
                    default),
                        highlightRedColor: Object(Go.b)(.1, c.
                    default)
                    }
                }
            }]),
            t
        } (), ql = sc(Wl.prototype, "candleWidth", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 8
            }
        }), Ul = sc(Wl.prototype, "start", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return new Date
            }
        }), Nl = sc(Wl.prototype, "end", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return new Date
            }
        }), Hl = sc(Wl.prototype, "candles", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return []
            }
        }), Gl = sc(Wl.prototype, "selected", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return null
            }
        }), Yl = sc(Wl.prototype, "manualScroll", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return ! 1
            }
        }), Kl = sc(Wl.prototype, "yAxisWidth", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return 0
            }
        }), Xl = sc(Wl.prototype, "setSelected", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t) {
                    e.selected = t
                }
            }
        }), Vl = sc(Wl.prototype, "scroll", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t, r) {
                    var o = e.candlesStore,
                    n = o.granularity,
                    i = o.start,
                    a = o.end,
                    l = !1;
                    if (e.manualScroll = !0, Math.abs(t) > 1) {
                        var c = Math.min(Math.abs(t), 12),
                        u = t < 0 ? -c: c,
                        s = e.width * (1 / 3) / (e.candleWidth + e.candleSpacing) * n,
                        f = u * n * 1,
                        p = e.start.getTime() + f,
                        d = e.end.getTime() + f;
                        p + s > i.getTime() && d - s < a.getTime() && (e.end = new Date(e.end.getTime() + f), l = !0)
                    }
                    if (Math.abs(r) > 1) {
                        var h = Math.min(Math.abs(r), 6),
                        b = r < 0 ? -h: h,
                        y = e.candleWidth + .1 * -b;
                        if (y >= 3 && y <= 14 && (e.setCandleWidth(y), l = !0, r < 0)) {
                            var v = e.width * (1 / 3) / (e.candleWidth + e.candleSpacing) * n,
                            m = a.getTime() + v;
                            e.end.getTime() > m && (e.end = new Date(m))
                        }
                    }
                    l && e.adjustAxes()
                }
            }
        }), Jl = sc(Wl.prototype, "updateTime", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = e.candlesStore.end;
                    e.manualScroll || (e.end = t)
                }
            }
        }), Ql = sc(Wl.prototype, "disableManualScroll", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    e.manualScroll = !1
                }
            }
        }), Zl = sc(Wl.prototype, "setCandleWidth", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t) {
                    e.candleWidth = t,
                    Yo.f.setItem(fc, t)
                }
            }
        }), ec = sc(Wl.prototype, "setDimensions", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t, r) {
                    e.width = t,
                    e.height = r,
                    e.adjustAxes()
                }
            }
        }), tc = sc(Wl.prototype, "adjustAxes", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = e.candlesStore,
                    r = t.candles,
                    o = t.start,
                    n = t.granularity,
                    i = t.paginationInterval,
                    a = e.height,
                    l = e.width;
                    if (r.length && a && l) {
                        var c = e.candleWidth / 2,
                        u = Math.ceil(l / (e.candleWidth + c));
                        e.start = new Date(e.end - u * n),
                        e.numCandles = u,
                        e.candleSpacing = c,
                        e.start - o < i / 3 && e.candlesStore.loadMoreCandles(),
                        e.xAxis.domain = {
                            min: e.start,
                            max: e.end
                        },
                        e.candles = r.filter(function(t) {
                            return t.date >= e.start && t.date <= e.end
                        }),
                        e.yAxis.domain = {
                            min: Math.min.apply(Math, cc(e.candles.map(function(e) {
                                return e.low
                            }))),
                            max: Math.max.apply(Math, cc(e.candles.map(function(e) {
                                return e.high
                            })))
                        },
                        e.volumeScale.domain = {
                            min: 0,
                            max: Math.max.apply(Math, cc(e.candles.map(function(e) {
                                return e.volume
                            })))
                        };
                        var s = m.a.product,
                        f = e.styles,
                        p = f.fontWeight,
                        d = f.fontSize,
                        h = f.fontFamily,
                        b = f.yAxisLeftPadding,
                        y = f.yAxisRightPadding,
                        v = 0;
                        if (e.yAxis.domain.max) {
                            var g = p + " " + d + "px " + h,
                            O = "" + s.quote.symbol + Number(e.yAxis.domain.max).toFixed(s.price_precision),
                            w = Object(Co.measureText)(O, g);
                            w && (v = w.width)
                        }
                        e.yAxisWidth = v + b + y;
                        var j = a - e.xAxisHeight,
                        S = l - e.yAxisWidth;
                        e.yAxis.numTicks = Math.floor(j / 60),
                        e.yAxis.range = {
                            min: j,
                            max: 10
                        };
                        e.xAxis.numTicks = Math.floor(S / 60),
                        e.xAxis.range = {
                            min: 0,
                            max: S - e.candleWidth / 2
                        },
                        e.volumeScale.range = {
                            min: j,
                            max: 2 * j / 3
                        },
                        Object.keys(e.emas).forEach(function(t) {
                            e.emas[t].update(r.slice(0).reverse())
                        })
                    }
                }
            }
        }), rc = sc(Wl.prototype, "resume", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function() {
                    var t = e.candlesStore.end;
                    e.manualScroll = !1,
                    e.end = t,
                    e.adjustAxes()
                }
            }
        }), sc(Wl.prototype, "styles", [g.computed], Object.getOwnPropertyDescriptor(Wl.prototype, "styles"), Wl.prototype), Wl),
        dc = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        hc = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function bc(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var yc = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = bc(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.candlesStore = new y.d,
                o.priceChartStore = new pc(o.candlesStore),
                bc(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["PureComponent"]),
            hc(t, [{
                key: "render",
                value: function() {
                    return dc(h.b, {
                        candlesStore: this.candlesStore,
                        priceChartStore: this.priceChartStore
                    },
                    void 0, dc(ac, {}))
                }
            }]),
            t
        } (),
        vc = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        mc = X.c.div(["position:absolute;top:5px;z-index:1;display:flex;justify-content:center;width:100%;pointer-events:none;"]),
        gc = X.c.div.attrs({
            role: "button"
        })(["opacity:0.6;cursor:pointer;user-select:none;pointer-events:all;", ";"],
        function(e) {
            return e.disabled ? Object(X.b)(["opacity:0.2;cursor:default;user-select:none;"]) : Object(X.b)(["&:hover{opacity:1;}"])
        }),
        Oc = Object(K.b)("depthStore")(Object(K.c)(function(e) {
            var t = e.depthStore,
            r = t.midprice,
            o = t.zoomIdx,
            n = t.zoomIn,
            i = t.zoomOut;
            return vc(mc, {},
            void 0, vc(gc, {
                type: "out",
                onClick: i,
                disabled: o + 1 >= y.n.length
            },
            void 0, vc(Le.v, {})), vc(V.d, {
                column: !0,
                center: !0
            },
            void 0, vc(Z.r, {
                value: r,
                precision: m.a.product.price_precision + 1,
                fontSize: "large",
                fontWeight: "500"
            }), vc(V.h, {
                fontSize: "small",
                tone: "weak"
            },
            void 0, "Mid Market Price")), vc(gc, {
                type: "in",
                onClick: n,
                disabled: o <= 0
            },
            void 0, vc(Le.y, {})))
        }));
        function wc(e, t) {
            return function(r) {
                return t - r / e * t * .9
            }
        }
        function jc(e, t, r) {
            for (var o = t - e,
            n = o / r,
            i = Math.log(n) / Math.log(10), a = i < 0 ? Math.floor(i) : Math.ceil(i), l = Math.pow(10, a), c = Math.floor(o / l); c < r;) a -= 1,
            l = Math.pow(10, a),
            c = Math.floor(o / l);
            var u = Math.floor(c / r) * l;
            return {
                initial: Math.ceil(e / l) * l,
                unitStepWidth: u,
                precision: a < 0 ? -a: 0
            }
        }
        function Sc(e, t, r, o, n) {
            e.beginPath(),
            e.moveTo(t, r),
            e.lineTo(t + o, r + n),
            e.stroke()
        }
        var _c = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        xc = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function kc(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Pc = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = kc(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.depthStore,
                    i = n.worstBid,
                    a = n.worstAsk,
                    l = n.styles,
                    c = m.a.product.quote;
                    e.clearRect(0, 0, t, r);
                    var u = a - i;
                    e.lineWidth = 1,
                    e.strokeStyle = l.lineColor,
                    e.fillStyle = l.textColor,
                    e.font = "10px " + l.fontFamily,
                    e.textBaseline = "top",
                    e.textAlign = "center",
                    Sc(e, 0, 0, t, 0);
                    for (var s = Math.floor(t / 100), f = jc(i, a, s), p = f.initial, d = f.unitStepWidth, h = f.precision, b = p; b < a; b += d) {
                        var y = (b - i) * t / u;
                        Sc(e, y, 0, 0, 4);
                        var v = c.symbol + Object(Yo.d)(b.toFixed(h));
                        e.fillText(v, y, 5)
                    }
                },
                kc(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            xc(t, [{
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.depthStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["depthStore"]));
                    return s.createElement($o, _c({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        Cc = Object(K.b)("depthStore")(Object(K.c)(Pc)),
        Tc = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Ac = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Ec(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var zc = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Ec(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.depthStore,
                    i = n.maxSize,
                    a = n.styles,
                    l = r - 5;
                    e.clearRect(0, 0, t, r),
                    e.lineWidth = 1,
                    e.strokeStyle = a.lineColor,
                    e.fillStyle = a.textColor,
                    e.font = "10px " + a.fontFamily,
                    Sc(e, Math.floor(t / 2), 100, 0, l - 100);
                    var c = function(e) {
                        return l - e * l / i
                    },
                    u = Math.floor(l / 50),
                    s = jc(0, i, u),
                    f = s.initial,
                    p = s.unitStepWidth,
                    d = (l - 5) * i / l;
                    o.drawYAxis(e, f, p, d, c, t, "left"),
                    o.drawYAxis(e, f, p, d, c, t, "right")
                },
                Ec(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Ac(t, [{
                key: "drawYAxis",
                value: function(e, t, r, o, n, i, a) {
                    var l, c = "left" === a ? 0 : i,
                    u = "left" === a ? 1 : -1;
                    e.textBaseline = "middle",
                    e.textAlign = a;
                    for (var s = t; s < o; s += r) {
                        var f = n(s);
                        Sc(e, c, f, 6 * u, 0);
                        var p = (l = s) > 1e6 ? (l / 1e6).toString() + "M": l > 1e3 ? (l / 1e3).toString() + "k": l.toString();
                        e.fillText(p, c + 8 * u, f)
                    }
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.depthStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["depthStore"]));
                    return s.createElement($o, Tc({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        Rc = Object(K.b)("depthStore")(Object(K.c)(zc)),
        Mc = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Dc = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Bc(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Fc, Ic = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Bc(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r, n) {
                    var i = o.props.depthStore.styles;
                    t.clearRect(0, 0, r, n);
                    var a = Math.floor(n / 2),
                    l = r / 2;
                    t.strokeStyle = "buy" === e.side ? i.bidsStrokeStyle: i.asksStrokeStyle,
                    t.beginPath(),
                    t.moveTo(l - 5, a),
                    t.lineTo(l, a - 5),
                    t.lineTo(l + 5, a),
                    t.lineTo(l, a + 5),
                    t.closePath(),
                    t.stroke(),
                    o.props.ordersStore.selected === e && (t.fillStyle = t.strokeStyle, t.fill())
                },
                Bc(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Dc(t, [{
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props,
                    r = t.width,
                    o = t.height,
                    n = t.top,
                    i = t.bottom,
                    a = t.ordersStore,
                    l = t.depthStore,
                    c = l.worstBid,
                    u = l.worstAsk,
                    s = a.models.filter(function(e) {
                        var t = e.price || e.stop_price;
                        return e.active && t && t.gte(c) && t.lte(u)
                    });
                    return Mc("div", {},
                    void 0, s.map(function(t) {
                        var l = function(e) {
                            return Math.floor(r * ((Number(e.price || e.stop_price) - c) / (u - c)))
                        } (t);
                        return Mc($o, {
                            onMouseEnter: function() {
                                return a.selectOrder(t)
                            },
                            onMouseLeave: function() {
                                return a.selectOrder(null)
                            },
                            height: o,
                            width: r,
                            top: n,
                            bottom: i,
                            left: l,
                            right: -l - 10,
                            draw: function(r, o, n) {
                                return e.draw(t, r, o, n)
                            }
                        },
                        t.id)
                    }))
                }
            }]),
            t
        } (),
        Lc = Object(K.b)("depthStore", "ordersStore")(Object(K.c)(Ic)),
        $c = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Wc = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function qc(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Uc = 3;
        var Nc, Hc, Gc, Yc, Kc, Xc, Vc = 3,
        Jc = 4,
        Qc = 8,
        Zc = 5,
        eu = (Fc = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = qc(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.state = {
                    mouse: null,
                    elementOffsetX: 0,
                    width: 0,
                    height: 0
                },
                o.onMouseMove = function(e) {
                    var t = e.clientX - o.state.elementOffsetX;
                    o.setState({
                        mouse: {
                            x: t
                        }
                    })
                },
                o.onMouseOver = function(e) {
                    var t = e.target.getBoundingClientRect().left;
                    o.setState({
                        elementOffsetX: t
                    })
                },
                o.onMouseOut = function() {
                    o.setState({
                        mouse: null
                    })
                },
                o.onClick = function() {
                    var e = o.mouseData,
                    t = o.props.orderFormStore,
                    r = m.a.product;
                    if (e && r) {
                        var n = r.base,
                        i = r.quote,
                        a = e.value,
                        l = e.sum,
                        c = e.amount,
                        u = e.isBid,
                        s = "limit" === t.type;
                        if (t.setSide(s === u ? "buy": "sell"), "market" !== t.type) {
                            var f = a.toFixed(i.precision);
                            "limit" !== t.type ? "stop" === t.type && t.setStopPrice(f) : t.setPrice(f)
                        } else {
                            var p = u ? l.toFixed(n.precision) : c.toFixed(i.precision);
                            t.setAmount(p)
                        }
                    }
                },
                o.draw = function(e, t, r) {
                    var n = o.props.depthStore.styles;
                    if (e.clearRect(0, 0, t, r), o.mouseData) {
                        var i = o.mouseData,
                        a = i.x,
                        l = i.y,
                        c = a < t / 2 ? n.bidsStrokeStyle: n.asksStrokeStyle;
                        e.strokeStyle = c,
                        e.fillStyle = c,
                        e.setLineDash([3, 3]),
                        Sc(e, a, l, 0, r - l),
                        e.setLineDash([]),
                        e.beginPath(),
                        e.arc(a, l, 4, 0, 2 * Math.PI, !1),
                        e.fill(),
                        e.beginPath(),
                        e.arc(a, l, 6, 0, 2 * Math.PI, !1),
                        e.stroke(),
                        o.renderMouseData(e, t, r)
                    }
                },
                o.renderMouseData = function(e, t, r) {
                    if (o.mouseData) {
                        var n = m.a.product,
                        i = n.quote,
                        a = n.base,
                        l = o.props.depthStore.styles,
                        c = o.mouseData,
                        u = c.value,
                        s = c.sum,
                        f = c.amount,
                        p = c.x,
                        d = c.y,
                        h = c.isBid,
                        b = 3 * l.fontSize + 3 * Zc + 2 * Qc,
                        y = h ? "Sell": "Buy",
                        v = p,
                        g = d;
                        g -= b + 2 * Zc;
                        var O = "fiat" === i.type ? i.symbol: "",
                        w = "fiat" === a.type ? a.symbol: "",
                        j = Math.min(i.precision, Jc),
                        S = Math.min(a.precision, Jc),
                        _ = "" + O + u.toLocaleString("en-US", {
                            maximumFractionDigits: j
                        }),
                        x = "" + w + s.toLocaleString("en-US", {
                            maximumFractionDigits: S
                        }),
                        k = "" + O + f.toLocaleString("en-US", {
                            maximumFractionDigits: j
                        });
                        e.textBaseline = "top",
                        e.font = l.fontSize + "px " + l.fontFamily;
                        var P = e.measureText(y).width,
                        C = e.measureText("Cost").width,
                        T = Math.max(P, C);
                        e.font = l.fontSize + "px " + l.monoFontFamily;
                        var A = Math.max(e.measureText(x).width, e.measureText(k).width) + T + Zc + 2 * Qc + Vc,
                        E = .25 * t,
                        z = !1; (!h && t - p < E || h && p > E) && (z = !0, v -= A),
                        d < r / 2 && (g += b + 4 * Zc),
                        e.fillStyle = l.hoverColor,
                        e.fillRect(v, g, A, b),
                        e.fillStyle = h ? l.bidsStrokeStyle: l.asksStrokeStyle;
                        var R = z ? v + A - Vc: v;
                        e.fillRect(R, g, Vc, b),
                        v += Qc + (z ? 0 : Vc);
                        var M = g += Qc,
                        D = g += 2 * Zc + l.fontSize,
                        B = g += Zc + l.fontSize;
                        e.fillStyle = l.textColor,
                        e.fillText(x, v + Zc + T, D),
                        e.fillText(k, v + Zc + T, B),
                        e.font = "500 " + (l.fontSize + 2) + "px " + l.monoFontFamily,
                        e.fillStyle = l.titleColor,
                        e.fillText(_, v, M),
                        e.font = l.fontSize + "px " + l.fontFamily,
                        e.fillStyle = h ? l.asksStrokeStyle: l.bidsStrokeStyle,
                        e.fillText(y, v, D),
                        e.fillText("Cost", v, B)
                    }
                },
                qc(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Wc(t, [{
                key: "UNSAFE_componentWillReceiveProps",
                value: function(e) {
                    var t = e.width,
                    r = e.height;
                    this.setState({
                        width: t,
                        height: r
                    })
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = e.width,
                    r = void 0 === t ? 0 : t,
                    o = e.height;
                    return $c($o, {
                        width: r,
                        height: void 0 === o ? 0 : o,
                        top: 0,
                        left: 0,
                        bottom: 20,
                        right: 0,
                        onMouseOver: this.onMouseOver,
                        onMouseMove: this.onMouseMove,
                        onMouseOut: this.onMouseOut,
                        onClick: this.onClick,
                        draw: this.draw,
                        style: {
                            cursor: "pointer"
                        }
                    })
                }
            },
            {
                key: "mouseData",
                get: function() {
                    var e = this.state,
                    t = e.mouse,
                    r = e.width,
                    o = e.height,
                    n = this.props.depthStore,
                    i = n.bidsData,
                    a = n.asksData,
                    l = n.worstBid,
                    c = n.worstAsk,
                    u = n.midprice,
                    s = n.maxSize;
                    if (t) {
                        var f = (c - l) * (t.x / r) + l,
                        p = f <= u,
                        d = p ? i: a,
                        h = function(e, t, r) {
                            for (var o = 0,
                            n = e.length / Uc - 1; n - o > 1;) {
                                var i = Math.floor(o + (n - o) / 2);
                                e[i * Uc] < t === r ? n = i: o = i
                            }
                            return (r ? n: o) * Uc
                        } (d, f, p);
                        if (h) {
                            var b = d[h],
                            y = d[h + 1],
                            v = d[h + 2],
                            m = wc(s, o - 20)(y);
                            return {
                                value: b,
                                sum: y,
                                amount: v,
                                x: t.x,
                                y: m,
                                isBid: p
                            }
                        }
                    }
                }
            }]),
            t
        } (), Nc = Fc.prototype, Hc = "mouseData", Gc = [g.computed], Yc = Object.getOwnPropertyDescriptor(Fc.prototype, "mouseData"), Kc = Fc.prototype, Xc = {},
        Object.keys(Yc).forEach(function(e) {
            Xc[e] = Yc[e]
        }), Xc.enumerable = !!Xc.enumerable, Xc.configurable = !!Xc.configurable, ("value" in Xc || Xc.initializer) && (Xc.writable = !0), Xc = Gc.slice().reverse().reduce(function(e, t) {
            return t(Nc, Hc, e) || e
        },
        Xc), Kc && void 0 !== Xc.initializer && (Xc.value = Xc.initializer ? Xc.initializer.call(Kc) : void 0, Xc.initializer = void 0), void 0 === Xc.initializer && (Object.defineProperty(Nc, Hc, Xc), Xc = null), Fc),
        tu = Object(K.b)("depthStore", "orderFormStore")(Object(K.c)(eu)),
        ru = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        ou = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function nu(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var iu = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = nu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.draw = function(e, t, r) {
                    var n = o.props.depthStore,
                    i = n.bidsData,
                    a = n.asksData,
                    l = n.styles;
                    e.clearRect(0, 0, t, r),
                    e.lineWidth = 2,
                    e.strokeStyle = l.bidsStrokeStyle,
                    e.fillStyle = l.bidsFillStyle,
                    o.drawData(e, t, r, i, !1),
                    e.strokeStyle = l.asksStrokeStyle,
                    e.fillStyle = l.asksFillStyle,
                    o.drawData(e, t, r, a, !0)
                },
                nu(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            ou(t, [{
                key: "drawData",
                value: function(e, t, r, o, n) {
                    var i = this.props.depthStore,
                    a = i.worstBid,
                    l = i.worstAsk,
                    c = wc(i.maxSize, r),
                    u = l - a,
                    s = n ? t: 0;
                    e.beginPath(),
                    e.moveTo(Math.floor(t / 2), r);
                    for (var f = r,
                    p = 0; p < o.length; p += 3) {
                        var d = t / u * (o[p] - a),
                        h = c(o[p + 1]);
                        e.lineTo(d, f),
                        e.lineTo(d, h),
                        f = h
                    }
                    e.stroke(),
                    e.lineTo(s, f),
                    e.lineTo(s, r),
                    e.closePath(),
                    e.fill()
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props,
                    t = (e.depthStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (e, ["depthStore"]));
                    return s.createElement($o, ru({},
                    t, {
                        draw: this.draw
                    }))
                }
            }]),
            t
        } (),
        au = Object(K.b)("depthStore")(Object(K.c)(iu)),
        lu = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        cu = Object(K.b)("depthStore")(Object(K.c)(function(e) {
            return e.depthStore.loading ? lu(V.d, {
                center: !0,
                auto: !0
            },
            void 0, lu(Le.C, {})) : lu(Io, {},
            void 0, lu(au, {
                bottom: 20
            }), lu(Rc, {
                bottom: 15
            }), lu(Cc, {
                top: -20
            }), lu(tu, {}), lu(Lc, {
                top: -25,
                bottom: 15
            }), lu(Lo, {
                top: 5,
                left: 0,
                right: 0
            },
            void 0, lu(Oc, {})))
        })),
        uu = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        su = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function fu(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var pu = new y.e,
        du = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = fu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.setTheme = function() {
                    var e = Q.f.theme,
                    t = e.colors,
                    r = t.text,
                    o = t.accent,
                    n = t.label,
                    i = t.chartBuy,
                    a = t.chartSell,
                    l = t.buy,
                    c = t.sell,
                    u = e.fonts.family,
                    s = {
                        fontFamily: u.regular,
                        monoFontFamily: u.mono,
                        fontSize: 11,
                        bidsStrokeStyle: i.
                    default,
                        bidsFillStyle: Object(Go.e)(.8, i.
                    default),
                        asksStrokeStyle: a.
                    default,
                        asksFillStyle: Object(Go.e)(.8, a.
                    default),
                        lineColor: Object(Go.e)(.8, r.
                    default),
                        textColor: n.
                    default,
                        titleColor: r.
                    default,
                        hoverColor: o.
                    default,
                        asksHoverColor: c.
                    default,
                        bidsHoverColor: l.
                    default
                    };
                    pu.setStyles(s)
                },
                fu(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["PureComponent"]),
            su(t, [{
                key: "componentDidMount",
                value: function() {
                    this.disposer = Object(g.observe)(Q.f, "theme", this.setTheme),
                    this.setTheme()
                }
            },
            {
                key: "componentWillUnmount",
                value: function() {
                    this.disposer && this.disposer()
                }
            },
            {
                key: "render",
                value: function() {
                    return uu(h.b, {
                        depthStore: pu
                    },
                    void 0, s.createElement(cu, this.props))
                }
            }]),
            t
        } (),
        hu = Object(K.c)(du),
        bu = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } (),
        yu = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } ();
        function vu(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var mu = function() {
            return yu(Mt, {
                showOverflow: !0,
                title: "Price Charts"
            },
            void 0, yu(V.d, {
                column: !0,
                auto: !0
            },
            void 0, yu(V.d, {
                flex: "3 1 150px"
            },
            void 0, yu(yc, {})), yu(V.d, {
                flex: "1 0 100px"
            },
            void 0, yu(hu, {}))))
        },
        gu = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = vu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.state = {
                    tab: "price"
                },
                o.setTab = function(e) {
                    Object(p.d)(e + "_chart_option_clicked"),
                    o.setState({
                        tab: e
                    })
                },
                o.setTabPrice = function() {
                    return o.setTab("price")
                },
                o.setTabDepth = function() {
                    return o.setTab("depth")
                },
                vu(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            bu(t, [{
                key: "render",
                value: function() {
                    return yu(Mt, {
                        showOverflow: !0,
                        title: this.title
                    },
                    void 0, this.tab)
                }
            },
            {
                key: "title",
                get: function() {
                    var e = this.state.tab;
                    return yu(V.d, {
                        auto: !0
                    },
                    void 0, yu(V.d, {
                        auto: !0
                    },
                    void 0, "price" === e ? "Price Chart": "Depth Chart"), yu(V.d, {
                        justify: "center"
                    },
                    void 0, yu(It, {
                        onClick: this.setTabPrice,
                        active: "price" === e
                    },
                    void 0, "Price Chart"), yu(It, {
                        onClick: this.setTabDepth,
                        active: "depth" === e
                    },
                    void 0, "Depth Chart")))
                }
            },
            {
                key: "tab",
                get: function() {
                    var e = this.state.tab;
                    return yu("price" === e ? yc: hu, {})
                }
            }]),
            t
        } (),
        Ou = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        wu = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } ();
        var ju = Object(X.c)(V.d)(["padding-left:8px;border-left:2px solid ", ";text-transform:capitalize;"],
        function(e) {
            var t = e.side;
            return e.theme.colors[t].
        default
        }),
        Su = Object(K.c)(function(e) {
            var t = e.order,
            r = t.side,
            o = t.stop_price,
            n = t.status,
            i = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["order"]),
            a = m.a.product;
            if (!a) return null;
            var l = r;
            return o && "open" !== n && "done" !== n && (l = "Stop @ " + o.toFixed(a.price_precision)),
            wu(ju, {
                side: r
            },
            void 0, f.a.createElement(V.h, Ou({
                intent: r,
                mono: !0
            },
            i), l))
        }),
        _u = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var xu = Object(K.c)(function(e) {
            var t = e.order,
            r = e.precision,
            o = void 0 === r ? 4 : r,
            n = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["order", "precision"]),
            i = m.a.product;
            if (!i) throw new b.e("No product");
            var a = t.sizeAndUnit,
            l = a.size,
            c = "base" === a.unit ? i.base: i.quote;
            return f.a.createElement(Z.r, _u({
                value: l,
                unit: c.id,
                precision: o,
                approximate: !0
            },
            n))
        }),
        ku = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var Pu = Object(K.c)(function(e) {
            var t = e.order.filled_size,
            r = e.precision,
            o = void 0 === r ? 4 : r,
            n = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["order", "precision"]);
            return f.a.createElement(Z.r, ku({
                value: t,
                precision: o,
                approximate: !0
            },
            n))
        }),
        Cu = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var Tu = Object(K.c)(function(e) {
            var t = e.order.displayedPrice,
            r = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["order"]);
            if (!t) return "MKT";
            var o = m.a.product;
            if (!o) throw new b.e("No product");
            return f.a.createElement(Z.r, Cu({
                value: t,
                precision: o.price_precision,
                approximate: !0
            },
            r))
        }),
        Au = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var Eu = Object(K.c)(function(e) {
            var t = e.order.fill_fees,
            r = e.precision,
            o = void 0 === r ? 4 : r,
            n = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["order", "precision"]);
            return f.a.createElement(Z.r, Au({
                value: t,
                intent: t && t.gt(0) ? "sell": "text",
                precision: o,
                approximate: !0
            },
            n))
        }),
        zu = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var Ru = Object(X.c)(V.h)(["text-transform:capitalize;"]),
        Mu = Object(K.c)(function(e) {
            var t = e.order.displayedStatus,
            r = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["order"]);
            return f.a.createElement(Ru, zu({
                mono: !0
            },
            r), t)
        }),
        Du = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Bu = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Fu(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Iu = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Fu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.onClick = function() {
                    var e = o.props,
                    t = e.order,
                    r = e.ordersStore;
                    t.active ? r.destroyOrder(t) : t.done && r.removeOrder(t)
                },
                Fu(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, f.a.Component),
            Bu(t, [{
                key: "render",
                value: function() {
                    var e = this.props.order;
                    return e.active || e.done ? Du(Lu, {
                        center: !0,
                        onClick: this.onClick
                    },
                    void 0, Du(V.c, {})) : null
                }
            }]),
            t
        } (),
        Lu = Object(X.c)(V.d)(["", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["&:hover{background:", ";}"], t.colors.alert.
        default)
        }),
        $u = Object(K.b)("ordersStore")(Object(K.c)(Iu)),
        Wu = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        qu = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Uu(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Nu = 4,
        Hu = "smaller",
        Gu = "normal",
        Yu = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Uu(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.renderSide = function(e) {
                    var t = e.rowData;
                    return Wu(Su, {
                        order: t,
                        fontSize: Hu
                    })
                },
                o.renderSize = function(e) {
                    var t = e.rowData;
                    return Wu(xu, {
                        order: t,
                        precision: Nu,
                        fontSize: Hu,
                        fontWeight: Gu
                    })
                },
                o.renderFilled = function(e) {
                    var t = e.rowData;
                    return Wu(Pu, {
                        order: t,
                        precision: Nu,
                        fontSize: Hu,
                        fontWeight: Gu
                    })
                },
                o.renderPrice = function(e) {
                    var t = e.rowData;
                    return Wu(Tu, {
                        order: t,
                        fontSize: Hu,
                        fontWeight: Gu
                    })
                },
                o.renderFees = function(e) {
                    var t = e.rowData;
                    return Wu(Eu, {
                        order: t,
                        precision: Nu,
                        fontSize: Hu,
                        fontWeight: Gu
                    })
                },
                o.renderStatus = function(e) {
                    var t = e.rowData;
                    return Wu(Mu, {
                        order: t,
                        fontSize: Hu
                    })
                },
                o.renderAction = function(e) {
                    var t = e.rowData;
                    return Wu($u, {
                        order: t
                    })
                },
                Uu(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, f.a.Component),
            qu(t, [{
                key: "componentDidMount",
                value: function() {
                    this.props.ordersStore.reset()
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props.ordersStore,
                    t = m.a.product;
                    return Wu(Z.m, {
                        store: e,
                        noRowsMessage: "No orders to show",
                        headerIntent: "base",
                        backgroundIntent: "base",
                        rowHeight: 25
                    },
                    void 0, Wu(Z.c, {
                        label: "Side",
                        dataKey: "side",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderSide
                    }), Wu(Z.c, {
                        label: "Size",
                        dataKey: "sizeAndUnit",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderSize
                    }), Wu(Z.c, {
                        label: "Filled (" + t.base.id + ")",
                        dataKey: "filled_size",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderFilled
                    }), Wu(Z.c, {
                        label: "Price (" + t.quote.id + ")",
                        dataKey: "displayedPrice",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderPrice
                    }), Wu(Z.c, {
                        label: "Fee (" + t.quote.id + ")",
                        dataKey: "fill_fees",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderFees
                    }), Wu(Z.c, {
                        label: "Status",
                        dataKey: "displayedStatus",
                        width: 120,
                        flexGrow: 1,
                        cellRenderer: this.renderStatus
                    }), Wu(Z.c, {
                        label: "",
                        dataKey: "id",
                        width: 60,
                        cellRenderer: this.renderAction
                    }))
                }
            }]),
            t
        } (),
        Ku = Object(K.b)("ordersStore")(Object(K.c)(Yu)),
        Xu = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Vu = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } ();
        var Ju = Object(X.c)(V.d)(["padding-left:8px;border-left:2px solid ", ";text-transform:capitalize;"],
        function(e) {
            var t = e.side;
            return e.theme.colors[t].
        default
        }),
        Qu = Object(K.c)(function(e) {
            var t = e.fill.side,
            r = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["fill"]);
            return Vu(Ju, {
                side: t
            },
            void 0, f.a.createElement(V.h, Xu({
                intent: t,
                mono: !0
            },
            r), t))
        }),
        Zu = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var es = Object(K.c)(function(e) {
            var t = e.fill.size,
            r = e.precision,
            o = void 0 === r ? 4 : r,
            n = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["fill", "precision"]);
            return f.a.createElement(Z.r, Zu({
                value: t,
                precision: o,
                approximate: !0
            },
            n))
        }),
        ts = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var rs = Object(K.c)(function(e) {
            var t = e.fill.price,
            r = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["fill"]),
            o = m.a.product;
            if (!o) throw new b.e("No product");
            return f.a.createElement(Z.r, ts({
                value: t,
                precision: o.price_precision,
                approximate: !0
            },
            r))
        }),
        os = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var ns = Object(K.c)(function(e) {
            var t = e.fill.fee,
            r = e.precision,
            o = void 0 === r ? 4 : r,
            n = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["fill", "precision"]);
            return f.a.createElement(Z.r, os({
                value: t,
                intent: t && t.gt(0) ? "sell": "text",
                precision: o,
                approximate: !0
            },
            n))
        }),
        is = r(1145),
        as = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        };
        var ls = Object(K.c)(function(e) {
            var t = e.fill.created_at,
            r = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["fill"]);
            return f.a.createElement(is.a, as({
                mono: !0,
                moment: t
            },
            r))
        }),
        cs = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        us = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ss(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var fs = 4,
        ps = "smaller",
        ds = "normal",
        hs = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ss(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.renderSide = function(e) {
                    var t = e.rowData;
                    return cs(Qu, {
                        fill: t,
                        fontSize: ps
                    })
                },
                o.renderSize = function(e) {
                    var t = e.rowData;
                    return cs(es, {
                        fill: t,
                        precision: fs,
                        fontSize: ps,
                        fontWeight: ds
                    })
                },
                o.renderPrice = function(e) {
                    var t = e.rowData;
                    return cs(rs, {
                        fill: t,
                        fontSize: ps,
                        fontWeight: ds
                    })
                },
                o.renderFee = function(e) {
                    var t = e.rowData;
                    return cs(ns, {
                        fill: t,
                        precision: fs,
                        fontSize: ps,
                        fontWeight: ds
                    })
                },
                o.renderTime = function(e) {
                    var t = e.rowData;
                    return cs(ls, {
                        fill: t,
                        fontSize: ps
                    })
                },
                ss(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, f.a.Component),
            us(t, [{
                key: "componentDidMount",
                value: function() {
                    this.props.fillsStore.fetch()
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this.props.fillsStore,
                    t = m.a.product;
                    return cs(Z.z, {},
                    void 0, cs(Z.m, {
                        store: e,
                        noRowsMessage: "No fills to show",
                        headerIntent: "base",
                        backgroundIntent: "base",
                        rowHeight: 25
                    },
                    void 0, cs(Z.c, {
                        label: "Side",
                        dataKey: "side",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderSide
                    }), cs(Z.c, {
                        label: "Size (" + t.base.id + ")",
                        dataKey: "size",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderSize
                    }), cs(Z.c, {
                        label: "Price (" + t.quote.id + ")",
                        dataKey: "price",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderPrice
                    }), cs(Z.c, {
                        label: "Fee (" + t.quote.id + ")",
                        dataKey: "fee",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderFee
                    }), cs(Z.c, {
                        label: "Time",
                        dataKey: "created_at",
                        width: 240,
                        flexGrow: 1,
                        cellRenderer: this.renderTime
                    })))
                }
            }]),
            t
        } (),
        bs = Object(K.b)("fillsStore")(Object(K.c)(hs)),
        ys = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        vs = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function ms(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var gs = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = ms(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.state = {
                    tab: "orders"
                },
                o.setTab = function(e) {
                    Object(p.d)("my_orders_" + ("orders" === e ? "open": e) + "_clicked"),
                    o.setState({
                        tab: e
                    })
                },
                o.setTabOrders = function() {
                    return o.setTab("orders")
                },
                o.setTabFills = function() {
                    return o.setTab("fills")
                },
                ms(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            vs(t, [{
                key: "render",
                value: function() {
                    return ys(Mt, {
                        title: this.title
                    },
                    void 0, this.tab)
                }
            },
            {
                key: "title",
                get: function() {
                    var e = this.state.tab,
                    t = this.props.ordersStore;
                    return ys(V.d, {
                        auto: !0,
                        align: "center"
                    },
                    void 0, ys(V.d, {
                        auto: !0
                    },
                    void 0, "orders" === e ? "Open Orders": "Fills"), "orders" === e && t.hasOpenOrders ? ys(Os, {
                        compact: !0,
                        onClick: t.cancelOpenOrders
                    },
                    void 0, "CANCEL OPEN ORDERS") : null, ys(V.d, {
                        justify: "center"
                    },
                    void 0, ys(It, {
                        onClick: this.setTabOrders,
                        active: "orders" === e
                    },
                    void 0, "Open"), ys(It, {
                        onClick: this.setTabFills,
                        active: "fills" === e
                    },
                    void 0, "Fills")))
                }
            },
            {
                key: "tab",
                get: function() {
                    var e = this.state.tab;
                    return ys("orders" === e ? Ku: bs, {})
                }
            }]),
            t
        } (),
        Os = Object(X.c)(Z.b)(["flex:0 0 auto;padding:0 10px;&:not(:last-child){margin-right:20px;}"]),
        ws = Object(K.b)("ordersStore")(Object(K.c)(gs)),
        js = Object(K.b)("ordersStore")(Object(K.c)(function(e) {
            var t = e.ordersStore,
            r = ys(V.d, {
                auto: !0,
                align: "center"
            },
            void 0, ys(V.d, {
                auto: !0
            },
            void 0, "Open Orders"), t.hasOpenOrders && ys(Os, {
                compact: !0,
                onClick: t.cancelOpenOrders
            },
            void 0, "CANCEL OPEN ORDERS"));
            return ys(Mt, {
                title: r
            },
            void 0, ys(Ku, {}))
        })),
        Ss = function() {
            return ys(Mt, {
                title: "Fills"
            },
            void 0, ys(bs, {}))
        },
        _s = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        xs = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        ks = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Ps(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Cs = {},
        Ts = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Ps(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.height = 0,
                o.width = 0,
                o.textYOffset = Math.round(y.g / 2),
                o.draw = function(e, t, r, n, i) {
                    var a = o.props.tradeHistoryStore,
                    l = a.newTrades,
                    c = a.nodes,
                    u = a.clearNewTrades;
                    if (!i) throw new b.b("buffer ctx is required");
                    var s = Object(Co.getPixelRatio)(),
                    f = Math.round(t * s),
                    p = Math.round(r * s);
                    o.ctx = e,
                    o.width = t,
                    o.height = r,
                    l && (o.ctx.globalAlpha = 1, e.clearRect(0, 0, t, r), e.imageSmoothingEnabled = !1, o.ctx.drawImage(i.canvas, 0, 0, f, p, 0, l * y.g, o.width, o.height));
                    for (var d = 0,
                    h = c.length; d < h; d++) {
                        var v = c[d];
                        if (!v.render) break;
                        v.y = d * y.g,
                        v.dt >= v.animation_time && (v.dt = v.animation_time, v.render = !1),
                        o.ctx.clearRect(0, y.g * d, o.width, y.g),
                        o.renderBG(v),
                        o.ctx.globalAlpha = v.dt < 100 ? v.dt / 100 : 1,
                        o.setTextStyles(!0),
                        o.renderBar(v),
                        o.renderSize(v),
                        o.renderPrice(v),
                        o.setTextStyles(!1),
                        o.renderTime(v),
                        v.dt += n
                    }
                    i.clearRect(0, 0, i.canvas.width, i.canvas.height),
                    i.imageSmoothingEnabled = !1,
                    i.drawImage(e.canvas, 0, 0, f, p, 0, 0, f, p),
                    u()
                },
                Ps(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            ks(t, [{
                key: "setTextStyles",
                value: function(e) {
                    var t = this.ctx,
                    r = this.styles;
                    t && (t.font = (e ? "500": "normal") + " " + r.fontSize + "px " + r.fontFamily, t.textAlign = r.textAlign, t.textBaseline = r.textBaseline)
                }
            },
            {
                key: "renderBG",
                value: function(e) {
                    var t = this.styles,
                    r = e.dt,
                    o = e.animation_time,
                    n = e.y,
                    i = e.trade.side;
                    if (! (r >= o)) {
                        var a = r / o,
                        l = "sell" === i ? t.buyBgColor1: t.sellBgColor1,
                        c = "sell" === i ? t.buyBgColor2: t.sellBgColor2;
                        a >= .6 && (l = c, c = "rgba(0,0,0,0)"),
                        this.ctx.fillStyle = Object(Go.c)(a, l, c),
                        this.ctx.fillRect(0, n, this.width, y.g)
                    }
                }
            },
            {
                key: "renderBar",
                value: function(e) {
                    var t = this.styles,
                    r = m.a.product.maxBarSize,
                    o = e.trade,
                    n = o.side,
                    i = o.size,
                    a = e.y;
                    this.ctx.fillStyle = "sell" === n ? t.buyBarColor: t.sellBarColor;
                    var l = +t.barColumnX / 100 * this.width * (Math.min(r, +i) / r);
                    this.ctx.fillRect(0, a, Math.max(l, y.a), y.g)
                }
            },
            {
                key: "renderSize",
                value: function(e) {
                    var t = this.styles,
                    r = e.trade.size,
                    o = e.y,
                    n = this.width * t.sizeColumnX / 100 - t.sizeColumnPadding,
                    i = [t.sizeColor, t.sizeColor, t.dimColor],
                    a = Object(Yo.g)(r, {
                        formattedValue: Number(r).toFixed(4)
                    });
                    this._renderMulticolorText(a, i, n, o + this.textYOffset, !0)
                }
            },
            {
                key: "renderPrice",
                value: function(e) {
                    var t = this.styles,
                    r = m.a.product,
                    o = e.trade,
                    n = o.side,
                    i = o.price,
                    a = e.y,
                    l = Object(Yo.g)( + i, {
                        formattedValue: W()(i).toFixed(r.price_precision)
                    }),
                    c = [t.sellPriceColor1, t.sellPriceColor2];
                    "sell" === n && (c = [t.buyPriceColor1, t.buyPriceColor2]);
                    var u = this.width * +t.priceColumnX / 100 - +t.priceColumnPadding,
                    s = "buy" === n ? this.arrowDownImg: this.arrowUpImg;
                    s && (this.ctx.drawImage(s, u, Math.round(a + (y.g - 8) / 2), 8, 8), this._renderMulticolorText(l, c, u - 3, a + this.textYOffset, !0))
                }
            },
            {
                key: "renderTime",
                value: function(e) {
                    var t = this.styles,
                    r = e.trade.time,
                    o = e.y,
                    n = Ie.a.utc(r).local().format("H:mm:ss"),
                    i = this.width - +t.timeColumnPadding;
                    this.ctx.fillStyle = t.timeColor,
                    this.ctx.fillText(n, Math.round(i), Math.round(o + this.textYOffset))
                }
            },
            {
                key: "_renderMulticolorText",
                value: function(e, t, r, o, n) {
                    for (var i = 0,
                    a = e.length === t.length ? e: e.slice(0, t.length - 1).concat(e.slice(t.length - 1).join("")), l = this.ctx, c = 0, u = a.length; c < u; c++) {
                        var s = n ? u - c - 1 : c,
                        f = a[s];
                        f && (l.fillStyle = t[s], l.fillText(f, Math.round(r - i), Math.round(o)), i += this._measureText(f))
                    }
                }
            },
            {
                key: "_measureText",
                value: function(e) {
                    for (var t = 0,
                    r = 0,
                    o = e.length; r < o; r++) {
                        var n = e[r],
                        i = Cs[n];
                        i || (i = this.ctx.measureText(n).width, Cs[n] = i),
                        t += i
                    }
                    return t
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this,
                    t = this.props,
                    r = (t.tradeHistoryStore,
                    function(e, t) {
                        var r = {};
                        for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                        return r
                    } (t, ["tradeHistoryStore"]));
                    return xs(Lo, {},
                    void 0, s.createElement($o, _s({},
                    r, {
                        fps: Q.b.fps,
                        buffer: !0,
                        draw: this.draw
                    })), xs(Ho, {
                        component: xs(Le.c, {}),
                        onLoad: function(t) {
                            return e.arrowUpImg = t
                        }
                    }), xs(Ho, {
                        component: xs(Le.b, {}),
                        onLoad: function(t) {
                            return e.arrowDownImg = t
                        }
                    }))
                }
            },
            {
                key: "styles",
                get: function() {
                    var e = Q.f.theme,
                    t = e.colors,
                    r = t.text,
                    o = t.chartBuy,
                    n = t.chartSell;
                    return {
                        fontFamily: e.fonts.family.mono,
                        fontSize: 10,
                        fontWeight: "normal",
                        textAlign: "right",
                        textBaseline: "middle",
                        barColumnX: 5,
                        sizeColumnX: 32,
                        priceColumnX: 66,
                        sizeColumnPadding: 8,
                        priceColumnPadding: 18,
                        timeColumnPadding: 18,
                        sizeColor: Object(Go.e)(.2, r.
                    default),
                        dimColor: Object(Go.e)(.8, r.
                    default),
                        timeColor: Object(Go.e)(.6, r.
                    default),
                        sellBarColor: Object(Go.e)(.55, n.
                    default),
                        sellPriceColor1: Object(Go.e)(.4, n.
                    default),
                        sellPriceColor2: Object(Go.e)(0, n.
                    default),
                        sellBgColor1: Object(Go.e)(.95, n.
                    default),
                        sellBgColor2: Object(Go.e)(.8, n.
                    default),
                        buyBarColor: Object(Go.e)(.55, o.
                    default),
                        buyPriceColor1: Object(Go.e)(.4, o.
                    default),
                        buyPriceColor2: Object(Go.e)(0, o.
                    default),
                        buyBgColor1: Object(Go.e)(.95, o.
                    default),
                        buyBgColor2: Object(Go.e)(.8, o.
                    default)
                    }
                }
            }]),
            t
        } (),
        As = Object(K.b)("tradeHistoryStore")(Object(K.c)(Ts)),
        Es = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        zs = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Rs(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Ms = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Rs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.onSize = function() {
                    o.props.tradeHistoryStore.renderAll()
                },
                Rs(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            zs(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = this.props.tradeHistoryStore;
                    this.disposer = Object(g.observe)(Q.f, "fontsLoaded",
                    function() {
                        e.renderAll()
                    }),
                    this.disposer = Object(g.observe)(Q.f, "theme",
                    function() {
                        e.renderAll()
                    })
                }
            },
            {
                key: "componentWillUnmount",
                value: function() {
                    this.disposer && this.disposer()
                }
            },
            {
                key: "render",
                value: function() {
                    return Es(Ds, {},
                    void 0, Es(Io, {
                        onSize: this.onSize
                    },
                    void 0, Es(As, {})))
                }
            }]),
            t
        } (),
        Ds = X.c.div(["display:flex;flex:1;min-height:", "px;overflow:hidden;"], y.g * y.i),
        Bs = Object(K.b)("tradeHistoryStore")(Object(K.c)(Ms)),
        Fs = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Is = Object(X.c)(V.d)(["flex:1;flex-direction:column;overflow:hidden;"]),
        Ls = Object(K.b)("tradeHistoryStore")(Object(K.c)(function(e) {
            var t = e.tradeHistoryStore,
            r = e.contentOnly,
            o = t.loading,
            n = m.a.product;
            if (!n) return null;
            var i = Fs(Is, {},
            void 0, Fs(jt, {},
            void 0, Fs(xt, {
                basis: 34,
                padding: 8
            },
            void 0, "Trade Size"), Fs(xt, {
                basis: 34,
                padding: 12
            },
            void 0, "Price (", n.quote.id, ")"), Fs(xt, {
                basis: 32,
                padding: 18
            },
            void 0, "Time")), o ? Fs(V.d, {
                center: !0,
                auto: !0
            },
            void 0, Fs(Le.C, {})) : Fs(Z.z, {},
            void 0, Fs(Bs, {})));
            return r ? i: Fs(Mt, {
                title: "Trade History"
            },
            void 0, i)
        })),
        $s = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Ws = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function qs(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var Us, Ns, Hs, Gs, Ys = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = qs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.tradeHistoryStore = new y.m,
                qs(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["PureComponent"]),
            Ws(t, [{
                key: "render",
                value: function() {
                    var e = this.props.contentOnly;
                    return $s(h.b, {
                        tradeHistoryStore: this.tradeHistoryStore
                    },
                    void 0, $s(Ls, {
                        contentOnly: e
                    }))
                }
            }]),
            t
        } (),
        Ks = Object.assign ||
        function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = arguments[t];
                for (var o in r) Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o])
            }
            return e
        },
        Xs = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        Vs = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Js(e, t, r, o) {
            r && Object.defineProperty(e, t, {
                enumerable: r.enumerable,
                configurable: r.configurable,
                writable: r.writable,
                value: r.initializer ? r.initializer.call(o) : void 0
            })
        }
        function Qs(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        function Zs(e, t, r, o, n) {
            var i = {};
            return Object.keys(o).forEach(function(e) {
                i[e] = o[e]
            }),
            i.enumerable = !!i.enumerable,
            i.configurable = !!i.configurable,
            ("value" in i || i.initializer) && (i.writable = !0),
            i = r.slice().reverse().reduce(function(r, o) {
                return o(e, t, r) || r
            },
            i),
            n && void 0 !== i.initializer && (i.value = i.initializer ? i.initializer.call(n) : void 0, i.initializer = void 0),
            void 0 === i.initializer && (Object.defineProperty(e, t, i), i = null),
            i
        }
        var ef = Object(K.c)((Ns = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Qs(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                Js(o, "tab", Hs, o),
                Js(o, "setTab", Gs, o),
                o.setTabOrderBook = function() {
                    return o.setTab("orderbook")
                },
                o.setTabOrderForm = function() {
                    return o.setTab("orderForm")
                },
                o.setTabCharts = function() {
                    return o.setTab("charts")
                },
                o.setTabOrders = function() {
                    return o.setTab("orders")
                },
                o.setTabHistory = function() {
                    return o.setTab("history")
                },
                Qs(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            Vs(t, [{
                key: "render",
                value: function() {
                    var e = this.tab;
                    return Xs(V.d, {
                        auto: !0,
                        column: !0
                    },
                    void 0, "orderbook" === e && Xs(Gi, {}), "charts" === e && Xs(gu, {}), "orders" === e && Xs(ws, {}), "history" === e && Xs(Ys, {}), "orderForm" === e && Xs(Po, {}), Xs(rf, {},
                    void 0, Xs(tf, {
                        title: "TRADE",
                        active: "orderForm" === e,
                        onClick: this.setTabOrderForm
                    }), Xs(tf, {
                        title: "BOOK",
                        active: "orderbook" === e,
                        onClick: this.setTabOrderBook
                    }), Xs(tf, {
                        title: "CHARTS",
                        active: "charts" === e,
                        onClick: this.setTabCharts
                    }), Xs(tf, {
                        title: "ORDERS",
                        active: "orders" === e,
                        onClick: this.setTabOrders
                    }), Xs(tf, {
                        title: "HISTORY",
                        active: "history" === e,
                        onClick: this.setTabHistory
                    })))
                }
            }]),
            t
        } (), Hs = Zs(Ns.prototype, "tab", [g.observable], {
            enumerable: !0,
            initializer: function() {
                return "orderForm"
            }
        }), Gs = Zs(Ns.prototype, "setTab", [g.action], {
            enumerable: !0,
            initializer: function() {
                var e = this;
                return function(t) {
                    e.tab = t
                }
            }
        }), Us = Ns)) || Us,
        tf = function(e) {
            var t = e.title,
            r = e.active,
            o = function(e, t) {
                var r = {};
                for (var o in e) t.indexOf(o) >= 0 || Object.prototype.hasOwnProperty.call(e, o) && (r[o] = e[o]);
                return r
            } (e, ["title", "active"]);
            return s.createElement(of, Ks({
                active: r
            },
            o), t, r && Xs(nf, {}))
        },
        rf = Object(X.c)(V.d)(["flex-shrink:0;height:40px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["border-top:1px solid ", ";"], t.colors.divider.
        default)
        }),
        of = Object(X.c)(V.d)(["position:relative;flex:1 0 auto;justify-content:center;align-items:center;font-weight:bold;cursor:pointer;", ";"],
        function(e) {
            var t = e.theme,
            r = e.active;
            return Object(X.b)(["border-left:1px solid ", ";font-size:", ";color:", ";background:", ";&:first-child{border-left:none;}&:hover{color:", ";background:", ";}"], t.colors.divider.
        default, t.fonts.size.smaller, r ? t.colors.text.
        default:
            t.colors.text.weak, t.colors.base.
        default, t.colors.text.
        default, t.colors.accent.
        default)
        }),
        nf = X.c.span(["position:absolute;right:0;bottom:0;left:0;height:2px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["background:", ";"], t.colors.primary.
        default)
        }),
        af = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        lf = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function cf(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var uf, sf = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = cf(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.state = {
                    tab: "orderbook"
                },
                o.setTab = function(e) {
                    o.setState({
                        tab: e
                    })
                },
                o.setTabOrderBook = function() {
                    return o.setTab("orderbook")
                },
                o.setTabTradeHistory = function() {
                    return o.setTab("trade-history")
                },
                cf(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            lf(t, [{
                key: "render",
                value: function() {
                    return af(Mt, {
                        title: this.title
                    },
                    void 0, this.tab)
                }
            },
            {
                key: "title",
                get: function() {
                    var e = this.state.tab;
                    return af(V.d, {
                        auto: !0
                    },
                    void 0, af(V.d, {
                        auto: !0
                    },
                    void 0, "orderbook" === e ? "Order Book": "Trade History"), af(V.d, {
                        justify: "center"
                    },
                    void 0, af(It, {
                        onClick: this.setTabOrderBook,
                        active: "orderbook" === e
                    },
                    void 0, "Order Book"), af(It, {
                        onClick: this.setTabTradeHistory,
                        active: "trade-history" === e
                    },
                    void 0, "Trade History")))
                }
            },
            {
                key: "tab",
                get: function() {
                    var e = this.state.tab;
                    return af("orderbook" === e ? Gi: Ys, {
                        contentOnly: !0
                    })
                }
            }]),
            t
        } (),
        ff = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } (),
        pf = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        var df, hf = Object(K.c)(uf = function(e) {
            function t() {
                return function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t),
                function(e, t) {
                    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                    return ! t || "object" != typeof t && "function" != typeof t ? e: t
                } (this, (t.__proto__ || Object.getPrototypeOf(t)).apply(this, arguments))
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            pf(t, [{
                key: "render",
                value: function() {
                    return ff(bf, {},
                    void 0, ff(Be, {}), ff(yf, {
                        layouts: this.layouts,
                        fallbacks: this.fallbacks
                    },
                    void 0, ff(ef, {},
                    "mobile"), ff(Po, {},
                    "sidebar"), ff(Gi, {},
                    "order-book"), ff(sf, {},
                    "order-book-tabbed"), ff(mu, {},
                    "chart"), ff(gu, {},
                    "chart-tabbed"), ff(ws, {},
                    "trading"), ff(js, {},
                    "orders"), ff(Ss, {},
                    "fills"), ff(Ys, {},
                    "trade-history")), ff(vt, {}))
                }
            },
            {
                key: "layouts",
                get: function() {
                    var e = Number(this.props.theme.spacing.subSidebarWidth) - 1 + "px";
                    return [{
                        width: 0,
                        height: 0,
                        columns: "1fr",
                        rows: "1fr",
                        areas: ["mobile"]
                    },
                    {
                        width: 600,
                        height: 0,
                        columns: e + " 1fr",
                        rows: "1fr 280px",
                        areas: ["sidebar chart-tabbed", "sidebar trading"]
                    },
                    {
                        width: 900,
                        height: 0,
                        columns: e + " 1fr 1fr",
                        rows: "1fr 280px",
                        areas: ["sidebar order-book-tabbed chart-tabbed", "sidebar trading trading"]
                    },
                    {
                        width: 1200,
                        height: 0,
                        columns: e + " 313px 1fr",
                        rows: "1fr 280px",
                        areas: ["sidebar order-book-tabbed chart-tabbed", "sidebar order-book-tabbed trading"]
                    },
                    {
                        width: 1580,
                        height: 0,
                        columns: e + " 313px 1fr 285px",
                        rows: "1fr 1fr 280px",
                        areas: ["sidebar order-book chart-tabbed trade-history", "sidebar order-book chart-tabbed trade-history", "sidebar order-book trading trade-history"]
                    },
                    {
                        width: 1580,
                        height: 875,
                        columns: e + " 313px 1fr 285px",
                        rows: "1fr 1fr 1fr",
                        areas: ["sidebar order-book chart trade-history", "sidebar order-book chart trade-history", "sidebar order-book trading trade-history"]
                    },
                    {
                        width: 1580,
                        height: 1200,
                        columns: e + " 313px 1fr 285px",
                        rows: "1fr 1fr 1fr",
                        areas: ["sidebar order-book chart trade-history", "sidebar order-book chart trade-history", "sidebar order-book trading trade-history"]
                    },
                    {
                        width: 2e3,
                        height: 0,
                        columns: e + " 313px 3fr 2fr 285px",
                        rows: "1fr 1fr 280px",
                        areas: ["sidebar order-book chart-tabbed chart-tabbed trade-history", "sidebar order-book chart-tabbed chart-tabbed trade-history", "sidebar order-book orders fills trade-history"]
                    },
                    {
                        width: 2e3,
                        height: 875,
                        columns: e + " 313px 3fr 2fr 285px",
                        rows: "1fr 1fr 280px",
                        areas: ["sidebar order-book chart chart trade-history", "sidebar order-book chart chart trade-history", "sidebar order-book orders fills trade-history"]
                    },
                    {
                        width: 2e3,
                        height: 1200,
                        columns: e + " 313px 3fr 2fr 285px",
                        rows: "1fr 1fr 1fr",
                        areas: ["sidebar order-book chart chart trade-history", "sidebar order-book chart chart trade-history", "sidebar order-book orders fills trade-history"]
                    }]
                }
            },
            {
                key: "fallbacks",
                get: function() {
                    return [{
                        width: 0,
                        height: 0,
                        layout: ff(ef, {})
                    },
                    {
                        width: 600,
                        height: 0,
                        layout: ff(V.d, {
                            auto: !0
                        },
                        void 0, ff(Po, {}), ff(Gi, {}), ff(V.d, {
                            column: !0,
                            auto: !0
                        },
                        void 0, ff(mu, {}), ff(ws, {})), ff(Ys, {}))
                    }]
                }
            }]),
            t
        } ()) || uf,
        bf = Object(X.c)(V.d)(["flex:1;flex-direction:column;overflow:hidden;"]),
        yf = Object(X.c)(J.a)(["grid-gap:1px;", ";"],
        function(e) {
            var t = e.theme;
            return Object(X.b)(["background:", ";"], t.colors.divider.
        default)
        }),
        vf = Object(X.f)(hf),
        mf = r(1225),
        gf = r.n(mf),
        Of = r(1224),
        wf = r.n(Of),
        jf = function() {
            function e(e, t) {
                for (var r = 0; r < t.length; r++) {
                    var o = t[r];
                    o.enumerable = o.enumerable || !1,
                    o.configurable = !0,
                    "value" in o && (o.writable = !0),
                    Object.defineProperty(e, o.key, o)
                }
            }
            return function(t, r, o) {
                return r && e(t.prototype, r),
                o && e(t, o),
                t
            }
        } ();
        function Sf(e, t) {
            if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            return ! t || "object" != typeof t && "function" != typeof t ? e: t
        }
        var _f = Object(K.c)(df = function(e) {
            function t() {
                var e, r, o; !
                function(e, t) {
                    if (! (e instanceof t)) throw new TypeError("Cannot call a class as a function")
                } (this, t);
                for (var n = arguments.length,
                i = Array(n), a = 0; a < n; a++) i[a] = arguments[a];
                return r = o = Sf(this, (e = t.__proto__ || Object.getPrototypeOf(t)).call.apply(e, [this].concat(i))),
                o.originalTitle = document.title,
                Sf(o, r)
            }
            return function(e, t) {
                if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
                e.prototype = Object.create(t && t.prototype, {
                    constructor: {
                        value: e,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }),
                t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
            } (t, s["Component"]),
            jf(t, [{
                key: "componentDidMount",
                value: function() {
                    var e = document.head;
                    e && (this.head = e, this.favicon = e.querySelector('link[rel="shortcut icon"]'), this.favicon && (this.originalFavicon = this.favicon && this.favicon.href)),
                    this.originalTitle = document.title
                }
            },
            {
                key: "componentWillUnmount",
                value: function() {
                    if (document.title = this.originalTitle, this.favicon && this.originalFavicon) {
                        var e = document.createElement("link");
                        e.type = "image/x-icon",
                        e.rel = "shortcut icon",
                        e.href = this.originalFavicon,
                        this.head.removeChild(this.favicon),
                        this.head.appendChild(e)
                    }
                }
            },
            {
                key: "render",
                value: function() {
                    var e = this,
                    t = m.a.product,
                    r = "mobile" === Q.b.size;
                    if (!t) return null;
                    var o = (y.u.stats.get(t.id) || {}).last;
                    if (!o) return null;
                    if (document.title = "" + t.quote.symbol + o.toFixed(t.price_precision) + " Â· " + t.base.id + " to " + t.quote.id + " " + this.originalTitle, r) return null;
                    var n = y.u.priceChange(t.id);
                    if (!n) return null;
                    var i = n.gt(0);
                    if (this.positiveChange === i) return null;
                    var a = document.createElement("link");
                    return a.type = "image/x-icon",
                    a.href = n.gt(0) ? gf.a: wf.a,
                    a.rel = "shortcut icon",
                    this.head && this.favicon ? (this.head.removeChild(this.favicon), this.favicon = a, this.head.querySelectorAll('link[rel="icon"]').forEach(function(t) {
                        return e.head.removeChild(t)
                    }), this.head.appendChild(this.favicon), this.positiveChange = i, null) : null
                }
            }]),
            t
        } ()) || df,
        xf = function() {
            var e = "function" == typeof Symbol && Symbol.
            for && Symbol.
            for ("react.element") || 60103;
            return function(t, r, o, n) {
                var i = t && t.defaultProps,
                a = arguments.length - 3;
                if (r || 0 === a || (r = {}), r && i) for (var l in i) void 0 === r[l] && (r[l] = i[l]);
                else r || (r = i || {});
                if (1 === a) r.children = n;
                else if (a > 1) {
                    for (var c = Array(a), u = 0; u < a; u++) c[u] = arguments[u + 3];
                    r.children = c
                }
                return {
                    $$typeof: e,
                    type: t,
                    key: void 0 === o ? null: "" + o,
                    ref: null,
                    props: r,
                    _owner: null
                }
            }
        } ();
        function kf(e) {
            return function() {
                var t = e.apply(this, arguments);
                return new Promise(function(e, r) {
                    return function o(n, i) {
                        try {
                            var a = t[n](i),
                            l = a.value
                        } catch(e) {
                            return void r(e)
                        }
                        if (!a.done) return Promise.resolve(l).then(function(e) {
                            o("next", e)
                        },
                        function(e) {
                            o("throw", e)
                        });
                        e(l)
                    } ("next")
                })
            }
        }
        t.
    default = kf(regeneratorRuntime.mark(function e() {
            var t, r, o, n, i = (t = kf(regeneratorRuntime.mark(function e() {
                var t, r, o;
                return regeneratorRuntime.wrap(function(e) {
                    for (;;) switch (e.prev = e.next) {
                    case 0:
                        return e.next = 2,
                        y.y.loader;
                    case 2:
                        return t = e.sent,
                        e.next = 5,
                        y.r.loader;
                    case 5:
                        if (!t) {
                            e.next = 23;
                            break
                        }
                        return e.next = 8,
                        y.w.fetch();
                    case 8:
                        if (r = e.sent, o = r.find(function(e) {
                            return "default" === e.name
                        })) {
                            e.next = 12;
                            break
                        }
                        throw new b.e("No default profile");
                    case 12:
                        return m.a.setProfile(o),
                        e.prev = 13,
                        e.next = 16,
                        v.a.refresh();
                    case 16:
                        e.next = 21;
                        break;
                    case 18:
                        e.prev = 18,
                        e.t0 = e.
                        catch(13),
                        Object(d.b)(e.t0, "unable to refresh accounts");
                    case 21:
                        return e.next = 23,
                        y.o.loader;
                    case 23:
                    case "end":
                        return e.stop()
                    }
                },
                e, this, [[13, 18]])
            })),
            function() {
                return t.apply(this, arguments)
            });
            return regeneratorRuntime.wrap(function(e) {
                for (;;) switch (e.prev = e.next) {
                case 0:
                    return Object(d.c)({
                        category:
                        "General",
                        action: "Trade page view"
                    }),
                    Object(p.d)("trade_page_viewed"),
                    e.next = 4,
                    Promise.all([i(), y.v.loader]);
                case 4:
                    return r = new y.f,
                    o = new y.l({
                        sort: "smart"
                    }),
                    n = new Y({
                        ordersStore: o
                    }),
                    e.abrupt("return", xf(h.b, {
                        profilesStore: y.w,
                        appStore: m.a,
                        orderFormStore: n,
                        accountBalanceStore: F,
                        accountsStore: y.o,
                        ordersStore: o,
                        fillsStore: r,
                        productsStatsStore: y.u,
                        currencyConverterStore: I.a,
                        feesStore: y.r
                    },
                    void 0, xf(p.b, {
                        name: "trade"
                    },
                    void 0, xf(_f, {}), xf(L.a, {
                        path: "/trade",
                        component: vf
                    }))));
                case 8:
                case "end":
                    return e.stop()
                }
            },
            e, void 0)
        }))
    }
}]);