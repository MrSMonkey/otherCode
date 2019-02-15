import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import style from './houseInfo.css'

/**
 * @description 租赁信息(资产管家)
 * @param data 租赁详情
 * @return Element
 * @author chenmo
 */

const App = ({ data = [] }) => {

  @CSSModules(style)
  class Title extends Component {
    state = {
      titleArr :[
        {title: '租赁信息(资产管家)', id: 1, active: false}, 
        {title: '租赁信息(服务商)', id: 2, active: true}, 
      ]
    }
    handleClick = (item) => {
      const arr = this.state.titleArr.map((ctx) => {
        if (ctx.id === item.id) {
          ctx.active = true
        } else {
          ctx.active = false
        }
        return ctx;
      })
  
      this.setState({
        titleArr: arr
      }, () => {
        console.log('state', this.state.titleArr)
      })
      
    }
    render() {
      const titleArr = this.state.titleArr;
      console.log(this.state.titleArr)
      return (
        <div styleName="house-head">
          {titleArr.map((item, index) => {
            return (
              <span key={index} styleName={item.active ? 'active' : ''} onClick={()=>this.handleClick(item)}>
                {item.title}
              </span>
            )
          })}

        </div>
        
      )
    }
  }

  return(
    <div styleName="house-info">
      <Title />
    </div>
  )
}
const HouseInfo = CSSModules(App, style)

export default HouseInfo