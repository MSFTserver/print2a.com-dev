/* eslint-disable react/prefer-stateless-function */
import './Links.scss'
import React from 'react'
import { Frame, Link, Heading, Words } from 'arwes'

class Links extends React.Component {
  render() {
    return (
      <div className="Links">
        <Frame
          animate
          level={3}
          corners={8}
          layer="primary"
          timeout={1000}
          appear
          style={{ marginBottom: '6em' }}
        >
          <div className="linksContents">
            <Heading animate show={this.props.anim.entered}>
              <h2>Links</h2>
            </Heading>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Links
