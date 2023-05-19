"use client";

import {
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleFileChange,
  handleFormSubmit,
} from "../utils/formHandler";
import React, { SetStateAction, useState } from "react";
import { FaClipboard } from "react-icons/fa";

function Form() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [droppedImage, setDroppedImage] = useState<File | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);

  // form data
  const [use, setUse] = useState("");
  const [format, setFormat] = useState("");
  const [imageLink, setImageLink] = useState("");
  const [imageLinkSize, setImageLinkSize] = useState<number | null>(null);
  const [imageSize, setImageSize] = useState<number | null>(null);

  // error message
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <div
      className={`form_container ${
        isDragActive ? "border-blue-400" : "border-gray-300"
      } ${isDragActive ? "bg-blue-100" : ""}`}
      onDragOver={(event) => handleDragOver(event)}
      onDragEnter={(event) => handleDragEnter(event)}
      onDragLeave={(event) => handleDragLeave(event)}
      onDrop={(event) =>
        handleDrop(event, setDroppedImage, setSelectedFile, setIsDragActive)
      }
    >
      {error && (
        <div className="bg-white w-full shadow-lg rounded-md p-4 m-4 mx-auto">
          <p className="bg-red-500 px-2 py-1 rounded-md text-center">
            {errorMessage}
          </p>
        </div>
      )}
      {imageLink && (
        <div className="bg-white w-full shadow-lg rounded-md p-4 m-4 mx-auto flex-col">
          <p className="text-lg font-bold mb-2 text-center">Image Link:</p>
          <div className="flex justify-center">
            <a
              href={imageLink}
              target="_blank"
              rel="noopener noreferrer"
              className="block text-blue-500 bg-green-200 px-2 py-1 rounded-md hover:bg-green-300"
            >
              {imageLink}
            </a>
            <button
              className="ml-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded"
              onClick={() => {
                copyToClipboard(imageLink);
              }}
            >
              <FaClipboard />
            </button>
          </div>
          {imageLinkSize && (
            <p className="text-center">Image size: {imageLinkSize} KB</p>
          )}
        </div>
      )}
      <form
        onSubmit={(event) =>
          handleFormSubmit(
            event,
            selectedFile,
            use,
            format,
            setImageLink,
            setImageLinkSize,
            setErrorMessage,
            setError
          )
        }
      >
        <div className="mb-4">
          <label
            htmlFor="imageUpload"
            className="block text-lg font-medium text-gray-700"
          >
            Upload an Image
          </label>
          <input
            type="file"
            id="imageUpload"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500"
            onChange={(event) =>
              handleFileChange(
                event,
                setSelectedFile,
                setDroppedImage,
                setIsDragActive,
                setImageSize
              )
            }
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="use"
            className="block text-lg font-medium text-gray-700"
          >
            Use
          </label>
          <input
            type="text"
            id="use"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500"
            value={use}
            onChange={(event) => setUse(event.target.value)}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="format"
            className="block text-lg font-medium text-gray-700"
          >
            Format
          </label>
          <select
            id="format"
            className="mt-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-green-500 focus:border-green-500"
            value={format}
            onChange={(event) => setFormat(event.target.value)}
          >
            <option value="">Select Format</option>
            <option value="JPEG">JPEG</option>
            <option value="PNG">PNG</option>
            <option value="GIF">GIF</option>
            <option value="WEBP">WEBP</option>
            <option value="PDF">PDF</option>
          </select>
        </div>
        <div
          className="border border-gray-300 p-4 mb-4"
          style={{ textAlign: "center" }}
        >
          {droppedImage ? (
            <img
              src={URL.createObjectURL(droppedImage || selectedFile)}
              alt="Dropped Image"
              className="mx-auto mb-2"
              style={{ maxHeight: "84px" }}
            />
          ) : (
            <p>Drag and drop your file here</p>
          )}
          {(droppedImage || selectedFile) && (
            <p>{(droppedImage || selectedFile)?.name}</p>
          )}
          {imageSize && <p>Image size: {imageSize} KB</p>}
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
        >
          Upload
        </button>
      </form>
    </div>
  );
}

export default Form;
