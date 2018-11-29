import React from 'react'
import CSSModules from 'react-css-modules'
import style from './Tabs.css'


/**
 * 
 * @param {active: boolean, text: string, href: string} data 
 * redirect
 */
const Index = ({ data = [], redirect }) => {
  return (
    <div styleName="tabs-plan">
      {data.map((item, index) => {
        return (
          <div
            styleName={item.active ? 'tabs-active' : 'tabs-box'}
            key={index}
            onClick={() => { if (item.href) { redirect(item.href) } }}>
            <p>{item.text}</p>
          </div>
        )
      })}
    </div>
  )
}
const Tabs = CSSModules(Index, style)

export default Tabs;