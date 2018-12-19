import React, { PureComponent }  from 'react'
import CSSModules from 'react-css-modules'
import style from './Alert.css'



@CSSModules(style)
class Alert extends PureComponent {
  render() {
    const {title, content, confirm, cancel, confirmText, cancelText,open} = this.props
    return (
      <div styleName="alert" style={{display: open ? 'block' : 'none'}}>
        <div styleName="layout"></div>
        <div styleName="dialog">
          <div styleName="content">
            <h2>{title}</h2>
            <p>{content}</p>
          </div>
          <div styleName="footer">
              <div onClick={() => {
                  cancel && cancel();
                }}>
                {cancelText}
              </div>
              <div styleName="sublime" 
                onClick={()=> {
                  confirm && confirm();
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