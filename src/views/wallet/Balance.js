import React, { Component } from 'react'
import CSSModules from 'react-css-modules'
import styles from './Balance.css'
import { connect } from 'react-redux'
import { actions as balanceActions } from '../../reducers/balance'
import ReactLoading from 'react-loading'
@CSSModules(styles, { allowMultiple: true })
class Balance extends Component{
    state = {
        stopped: true,
        data: [1,2,3,4,5,6,7,8,9,10],
        isLoadingMore: false,
    }
    componentDidMount() {
        console.log(this.props)
        //this.props.getRecord(1,this.props.params.pageIndex,this.props.params.pageSize)
		const wrapper = this.refs.wrapper;
        const loadMoreDataFn = this.loadMoreDataFn;
        const that = this; // 为解决不同context的问题
        let timeCount;
        function callback() {
            const top = wrapper.getBoundingClientRect().top;
            const windowHeight = window.screen.height;
            console.log(top, windowHeight)
            if (top && top + 100 < windowHeight) {
            // 当 wrapper 已经被滚动到页面可视范围之内触发
                loadMoreDataFn(that);
            }
        }

        window.addEventListener('scroll', function () {
            debugger
            if (this.state.isLoadingMore) {
                return ;
            }

            if (timeCount) {
                clearTimeout(timeCount);
            }

            timeCount = setTimeout(callback, 50);
        }.bind(this), false);
    }
    loadMoreDataFn(that) {
        that.props.getRecord(1,that.props.params.pageIndex + 1,that.props.params.pageSize)
    }
    render () {
        const { balabceList,isLoadingMore } = this.props
        const ctx1 = require('../../assets/imgs/balance.png')
        return (
            <div styleName="balance">
                {balabceList && balabceList.length > 0 ?  <div>
                    {balabceList.map((item,index) => 
                        <div styleName="list" key={index}>
                            <div styleName="top">
                                <span styleName="operate">充值{item}</span>
                                <span styleName="date">2017/11/14 16:55</span>
                            </div>
                            <div styleName="bottom">
                                <span styleName="money">余额:100</span>
                                <span styleName="moneyOperate">+100</span>
                            </div>
                        </div> 
                    )}
                <div ref="wrapper" styleName="loadingMore">加载更多{isLoadingMore?<div className="infinte-loader" styleName="loading">
					<ReactLoading
						type="spokes"
						className="inline-block"
                        color="#474747"
                        width="12px"
                        height="12px"
					/>
				</div>:null}</div>  
                </div>: <div styleName="no-data">
                    <img src={ctx1} alt=""/>
                    <p>暂无数据</p>
                    </div>}
            </div>
        )
    }
}




export default connect(
    state => ({
        flag: true,
        isLoadingMore: state.balance.isLoadingMore,
        params: state.balance.params,
        balabceList:state.balance.data
    }), {
        ...balanceActions
    }
)(Balance)