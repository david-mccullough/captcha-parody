import CMS from "netlify-cms-app";
import React from "react";
import "../styles/global.css";
import Captcha from "../components/captcha";

const CaptchaPreview = ({ entry, widgetFor, widgetsFor, getAsset }) => {
  if (!entry) return;

  let captcha = {};
  captcha.title = entry.getIn(["data", "title"]);
  captcha.priority = entry.getIn(["data", "priority"]);
  captcha.images = widgetsFor("images").map((images, index) => {
    return {
      image: show.getIn(["data", "image"]),
      correct: show.getIn(["data", "correct"]),
    };
  });
  return (
    <body>
      <main className="flex items-center content-center justify-center h-screen p-3">
        <Captcha captcha={captcha} checked={[]} />
      </main>
    </body>
  );
};

CMS.registerPreviewTemplate("captcha", CaptchaPreview);
