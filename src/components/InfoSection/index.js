import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './InfoSection.css'

const InfoSectionHeader = ({ children }) => (
  <h2 styleName="header">{children}</h2>
)

const InfoSectionItem = ({ label, children }) => (
  <div styleName="item">
    <span styleName="item-label">{label}</span>
    :
    <span styleName="item-info">{children}</span>
  </div>
)

const SectionTitle = ({ children }) => <div styleName="title">{children}</div>

const StyledInfoSectionHeader = CSSModules(InfoSectionHeader, styles)
const StyledInfoSectionItem = CSSModules(InfoSectionItem, styles)
const StyledSectionTitle = CSSModules(SectionTitle, styles)

@CSSModules(styles)
class InfoSection extends PureComponent {
  static propTypes = {
    title: PropTypes.string
  }

  render() {
    const { title, children } = this.props

    return (
      <div styleName="section">
        <StyledInfoSectionHeader>{title}</StyledInfoSectionHeader>
        <div styleName="section-body">{children}</div>
      </div>
    )
  }
}

export {
  StyledInfoSectionItem as InfoSectionItem,
  StyledSectionTitle as SectionTitle
}
export default InfoSection
