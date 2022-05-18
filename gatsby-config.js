module.exports = {
  siteMetadata: {
    siteUrl: `http://dev.print2a.com`,
  },
  plugins: [
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
