webpackJsonp([2],{1013:function(e,t,n){function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c,u,i,s,f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),d=n(0),m=a(d),p=n(6),h=n(1731),E=a(h),b=n(1732),y=a(b),v=(c=(0,p.inject)("commonStore"))(u=(0,p.observer)(u=function(e){function t(){return l(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),f(t,[{key:"componentWillMount",value:function(){this.props.commonStore.getAllCoinPoint()}},{key:"render",value:function(){return this.props.commonStore.productDataReady?m.default.createElement(g,this.props):m.default.createElement("div",{className:"home-wrapper"},m.default.createElement("div",{className:"mini-loading"}))}}]),t}(d.Component))||u)||u,g=(i=(0,p.inject)("accountStore"))(s=(0,p.observer)(s=function(e){function t(){return l(this,t),r(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),f(t,[{key:"componentDidMount",value:function(){this.props.accountStore.getUserCoinAccount()}},{key:"render",value:function(){return m.default.createElement("div",{className:"account-wrapper"},m.default.createElement("div",{className:"account-hd"},m.default.createElement(y.default,null)),m.default.createElement("div",{className:"account-bd"},m.default.createElement(E.default,null)))}}]),t}(d.Component))||s)||s;t.default=v},1731:function(e,t,n){function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c,u,i,s,f=n(195),d=a(f),m=n(68),p=a(m),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(196),n(43);var E=n(0),b=a(E),y=n(6),v=n(9),g=p.default.Search,N=(c=(0,y.inject)("accountStore"))(u=(0,y.observer)(u=function(e){function t(){var e,n,a,o;l(this,t);for(var c=arguments.length,u=Array(c),i=0;i<c;i++)u[i]=arguments[i];return n=a=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),a.handleSearch=function(e){var t=e.target.value.trim();a.timer&&clearTimeout(a.timer),a.timer=setTimeout(function(){a.props.accountStore.filterByName(t)},100)},a.onChangeCheckBox=function(e){var t=1==e.target.checked;a.props.accountStore.filterZeroAmount(t)},o=n,r(a,o)}return o(t,e),h(t,[{key:"componentWillUnmount",value:function(){this.timer&&clearTimeout(this.timer)}},{key:"render",value:function(){var e=this.props.accountStore,t=void 0;return t=e.isFetching||0!=e.coinList.length?b.default.createElement(w,null):b.default.createElement("div",{className:"mini-tip"},UPEX.lang.template("暂无数据")),b.default.createElement("div",{className:"account-list"},b.default.createElement("div",{className:"account-filter-box"},b.default.createElement("div",{className:"filter-radio"},b.default.createElement(d.default,{onChange:this.onChangeCheckBox},UPEX.lang.template("隐藏资产为０的货币"))),b.default.createElement("div",{className:"filter-input"},b.default.createElement(g,{onChange:this.handleSearch,placeholder:UPEX.lang.template("搜索数字币")}))),b.default.createElement("div",{className:"account-result-list"},b.default.createElement("div",{className:"table-hd"},b.default.createElement("ul",null,b.default.createElement("li",null,b.default.createElement("dl",null,b.default.createElement("dd",{className:"name"},UPEX.lang.template("币种")),b.default.createElement("dd",{className:"total"},UPEX.lang.template("总额")),b.default.createElement("dd",{className:"balance"},UPEX.lang.template("可用余额")),b.default.createElement("dd",{className:"freeze"},UPEX.lang.template("委托冻结")),b.default.createElement("dd",{className:"value"},UPEX.lang.template("价值"),"(",UPEX.config.baseCurrencyEn,")"),b.default.createElement("dd",{className:"actions"},UPEX.lang.template("操作")))))),b.default.createElement("div",{className:"table-bd"},t,e.isFetching?b.default.createElement("div",{className:"mini-loading"}):null)))}}]),t}(E.Component))||u)||u,w=(i=(0,y.inject)("accountStore","userInfoStore"))(s=(0,y.observer)(s=function(e){function t(){var e,n,a,o;l(this,t);for(var c=arguments.length,u=Array(c),i=0;i<c;i++)u[i]=arguments[i];return n=a=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),a.handleCoinRecharge=function(e,t){v.browserHistory.push("/account/coin/recharge/"+e.currencyNameEn)},a.handleCoinWithdraw=function(e,t){v.browserHistory.push("/account/coin/withdraw/"+e.currencyNameEn)},a.handleCoinTrade=function(e,t){v.browserHistory.push("/webtrade/TWD_"+e.currencyNameEn)},o=n,r(a,o)}return o(t,e),h(t,[{key:"ValToFixed",value:function(e){var t=parseFloat(e);if(isNaN(t)||0===t)return"0.00";var n=t.toString();if(-1===n.indexOf("."))return n+".00";switch(n.length-n.indexOf(".")){case 3:return n;case 2:return n+"0";default:return n.substring(0,n.indexOf(".")+3)}}},{key:"render",value:function(){var e=this;return b.default.createElement("ul",null,this.props.accountStore.coinList.map(function(t,n){return b.default.createElement("li",{key:n},b.default.createElement("dl",null,b.default.createElement("dd",{className:"name"},b.default.createElement("img",{src:""+t.icoUrl,alt:""}),t.currencyNameEn),b.default.createElement("dd",{className:"total"},t.amount),b.default.createElement("dd",{className:"balance"},t.cashAmount),b.default.createElement("dd",{className:"freeze"},t.freezeAmount),b.default.createElement("dd",{className:"value"},e.ValToFixed(t.twd_value)),b.default.createElement("dd",{className:"actions"},b.default.createElement("button",{onClick:e.handleCoinRecharge.bind(e,t)},UPEX.lang.template("充币")),b.default.createElement("span",{className:"split"},"|"),b.default.createElement("button",{onClick:e.handleCoinWithdraw.bind(e,t)},UPEX.lang.template("提币")),b.default.createElement("span",{className:"split"},"|"),b.default.createElement("button",{onClick:e.handleCoinTrade.bind(e,t)},UPEX.lang.template("交易")))))}))}}]),t}(E.Component))||s)||s;t.default=N},1732:function(e,t,n){function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var c,u,i=n(24),s=a(i),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(26);var d=n(0),m=a(d),p=n(6),h=n(9),E=(s.default.Option,(c=(0,p.inject)("accountStore"))(u=(0,p.observer)(u=function(e){function t(){var e,n,a,o;l(this,t);for(var c=arguments.length,u=Array(c),i=0;i<c;i++)u[i]=arguments[i];return n=a=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),a.handleAllMoney=function(e){a.props.accountStore.handleVisibleMoney()},a.handleFiatRecharge=function(e){h.browserHistory.push("/account/balance/recharge")},a.handleFiatWidthdraw=function(e){h.browserHistory.push("/account/balance/withdraw")},a.handleCoinRecord=function(e){h.browserHistory.push("/account/coinrecord")},a.handleFiatRecord=function(e){h.browserHistory.push("/account/fiatrecord")},o=n,r(a,o)}return o(t,e),f(t,[{key:"render",value:function(){var e=this.props.accountStore;return m.default.createElement("div",{className:"account-hd-box"},m.default.createElement("div",{className:"account-title"},m.default.createElement("h2",null,UPEX.lang.template("我的资产")),m.default.createElement("div",{className:"account-count"},m.default.createElement("label",null,UPEX.lang.template("总资产折合")),m.default.createElement("label",null,UPEX.config.baseCurrencyEn),m.default.createElement("label",null,"≈"),m.default.createElement("em",null,"NT$"+(e.allMoney||"--")))),m.default.createElement("div",{className:"account-content clearfix"},m.default.createElement("div",{className:"account-amount"},m.default.createElement("div",{className:"amount-hd"},m.default.createElement("label",null,UPEX.lang.template("可用余额")," "),m.default.createElement("span",{className:"switch",onClick:this.handleAllMoney},e.visibleMoney?UPEX.lang.template("隐藏金额"):UPEX.lang.template("显示金额"))),m.default.createElement("div",{className:"amount-bd clearfix"},m.default.createElement("div",{className:"amount"},m.default.createElement("em",null,m.default.createElement("span",{className:"unit"},"NT$"),e.visibleMoney?""+(e.baseCoinInfo.cashAmount||0):"******"," ")),m.default.createElement("div",{className:"actions"},m.default.createElement("button",{className:"btn recharge-btn",onClick:this.handleFiatRecharge},UPEX.lang.template("充值")),m.default.createElement("button",{className:"btn withdraw-btn",onClick:this.handleFiatWidthdraw},UPEX.lang.template("提现")))),m.default.createElement("ul",{className:"amount-ft clearfix"},m.default.createElement("li",null,m.default.createElement("label",null,UPEX.lang.template("冻结资金")),m.default.createElement("em",null,"NT$ ",e.visibleMoney?""+(e.baseCoinInfo.freezeAmount||0):"******"," ")),m.default.createElement("li",null,m.default.createElement("label",null,UPEX.lang.template("资金总额")),m.default.createElement("em",null,"NT$ ",e.visibleMoney?""+(e.baseCoinInfo.amount||0):"******"," ")))),m.default.createElement("div",{className:"account-record"},m.default.createElement("button",{className:"btn",onClick:this.handleCoinRecord},m.default.createElement("i",null),m.default.createElement("span",null,UPEX.lang.template("数位资产记录"))),m.default.createElement("button",{className:"btn",onClick:this.handleFiatRecord},m.default.createElement("i",null),m.default.createElement("span",null,UPEX.lang.template("法币资金记录"))))))}}]),t}(d.Component))||u)||u);t.default=E}});
//# sourceMappingURL=assets.e93f4.chunk.js.map