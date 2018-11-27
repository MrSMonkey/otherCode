import React, { Component } from 'react'
import { connect } from 'react-redux'
import { PhotoSwipeGallery } from 'react-photoswipe'
import { actions as housePicture } from '../reducers/housePicture'
import { actions as houseListActions } from '../reducers/houseList'
import ReactLoading from 'react-loading'
import ViewTitle from '../components/ViewTitle'
import { SectionTitle } from '../components/InfoSection'

const options = {
  history: false,
  shareEl: false
}

const CumstomPhotoSwipeGallery = props => {
  let data = []
  if (props.data) {
    data = props.data.map(item => {
      return {
        src: item,
        w: 210,
        h: 210
      }
    })
  }
  return (
    <PhotoSwipeGallery
      className="house-pic-gallery"
      items={data}
      options={options}
      isOpen={false}
      thumbnailContent={item => (
        <img alt={item.title} src={item.thumbnail || item.src} />
      )}
    />
  )
}

class HousePicture extends Component {
  formDate(val) {
    if (val) {
      return val.slice(1, 10)
    } else {
      return ''
    }
  }
  componentDidMount() {
    const params = this.props.match.params
    this.props.getHouseList(params.houseId)
    this.props.getHousePicture(params)
  }
  render() {
    const { pictures, indexHouse, picturesLoading } = this.props
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
        <ViewTitle
          title={`${indexHouse.CommunityName} ${indexHouse.HouseNumber}`}
          desc={`${this.formDate(indexHouse.StartDate)} 至 ${this.formDate(
            indexHouse.EndDate
          )}`}
        />
        <SectionTitle>房源照片（装配前）</SectionTitle>
        <CumstomPhotoSwipeGallery data={pictures.BeforImg} />
        <SectionTitle>房源照片（装配后）</SectionTitle>
        <CumstomPhotoSwipeGallery data={pictures.AfterImg} />
        <SectionTitle>房东合同照片</SectionTitle>
        <CumstomPhotoSwipeGallery data={pictures.ContactImg} />
      </React.Fragment>
    )
  }
}

export default connect(
  state => ({
    pictures: state.housePicture.pictures,
    indexHouse: state.houseList.indexHouse,
    picturesLoading: state.housePicture.picturesLoading
  }),
  {
    ...housePicture,
    ...houseListActions
  }
)(HousePicture)
