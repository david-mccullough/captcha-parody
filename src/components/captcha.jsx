import React, { useEffect, useState } from "react";
import SelectableImage from "./selectable-image";
import { shuffle } from "../utils";

const Captcha = ({ captcha, checked, onSuccess, onFail, onReset }) => {
  const [checkedList, setCheckedList] = useState(checked);
  const [showFailMessage, setShowFailMessage] = useState(false);
  const [images, setImages] = useState([]);

  useEffect(() => {
    setImages(shuffle(captcha.images));
  }, [captcha]);

  const handleCheck = (id, isChecked) => {
    var updatedList = [...checkedList];
    if (isChecked) {
      updatedList = [...checkedList, id];
    } else {
      updatedList.splice(checkedList.indexOf(id), 1);
    }
    setCheckedList(updatedList);
  };

  const checkedItems = checkedList.length
    ? checkedList.reduce((total, item) => {
        return total + ", " + item;
      })
    : "";

  return (
    <div className="max-w-xl overflow-hidden bg-white rounded-md shadow-xl">
      {/* Heading */}
      <div className="p-4 text-sm text-white bg-blue-700 sm:text-base">
        <h2>
          Please select all squares with
          <br />
          <span className="text-2xl font-bold sm:text-3xl">
            {captcha.title}
          </span>
        </h2>
        <p>if there are none, click Skip</p>
      </div>
      {/* Tiles */}
      <div className="flex flex-wrap gap-1 p-3 md:gap-2">
        {images?.map((item, i) => (
          <SelectableImage
            key={i}
            Image={item.image}
            checked={checkedList.includes(item.image.id)}
            handleCheck={handleCheck}
          />
        ))}
      </div>
      {/* Controls */}
      <div className="flex items-center justify-between gap-1 p-4 align-middle">
        <div className="flex items-center gap-1">
          <button
            title="Information"
            onClick={() => alert("open tab to gamegrumps.com?")}
            className="w-10 h-10 p-1 text-gray-800 transition rounded cursor-pointer sm:p-2 sm:w-12 sm:h-12 hover:text-gray-900 active:text-blue-600 hover:bg-gray-200 active:bg-blue-100 focus-visible:outline focus-visible:outline-blue-300 focus-visible:outline-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
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
          </button>
          <button
            title="Restart"
            className="w-10 h-10 p-1 text-gray-800 transition rounded cursor-pointer sm:p-2 sm:w-12 sm:h-12 hover:text-gray-900 active:text-blue-600 hover:bg-gray-200active:bg-blue-100 focus-visible::outline focus-visible::outline-blue-300 focus-visible::outline-4"
            onClick={() => {
              setCheckedList([]);
              setShowFailMessage(false);
              onReset();
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
          </button>
        </div>

        <p
          className={`flex-grow sm:mr-3 mr-2 text-right text-red-600 transition-opacity sm:text-base text-sm leading-4 ${
            showFailMessage ? "opacity-100" : "opacity-0"
          }`}
        >
          Incorrect response, please try again.
        </p>
        <button
          className="block px-5 py-2 font-semibold text-white transition bg-blue-700 rounded cursor-pointer hover:bg-blue-600 active:bg-blue-700 focus-visible:outline focus-visible:outline-blue-300 focus-visible:outline-4"
          onClick={() => {
            if (
              // all correct ids are checked
              images
                .filter((x) => x.correct)
                .every((x, i) => checkedList.includes(x.image.id)) &&
              // and no incorrect ids are checked
              images
                .filter((x) => !x.correct)
                .every((x, i) => !checkedList.includes(x.image.id))
            ) {
              setCheckedList([]);
              setShowFailMessage(false);
              onSuccess();
            } else {
              setCheckedList([]);
              setShowFailMessage(true);
              setTimeout(() => setShowFailMessage(false), 5000);
              onFail();
            }
          }}
        >
          {checkedList.length > 0 ? "Verify" : "Skip"}
        </button>
      </div>
    </div>
  );
};

export default Captcha;
