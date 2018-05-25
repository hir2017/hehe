/**
 * @fileoverview  google 指南
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Carousel } from 'antd'
import google1 from '../../../images/google1.jpg'
import google2 from '../../../images/google2.jpg'
import google3 from '../../../images/google3.jpg'

@observer
class GoogleGuide extends Component {
  render() {
    return (
      <div>
        <div className="google-auth-title">
          {UPEX.lang.template('google认证指南')}
        </div>
        <Carousel>
          <div className="google-guide-img-box">
            <img src={google1} />
          </div>
          <div>
            <img src={google2} />
          </div>
          <div>
            <img src={google3} />
          </div>
        </Carousel>
      </div>
    )
  }
}

export default GoogleGuide;