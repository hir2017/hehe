webpackJsonp([1],{1005:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(){}function l(){return window}Object.defineProperty(t,"__esModule",{value:!0});var o=n(6),i=r(o),c=n(3),u=r(c),s=n(10),f=r(s),m=n(4),d=r(m),p=n(5),h=r(p),y=n(0),b=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(y),E=n(69),v=r(E),g=n(149),w=r(g),_=n(8),k=r(_),N=n(70),P=r(N),C=n(1006),O=r(C),j=n(397),T=r(j),S=(0,T.default)(),x=function(e,t,n,r){var a=n-t;return e/=r/2,e<1?a/2*e*e*e+t:a/2*((e-=2)*e*e+2)+t},M=function(e){function t(e){(0,u.default)(this,t);var n=(0,d.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.getCurrentScrollTop=function(){var e=n.props.target||l,t=e();return t===window?window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop:t.scrollTop},n.scrollToTop=function(e){var t=n.getCurrentScrollTop(),r=Date.now();S(function e(){var a=Date.now(),l=a-r;n.setScrollTop(x(l,t,0,450)),l<450&&S(e)}),(n.props.onClick||a)(e)},n.handleScroll=function(){var e=n.props,t=e.visibilityHeight,r=e.target,a=void 0===r?l:r,o=(0,O.default)(a(),!0);n.setState({visible:o>t})},n.state={visible:!1},n}return(0,h.default)(t,e),(0,f.default)(t,[{key:"setScrollTop",value:function(e){var t=this.props.target||l,n=t();n===window?(document.body.scrollTop=e,document.documentElement.scrollTop=e):n.scrollTop=e}},{key:"componentDidMount",value:function(){var e=this.props.target||l;this.scrollEvent=(0,w.default)(e(),"scroll",this.handleScroll),this.handleScroll()}},{key:"componentWillUnmount",value:function(){this.scrollEvent&&this.scrollEvent.remove()}},{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=void 0===t?"ant-back-top":t,r=e.className,a=void 0===r?"":r,l=e.children,o=(0,k.default)(n,a),c=b.createElement("div",{className:n+"-content"},b.createElement("div",{className:n+"-icon"})),u=(0,P.default)(this.props,["prefixCls","className","children","visibilityHeight"]),s=this.state.visible?b.createElement("div",(0,i.default)({},u,{className:o,onClick:this.scrollToTop}),l||c):null;return b.createElement(v.default,{component:"",transitionName:"fade"},s)}}]),t}(b.Component);t.default=M,M.defaultProps={visibilityHeight:400},e.exports=t.default},1006:function(e,t,n){"use strict";function r(e,t){if("undefined"==typeof window)return 0;var n=t?"pageYOffset":"pageXOffset",r=t?"scrollTop":"scrollLeft",a=e===window,l=a?e[n]:e[r];return a&&"number"!=typeof l&&(l=window.document.documentElement[r]),l}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r,e.exports=t.default},1007:function(e,t,n){"use strict";n(25),n(1008)},1008:function(e,t){},1009:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,c,u,s,f=n(393),m=r(f),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(394);var p=n(0),h=r(p),y=n(7),b=(i=(0,y.inject)("bannerStore"))(c=(0,y.observer)((s=u=function(e){function t(){var e,n,r,o;a(this,t);for(var i=arguments.length,c=Array(i),u=0;u<i;u++)c[u]=arguments[u];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.handleClickBanner=function(e,t){e.url&&window.open(e.url)},o=n,l(r,o)}return o(t,e),d(t,[{key:"componentDidMount",value:function(){this.props.bannerStore.fetch()}},{key:"render",value:function(){var e=this,t=this.props.bannerStore,n=t.list,r=!1,a=void 0;return n.length>1&&(r=!0),t.$loading||(a=h.default.createElement(m.default,{autoplay:!0,dots:r,effect:"fade"},n.map(function(t,n){return h.default.createElement("div",{className:"slider-item",key:n,onClick:e.handleClickBanner.bind(e,t)},h.default.createElement("img",{src:t.image}))}))),h.default.createElement("div",{className:"banner-wrapper"},h.default.createElement("div",{className:"slider",ref:"banner"},a),this.props.children)}}]),t}(p.Component),u.defaultProps={list:[]},c=s))||c)||c;t.default=b},1010:function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(c),s=n(7),f=n(11),m=(0,s.observer)(o=function(e){function t(){var e,n,l,o;r(this,t);for(var i=arguments.length,c=Array(i),u=0;u<i;u++)c[u]=arguments[u];return n=l=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),l.handleRegister=function(e){f.browserHistory.push("/register")},l.handleLogin=function(e){f.browserHistory.push("/login")},o=n,a(l,o)}return l(t,e),i(t,[{key:"render",value:function(){return u.default.createElement("div",{className:"loginguide-wrapper"},u.default.createElement("ul",null,u.default.createElement("li",null,u.default.createElement("label",null,UPEX.lang.template("开始你的数字货币之旅"))),u.default.createElement("li",null,u.default.createElement("button",{type:"button",className:"register-btn",onClick:this.handleRegister},UPEX.lang.template("注册"))),u.default.createElement("li",null,u.default.createElement("span",null,UPEX.lang.template("已经注册?")),u.default.createElement("button",{type:"button",className:"login-btn",onClick:this.handleLogin},UPEX.lang.template("登录")))))}}]),t}(c.Component))||o;t.default=m},1011:function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(c),s=n(7),f=(0,s.observer)(o=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),i(t,[{key:"render",value:function(){return"ace"===UPEX.config.version?u.default.createElement("div",{className:"features-wrapper"},u.default.createElement("div",{className:"features-box"},u.default.createElement("ul",{className:"clearfix"},u.default.createElement("li",null,u.default.createElement("i",{className:"icon-bank"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("用户成长体系")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("用户成长体系描述"))),u.default.createElement("li",null,u.default.createElement("i",{className:"icon-clock"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("安全优先")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("安全优先描述"))),u.default.createElement("li",null,u.default.createElement("i",{className:"icon-team"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("合法合规")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("合法合规描述"))),u.default.createElement("li",null,u.default.createElement("i",{className:"icon-coin"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("量身定制数位产品")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("量身定制数位产品描述")))),u.default.createElement("div",{className:"download-btn  hidden"},UPEX.lang.template("下载客户端")))):u.default.createElement("div",{className:"features-wrapper"},u.default.createElement("div",{className:"features-box"},u.default.createElement("ul",{className:"clearfix"},u.default.createElement("li",null,u.default.createElement("i",{className:"icon-bank"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("独家银行担保交易")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("银行担保，安全快捷"))),u.default.createElement("li",null,u.default.createElement("i",{className:"icon-clock"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("7X24小时委托交易")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("随心、省心、放大收益"))),u.default.createElement("li",null,u.default.createElement("i",{className:"icon-team"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("专业风控团队支撑")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("资金安全无忧"))),u.default.createElement("li",null,u.default.createElement("i",{className:"icon-coin"}),u.default.createElement("div",{className:"title"},UPEX.lang.template("丰富的货币交易")),u.default.createElement("div",{className:"desc"},UPEX.lang.template("持续上新，全币种买卖")))),u.default.createElement("div",{className:"download-btn  hidden"},UPEX.lang.template("下载客户端"))))}}]),t}(c.Component))||o;t.default=f},1012:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,c,u=n(393),s=r(u),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(394);var m=n(0),d=r(m),p=n(7),h=n(11),y=(i=(0,p.inject)("announcementStore"))(c=(0,p.observer)(c=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),f(t,[{key:"componentDidMount",value:function(){this.props.announcementStore.fetch(6)}},{key:"render",value:function(){var e=this.props.announcementStore;return 0==e.formatedList.length?null:d.default.createElement("div",{className:"noticelist"},d.default.createElement("div",{className:"content"},d.default.createElement(s.default,{autoplay:!0,vertical:!0,dots:!1,speed:500},e.formatedList.map(function(e,t){return d.default.createElement("ul",{className:"clearfix",key:t},e.map(function(e,t){return d.default.createElement("li",{key:e.announceId},d.default.createElement("div",{className:"info"},d.default.createElement(h.Link,{to:"/news/detail/"+e.announceId},e.title)),d.default.createElement("div",{className:"time"},e.publishTime.split(" ")[0]))}))}))))}}]),t}(m.Component))||c)||c;t.default=y},1013:function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),c=n(0),u=function(e){return e&&e.__esModule?e:{default:e}}(c),s=n(7),f=(0,s.observer)(o=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),i(t,[{key:"render",value:function(){return u.default.createElement("div",{className:"btcnews-wrapper"},u.default.createElement("h3",{className:"title"},UPEX.lang.template("币圈资讯")),u.default.createElement("div",{className:"content"},u.default.createElement("div",{className:"pic",style:{backgroundImage:"url(https://www.chaoex.com/dist/images/26758a19.png)"}}),u.default.createElement("div",{className:"list"},u.default.createElement("ul",null,u.default.createElement("li",null,u.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),u.default.createElement("li",null,u.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),u.default.createElement("li",null,u.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),u.default.createElement("li",null,u.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),u.default.createElement("li",null,u.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。"))))))}}]),t}(c.Component))||o;t.default=f},1014:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,c,u=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),f=r(s),m=n(7),d=n(1015),p=r(d),h=(i=(0,m.inject)("homeStore"))(c=(0,m.observer)(c=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),u(t,[{key:"render",value:function(){var e=this.props.homeStore.marketListStore;return f.default.createElement("div",{className:"hot-markets"},f.default.createElement("ul",null,e.hotCurrencies.map(function(e,t){var n=e.baseCurrencyNameEn+"_"+e.currencyNameEn;return f.default.createElement("li",{key:n},f.default.createElement(p.default,{data:e,pair:n}))})))}}]),t}(s.Component))||c)||c;t.default=h},1015:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,c,u,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),m=r(f),d=n(7),p=n(1016),h=r(p),y=n(11),b=n(9),E=(0,d.observer)((u=c=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleTrade=function(e){y.browserHistory.push("/webtrade/"+e.baseCurrencyNameEn+"_"+e.currencyNameEn)},n.klineChart=new h.default,n}return o(t,e),s(t,[{key:"componentDidMount",value:function(){this.get24KlineData()}},{key:"get24KlineData",value:function(){var e=this;(0,b.getTradeKline)({symbol:this.props.pair,interval:60,limit:24}).then(function(t){var n=[];200==t.status&&(t.attachment.forEach(function(e,t){var r=[];r[r.length]=e.currentTime,r[r.length]=e.current,n[n.length]=r}),e.drawKline(n))})}},{key:"drawKline",value:function(e){var t=$(this.refs.kline),n=t.width(),r=t.height();this.klineChart.setData({data:e,width:n,height:r});var a=this.klineChart.getPath(),l=this.klineChart.getFill();$(this.refs.testchart).attr("d",a),$(this.refs.testfill).attr("d",l)}},{key:"render",value:function(){var e=this.props.data,t=e.changeRate>=0?"positive":"negative";return m.default.createElement("div",{className:"recommend-item "+t,onClick:this.handleTrade.bind(this,e)},m.default.createElement("div",{className:"recommend-item-name"},e.currencyNameEn,m.default.createElement("i",null," / ",e.baseCurrencyNameEn)),m.default.createElement("div",{className:"recommend-item-price"},e.currentAmountText,m.default.createElement("i",null,e.baseCurrencyNameEn)),m.default.createElement("div",{className:"recommend-item-volume",dangerouslySetInnerHTML:{__html:UPEX.lang.template("成交额 {num}{unit}",{num:e.amountText,unit:e.baseCurrencyNameEn},1)}}),m.default.createElement("div",{className:"recommend-item-rate"},e.changeRateText),"positive"==t?m.default.createElement("div",{className:"recommend-item-kline",ref:"kline",key:"positive"},m.default.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg"},m.default.createElement("g",{transform:"translate(0.5,0.5)"},m.default.createElement("path",{ref:"testchart",stroke:"rgba(224,251,200,1)",fill:"none",strokeWidth:"1"}),m.default.createElement("path",{ref:"testfill",fill:"rgba(247,253,241,1)",stroke:"none"})))):m.default.createElement("div",{className:"recommend-item-kline",ref:"kline",key:"negative"},m.default.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg"},m.default.createElement("g",{transform:"translate(0.5,0.5)"},m.default.createElement("path",{ref:"testchart",stroke:"rgba(248,227,232,1)",fill:"none",strokeWidth:"1"}),m.default.createElement("path",{ref:"testfill",fill:"rgba(250,243,245,1)",stroke:"none"})))))}}]),t}(f.Component),c.defaultProps={pair:""},i=u))||i;t.default=E},1016:function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){n(this,e),this.barCount=23,this.max=0,this.min=1e9}return r(e,[{key:"setData",value:function(e){this.width=e.width,this.height=e.height;var t=this.data=e.data,n=t.length;this.barCount=n-1;for(var r=0;r<n;r++){var a=Number(t[r][1]);this.max=Math.max(a,this.max),this.min=Math.min(a,this.min)}this.max==this.min&&(this.min=.9*this.min,this.max=1.1*this.max)}},{key:"getY",value:function(e){return this.height*(1-(e-this.min)/(this.max-this.min))}},{key:"getX",value:function(e){return this.width*(e/this.barCount)}},{key:"getPath",value:function(){var e=this,t=[];return this.data.forEach(function(n,r){var a=Number(n[1]);0==r?t.push("M"+e.getX(r)+" "+e.getY(a||1)):t.push("L"+e.getX(r)+" "+e.getY(a||1))}),t.join(" ")}},{key:"getFill",value:function(){var e=this,t=[],n=void 0;return t.push("M0 "+this.height),this.data.forEach(function(r,a){var l=Number(r[1]);t.push("L"+e.getX(a)+" "+e.getY(l||1)),n=e.getX(a)}),t.push("L"+(n||0)+" "+this.height),t.join(" ")}}]),e}();t.default=a},1017:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,c,u=n(67),s=r(u),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(46);var m=n(0),d=r(m),p=n(7),h=n(11),y=n(1018),b=r(y),E=n(1019),v=r(E),g=s.default.Search,w=(i=(0,p.inject)("homeStore"))(c=(0,p.observer)(c=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleScroll=function(e){return},n.handleTab=function(e){var t=n.props.homeStore.marketListStore;t.updateMarketCode(e),t.initMarket()},n.filterHandler=function(e){var t=n.props.homeStore.marketListStore,r=e.target.value.trim();t.updateSearchValue(r)},n.handleClick=function(e){h.browserHistory.push("/webtrade/"+e)},n.state={positionFixed:!1},n}return o(t,e),f(t,[{key:"componentDidMount",value:function(){var e=$(this.refs.tofixed);this.visibilityHeight=e.offset().top,$(window).on("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){$(window).off("scroll",this.handleScroll)}},{key:"render",value:function(){var e=this,t=this.props.homeStore.marketListStore,n=void 0,r=void 0;return t.selectedCurrency.baseCurrencyNameEn&&(n=t.selectedCurrency.baseCurrencyNameEn+"_"+t.selectedCurrency.currencyNameEn,r=d.default.createElement("div",{className:"wrapper"},d.default.createElement("div",{className:"market-coin"},d.default.createElement("div",{className:"coin-hd"},d.default.createElement("h4",{className:"info",onClick:this.handleClick.bind(this,n)},d.default.createElement("img",{className:"icon",src:t.selectedCurrency.icoUrl||"",alt:""}),d.default.createElement("span",{className:"name"},t.selectedCurrency.currencyNameEn,d.default.createElement("i",null,"/",t.selectedCurrency.baseCurrencyNameEn)),d.default.createElement("em",null,t.selectedCurrency.currentAmountText)),d.default.createElement("span",{className:t.selectedCurrency.changeRate>=0?"rate greenrate":"rate redrate"},t.selectedCurrency.changeRateText)),d.default.createElement("ul",{className:"coin-bd clearfix"},d.default.createElement("li",null,d.default.createElement("label",null,UPEX.lang.template("成交量")),d.default.createElement("em",null,t.selectedCurrency.volumeText)),d.default.createElement("li",null,d.default.createElement("label",null,UPEX.lang.template("24h最低价")),d.default.createElement("em",null,t.selectedCurrency.lowPriceText)),d.default.createElement("li",null,d.default.createElement("label",null,UPEX.lang.template("成交额")),d.default.createElement("em",null,t.selectedCurrency.amountText)),d.default.createElement("li",null,d.default.createElement("label",null,UPEX.lang.template("24h最高价")),d.default.createElement("em",null,t.selectedCurrency.highPriceText)))),d.default.createElement("div",{className:"realtime-kline"},d.default.createElement(v.default,{key:n,pair:n,pointPrice:t.selectedCurrency.pointPrice})))),d.default.createElement("div",{className:"index-markets"},d.default.createElement("div",{className:"market-nav"},d.default.createElement("ul",null,t.marketNav.map(function(n,r){var a=n==t.selectedMarketCode?"selected":"";return d.default.createElement("li",{className:a,key:n,onClick:e.handleTab.bind(e,n)},UPEX.lang.template("{name}市场",{name:n}))}),d.default.createElement("li",{className:"marked"+("Marked"==t.selectedMarketCode?" selected":""),onClick:this.handleTab.bind(this,"Marked")},"Marked"==t.selectedMarketCode?d.default.createElement("i",{className:"exc-star selected"}):d.default.createElement("i",{className:"exc-star"}))),d.default.createElement("div",{className:"search"},d.default.createElement(g,{onChange:this.filterHandler,value:t.searchValue,placeholder:UPEX.lang.template("搜索数字币")}))),d.default.createElement("div",{className:"market-panel"},d.default.createElement("div",{className:"market-panel-hd"+(this.state.positionFixed?" market-panel-fixed":"")+(t.selectedCurrency.key?"":" empty"),ref:"tofixed"},r),d.default.createElement("div",{className:"market-panel-bd"},d.default.createElement(b.default,null))))}}]),t}(m.Component))||c)||c;t.default=w},1018:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,c,u=n(67),s=r(u),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(46);var m=n(0),d=r(m),p=n(7),h=n(11),y=(s.default.Search,(i=(0,p.inject)("homeStore"))(c=(0,p.observer)(c=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.sortHandle=function(e,t){n.props.homeStore.marketListStore.sortByCondition(e)},n.selectCoin=function(e,t){$(t.target).parents(".action").length>0||($(t.target).hasClass("symbol")||$(t.target).parents(".symbol").length>0?h.browserHistory.push("/webtrade/"+e.baseCurrencyNameEn+"_"+e.currencyNameEn):n.props.homeStore.marketListStore.updateCurrency(e))},n.collecthandle=function(e,t){n.props.homeStore.marketListStore.toggleCollectCoin(t)},n}return o(t,e),f(t,[{key:"componentWillUnmount",value:function(){}},{key:"sortIcon",value:function(e){return e?"asc"==this.props.homeStore.marketListStore.sortByType?d.default.createElement("i",{className:"exc-arrow-up"}):d.default.createElement("i",{className:"exc-arrow-down"}):d.default.createElement("i",{className:"exc-arrow-double"})}},{key:"collectIcon",value:function(e){var t=this,n=this.props.homeStore.marketListStore.collectCoinsList,r=n.some(function(t){if(t.tradeCurrencyId===e.currencyId&&t.baseCurrencyId===e.baseCurrencyId)return!0});return e.selected=!!r,r?d.default.createElement("i",{onClick:function(n){return t.collecthandle(n,e)},className:"exc-star selected"}):d.default.createElement("i",{onClick:function(n){return t.collecthandle(n,e)},className:"exc-star-o"})}},{key:"render",value:function(){var e=this,t=this.props.homeStore.marketListStore;return d.default.createElement("div",{className:"coin-list"},d.default.createElement("div",{className:"coin-list-content"},d.default.createElement("div",{className:""},d.default.createElement("div",{className:"table-header"},d.default.createElement("ul",null,d.default.createElement("li",{key:"header"},d.default.createElement("div",{className:"cell name"},UPEX.lang.template("币种")),d.default.createElement("div",{className:"cell amount"},d.default.createElement("span",{onClick:this.sortHandle.bind(this,"currentAmount")},UPEX.lang.template("最新价"),this.sortIcon("currentAmount"===t.sortByKey))),d.default.createElement("div",{className:"cell rate"},d.default.createElement("span",{onClick:this.sortHandle.bind(this,"changeRate")},UPEX.lang.template("24h涨跌"),this.sortIcon("changeRate"===t.sortByKey))),d.default.createElement("div",{className:"cell volume"},d.default.createElement("span",{onClick:this.sortHandle.bind(this,"volume")},UPEX.lang.template("24h成交量"),this.sortIcon("volume"===t.sortByKey))),d.default.createElement("div",{className:"cell action"},UPEX.lang.template("收藏"))))),d.default.createElement("div",{className:"table-body"},d.default.createElement("ul",null,t.selectedCurrencies.map(function(n,r){var a=void 0;return n.baseCurrencyNameEn&&n.currencyNameEn&&"/webtrade/"+n.baseCurrencyNameEn+"_"+n.currencyNameEn,a=n.changeRate>=0?"greenrate":"redrate",n.currentAmount>=n.previousPrice?("greenrate",d.default.createElement("i",{className:"exc-arrow-up"})):("redrate",d.default.createElement("i",{className:"exc-arrow-down"})),d.default.createElement("li",{className:"clearfix"+(n.currencyNameEn===t.selectedCurrency.currencyNameEn?" selected":""),key:n.key,onClick:e.selectCoin.bind(e,n)},d.default.createElement("span",{className:"cell name"},d.default.createElement("img",{src:""+n.icoUrl,alt:""}),d.default.createElement("span",{className:"symbol"},n.currencyNameEn||"--",d.default.createElement("i",null," / ",n.baseCurrencyNameEn))),d.default.createElement("span",{className:"cell amount"},n.currentAmountText),d.default.createElement("span",{className:"cell rate "+a},n.changeRateText),d.default.createElement("span",{className:"cell volume"},n.volumeText),d.default.createElement("span",{className:"cell action"},e.collectIcon(n)))}))))))}}]),t}(m.Component))||c)||c);t.default=y},1019:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,c,u,s,f=function(){function e(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw l}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),d=n(0),p=r(d),h=n(7),y=n(22),b=r(y),E=n(23),v=r(E),g=n(9),w=n(996),_=r(w),k=(i=(0,h.inject)("commonStore"))(c=(0,h.observer)((s=u=function(e){function t(){var e,n,r,o;a(this,t);for(var i=arguments.length,c=Array(i),u=0;u<i;u++)c[u]=arguments[u];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),r.get24Kline=function(){(0,g.getTradeKline)({symbol:r.props.pair,interval:60,limit:24}).then(function(e){200==e.status&&r.drawKline(e.attachment)}),r.timer&&clearTimeout(r.timer),r.timer=setTimeout(function(){r.get24Kline()},6e4)},o=n,l(r,o)}return o(t,e),m(t,[{key:"componentDidMount",value:function(){this.get24Kline()}},{key:"componentWillUnmount",value:function(){this.timer&&clearTimeout(this.timer)}},{key:"drawKline",value:function(e){var t=document.getElementById("home-coin-line");if(_.default.getInstanceByDom(t))_.default.getInstanceByDom(t).setOption(this.option(e));else{_.default.init(t).setOption(this.option(e))}}},{key:"option",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=this;return{tooltip:{trigger:"axis",axisPointer:{type:"cross"},formatter:function(e){var n=f(e,1),r=n[0],a=void 0;return a=t.props.pointPrice>0?b.default.formatNumber(r.value,t.props.pointPrice):r.value,[UPEX.lang.template("时间")+"："+r.name,UPEX.lang.template("价格")+"："+UPEX.config.baseCurrencySymbol+a].join("<br/>")},extraCssText:"font-size: 12px;"},grid:[{left:"3%",top:"5%",right:"0%",width:"94%",height:"75%"}],xAxis:{nameLocation:"center",type:"category",boundaryGap:!1,data:e.map(function(e){return v.default.formatDate(e.currentTime,"HH:mm")}),axisLine:{lineStyle:{color:"#c1c5c8",fontSize:"12px"},show:!0}},yAxis:{type:"value",scale:!0,show:!1,min:function(t){return t.min-(t.max-t.min)/e.length}},series:[{data:e.map(function(e){return e.current}),type:"line",itemStyle:{color:"#e8b802"},lineStyle:{color:"#f8eab3"},areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"#fff8dc"},{offset:1,color:"#fff"}],globalCoord:!1}}}]}}},{key:"render",value:function(){return p.default.createElement("div",{className:"coin-line-box",id:"home-coin-line"})}}]),t}(d.Component),u.defaultProps={pair:"",pointPrice:""},c=s))||c)||c;t.default=k},997:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,c,u=n(1005),s=r(u),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(1007);var m=n(0),d=r(m),p=n(7),h=n(1009),y=r(h),b=n(1010),E=r(b),v=n(1011),g=r(v),w=n(1012),_=r(w),k=n(1013),N=(r(k),n(1014)),P=r(N),C=n(1017),O=r(C),j=(i=(0,p.inject)("authStore","homeStore"))(c=(0,p.observer)(c=function(e){function t(e){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),f(t,[{key:"componentDidMount",value:function(){this.props.homeStore.getData()}},{key:"render",value:function(){this.props.homeStore.marketListStore;return d.default.createElement("div",{className:"home-wrapper"},this.props.authStore.isLogin?null:d.default.createElement(E.default,null),d.default.createElement(y.default,null,d.default.createElement(_.default,null)),d.default.createElement(P.default,null),d.default.createElement(O.default,null),d.default.createElement(g.default,null),d.default.createElement(s.default,null,d.default.createElement("div",{className:"ant-back-top-inner"})))}}]),t}(m.Component))||c)||c;t.default=j}});