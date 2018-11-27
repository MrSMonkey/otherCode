import React, { PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import style from './HeaderBanner.css'

class HeaderBanner extends PureComponent {
  render() {
    return (
      <div styleName="banner-box" style={{ backgroundImage: `url(${this.props.img})` }}>
        {this.props.children}
      </div>
    )
  }
}

export default CSSModules(HeaderBanner, style);

/**
 * img：背景图
 * title： 大标题
 * dec： 标题下的描述
 */
