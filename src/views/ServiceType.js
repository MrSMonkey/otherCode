import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as myHouseActions } from '../reducers/myHouse'
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import PickerView from 'antd-mobile/lib/picker-view';
import 'antd-mobile/lib/picker-view/style/css'; 
import ReactLoading from 'react-loading'
import styles from './ServiceType.css'
import Button from '@/components/Button'
import Icon from '../components/Icon'
import Form, { FormItem, Input, Select, Textarea } from '../components/Form'
import { addClass, hasClass, removeClass } from '../utils'
const imgs = {
  noHouse: require('../assets/imgs/banner.jpg')
}

const season = [
  {
    label: '龟速出租带看半年周期',
    value: '1',
  },
  {
    label: '光速出租单个月带看周期',
    value: '2',
  },
  {
    label: '神仙出租',
    value: '3',
  },
  {
    label: '链家中介',
    value: '4',
  },
];
@CSSModules(styles)
class ServiceInfo extends Component {
  state = {
    tabsData: [{
      id: '1',
      name: 'houseInfo',
      text: '带看签约服务',
      href: `/houses/`,
      active: true
    }, {
      name: 'roomInfo',
      text: '装修服务',
      href: `/rooms/`,
      active: false
    }, {
      name: 'roomInfo',
      text: '保洁服务',
      href: `/rooms/`,
      active: false
    }, {
      name: 'photo',
      text: '维修服务',
      href: `/house-pic/`,
      active: false
    },
    {
      name: 'photo',
      text: '房屋写真服务',
      href: `/house-pic/`,
      active: false
    },
    {
      name: 'photo',
      text: '租住服务',
      href: `/house-pic/`,
      active: false
    }],
    isShow: false,
    visible: false,
    value: null,
  }
  componentDidMount() {
    // const { match, getHouseInfo, gethouseTimeLine } = this.props
    // const id = match.params.id
    // document.documentElement.scrollTop = document.body.scrollTop = 0;
    // getHouseInfo(id)
    // gethouseTimeLine(id)
  }
  showModal = key => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  }
  onClose = key => () => {
    this.setState({
      [key]: false,
    });
  }
  handleChange = (value) =>{
   
    console.log(this.state.value)
  }
  onScrollChange= (value) =>{
    this.setState({
      value: value
    });
    console.log(value)
  }
  render() {
    // const { redirect, houseInfo, timeLines, isHouseListLoading, } = this.props
    const {tabsData } = this.state
    return (
      <div >
        {tabsData && tabsData.map((item, index) => {
          return (
            <div styleName="serviceType" key={index}>
              <h2>{item.text}</h2>
              <div styleName="serviceType-right"  onClick={this.showModal('visible')}><Icon name="icon_arrow"/></div>
            </div>
          )
        })}
        
        <Modal
          popup
          visible={this.state.visible}
          onClose={this.onClose('visible')}
          animationType="slide-up"
          afterClose={() => { }}
        >
        <div styleName="modal-title">
          <span onClick={this.onClose('visible')}>取消</span>
          <span>选择使用服务产品</span>
          <span>确认</span>
        </div>
          <PickerView
            data={season}
            onChange={this.handleChange}
            value={this.state.value}
            onScrollChange={this.onScrollChange}
            cascade={false}
          />
        </Modal>
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
    redirect: url => push(url)
  }
)(ServiceInfo)
