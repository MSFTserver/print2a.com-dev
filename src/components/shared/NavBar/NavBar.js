/* eslint-disable react/prefer-stateless-function */
import './NavBar.scss'
import React from 'react'
import { Button, Header, Heading, Row, SoundsProvider } from 'arwes'
import { Link } from 'react-router-dom'

class NavBar extends React.Component {
  render() {
    return (
      <div className="NavBar">
        <Header animate show={this.props.anim.entered}>
          <nav className="container-fluid navbar">
            <Heading>Print2a</Heading>
            <Row className="row wrap mr-1" id="navLinks" col s={12}>
              <SoundsProvider sounds={this.props.sounds}>
                <Link to="/" id="navToHomePage">
                  <Button
                    animate
                    disabled={this.props.state.showHomePage}
                    show={this.props.anim.entered}
                    onClick={this.props.setShowHomePage}
                  >
                    Home
                  </Button>
                </Link>
                <Link to="/latest" id="navToLatest">
                  <Button
                    animate
                    disabled={this.props.state.showLatest}
                    show={this.props.anim.entered}
                    onClick={this.props.setShowLatest}
                  >
                    Latest
                  </Button>
                </Link>
                <Link to="/links" id="navToLinks">
                  <Button
                    animate
                    disabled={this.props.state.showLinks}
                    show={this.props.anim.entered}
                    onClick={this.props.setShowLinks}
                  >
                    Links
                  </Button>
                </Link>
                <Link to="/browse" id="navToBrowse">
                  <Button
                    animate
                    disabled={this.props.state.showBrowse}
                    show={this.props.anim.entered}
                    onClick={this.props.setShowBrowse}
                  >
                    Browse
                  </Button>
                </Link>
              </SoundsProvider>
            </Row>
          </nav>
        </Header>
      </div>
    )
  }
}

export default NavBar
