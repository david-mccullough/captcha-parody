import React, { useState } from "react";
import { GatsbyImage, getImage } from "gatsby-plugin-image";

const SelectableImage = ({ Image, checked, handleCheck }) => {
  const [isChecked, setIsChecked] = useState(checked);

  return (
    <>
      <div
        className={`basis-1/4 flex-shrink flex-grow aspect-square rounded-sm cursor-pointer outline-0 outline-blue-500 outline overflow-hidden
        hover:opacity-95 active:scale-100        
        transition-transform ease-out
        duration-75 ${checked && " outline-4 scale-95"}`}
        onClick={() => {
          handleCheck(Image.id, !isChecked);
          setIsChecked(!isChecked);
        }}
      >
        <GatsbyImage image={getImage(Image)} alt={"captcha image"} />
      </div>
    </>
  );
};

export default SelectableImage;
