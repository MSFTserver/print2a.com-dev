const React = require(`react`)
const ThemeProvider = require(`react-jss`).ThemeProvider
// remove the JSS style tag generated on the server to avoid conflicts with the one added on the client
module.exports.onInitialClientRender = () => {
  const ssStyles = window.document.getElementById(`server-side-jss`)
  if (ssStyles) {
    ssStyles.parentNode.removeChild(ssStyles)
  }
}
// eslint-disable-next-line react/prop-types
module.exports.wrapRootElement = ({ element }, options) => {
  const theme = require('/src/settings/theme')
  console.log("Theme: ", theme)
  return <ThemeProvider theme={theme}>{element}</ThemeProvider>
}

exports.wrapPageElement = require(`./wrap-page`)

module.exports.onRouteUpdate = ({ location, prevLocation }) => {
  const sf = new RegExp('(\/browse\/)+[a-zA-Z0-9]+');
  if (location.pathname.match(sf)){
    let local = location.pathname.split("/")[1];
    window.location.replace("http://dev.print2a.com/"+local)
  } else {
    const event = new CustomEvent(
      'route-change',
      { detail: { location, prevLocation } }
    );
    window.dispatchEvent(event);
  }
};