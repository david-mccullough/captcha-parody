import React, { useState } from "react";
import SelectableImage from "./selectable-image";

const Captcha = ({ captcha }) => {
  const [checked, setChecked] = useState([]);

  const handleCheck = (id, isChecked) => {
    var updatedList = [...checked];
    if (isChecked) {
      updatedList = [...checked, id];
    } else {
      updatedList.splice(checked.indexOf(id), 1);
    }
    setChecked(updatedList);
  };

  const checkedItems = checked.length
    ? checked.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  return (
    <div className="max-w-xl overflow-hidden bg-white rounded-md shadow-xl">
      {/* Heading */}
      <div className="p-4 text-white bg-blue-700">
        <h2>
          Please select all squares with
          <br />
          <span className="text-3xl font-bold">{captcha.title}</span>
        </h2>
        <p>if there are none, click Skip</p>
      </div>
      {/* Tiles */}
      <div className="flex flex-wrap gap-2 p-3 md:gap-3">
        {captcha.images.map((item, i) => (
          <SelectableImage
            key={i}
            Image={item.image}
            checked={checked.includes(item.image.id)}
            handleCheck={handleCheck}
          />
        ))}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-12 h-12 p-2 text-gray-800 transition rounded cursor-pointer hover:text-gray-900 active:text-blue-600 hover:bg-gray-100 active:bg-blue-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-12 w-12 p-2 text-gray-800 cursor-pointer hover:text-gray-900 active:text-blue-600 transition rounded hover:bg-gray-100 active:bg-blue-100"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </div>
        <a className="block px-5 py-2 font-semibold text-white transition bg-blue-600 rounded cursor-pointer hover:bg-blue-500 active:bg-blue-600">
          Skip
        </a>
      </div>
    </div>
  );
};

export default Captcha;
