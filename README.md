# 交易所


## 项目成员

* 产品
* 后台开发
* 前端开发
* UI设计
* QA人员

## 网站技术栈

* nodejs
* pm2
* express + webpack // 多页架构
* reactjs + mobx
* zeptojs


### zeptojs

Zepto不支持旧版本的Internet Explorer浏览器(<10)。

浏览器支持

初级 (100% 支持)

* Safari 6+ (Mac)
* Chrome 30+ (Windows, Mac, Android, iOS, Linux, Chrome OS)
* Firefox 24+ (Windows, Mac, Android, Linux, Firefox OS)
* iOS 5+ Safari
* Android 2.3+ Browser
*  Internet Explorer 10+ (Windows, Windows Phone)

次要目标（完全或大部分支持）

* iOS 3+ Safari
* Chrome <30
* Firefox 4+
* Safari <6
* Android Browser 2.2
* Opera 10+
* webOS 1.4.5+ Browser
* BlackBerry Tablet OS 1.0.7+ Browser
* Amazon Silk 1.0+
* Other WebKit-based browsers/runtimes


## 开发规范

### 项目开发规范

* 目录及文件划分规范
	* 模型、视图、交互必须独立文件且统一命名
		* 所有的文件夹、文件名必须是小写单词，严禁使用驼峰命名
		* 如果需要多个单词组合的名称，可以使用中横线分隔，例如： 	
		
				|-mods           
					|-list-item【正确】           
						|-index       
					|-betbar【正确】          
						 |-index       
					|-playGround【错误】           
						|-index

	* 标准目录结构   

			|-src   
				|-pages // 页面目录           
					|-home                            
						|-index.js       
					|-trade-center
						|-index.js       
				|-mods // 视图模块目录           
					|-header
					|-footer              
				|- store // 数据模型目录           
					|-index.js
				|- lib 组件目录
				|- lang 多语言目录
					|-index.js
					|-pack.js // 语言包
		
	* 项目分支规范
		* 新项目，分支命名 daily/0.0.1
		* 每次迭代开发，升一个中版本，daily/0.1.0，为什么这么做？
    		* 在开发期间，可能存在修复线上故障，需要发版
    		* 在开发期间，可能存在紧急需求，需要发版
    		* 为了避免开发中途发版时不知所措的情况，请每次迭代开发，升级一个中版本，百利而无一害
		* 底层优化，代码重构，视情况升级中版本或大版本
		* 项目大改版，必须升级大版本，既：daily/1.0.0，daily/2.0.0
	* 图片规范
		* 一般图片上传之前，建议使用tiny压缩一下
		* tiny地址：https://tinypng.com/
		* 小图片，一般建议使用png24格式
		* 能用iconfont尽量用iconfont
	

## 项目内容

### 前端需求点：

* 交易中心多套皮肤可选［2种］
* 国际化多语言：
	* 多语言翻译文档：https://docs.google.com/spreadsheets/d/1SAiY0rhwJl01xfA6BZdS53z1JJwg0XvEEEYCiv6mrNM/edit?ouid=108442476206838687260&usp=sheets_home&ths=true
	* UPEX.lang.template('key')
* 网站页面自适应［兼容：PC、iPad、移动端H5］
* google分析埋点：
* 数美反欺诈：
* 浏览器兼容性: 
	* 资料：http://www.wikiwand.com/en/Usage_share_of_web_browsers 
	* Chrome (Windows, Mac, Android, iOS, Linux, Chrome OS)
	* Internet Explorer 10+、Edge (Windows, Windows Phone)
	* Firefox(Windows, Mac, Android, Linux, Firefox OS)
	* Safari (Mac)
	* 其他：UC浏览器、Opera

### 前端功能列表


1. 登录 & 账号注册
	* 前端开发工作量：0.5人日
	* 需求：
		* 账号登录
			* 邮箱账号登录
			* 手机账号登录
		* 账号注册
			* 邮箱注册
				* 邮箱
				* 密码
				* 确认密码
				* 图片验证
				* 邮箱验证码
				* 邀请码
			* 手机注册
				* 国家选择［获取手机区号］
				* 手机号
				* 密码
				* 确认密码
				* 图片验证
				* 手机验证码
				* 邀请码
	* 接口：
		* 获取图片验证码接口: /security/getCode。详见接口附件
		* 查询手机号是否被占用接口：/user/queryPhone。详见接口附件
		* 发送邮箱／手机验证码接口：/user/sendEmailForRegister。详见接口附件
		* 用户账号注册接口：/user/register。详见接口附件


* 头部导航模块
	* 前端工作量：0.3人日
	* 需求：
		* 网站主题颜色选择
		* 网站多语言选择
		* 登录前UI处理 & 登录后UI处理
		* 导航栏通知 ？？？？
		* 导航栏价格提醒 ？？？？
	* 接口：

* 底部导航模块
	* 前端工作量：0.2人日
	* 需求
		* 静态页面开发，无太多交互［简单］
	* 接口
		* 客户端下载接口：/client/appUrl。详见接口附件

* 首页
	* 前端工作量：2人日
	* 需求：
		* 未登录用户引导模块
		* 广告位，图片list存储前端项目images文件夹中
		* 货币详情
			* 全部货币行情列表。默认按照24h成交量排序
			* 货币24小时K线数据
			* 按照最新价（TWD）排序
			* 按照24h涨停排序
			* 按照24h成交量排序
			* 筛选。只看收藏
			* 筛选。索索数字币
		* 币圈资讯［新模块，爬虫PHP，需求待确认］
		* 最新公告
	* 接口
		* 最新公告接口：/announce/list

* K线图
	* 前端工作量：4人日
	* 需求：
		* K线图
		* 深度图
		* 皮肤变化
	* 接口

* 交易中心
	* 前端工作量：5人日
	* 需求：
		* K图
		* 币种筛选
		* 实时行情数据
		* 限价交易	
		* 市价交易
		* 深度5档
		* 更多深度
		* 合并深度
		* 教学贴士
		* 委托记录
* 我的资产
	* 前端工作量：
	* 需求：
		* 基本信息
		* 币种资产列表
			* 填写数字币
			* 隐藏资产为0的货币
			* 去充币。页面待定
			* 去提币。页面待定
			* 去交易。去交易中心页，且选择对应的币种
		* 银行卡充值
		* 银行卡提现
		* 充值记录
			* 查看详情
		* 提现记录
			* 查看详情
		* 兑换GTO［P2 二期］
	* 接口：
		
* 我的订单
	* 前端工作量：3人日
	* 需求：
		* 当前委托 ［2人日］
			* 取消全部卖单
			* 取消全部买单
			* 取消全部买卖单
			* 单个取消
		* 委托历史［0.5人日］
			* 查看成交详情
		* 已成交［0.5人日］
			* 根据时间段 && 币种 && 买卖。做筛选
		* 成交详情
	* 接口
* 个人中心
	* 前端工作量：6人日
	* 需求：
		* 个人信息 ［1人日］
			* 最近登录/ip地址
			* 安全级别显示
			* 认证级别显示
			* 资产详情		
			* 账户明细
		* 安全设置［2人日］
			* 安全设置（登录密码修改、邮箱绑定、手机号码修改、交易密码设置、GA认证)
			* 实名初级认证KYC1（姓名、身份证号）
			* 实名高级认证KYC2（手持身份证）
			* 视频认证KYC3
		* 资产管理［1人日］
			* 币种提现
			* 币种提现
		* 支持［1人日］
			* FAQ
			* 问题反馈
		* 通知 	
			* 站内通知
			* 邮件通知
			* 短信通知
			* 价格提醒通知
	* 接口：
* 新闻中心
	* 前端工作量：0.5人日
* 帮助中心
	* 前端工作量：0.5人日
* 客户端下载聚合页
	* 前端工作量：0.5人日


＊ 前端总工作量： 

## 需求细分



## 时间计划


## 数据接口API


### 获取验证码 security/getCode

request:

	{
		local: zh_TW
	}

response: 

	{
		attachment: {
			IMGCode: '',
			codeUUID: '',
		},
		message: '',
		status : 200
	}

### 发送验证码 /user/sendEmailForRegister

request:

	{
		email: 13167374479
		imgcode: Gpjth
		codeid: 19229c321bfd47fabb7135af7e034f0a
		local: zh_TW
	}

response: 

	{
	    "attachment": null,
	    "message": null,
	    "status": 200
	}

### 注册

request 

	{
		email: 13167374479
		pwd: Cly123456
		vercode: B0XHWL
		inviteId: 
		imgcode: Gpjth
		codeid: 19229c321bfd47fabb7135af7e034f0a
		local: zh_TW
	}

response 

	{
	    "attachment": null,
	    "message": null,
	    "status": 200
	}

### 客户端下载接口 client/appUrl：

request: 

无

response:

	{
	    "attachment": {
	        "iosUrl": "https://www.baidu.com",
	        "androidUrl": "https://www.baidu.com",
	        "base64IosUrl": "iVBORw0KGgoAA==",
	        "base64AndroidUrl": "iVBORw0KGgoAA=="
	    },
	    "message": null,
	    "status": 200
	}

### 最新公告列表接口：/announce/list

request:
 
	{
		num: 10 // 页码
	}

response:

	{
	    "attachment": [{
	        "announceId": 297,
	        "title": "【最新消息】CHAOEX關於WICC交易贏金條活動的公告  ",
	        "content": null,
	        "desc": "",
	        "authorName": null,
	        "authorId": null,
	        "publishTime": "2018-05-03 13:13:00.0",
	        "createTime": null,
	        "outofTime": null,
	        "status": null,
	        "local": null,
	        "linkId": null
	    },
	    {
	        "announceId": 296,
	        "title": "【最新消息】關於炒客網恢復CODE充提的公告",
	        "content": null,
	        "desc": "",
	        "authorName": null,
	        "authorId": null,
	        "publishTime": "2018-04-28 12:07:00.0",
	        "createTime": null,
	        "outofTime": null,
	        "status": null,
	        "local": null,
	        "linkId": null
	    },
	    {
	        "announceId": 294,
	        "title": "【最新消息】CHAOEX關於ERC-20 Token恢復充值的公告 ",
	        "content": null,
	        "desc": "",
	        "authorName": null,
	        "authorId": null,
	        "publishTime": "2018-04-26 14:49:00.0",
	        "createTime": null,
	        "outofTime": null,
	        "status": null,
	        "local": null,
	        "linkId": null
	    }],
	    "message": null,
	    "status": 200
	};


## 问题记录

待确认问题：

* mobx多语言处理
* TODO antd 按需加载 

### antd 组件js&css按需加载
	
1. 安装babel-plugin-import

	npm install babel-plugin-import --save-dev

2. 配置webpack.config.js

	plugins: ['transform-remove-strict-mode', 'transform-decorators-legacy', ["import", [{ "libraryName": "antd", "style": "css" }]]]

## changelog