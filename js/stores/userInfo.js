import { observable, action} from 'mobx';
import { personalInfo, loginRecord, sendCodeInUserCenter, bindFdPwd } from '../api/http'

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
  async sendCode (type) {
    const res = await sendCodeInUserCenter(type)
    if(res.status !== 200) {
      console.error('sendCode error')
    } else {
      this.showCountDown = true
    }

    return res
  }

  @action 
  async bindTradingPwd (newFdPassWord, vercode) {
    this.submit_loading_tpwd = true
    const res = await bindFdPwd (newFdPassWord, vercode)
    this.submit_loading_tpwd = false
    if(res.status !== 200) {
      console.error('bindTradingPwd error')
    } 
  }

}

export default UserInfo;