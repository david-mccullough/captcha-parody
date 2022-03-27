import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Captcha from "../components/captcha";
import { v4 as uuid } from "uuid";
import { shuffle } from "../utils";

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
  extensions,
}) => {
  const [currentCaptchaIndex, setCurrentCaptchaIndex] = React.useState(0);
  const [isComplete, setIsComplete] = React.useState(false);

  const [puzzles, setPuzzles] = useState([{}]);

  useEffect(() => {
    // assign unique id to each image
    edges.forEach((edge) =>
      edge.node.frontmatter.images.forEach((x) => (x.image.id = uuid()))
    );
    // shuffle captcha puzzles
    //setPuzzles(shuffle(edges));
    setPuzzles(edges);
  }, []);

  return (
    <main className="flex items-center justify-center h-screen p-3 align-middle">
      <title>Home Page</title>
      <div className="">
        {isComplete ? (
          <div className="flex flex-col items-center gap-2">
            <img src="/img/dancing_baby.gif" alt="dancing baby"></img>
            <h1>welcome to scrawnyclownsnatch.com!</h1>
          </div>
        ) : (
          <Captcha
            captcha={puzzles[currentCaptchaIndex]?.node?.frontmatter ?? {}}
            checked={[]}
            onSuccess={() => {
              if (currentCaptchaIndex < puzzles.length - 1)
                setCurrentCaptchaIndex(currentCaptchaIndex + 1);
              else {
                setIsComplete(true);
              }
            }}
            onFail={() => {
              // todo: shuffle puzzle order
              //setCurrentCaptchaIndex(0);
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
