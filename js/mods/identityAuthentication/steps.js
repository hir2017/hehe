/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';

import no_oneStep from '../../../images/no-one-step.png'
import no_twoStep from '../../../images/no-two-step.png'
import no_threeStep from '../../../images/no-three-step.png'
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
    const stpe = this.props.step
    return (
      <div>
        <div className="one-step step">
          <span>
            <img src={stpe === 1 ? no_oneStep : oneStep} />
          </span>
          <span>{UPEX.lang.template('基本信息')}</span>
        </div>
        {
          this.line()
        }
        <div className="two-step step">
          <span>
            <img src={stpe === 3 ? twoStep : no_twoStep} />
          </span>
          <span>{UPEX.lang.template('身份认证')}</span>
        </div>
        {
          this.line()
        }
        <div className="three-step step">
          <span>
            <img src={stpe === 4 ? threeStep : no_threeStep} />
          </span>
          <span>{UPEX.lang.template('安成认证')}</span>
        </div>
      </div>
    )
  }

}