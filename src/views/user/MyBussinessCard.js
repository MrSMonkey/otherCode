import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import CSSModules from 'react-css-modules'
import { PhotoSwipe } from 'react-photoswipe'
import styles from './MyBussinessCard.css'
import html2canvas from 'html2canvas'
import PropTypes from 'prop-types'
import { getRuntimeInfo } from '../../utils'
import { BUSSINESS_CARD_STATIC, APP_TYPE } from '../../utils/const'

const { appType } = getRuntimeInfo()
const isWeixin = appType === APP_TYPE.wechat
const galleryItems = BUSSINESS_CARD_STATIC.map(card => ({
  ...card,
  w: 210,
  h: 372
}))
const options = {
  history: false,
  closeOnScroll: false,
  shareEl: false,
  isClickableElement: function(el) {
    return el.tagName === 'A' || el.tagName === 'IMG'
  }
}

const Card = ({ src, title, onClick, w, h }) => (
  <div styleName="card-box" onClick={onClick}>
    <div styleName="card-img">
      <img src={src} alt={title} width={w} height={h} />
    </div>
    <p>{title}</p>
  </div>
)
const StyledCard = CSSModules(Card, styles)

@CSSModules(styles)
class SnapshotCard extends PureComponent {
  /* 生成截图的组件 */
  static propTypes = {
    text: PropTypes.string,
    avatar: PropTypes.string,
    onTransformEnd: PropTypes.func
  }

  static defaultProps = {
    onTransformEnd: () => null
  }

  el = React.createRef()
  componentDidMount() {
    html2canvas(this.el.current, { allowTaint: true }).then(canvas => {
      this.props.onTransformEnd(canvas)
    })
  }

  render() {
    const { text, avatar } = this.props
    return (
      <div styleName="shot-box" ref={this.el}>
        <div styleName="shot-text">
          <p>
            我是
            {text}
          </p>
          <p>我为星空业主代言</p>
        </div>
        <div styleName="shot-avatar">
          <img src={avatar} alt="user avatar" />
        </div>
      </div>
    )
  }
}

@CSSModules(styles)
class MyBussinessCard extends PureComponent {
  state = {
    isOpen: false,
    currentIndex: 0,
    isTransformEnd: false,
    cardItems: galleryItems
  }

  openGallery = index => {
    this.setState({
      isOpen: true,
      currentIndex: index
    })
  }
  closeGallery = () => {
    this.setState({
      isOpen: false
    })
  }
  onTransformEnd = canvas => {
    let canvasUrl
    try {
      canvasUrl = canvas.toDataURL('image/jpg')
    } catch (e) {
      alert(e.message)
    }

    this.state.cardItems.splice(0, 1, {
      w: 210,
      h: 372,
      title: '名片1',
      src: canvasUrl
    })

    this.setState({
      isTransformEnd: true,
      cardItems: [...this.state.cardItems]
    })
  }
  render() {
    const { Nickname, HeadImgurlBase64 } = this.props.user
    const { cardItems, currentIndex, isTransformEnd } = this.state

    return (
      <div>
        <div styleName="card-list">
          {cardItems.map((card, index) => (
            <StyledCard
              onClick={() => this.openGallery(index)}
              key={card.title}
              src={card.src}
              title={card.title}
            />
          ))}
        </div>

        <div styleName="card-list-wrap">
          <PhotoSwipe
            options={{ ...options, index: currentIndex }}
            className="photo-swipe-tips"
            items={cardItems}
            isOpen={this.state.isOpen}
            onClose={this.closeGallery}
          />
        </div>
        {isWeixin && !isTransformEnd ? (
          <SnapshotCard
            text={Nickname}
            avatar={HeadImgurlBase64}
            onTransformEnd={this.onTransformEnd}
          />
        ) : null}
      </div>
    )
  }
}

export default connect(state => ({
  user: state.app.landlordInfo
}))(MyBussinessCard)
