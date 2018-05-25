/**
 * @fileoverview  google 指南
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Carousel, Icon } from 'antd'
import google1 from '../../../images/google1.jpg'
import google2 from '../../../images/google2.jpg'
import google3 from '../../../images/google3.jpg'

@observer
class GoogleGuide extends Component {

  constructor () {
    super()
    this.previous = this.previous.bind(this)
    this.next = this.next.bind(this)
  }

  previous () {
    this.refs.carousel.prev()
  }

  next () {
    this.refs.carousel.next()
  }
  
  render() {
    return (
      <div>
        <div className="google-auth-title">
          {UPEX.lang.template('google认证指南')}
        </div>
        <Carousel ref="carousel">
          <div className="google-guide-img-box">
            <img src={google1} />
            <span onClick={this.next} className="right"><Icon type="right" /></span>
          </div>
          <div className="google-guide-img-box">
            <span onClick={this.previous} className="left"><Icon type="left" /></span>
            <img src={google2} />
            <span onClick={this.next} className="right"><Icon type="right" /></span>
          </div>
          <div className="google-guide-img-box">
            <span onClick={this.previous} className="left"><Icon type="left" /></span>
            <img src={google3} />
          </div>
        </Carousel>
      </div>
    )
  }
}

export default GoogleGuide;