import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Button.css'

/**
 * oClick()
 * type: Primary, Default (选填)
 * disabled: 默认 false
 */

@CSSModules(styles)
class Button extends PureComponent {
  render() {
    const {onClick ,type ,disabled, children} = this.props;
    let bgColor='';
    switch (type) {
      case 'Primary': 
        bgColor = '#c3aa82';
        break;
      case 'Default':
        bgColor = '#E3CCA9';
        break;
      default:
        bgColor = '#c3aa82';
    }
    return (
      <button 
        type="button" 
        styleName="button-button" 
        onClick={onClick} 
        disabled={disabled}
        style={{backgroundColor: disabled ? '#D8D8D8' : bgColor}}>
        {children}
      </button>
    )
  }
}


export default Button;