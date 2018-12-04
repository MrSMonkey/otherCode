import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import './styles/react-photoswipe/react-photoswipe.global.px.css'
/* import global styles */
import './styles/app.global.css'
import store from './Store'
import { actions as appActions } from './reducers/app'
import { localStore } from './utils'

const date = new Date()
const time = date.getTime()
const indate = localStore.get('time')
if (indate && indate !== 'undefined') {
  // console.log('有效期:',indate, '; 当前时间',time, '; 是否过期', time > indate)
  if (time > indate) {
    localStore.remove('access_token')
    localStore.remove('refresh_token')
    localStore.remove('userId')
    localStore.remove('time')
  }
}

const appRender = () =>
  render(
    /* enable hot reload */
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('root')
  )
const bootstrap = () => {
  store.dispatch(appActions.doWechatAuth())
  appRender()
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
}

bootstrap()
