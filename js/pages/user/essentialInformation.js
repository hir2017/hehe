/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-21
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import Info from '../../mods/essentialInformation/info'
import List from '../../mods/essentialInformation/loginedList'
@observer
class Information extends Component {
    render() {
        return (
          <div>
            <Info/>
            <List/>
          </div>
        )
      }
  }
  
  export default Information;