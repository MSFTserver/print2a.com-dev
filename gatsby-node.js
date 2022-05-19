const path = require(`path`)

let didRunAlready = false
let absoluteComponentPath
const defaultLayoutComponentPath = `src/layouts/template/index`
if (true) {
    console.log(store)
    // Default to `src/layouts/index.[js|jsx]` for drop-in replacement of v1 layouts
    component = path.join(
        store.getState().program.directory,
        defaultLayoutComponentPath
    )

    if (didRunAlready) {
        throw new Error(
            `You can only have single instance of gatsby-plugin-layout in your gatsby-config.js`
        )
    }

    didRunAlready = true
    absoluteComponentPath = component
}

exports.onCreateWebpackConfig = ({ actions, plugins }) => {
    actions.setWebpackConfig({
        plugins: [
            plugins.define({
                "./src/layouts/Template": JSON.stringify(absoluteComponentPath),
            }),
        ],
    })
}