import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import { Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'
import Icon from '../../components/Icon'
import verify from '../../utils/verify'
import Button from '@/components/Button'
import Loading from 'react-loading'
import { actions as bindActions } from '../../reducers/bind'
import { actions as appActions } from '../../reducers/app'
import { px2vw, vw2px, parseQuery } from '../../utils'
import _ from 'lodash'
import styles from './Bind.css'

const ReactLoading = () => {
  const loadingTheme = {
    width: vw2px(px2vw(30)),
    height: vw2px(px2vw(30)),
    color: 'rgba(0,0,0,0.8)',
    type: 'spokes'
  }

  return <Loading {...loadingTheme} />
}

/**输入框 */
@CSSModules(styles, { allowMultiple: true })
class InputField extends PureComponent {
  static propTypes = {
    addonBefore: PropTypes.func,
    disabled: PropTypes.bool,
    error: PropTypes.string,
    value: PropTypes.string,
    onInput: PropTypes.func,
    onReset: PropTypes.func,
    isLoading: PropTypes.bool
  }

  static defaultProps = {
    addonBefore: () => null,
    disabled: false,
    error: '',
    value: '',
    onInput: () => null,
    onReset: () => null,
    onBlur: () => null,
    isLoading: false
  }

  render() {
    const {
      addonBefore,
      disabled,
      error,
      value,
      onInput,
      onReset,
      isLoading,
      onBlur,
      ...other
    } = this.props
    return (
      <div
        styleName={`field ${error ? 'has-error' : ''} ${
          disabled ? 'disabled' : ''
        }`}
      >
        {addonBefore(this.props)}
        <input
          onChange={onInput}
          onBlur={onBlur}
          value={value}
          styleName="input"
          {...other}
        />
        <a styleName="clear-btn" onClick={onReset}>
          {isLoading ? (
            <ReactLoading type="bubbles" />
          ) : (
            <Icon name="clear_x" />
          )}
        </a>
        {error && <p styleName="error-msg">{error}</p>}
      </div>
    )
  }
}

@CSSModules(styles)
class ThemedSelect extends PureComponent {
  static defaultProps = {
    onSelect: () => null,
    options: []
  }
  static propTypes = {
    onSelect: PropTypes.func,
    options: PropTypes.array
  }

  state = {
    value:
      this.props.options[0] === undefined ? '' : this.props.options[0].value
  }

  onSelect = e => {
    const v = e.target.value
    this.setState({
      value: v
    })
    this.props.onSelect(v)
  }

  render() {
    const { value } = this.state
    /*   const { options } = this.props */

    return (
      <div styleName="select">
        <span styleName="select-val">{value}</span>
        {/*    <Icon name="caret" />
        <select
          styleName="select-hidden"
          value={value}
          onChange={this.onSelect}
        >
          {options.map(o => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select> */}
      </div>
    )
  }
}

/**获取验证码按钮 */
@CSSModules(styles, { allowMultiple: true })
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
  countReset = () => {
    clearTimeout(this.timeoutId)
    this.setState({
      count: this.totalCount,
      isCounting: false
    })
  }
  onCodeButtonClick = () => {
    if (this.state.isCounting || this.state.isDisabled) { return }

    this.countStart()
    this.props.onClick()
  }
  
  componentWillUnmount() {
    this.countReset()
  }

  render() {
    const { isDisabled } = this.props
    const { count, isCounting } = this.state
    return (
      <div styleName="getcode-btn">
        <Button type="Primary" disabled={isDisabled || isCounting} radius onClick={this.onCodeButtonClick}>
          <span>{isCounting ? `重发 (${count})` : '获取验证码'}</span>
        </Button>
      </div>
    )
  }
}

@CSSModules(styles, { allowMultiple: true })
class Bind extends PureComponent {
  state = {
    phoneError: '',
    isPhoneError: true,
    codeError: '',
    isCodeError: true,
  }
  validatePhone = phone => {
    const { success } = verify.phone(phone)

    this.setState({
      phoneError: success ? '' : '请输入正确的手机号码',
      isPhoneError: !success
    })
    return success
  }
  onPhoneBlur = () => {
    const { phone } = this.props
    const check = this.validatePhone(phone)

    if (!check) {
      return check
    }
  }
  validatePhoneField = () => {
    const { phone, isCheckingPhone, checkError } = this.props
    const check = this.validatePhone(phone)

    return check && (!isCheckingPhone && !checkError)
  }
  validateCode = identifyingCode => {
    identifyingCode = _.trim(identifyingCode)
    this.setState({
      codeError: identifyingCode ? '' : '请输入验证码',
      isCodeError: !identifyingCode
    })

    return identifyingCode
  }
  onCodeBlur = () => {
    const { identifyingCode } = this.props
    this.validateCode(identifyingCode)
  }

  onBindClick = () => {
    // const pv = this.validatePhoneField()
    const cv = this.validateCode(this.props.identifyingCode)
    if (cv) {
      this.props.bindStart()
    }
  }

  render() {
    const {
      updatePhone,
      updateCode,
      genCode,
      isCheckingPhone,
      router,
      bindSuccess,
      phone,
      bindLoading,
      identifyingCode
    } = this.props
    const { phoneError, codeError, isPhoneError, isCodeError } = this.state
    const redirectUrl = parseQuery(router.location.search).redirect || '/parthner/houses'

    return (
      <div styleName="view">
        <h1 styleName="header">登录</h1>
        <div styleName="main">
          <div styleName="section">
            <div styleName="section-tit">
              手机号 (<span>*新用户初次登录将自动注册</span>)
            </div>
            <InputField
              placeholder="请输入手机号码"
              onBlur={this.onPhoneBlur}
              value={phone}
              onInput={e => updatePhone(e.target.value)}
              onReset={e => updatePhone('')}
              isLoading={isCheckingPhone}
              error={phoneError}
            />
          </div>

          <div styleName="section">
            <div styleName="section-tit">验证码</div>
            <div styleName="validate-field">
              <div styleName="field-wrap">
                <InputField
                  value={identifyingCode}
                  onBlur={this.onCodeBlur}
                  error={codeError}
                  onInput={e => updateCode(e.target.value)}
                  onReset={e => updateCode('')}
                  placeholder="请输入验证码"
                />
              </div>
              <ValidationCodeButton
                isDisabled={isPhoneError}
                validate={this.validatePhoneField}
                onClick={genCode}
              />
            </div>
          </div>

          <Button type="Primary" disabled={bindLoading || isPhoneError || isCodeError} radius onClick={this.onBindClick}>
            {bindLoading ? '登录中，请稍等...' : '登录'}
          </Button>
        </div>
        {bindSuccess ? <Redirect to={decodeURIComponent(redirectUrl)} /> : null}
      </div>
    )
  }
}

export default connect(
  state => ({
    ...state.bind,
    router: state.router
  }),
  {
    ...bindActions,
    getUserInfo: appActions.getUserInfo
  }
)(Bind)
