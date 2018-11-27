import { PureComponent } from 'react'
import {connect} from 'react-redux'
import {actions as appActions} from '../reducers/app'
import PropTypes from 'prop-types'

const SHARE_API_LIST = ['onMenuShareTimeline','onMenuShareAppMessage','onMenuShareQQ','onMenuShareWeibo','onMenuShareQZone']
const wx = window.wx

class WxShareConfig extends PureComponent{
    static propTypes = {
        /* 接口列表  不用传入分享相关列表 */
        wxApiList:PropTypes.array,
        /* 需要鉴权的url 如果是当前页面不填 */
        url:PropTypes.string,
        /* 是否启用debug模式  */
        debug:PropTypes.bool,
        wxJsSdk:PropTypes.object,
        shareData:PropTypes.object,
        ready:PropTypes.func
    }
    static defaultProps = {
        ready:()=>null,
        debug:false,
        shareData:{},
        /* 默认加入分享接口 */
        wxApiList:SHARE_API_LIST
    }
    componentDidMount(){
        if(!wx){
            return 
        }

        this.props.getJSSDKConfig(this.props.url)
    }
    configShare(){
        const {shareData} = this.props        
        wx.onMenuShareTimeline({
            ...shareData
        })
    
        wx.onMenuShareAppMessage({
            ...shareData
        })
    
        wx.onMenuShareQQ({
            ...shareData
        })
    
        wx.onMenuShareWeibo({
            ...shareData
        })
    
        wx.onMenuShareQZone({
            ...shareData
        })
    }
    render(){
        const {isGettingJSSDK,wxJsSdk,wxApiList,debug,ready} = this.props
        const apiList = [...SHARE_API_LIST,...wxApiList].filter((item,i,arr)=>arr.indexOf(item) === i)

        if(!isGettingJSSDK && wxJsSdk.appId){ /* 接口调用成功 */
            wx.config({
                debug,
                ...wxJsSdk,
                jsApiList:apiList
            })

            wx.ready(()=>{
                this.configShare()
                ready()
            })
        }

        return null
    }
}

export default connect(state=>({
    isGettingJSSDK:state.app.isGettingJSSDK,
    wxJsSdk:state.app.wxJsSdk
}),appActions)(WxShareConfig)