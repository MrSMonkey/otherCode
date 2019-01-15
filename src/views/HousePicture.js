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

/**租赁信息(资产管家) */
const AssetManager = ({data}) => {
  return (
    <div styleName="detail-info">
      <div styleName="block">
        <label>出租方式：</label>
        <span>合租</span>
      </div>
      <div styleName="block">
        <label>房间A：</label>
        <span>1000.00元/月 | 待租 | 不展示</span>
      </div>
      <div styleName="block">
        <label>房间B：</label>
        <span>1000.00元/月 | 待租 | 不展示</span>
      </div>
      <div styleName="block">
        <label>房间C：</label>
        <span>1000.00元/月 | 待租 | 不展示</span>
      </div>
      <div styleName="block">
        <label>标题：</label>
        <span>这里是标题标题标题占位占位占位吧啦啦啦啦啦</span>
      </div>
      <div styleName="block">
        <label>描述：</label>
        <span>这里是描述描述描述占位占位占位吧啦啦啦啦啦</span>
      </div>
    </div>
  )
}
const Asset = CSSModules(AssetManager, styles)

@CSSModules(styles)
class HousePicture extends Component {
  state = {
    tabsData: []
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
          text: '房源照片',
          href: `/house-pic/${id}`,
          active: true
        }
      ],
      data: [
        {
          name: '资产管家',
          id: 1
        },
        {
          name: '服务商1',
          id: 2
        },
        {
          name: '服务商2',
          id: 3
        },
        {
          name: '服务商3',
          id: 4
        },
        {
          name: '服务商3',
          id: 5
        }
      ],
      active: 1,
    })
  }
  handleClick(item) {
    this.setState({
      active: item.id
    })
  }
  render() {
    const { pictures, picturesLoading, redirect } = this.props
    const {data, active} = this.state;
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
        <div styleName="pic-info">
          <div styleName="pic-title">
            {data && data.map((item, idx) => {
              return (
                <span key={idx} styleName={active === item.id ? 'active': ''} onClick={()=>this.handleClick(item)}>
                  {item.name}
                </span>
              )
            })}
          </div>
          <div>
            <Asset />
          </div>
        </div>
        {
          pictures.imageRoomDTOS && pictures.imageRoomDTOS.map((i, index) => {
            return (
              <div key={index}>
                <SectionTitle>房间{i.roomName}</SectionTitle>
                <CumstomPhotoSwipeGallery data={i.imageDTOS} index={index}/>
              </div>
            )
          })
        }
        <SectionTitle>公区照片</SectionTitle>
        <CumstomPhotoSwipeGallery data={pictures.imageHouseDTOS && pictures.imageHouseDTOS.imageDTOS} index="-1"/>
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    pictures: state.housePicture.pictures,
    indexHouse: state.houseList.indexHouse,
    picturesLoading: state.housePicture.picturesLoading,
    tabsData: state.myHouse.tabsData
  }),
  {
    ...housePicture,
    redirect: url => push(url)
  }
)(HousePicture)
