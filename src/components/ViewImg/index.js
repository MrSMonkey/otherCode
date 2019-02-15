import React from 'react'
import CSSModules from 'react-css-modules'
import styles from './viewImg.css'
import ImgSlidePlay from './components/Picture';
// 父组件
@CSSModules(styles)
class Parent extends React.Component{

	constructor(...args) {
		super(...args)
		this.state = {
			isImgShow: false,
			imgIndex: 1
		}
	}

	showImg(imgIndex = 0) {
		this.setState({
			isImgShow: !this.state.isImgShow,
			imgIndex: imgIndex + 1
		})
	}

	render() {
		const { images } = this.props
		return (
			<div styleName='Slide'>
				<ShowImg itemImages={images} showImg={this.showImg.bind(this)} />
				{
					this.state.isImgShow && <ImgSlidePlay itemImages={images} showImg={this.showImg.bind(this)} imgIndex={this.state.imgIndex}/>
				}  			
	  		</div>	
		)
	}
}

// 显示图片组件
@CSSModules(styles)
class ShowImg extends React.Component{
  showImgBox = (imgs) => {
    const img = new Image();
    let w = ""; //图片宽度
    let h = ""; //图片高度
    img.src = `${imgs}`
    w = img.width
    h = img.height
    if (w < h) {
      return <img src={imgs} alt="" styleName="imgsW"/>
    } else {
      return <img src={imgs} alt="" styleName="imgsh"/>
    }
  }
	render() {
		const { itemImages, showImg } = this.props
		return (
      <div>
        <ul styleName="ItemImg">
          {
            itemImages.map((item, index) => {
              return (
                <li key={index} onClick={showImg.bind(null, index)}>
                {this.showImgBox(item)}
                  {/* <img src={item} /> */}
                </li>
              )
            })
          }
        </ul>
      </div>
		)
	}
}


export default Parent
