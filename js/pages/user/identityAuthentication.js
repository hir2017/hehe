/**
 * @fileoverview  身份认证
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FirstStep from '../../mods/identityAuthentication/first-step'
import SecondStep from '../../mods/identityAuthentication/second-step'
import ThirdStep from '../../mods/identityAuthentication/third-step'
import FourthStep from '../../mods/identityAuthentication/fourth-step'

@inject('userInfoStore')
@observer
class IdentityAuthentication extends Component {

  constructor () {
    super()
    this.changeStep = this.changeStep.bind(this)
  }

  state = {
    step: null
  }

  componentWillMount() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    Object.keys(userInfo).length || this.props.userInfoStore.getUserInfo()
  }

  changeStep (num) {
    this.setState({
      step: num
    })
  }

  nowStep (_step) {
    const step = _step
    if (step === 1) {
      return <FirstStep changeStep={this.changeStep}/>
    }
    if (step === 2) {
      return <SecondStep changeStep={this.changeStep}/>
    }
    if (step === 3) {
      return <ThirdStep changeStep={this.changeStep}/>
    }
    if (step === 4) {
      return <FourthStep />
    }
  }

  render() {
    const userInfo = this.props.userInfoStore.userInfo || {}
    let step = 1
    if (userInfo.isAuthPrimary === 2) {
      step = 4
    }
    if (userInfo.isAuthPrimary === 1 || userInfo.isAuthPrimary === -1) {
      step = 3
    }
    return (
      <div className="authentication">
        <div className="authentication-title">
          {UPEX.lang.template('身份认证')}
        </div>
        <div className="authentication-content">
          {
            this.nowStep(this.state.step || step)
          }
        </div>
      </div>
    )
  }
}

export default IdentityAuthentication;