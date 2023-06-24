"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClipboard } from "react-icons/fa";
import moment from "moment";

interface Image {
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

interface TableProps {
  ImagesData: Image[];
}

function Table({ ImagesData }: TableProps) {
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  const formatDate = (date: Date) => {
    const formattedDate = moment(date).format("MMMM Do YYYY, h:mm:ss a");
    return formattedDate;
  };

  const calculateSize = (size: number) => {
    const fileSizeInKB = size / 1024;
    return Math.floor(fileSizeInKB);
  };

  return (
    <table className="divide-y divide-gray-200 mx-auto">
      <thead className="bg-green-500 text-white">
        <tr>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            ID
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Format
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Thumbnail
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Link
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Dimension
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Size (KB)
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Purpose
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Name
          </th>
          <th scope="col" className="px-6 py-3 text-left font-semibold">
            Date
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {ImagesData.map((image) => {
          const isPDF = image.link.toLowerCase().endsWith(".pdf");
          return (
            <tr key={image.id}>
              <td className="px-6 py-4 whitespace-nowrap">{image.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{image.format}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {
                  <div className="">
                    {isPDF ? (
                      <div className="bg-red-500 w-fit text-white py-1 px-2 rounded">
                        <span>PDF</span>
                      </div>
                    ) : (
                      <img
                        src={image.link}
                        alt="Thumbnail"
                        className="h-8 w-8 rounded-full object-cover hover:scale-150 transition duration-2000 ease-in-out"
                      />
                    )}
                  </div>
                }
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex-col item-center justify-center">
                  <button
                    className="ml-2 mx-2 p-2 bg-green-500 hover:bg-green-600 active:bg-blue-400 text-white rounded"
                    onClick={() => {
                      copyToClipboard(image.link);
                    }}
                  >
                    <FaClipboard />
                  </button>
                  <Link
                    href={image.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span className="text-blue-400 underline hover:text-black-500">
                      View
                    </span>
                  </Link>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">{image.dimension}</td>
              <td className="px-6 py-4 whitespace-nowrap">{`${calculateSize(
                image.size
              )} KB`}</td>
              <td className="px-6 py-4 whitespace-nowrap">{image.use}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                {image.originalname}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {formatDate(image.date)}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
