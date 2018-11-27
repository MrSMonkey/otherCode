import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import styles from './Icon.css'
import CSSModules from 'react-css-modules'

const ctx = require.context('../../assets/imgs/icons', true, /^\.\//)

function getBaseName(path) {
  if (!path) {
    return false
  }
  path = path.split('/')
  const ret = path[path.length - 1]

  return ret.replace(/\.\w*/, '')
}

function getIconsMap(ctx) {
  return ctx.keys().reduce((icons, req) => {
    const name = getBaseName(req)
    icons[name] = ctx(req)
    return icons
  }, {})
}

const ICONS_MAP = getIconsMap(ctx)


class Icon extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  vw (val) {
    return `${(100 / 750) * val}vw`;
  }

  render() {
    const { name , width, height, style} = this.props;
    return (
      <i styleName={name} style={{
        width: this.vw(width),
        height: this.vw(height),
        backgroundImage:`url(${ICONS_MAP[name]})`,
        ...style
        }} 
      />
    )
  }
}

export default CSSModules(Icon,styles)

/**
 * name: string
 * width: num
 * height: num
 * style: {}
 */
