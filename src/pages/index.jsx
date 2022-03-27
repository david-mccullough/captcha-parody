import * as React from "react";
import { graphql } from "gatsby";
import SelectableImage from "../components/selectable-image";
import Captcha from "../components/captcha";
import { v4 as uuid } from "uuid";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  extensions,
}) => {
  const [currentCaptchaIndex, setCurrentCaptchaIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  edges.forEach((edge) =>
    edge.node.frontmatter.images.forEach((x) => (x.image.id = uuid()))
  );

  return (
    <main className="flex items-center justify-center h-screen p-2 align-middle">
      <title>Home Page</title>
      <div className="">
        {isComplete ? (
          <>
            <h1>welcome to scrawnyclownsnatch.com!</h1>
          </>
        ) : (
          <Captcha
            captcha={edges[currentCaptchaIndex].node.frontmatter}
            checked={[]}
            onSuccess={() => {
              if (currentCaptchaIndex < edges.length - 1)
                setCurrentCaptchaIndex(currentCaptchaIndex + 1);
              else {
                setIsComplete(true);
              }
            }}
            onFail={() => {
              // todo: shuffle captcha order
              setCurrentCaptchaIndex(0);
            }}
            onReset={() => {
              setCurrentCaptchaIndex(0);
            }}
          />
        )}
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
