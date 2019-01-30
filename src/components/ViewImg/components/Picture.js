import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './Picture.css'

@CSSModules(styles)
class ImgSlidePlay extends React.Component{

	constructor(...props) {
        super(...props)
        this.touchRange = 0 // 触控距离
		this.count = 0 // 控制弹层总显示的数字以及当前显示的图片
		this.screenWidth = document.body.clientWidth //屏幕宽度
        this.state = {
            imgIndex: this.props.imgIndex,
            hasMoveStyle: true
        }
    }

    componentDidMount() {
        let carouselImg = this.refs.carouselImg
        if (carouselImg) {
            let imgChildren = Array.from(carouselImg.children, item => item.style.width = this.screenWidth + "px")
            let index = this.props.imgIndex - 1
            carouselImg.style.webkitTransform = 'translate3d(' + index * (-this.screenWidth) + 'px, 0, 0)'
            this.count = index
        }
        console.log(this.props.itemImages)
    }

    startMoveImg(e) {
        this.setState({
        	hasMoveStyle: false
        })
        this.touchRange = e.touches[0].pageX
        e.preventDefault()
    }

    movingImg(length, e) {
        let moveDirection = this.touchRange - e.touches[0].pageX // 当滑动到边界时，再滑动会没有效果
        if ((this.count === 0 && moveDirection < 0) || (this.count === length - 1 && moveDirection > 0)) {
            return
        }

        let conunts = this.count * -this.screenWidth

        this.refs.carouselImg.style.webkitTransform = 'translate3d(' + (conunts - (this.touchRange - e.changedTouches[0].pageX)) + 'px, 0, 0)'
    }

    endMoveImg(length, itemImages, e) {

        this.setState({
        	hasMoveStyle: true
        })

        if (this.touchRange - e.changedTouches[0].pageX > 100) {
            this.count++
            if (this.count === length) {
                this.count = length - 1
                return
            }
            this.setState({
                imgIndex: this.state.imgIndex + 1
            })
        } else if (this.touchRange - e.changedTouches[0].pageX < -100) {
            this.count--
            if (this.count < 0) {
                this.count = 0
                return
            }
            this.setState({
                imgIndex: this.state.imgIndex - 1
            })
        }

        this.refs.carouselImg.style.webkitTransform = 'translate3d(' + this.count * (-this.screenWidth) + 'px, 0, 0)'
    }

	render() {
		const { itemImages, showImg } = this.props
    
		return (
		  	<div styleName="Img">
          <p>{this.state.imgIndex}/{itemImages.length}</p>
          <span onClick={showImg.bind(null)}>×</span>
          <ul styleName={this.state.hasMoveStyle ? `translate` : `full-height`} ref="carouselImg">
              {
                itemImages.map((item, index) => (
                  <li styleName="flex-columns"
                      onTouchStart={this.startMoveImg.bind(this)}
                      onTouchMove={this.movingImg.bind(this, itemImages.length)}
                      onTouchEnd={this.endMoveImg.bind(this, itemImages.length, itemImages)}
                      key={index}>
                      <img src={item} onClick={showImg.bind(null)}/>
                  </li>
                ))
              }
          </ul>
      </div>
		)
	}
}
export default ImgSlidePlay