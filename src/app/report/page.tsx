"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaClipboard, FaExternalLinkAlt } from "react-icons/fa";
import moment from "moment";
import "../globals.css";
import { Audio } from "react-loader-spinner";

interface ImageData {
  id: string;
  format: string;
  link: string;
  dimension: string;
  size: number;
  use: string;
  fieldname: string;
  originalname: string;
  mimetype: string;
  date: Date;
}

function GetReport() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [imageData, setData] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // pagination
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(5);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = imageData.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(imageData.length / itemsPerPage);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(
        "http://localhost:8080/v1/images/get-image-report"
      );
      if (response.status === 200) {
        console.log(response);
        setData(response.data);
        setIsLoading(true);
      }
    }
    fetchData();
  }, []);

  const formatDate = (date: Date) => {
    const formattedDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");
    return formattedDate;
  };

  const calculateSize = (size: number) => {
    const fileSizeInKB = size / 1024;
    return Math.floor(fileSizeInKB);
  };

  return (
    <div>
      {isLoading ? (
        <>
          <div>
            <h1 className="text-center text-2xl my-2">Image Report</h1>
            <div className="">
              <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
                <thead className="bg-green-500 text-white uppercase text-sm leading-normal">
                  <tr>
                    <th className="py-3 px-6 text-left">id</th>
                    <th className="py-3 px-6 text-left">Image Format</th>
                    <th className="py-3 px-6 text-left">Thumbnail</th>
                    <th className="py-3 px-6 text-left">Link</th>
                    <th className="py-3 px-6 text-left">Dimension</th>
                    <th className="py-3 px-6 text-left">Size</th>
                    <th className="py-3 px-6 text-left">Purpose</th>
                    <th className="py-3 px-6 text-left">Name</th>
                    <th className="py-3 px-6 text-left">Date</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {currentItems &&
                    currentItems.map((image) => {
                      const isPDF = image.link.toLowerCase().endsWith(".pdf");
                      return (
                        <tr className="hover:bg-green-100" key={image.id}>
                          <td className="py-3 px-6 text-left whitespace-nowrap">
                            {image.id}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {image.format}
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              {isPDF ? (
                                <div className="bg-red-500 text-white py-1 px-2 rounded">
                                  <span>PDF</span>
                                </div>
                              ) : (
                                <img
                                  src={image.link}
                                  alt={`${image.originalname} thumbnail`}
                                  className="h-12 w-12 object-cover rounded hover:scale-150 transition duration-2000 ease-in-out"
                                />
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            <div className="flex items-center">
                              <a
                                href={image.link}
                                className="text-green-500"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {image.link}{" "}
                                <FaExternalLinkAlt className="inline-block ml-1" />
                              </a>
                              <button
                                className="ml-2 p-2 bg-green-500 hover:bg-green-600 active:bg-blue-400 text-white rounded"
                                onClick={() => {
                                  copyToClipboard(image.link);
                                  setCopiedId(image.id);
                                  setTimeout(() => setCopiedId(null), 2000);
                                }}
                              >
                                <FaClipboard />
                              </button>
                            </div>
                          </td>
                          <td className="py-3 px-6 text-left">
                            {image.dimension}
                          </td>
                          <td className="py-3 px-6 text-left">{`${calculateSize(
                            image.size
                          )} KB`}</td>
                          <td className="py-3 px-6 text-left">{image.use}</td>
                          <td className="py-3 px-6 text-left">
                            {image.originalname}
                          </td>
                          <td className="py-3 px-6 text-left">
                            {formatDate(image.date)}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>
          </div>
          <div className="pagination flex justify-center items-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`pagination-button border rounded py-2 px-4 mx-1 ${
                  currentPage === i + 1 ? "active bg-green-500 text-white" : ""
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center h-screen border border-black">
          <div>
            <Audio
              height="100"
              width="100"
              color="#4fa94d"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default GetReport;
