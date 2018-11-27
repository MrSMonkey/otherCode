import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './UokoDetailPlant.css'
import Icon from '../Icon'

const imgs = {
  logo: require('../../assets/imgs/uoko.png'),
}

const UokoDetailPlant = (props) => {
  return (
    <div styleName="info-plant">
      <div styleName="info-header">
        <img styleName="logo" src={imgs.logo} alt="优客逸家"/>
        <Icon name="arrow" width={32} height={30}/>
      </div>
      <div styleName="info-body">
        <h4>房源类型&委托服务</h4>
        <p>
          如果您有一套毛坯、老旧、简单装修的房子<br/>
          准备自持几年后售卖增值<br/>
          或一直出租收取令人愉快的租金<br/>
          最省心、简单的变现方式<br/>
          就是交给优客逸家<br/>
        </p>
      </div>
      <div styleName="info-footer">
        {props.children}
      </div>
    </div>
  )
}

const StyleUokoDetailPlant = CSSModules(UokoDetailPlant, styles);

export default StyleUokoDetailPlant
