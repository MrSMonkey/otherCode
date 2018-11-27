import React, { Component } from 'react'
import { withRouter, matchPath } from 'react-router'
import { Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading-bar'
import _ from 'lodash'

class ControlledSwitch extends Component {
  state = { previousLocation: this.props.location }

  static propTypes = {
    routes: PropTypes.array.isRequired
  }
  isLoading = false
  componentDidUpdate(prevProps) {
    const { location, dispatch } = this.props
    const { previousLocation } = this.state
    const navChanged = previousLocation !== location
    const routeConfig = _.find(this.props.routes, r =>
      matchPath(location.pathname, { path: r.path, exact: true })
    )

    if (this.isLoading) {
      return
    }
    if (navChanged) {
      if (
        routeConfig &&
        routeConfig.component &&
        routeConfig.component.preload
      ) {
        this.setState({
          previousLocation: prevProps.location
        })
        dispatch(showLoading())
        this.isLoading = true

        routeConfig.component.preload().then(comp => {
          dispatch(hideLoading())
          this.isLoading = false
          this.setState({
            previousLocation: location
          })
        })

        return
      }

      this.setState({
        previousLocation: location
      })
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (
      nextState.previousLocation === this.state.previousLocation &&
      nextProps.location === this.props.location
    ) {
      return false
    }

    return true
  }
  render() {
    const { previousLocation } = this.state
    const { children } = this.props
    return <Switch location={previousLocation}>{children}</Switch>
  }
}

export default withRouter(connect()(ControlledSwitch))
