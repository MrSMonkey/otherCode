import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import { actions as entrustAction } from '../reducers/entrust'
import { actions as appAction } from '../reducers/app'
import { actions as modalAction } from '../reducers/modal'
import Form, { FormItem, Input, Select, Textarea } from '../components/Form'
import Modal from '../components/Modal'
import Button from '../components/Button'
import styles from './Entrust.css'
import throttle from '../utils/throttle'


@CSSModules(styles)
class InputList extends Component {
  state = {
    itemList: [],
    keyValue: '',
  }

  confirmeKey = () => {
    const { close } = this.props;
    const { form } = this.props;
    form.CityId = '';
    form.CityName = '';
    close()
  }

  render() {
    const { itemList, confirmeKey, keyValue } = this.state;
    const { close, communityKey, sreachCommunity } = this.props;
    return (
      <Modal>
        <div styleName="modal">
          <header styleName="header">
            <div styleName="text-button" onClick={close}>取消</div>
            <div styleName="header-title">请输入小区名称</div>
            <div styleName="text-button" onClick={confirmeKey}>确认</div>
          </header>
          <FormItem>
            <Input 
              // value={keyValue}
              value={communityKey}
              maxLength={16} 
              placeholder="请输入您爱屋所在的小区"
              onChange={val => {
                // this.setState({
                //   keyValue: val
                // })
                // throttle(sreachCommunity, 2000)(val)
                sreachCommunity(val)
              }}/>
          </FormItem>
          <ul styleName="list">
            {
              itemList.map((item, index) => {
                return (
                  <li key={index}>{item.name}</li>
                )
              })
            }
          </ul>
        </div>
      </Modal>
    )
  }
}

@CSSModules(styles)
class Entrust extends Component {
  state = {
    isErr: {
      Name: false,
      Phone: false,
      CityId: false,
      CityName: false,
      CommunityName: false,
    }
  }

  /** 提交*/
  sublimt = () => {
    const { form } = this.props
    const { isErr } = this.state
    console.log(isErr)

    for (let i in form) {
      const val = form[i]
      const hasOwn = isErr.hasOwnProperty(i)

      if (hasOwn) {
        if (val === '' || isErr[i]) {
          /* 验证必填项目 || 验证是否正确 */
          // console.log('hasOwn', i, hasOwn)
          // console.log('isErr',isValid,val)
          isErr[i] = true
        } else {
          isErr[i] = false
        }
      }
    }

    // console.log(isErr)
    let hasErr = false
    for (let i in isErr) {
      const val = isErr[i]
      if (val) {
        // console.log("hasErr", i, val)
        hasErr = true
        break
      }
    }

    if (hasErr) {
      this.setState({ ...isErr })
      return
    }
    // console.log('~~~~~~',hasErr)
    this.props.sublimtEntrust()
  }

  componentDidMount() {
    this.props.getCitys()
  }
  
  render() {
    const { isErr } = this.state
    const { form, citys, changeForm, isLoading, showModle, communityList, communityKey, sreachCommunity} = this.props
    return (
      <div>
        <Form data={form}>
          <h2 styleName="title">
            添加房屋信息
            <span styleName="descripe">添加爱屋信息，更好地对房屋实施评估</span>
          </h2>
          <div styleName="input-group">
            <FormItem label="城市" isErr={isErr.CityId}>
              <Select
                data={citys}
                value={form.CityId}
                placeholder="请选择您爱屋所在的城市"
                onChange={val => changeForm(val, 'CityId')}
                option={{value: 'id', text: 'cityName'}}
                verify={{
                  cb: val => this.setState({ isErr: { ...isErr, CityId: !val } })
                }}
              />
            </FormItem>
            <FormItem label="小区名称" isErr={isErr.CommunityName} onClick={showModle}>
              <Input
                value={form.CommunityName}
                maxLength={16}
                placeholder="请输入您爱屋所在的小区"
                onChange={val => changeForm(val, 'CommunityName')}
                disabled={true}
                verify={{
                  cb: val =>
                    this.setState({ isErr: { ...isErr, CommunityName: !val } })
                }}
              />
            </FormItem>
          </div>

          <h2 styleName="title">
            留下联系方式
            <span styleName="descripe">
              提交成功后，可以使用这个手机号登录查看房源动态
            </span>
          </h2>
          <div styleName="input-group">
            <FormItem label="姓名" isErr={isErr.Name}>
              <Input
                must
                value={form.Name}
                maxLength={30}
                placeholder="请输入您的称呼"
                onChange={val => changeForm(val, 'Name')}
                verify={{
                  cb: val => this.setState({ isErr: { ...isErr, Name: !val } })
                }}
              />
            </FormItem>
            <FormItem label="手机号" isErr={isErr.Phone}>
              <Input
                value={form.Phone}
                placeholder="请输入您的手机号码"
                onChange={val => changeForm(val, 'Phone')}
                verify={{
                  type: 'phone',
                  cb: val => {
                    // console.log('Phone ERR', !val)
                    this.setState({ isErr: { ...isErr, Phone: !val } })
                  }
                }}
              />
            </FormItem>
            <FormItem label="验证码" isErr={isErr.Phone}>
              <Input
                value={form.Phone}
                placeholder="请输入验证码"
                onChange={val => changeForm(val, 'Phone')}
                style={{width: '100px'}}
                verify={{
                  type: 'phone',
                  cb: val => {
                    // console.log('Phone ERR', !val)
                    this.setState({ isErr: { ...isErr, Phone: !val } })
                  }
                }}
              />
              <span styleName="code-button">获取验证码</span>
            </FormItem>
          </div>

          <h2 styleName="title">添加其他信息</h2>
          <div styleName="input-group">
            <FormItem>
              <Textarea
                value={form.Remark}
                rows={4}
                maxLength={140}
                placeholder="选填"
                onChange={val => changeForm(val, 'Remark')}
              />
            </FormItem>
          </div>
          <footer styleName="form-footer">
            <Button type="Primary" onClick={this.sublimt} disabled={isLoading}>
              提交
              {isLoading ? '中...' : ''}
            </Button>
          </footer>
        </Form>
        
        <InputList 
          form={form}
          close={showModle} 
          communityList={communityList} 
          communityKey={communityKey} 
          sreachCommunity={sreachCommunity}
        />
      </div>
    )
  }
}

export default connect(
  state => ({
    form: state.entrust.form,
    isModle: state.entrust.isModle,
    isLoading: state.entrust.isLoading,
    citys: state.app.citys,
    isShow: state.modal.isShow,
    communityList: state.entrust.communityList,
    communityKey: state.entrust.communityKey
  }),
  {
    ...entrustAction,
    ...appAction,
    ...modalAction
  }
)(Entrust)
