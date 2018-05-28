import { observable, action} from 'mobx';
import { personalInfo, loginRecord } from '../api/http'

class UserInfo {
  @observable userInfo = {}
  @observable loginRecord = []
  

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
}

export default UserInfo;