import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PhotoSwipeGallery } from 'react-photoswipe'
import { actions as housePicture } from '../reducers/housePicture'
import { push } from 'connected-react-router'
import ReactLoading from 'react-loading'
import Tabs from '../components/Tabs'
import { SectionTitle } from '../components/InfoSection'

const imgs = {
  imgBg: require('../assets/imgs/icon_img.png')
}

const options = {
  history: false,
  shareEl: false
}

const CumstomPhotoSwipeGallery = props => {
  let data = []
  if (props.data) {
    props.data.forEach(item => {
      const img = new Image()
      img.src = `${item.imageUrl}?imageView2/2/w/300`
      data.push({
        src: `${item.imageUrl}?imageView2/2/w/300`,
        w: img.width,
        h: img.height
      })
    })
  }
  return (
    <PhotoSwipeGallery
      className="house-pic-gallery"
      items={data}
      options={options}
      isOpen={false}
      thumbnailContent={item => {
        return <img className="img-bg"
          key={item}
          src={item.thumbnail || item.src} 
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
      ]
    })
  }
  render() {
    const { pictures, picturesLoading, redirect } = this.props
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
        {
          pictures.imageRoomDTOS && pictures.imageRoomDTOS.map((i, index) => {
            return (
              <div key={index}>
                <SectionTitle>房间{i.roomName}</SectionTitle>
                <CumstomPhotoSwipeGallery data={i.imageDTOS} />
              </div>
            )
          })
        }
        <SectionTitle>公区照片</SectionTitle>
        <CumstomPhotoSwipeGallery data={pictures.imageHouseDTOS && pictures.imageHouseDTOS.imageDTOS} />
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
