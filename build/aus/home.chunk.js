webpackJsonp([1],{1008:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,c=n(1016),s=r(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(1018);var d=n(0),m=r(d),p=n(7),h=n(1020),y=r(h),b=n(1021),v=r(b),E=n(392),g=r(E),w=n(1022),_=r(w),k=n(1023),C=(r(k),n(1024)),N=r(C),O=n(1027),P=r(O),j=(i=(0,p.inject)("authStore","homeStore"))(u=(0,p.observer)(u=function(e){function t(e){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e))}return o(t,e),f(t,[{key:"componentDidMount",value:function(){this.props.homeStore.getData()}},{key:"render",value:function(){this.props.homeStore.marketListStore;return m.default.createElement("div",{className:"home-wrapper"},this.props.authStore.isLogin?null:m.default.createElement(v.default,null),m.default.createElement(y.default,null,m.default.createElement(_.default,null)),m.default.createElement(N.default,null),m.default.createElement(P.default,null),m.default.createElement(g.default,null),m.default.createElement(s.default,null,m.default.createElement("div",{className:"ant-back-top-inner"})))}}]),t}(d.Component))||u)||u;t.default=j},1016:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}function a(){}function l(){return window}Object.defineProperty(t,"__esModule",{value:!0});var o=n(6),i=r(o),u=n(3),c=r(u),s=n(9),f=r(s),d=n(4),m=r(d),p=n(5),h=r(p),y=n(0),b=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(y),v=n(68),E=r(v),g=n(148),w=r(g),_=n(8),k=r(_),C=n(69),N=r(C),O=n(1017),P=r(O),j=n(394),T=r(j),S=(0,T.default)(),x=function(e,t,n,r){var a=n-t;return e/=r/2,e<1?a/2*e*e*e+t:a/2*((e-=2)*e*e+2)+t},M=function(e){function t(e){(0,c.default)(this,t);var n=(0,m.default)(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.getCurrentScrollTop=function(){var e=n.props.target||l,t=e();return t===window?window.pageYOffset||document.body.scrollTop||document.documentElement.scrollTop:t.scrollTop},n.scrollToTop=function(e){var t=n.getCurrentScrollTop(),r=Date.now();S(function e(){var a=Date.now(),l=a-r;n.setScrollTop(x(l,t,0,450)),l<450&&S(e)}),(n.props.onClick||a)(e)},n.handleScroll=function(){var e=n.props,t=e.visibilityHeight,r=e.target,a=void 0===r?l:r,o=(0,P.default)(a(),!0);n.setState({visible:o>t})},n.state={visible:!1},n}return(0,h.default)(t,e),(0,f.default)(t,[{key:"setScrollTop",value:function(e){var t=this.props.target||l,n=t();n===window?(document.body.scrollTop=e,document.documentElement.scrollTop=e):n.scrollTop=e}},{key:"componentDidMount",value:function(){var e=this.props.target||l;this.scrollEvent=(0,w.default)(e(),"scroll",this.handleScroll),this.handleScroll()}},{key:"componentWillUnmount",value:function(){this.scrollEvent&&this.scrollEvent.remove()}},{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=void 0===t?"ant-back-top":t,r=e.className,a=void 0===r?"":r,l=e.children,o=(0,k.default)(n,a),u=b.createElement("div",{className:n+"-content"},b.createElement("div",{className:n+"-icon"})),c=(0,N.default)(this.props,["prefixCls","className","children","visibilityHeight"]),s=this.state.visible?b.createElement("div",(0,i.default)({},c,{className:o,onClick:this.scrollToTop}),l||u):null;return b.createElement(E.default,{component:"",transitionName:"fade"},s)}}]),t}(b.Component);t.default=M,M.defaultProps={visibilityHeight:400},e.exports=t.default},1017:function(e,t,n){"use strict";function r(e,t){if("undefined"==typeof window)return 0;var n=t?"pageYOffset":"pageXOffset",r=t?"scrollTop":"scrollLeft",a=e===window,l=a?e[n]:e[r];return a&&"number"!=typeof l&&(l=window.document.documentElement[r]),l}Object.defineProperty(t,"__esModule",{value:!0}),t.default=r,e.exports=t.default},1018:function(e,t,n){"use strict";n(25),n(1019)},1019:function(e,t){},1020:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,c,s,f=n(222),d=r(f),m=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(223);var p=n(0),h=r(p),y=n(7),b=(i=(0,y.inject)("bannerStore"))(u=(0,y.observer)((s=c=function(e){function t(){var e,n,r,o;a(this,t);for(var i=arguments.length,u=Array(i),c=0;c<i;c++)u[c]=arguments[c];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.handleClickBanner=function(e,t){e.url&&window.open(e.url)},o=n,l(r,o)}return o(t,e),m(t,[{key:"componentDidMount",value:function(){this.props.bannerStore.fetch()}},{key:"render",value:function(){var e=this,t=this.props.bannerStore,n=t.list,r=!1,a=void 0;return n.length>1&&(r=!0),t.$loading||(a=h.default.createElement(d.default,{autoplay:!0,dots:r,effect:"fade"},n.map(function(t,n){return h.default.createElement("div",{className:"slider-item",key:n,onClick:e.handleClickBanner.bind(e,t)},h.default.createElement("img",{src:t.image}))}))),h.default.createElement("div",{className:"banner-wrapper"},h.default.createElement("div",{className:"slider",ref:"banner"},a),this.props.children)}}]),t}(p.Component),c.defaultProps={list:[]},u=s))||u)||u;t.default=b},1021:function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(u),s=n(7),f=n(11),d=(0,s.observer)(o=function(e){function t(){var e,n,l,o;r(this,t);for(var i=arguments.length,u=Array(i),c=0;c<i;c++)u[c]=arguments[c];return n=l=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),l.handleRegister=function(e){f.browserHistory.push("/register")},l.handleLogin=function(e){f.browserHistory.push("/login")},o=n,a(l,o)}return l(t,e),i(t,[{key:"render",value:function(){return c.default.createElement("div",{className:"loginguide-wrapper"},c.default.createElement("ul",null,c.default.createElement("li",null,c.default.createElement("label",null,UPEX.lang.template("开始你的数字货币之旅"))),c.default.createElement("li",null,c.default.createElement("button",{type:"button",className:"register-btn",onClick:this.handleRegister},UPEX.lang.template("注册"))),c.default.createElement("li",null,c.default.createElement("span",null,UPEX.lang.template("已经注册?")),c.default.createElement("button",{type:"button",className:"login-btn",onClick:this.handleLogin},UPEX.lang.template("登录")))))}}]),t}(u.Component))||o;t.default=d},1022:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,c=n(222),s=r(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(223);var d=n(0),m=r(d),p=n(7),h=n(11),y=(i=(0,p.inject)("announcementStore"))(u=(0,p.observer)(u=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),f(t,[{key:"componentDidMount",value:function(){this.props.announcementStore.fetch(6)}},{key:"render",value:function(){var e=this.props.announcementStore;return 0==e.formatedList.length?null:m.default.createElement("div",{className:"noticelist"},m.default.createElement("div",{className:"content"},m.default.createElement(s.default,{autoplay:!0,vertical:!0,dots:!1,speed:500},e.formatedList.map(function(e,t){return m.default.createElement("ul",{className:"clearfix",key:t},e.map(function(e,t){return m.default.createElement("li",{key:e.announceId},m.default.createElement("div",{className:"info"},m.default.createElement(h.Link,{to:"/news/detail/"+e.announceId},e.title)),m.default.createElement("div",{className:"time"},e.publishTime.split(" ")[0]))}))}))))}}]),t}(d.Component))||u)||u;t.default=y},1023:function(e,t,n){function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function l(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o,i=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),u=n(0),c=function(e){return e&&e.__esModule?e:{default:e}}(u),s=n(7),f=(0,s.observer)(o=function(e){function t(){return r(this,t),a(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return l(t,e),i(t,[{key:"render",value:function(){return c.default.createElement("div",{className:"btcnews-wrapper"},c.default.createElement("h3",{className:"title"},UPEX.lang.template("币圈资讯")),c.default.createElement("div",{className:"content"},c.default.createElement("div",{className:"pic",style:{backgroundImage:"url(https://www.chaoex.com/dist/images/26758a19.png)"}}),c.default.createElement("div",{className:"list"},c.default.createElement("ul",null,c.default.createElement("li",null,c.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),c.default.createElement("li",null,c.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),c.default.createElement("li",null,c.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),c.default.createElement("li",null,c.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。")),c.default.createElement("li",null,c.default.createElement("a",{href:"#",target:"_blank"},"【电子竞技区块链项目EsportsChain（EST）将于5月8日15点登陆BIT-Z交易所】EsportsChain（EST）将于5月8日在BIT-Z交易所首发。"))))))}}]),t}(u.Component))||o;t.default=f},1024:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,c=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),s=n(0),f=r(s),d=n(7),m=n(1025),p=r(m),h=(i=(0,d.inject)("homeStore"))(u=(0,d.observer)(u=function(e){function t(){return a(this,t),l(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return o(t,e),c(t,[{key:"render",value:function(){var e=this.props.homeStore.marketListStore;return f.default.createElement("div",{className:"hot-markets"},f.default.createElement("ul",null,e.hotCurrencies.map(function(e,t){var n=e.baseCurrencyNameEn+"_"+e.currencyNameEn;return f.default.createElement("li",{key:n},f.default.createElement(p.default,{data:e,pair:n}))})))}}]),t}(s.Component))||u)||u;t.default=h},1025:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,c,s=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),f=n(0),d=r(f),m=n(7),p=n(1026),h=r(p),y=n(11),b=n(10),v=(0,m.observer)((c=u=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleTrade=function(e){y.browserHistory.push("/webtrade/"+e.baseCurrencyNameEn+"_"+e.currencyNameEn)},n.klineChart=new h.default,n}return o(t,e),s(t,[{key:"componentDidMount",value:function(){this.get24KlineData()}},{key:"get24KlineData",value:function(){var e=this;(0,b.getTradeKline)({symbol:this.props.pair,interval:60,limit:24}).then(function(t){var n=[];200==t.status&&(t.attachment.forEach(function(e,t){var r=[];r[r.length]=e.currentTime,r[r.length]=e.current,n[n.length]=r}),e.drawKline(n))})}},{key:"drawKline",value:function(e){var t=$(this.refs.kline),n=t.width(),r=t.height();this.klineChart.setData({data:e,width:n,height:r});var a=this.klineChart.getPath(),l=this.klineChart.getFill();$(this.refs.testchart).attr("d",a),$(this.refs.testfill).attr("d",l)}},{key:"render",value:function(){var e=this.props.data,t=e.changeRate>=0?"positive":"negative";return d.default.createElement("div",{className:"recommend-item "+t,onClick:this.handleTrade.bind(this,e)},d.default.createElement("div",{className:"recommend-item-name"},e.currencyNameEn,d.default.createElement("i",null," / ",e.baseCurrencyNameEn)),d.default.createElement("div",{className:"recommend-item-price"},e.currentAmountText,d.default.createElement("i",null,e.baseCurrencyNameEn)),d.default.createElement("div",{className:"recommend-item-volume",dangerouslySetInnerHTML:{__html:UPEX.lang.template("成交额 {num}{unit}",{num:e.amountText,unit:e.baseCurrencyNameEn},1)}}),d.default.createElement("div",{className:"recommend-item-rate"},e.changeRateText),"positive"==t?d.default.createElement("div",{className:"recommend-item-kline",ref:"kline",key:"positive"},d.default.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg"},d.default.createElement("g",{transform:"translate(0.5,0.5)"},d.default.createElement("path",{ref:"testchart",stroke:"rgba(224,251,200,1)",fill:"none",strokeWidth:"1"}),d.default.createElement("path",{ref:"testfill",fill:"rgba(247,253,241,1)",stroke:"none"})))):d.default.createElement("div",{className:"recommend-item-kline",ref:"kline",key:"negative"},d.default.createElement("svg",{version:"1.1",xmlns:"http://www.w3.org/2000/svg"},d.default.createElement("g",{transform:"translate(0.5,0.5)"},d.default.createElement("path",{ref:"testchart",stroke:"rgba(248,227,232,1)",fill:"none",strokeWidth:"1"}),d.default.createElement("path",{ref:"testfill",fill:"rgba(250,243,245,1)",stroke:"none"})))))}}]),t}(f.Component),u.defaultProps={pair:""},i=c))||i;t.default=v},1026:function(e,t){function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),a=function(){function e(){n(this,e),this.barCount=23,this.max=0,this.min=1e9}return r(e,[{key:"setData",value:function(e){this.width=e.width,this.height=e.height;var t=this.data=e.data,n=t.length;this.barCount=n-1;for(var r=0;r<n;r++){var a=Number(t[r][1]);this.max=Math.max(a,this.max),this.min=Math.min(a,this.min)}this.max==this.min&&(this.min=.9*this.min,this.max=1.1*this.max)}},{key:"getY",value:function(e){return this.height*(1-(e-this.min)/(this.max-this.min))}},{key:"getX",value:function(e){return this.width*(e/this.barCount)}},{key:"getPath",value:function(){var e=this,t=[];return this.data.forEach(function(n,r){var a=Number(n[1]);0==r?t.push("M"+e.getX(r)+" "+e.getY(a||1)):t.push("L"+e.getX(r)+" "+e.getY(a||1))}),t.join(" ")}},{key:"getFill",value:function(){var e=this,t=[],n=void 0;return t.push("M0 "+this.height),this.data.forEach(function(r,a){var l=Number(r[1]);t.push("L"+e.getX(a)+" "+e.getY(l||1)),n=e.getX(a)}),t.push("L"+(n||0)+" "+this.height),t.join(" ")}}]),e}();t.default=a},1027:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,c=n(81),s=r(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(51);var d=n(0),m=r(d),p=n(7),h=n(11),y=n(1028),b=r(y),v=n(1029),E=r(v),g=s.default.Search,w=(i=(0,p.inject)("homeStore"))(u=(0,p.observer)(u=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.handleScroll=function(e){return},n.handleTab=function(e){var t=n.props.homeStore.marketListStore;t.updateMarketCode(e),t.initMarket()},n.filterHandler=function(e){var t=n.props.homeStore.marketListStore,r=e.target.value.trim();t.updateSearchValue(r)},n.handleClick=function(e){h.browserHistory.push("/webtrade/"+e)},n.state={positionFixed:!1},n}return o(t,e),f(t,[{key:"componentDidMount",value:function(){var e=$(this.refs.tofixed);this.visibilityHeight=e.offset().top,$(window).on("scroll",this.handleScroll)}},{key:"componentWillUnmount",value:function(){$(window).off("scroll",this.handleScroll)}},{key:"render",value:function(){var e=this,t=this.props.homeStore.marketListStore,n=void 0,r=void 0;return t.selectedCurrency.baseCurrencyNameEn&&(n=t.selectedCurrency.baseCurrencyNameEn+"_"+t.selectedCurrency.currencyNameEn,r=m.default.createElement("div",{className:"wrapper"},m.default.createElement("div",{className:"market-coin"},m.default.createElement("div",{className:"coin-hd"},m.default.createElement("h4",{className:"info",onClick:this.handleClick.bind(this,n)},m.default.createElement("img",{className:"icon",src:t.selectedCurrency.icoUrl||"",alt:""}),m.default.createElement("span",{className:"name"},t.selectedCurrency.currencyNameEn,m.default.createElement("i",null,"/",t.selectedCurrency.baseCurrencyNameEn)),m.default.createElement("em",null,t.selectedCurrency.currentAmountText)),m.default.createElement("span",{className:t.selectedCurrency.changeRate>=0?"rate greenrate":"rate redrate"},t.selectedCurrency.changeRateText)),m.default.createElement("ul",{className:"coin-bd clearfix"},m.default.createElement("li",null,m.default.createElement("label",null,UPEX.lang.template("成交量")),m.default.createElement("em",null,t.selectedCurrency.volumeText)),m.default.createElement("li",null,m.default.createElement("label",null,UPEX.lang.template("24h最低价")),m.default.createElement("em",null,t.selectedCurrency.lowPriceText)),m.default.createElement("li",null,m.default.createElement("label",null,UPEX.lang.template("成交额")),m.default.createElement("em",null,t.selectedCurrency.amountText)),m.default.createElement("li",null,m.default.createElement("label",null,UPEX.lang.template("24h最高价")),m.default.createElement("em",null,t.selectedCurrency.highPriceText)))),m.default.createElement("div",{className:"realtime-kline"},m.default.createElement(E.default,{key:n,pair:n,pointPrice:t.selectedCurrency.pointPrice})))),m.default.createElement("div",{className:"index-markets"},m.default.createElement("div",{className:"market-nav"},m.default.createElement("ul",null,t.marketNav.map(function(n,r){var a=n==t.selectedMarketCode?"selected":"";return m.default.createElement("li",{className:a,key:n,onClick:e.handleTab.bind(e,n)},UPEX.lang.template("{name}市场",{name:n}))}),m.default.createElement("li",{className:"marked"+("Marked"==t.selectedMarketCode?" selected":""),onClick:this.handleTab.bind(this,"Marked")},"Marked"==t.selectedMarketCode?m.default.createElement("i",{className:"exc-star selected"}):m.default.createElement("i",{className:"exc-star"}))),m.default.createElement("div",{className:"search"},m.default.createElement(g,{onChange:this.filterHandler,value:t.searchValue,placeholder:UPEX.lang.template("搜索数字币")}))),m.default.createElement("div",{className:"market-panel"},m.default.createElement("div",{className:"market-panel-hd"+(this.state.positionFixed?" market-panel-fixed":"")+(t.selectedCurrency.key?"":" empty"),ref:"tofixed"},r),m.default.createElement("div",{className:"market-panel-bd"},m.default.createElement(b.default,null))))}}]),t}(d.Component))||u)||u;t.default=w},1028:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,u,c=n(81),s=r(c),f=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}();n(51);var d=n(0),m=r(d),p=n(7),h=n(11),y=(s.default.Search,(i=(0,p.inject)("homeStore"))(u=(0,p.observer)(u=function(e){function t(e){a(this,t);var n=l(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.sortHandle=function(e,t){n.props.homeStore.marketListStore.sortByCondition(e)},n.selectCoin=function(e,t){$(t.target).parents(".action").length>0||($(t.target).hasClass("symbol")||$(t.target).parents(".symbol").length>0?h.browserHistory.push("/webtrade/"+e.baseCurrencyNameEn+"_"+e.currencyNameEn):n.props.homeStore.marketListStore.updateCurrency(e))},n.collecthandle=function(e,t){n.props.homeStore.marketListStore.toggleCollectCoin(t)},n}return o(t,e),f(t,[{key:"componentWillUnmount",value:function(){}},{key:"sortIcon",value:function(e){return e?"asc"==this.props.homeStore.marketListStore.sortByType?m.default.createElement("i",{className:"exc-arrow-up"}):m.default.createElement("i",{className:"exc-arrow-down"}):m.default.createElement("i",{className:"exc-arrow-double"})}},{key:"collectIcon",value:function(e){var t=this,n=this.props.homeStore.marketListStore.collectCoinsList,r=n.some(function(t){if(t.tradeCurrencyId===e.currencyId&&t.baseCurrencyId===e.baseCurrencyId)return!0});return e.selected=!!r,r?m.default.createElement("i",{onClick:function(n){return t.collecthandle(n,e)},className:"exc-star selected"}):m.default.createElement("i",{onClick:function(n){return t.collecthandle(n,e)},className:"exc-star-o"})}},{key:"render",value:function(){var e=this,t=this.props.homeStore.marketListStore;return m.default.createElement("div",{className:"coin-list"},m.default.createElement("div",{className:"coin-list-content"},m.default.createElement("div",{className:""},m.default.createElement("div",{className:"table-header"},m.default.createElement("ul",null,m.default.createElement("li",{key:"header"},m.default.createElement("div",{className:"cell name"},UPEX.lang.template("币种")),m.default.createElement("div",{className:"cell amount"},m.default.createElement("span",{onClick:this.sortHandle.bind(this,"currentAmount")},UPEX.lang.template("最新价"),this.sortIcon("currentAmount"===t.sortByKey))),m.default.createElement("div",{className:"cell rate"},m.default.createElement("span",{onClick:this.sortHandle.bind(this,"changeRate")},UPEX.lang.template("24h涨跌"),this.sortIcon("changeRate"===t.sortByKey))),m.default.createElement("div",{className:"cell volume"},m.default.createElement("span",{onClick:this.sortHandle.bind(this,"volume")},UPEX.lang.template("24h成交量"),this.sortIcon("volume"===t.sortByKey))),m.default.createElement("div",{className:"cell action"},UPEX.lang.template("收藏"))))),m.default.createElement("div",{className:"table-body"},m.default.createElement("ul",null,t.selectedCurrencies.map(function(n,r){var a=void 0;return n.baseCurrencyNameEn&&n.currencyNameEn&&"/webtrade/"+n.baseCurrencyNameEn+"_"+n.currencyNameEn,a=n.changeRate>=0?"greenrate":"redrate",n.currentAmount>=n.previousPrice?("greenrate",m.default.createElement("i",{className:"exc-arrow-up"})):("redrate",m.default.createElement("i",{className:"exc-arrow-down"})),m.default.createElement("li",{className:"clearfix"+(n.currencyNameEn===t.selectedCurrency.currencyNameEn?" selected":""),key:n.key,onClick:e.selectCoin.bind(e,n)},m.default.createElement("span",{className:"cell name"},m.default.createElement("img",{src:""+n.icoUrl,alt:""}),m.default.createElement("span",{className:"symbol"},n.currencyNameEn||"--",m.default.createElement("i",null," / ",n.baseCurrencyNameEn))),m.default.createElement("span",{className:"cell amount"},n.currentAmountText),m.default.createElement("span",{className:"cell rate "+a},n.changeRateText),m.default.createElement("span",{className:"cell volume"},n.volumeText),m.default.createElement("span",{className:"cell action"},e.collectIcon(n)))}))))))}}]),t}(d.Component))||u)||u);t.default=y},1029:function(e,t,n){function r(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function l(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function o(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,u,c,s,f=function(){function e(e,t){var n=[],r=!0,a=!1,l=void 0;try{for(var o,i=e[Symbol.iterator]();!(r=(o=i.next()).done)&&(n.push(o.value),!t||n.length!==t);r=!0);}catch(e){a=!0,l=e}finally{try{!r&&i.return&&i.return()}finally{if(a)throw l}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),d=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),m=n(0),p=r(m),h=n(7),y=n(20),b=r(y),v=n(23),E=r(v),g=n(10),w=n(1007),_=r(w),k=(i=(0,h.inject)("commonStore"))(u=(0,h.observer)((s=c=function(e){function t(){var e,n,r,o;a(this,t);for(var i=arguments.length,u=Array(i),c=0;c<i;c++)u[c]=arguments[c];return n=r=l(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.get24Kline=function(){(0,g.getTradeKline)({symbol:r.props.pair,interval:60,limit:24}).then(function(e){200==e.status&&r.drawKline(e.attachment)}),r.timer&&clearTimeout(r.timer),r.timer=setTimeout(function(){r.get24Kline()},6e4)},o=n,l(r,o)}return o(t,e),d(t,[{key:"componentDidMount",value:function(){this.get24Kline()}},{key:"componentWillUnmount",value:function(){this.timer&&clearTimeout(this.timer)}},{key:"drawKline",value:function(e){var t=document.getElementById("home-coin-line");if(_.default.getInstanceByDom(t))_.default.getInstanceByDom(t).setOption(this.option(e));else{_.default.init(t).setOption(this.option(e))}}},{key:"option",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=this;return{tooltip:{trigger:"axis",axisPointer:{type:"cross"},formatter:function(e){var n=f(e,1),r=n[0],a=void 0;return a=t.props.pointPrice>0?b.default.formatNumber(r.value,t.props.pointPrice):r.value,[UPEX.lang.template("时间")+"："+r.name,UPEX.lang.template("价格")+"："+UPEX.config.baseCurrencySymbol+a].join("<br/>")},extraCssText:"font-size: 12px;"},grid:[{left:"3%",top:"5%",right:"0%",width:"94%",height:"75%"}],xAxis:{nameLocation:"center",type:"category",boundaryGap:!1,data:e.map(function(e){return E.default.formatDate(e.currentTime,"HH:mm")}),axisLine:{lineStyle:{color:"#c1c5c8",fontSize:"12px"},show:!0}},yAxis:{type:"value",scale:!0,show:!1,min:function(t){return t.min-(t.max-t.min)/e.length}},series:[{data:e.map(function(e){return e.current}),type:"line",itemStyle:{color:"#e8b802"},lineStyle:{color:"#f8eab3"},areaStyle:{color:{type:"linear",x:0,y:0,x2:0,y2:1,colorStops:[{offset:0,color:"#fff8dc"},{offset:1,color:"#fff"}],globalCoord:!1}}}]}}},{key:"render",value:function(){return p.default.createElement("div",{className:"coin-line-box",id:"home-coin-line"})}}]),t}(m.Component),c.defaultProps={pair:"",pointPrice:""},u=s))||u)||u;t.default=k}});