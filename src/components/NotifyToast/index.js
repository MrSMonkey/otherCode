import React from 'react'
import ReactDOM from 'react-dom'
import NotifyToast, { defaultOptions } from './NotifyToast'

const CONTAINER_ID = 'notify_toast_container_id'

function createContainer() {
  let t = document.getElementById(CONTAINER_ID)
  if (!t) {
    t = document.createElement('div')
    t.id = CONTAINER_ID
    document.body.appendChild(t)
  }
  return t
}

function renderNotify(props) {
  let target = createContainer()
  return ReactDOM.render(<NotifyToast {...props} />, target)
}

function hide() {
  renderNotify({ show: false })
}

function show(t, userOptions = {}) {
  renderNotify({
    children: t,
    ...userOptions,
    show: true
  })

  const delay = userOptions.delay || defaultOptions.delay

  if (delay >= 0) {
    setTimeout(() => {
      hide()
    }, delay)
  }
}

function createToast(options) {
  let target = createContainer()
  return props => {
    const p = { ...options, ...props }
    return ReactDOM.createPortal(<NotifyToast {...p} />, target)
  }
}

export { hide, show }
export default createToast
