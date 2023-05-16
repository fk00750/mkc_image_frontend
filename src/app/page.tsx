"use client";

import { ImageLogoSvg } from "@/app/components/svgComponents/Image.logo.svg";
import { PointerSvg } from "@/app/components/svgComponents/Pointers.svg";
import axios from "axios";
import React, { useState } from "react";
import "./globals.css";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useRouter } from "next/navigation";
import { FaClipboard } from "react-icons/fa";
import HeaderComponent from "./components/header/component";

const Home: React.FC = () => {
  const [use, setUse] = useState("");
  const [format, setFormat] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imageLink, setImageLink] = useState("");
  const [imageLinkSize, setImageLinkSize] = useState<number | null>(null);
  const [imageSize, setImageSize] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData();

    if (use.trim().length === 0) {
      setError(true);
      setErrorMessage("Please enter your purpose");
      setTimeout(() => {
        setError(false);
        setErrorMessage("");
      }, 2000);
      return;
    }

    // Make sure the "use" field is not empty before appending it to the form data
    if (use.trim() !== "") {
      formData.append("use", use);
    }

    formData.append("format", format);

    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/v1/images/upload-image",
        formData
      );
      console.log(response);
      if (response.status === 200 && response.data.imageLink) {
        setImageLink(response.data.imageLink);
        setImageLinkSize(response.data.sizeInKb);
        setIsLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpload = () => {
    const fileSizeInKB = image ? Math.round(image.size / 1024) : 0;
    console.log(`Image size: ${fileSizeInKB} KB`);
    // Make API call to upload the image
  };

  const removeImage = () => {
    setImage(null);
  };

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  return (
    <main className="flex justify-center items-center h-screen">
      <div className="mx-auto w-full md:w-2/3 lg:w-1/2 xl:w-1/3 bg-gray-300">
        <div className="p-4">
          <div className="flex justify-center">
            {/** Header Component */}
            <HeaderComponent />
          </div>
          {/** Image functions */}
          <div className="image_func_container">
            {/** Error Display */}
            {error && (
              <div className="bg-white w-full shadow-lg rounded-md p-4 m-4 mx-auto">
                <p className="bg-red-500 px-2 py-1 rounded-md text-center">
                  {errorMessage}
                </p>
              </div>
            )}
            {/** Image link */}
            {imageLink && (
              <div className="bg-white w-full shadow-lg rounded-md p-4 m-4 mx-auto flex-col">
                <p className="text-lg font-bold mb-2 text-center">
                  Image Link:
                </p>
                <div className="flex justify-center">
                  <a
                    href={imageLink}
                    target="_bl  const [copiedId, setCopiedId] = useState<string | null>(null);ank"
                    rel="noopener noreferrer"
                    className="block text-blue-500 bg-green-200 px-2 py-1 rounded-md hover:bg-green-300"
                  >
                    {imageLink}
                  </a>
                  <button
                    className="ml-2 p-2 bg-green-500 hover:bg-green-600 text-white rounded"
                    onClick={() => {
                      copyToClipboard(imageLink);
                      setCopiedId(imageLink);
                      setTimeout(() => setCopiedId(null), 2000);
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
            {/** Image conversion form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-6"
              action="#"
              method="POST"
            >
              <div>
                <label
                  htmlFor="use"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Use
                </label>
                <input
                  type="text"
                  name="use"
                  id="use"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Enter use"
                  value={use}
                  onChange={(event) => setUse(event.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="format"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Format
                </label>
                <div className="relative">
                  <select
                    className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
                    id="format"
                    name="format"
                    value={format}
                    onChange={(event) => setFormat(event.target.value)}
                  >
                    <option value="jpeg">JPEG</option>
                    <option value="png">PNG</option>
                    <option value="gif">GIF</option>
                    <option value="webp">Webp</option>
                    <option value="pdf">PDF</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <PointerSvg />
                  </div>
                </div>
              </div>
              <div>
                <label
                  htmlFor="image"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Image
                </label>
                <div className="mt-2">
                  <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      {image ? (
                        <div className="relative">
                          <button
                            className="absolute right-0 top-0 m-2 text-gray-600 hover:text-gray-900"
                            onClick={removeImage}
                          >
                            <AiOutlineCloseCircle size={24} />
                          </button>
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded image"
                            className="mx-auto h-24 w-24 rounded-full"
                          />
                          <p className="text-gray-700">{image.name}</p>
                          {imageSize && <p>Image size: {imageSize} KB</p>}
                        </div>
                      ) : (
                        <div>
                          <ImageLogoSvg />
                          <div className="flex text-sm text-gray-600">
                            <label
                              htmlFor="file-upload"
                              className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                              <span>Upload a file</span>
                              <input
                                id="file-upload"
                                name="file-upload"
                                type="file"
                                className="sr-only"
                                onChange={(event) => {
                                  const selectedFile = event.target.files
                                    ? event.target.files[0]
                                    : null;
                                  setImage(selectedFile);
                                  if (selectedFile) {
                                    setImageSize(
                                      Math.round(selectedFile.size / 1024)
                                    );
                                  }
                                }}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">
                            PNG, JPG, GIF up to 10MB
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end">
                <button
                  className="mx-2 bg-indigo-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-indigo-700"
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="flex justify-end mx-2 my-2">
              <button
                className="bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline hover:bg-red-700"
                type="submit"
                onClick={() => router.push("/report")}
              >
                Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Home;
