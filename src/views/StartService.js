import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import { actions as modalAction } from '../reducers/modal'
import DatePicker from 'antd-mobile/lib/date-picker';  // 加载 JS
import 'antd-mobile/lib/date-picker/style/css';        // 加载 CSS
import Picker from 'antd-mobile/lib/picker';
import 'antd-mobile/lib/picker/style/css';        // 加载 CSS
import ReactLoading from 'react-loading'
import styles from './StartService.css'
import Button from '@/components/Button'
import arrayTreeFilter from 'array-tree-filter';
import { Input, Textarea } from '../components/Form'
const district = [{
  label: 'A',
  value: 'A',
},{
  label: 'B',
  value: 'B',
},]

function formatDate(date) {
  /* eslint no-confusing-arrow: 0 */
  const pad = n => n < 10 ? `0${n}` : n;
  const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  const timeStr = `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  return `${dateStr} ${timeStr}`;
}

@CSSModules(styles)
class StartService extends Component {
  state = {
    dpValue: null,
    visible: false,
    visibleRoom: false,
    pickerValue: [],
    room: ''
  }
  getSel() {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(district, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }
  render() {
    // const { redirect, houseInfo, timeLines, isHouseListLoading, } = this.props
     const { pickerValue } = this.state
    return (
      <div>
        <div styleName="StartService">
          <div styleName="message">
            <span styleName="name">服务房源</span>
            <span styleName="time"> 中粮香颂丽都11栋1单元1201号 </span>
          </div>
          <Picker 
            data={district} cols={1} 
            visible={this.state.visibleRoom}
            value={this.state.pickerValue}
            onChange={v => this.setState({ pickerValue: v })}
            onOk={() => this.setState({ visibleRoom: false })}
            onDismiss={() => this.setState({ visibleRoom: false })}
            >
            <div styleName="message">
              <span styleName="name">服务房间*</span>
              
              {pickerValue && pickerValue.length <= 0 ? <span styleName="time" onClick={() => this.setState({ visibleRoom: true })}>选择房间></span> : 
              <span styleName="haveTime" onClick={() => this.setState({ visibleRoom: true })}>房间：{this.getSel()}</span>}
            </div>
          </Picker>
          <div styleName="message">
            <span styleName="name">预约服务时间*</span>
            <span styleName={this.state.dpValue !== null ? 'haveTime': 'time'} onClick={() => this.setState({ visible: true })} >{this.state.dpValue !== null ? formatDate(this.state.dpValue) : '选择服务时间>'}</span> 
            <DatePicker
              visible={this.state.visible}
              value={this.state.dpValue}
              onOk={date => this.setState({ dpValue: date, visible: false })}
              onDismiss={() => this.setState({ visible: false })}
            />
          </div>
          <div styleName="message">
            <span styleName="name">备注</span>
            <div style={{marginRight: 20}}>
              <Textarea placeholder="请输入50字以内的备注"  rows={6}/>
            </div>
          </div>
        </div>
        <div styleName="StartService">
          <div styleName="message">
            <span styleName="name">联系人*</span>
            <Input placeholder="请输入联系人姓名" />
          </div>
          <div styleName="message">
            <span styleName="name">联系电话*</span>
            <input placeholder="请输入联系人电话" type="tel" />
          </div>
          <div styleName="service-footer">
            <Button >发起</Button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(
  state => ({
    houseInfo: state.myHouse.houseInfo,
    roomList: state.myHouse.roomList,
    isHouseListLoading: state.houseList.isHouseListLoading,
    timeLines: state.myHouse.timeLines
  }),
  {
    ...myHouseActions,
    ...modalAction,
    redirect: url => push(url)
  }
)(StartService)
