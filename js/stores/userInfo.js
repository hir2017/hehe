import { observable, action} from 'mobx';
import { personalInfo, loginRecord } from '../api/http'

class UserInfo {
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
  
  @action addIdentityInfo (data) {
    this.identityInfo.name = data.name
    this.identityInfo.birthday = data.birthday
    this.identityInfo.idType = data.idType
    this.identityInfo.idNumber = data.idNumber
  }

}

export default UserInfo;