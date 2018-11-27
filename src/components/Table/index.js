import React, { Component } from 'react'
import PropTypes from 'prop-types'
import CSSModules from 'react-css-modules'
import styles from './Table.css'

class Column extends Component {}

class Table extends Component {
  static propTypes = {
    dataSource: PropTypes.array
  }
  static defaultProps = {
    dataSource: []
  }
  static Column = Column

  vw(val) {
    return `${(100 / 750) * val}vw`
  }

  renderHead = columns => (
    <thead>
      <tr>
        {columns.map((d, index) => (
          <th key={index} style={{ width: this.vw(d.width) }}>
            {d.title}
          </th>
        ))}
      </tr>
    </thead>
  )

  renderBody = (data, columns, onClick) => (
    <tbody>
      {data.map((d, i) => (
        <tr
          key={d.key || i}
          onClick={() => {
            return onClick(d)
          }}
        >
          {columns.map((c, cIndex) => {
            const key = c.dataIndex || cIndex
            const columnData = d[c.dataIndex]

            return (
              <td key={key}>
                {c.render && typeof c.render === 'function'
                  ? c.render(columnData, c, cIndex)
                  : columnData}
              </td>
            )
          })}
        </tr>
      ))}
    </tbody>
  )

  normalizeColumns(children) {
    const columns = []

    React.Children.map(children, c => {
      if (!React.isValidElement(c)) {
        return
      }
      const column = {
        ...c.props
      }

      if (c.key) {
        column.key = c.key
      }

      columns.push(column)
    })

    return columns
  }

  render() {
    const { dataSource, children, border, title, onClick } = this.props
    const columns = this.normalizeColumns(children)

    return (
      <div>
        <div
          styleName="table-title"
          style={{ display: title ? 'block' : 'none' }}
        >
          {title}
        </div>
        <table styleName={border ? 'border-table' : 'bill-table'}>
          {this.renderHead(columns)}
          {this.renderBody(dataSource, columns, onClick)}
        </table>
      </div>
    )
  }
}

export default CSSModules(Table, styles)
