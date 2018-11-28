import React, { Component, PureComponent } from 'react'
// import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import styles from './Form.css'
// import { actions } from '../../reducers/entrust'
import hasVerify from '../../utils/verify.js'

@CSSModules(styles)
class Input extends PureComponent {
  render() {
    const { value, maxLength, verify, placeholder, onChange, className, style } = this.props
    return (
      <input
        value={value}
        maxLength={maxLength || ''}
        placeholder={placeholder || ''}
        className={className || ''}
        style={style || {}}
        onBlur={event => {
          const val = event.target.value
          if (verify) {
            const isSuccess =
              verify && verify.type ? hasVerify[verify.type](val).success : true
            const empty = verify ? val === '' : false
            verify.cb(isSuccess && !empty)
          }
        }}
        onChange={event => {
          const val = event.target.value
          onChange(val)
        }}
      />
    )
  }
}

@CSSModules(styles)
class Select extends PureComponent {
  render() {
    const { data, value, verify, placeholder, onChange } = this.props
    console.log(value)
    return (
      <select
        value={value}
        placeholder={placeholder || ''}
        onBlur={event => {
          const val = event.target.value
          if (verify) {
            const isSuccess =
              verify && verify.type ? hasVerify[verify.type](val).success : true
            const empty = verify ? val === '' : false
            verify.cb(isSuccess && !empty)
          }
        }}
        onChange={(event) => {
          const val = event.target.value
          onChange(val);
        }}
      >
        <option value="" key="first">
          {placeholder}
        </option>
        {data.map(item => (
          <option value={item.Value} key={item.Value}>
            {item.Text}
          </option>
        ))}
      </select>
    )
  }
}

@CSSModules(styles)
class Textarea extends PureComponent {
  render() {
    const { value, rows, maxLength, placeholder, onChange } = this.props
    return (
      <textarea
        value={value}
        rows={rows || 2}
        maxLength={maxLength}
        placeholder={placeholder || ''}
        onChange={(event) => {
          const val = event.target.value
          onChange(val);
        }}
      />
    )
  }
}

@CSSModules(styles)
class FormItem extends PureComponent {
  render() {
    const { label, width, isErr, children } = this.props
    return (
      <div styleName="input-box" className={isErr ? 'border-warning' : ''}>
        <label style={{ display: label ? 'block' : 'none', width: width }}>
          {label}
        </label>
        {children}
      </div>
    )
  }
}

@CSSModules(styles)
class Form extends Component {
  render() {
    const { children } = this.props
    // console.log(children)
    return <form>{children}</form>
  }
}

export { FormItem, Input, Select, Textarea }

export default Form
// export default connect(
//   state => state.form,
//   dispatch => bindActionCreators(actions, dispatch)
// )(Form)
