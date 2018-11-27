import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { CSSTransition } from 'react-transition-group'
import './NotifyToast.css'

const NOTIFY_TYPE = {
  normal: 'normal',
  warning: 'warning',
  success: 'success',
  error: 'error'
}

let defaultOptions = {
  show: false,
  delay: 2000,
  timeout: 300,
  onHide: () => null,
  type: NOTIFY_TYPE.normal
}

class NotifyToast extends PureComponent {
  static propTypes = {
    show: PropTypes.bool,
    delay: PropTypes.number,
    timeout: PropTypes.number,
    type: PropTypes.string,
    onHide: PropTypes.func
  }

  static defaultProps = { ...defaultOptions }
  render() {
    const { children, show, type, timeout, onHide, ...rest } = this.props

    return (
      <CSSTransition
        onExit={onHide}
        timeout={timeout}
        in={show}
        unmountOnExit
        classNames="nt-animation"
      >
        {state => (
          <div {...rest} className="nt-box">
            <div className={`nt-content ${type}`}>{children}</div>
          </div>
        )}
      </CSSTransition>
    )
  }
}

export { defaultOptions }
export default NotifyToast
