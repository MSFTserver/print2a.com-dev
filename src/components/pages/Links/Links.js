/* eslint-disable react/prefer-stateless-function */
import './Links.scss'
import React from 'react'
import { Frame, Heading, Words, Link, Line } from 'arwes'

class Links extends React.Component {
  render() {
    return (
      <div className="Links">
        <Frame
          animate
          level={3}
          corners={6}
          layer="primary"
          show={this.props.anim.entered}
        >
          <div className="linksBox">
            <div className="linksContents">
              <Heading node="h1">
                <div className="h1">Alternative Download Links</div>
              </Heading>
              <Line />
              <div className="linksWords">
                <Heading node="h3">
                  <div className="h3">LBRY/Odysee:&nbsp;</div>
                </Heading>
                <Link href="http://lbry.print2a.com/">
                  <Words
                    style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                    animate
                    layer="alert"
                    show={this.props.anim.entered}
                  >
                    http://lbry.print2a.com/
                  </Words>
                </Link>
              </div>
              <div className="linksWords">
                <Heading node="h3">
                  <div className="h3">RSYNC:&nbsp;</div>
                </Heading>
                <Words
                  style={{ textShadow: '0 0 4px rgba(215, 24, 24, 0.65)' }}
                  animate
                  layer="alert"
                  show={this.props.anim.entered}
                >
                  print2a.com:1776/print2a
                </Words>
              </div>
              <Line />
            </div>
          </div>
        </Frame>
      </div>
    )
  }
}

export default Links
