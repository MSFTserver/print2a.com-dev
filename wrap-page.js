const React = require(`react`)
const theme = require('/src/settings/theme')
const preferDefault = m => (m && m.default) || m
let Layout
try {
  Layout = preferDefault(require(`./src/layouts/Template`))
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    throw new Error(
      `Couldn't find layout component at "./src/layouts/Template".\n\n` +
        `Please create layout component in that location or specify path to layout component in gatsby-config.js`
    )
  } else {
    // Logging the error for debugging older browsers as there is no way
    // to wrap the thrown error in a try/catch.
    console.error(e)
    throw e
  }
}
// eslint-disable-next-line react/prop-types,react/display-name
module.exports = ({ element, props }) => {
    console.log("props1: ", props)
    console.log("layout: ", Layout)
    console.log("Element: ", element)
    props.theme = theme
    console.log("props2: ", props)
    return <Layout {...props}>{element}</Layout>
}