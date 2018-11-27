import React from 'react'

const ctx = require('../assets/imgs/icon_arrow.png')
export default props => (
    <div className="recharge" onClick={props.handleClick}>
        <span>{props.name}</span>
        <img src={ctx} alt=""></img>
    </div>
)
