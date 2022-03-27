import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SelectableImage = ({ Image, checked, handleCheck }) => {
  return (
    <>
      <button
        className={`basis-1/4 flex-shrink flex-grow aspect-square rounded-sm cursor-pointer outline-0 outline-blue-600 outline overflow-hidden
        hover:opacity-95 active:scale-100 focus-visible:opacity-95
        transition-transform ease-out
        duration-75 ${checked && " outline-4 scale-95 rounded"}`}
        onClick={() => {
          handleCheck(Image.id, !checked);
        }}
      >
        <GatsbyImage image={getImage(Image)} alt={"captcha image"} />
      </button>
    </>
  );
};

export default SelectableImage;
