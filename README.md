# 交易所


## 项目成员

* 产品：李宏淼
* 后台开发：唐建岭、王旭含、徐琳、闽嗣强
* 前端开发：陈立英、李海洋
* UI设计：何雅荣、芮轩
* QA人员：段亮亮

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

### 前端需求内容：

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

1. 用户注册
	* 邮箱注册
	* 手机注册
* 用户登录
	* 邮箱登录
	* 手机登录
* 用户登录忘记找回登录密码
	* 邮箱方式找回
	* 手机方式找回
* 首页
	* 推荐币种列表
	* 最新公告
		* 最新公告详情
	* 所有数字币实时行情列表
	* 单个数字币24H K线图
	* 币圈资讯［第一期不支持］
* 交易中心
	* 数字币筛选
	* K线图
	* 深度图
	* 买入卖出订单列表
	* 最新交易订单列表
	* 用户订单：委托订单、已完成订单
	* 交易：买入、卖出
* 个人中心：
	* 个人信息
		* 个人基本信息
		* 绑定手机
		* 开启、关闭手机登录认证
		* 绑定邮箱
		* 身份认证
		* 绑定银行卡信息
	* 安全设置
		* 修改登录密码
		* 修改绑定手机
		* 设置交易密码
		* 修改交易密码
		* 绑定google验证
		* 解绑google认证
		* google引导指南
		* 解绑交易密码
	* 其他
		* 问题反馈
		* 反馈列表
* 我的资产
	* 数字币资产列表
	* 基础币资产、总资产信息	
	* 充值法币
	* 提现法币
	* 充币
	* 提币
	* 资金变动记录
	* 充提币记录
* 我的订单
	* 委托中的订单
	* 已完成订单
	* 历史订单
* 服务支持


### 需求细分

#### 一、用户注册登录流程

* 邮箱注册
	* 前端工作量：1人日
	* 需求：
		* 邮箱账号
		* 登录密码
		* 确认密码
		* 图片验证
		* 邮箱验证码
		* 邀请码[选填]
		* 同意服务条款
	* 接口：
		* 图片验证码接口：[`/security/getCode[POST]`](RAP缺地址)
		* 注册前发送邮箱验证码接口：[`/user/sendEmailForRegister[POST]`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#116)
		* 注册接口：[`/user/register [POST]`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#113)
	* 注意：
		* 登录密码规则：6-16位数字大小写字母组合
		* 图形验证码是为了防刷，当没有更好选择前不要去掉
	* 前端交互：
		* 输入邮箱，实时验证邮箱格式，错误提示：邮箱格式错误
		* 输入密码，实时验证密码有效期，错误提示：xxx
		* 输入二次确认密码，实时验证确认密码是否一直，不一致提示： 两次密码输入不一致［与产品流程不同，TODO产品修改］
		* 点击发送邮箱验证码，前端拦截请求：
			* 未填写邮箱账号
			* 未填写图片验证码
		* 点击提交，前端拦截请求：
			* 未填写邮箱账号
			* 未填写密码
			* 未填写图片验证码
	* 后台逻辑
		* 邮箱注册成功用户，自动绑定邮箱

* 手机注册
	* 前端工作量：1人日
	* 需求
		* 国家选择［获取手机区号，4位，例如0086］
		* 手机账号
		* 登录密码
		* 确认密码
		* 图片验证
		* 短信验证码
		* 邀请码［选填］
		* 同意服务条款
	* 接口：
		* 检查手机是否已被占用：[`/user/queryPhone[POST]`](RAP缺接口)
		* 注册前发送短信验证码接口：[`/user/sendEmailForRegister[POST]`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#116)
		* 注册接口：[`/user/register [POST]`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#113)
	* 问题
		* `/user/sendEmailForRegister`该接口干了太多事情［手机验证码 or短信验证码］＝》建议：修改接口名和请求字断
	* 前端交互
		* 输入手机
			* 实时验证手机格式，错误提示：手机号格式错误
			* 失去焦点，验证手机是否已被占用
		* 输入密码，实时验证密码有效期，错误提示：xxx
		* 输入二次确认密码，实时验证确认密码是否一直，不一致提示： 两次密码输入不一致［与产品流程不同，TODO产品修改］
		* 点击发送手机验证码，前端拦截请求：
			* 未填写手机账号
			* 未填写图片验证码
		* 点击提交，前端拦截：
			* 未填写手机账号
			* 未填写密码
			* 未填写图片验证码
	* 后台逻辑
		* 手机注册成功用户，自动绑定手机，自动开启手机登录认证开关。［用户可以在个人中心关闭该开关］

* 邮箱/手机登录
	* 前端工作量：1人日
	* 需求：
		* 手机/邮箱
		* 登录密码
		* 图片验证码
		* google验证码［用户绑定google］
		* 手机验证码[用户未绑定google && 绑定手机号 && 开启了手机登录认证开关]
	* 接口：
		* 登录第一步接口：[`/user/loginGAFirst`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#130)
		* 发送手机登录验证码接口: [`/user/loginCodeSend`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#157)
		* 登录第二步接口：[`/user/loginGASecond`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#131)
	* 前端交互：
		* 前端拦截请求：
			* 未填写邮箱／手机号
			* 未填写密码
			* 未填写图片验证码
			* 未填写谷歌验证码／手机短信验证码
	* 后台逻辑
		* 用户绑定Google认证
			* Google验证码，验证登录
		* 没有绑定Google && 绑定了手机 && 开启了手机登录认证
			* 手机短信验证码，验证
		* 没有绑定Google && 绑定了手机 && 关闭了手机登录认证
			* 不需要验证码验证
		* 邮箱注册用户没有绑定手机号
			* 不需要验证码

* 找回登录密码 - 重置密码
	* 前端工作量：1人日
	* 需求：
		* 邮箱方式
			* 邮箱账号
			* 图形验证码
			* 邮箱短信验证码
			* 新密码
			* 确认密码
		* 手机方式
			* 选择国家电话区域码select
			* 手机号
			* 图形验证码
			* 手机短信验证码
			* 新密码
			* 确认密码
	* 接口：
		* 发送找回短信验证码接口：[`/user/sendMail`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#117)
		* 重置密码接口：[`user/resetPwd`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#118)
	

* 头部导航模块
	* 前端工作量：0.5人日
	* 需求：
		* 网站多语言选择
		* 登录前UI处理 & 登录后UI处理
		* 订单明细
		* 我的订单
		* 个人中心
		* 导航栏通知 ？？？？
		* 导航栏价格提醒 ？？？？

* 底部导航模块
	* 前端工作量：0.2人日
	* 需求
		* 静态页面开发，无太多交互［简单］
	* 接口
		* 客户端下载接口：[`/client/appUrl`](RAP缺，由于客户端还没上，优先级p2)

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
			* 最新公告详情，预览页面 
	* 接口
		* 最新公告接口：/announce/list

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
* K线图
	* 前端工作量：4人日
	* 需求：
		* K线图
		* 深度图
		* 皮肤变化
	* 接口
	
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


### 绑定手机

* 邮箱账号，绑定手机
	* 选择国家电话区域码select
	* 手机号
	* 手机验证码［发送到填写的手机］
	* 其他	
		* 绑定手机默认开启：登录手机认证
		
### 开启／关闭手机登录认证开关

* 关闭手机登录验证开关
	* 手机短信验证码
	* 判断：
		* 关闭操作判断：登录手机认证和谷歌认证不能同时关闭

### 绑定邮箱

* 手机账号，绑定邮箱
	* 邮箱
	* 邮箱验证码［发送到填写的邮箱账号］
	* 手机
	

### 修改绑定的手机	

* 修改绑定手机
	* 选择新手机国家电话区域码select
	* 新手机号
	* 新手机号短信验证码［发送验证码］
	* 逻辑处理
		* 若用户开启了Google验证码，Google验证码
		* 若没有开启了Google验证码，旧的手机短信验证码
	* 问题：
		* 手机账号是否可以修改手机号，修改完之后，账号是否变成新的手机号
		* 旧的手机号无法收到短信如何解决［不解决］

### 修改登录密码

* 修改登录密码
	* 旧密码
	* 新密码
	* 新确认密码
	* 逻辑处理
		* 若用户开启了Google验证码，Google验证码
		* 若没有开启了Google验证码，若绑定手机号，手机短信验证码
		* 若没有绑定手机号，邮箱验证码


### 绑定谷歌验证／重置谷歌验证

* 绑定谷歌认证
	* 谷歌验证码
	* 短信验证码
	* 前置条件：	
		* 必需先绑定手机号，否则引导用户去绑定手机
	* 其他：
		* 绑定谷歌认证，默认开启谷歌认证

### 开启／关闭谷歌登录认证

* 开启谷歌登录认证
	* 谷歌 	
	* 其他 	
		* 关闭操作判断：登录手机认证和谷歌认证不能同时关闭 
		
### 开启／关闭谷歌认证

* 开启谷歌认证
	* 谷歌验证码认证
		
### 设置交易密码

* 设置交易密码
	* 手机短信验证码
	* 交易密码
	* 确认交易密码
	* 前置条件：	
		* 必需先绑定手机号，否则引导用户去绑定手机

### 开启／关闭交易密码开关

* 交易密码，校验

### 绑定银行卡

* 交易密码，校验


### 充币

* 充币：
	* 不需要任何条件就可以充币	
	
	
### 添加提币地址

* 目前：交易密码



### 删除提币地址


### 提币	

### 充值

### 提现


----

## 前端开发工期评估

| 模块名称 | 负责人 | 工时 | 备注|
| -- | -- | -- | -- |-- |
| ［P0］登录模块、注册模块、找回密码 | @陈立英 | 1人日 | Done，TODO 谷歌二次验证
| ［P0］头部导航、底部导航 | @陈立英 | 0.5人日 | UI Done
| ［P0］首页／推荐币种列表，24H K线图 | @夏祥峰 | 1人日 | 
| ［P0］首页／所有币种列表，筛选 | @夏祥峰 | 1人日 | 
| ［P0］首页／货币详情，24H K线图 | @夏祥峰 | 1人日  | 
| ［P0］首页／最新公告 | @陈立英 | 0.1人日 | Done 
| ［P0］首页／最新公告详情 |  | 0.1人日 | 例如：/announce/preview/301
| ［P0］首页／币圈资讯 | @陈立英 | 0.1人日 | UI Done，接口待确定
| ［P0］交易中心／币种筛选 | | 0.5人日 | | 
| ［P0］交易中心／K线图 | | 3人日 | K线图，皮肤切换| 
| ［P0］交易中心／深度图 | | 1人日 | 皮肤切换 | 
| ［P0］交易中心／卖出订单 | | 0.5人日 | | 
| ［P0］交易中心／买入订单 | | 0.5人日 | | 
| ［P0］交易中心／最新交易订单 | | 0.5人日 | | 
| ［P0］交易中心／委托中订单| | 1人日 |  | 
| ［P0］交易中心／已完成的成交订单 | | 1人日 | | 
| ［P0］交易中心／买入卖出 | | 2人日 | | 
| ［P0］个人中心／个人信息 | | 2人日 | | 
| ［P0］个人中心／安全设置 | | 2人日 | | 
| ［P1］个人中心／FAQ | | 1人日 | |
| ［P0］我的订单／当前委托 | | 2人日 | 筛选：币种，时间，买卖类型 | 
| ［P0］我的订单／委托历史／列表 | | 0.5人日|  | 
| ［P0］我的订单／委托历史／取消卖单、 取消买单、取消全部 | | 1人日|  | 
| ［P0］我的订单／已成交订单 | | 1人日 | 筛选：币种，时间，买卖类型  | 
| ［P0］我的订单／成交详情 | | 0.5人日 | | 
| ［P0］我的资产／资产页面／基本信息 | | 0.5人日 | | 
| ［P0］我的资产／资产页面／资产列表 | | 1人日 | | 
| ［P0］我的资产／资产页面／充值／提现订单 | | 0.5人日 | | 
| ［P0］我的资产／资产页面／充币记录 | | 0.5人日 | | 
| ［P0］我的资产／资产页面／提现记录 | | 0.5人日  | | 
| ［P1］新闻中心页面 | | 0.5人日 | | 
| ［P1］帮助中心页面 |  | 0.5人日 | | 
| ［P1］客户端下载聚合页 | －－ | 0.5人日 |  |  


* 整体联调时间：2人日 
* 前端总工作量： 28.2 - 2 = 26.2人日

* 离提测：2 ＋ 26.2 ＝ 28.2人日


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


短信验证码：手机验证码接口


－－－


一、登录注册流程修改：

1、登录接口修改，添加验证码验证

* 开启了Google验证码，谷歌验证码验证。
* 手机账号并开启了登录手机验证，手机短信验证码
* 邮箱帐号，绑定了手机并开启了登录手机验证，手机短信验证码
* 邮箱帐号，未绑定了手机，不需要验证码。


账号名称 ＋ 密码 ＋ 图形验证码 ＝  第一次登录。＝》返回对应验证码的方式
账号名称 ＋ 密码 ＋ (Google验证码自动发，手机短信、邮箱验证码用户手动发送)。 ＝  第二次登录


1、第一次登录接口

2、第二次登录接口

3、发送手机验证码或邮箱验证码接口



二、个人中心接口

1、 设置异地登录提醒开关接口

* 手机账号：手机短信通知
* 邮箱帐号：绑定手机手机短信，手机短信通知
* 邮箱帐号：没有绑定手机号，邮箱邮件通知
	
2、修改KYC接口，根据新的产品需求作KYC1、KYC2的验证

KYC2：法币账户总金额 > 60,000TWD

不同等级、KYC1. KYC2 [提现＋提币]。

* 单笔限额 TWD
* 每日限额 TWD


限额按汇率计算的TWD金额。

3、绑定银行卡接口


* 设置交易密码＝》绑定银行卡
* 绑定手机号＝》发送短信验证码，设置交易密码
* 交易密码安全等级低、中、高，6位以上大小写字母［前端先调研］

4、银行卡记录接口，就是历史银行列表，可以进行删除操作

5、银行操作记录删除操作

6、交易密码设置接口：添加短信验证码

7、谷验证码开启：谷歌验证码＋短信验证码 ＝》绑定

－－－

三、充值、提现、充币、提币流程：

每个流程的安全认证：


充币：

* 条件：
	* KYC1［充币条件］
	
提币：

* 提币条件
	* KYC1通过
	* 设置交易密码，填写交易密码
	* 填写邮箱验证码
	* 填写手机短信验证或Google验证码二选择一


提现：

* 提现条件
	* KYC2通过
	* 设置交易密码，填写交易密码
	* 填写手机短信验证或Google验证码二选择一


充值：
 
* 充值条件
 	* KYC2通过




1、充值接口

2、根据提现金额计算手续费接口［提现手续费］

3、根据提币金额计算手续费接口［提币手续费］

4、提现接口

5、法币提现记录

6、法币充值记录


---

### 充值提现用户信息接口

request:


	{
		uid : '',
		token: '',
	}

response:

	{
    	"attachment": {
    		// 银行卡信息
    		bankCards: [
    			{    		
    				providerId: "12121212dehheehde", // 绑定银行卡key
    				providerName: "招商银行",
    				providerSubbranch: "支行", 
    				providerNo: "1996", // 卡号最后四位
    				showUserName: "陈立英"
    			}
    		],
			accountAmount: 1000, // 账户TWD余额
    	},
	    "message": null,
    	"status": 200
	}


### 充值下单接口


request:


	{
		uid : '',
		token: '',
		balance: 0, // 充值金额
		providerId: "",
		currencyId: 1			
			
	}


response: 
	
	
	
	{
		"attachment": SYS_CODE: "", // 系統信任碼 ［测试环境参数］
    		 SHOP_CODE: "", // 厂商信任碼［测试环境参数］
		     SHOP_ID: '', // 廠商代碼
    		 ORDER_ID: '', // 订单编号
    		 ORDER_ITEM: '', // 商品名稱
    		 AMOUNT: '', // 金额
    		 CURRENCY: '', // 幣別 TWD
             CHECK_CODE: '', // 檢查碼 MD5([SYS_CODE, SHOP_ID, ORDER_ID, AMOUNT, SHOP_CODE].join('#'))
             PAY_TYPE: '', // 預設消費類型
             SUB_PAY_TYPE: '', // 子消費類型啟用
             PROD_ID: '', // 金流代碼
             SHOP_PARA: '', // 廠商自訂參數 {
			
		},
		"message": null,
    	"status": 200
	}
	
	// 错误
	// 1. 交易密码错误
	// 2. 谷歌验证码
	{
		
	}


### 提现下单接口

* 通过>=KYC1
* 设置了交易密码

* 验证码：
	* 绑定google：谷歌验证码
	* 未绑定google： 短信验证码	


request:


	{
		uid : '',
		token: '',
		balance: 0, // 充值金额
		providerId: "" , // 绑定银行卡key
		fdPwd: "",
		code: "" // 谷歌验证码或者短信验证码
		currencyId: 1 // 1: TWD
	}


response: 
	

	{
		"attachment": {},
		"message": null,
    	"status": 200
	}
	
	// 错误
	// 1. 交易密码错误
	// 2. 谷歌验证码
	{
		
	}



### 充值记录接口



### 提现记录接口


### 绑定银行卡

* 通过>=KYC1
* 交易密码设置

request: 

	{
		uid: '',
		token: '',
		bankName: '', //   银行卡
		bankBranch: '',  // 支行
		bankNo: '', //银行卡号
		bankPic: "", //  银行卡图片
	}

response:

	{
		"attachment": {},
		"message": null,
    	"status": 200
	}
	


### 银行卡账号纪录

request: 

	{
		uid: '',
		token: '',		
	}
	

response:

 	{
		"attachment": [
			{
				createTime: '',
				bankName: '',
				bankBranch: '',
				bankNo: '',
				status: '',
				id: '',
			}
		],
		"message": null,
    	"status": 200
	}



---


KYC1： 银行卡账户本子


## 问题记录

待确认问题：

* mobx多语言处理
* TODO antd 按需加载 

### antd 组件js&css按需加载
	
1. 安装babel-plugin-import

	npm install babel-plugin-import --save-dev

2. 配置webpack.config.js

	plugins: ['transform-remove-strict-mode', 'transform-decorators-legacy', ["import", [{ "libraryName": "antd", "style": "css" }]]]
* 注册的时候，密码不加密，登录的时候前端md5加密

* TODO 谷歌二次确认，在用户中心开启了谷歌校验之后
* 用户uid\ usertoken的有效期

### 单位（基础币）、金额（基础币）、数量（交易币）

### 数字取舍采用的策略：舍去

## changelog

