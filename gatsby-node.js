const path = require(`path`)

let absoluteComponentPath
const defaultLayoutComponentPath = `./src/layouts/Template/index`
component = require.resolve(defaultLayoutComponentPath)
absoluteComponentPath = component

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                GATSBY_LAYOUT_COMPONENT_PATH: JSON.stringify(absoluteComponentPath)
            }),
        ],
    })
}