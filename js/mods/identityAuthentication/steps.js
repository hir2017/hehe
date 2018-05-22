/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import oneStep from '../../../images/one-step.png'
import twoStep from '../../../images/two-step.png'
import threeStep from '../../../images/three-step.png'

@observer
export default class Steps extends Component {

  line () {
    return <div className="line">
      -------------------------
    </div>
  }

  render() {
    return (
      <div>
        <div className="one-step step">
          <span>
            <img src={oneStep} />
          </span>
          <span>{UPEX.lang.template('基本信息')}</span>
        </div>
        {
          this.line()
        }
        <div className="two-step step">
          <span>
            <img src={twoStep} />
          </span>
          <span>{UPEX.lang.template('身份认证')}</span>
        </div>
        {
          this.line()
        }
        <div className="three-step step">
          <span>
            <img src={threeStep} />
          </span>
          <span>{UPEX.lang.template('安成认证')}</span>
        </div>
      </div>
    )
  }

}