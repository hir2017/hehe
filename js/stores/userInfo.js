import { observable, action } from 'mobx';
import { 
  personalInfo, loginRecord, 
  sendCodeInUserCenter, 
  bindFdPwd, resetPwdInUserCenter,
  bindPhoneSendMsg } from '../api/http'
import { message } from 'antd'

class UserInfo {
  @observable submit_loading_pwd = false
  @observable submit_loading_tpwd = false
  @observable showCountDown = false
  @observable userInfo = {}
  @observable loginRecord = []
  @observable identityInfo = {
    name: '',
    birthday: '',
    idType: '',
    idNumber: '',
  }

  constructor(stores) {
    this.captchaStore = stores.captchaStore;
  }

  @action
  async getUserInfo() {
    const res = await personalInfo()
    this.userInfo = res.attachment
  }

  @action
  async getLoginRecord() {
    const res = await loginRecord()
    this.loginRecord = res.attachment
  }

  @action
  addIdentityInfo(data) {
    this.identityInfo.name = data.name
    this.identityInfo.birthday = data.birthday
    this.identityInfo.idType = data.idType
    this.identityInfo.idNumber = data.idNumber
  }

  @action
  async sendCode(type, imgCode, imgCodeId) {
    const res = await sendCodeInUserCenter(type, imgCode, imgCodeId)
    if (res.status !== 200) {
      console.error('sendCode error')
    } else {
      this.showCountDown = true
    }

    return res
  }

  @action
  async bindSendCode(imgCode, imgCodeId, type, phone) {
    const res = await bindPhoneSendMsg(imgCode, imgCodeId, type, phone)
    if (res.status !== 200) {
      console.error('bindSendCode error')
    }

    return res
  }

  @action
  async bindTradingPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord) {
    try {
      this.submit_loading_tpwd = true
      const res = await bindFdPwd(newFdPassWord, vercode, imgCode, imgCodeId, passWord)
      this.submit_loading_tpwd = false
      if (res.status !== 200) {
        if (res.status === 412) {
          this.captchaStore.fetch()
        }
        message.error(res.message)
        console.error('bindTradingPwd error')
      } else {
        message.success(UPEX.lang.template('交易密码设置成功'))
      }
    } catch (e) {
      console.error(e)
      this.submit_loading_tpwd = false
      message.error('Network Error')
    }
  }

  @action
  async resetPwd(newPassWord, vercode, imgCode, imgCodeId, passWord) {
    try {
      this.submit_loading_pwd = true
      const res = await resetPwdInUserCenter(newPassWord, vercode, imgCode, imgCodeId, passWord)
      this.submit_loading_pwd = false
      if (res.status !== 200) {
        if (res.status === 412) {
          this.captchaStore.fetch()
        }
        message.error(res.message)
        console.error('resetPwd error')
      } else {
        message.success(UPEX.lang.template('登录密码修改成功，请从新登录'))
      }
    } catch (e) {
      console.error(e)
      this.submit_loading_pwd = false
      message.error('Network Error')
    }
  }
}

export default UserInfo;