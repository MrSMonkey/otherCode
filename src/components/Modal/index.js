import React, { Component }  from 'react'
import { connect } from 'react-redux'
import { actions as modalAction } from '@/reducers/modal'
import CSSModules from 'react-css-modules'
import Layout from '../Layout'
import style from './Modal.css'

/**
 * type: top , bottom, center
 * isCloseByLayout：点击遮罩是否关闭， 默认不关闭
 */
@CSSModules(style)
class Index extends Component {
  render() {
    const { isModle, isShow, showModle, isCloseByLayout } = this.props
    return (
      <Layout>
        <div styleName="plan-box" style={{display: isShow ? 'block' : 'none'}}>
          <div styleName="layout" 
            style={{opacity: isModle ? '0.7' : '0'}} 
            onTouchEnd={() =>{
              isCloseByLayout && showModle()
            }}>
          </div>
          <div styleName="plan-bottom" style={{height: isModle ? '50%' : '0'}}>
            {this.props.children}
          </div>
        </div>
      </Layout>
    )
  }
}

const Modal = connect(
  state => ({
    isModle: state.modal.isModle,
    isShow: state.modal.isShow
  }),
  {
    ...modalAction
  }
)(Index)

export default Modal;