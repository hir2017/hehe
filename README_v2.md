changelog:

* 获取验证码时间间隔120秒
* 银行卡绑定：一个用户只能绑定一次

### 验证码滑动图片［网易云易盾］

描述：去掉图片验证码，改为滑动验证码。

1. 忘记密码页面
	* 手机或者邮箱发送短信接口和发送邮箱接口＝`/user/sendMail`
	* 注册接口，删除图片验证码参数：/user/resetPwd
* 注册页面：
	* 发送短信接口和发送邮箱接口＝`/user/sendEmailForRegister`
	* 注册接口，删除图片验证码参数：/user/register
* 修改交易密码接口：`user/modifyFdPwd`
* 修改登录密码接口：`user/resetPwdInUserCenter`


* 绑定手机 or 绑定邮箱（拦截发送验证码）：`user/bindPhoneOrEmailSendCode`
* 修改绑定手机（拦新手机发送验证码）：`/user/modifyPhoneSendCode`；

  	发送新手机。这个接口逻辑需要大改，建议理下，
	
	旧的： 
	
	* type=1:google+新手机，发新手机短信；
	* type=2:旧手机+新手机，发2条手机短信。
	
	＝》 
	
	* 需要改为发送新手机号才校验滑动验证码 
	* 发2条手机短信改为单独控制，分别发送


### 市价和行情价

* 市价
* 限价

### 币币交易


交互原型地址：
https://qygrv7.axshare.com



