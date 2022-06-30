/* eslint-disable react/prefer-stateless-function */
import './Browse.scss'
import React from 'react'
import { Frame, Heading, Appear } from 'arwes'
import ChonkyBrowse from './ChonkyBrowse'

class Browse extends React.Component {
  render() {
    const { props } = this
    return (
      <div className="Browse">
        <div className="browseBox">
          <div className="browseContents">
            <ChonkyBrowse {...props} />
          </div>
        </div>
      </div>
    )
  }
}

export default Browse
