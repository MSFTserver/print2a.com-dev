/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/prefer-stateless-function */
import './NavBar.scss'
import React from 'react'
import { Button, Header, Heading, Row, Words } from 'arwes'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

class NavBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.props.state,
      menuActive: false,
    }
  }

  setMenuActive = (isActive) => {
    this.setState(() => ({
      menuActive: isActive,
    }))
  }

  mobileMenuClicked = () => {
    if (!this.state.menuActive) {
      document.getElementById('navLinks').style.display = 'block'
      this.setMenuActive(true)
    } else {
      document.getElementById('navLinks').style.display = 'none'
      this.setMenuActive(false)
    }
  }

  render() {
    const { props, mobileMenuClicked } = this
    const { state, setShowPage, sounds, anim } = props
    let { showPage } = state

    const location = window.location.pathname
    if (location === '/') {
      showPage = 'home'
    } else if (location === '/latest') {
      showPage = 'latest'
    } else if (location === '/links') {
      showPage = 'links'
    } else if (location === '/browse') {
      showPage = 'browse'
    } else if (location === '/modelViewer') {
      showPage = 'modelViewer'
    } else {
      showPage = 'home'
    }

    return (
      <div className="NavBar">
        <Header animate show={anim.entered}>
          <nav className="container-fluid navbar">
            <Heading>
              Print2a
              <div id="mobileMenu" onClick={mobileMenuClicked}>
                <li className="fa fa-bars" title="Click me!" />
              </div>
            </Heading>
            <Row className="row wrap mr-1" id="navLinks" col s={12}>
              <Link to="/">
                <Button
                  className="navToButton"
                  animate
                  disabled={showPage === 'home'}
                  show={anim.entered}
                  onClick={setShowPage}
                  onMouseEnter={() => sounds.hover.play()}
                >
                  <Words className="navToText">Home</Words>
                </Button>
              </Link>
              <Link to="/latest">
                <Button
                  className="navToButton"
                  animate
                  disabled={showPage === 'latest'}
                  show={anim.entered}
                  onClick={setShowPage}
                  onMouseEnter={() => sounds.hover.play()}
                >
                  <Words className="navToText">Latest</Words>
                </Button>
              </Link>
              <Link to="/links">
                <Button
                  className="navToButton"
                  animate
                  disabled={showPage === 'links'}
                  show={anim.entered}
                  onClick={setShowPage}
                  onMouseEnter={() => sounds.hover.play()}
                >
                  <Words className="navToText">Links</Words>
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  className="navToButton"
                  animate
                  disabled={showPage === 'browse'}
                  show={anim.entered}
                  onClick={setShowPage}
                  onMouseEnter={() => sounds.hover.play()}
                >
                  <Words className="navToText">Browse</Words>
                </Button>
              </Link>
            </Row>
          </nav>
        </Header>
      </div>
    )
  }
}

NavBar.propTypes = {
  state: PropTypes.any.isRequired,
  setShowPage: PropTypes.func.isRequired,
  sounds: PropTypes.any.isRequired,
  anim: PropTypes.any.isRequired,
}

export default NavBar
