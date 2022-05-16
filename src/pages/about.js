import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '../tools/withStyles';
import { Main } from '../components/Main';
import { Secuence } from '../components/Secuence';
import { Text } from '../components/Text';
import { Fader } from '../components/Fader';
import { Link } from '../components/Link';

const styles = theme => ({
  root: {}
});

class About extends React.Component {
  static propTypes = {
    classes: PropTypes.object
  };

  render () {
    const { classes } = this.props;

    return (
      <Main className={classes.root}>
        <div className='aboutPage'>
          <h1><Text>Print2a</Text></h1>
          <p><Text>This is a collection of 3D Printed weaponry. These files have been collected across various repositories to bring them to one easy to find organized place. Some repos include fosscad, AWCY?, det_disp and other sources far and wide!</Text></p>
          <h2><Text>Donate</Text></h2>
          <p><Text>If you like the site and what I have put together, please consider donating to help with server costs to keep this site running. Anything helps as costs are quite low right now.</Text></p>
          <div style={{lineHeight:"5px"}}>
          <p><Text>PayPal:</Text></p><p><Link href="http://donate.print2a.com" target="PayPal"><Text>http://donate.print2a.com</Text></Link></p><br style={{lineHeight:'20px'}}></br>
          <p><Text>BTC Address:</Text></p><p><Text>34CnFqMvsrmhZA1kDyV6iD91GV9Vn3dd94</Text></p><br style={{lineHeight:'20px'}}></br>
          </div>
          <h2><Text>License</Text></h2>
          <li> These files are released open source.</li>
          <li> Fuck COPYRIGHTS.</li><br style={{lineHeight:'20px'}}></br>
        </div>
      </Main>
    );
  }
}

export default withStyles(styles)(About);
