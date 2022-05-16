const theme = require('./src/settings/theme');

module.exports = {
  siteMetadata: {
    siteUrl: `http://dev.print2a.com`,
  },
  flags: {
    DEV_SSR: true
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-jss',
      options: { theme }
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'print2a',
        short_name: 'print2a',
        start_url: '/',
        background_color: '#000000',
        theme_color: '#000000',
        display: 'standalone',
        orientation: 'portrait',
        icon: 'src/images/favicon.png'
      }
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/Template`)
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-193203727-1',
        anonymize: true,
        respectDNT: true
      }
    },
    {
      resolve: `gatsby-plugin-sitemap`
    }
  ]
};
