/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import { Icon, Switch, Popover} from 'antd';
import TradeCoinList from './coin-list';
import '../../../lib/tradingview/charting_library.min';
import '../../../lib/tradingview/polyfills';
// import '../../../lib/tradingview/test';
import  UDFCompatibleDatafeed from './tv-jsapi';
import DepthChart from '../depth/index';

@inject('tradeStore','commonStore')
@observer
class TVChartContainer extends Component {
	static defaultProps = {

	}
	constructor(props){
		super(props);
        // 分钟线；天线；月线
        this.timeline = [{
            slug: "1min",
            resolution: "1", // 1分钟
            chartType: 3,
            text: UPEX.lang.template('分时')
        },{
            slug: "1min",
            resolution: "1", // 1分钟
            chartType: 1,
            text: UPEX.lang.template('1min')
        }, {
            slug: "5min",
            resolution: "5", // 5分钟
            chartType: 1,
            text: UPEX.lang.template('5min')
        }, {
            slug: "15min",
            resolution: "15", // 15分钟
            chartType: 1,
            text: UPEX.lang.template('15min')
        }, {
            slug: "30min",
            resolution: "30", // 30分钟
            chartType: 1,
            text: UPEX.lang.template('30min')
        }, {
            slug: "1hour",
            resolution: "60", // 1小时
            chartType: 1,
            text: UPEX.lang.template('1hour')
        }, {
            slug: "4hour",
            resolution: "240", // 4小时
            chartType: 1,
            text: UPEX.lang.template('4hour')
        }, {
            slug: "1day",
            resolution: "1D", // 1天
            chartType: 1,
            text: UPEX.lang.template('1day')
        }, {
            slug: "5day",
            resolution: "5D", // 5天
            chartType: 1,
            text: UPEX.lang.template('5day')
        }, {
            slug: "1week",
            resolution: "7D", // 7天
            chartType: 1,
            text: UPEX.lang.template('1week')
        }, {
            slug: "1mon",
            resolution: "1M", // 1月
            chartType: 1,
            text: UPEX.lang.template('1mon')
        }];



        this.defaultThemes = {
            "light": {
                url: "./bundles/day.css",
                up: "#00d02c",
                down: "#ff3380",
                bg: "#ffffff",
                grid: "#f7f8fa",
                cross: "#23283D",
                border: "#9194a4",
                text: "#9194a4",
                areatop: "rgba(71, 78, 112, 0.1)",
                areadown: "rgba(71, 78, 112, 0.02)"
            },
            "dark": {
                url: "./bundles/night.css",
                up: "#00d02c",
                down: "#ff3380",
                bg: "#090600",
                grid: "#1f2943",
                cross: "#9194A3",
                border: "#4e5b85",
                text: "#61688A",
                areatop: "rgba(122, 152, 247, .1)",
                areadown: "rgba(122, 152, 247, .02)"
            }
        }

        this.state = {
            chart: 'kline'
        }
    }
    componentWillMount() {
        // 最新公告数据获取
        this.props.tradeStore.getCollectCoins();
    }

    componentDidMount(){
        setTimeout(()=>{
            if (!this.refs.kline) {
                return;
            }
            this.createTradingView();
        }, 100)
    }

	createTradingView() {
        let self = this;
        let { getTradeCoinById, getPointPrice } = this.props.commonStore;
		let theme = this.props.tradeStore.theme;
        let currencyId = this.props.tradeStore.currencyId;
        let baseCurrencyId = this.props.tradeStore.baseCurrencyId;
		let locale; 
		let interval; 
        let baseCurrencyNameEn; 
        let currencyNameEn; 

        if (!baseCurrencyId || !currencyId) {
            throw new Error("no such symbol");
        }

        locale = this.getLocale();
        interval = this.getIntervalByPeriod();
        baseCurrencyNameEn = getTradeCoinById(baseCurrencyId).currencyNameEn;
        currencyNameEn = getTradeCoinById(currencyId).currencyNameEn;

        interval = '1D';

        let currentSymbolName = `${currencyNameEn}/${baseCurrencyNameEn}`;

		var cfg = {
            debug: true,
            symbol: currentSymbolName, // 商品名称
            // 让图表占据所有可用的空间
            fullscreen: true,
            autosize: true,
            // 商品间额
            interval: interval,
            // 指定要包含widget的DOM元素id
            container_id: "kline-chart",
            // 本地化处理,zh中文，zh_TW台湾繁体
            locale: locale,
            // 图表的初始时区
            timezone: 'Asia/Shanghai',
            // static文件夹的路径
            library_path: "/",
            // 工具栏背景颜色
            toolbar_bg: 'transparent',
            drawings_access: {
                type: "black",
                tools: [{
                    name: "Regression Trend"
                }]
            },
            datafeed: new UDFCompatibleDatafeed({
                currencyNameEn,
                baseCurrencyNameEn,
                pointPrice:  getPointPrice(currencyNameEn),
                interval: interval,
            }),
            // datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
            overrides: this.getOverridesByTheme(theme),
            custom_css_url: this.getCustomCSSUrlByTheme(theme),
            disabled_features: [
            	"left_toolbar",
                // 品种搜索框
                "header_symbol_search",
                // 周期设置按钮
                "header_resolutions",
                "header_interval_dialog_button",
                "show_interval_dialog_on_key_press",
                // 您可以使用此功能集从上下文菜单中删除“比较/覆盖”对话框
                "compare_symbol",
                "display_market_status",
                "go_to_date",
                "header_chart_type",
                "header_compare",
                "header_screenshot",
                "header_undo_redo",
                "legend_context_menu",
                "show_hide_button_in_legend",
                "snapshot_trading_drawings",
                "symbol_info",
                "timeframes_toolbar",
                "use_localstorage_for_settings",
                "volume_force_overlay",
                "header_saveload"
            ],
            enabled_features: [
                "dont_show_boolean_study_arguments", // 是否隐藏指标参数
                "hide_last_na_study_output", // 隐藏最后一次指标输出
                "move_logo_to_main_pane", // 将标志放在主数据列窗格上，而不是底部窗格
                "same_data_requery", // 允许您使用相同的商品调用setSymbol来刷新数据
                "side_toolbar_in_fullscreen_mode", // 使用此功能，您可以在全屏模式下启用绘图工具栏
                //显示的时间与DataFeed提供的时间完全一致，而不进行对齐。如果您希望图表构建一些分辨率，则不建议使用此方法。
                "disable_resolution_rebuild",
            ]
        };

        var callback = ()=>{
        	let widget = window.tvwidget = this.tvwidget = new TradingView.widget(cfg);

        	widget.onChartReady(function() {
                // 要从菜单中删除现有项目，请在项目文本前面使用减号
                widget.onContextMenu(function(t, e) {
                    return [{
                        text: "-Objects Tree..."
                    }, {
                        text: "-Drawing Tools"
                    }, {
                        text: "-Hide Marks On Bars"
                    }, {
                        text: "-Change Symbol..."
                    }, {
                        text: "-Change Interval..."
                    }]
                });

                var update = function(data){
                    var resolution = data.resolution;
                    var chartType = data.chartType || 1;

                    if (widget.changingInterval){
                        return;
                    }

                    widget.setSymbol(currentSymbolName, resolution);

                    widget.changingInterval = true;

                    if (widget.chart().chartType() !==  chartType) {
                        widget.applyOverrides({
                            'mainSeriesProperties.style': chartType
                        });
                    }

                    widget.selectedIntervalClass = 'interval-' + resolution + '-' + chartType;

                    widget.changingInterval = false;
                }

                let currentPeroid = UPEX.cache.getCache('kline/resolution') || self.timeline[0];

                widget.selectedIntervalClass = `interval-${currentPeroid.resolution}-${currentPeroid.chartType}`;

                // 自定义UI按钮
		        let buttons = self.timeline.map((item, index)=>{
                    chartType = item.chartType || 1;

		        	return widget.createButton()
				        .attr('title', item.slug)
                        .addClass(widget.selectedIntervalClass === `interval-${item.resolution}-${item.chartType}` ? 'selected': '')
                        .data('resolution',item.resolution)
                        .data('charttype', item.chartType)
				        .on('click', function (e) {

                            update(item);
				        	// 设置按钮状态
                            let target = $(e.currentTarget);

                            buttons.forEach(function(item){
                                let current = widget.selectedIntervalClass === `interval-${item.data('resolution')}-${item.data('charttype')}`;

                                if (current){
                                    item.addClass('selected');
                                } else {
                                    item.removeClass('selected');
                                }
                            })

                            UPEX.cache.setCache('kline/resolution', {
                                resolution: item.resolution,
                                chartType: item.chartType || 1,
                                slug: item.slug
                            });
				        })
				        .append($('<span>' + item.text + '</span>'));
		        });

                widget.maStudies = [];

                let colors = ["#965fc4", "#84aad5", "#55b263", "#b7248a"];

                // 技术指标指示器
                [5, 10, 30, 60].forEach(function(t, n) {
                    widget.chart().createStudy("Moving Average", !1, !1, [t], function(t) {
                        return widget.maStudies.push(t)
                    }, {
                        "plot.color.0": colors[n],
                        precision: 4 // 精度
                    })
                });

		  //       widget.chart().onIntervalChanged().subscribe(null, function(interval, obj) {
    //                 console.log('--------------', interval, obj);
    // 				widget.changingInterval = false;

    //                 buttons.forEach(function(item) {
    //                     let current = widget.selectedIntervalClass === `interval-${interval}-1`;

    //                     if (current){
    //                         item.addClass('selected');
    //                     } else {
    //                         item.removeClass('selected');
    //                     }
    //                 });

    //                 if (1 * interval != 1 ) {

    //                     UPEX.cache.setCache('kline/resolution', {
    //                         resolution: interval,
    //                         chartType: 1
    //                     });

    //                     update({
    //                         resolution: interval
    //                     });
    //                 }

    //                 console.log(interval, obj);
				// })

                // widget.chart().setChartType(3); // 设置线图类型的
                // 默认隐藏绘图工具栏
                widget.chart().executeActionById("drawingToolbarAction");
            });
        }

        if(!window.tvwidget) {
        	TradingView.onready(function(){
        		window.tradingviewready = true;
            	callback();
        	});

        	setTimeout(()=>{
        		if(!window.tradingviewready) {
        			callback();
        		}
        	}, 1000)
        } else {
        	callback();
        }
	}

	switchTheme = (checked)=>{
        let store = this.props.tradeStore;
        let theme;

        if (checked) {
            theme = 'dark';
        } else {
            theme = 'light';
        }

        setTimeout(()=>{
            store.changeThemeTo(theme);
        }, 0);

        if (this.tvwidget) {
        	let overrides = this.getOverridesByTheme(theme);
        	let cssurl = this.getCustomCSSUrlByTheme(theme);

    		this.tvwidget.addCustomCSSFile(cssurl);
    		this.tvwidget.applyOverrides(overrides);
    	}
    }


	getLocale() {
		let lang = this.props.commonStore.language;

		switch(lang) {
			case 'zh-CN':
				lang = 'zh';
				break;
			case 'zh_TW':
				lang = 'zh_TW';
				break;
			case 'en-US':
				lang = 'en';
				break;
		}

		return lang;
	}

	getIntervalByPeriod() {
        let cachePeriod = UPEX.cache.getCache('kline/resolution');
        let currentPeroid = cachePeriod ? cachePeriod : this.timeline[0];
        let slug = currentPeroid.slug;
        var result = slug.match(/^(\d+)(s|min|hour|day|mon|week|year)$/);
        var num = result[1];

        switch (result[2]) {
            case "s":
                return  num + "S";
            case "hour":
                return "" + 60 * num;
            case "day":
                return num + "D";
            case "week":
                return 7 * parseInt(num, 10) + "D";
            case "mon":
                return num + "M";
            case "year":
                return 12 * parseInt(num, 10) + "M";
            default:
                return num;
        }
	}

	getOverridesByTheme(theme) {
        var t = this.defaultThemes[theme];
        var overrides = {
            volumePaneSize: "medium",
            "scalesProperties.lineColor": t.text,
            "scalesProperties.textColor": t.text,
            "paneProperties.background": t.bg,
            "paneProperties.vertGridProperties.color": t.grid,
            "paneProperties.horzGridProperties.color": t.grid,
            "paneProperties.crossHairProperties.color": t.cross,
            "paneProperties.legendProperties.showLegend": !!t.showLegend,
            "paneProperties.legendProperties.showStudyArguments": !0,
            "paneProperties.legendProperties.showStudyTitles": !0,
            "paneProperties.legendProperties.showStudyValues": !0,
            "paneProperties.legendProperties.showSeriesTitle": !0,
            "paneProperties.legendProperties.showSeriesOHLC": !0,
            // 蜡烛样式
            "mainSeriesProperties.candleStyle.upColor": t.up,
            "mainSeriesProperties.candleStyle.downColor": t.down,
            "mainSeriesProperties.candleStyle.drawWick": !0,
            "mainSeriesProperties.candleStyle.drawBorder": !0,
            "mainSeriesProperties.candleStyle.borderColor": t.border,
            "mainSeriesProperties.candleStyle.borderUpColor": t.up,
            "mainSeriesProperties.candleStyle.borderDownColor": t.down,
            "mainSeriesProperties.candleStyle.wickUpColor": t.up,
            "mainSeriesProperties.candleStyle.wickDownColor": t.down,
            "mainSeriesProperties.candleStyle.barColorsOnPrevClose": !1,
            //    Hollow Candles styles
            "mainSeriesProperties.hollowCandleStyle.upColor": t.up,
            "mainSeriesProperties.hollowCandleStyle.downColor": t.down,
            "mainSeriesProperties.hollowCandleStyle.drawWick": !0,
            "mainSeriesProperties.hollowCandleStyle.drawBorder": !0,
            "mainSeriesProperties.hollowCandleStyle.borderColor": t.border,
            "mainSeriesProperties.hollowCandleStyle.borderUpColor": t.up,
            "mainSeriesProperties.hollowCandleStyle.borderDownColor": t.down,
            "mainSeriesProperties.hollowCandleStyle.wickColor": t.line,
            //    Heiken Ashi styles
            "mainSeriesProperties.haStyle.upColor": t.up,
            "mainSeriesProperties.haStyle.downColor": t.down,
            "mainSeriesProperties.haStyle.drawWick": !0,
            "mainSeriesProperties.haStyle.drawBorder": !0,
            "mainSeriesProperties.haStyle.borderColor": t.border,
            "mainSeriesProperties.haStyle.borderUpColor": t.up,
            "mainSeriesProperties.haStyle.borderDownColor": t.down,
            "mainSeriesProperties.haStyle.wickColor": t.border,
            "mainSeriesProperties.haStyle.barColorsOnPrevClose": !1,
            //    Bars styles
            "mainSeriesProperties.barStyle.upColor": t.up,
            "mainSeriesProperties.barStyle.downColor": t.down,
            "mainSeriesProperties.barStyle.barColorsOnPrevClose": !1,
            "mainSeriesProperties.barStyle.dontDrawOpen": !1,
            //    Line styles
            "mainSeriesProperties.lineStyle.color": t.border,
            "mainSeriesProperties.lineStyle.linewidth": 1,
            "mainSeriesProperties.lineStyle.priceSource": "close",
            //    Area styles
            "mainSeriesProperties.areaStyle.color1": t.areatop,
            "mainSeriesProperties.areaStyle.color2": t.areadown,
            "mainSeriesProperties.areaStyle.linecolor": t.border,
            "mainSeriesProperties.areaStyle.linewidth": 1,
            "mainSeriesProperties.areaStyle.priceSource": "close",

        }

       	return overrides;
    }

    getCustomCSSUrlByTheme(theme){
    	var t = this.defaultThemes[theme];

        return t.url;
    }

    showChart=(type)=>{
        this.setState({
            chart: type
        });
    }

    render() {
    	let store = this.props.tradeStore;
        let checked = store.theme === 'dark';
        let arrowCls = {}

        if (store.theme === 'dark') {
            arrowCls =  {
                fontSize: 14,
                color: '#fff'
            }
        } else {
            arrowCls =  {
                fontSize: 14,
                color:'#333333'
            }
        }

        return (
        	<div className="chart-box">
                <div className="trade-current-coin">
	                <ul className="info-list">
	                    <li className="coin" ref="coin">
	                        <Popover content={<TradeCoinList/>} placement="bottomLeft" trigger="click" getPopupContainer={()=>this.refs.coin} overlayClassName={ store.theme === 'dark' ? 'popover-tradecoins-dark' : 'popover-tradecoins-light'}>
	                            <label>{ store.currencyNameEn }</label>
	                            <Icon type="caret-down" style={arrowCls} />
	                        </Popover>
	                        <em>{ store.currentAmount }</em>
	                    </li>
	                    <li className={ store.changeRateStatus }>
	                        <label>{ UPEX.lang.template('涨幅') }</label>
	                        <em>{ store.currentCoinChangeRate }</em>
	                    </li>
	                    <li>
	                        <label>{ UPEX.lang.template('高')}</label>
	                        <em> { store.currentCoinHighPrice }</em>
	                    </li>
	                    <li>
	                        <label>{ UPEX.lang.template('低')}</label>
	                        <em>{ store.currentCoinLowPrice }</em>
	                    </li>
	                    <li>
	                        <label>{ UPEX.lang.template('24H量')}</label>
	                        <em>{ store.currentCoinVolume }</em>
	                    </li>
	                </ul>
	                <div className="theme-menu">
	                    <label>{ checked ? UPEX.lang.template('开灯') : UPEX.lang.template('关灯') }</label>
	                    <Switch
	                        onChange={this.switchTheme}
	                        defaultChecked={ this.props.tradeStore.theme === 'dark'}
	                    />
	                </div>
	            </div>
                <ul className="chart-menu">
                    <li
                        onClick={this.showChart.bind(this, 'kline')}
                        className={ this.state.chart == 'kline' ? 'selected' : ''}
                    >
                        {UPEX.lang.template('K线图')}
                    </li>
                    <li
                        onClick={this.showChart.bind(this, 'depth')}
                        className={ this.state.chart == 'depth' ? 'selected' : ''}
                    >
                        {UPEX.lang.template('深度图')}
                    </li>
                </ul>
                <div
                    id="kline-chart"
                    ref="kline"
                    className='trade-kline-chart'
                    data-show={this.state.chart == 'kline' ? 'show': 'hide'}
                />
                {
                    this.state.chart == 'depth' ? (
                        <div
                            className='trade-depth-chart'
                        >
                           <DepthChart/>
                        </div>
                    ) : null
                }
            </div>
        );
    }
}

export default TVChartContainer;
