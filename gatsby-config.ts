import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `new`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  plugins: [
    "gatsby-plugin-netlify-cms",
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-react-helmet",
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        icon: "src/images/icon.png",
      },
    },
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./static/img/",
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `markdown`,
        path: `./content/captcha`,
      },
    },
    // Remark
    `gatsby-transformer-remark`,
    // {
    //   resolve: "gatsby-transformer-remark",
    //   options: {
    //     plugins: [
    //       {
    //         resolve: "gatsby-remark-relative-images",
    //         options: {
    //           name: "uploads",
    //         },
    //       },
    //       {
    //         resolve: "gatsby-remark-images",
    //         options: {
    //           // It's important to specify the maxWidth (in pixels) of
    //           // the content container as this plugin uses this as the
    //           // base for generating different widths of each image.
    //           maxWidth: 2048,
    //         },
    //       },
    //       {
    //         resolve: "gatsby-remark-copy-linked-files",
    //         options: {
    //           destinationDir: "static",
    //         },
    //       },
    //    ],
    //  },
    //},
  ],
};

export default config;
