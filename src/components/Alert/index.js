import React, { PureComponent }  from 'react'
import CSSModules from 'react-css-modules'
import style from './Alert.css'



@CSSModules(style)
class Alert extends PureComponent {
  state = {
    isShow: true
  }
  closeAlert = () => {
    this.setState({
      isShow: false
    })
  }
  render() {
    const {title, content, confirm, confirmText, cancelText,open} = this.props
    const { isShow} = this.state
    return (
      <div styleName="alert" style={{display: isShow && open ? 'block' : 'none'}}>
        <div styleName="layout"></div>
        <div styleName="dialog">
          <div styleName="content">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
          <div styleName="footer">
              <div onClick={this.closeAlert}>{cancelText}</div>
              <div styleName="sublime" 
                onClick={()=> {
                  this.setState({
                    isShow: false
                  }, confirm)
                }}>
                {confirmText}
              </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Alert