"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { Audio } from "react-loader-spinner";
import Table from "../../components/Table";
// import ImagesData from "../../data.json";

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

function ReportPage() {
  const [imagesData, setData] = useState<ImageData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Pagination
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = imagesData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(imagesData.length / itemsPerPage);

  const paginate = (pageNumber: React.SetStateAction<number>) => {
    setCurrentPage(pageNumber);
  };

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

  return (
    <>
      {isLoading ? (
        <div className="flex flex-col items-center mx-4">
          <Table ImagesData={currentItems} />
          {/* Pagination */}
          <div className="pagination flex justify-center items-center mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`pagination-button border rounded-full py-2 px-4 mx-1 ${
                  currentPage === i + 1 ? "active bg-white text-black" : ""
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen ">
          <div>
            <Audio
              height="100"
              width="100"
              color="#FFFFFF"
              ariaLabel="audio-loading"
              wrapperStyle={{}}
              wrapperClass="wrapper-class"
              visible={true}
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ReportPage;
