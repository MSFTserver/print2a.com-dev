const React = require(`react`)
const preferDefault = m => (m && m.default) || m
let CustomLayout
try {
  console.log("GATSBY_LAYOUT_COMPONENT_PATH: ",GATSBY_LAYOUT_COMPONENT_PATH)
  CustomLayout = preferDefault(require(GATSBY_LAYOUT_COMPONENT_PATH))
} catch (e) {
  if (e.toString().indexOf(`Error: Cannot find module`) !== -1) {
    throw new Error(
      `Couldn't find layout component at "{GATSBY_LAYOUT_COMPONENT_PATH}".\n\n` +
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
    console.log("Element2: ", element)
    console.log("props2: ", props)
    return <CustomLayout {...props}>{element}</CustomLayout>
}