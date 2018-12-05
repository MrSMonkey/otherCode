import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { actions as bindActions } from '../reducers/bind'
import { actions as entrustAction } from '../reducers/entrust'
import { actions as appAction } from '../reducers/app'
import { actions as modalAction } from '../reducers/modal'
import Form, { FormItem, Input, Select, Textarea } from '../components/Form'
import Modal from '../components/Modal'
import Button from '../components/Button'
import styles from './Entrust.css'
import throttle from '../utils/throttle'
import { localStore } from '../utils'

const isLogin = !!localStore.get('userId')

/**检索小区 */
@CSSModules(styles)
class InputList extends PureComponent {  
  static propTypes = {
    changeForm: PropTypes.func
  }
  static defaultProps = {
    changeForm: () => null
  }
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
      // keyValue: '',
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
                  activeId: ''
                })
                // sreachCommunity(val)
                throttle(sreachCommunity, 2000)(val)
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


/**获取验证码按钮 */
@CSSModules(styles)
class ValidationCodeButton extends PureComponent {
  static propTypes = {
    onCountEnd: PropTypes.func,
    onClick: PropTypes.func
  }
  static defaultProps = {
    onCountEnd: () => null,
    onClick: () => null
  }
  timeoutId = null
  totalCount = 60
  state = {
    isCounting: false,
    count: this.totalCount
  }

  countEnd = () => {
    this.countReset()
    this.props.onCountEnd()
  }
  
  countStart = () => {
    this.setState({
      isCounting: true,
    })
    this.countDown(this.countEnd)
  }

  countDown = fn => {
    let count = this.state.count
    if (!count) {
      fn && fn()
      return
    }
    this.timeoutId = setTimeout(() => {
      count--
      this.setState({
        count
      })
      this.countDown(fn)
    }, 1000)
  }

  countReset = () => {
    clearTimeout(this.timeoutId)
    this.setState({
      count: this.totalCount,
      isCounting: false
    })
  }

  onCodeButtonClick = () => {
    const { isDisabled, onClick } = this.props
    if (isDisabled) { return }
    onClick()
    this.countStart()

  }
  render() {
    const { isDisabled } = this.props
    const { count, isCounting } = this.state
    return (
      <span 
        styleName={isDisabled || isCounting ? 'code-button-display' : 'code-button'}
        onClick={this.onCodeButtonClick}>
        {isCounting ? `重发 (${count})` : '获取验证码'}
      </span>
    )
  }
}

@CSSModules(styles)
class Entrust extends Component {
  totalCount = 60
  state = {
    isErr: {
      communityName: false,
      name: false,
      phone: false,
      varityCold: false
    },
    isErrAddPhone: false
  }

  /** 提交*/
  sublimt = () => {
    const { form, changeForm } = this.props
    const { isErr, isErrAddPhone } = this.state

    for (let i in form) {
      const val = form[i]
      const hasOwn = isErr.hasOwnProperty(i)
      
      // 登录状态下不必验证联系人验证码
      if (isLogin) {
        delete isErr.varityCold
        delete isErr.phone
      }
      /* 验证必填项目 || 验证是否正确 */
      if (hasOwn) {
        if (val === '' || isErr[i]) {
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
      if (val || isErrAddPhone) {
        hasErr = true
        break
      }
    }
    
    console.log("hasErr", hasErr)
    if (hasErr) {
      this.setState({ ...isErr })
      return
    }

    /**test */
    changeForm(13333333333, 'phone')

    this.props.sublimtEntrust()
  }
  
  componentDidMount() {
    this.props.getCitys()
    if (isLogin) {
      this.props.getUserInfo()
    }
  }
  
  render() {
    const { isErr, isErrAddPhone } = this.state
    const { form, citys, genCode, changeForm, isLoading, showModle, communityList, sreachCommunity} = this.props
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
                onChange={val => {
                  const city = citys.filter(i => val == i.id)
                  changeForm(val, 'cityId')
                  changeForm(city[0].cityName, 'cityName')
                }}
                option={{value: 'id', text: 'cityName'}}
              />
            </FormItem>
            <FormItem label="小区名称" isErr={isErr.communityName} onClick={showModle}>
              <Input
                value={form.communityName}
                maxLength={16}
                placeholder="请输入您爱屋所在的小区"
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
            <span styleName="descripe" style={{display: isLogin ? 'none' : 'block'}}>
              提交成功后，可以使用这个手机号登录查看房源动态
            </span>
          </h2>
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
            {
              isLogin ? null 
                : <div>
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
                  <FormItem label="验证码" isErr={isErr.varityCold} style={{display: isLogin ? 'none' : 'block'}}>
                    <Input
                      value={form.varityCold}
                      placeholder="请输入验证码"
                      onChange={val => changeForm(val, 'varityCold')}
                      style={{width: '100px'}}
                      verify={{
                        cb: val => this.setState({ isErr: { ...isErr, varityCold: !val } })
                      }}
                    />
                    <ValidationCodeButton
                      isDisabled={this.state.isErr.phone || !form.phone}
                      onClick={genCode}
                    />
                  </FormItem>
                </div>
            }
          </div>

          <h2 styleName="title">添加其他信息</h2>
          <div styleName="input-group">
            <FormItem label="姓名">
              <Input
                must
                value={form.linkName}
                maxLength={30}
                placeholder="请输入您的称呼"
                onChange={val => changeForm(val, 'linkName')}
              />
            </FormItem>
            <FormItem label="手机号" isErr={isErrAddPhone}>
              <Input
                value={form.linkPhone}
                placeholder="请输入您的手机号码"
                onChange={val => changeForm(val, 'linkPhone')}
                verify={{
                  type: 'phone',
                  cb: val => {
                    this.setState({ 
                      isErrAddPhone: form.phone === '' ? false : !val
                    })
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
          close={() => {
            showModle()
            this.setState({ 
              isErr: { ...isErr, communityName: !!form.communityName }
            })
          }}
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
    varityCold: state.entrust.varityCold,
  }),
  {
    ...bindActions,
    ...entrustAction,
    ...appAction,
    ...modalAction
  }
)(Entrust)
