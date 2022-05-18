const React = require(`react`)

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
module.exports = ({ element, props }) => <Layout {...props}>{element}</Layout>