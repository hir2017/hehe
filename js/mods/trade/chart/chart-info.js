/**
 * @fileoverview 币种信息
 * @author 陈立英
 * @date 2018-05-010
 */
import React, {Component} from 'react';
import { observer, inject } from 'mobx-react';
import '../../../lib/tradingview/charting_library.min';
import '../../../lib/tradingview/polyfills';
import '../../../lib/tradingview/test';

@inject('tradeStore','commonStore')
@observer
class CurrentChartInfo extends Component {    
	static defaultProps = {
		symbol: 'AAPL',
		interval: 'D',
		chartsStorageApiVersion: '1.0',
		fullscreen: false,
		autosize: true,
		studiesOverrides: {},
		defaultThemes: {
            "day": {
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
            "night": {
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
	}

	constructor(props){
		super(props);
	}

	componentDidMount() {
		let theme = this.props.tradeStore.theme == 'light' ? 'day' : 'night';
		let locale = this.getLocale();
		
		var cfg = {
            debug: true,
            symbol: 'AAPL', // 商品
            // 让图表占据所有可用的空间
            fullscreen: true,
            autosize: true,
            // 商品间额
            interval: this.getIntervalByPeriod(),
            // 指定要包含widget的DOM元素id
            container_id: "acex-chart",
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
            datafeed: new Datafeeds.UDFCompatibleDatafeed("https://demo_feed.tradingview.com"),
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
        	let widget = window.tvwidget = new TradingView.widget(cfg);
        	
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

                var timeline = [{
		            slug: "realtime",
		            resolution: "1",
		            chartType: 3,
		            text: UPEX.lang.template('realtime')
		        }, {
		            slug: "1min",
		            resolution: "1",
		            text: UPEX.lang.template('1min')
		        }, {
		            slug: "5min",
		            resolution: "5",
		            text: UPEX.lang.template('5min')
		        }, {
		            slug: "15min",
		            resolution: "15",
		            text: UPEX.lang.template('15min')
		        }, {
		            slug: "30min",
		            resolution: "30",
		            text: UPEX.lang.template('30min')
		        }, {
		            slug: "1hour",
		            resolution: "60",
		            text: UPEX.lang.template('1hour')
		        }, {
		            slug: "4hour",
		            resolution: "240",
		            text: UPEX.lang.template('4hour')
		        }, {
		            slug: "1day",
		            resolution: "1D",
		            text: UPEX.lang.template('1day')
		        }, {
		            slug: "5day",
		            resolution: "5D",
		            text: UPEX.lang.template('5day')
		        }, {
		            slug: "1week",
		            resolution: "7D",
		            text: UPEX.lang.template('1week')
		        }, {
		            slug: "1mon",
		            resolution: "1M",
		            text: UPEX.lang.template('1mon')
		        }];

		        // 自定义UI按钮
		        let buttons = timeline.map((item, index)=>{
		        	widget.createButton()
				        .attr('title', item.slug)
				        .on('click', function (e) { 
				        	alert("My custom button pressed!"); 
				        })
				        .append($('<span>' + item.text + '</span>'));
		        })

		        widget.chart().onIntervalChanged().subscribe(null, function(interval, obj) {
    				// obj.timeframe = "12M";
				})

                // widget.chart().setChartType(3); 设置线图类型的
                // 默认隐藏绘图工具栏
                widget.chart().executeActionById("drawingToolbarAction");
            });
        }

        if(!window.tvwidget) {
        	TradingView.onready(function() {
            	callback();
        	});
        } else {
        	callback();
        }
	}

	getLocale() {
		let lang = this.props.commonStore.language;

		switch(lang) {
			case 'zh-CN':
				lang = 'zh';
				break;
			case 'zh-TW':
				lang = 'zh_TW';
				break;
			case 'en-US':
				lang = 'en';
				break;
		}

		return lang;
	}

	getIntervalByPeriod() {
		return 1;
	}

	getOverridesByTheme(theme) {
        var t = this.props.defaultThemes[theme];
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
    	var t = this.props.defaultThemes[theme];
        
        return t.url;
    }

    render() {
    	let store = this.props.tradeStore;
        
        return (
			<div
				id="acex-chart"
				className="trade-current-iframe"
			/>
        );
    }
}

export default CurrentChartInfo;