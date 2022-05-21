import './HomePage.scss';
import React from 'react';
import { Frame, Row, Heading, Words, Link } from 'arwes';

class HomePage extends React.Component {
  state = {
    imageClicked: false,
  }

  swapImage1 = () => {
    this.setState({ imageClicked: true });
  }

  swapImage2 = () => {
    this.setState({ imageClicked: false });
  }

  render() {
    return (
      <div className="HomePage">
        <Frame animate level={3} corners={8} layer='primary' show={this.props.anim.entered} style={{ marginBottom: '5em' }}>
          <h2>
            <Words animate show={this.props.anim.entered}>
              “A well regulated Militia, being necessary to the security of a free State, the right of the people to keep and bear Arms, shall not be infringed.”
            </Words>
          </h2>
          <div className="homePageContents">
            <Heading animate show={this.props.anim.entered}>
              <h1 className="title">About Print2a</h1>
            </Heading>
            <Row className="row d-flex myInfo m-0 col-m-6">
              <div className="col">
                <div className="homePageText">
                  <p>
                    <Words animate show={this.props.anim.entered}>
                      This is a collection of 3D Printed weaponry. These files have been collected across various repositories to bring them to one easy to find organized place. Some repos include fosscad, AWCY?, det_disp and other sources far and wide!
                    </Words>
                  </p>
                </div>
              </div>
            </Row>
            <Heading animate show={this.props.anim.entered}>
              <h2 className="title">Donate</h2>
            </Heading>
            <Row className="row d-flex myInfo m-0 col-m-6">
              <div className="col">
                <p>
                  <Words animate show={this.props.anim.entered}>
                    If you like the site and what I have put together, please consider donating to help with server costs to keep this site running. Anything helps as costs are quite low right now.
                  </Words>
                </p>
                <p>
                  <Words layer="header" animate show={this.props.anim.entered}>
                  PayPal:
                  </Words>
                  <br></br>
                  <Link href="http://donate.print2a.com/"><Words animate show={this.props.anim.entered}>
                  http://donate.print2a.com/
                  </Words></Link>
                </p>
                <p>
                  <Words layer="header" animate show={this.props.anim.entered}>
                  BTC Address:</Words>
                  <br></br>
                  <Words animate show={this.props.anim.entered}>
                  34CnFqMvsrmhZA1kDyV6iD91GV9Vn3dd94
                  </Words>
                </p>
              </div>
            </Row>
          </div>
        </Frame>
      </div>
    );
  }
}

export default HomePage;
