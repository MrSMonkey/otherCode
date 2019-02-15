import React, { Component, PureComponent } from 'react'
import CSSModules from 'react-css-modules'
import PropTypes from 'prop-types'
import { push } from 'connected-react-router'
import { connect } from 'react-redux'
import { actions as serviceTypeActions } from '../reducers/serviceType'
import Modal from 'antd-mobile/lib/modal';
import 'antd-mobile/lib/modal/style/css';
import PickerView from 'antd-mobile/lib/picker-view';
import 'antd-mobile/lib/picker-view/style/css'; 
import Toast from 'antd-mobile/lib/toast';  // 加载 JS
import 'antd-mobile/lib/toast/style/css';        // 加载 CS
import ReactLoading from 'react-loading'
import styles from './ServiceType.css'
import Icon from '../components/Icon'
const noSearch = require('../assets/imgs/no_search.png');

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

const NoOrderList = () => {
  return (
    <div styleName="background-tips">
      <img src={noSearch}/>
      <p>
        未找到服务类型
      </p>
    </div>
  )
}
const StylesNoOrderList = CSSModules(NoOrderList, styles)

@CSSModules(styles)
class ServiceInfo extends Component {
  state = {
    tabsData: [{
      id: '1',
      name: 'houseInfo',
      serviceTypeName: '带看签约服务',
      href: `/houses/`,
      active: true,
      ownerServiceTypes: [{
        label: '龟速出租带看半年周期',
        value: '1',
      },]
    }, {
      name: 'roomInfo',
      serviceTypeName: '装修服务',
      href: `/rooms/`,
      active: false,
      ownerServiceTypes: []
    }, {
      name: 'roomInfo',
      serviceTypeName: '保洁服务',
      href: `/rooms/`,
      active: false,
      ownerServiceTypes: []
    }, {
      name: 'photo',
      serviceTypeName: '维修服务',
      href: `/house-pic/`,
      active: false,
      ownerServiceTypes: []
    },
    {
      name: 'photo',
      serviceTypeName: '房屋写真服务',
      href: `/house-pic/`,
      active: false,
      ownerServiceTypes: []
    },
    {
      name: 'photo',
      serviceTypeName: '租住服务',
      href: `/house-pic/`,
      active: false,
      ownerServiceTypes: []
    }],
    isShow: false,
    visible: false,
    value: null,
    activeType: []
  }
  componentDidMount() {
    const { match, getServiceTypeList } = this.props
    const id = match.params.id
    document.documentElement.scrollTop = document.body.scrollTop = 0;
    getServiceTypeList(id)
    // gethouseTimeLine(id)
  }
  showModal = (key, item) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    if (item.ownerServiceTypes && item.ownerServiceTypes.length === 0) {
      // 没有服务产品
      Toast.info('未找到有效订单，请先购买服务后发起', 3);
      return false;
    }
    this.setState({
      [key]: true,
      activeType: item.ownerServiceTypes,
      value: [item.ownerServiceTypes[0].value]
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
      visible: false
    })
    const { match } = this.props
    const houserId = match.params.id
    this.props.redirect(`/startService/${this.state.value}/${houserId}`)
  }
  render() {
    const { redirect, data, loading } = this.props
    const { activeType } = this.state
    return (
      <div >
        {loading ? <div className="infinte-loader">
            <ReactLoading
              type="bubbles"
              className="inline-block"
              color="#474747"
            />
          </div>: <div>
            {data && data.length> 0 ?data.map((item, index) => {
            return (
              <div styleName="serviceType" key={index} onClick={this.showModal('visible', item)}>
                <h2>{item.serviceTypeName}</h2>
                <div styleName="serviceType-right"><Icon name="icon_arrow"/></div>
              </div>
            )
          }): <StylesNoOrderList />}
          </div>}
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
          <span onClick={this.onOk}>确认</span>
        </div>
          <PickerView
            data={activeType}
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
    data: state.serviceType.serviceTypeList,
    loading: state.serviceType.loading,
  }),
  {
    ...serviceTypeActions,
    redirect: url => push(url)
  }
)(ServiceInfo)
