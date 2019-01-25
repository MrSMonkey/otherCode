import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as serviceHouseActions } from '../reducers/serviceHouse'
import { actions as pushServiceActions } from '../reducers/pushService'
// import DatePicker from 'antd-mobile/lib/date-picker';  // 加载 JS
// import 'antd-mobile/lib/date-picker/style/css';        // 加载 CSS

import DatePickerView  from 'antd-mobile/lib/date-picker-view';  // 加载 JS
import 'antd-mobile/lib/date-picker-view/style/css';        // 加载 CSS

import Picker from 'antd-mobile/lib/picker';
import 'antd-mobile/lib/picker/style/css';        // 加载 CSS
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CS
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import PickerView from 'antd-mobile/lib/picker-view';
import 'antd-mobile/lib/picker-view/style/css'; 
import ReactLoading from 'react-loading'
import styles from './StartService.css'
import Button from '@/components/Button'
import arrayTreeFilter from 'array-tree-filter';
import { Input, Textarea } from '../components/Form'


const nowTimeStamp = Date.now();
const now = new Date(nowTimeStamp);
let minDate = new Date(nowTimeStamp);
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
    subscribeTime: null,
    visible: false,
    visibleRoom: false,
    pickerValue: [],
    room: '',
    remark: '',
    ownerName: '',
    ownerPhone: '',
    value: '',
    timeVisible: false,
    currentTime: null
  }
  getSel = () => {
    const value = this.state.pickerValue;
    if (!value) {
      return '';
    }
    const treeChildren = arrayTreeFilter(this.props.rooms, (c, level) => c.value === value[level]);
    return treeChildren.map(v => v.label).join(',');
  }
  componentDidMount() {
    const { match, getHouseData } = this.props
    const id = match.params.id
    const houserId = match.params.houserId
    getHouseData(houserId)
    document.documentElement.scrollTop = document.body.scrollTop = 0;
  }
  remakChange = (value) => {
    this.setState({
      remark: value
    })
  }
  submitService = () => {
    if (this.state.pickerValue.length ===0) {
      Toast.info('请选择房间', 2);
      return false
    }
    if (!this.state.subscribeTime) {
      Toast.info('请选择预约时间', 2);
      return false
    }
    if (this.state.ownerName === '' && this.props.data.assetName == null) {
      Toast.info('请输入联系人姓名', 2);
      return false
    }
    if (this.state.ownerPhone === '' && this.props.data.assetPhone == null) {
      Toast.info('请输入联系人电话', 2);
      return false
    }
    const data = {
      entrustId: this.props.data.entrustId,
      orderId: this.props.match.params.id,
      ownerName: this.props.data.assetName !== null ? this.props.data.assetName : this.state.ownerName,
      remark: this.state.remark,
      roomId: this.state.pickerValue[0],
      roomName: this.props.data.houseType === 0 ? this.getSel() : '整租',
      subscribeTime: formatDate(this.state.subscribeTime),
      ownerPhone: this.props.data.assetPhone !== null ? this.props.data.assetPhone : this.state.ownerPhone,
    }
    const {submitData} = this.props;
    submitData(data); // 提交
  }
  ownerNameChange = (value) => {
    this.props.data.assetName = null
    this.setState({
      ownerName: value
    })
  }
  ownerPhoneChange = (value) => {
    this.props.data.assetPhone = null
    this.setState({
      ownerPhone: value || ''
    })
  }
  showModal = (key, item) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
      value: [item.value]
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,

    });
  }
  handleChange = (value) =>{
  }
  onScrollChange= (value) =>{
    this.setState({
      value: value
    });
    
  }
  onOk = () => {
    this.setState({
      visibleRoom: false,
      pickerValue: this.state.value
    })

    // const { match } = this.props
    // const houserId = match.params.id
    // this.props.redirect(`/startService/${this.state.value.value}/${houserId}`)
  }
  timeChange = (date) => {
    this.setState({
      currentTime: date
    })
  }
  onTimeOk = () => {
    this.setState({
      timeVisible: false,
      subscribeTime: this.state.currentTime
    })
  }
  render() {
    const { data, rooms, comfrimLoading} = this.props
    const { pickerValue,subscribeTime, ownerName, ownerPhone} = this.state
    return (
      <div>
        <div styleName="StartService">
          <div styleName="message">
            <span styleName="name">服务房源</span>
            <span styleName="time"> {data && data.houseName || '无'} </span>
          </div>
          <div styleName="message">
              <span styleName="name">服务房间*</span>
              {data && data.houseType === 0 ? <span>
              {pickerValue && pickerValue.length <= 0 ? <span styleName="time" onClick={this.showModal('visibleRoom', rooms && rooms[0])}>选择房间></span> : 
              <span styleName="haveTime" onClick={() => this.setState({ visibleRoom: true })}>房间：{this.getSel()}</span>}
              </span>: <span styleName="time" >整套</span>}
            </div>
          <div styleName="message">
            <span styleName="name">预约服务时间*</span>
            <span styleName={this.state.subscribeTime !== null ? 'haveTime': 'time'} onClick={() => this.setState({ timeVisible: true })} >{this.state.subscribeTime !== null ? formatDate(this.state.subscribeTime) : '选择服务时间>'}</span> 
          </div>
          <div styleName="message">
            <span styleName="name">备注</span>
            <div style={{marginRight: 20}}>
              <Textarea placeholder="请输入50字以内的备注"  rows={6} onChange={this.remakChange} maxLength={50}/>
            </div>
          </div>
        </div>
        <div styleName="StartService">
          <div styleName="message">
            <span styleName="name">联系人*</span>
            <Input placeholder="请输入联系人姓名" onChange={this.ownerNameChange} value={ data && data.assetName || ownerName} />
          </div>
          <div styleName="message">
            <span styleName="name">联系电话*</span>
            <Input placeholder="请输入联系人电话" onChange={this.ownerPhoneChange} value={ data && data.assetPhone || ownerPhone} />
          </div>
          <div styleName="service-footer">
            {comfrimLoading ? <Button disabled ={true}>发起中</Button>:
              <Button onClick={this.submitService} disabled ={!subscribeTime || pickerValue.length === 0 || (!data.assetName && !ownerName) || (!data.assetPhone && !ownerPhone)}>发起</Button>}
          </div>
        </div>
        {/* 房间选择 */}
        <Modal
          popup
          visible={this.state.visibleRoom}
          onClose={this.onClose('visibleRoom')}
          animationType="slide-up"
          afterClose={() => { }}
        >
        <div styleName="modal-title">
          <span onClick={this.onClose('visibleRoom')}>取消</span>
          <span>选择房间</span>
          <span onClick={this.onOk}>确认</span>
        </div>
          <PickerView
            data={rooms}
            onChange={this.handleChange}
            value={this.state.value}
            onScrollChange={this.onScrollChange}
            cascade={false}
          />
        </Modal>
        {/* 时间选择 */}
        <Modal
          popup
          visible={this.state.timeVisible}
          onClose={this.onClose('timeVisible')}
          animationType="slide-up"
          afterClose={() => { }}
        >
        <div styleName="modal-title">
          <span onClick={this.onClose('timeVisible')}>取消</span>
          <span>选择时间</span>
          <span onClick={this.onTimeOk}>确认</span>
        </div>
        <DatePickerView
          value={this.state.currentTime}
          minDate={minDate}
          onChange={this.timeChange}
        />      
        </Modal>
      </div>
    )
  }
}

export default connect(
  state => ({
    data: state.serviceHouse.data,
    rooms: state.serviceHouse.rooms,
    comfrimLoading: state.pushService.comfrimLoading,
  }),
  {
    ...serviceHouseActions,
    ...pushServiceActions,
    redirect: url => push(url)
  }
)(StartService)
