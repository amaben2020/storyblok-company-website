require("dotenv").config({
  path: `.env.${process.env.NODE_ENV || "production"}`,
});

module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
    description: `Kick off your next, great Gatsby project with this default starter. This barebones starter ships with the main Gatsby configuration files you might need.`,
    author: `@gatsbyjs`,
  },
  plugins: [
    // `gatsby-plugin-react-helmet`,
    // `gatsby-plugin-image`,
    // {
    //   resolve: `gatsby-source-filesystem`,
    //   options: {
    //     name: `images`,
    //     path: `${__dirname}/src/images`,
    //   },
    // },
    // `gatsby-transformer-sharp`,
    // `gatsby-plugin-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `gatsby-starter-default`,
    //     short_name: `starter`,
    //     start_url: `/`,
    //     background_color: `#663399`,
    //     theme_color: `#663399`,
    //     display: `minimal-ui`,
    //     icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
    //   },
    // },
    // `gatsby-plugin-gatsby-cloud`,
    {
      resolve: "gatsby-source-storyblok",
      options: {
        accessToken: process.env.GATSBY_STORYBLOK_API_KEY,
        version: process.env.NODE_ENV === "production" ? "published" : "draft",
        localAssets: true,
      },
    },

    {
      resolve: `gatsby-source-graphql`,
      options: {
        fieldName: `Storyblok`,
        typeName: `storyblok`,
        url: `https://gapi.storyblok.com/v1/api`,
        headers: {
          Token: process.env.GATSBY_STORYBLOK_API_KEY,
          Version: `draft`,
        },
      },
    },
  ],
};
