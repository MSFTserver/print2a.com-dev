import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'react-jss';
import { Layout } from '../../components/Layout';
import { Background } from '../../components/Background';
import { App } from '../../components/App';
import theme from '../../settings/theme';

let paths = ['/latest', '/links', '/about'];

class Component extends React.Component {
  static displayName = 'Template';

  static propTypes = {
    location: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
    layout: PropTypes.object,
    background: PropTypes.object,
    children: PropTypes.any
  };

  static defaultProps = {
    layout: {},
    background: {}
  };

  constructor () {
    super(...arguments);
    this.state = {
      show: true,
      enterShow: true
    };
  }

  componentDidMount () {
    const { theme } = this.props;

    setTimeout(
      () => this.setState({ enterShow: true }),
      theme.animation.time
    );
  }

  onEnter = () => {
    const { theme } = this.props;

    setTimeout(
      () => this.setState({ show: true }),
      theme.animation.time + theme.animation.stagger
    );
  }

  render () {
    const { show, enterShow } = this.state;
    const { location, classes, layout, background, children } = this.props;
    console.log("this.props: ", this.props);
    console.log(theme)
    const isURLContent = paths.find(path => {
      return location.pathname.indexOf(path) === 0;
    });
    const isBrowserPath = paths.includes("/"+location.pathname.replace("/","").split("/")[0])
    console.log(isURLContent , isBrowserPath);
    if (isURLContent || isBrowserPath){
      return (
        <ThemeProvider theme={theme}>
        <Layout {...layout} theme={theme}>
          <Background
            {...background}
            animation={{ show, ...background.animation }}
            theme={theme}
          >
            {<App theme={theme}>{children}</App>}
          </Background>
        </Layout>
        </ThemeProvider>
      );
    } else {
      return (
        <ThemeProvider theme={theme}>
        <Layout {...layout} theme={theme}>
          <Background
            {...background}
            animation={{ show, ...background.animation }}
            theme={theme}
          >
            {children}
          </Background>
        </Layout>
        </ThemeProvider>
      );
    }
  }
}

export { Component };
