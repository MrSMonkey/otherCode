import React, { Component, PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { actions as bindActions } from '../reducers/bind'
import { actions as entrustAction } from '../reducers/entrust'
import { actions as appAction } from '../reducers/app'
import { actions as modalAction } from '../reducers/modal'
import Form, { FormItem, Input, Select, Textarea } from '../components/Form'
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CS
import Modal from '../components/Modal'
import Alert from '../components/Alert'
import Button from '../components/Button'
import styles from './Entrust.css'
import { localStore } from '../utils'
import { addClass, hasClass, removeClass } from '../utils'

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
    activeId: ''
  }

  confirmeKey = () => {
    const { changeForm, communityKey, communityList } = this.props;
    console.log(communityKey)
    if (communityList.length > 0) {
      if (this.state.activeId == '') {
        Toast.info('请选择小区', 3);
        return false
      }
    }
    this.setState({
      activeId: '',
    })
    changeForm(communityKey, 'communityName')
    changeForm(this.state.activeId, 'communityId')
    setTimeout(() => {
      this.props.close()
    }, 0)
  }

  /**检索小区 */
  searchKey = (val) => {
    const { sreachCommunity, changeCommuntiyKey } = this.props;
    changeCommuntiyKey(val);
    //防抖处理
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      sreachCommunity();
    }, 1000);
  }
  
  render() {
    const { activeId } = this.state;
    const { communityList, communityKey, changeCommuntiyKey, close, clearCommunityList } = this.props;
    return (
      <div styleName="modal">
        <header styleName="header">
          <div styleName="text-button" onClick={close}>取消</div>
          <div styleName="header-title">请输入小区名称</div>
          <div styleName="text-button-primary" onClick={this.confirmeKey}>确认</div>
        </header>
        <FormItem>
          <Input
            value={communityKey}
            maxLength={16} 
            placeholder="请输入您爱屋所在的小区"
            onChange={this.searchKey}
            onBlur={event => {
                //页面移动到顶部，解决 ios 键盘关闭后页面上移的问题
              document.documentElement.scrollTop = document.body.scrollTop = 0;
            }}
          />
          <i className="slef-icon-close" 
            onClick={() => {
              this.setState({
                activeId: '',
              })
              changeCommuntiyKey('')
              clearCommunityList()
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
                    })
                    changeCommuntiyKey(item.communityName)
                  }}>
                  {item.communityName}（{item.address}）
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}

/**选择城市 */
@CSSModules(styles)
class OptionCity extends PureComponent {  
  static propTypes = {
    changeForm: PropTypes.func
  }
  static defaultProps = {
    changeForm: () => null
  }
  state = {
    activeId: ''
  }

  confirmeKey = () => {
    var val = this.state.activeId
    this.props.close(val)
    this.setState({
      activeId: '',
    })
  }
  
  cancelOption = () => {
    this.props.close()
    this.setState({
      activeId: '',
    })
  }
  
  render() {
    const { activeId } = this.state;
    const { citys } = this.props;
    return (
      <div styleName="modal">
        <header styleName="header">
          <div styleName="text-button" onClick={this.cancelOption}>取消</div>
          <div styleName="header-title">请选择城市名称</div>
          <div styleName="text-button-primary" onClick={this.confirmeKey}>确认</div>
        </header>
        <ul styleName="option-list">
          {
            citys.map(item => {
              return (
                <li key={item.id} styleName={activeId === item.id ? 'active-item' : ''}
                  onClick={() => {
                    this.setState({
                      activeId: item.id,
                    })
                  }}>
                  {item.cityName}
                </li>
              )
            })
          }
        </ul>
      </div>
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
      ownerName: false,
      ownerPhone: false,
      varityCold: false
    },
    isErrAddPhone: false,
    modalContent: 'formList',
    isCityOption: false
  }

  /** 提交*/
  sublimt = () => {
    const isLogin = !!localStore.get('userId')
    const { changeForm, userInfo } = this.props
    const { isErr, isErrAddPhone } = this.state

    const hasErr = this.hasErrItem()
    
    if (hasErr || isErrAddPhone) {
      this.setState({ ...isErr })
      return
    }
    // console.log(isLogin, userInfo.username);
    /**test */
    if (isLogin) {
      changeForm(userInfo.username, 'ownerPhone')
    }
    
    setTimeout(()=> {
      this.props.sublimtEntrust()
    }, 0)
  }

  hasErrItem = () => {
    const isLogin = !!localStore.get('userId')
    const { form } = this.props
    const { isErr, isErrAddPhone } = this.state

    for (let i in form) {
      const val = form[i]
      const hasOwn = isErr.hasOwnProperty(i)
      
      // 登录状态下不必验证联系人验证码
      if (isLogin) {
        delete isErr.varityCold
        delete isErr.ownerPhone
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
    return hasErr
  }
  
  componentDidMount() {
    const isLogin = !!localStore.get('userId')
    this.props.getCitys()
    if (isLogin) {
      this.props.getUserInfo()
    }
  }

  turnPopLayer = () => {
    // console.log(hasClass(document.documentElement, 'poplayer-show'))
    const val = hasClass(document.documentElement, 'poplayer-show');
    const { showModle } = this.props;
    if(val) {
      removeClass(document.documentElement, 'poplayer-show');
    } else {
      addClass(document.documentElement, 'poplayer-show');
    }
    showModle();
  }
  
  render() {
    const { isErr, isErrAddPhone, modalContent, isCityOption } = this.state
    const { form, citys, genCode, changeForm, isLoading, showModle, communityList, communityKey, changeCommuntiyKey, clearCommunityList, sreachCommunity, isTips, redirect, updatePhone} = this.props
    const isLogin = !!localStore.get('userId')

    let isErrItem = false


    for (let i in form) {
      const val = form[i]
      const hasOwn = isErr.hasOwnProperty(i)
      
      // 登录状态下不必验证联系人验证码
      if (isLogin) {
        delete isErr.varityCold
        delete isErr.ownerPhone
      }
      /* 验证必填项目*/
      if (hasOwn) {
        if (val === '') {
          isErrItem = true
        }
      }
    }
    return (
      <div styleName="main">
        <Form data={form}>
          <h2 styleName="title">
            添加房屋信息
            <span styleName="descripe">添加爱屋信息，更好地对房屋实施评估</span>
          </h2>
          <div styleName="input-group">
            <FormItem label="城市"
              onClick={() => {
                this.setState({
                  isCityOption: true
                }, this.turnPopLayer)
              }}>
              <p styleName="form-val">{form.cityName}</p>
            </FormItem>
            <FormItem label="小区名称" isErr={isErr.communityName} 
              onClick={() => {
                this.setState({
                  isCityOption: false
                }, this.turnPopLayer)
              }}>
              <p styleName={form.communityName ? 'form-val' : 'form-val-pl'}>{form.communityName || '请输入您爱屋所在的小区'}</p>
            </FormItem>
          </div>

          <h2 styleName="title">
            留下联系方式
            <span styleName="descripe" style={{display: isLogin ? 'none' : 'block'}}>
              提交成功后，可以使用这个手机号登录查看房源动态
            </span>
          </h2>
          <div styleName="input-group">
            <FormItem label="姓名" isErr={isErr.ownerName}>
              <Input
                must
                value={form.ownerName}
                maxLength={30}
                placeholder="请输入您的称呼"
                onChange={val => changeForm(val, 'ownerName')}
                verify={{
                  cb: val => this.setState({ isErr: { ...isErr, ownerName: !val } })
                }}
              />
            </FormItem>
            {
              isLogin ? null 
                : <div>
                  <FormItem label="手机号" isErr={isErr.ownerPhone}>
                    <Input
                      value={form.ownerPhone}
                      placeholder="请输入您的手机号码"
                      onChange={val => {
                        changeForm(val, 'ownerPhone')
                        updatePhone(val)
                      }}
                      verify={{
                        type: 'ownerPhone',
                        cb: val => {
                          // console.log('phone ERR', !val)
                          this.setState({ isErr: { ...isErr, ownerPhone: !val } })
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
                      onClick={() => {
                        genCode(form.phone)
                      }}
                    />
                  </FormItem>
                </div>
            }
          </div>

          <h2 styleName="title">
            其他联系方式（选填）
            <span styleName="descripe">
              可以让资产管家更容易与您取得联系
            </span>
          </h2>
          <div styleName="input-group">
            <FormItem label="姓名">
              <Input
                must
                value={form.linkName}
                maxLength={30}
                placeholder="请输入称呼"
                onChange={val => changeForm(val, 'linkName')}
              />
            </FormItem>
            <FormItem label="手机号" isErr={isErrAddPhone}>
              <Input
                value={form.linkPhone}
                placeholder="请输入手机号码"
                onChange={val => changeForm(val, 'linkPhone')}
                verify={{
                  type: 'phone',
                  cb: val => {
                    this.setState({ 
                      isErrAddPhone: form.linkPhone === '' ? false : !val
                    })
                  }
                }}
              />
            </FormItem>
          </div>
          <footer styleName="form-footer">
            <Button type="Primary" onClick={this.sublimt} disabled={isLoading || isErrItem}>
              提交
              {isLoading ? '中...' : ''}
            </Button>
          </footer>
        </Form>
        
        <Modal>
          {
            isCityOption ?
              <OptionCity 
                citys={citys}
                close={(val) => {
                  if (val) {
                    const city = citys.filter(i => val == i.id)
                    changeForm(val, 'cityId')
                    changeForm(city[0].cityName, 'cityName')
                  }
                  this.turnPopLayer()
                }}
              /> :
              <InputList 
                close={(val) => {

                  this.turnPopLayer()
                  this.setState({ 
                    isErr: { ...isErr, communityName: !form.communityName }
                  })
                }}
                form={form}
                communityList={communityList}
                clearCommunityList={clearCommunityList}
                communityKey={communityKey}
                changeCommuntiyKey={changeCommuntiyKey}
                changeForm={changeForm}
                sreachCommunity={sreachCommunity}
                modalContent={modalContent}
              />
          }
  
        </Modal>
        
        <Alert 
          open={isTips}
          title="提示" 
          content="提交成功！资产管家会尽快与您取得联系，您可以在【我的房源】中查看动态。"
          cancelText="我知道了"
          confirmText="立即查看"
          cancel={() => {
            this.setState({
              isErr: {
                communityName: false,
                ownerName: false,
                ownerPhone: false,
                varityCold: false
              },
              isErrAddPhone: false
            })
            this.props.closeTips()
          }}
          confirm={() => {
            this.props.closeTips()
            redirect(`/houses`)
          }}
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
    isTips: state.entrust.isTips,
    citys: state.app.citys,
    isShow: state.modal.isShow,
    communityList: state.entrust.communityList,
    communityKey: state.entrust.communityKey,
    varityCold: state.entrust.varityCold,
    userInfo: state.app.userInfo
  }),
  {
    ...bindActions,
    ...entrustAction,
    ...appAction,
    ...modalAction,
    redirect: url => push(url)
  }
)(Entrust)
