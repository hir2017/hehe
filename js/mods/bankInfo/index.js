/**
 * @fileoverview  用户个人信息
 * @author xia xiang feng
 * @date 2018-05-23
 */
import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
import { Select, Button, Icon, message, Upload } from 'antd';
import BankList from './banklist.json'
import banckCardImg from '../../../images/bank-card.jpg'
const Option = Select.Option;

const props = {
  name: 'file',
  action: '//jsonplaceholder.typicode.com/posts/',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

@observer
export default class BindingBank extends Component {

  constructor () {
    super()
    this.bankChange = this.bankChange.bind(this)
    this.branchesChange = this.branchesChange.bind(this)
    this.submit = this.submit.bind(this)
  }

  state = {
    branches: [],
    bamckCode: '',
    branchesCode: ''
  }

  bankChange (val) {
    const res = BankList.filter((item) => {
      return item.code === val
    })

    this.setState({
      branches: res[0].branches,
      bamckCode: val
    })
  }

  branchesChange (val) {
    this.setState({
      branchesCode: val
    })
  }

  submit () {
    if (!this.state.bamckCode) {
      message.error('请选择银行')
      return 
    }
    if (!this.state.branchesCode) {
      message.error('请选择银行分行')
      return 
    }
  }

  render() {
    return (
      <div>
        <div className="binding-bank-box">
          <div className="item">
            {UPEX.lang.template('开户人')}：**淼
        </div>
          <div className="item">
            <Select showSearch size='large' placeholder={UPEX.lang.template('选择银行')}
              onChange = {this.bankChange}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              style={{ width: 400 }}>
              {
                BankList.map((item) => {
                  return <Option key={item.id} value={item.code}>{item.name}</Option>
                })
              }
            </Select>
          </div>
          <div className="item">
            <Select showSearch size='large' placeholder={UPEX.lang.template('选择银行分行')}
              filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              onChange = {this.branchesChange}
              style={{ width: 400 }}>
              {
                this.state.branches.map((item, index) => {
                  return <Option key={index} value={item.code}>{item.name}</Option>
                })
              }
            </Select>
          </div>
          <div className="item">
            <div className="bank-card-num">
              <span className="input-lable">{UPEX.lang.template('银行账号')}</span>
              <input className="input" />
            </div>
          </div>
          <Upload {...props}>
          <div className="bank-card-upload-box ">
            {UPEX.lang.template('上传银行账户簿图片')}
            <div className="bank-card-upload">
              <Icon type="plus" />
            </div>
          </div>
          </Upload>
          <div className="item submit">
            <Button onClick={this.submit}>{UPEX.lang.template('提交')}</Button>
          </div>
        </div>
        <div className="binding-bank-message">
          <ul>
            <li>{UPEX.lang.template('行賬戶一旦新增就不能修改，請在提交前再三確認您的銀行賬戶是否正確，如有任何問題請聯繫我們；')}</li>
            <li>{UPEX.lang.template('當設定銀行賬號之後，我們會在銀行賬號上存入一元新台幣來確定賬號是否正確，这個過程大致需要三個工作日；')}</li>
            <li>{UPEX.lang.template('請按照您開戶的信息正確填寫姓名、賬戶號碼信息，并選擇正確開戶的分行名稱。有些銀行銀行會使用分行代碼中的三碼或四碼作為賬戶的開頭，這些也是需要填寫的，請不要忽略掉；')}</li>
            <li>{UPEX.lang.template('請優先依照分行代碼(並不是分行名稱)選取銀行分行，因為銀行可能隨時更改名稱，所以分行名稱並不一定準確。如果您的分行代碼並不在我們的列表中，請與我們聯繫，切勿自行選擇其他分行。')}</li>
          </ul>
          <div>
            <span className="banck-card-title">{UPEX.lang.template('事例图片')}</span>
            <img src={banckCardImg} />
            <div className="banck-card-message">{UPEX.lang.template('上傳的文件格式必須是jpg、png、jpeg 文件大小控制在10MB以内')}</div>
          </div>
        </div>
      </div>
    )
  }
}