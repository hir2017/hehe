/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import FirstStep from '../../mods/identityAuthentication/first-step'
import SecondStep from '../../mods/identityAuthentication/second-step'
import ThirdStep from '../../mods/identityAuthentication/third-step'
import FourthStep from '../../mods/identityAuthentication/fourth-step'

@observer
class IdentityAuthentication extends Component {

  constructor () {
    super()
    this.changeStep = this.changeStep.bind(this)
  }

  state = {
    step: 1
  }

  changeStep (num) {
    this.setState({
      step: num
    })
  }

  nowStep () {
    const step = this.state.step
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
    return (
      <div className="authentication">
        <div className="authentication-title">
          {UPEX.lang.template('身份认证')}
        </div>
        <div className="authentication-content">
          {
            this.nowStep()
          }
        </div>
      </div>
    )
  }
}

export default IdentityAuthentication;