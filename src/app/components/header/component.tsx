import React from "react";
import { BsTools } from "react-icons/bs";
import { ImImage } from "react-icons/im";

function HeaderComponent() {
  return (
    <>
      <div>
        <ImImage className="text-4xl" />
      </div>
      <h1 className="text-3xl font-bold mb-4 mx-4">Image Conversion Tool</h1>
      <div>
        <BsTools className="text-3xl" />
      </div>
    </>
  );
}

export default HeaderComponent;
