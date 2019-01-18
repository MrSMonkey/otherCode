import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import { PhotoSwipeGallery } from 'react-photoswipe'
import { actions as housePicture } from '../reducers/housePicture'
import { push } from 'connected-react-router'
import ReactLoading from 'react-loading'
import Tabs from '../components/Tabs'
import { SectionTitle } from '../components/InfoSection'
import styles from './HousePicture.css'
const imgs = {
  imgBg: require('../assets/imgs/icon_img.png')
}

// const options = {
//   history: false,
//   shareEl: false,
// }
class CumstomPhotoSwipeGallery extends Component {
  state = {
    data: []
  }

  componentDidMount() {
    var arr = []
    if (this.props.data) {
      this.props.data.forEach(item => {
        const img = new Image()
        img.src = `${item.imageUrl}?imageView2/2/w/320`
        img.onload = () => {
          arr.push({
            thumbnails: imgs.imgBg,
            src: `${item.imageUrl}?imageView2/2/w/320`,
            w: img.width,
            h: img.height
          })

          this.setState({
            data: arr
          })
        }
      })
    }
  }
  componentWillReceiveProps (nextProps) {
    //console.log(nextProps)
    nextProps.data !== this.props.data && this.setState({
      data: nextProps.data
    }, ()=> {
      var arr = []
      if (this.props.data) {
        this.props.data.forEach(item => {
          const img = new Image()
          img.src = `${item.imageUrl}?imageView2/2/w/320`
          img.onload = () => {
            arr.push({
              thumbnails: imgs.imgBg,
              src: `${item.imageUrl}?imageView2/2/w/320`,
              w: img.width,
              h: img.height
            })
  
            this.setState({
              data: arr
            })
          }
        })
      }
    })
  }
  // shouldComponentUpdate(nextProps,nextState) {
  //   console.log(nextProps,nextState)
  // }
  options = {
    index: this.props.index,
    history: false,
    shareEl: false,
  }

  render() {
    const { data } = this.state
    
    return (
      <PhotoSwipeGallery
        className="house-pic-gallery"
        items={data}
        options={this.options}
        isOpen={false}
        thumbnailContent={item => {
          return <img
              key={item}
              src={item.src} 
              onError={(e) => {
                var event = e.target
                event.onerror = null
                event.src = imgs.imgBg
              }}
            />
        }}
      />
    )
  }
}

const rentStatus = ['', '待租中', '已出租', '已预订'];
/**租赁信息(资产管家) */
const AssetManager = ({data}) => {
  return (
    <div styleName="detail-info">
      <div styleName="block">
        <label>出租方式：</label>
        <span>{data && data.rentType === 1 && '整租'}{data && data.rentType === 2 && '合租'}</span>
      </div>
      {data && data.houseRentRoomDTO && data.houseRentRoomDTO.map((item, index) =>{
        return (
          <div styleName="block" key={index}>
            <label>房间{item.roomName}：</label>
            <span>{item.rent && item.rent || '0.00'}元/月 | {rentStatus[item.rentStatus || 1]}</span>
          </div>
        )
      })}
      <div styleName="block">
        <label>标题：</label>
        <span>{data && data.title || '无'}</span>
      </div>
      <div styleName="block">
        <label>描述：</label>
        <span>{data && data.desc || '无'}</span>
      </div>
    </div>
  )
}
const Asset = CSSModules(AssetManager, styles)

@CSSModules(styles)
class HousePicture extends Component {
  state = {
    tabsData: [],
  }
  formDate(val) {
    if (val) {
      return val.slice(1, 10)
    } else {
      return ''
    }
  }
  componentDidMount() {
    const id = this.props.match.params.id
    this.props.getHousePicture(id)
    this.setState({
      tabsData: [
        {
          name: 'houseInfo',
          text: '房源信息',
          href: `/houses/${id}`,
          active: false
        }, {
          name: 'roomInfo',
          text: '房间信息',
          href: `/rooms/${id}`,
          active: false
        }, {
          name: 'photo',
          text: '租赁信息',
          href: `/house-pic/${id}`,
          active: true
        }
      ],
      active: 0,
    })
  }
  handleClick(idx, item) {
    this.props.getSelectData(item.houseRoomCommonDTO)
    this.setState({
      active: idx
    })
    
  }
  render() {
    const { pictures, picturesLoading, redirect, selectData } = this.props
    const {active} = this.state;
    if (picturesLoading) {
      return (
        <div className="infinte-loader">
          <ReactLoading
            type="bubbles"
            className="inline-block"
            color="#474747"
          />
        </div>
      )
    }
    
    return (
      <React.Fragment>
        <Tabs data={this.state.tabsData} 
          onClick={(data) => {
            if (data.href) { redirect(data.href) }
          }} 
        />
        
          {pictures && pictures.length > 0 ?<div>
          <div styleName="pic-info">
            <div styleName="pic-title">
              {pictures && pictures.map((item, idx) => {
                return (
                  <span key={idx} styleName={active === idx ? 'active': ''} onClick={()=>this.handleClick(idx, item)}>
                    {item.source === 'ZC' && '资产管家'}
                    {item.source === 'FW' && `服务商${idx}`}
                  </span>
                )
              })}
            </div>
            <div>
              <Asset data={selectData}/>
            </div>
          </div>
          {
            selectData && selectData.houseRentRoomDTO && selectData.houseRentRoomDTO.map((i, index) => {
              return (
                <div key={index}>
                  <SectionTitle>房间{i.roomName}</SectionTitle>
                  <CumstomPhotoSwipeGallery data={i.roomImages} index={index}/>
                </div>
              )
            })
          }
          <SectionTitle>公区照片</SectionTitle>
          <CumstomPhotoSwipeGallery data={selectData && selectData.housePublicImages && selectData.housePublicImages} index="-1"/>
        </div>: null
          }
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    pictures: state.housePicture.pictures,
    selectData: state.housePicture.selectData,
    indexHouse: state.houseList.indexHouse,
    picturesLoading: state.housePicture.picturesLoading,
    tabsData: state.myHouse.tabsData
  }),
  {
    ...housePicture,
    redirect: url => push(url)
  }
)(HousePicture)
