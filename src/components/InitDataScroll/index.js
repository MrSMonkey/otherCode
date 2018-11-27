import React, { PureComponent } from 'react'

class InitDataScroll extends PureComponent {
  componentDidMount() {
    const scrolldom = document.getElementById('root')
    scrolldom.addEventListener('scroll', (event) => {
      console.log('~~~~~~', event)
    })
  }
  render() {
    return (
      <div>
        {this.props.children}
        <div>加载更多...</div>
      </div>
    )
  }
}

export default InitDataScroll