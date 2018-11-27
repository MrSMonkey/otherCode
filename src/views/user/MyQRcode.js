import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CSSModules from 'react-css-modules'
import styles from './MyQRcode.css'

const crcode = require('../../assets/imgs/code.jpg')

@CSSModules(styles)
class MyQRcode extends Component {
  render() {
    return (
      <div styleName="qrcode-view">
        <div styleName="qrcode-box">
          <img src={crcode} alt="crcode" />
          <p styleName="desc">长按二维码保存为图片</p>
          <Link to="/user/bc" styleName="to-view-bc">
            制作名片
          </Link>
        </div>
      </div>
    )
  }
}

export default MyQRcode
