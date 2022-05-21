import './NavBar.scss';
import React from 'react';
import {
  Button, Header, Heading, Row,
} from 'arwes';
import { Link } from 'react-router-dom';

class NavBar extends React.Component {
  render() {
    return (
      <div className="NavBar">
        <Header animate show={this.props.anim.entered}>
        <nav className="container-fluid navbar">
          <div>
              <Heading animate show={this.props.anim.entered}>
                <h1>Print2a</h1>
              </Heading>
          </div>
          <Row className="row wrap mr-1" id="navLinks" col s={12}>
            <Link to="/" id="navToHome"><Button animate show={this.props.anim.entered} onClick={this.props.setShowHomePage}>Home</Button></Link>
            <Link to="/latest" id="navToLatest"><Button animate show={this.props.anim.entered} onClick={this.props.setShowLatest}>Latest</Button></Link>
            <Link to="/links" id="navToLinks"><Button animate show={this.props.anim.entered} onClick={this.props.setShowLinks}>Links</Button></Link>
            <Link to="/browse" id="navToBrowse"><Button animate show={this.props.anim.entered} onClick={this.props.setShowBrowse}>Browse</Button></Link>
          </Row>
        </nav>
        </Header>
      </div>
    );
  }
}

export default NavBar;
