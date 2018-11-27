import React from 'react'
import { Redirect } from 'react-router'
import { connect } from 'react-redux'

const loginPath = '/bind'

const authWrapper = Comp => ({ isLogined, location, ...rest }) => {
  return isLogined ? (
    <Comp {...rest} location={location} />
  ) : (
    <Redirect
      to={{
        pathname: loginPath,
        search: `?redirect=${encodeURIComponent(
          location.pathname + location.search
        )}`
      }}
    />
  )
}

const needAuth = Comp => {
  return connect(state => ({
    isLogined: state.app.bindState
  }))(authWrapper(Comp))
}

export default needAuth
