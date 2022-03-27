import * as React from "react";
import { graphql } from "gatsby";
import SelectableImage from "../components/selectable-image";
import Captcha from "../components/captcha";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  extensions,
}) => {
  return (
    <main className="flex items-center justify-center p-2 align-middle h-vh">
      <title>Home Page</title>
      <div className="">
        {edges.map((edge, i) => (
          <Captcha key={i} captcha={edge.node.frontmatter} />
        ))}
      </div>
    </main>
  );
};

export default IndexPage;

export const AllCaptchaQuery = graphql`
  query AllCaptchaQuery {
    allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/(captcha)/" } }) {
      edges {
        node {
          id
          frontmatter {
            title
            images {
              image {
                id
                absolutePath
                childImageSharp {
                  gatsbyImageData(
                    blurredOptions: { width: 100 }
                    placeholder: BLURRED
                    transformOptions: { cropFocus: CENTER }
                    aspectRatio: 1
                  )
                }
              }
              correct
            }
          }
        }
      }
    }
  }
`;
