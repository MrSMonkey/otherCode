import React from 'react'
import { Provider, connect } from 'react-redux'
import store, { history } from './Store'
import { Route, Switch } from 'react-router-dom'
import LoadingBar from 'react-redux-loading-bar'
import { Helmet } from 'react-helmet'
import { ConnectedRouter } from 'connected-react-router'
import routes from './routes'
import needAuth from './components/hoc/needAuth'
/* import ControlledSwitch from './components/ControlledSwitch' //实际使用中重定向会有问题，暂时不使用  */
import createToast from './components/NotifyToast'
import { localStore } from './utils'

const date = new Date()
const time = date.getTime()
const indate = localStore.get('time')
if (indate && indate !== 'undefined') {
  console.log('有效期:',indate, '; 当前时间',time, '; 是否过期', time > indate)
  if (time > indate) {
    localStore.remove('access_token')
    localStore.remove('refresh_token')
    localStore.remove('userId')
    localStore.remove('time')
  }
}

const ViewMeta = props => (
  <Helmet>
    <title>{props.title}</title>
    {props.metas && props.metas.length
      ? props.metas.map((m, index) => <meta key={index} {...m} />)
      : null}
  </Helmet>
)

const ViewWithMeta = ({ routeConfig, ...props }) => (
  <React.Fragment>
    <ViewMeta title={routeConfig.title} metas={routeConfig.metas} />
    <routeConfig.component {...props} />
  </React.Fragment>
)

const ErrorToast = createToast()

const AuthedView = needAuth(ViewWithMeta)
const AppInstance = ({ isInitiating, showNotice, noticeType, noticeMsg }) => {
  return (
    <ConnectedRouter history={history}>
      {isInitiating ? null : (
        <React.Fragment>
          <LoadingBar style={{ backgroundColor: '#c3aa82' }} />
          <ErrorToast show={showNotice} type={noticeType}>
            {noticeMsg}
          </ErrorToast>
          <Switch routes={routes}>
            {routes.map((route, i) => (
              <Route
                exact={route.exact}
                key={i}
                path={route.path}
                render={props => {
                  if (route.needBind && !indate) {
                    return <AuthedView routeConfig={route} {...props} />
                  }
                  return <ViewWithMeta routeConfig={route} {...props} />
                }}
              />
            ))}
          </Switch>
        </React.Fragment>
      )}
    </ConnectedRouter>
  )
}

const StateAppInstance = connect(state => ({
  isInitiating: state.app.isInitiating,
  showNotice: state.app.showNotice,
  noticeType: state.app.noticeType,
  noticeMsg: state.app.noticeMsg
}))(AppInstance)

const App = () => (
  <Provider store={store}>
    <StateAppInstance />
  </Provider>
)

export default App
