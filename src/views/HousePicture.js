import React, { Component } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import { PhotoSwipeGallery } from 'react-photoswipe'
import { actions as housePicture } from '../reducers/housePicture'
import { push } from 'connected-react-router'
import ReactLoading from 'react-loading'
import Tabs from '../components/Tabs'
import { SectionTitle } from '../components/InfoSection'
import ImgSlidePlay from '../components/ViewImg/components/Picture';
import styles from './HousePicture.css'
const imgs = {
  imgBg: require('../assets/imgs/icon_img.png')
}

// const options = {
//   history: false,
//   shareEl: false,
// }
@CSSModules(styles)
class CumstomPhotoSwipeGallery extends Component {
  state = {
    data: []
  }
  render() {
    const { data, showImg } = this.props
    return (
      <div>
        <ul styleName="ItemImg">
          {
            data && data.map((item, index) => {
              return (
                <li key={index} onClick={showImg.bind(null, index)}>
                  <img src={item} />
                </li>
              )
            })
          }
        </ul>
      </div>
    )
  }
}



@CSSModules(styles)
class ParentPhotoSwipeGallery extends React.Component{

	constructor(...args) {
		super(...args)
		this.state = {
			isImgShow: false,
      imgIndex: 1,
      data: []
		}
	}
  componentDidMount() {
    let arr = []
    if (this.props.data) {
      arr = this.props.data.map((item, index) => {
        return item.imageUrl
      })
      this.setState({
        data: arr
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
        arr = this.props.data.map((item, index) => {
          return item.imageUrl
        })
        this.setState({
          data: arr
        })
      }
    })
  }
	showImg(imgIndex = 0) {
		this.setState({
			isImgShow: !this.state.isImgShow,
			imgIndex: imgIndex + 1
		})
	}

	render() {
    const { data } = this.state
		return (
			<div>
				<CumstomPhotoSwipeGallery data={data} showImg={this.showImg.bind(this)} />
				{
					this.state.isImgShow && <ImgSlidePlay itemImages={data} showImg={this.showImg.bind(this)} imgIndex={this.state.imgIndex}/>
				}  			
	  		</div>	
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
      {/* 合租 */}
      {data && data.houseRentRoomDTO && data.rentType === 2 &&data.houseRentRoomDTO.map((item, index) =>{
        return (
          <div styleName="block" key={index}>
            <label>房间{item.roomName}：</label>
            <span>{item.rent && item.rent || '0.00'}元/月 | {rentStatus[item.rentStatus || 1]}</span>
          </div>
        )
      })}
      {/* 整租 */}
      {data && data.houseRentRoomDTO && data.rentType === 1 &&
        <div styleName="block" >
        <label>出租价格：</label>
        <span>{data.houseRentRoomDTO[0].rent && data.houseRentRoomDTO[0].rent || '0.00'}元/月 | {rentStatus[data.houseRentRoomDTO[0].rentrentStatus || 1]}</span>
      </div>
      }
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
              {pictures && pictures.length > 1 && pictures.map((item, idx) => {
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
                  <ParentPhotoSwipeGallery data={i.roomImages} index={index}/>
                </div>
              )
            })
          }
          <SectionTitle>公区照片</SectionTitle>
          <ParentPhotoSwipeGallery data={selectData && selectData.housePublicImages && selectData.housePublicImages} index="-1"/>
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
