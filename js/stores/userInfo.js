import { observable, action} from 'mobx';
import { personalInfo, loginRecord, sendCodeInUserCenter, bindFdPwd } from '../api/http'
import { message } from 'antd'

class UserInfo {
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
  addIdentityInfo (data) {
    this.identityInfo.name = data.name
    this.identityInfo.birthday = data.birthday
    this.identityInfo.idType = data.idType
    this.identityInfo.idNumber = data.idNumber
  }
  
  @action 
  async sendCode (type, imgCode, imgCodeId) {
    const res = await sendCodeInUserCenter(type, imgCode, imgCodeId)
    if(res.status !== 200) {
      console.error('sendCode error')
    } else {
      this.showCountDown = true
    }

    return res
  }

  @action 
  async bindTradingPwd (newFdPassWord, vercode, imgCode, imgCodeId) {
    this.submit_loading_tpwd = true
    const res = await bindFdPwd (newFdPassWord, vercode, imgCode, imgCodeId)
    this.submit_loading_tpwd = false
    if(res.status !== 200) {
      if (res.status === 412) {
        this.captchaStore.fetch()
      }
      message.error(res.message)
      console.error('bindTradingPwd error')
    } 
  }

}

export default UserInfo;