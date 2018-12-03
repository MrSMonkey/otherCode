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
// import throttle from '../utils/throttle'


@CSSModules(styles)
class InputList extends Component {
  state = {
    itemList: [],
    keyValue: '',
    activeId: ''
  }

  confirmeKey = () => {
    const { changeForm } = this.props;
    changeForm(this.state.keyValue, 'communityName')
    changeForm(this.state.activeId, 'communityId')
    this.cancel()
  }
  
  cancel = () => {
    const { close } = this.props;
    this.setState({
      keyValue: '',
      activeId: ''
    }, close)
  }

  render() {
    const { keyValue, activeId } = this.state;
    const { sreachCommunity, communityList } = this.props;
    return (
      <Modal>
        <div styleName="modal">
          <header styleName="header">
            <div styleName="text-button" onClick={this.cancel}>取消</div>
            <div styleName="header-title">请输入小区名称</div>
            <div styleName="text-button" onClick={this.confirmeKey}>确认</div>
          </header>
          <FormItem>
            <Input 
              value={keyValue}
              maxLength={16} 
              placeholder="请输入您爱屋所在的小区"
              onChange={val => {
                this.setState({
                  keyValue: val,
                })
              }}
              onBlur={val => {
                this.setState({ activeId: '' })
                sreachCommunity(val)
                // throttle(sreachCommunity, 2000)(val)
              }}
            />
            <i className="slef-icon-close" 
              onClick={() => {
                this.setState({
                  keyValue: '',
                  activeId: '',
                })
                sreachCommunity('')
              }}></i>
          </FormItem>
          <ul styleName="list">
            {
              communityList.map(item => {
                return (
                  <li key={item.id} styleName={activeId === item.id ? 'active-item' : ''}
                    onClick={() => {
                      this.setState({
                        activeId: item.id,
                        keyValue: item.communityName
                      })
                    }}>
                    {item.communityName}
                  </li>
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
      communityName: false,
      linkName: false,
      linkPhone: false,
      name: false,
      phone: false,
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
    const { form, citys, varityCold, changeForm, isLoading, showModle, communityList, communityKey, sreachCommunity} = this.props
    return (
      <div>
        <Form data={form}>
          <h2 styleName="title">
            添加房屋信息
            <span styleName="descripe">添加爱屋信息，更好地对房屋实施评估</span>
          </h2>
          <div styleName="input-group">
            <FormItem label="城市">
              <Select
                data={citys}
                value={form.cityId}
                placeholder="请选择您爱屋所在的城市"
                onChange={val => changeForm(val, 'cityId')}
                option={{value: 'id', text: 'cityName'}}
              />
            </FormItem>
            <FormItem label="小区名称" isErr={isErr.communityName} onClick={showModle}>
              <Input
                value={form.communityName}
                maxLength={16}
                placeholder="请输入您爱屋所在的小区"
                onChange={val => changeForm(val, 'communityName')}
                disabled={true}
                verify={{
                  cb: val =>
                    this.setState({ isErr: { ...isErr, communityName: !val } })
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
            <FormItem label="姓名" isErr={isErr.linkName}>
              <Input
                must
                value={form.linkName}
                maxLength={30}
                placeholder="请输入您的称呼"
                onChange={val => changeForm(val, 'linkName')}
                verify={{
                  cb: val => this.setState({ isErr: { ...isErr, linkName: !val } })
                }}
              />
            </FormItem>
            <FormItem label="手机号" isErr={isErr.linkPhone}>
              <Input
                value={form.linkPhone}
                placeholder="请输入您的手机号码"
                onChange={val => changeForm(val, 'linkPhone')}
                verify={{
                  type: 'phone',
                  cb: val => {
                    // console.log('linkPhone ERR', !val)
                    this.setState({ isErr: { ...isErr, linkPhone: !val } })
                  }
                }}
              />
            </FormItem>
            <FormItem label="验证码">
              <Input
                value={varityCold}
                placeholder="请输入验证码"
                onChange={val => changeForm(val, 'varityCold')}
                style={{width: '100px'}}
              />
              <span styleName="code-button">获取验证码</span>
            </FormItem>
          </div>

          <h2 styleName="title">添加其他信息</h2>
          <div styleName="input-group">
            <FormItem label="姓名" isErr={isErr.name}>
              <Input
                must
                value={form.name}
                maxLength={30}
                placeholder="请输入您的称呼"
                onChange={val => changeForm(val, 'name')}
                verify={{
                  cb: val => this.setState({ isErr: { ...isErr, name: !val } })
                }}
              />
            </FormItem>
            <FormItem label="手机号" isErr={isErr.phone}>
              <Input
                value={form.phone}
                placeholder="请输入您的手机号码"
                onChange={val => changeForm(val, 'phone')}
                verify={{
                  type: 'phone',
                  cb: val => {
                    // console.log('phone ERR', !val)
                    this.setState({ isErr: { ...isErr, phone: !val } })
                  }
                }}
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
          close={showModle} 
          communityList={communityList}
          changeForm={changeForm}
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
    communityKey: state.entrust.communityKey,
    varityCold: state.entrust.varityCold
  }),
  {
    ...entrustAction,
    ...appAction,
    ...modalAction
  }
)(Entrust)
