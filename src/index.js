import React from 'react'
import { render } from 'react-dom'
import App from './App'
import { AppContainer } from 'react-hot-loader'
import './styles/react-photoswipe/react-photoswipe.global.px.css'
/* import global styles */
import './styles/app.global.css'
import store from './Store'
import { actions as appActions } from './reducers/app'

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
