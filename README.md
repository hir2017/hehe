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

	* action
    	* 视项目级别酌情划分
	    * 比如临时页面，或者非常简单的展示页，总共代码不超过50行，可以只产出一个pages/index/index.js
	    * 比如活动页，可以不用独立action
    		* action建议是一个匿名函数，入参是store，返回一个单例

  					// 例如：
			  		export default (store) => {
      					return {
				          action1() {

    				      },

				          action2() {

          				}
			    	  }
				  }
	* store
   		* 视功能的复杂度，可以拆分成一个基础的index + 功能文件
	    * store必须是纯粹的数据和状态处理，不能有任何交互、视图的方法
    	* 注意扩展性和代码块的粒度
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
        * 需求：
            * 邮箱账号
            * 登录密码
            * 确认密码
            * 图片验证
            * 邮箱验证码
            * 邀请码[选填]
            * 同意服务条款
        * 接口：
            * 注册前发送邮箱验证码接口：[`/rechargeWithdraw/getRechargeWithdrawBillInfo[POST]`]()
            * status对照
                '0': '等审核',
                '1': '通过（财务审核状态）',
                '2': '冻结 (风控审核状态)',
                '3': '充值或提现中，初始状态',
                '4': '拒绝（风控审核状态）',
                '5': '运营待审核状态 （是风控审核通过后的状态）',
                '6': '拒绝（运营审核状态）',
                '7': '财务待审核状态（是运营审核通过后的状态）',
                '8': '拒绝（财务审核状态）',
        * 注意：
            * 区分资金变动
        * 前端交互：
            * 切换资金变动类型刷新列表
            * 分页功能
            * 点击单条记录的详情获取该记录附属信息

	* 充提币记录
* 我的订单
	* 委托中的订单
	* 已完成订单
	* 历史订单
* 服务支持


### 需求细分

#### 用户注册登录流程［QA可测试］

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

#### 首页［QA可测试］

* 首页
	* 需求
		* 引导登录注册模块
			* 若用户未登录，在banner上有一个新手引导模块。引导登录或注册
		* 币圈资讯［P1］
		* 推荐币种模块
			* 运营后台推荐币种，展示6个推荐币种。该数据是从list事件中筛选recommend=1的币种
		* 最新公告[前端获取最新6个]
			* 点击单个公告，进入公告详情页面
		* 所有币种实时行情列表
			* 默认按照24h成交量排序
			* 点击“最新价”，按照最新价（TWD）排序［降序、升序］
			* 点击“24h涨停”，按照24h涨停排序［降序、升序］
			* 点击“24h成交量”，按照24h成交量排序［降序、升序］
			* 搜索数字币［前端过滤］
			* 只看收藏［前端过滤］
			* 添加／取消收藏币种
			* 选择币种行，左侧切换该币种信息，K线图
	* 接口：
		* 最新公告列表接口：[`/announce/list`](RAP缺)
		* 所有币种事件list: [`list[socket]`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#146)
		* 用户收藏列表：[`/optional/listOptional`](RAP缺)
		* 收藏接口：[`/optional/optional`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#17)
		* 取消收藏接口：[`optional/cancleOptional`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#18)

	* 问题待确认
		* 若用户未登录，是否可进行币种收藏与取消操作

#### 我的资产［QA可测试］

* 资产信息页面
	* 需求：
		* 可用余额［基础币TWD］
		* 总资产：基础币＋交易币＝总资产［TWD单位］
		* 所有数字币资产列表
			* 输入币种名称，模糊查询币种
			* 隐藏资产［数字币总资产］为0的币种
			* 提币
			* 充币
			* 交易：跳转到交易中心，并选择对应的币种
	* 接口：
		* 资产信息接口: [`/coin/customerCoinAccount`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#78)
* 充币
	* 需求：
		* 充币用户需要到KYC1才可进行充币操作
		* 展示信息：
			* 充币地址
			* 地址二维码
			* 当前币种充币记录
			* 网络手续费: 存在固定值(0.001)和百分比两种(0%)
	* 前端交互：
		* 资产列表点击，用户若未达到KYC1，弹出框引导进行KYC1认证（身份认证）
		* 点击“复制地址”，复制充币地址

* 提币

	* 提币条件
		* KYC1通过
		* 设置交易密码
	* 需求：
		* 添加提币地址
			* 币种
			* 提币地址
			* 地址描述
			* 交易密码
		* 提交提币申请
			* 提币地址选择
			* 填写邮箱验证码
			* 填写手机短信验证或Google验证码二选择一
				* 用户绑定google，Tab: 谷歌验证码＋手机验证码，默认google验证码
				* 用户未绑定google， Tab： 手机短信验证码
	* 接口
		* 新增用户提币地址接口： [`/coin/insertTakeAddress`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#82)
		* 提币前信息查询接口：[`/coin/selectTakeCoin`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#79)
		* 提币接口：[`/coin/takeCoin`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#77)
		* 发送短信验证码接口：[`/coin/emailTakeCoin`](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#84)


* 充币提币记录
	* 需求
		* 充币记录
		* 提币记录
	* 接口：
		* 充币记录接口: [/coin/selectListByUuid](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#85)
		* 提币记录接口: [/coin/selectTakeList](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#80)
* 充值
    * 充值条件
        * KYC2通过
	* 需求：
		* 充值用户需要到KYC2才可进行充值操作
		* 展示信息：
			* 已绑定的银行卡
			* 当前充值金额
            * 金流類型
			* 银行卡所属银行
            * 绑定手机号
            * 账号名称
	* 前端交互：
		* 资产列表点击充值按钮 (用户若未达到KYC2 -> 个人中心 -> 绑定银行卡)
		* 进入充值页面，添加充值信息
        * 提交后创建充值单，显示订单信息
        * 点击充值完成后进入资产变更记录页面
    * 接口
        * 新增获取用户资金可用余额接口：[`/rechargeWithdraw/getUserAvailableAmount`]()
        * 新增获取用户已绑定的银行卡接口：[`/card/getBindBankCardInfo`]()
        * 新增获创建充值订单第三方接口：[`https://gate.pepay.com.tw/pepay/payselect_amt.php`]()

* 提现
    * 提现条件
        * KYC2通过
	* 需求：
		* 提现用户需要到KYC2才可进行充值操作
		* 展示信息：
			* 已绑定的银行卡
			* 当前提现金额
            * 当前提现金额手续费
			* 银行卡所属银行
            * 绑定手机号
            * 账号名称
	* 前端交互：
		* 资产列表点击提现按钮 (用户若未达到KYC2 -> 个人中心 -> 绑定银行卡)
		* 进入提现页面，添加提现信息
        * 进入下一步显示订单信息，填写交易密码，填写短信验证码或谷歌验证码，提交后创建提现单
        * 提交后进入资产变更记录页面
	* 接口
		* 新增获取提现手续费接口： [`/withdraw/getWithdrawCashFee`]()
		* 新增创建提现订单接口：[`/withdraw/createWithdrawCashBill`]()


* 充币提币记录
	* 需求
		* 充币记录
		* 提币记录
	* 接口：
		* 充币记录接口: [/coin/selectListByUuid](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#85)
		* 提币记录接口: [/coin/selectTakeList](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#80)


#### 我的订单［QA可测试］

* 我的订单
	* 前端工作量：3人日
	* 需求：
		* 当前委托 ［2人日］
			* 可单个撤销订单
			* 订单包括：0未成交、1部分成交
		* 委托历史［0.5人日］
			* 订单包括：2全部成交  4全部撤单 5部分成交后撤单
			* 点击查看历史详情［P1需求，TODO］
		* 已成交［0.5人日］
			* 订单包含：2全部成交
			* 根据时间段 && 币种 && 买卖。做筛选

	* 接口：
		* 当前委托订单接口：[/user/getOrderList](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#155)
		* 历史委托订单接口：[/user/trOrderDetailByCustomer](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#154)
		* 已完成委托订单接口：[/user/getTradeList](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#156)
	* 前端交互：
		* 撤销订单［修改需求］＝》撤单不需要交易密码
			* 设置了交易密码，必须填写了交易密码才可以撤销
			* 未设置交易密码，直接撤销订单

#### 个人中心［QA可测试］

* 基本信息：
	* 需求：
		* 账号：手机账号 ／邮箱账号
		* 最后登录时间，取的是personInfo.userLoginedRecord信息
		* 认证等级信息：
			* 未认证：新注册用户。“您还未进行安全级别认证”＝> 提升安全等级（跳转A级引导）
			* 身份认证：A 。提升安全等级（B级引导）
			* 银行卡绑定： B。提升安全等级（C级引导）
			* 申请视频认证：C 。无“提升安全等级”
		* 用户登录记录
	* 接口：
		* 用户信息接口: [user/personInfo](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#161)
		* 登录信息IP列表：[user/loginRecord](RAP缺)

* 身份认证
	* 前置条件：
		* 绑定手机号
	* 需求
		* 提交身份认证信息
		* 身份信息审核
		* 身份信息审核失败：
			* isAuthPrimary = -1；被拒绝，
			* authFailReason：被拒原因
		* 身份证图片上传，文件大小请控制在15MB以内, png/jpg/jpeg
        * 申请更高限额
            * isAuthVideo: -1=被拒绝; 0=正常状态,可申请; 1=审核中;
	* 接口：
		* 上传身份图片：[user/uploadImageSingle](RAP缺)
		* 身份认证：[user/submitUserInfo](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#126)
        * 申请更高限额 [user/submitUserInfo](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#126)

* 银行卡信息
	* 前置条件
		* 通过>=KYC1
		* 设置交易密码
	* 需求：
		* 绑定银行卡
			* 銀行信息
			* 分行信息
			* 銀行卡賬號
			* 上傳銀行賬戶簿照片
		* 解绑银行卡
			* 交易密码
			* 验证码
				* 若用户绑定谷歌验证，使用谷歌验证码
				* 若用户未绑定谷歌验证，短信验证码
	* 接口：
		* 银行卡绑定接口：[card/bindVerifyCardInfo](RAP缺)
		* 银行卡记录接口: [card/getBindBankCardInfo](RAP缺)
		* 上传银行卡图片: [user/uploadImageSingle](RAP缺)
		* 解绑银行卡: [card/updateBindBankCardStatus](RAP缺)
		* 解绑银行卡发送短信验证码接口：[/withdraw/sendMessageWithdraw](RAP缺)
	* 问题TODO
		* 绑定成功之后，需要reset form数据
		* 是否存在删除银行卡操作

* 修改登录密码
	* 前置条件：
		* 无
	* 需求
		* 旧登录密码
		* 新登录密码
		* 确认录密码
		* 图片验证码
		* 验证码:
			* 若用户开启了Google验证码，Google验证码
			* 若没有开启了Google验证码，若绑定手机号，手机短信验证码
			* 若没有绑定手机号，邮箱验证码
	* 接口
		* 发送短信验证码接口: [/user/bindPhoneOrEmailSendCode](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#162)
		* 修改登录密码接口：[user/resetPwdInUserCenter](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#120)
	* 前端交互
		* 修改成功，退出，引导用户重新登录
	* 问题(TODO)
		* 修改成功，退出，跳到登录页面


* 设置交易密码
	* 前置条件：
		* 绑定手机
	* 需求
		* 交易密码
		* 确认交易密码
		* 图片验证码
		* 验证码
			* 若用户开启了Google验证码，Google验证码
			* 若没有开启了Google验证码，若绑定手机号，手机短信验证码
	* 接口
		* 设置交易密码接口: [/user/bindFdPwd](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#125)
		* 设置交易密码发送短信验证码接口: [/user/bindPhoneOrEmailSendCode](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#162)
	* 前端交互
	* 问题

* 修改交易密码
	* 前置条件：
		* 设置了交易密码
	* 需求
		* 原交易密码
		* 新的交易密码
		* 确认交易密码
	* 接口
		* 修改交易密码接口：[user/modifyFdPwd](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#166)
	* 前端交互

* 忘记交易密码
	* 前置条件：
		* 设置了交易密码
	* 需求
		* 新的交易密码
		* 确认交易密码
		* 图片验证码
		* 验证码
			* 若用户开启了Google验证码，Google验证码
			* 若没有开启了Google验证码，若绑定手机号，手机短信验证码
	* 接口
		* 忘记交易密码接口：[/user/forgetFdPwd](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#167)
		* 忘记密码发送短信验证码: [user/sendMailInUserCenter](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#119)
	* 前端交互
		* 没有设置交易密码。不显示“忘记交易密码”入口

* 谷歌认证
	* 前置条件：
		* 必需先绑定手机号，否则引导用户去绑定手机
	* 需求：
		* 绑定谷歌验证码
			* 谷歌验证码
			* 图片验证码
			* 短信验证码
		* 解绑谷歌验证码[登录手机认证和谷歌认证不能同时关闭]
			* 谷歌验证码
			* 图片验证码
			* 短信验证码
		* 谷歌认证指南＝》静态展示页面
	* 前端交互：
		* 关闭操作判断：登录手机认证和谷歌认证不能同时关闭
	* 接口：
		* 发送短信验证码接口：[user/sendMailInUserCenter](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#119)
		* 绑定谷歌接口：[/security/bindGoogleAuth](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#107)
		* 解绑谷歌接口：[/security/closeGoogleAuth](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#108)
	* 后端逻辑：
		* 绑定谷歌验证码，即开启谷歌认证
		* 解绑谷歌验证码，即关闭谷歌认证

* 绑定邮箱［添加邮箱］
	* 需求：
		* 绑定邮箱
			* 邮箱账号
			* 图片验证码
			* 邮箱验证码
			* 短信验证码
	* 接口：
		* 绑定邮箱发送邮箱验证码: [user/bindPhoneOrEmailSendCode](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#162)
			* type=2、邮箱注册用户;
		* 绑定邮箱接口：[/user/bindPhoneOrEmailAction](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#164)
			* type=2、邮箱注册用户;
	* 后端逻辑：
		* 一旦您設定了電子郵箱，用户不可解绑操作

* 绑定手机：
	* 需求
		* 手机账号用户可以进行修改手机号操作
			* 新手机号
			* 图片验证码
			* 新手机短信验证码
			* 其他验证码
				* Google验证码 ＝》若用户开启了Google验证码
				* 旧的手机短信验证码 ＝》若没有开启了Google验证码
		* 邮箱账号用户可以进行绑定手机号操作
			* 手机号
			* 图片验证码
			* 手机短信验证码
			* 其他验证码
				* Google验证码 ＝》若用户开启了Google验证码
				* 旧的手机短信验证码 ＝》若没有开启了Google验证码
		* 绑定了手机号自动开启登录手机认证
		* 用户可以关闭登录手机认证
			* 登录手机认证和谷歌认证不能同时关闭
	* 接口：
		* 修改手机号：[user/modifyPhoneAction](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#124)
		* 绑定手机号：[/user/bindPhoneOrEmailAction](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#164)
			* type=1、手机注册用户
		* 绑定手机发送短信验证码: [user/bindPhoneOrEmailSendCode](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#162)
			* type=2、邮箱注册用户;
		* 修改手机发送短信验证码：[/user/modifyPhoneSendCode]()
			* type=1:google+新手机，发新手机短信；
			* type=2:旧手机+新手机，发2条手机短信
	* 前端交互
	* 问题：
		* 手机账号用户修改手机号，修改完之后，账号变成新的手机账号［是的］
		* 旧的手机号无法收到短信如何解决［不解决］

* 开启／关闭登录手机认证
	* 前置条件
		* 绑定了手机号
	* 需求
		* 关闭手机登录认证
		* 开启手机登录认证
	* 接口
		* 发送短信验证码：[/user/phoneAuthSendCode](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#168)
		* 开关接口[/user/phoneAuthSwitch](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#158)
	* 前端交互：
		* 关闭操作判断：登录手机认证和谷歌认证不能同时关闭
	* 问题（TODO）
		* 前端关闭操作判断没做


* 问题反馈

	* 接口：
		* 问题反馈列表：[user/questions](RAP缺)
		* 问题详情内容: [user/questionDetail](RAP缺)

* 反馈列表

	* 接口：
		* 问题反馈: [user/ask](RAP缺)


### 交易中心[QA可测试]

* 委托历史
	* 委托历史【买入、卖出】。按时间近-》远顺序。［100条］
	* 接口：
		* 交易历史：[tradeHistory](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#142)
* 委托队列
	* 买入队列【100条】
	* 卖出队列【100条】
	* 当同时展示【买入、卖出】时，显示10条记录
	* 接口：
		* 委托队列：[entrust](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#143)
* 委托订单
	* 用户全部委托订单
		* 实时更新最新委托中的订单。【用户下单之后，委托中订单记录实时展示】
		* 撤销操作
	* 接口：
		* 第一次委托队列查询: [/user/getOrderList](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#155)
		* 实时推送最新的委托信息：[userOrder](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#169)
* 已完成订单
	* 选择某个时间内的所有订单
		* 开始时间：startTime 2018-06-23
		* 结束时间：endTime 2018-06-24
	* 接口：
		* 第一次查询所有完成订单: [/user/getTradeList](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#156)
		* 实时推送最新的订单：[userTrade](http://13.251.82.20:8080/workspace/myWorkspace.do?projectId=2#170)
* K线图。2000条

-------

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


－－－

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



## 内容备份


[
    {
        name: '職業',
        value: 'profession',
        maps: {
                '1': '军公教',
                '2': '专业技术人员',
                '3': '行政人员',
                '4': '金融業',
                '5': '农、林、牧、渔、水利业生产人员',
                '6': '生产、运输设备操作',
                '7': '學生',
                '8': '自由职业者',
        }
    },
    {
        name: '年薪',
        value: 'annualsalary',
        maps: {
                '1': '0-50万',
                '2': '50-100万',
                '3': '150-200万',
                '4': '200-250万',
                '5': '250万以上',
        }
    },
    {
        name: '资金用途',
        value: 'useOfFunds',
        maps: {
                '1': '投資、買賣數位貨幣',
                '2': '儲存數位貨幣',
                '3': '其他',
        }
    }
]


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

