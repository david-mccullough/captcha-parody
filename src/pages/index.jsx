import React, { useState, useEffect } from "react";
import { graphql } from "gatsby";
import Captcha from "../components/captcha";
import { v4 as uuid } from "uuid";
import { shuffle } from "../utils";

const IndexPage = ({
  data: {
    allCaptchas: { edges },
    allRandomImages: { iEdges },
  },
  extensions,
}) => {
  const [currentCaptchaIndex, setCurrentCaptchaIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isBusy, setIsBusy] = useState(true);
  const [puzzles, setPuzzles] = useState([{}]);
  const [currentFillerImages, setCurrentFillerImages] = useState([]);

  useEffect(() => {
    // assign unique id to each image
    edges.forEach((edge) =>
      edge.node.frontmatter.images.forEach((x) => (x.image.id = uuid()))
    );
    iEdges.forEach((edge) =>
      edge.node.frontmatter.images.forEach((x) => (x.image.id = uuid()))
    );
    // shuffle captcha puzzles?
    //setPuzzles(shuffle(edges));
    // sort captcha puzzles

    setPuzzles(
      edges.sort(
        (a, b) => a.node.frontmatter.priority - b.node.frontmatter.priority
      )
    );

    setIsBusy(false);
  }, []);

  const getCurrentCaptchaOrDefault = (addFiller = false) => {
    let current = puzzles[currentCaptchaIndex]?.node?.frontmatter ?? {
      images: [],
    };
    if (addFiller) {
      // makes up the difference for <9 puzzles with random images
      current.images = current.images.concat(
        ...shuffle(iEdges.flatMap((x) => x.node.frontmatter.images)).slice(
          0,
          9 - current.images.length
        )
      );
    }
    return current;
  };

  return (
    <main className="flex items-center content-center justify-center h-screen p-3">
      <title>Home Page</title>
      <div className="">
        {isComplete ? (
          <div className="flex flex-col items-center gap-2">
            <img src="/img/dancing_baby.gif" alt="dancing baby"></img>
            <h1>welcome to scrawnyclownsnatch.com!</h1>
          </div>
        ) : (
          <>
            <Captcha
              className={isBusy ? "hidden" : "visible"}
              captcha={getCurrentCaptchaOrDefault(true)}
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
            <div className={!isBusy ? "hidden" : "visible"}>
              <svg
                className="w-8 h-8 text-black animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default IndexPage;

export const AllCaptchaQuery = graphql`
  query AllCaptchaQuery {
    allCaptchas: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/content/captcha/" } }
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            priority
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

    allRandomImages: allMarkdownRemark(
      filter: { fileAbsolutePath: { regex: "/(randomImages)/" } }
    ) {
      iEdges: edges {
        node {
          id
          frontmatter {
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
            }
          }
        }
      }
    }
  }
`;
