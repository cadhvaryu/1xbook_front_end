import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ScrollToTop } from "../components";

const ThankYou = () => {
  return (
    <ScrollToTop>
      <div className="flex flex-col items-center justify-center h-screen">
        <FaCheckCircle className="text-9xl text-[#E31F29]" />
        <p className="text-4xl font-medium my-5">Thank You !</p>
        <p className="text-xl font-medium mb-5">We will contact you soon :) </p>
        <Link to="/">
          <button className="rounded-[15px] p-3 px-5">Home Page</button>
        </Link>
      </div>
    </ScrollToTop>
  );
};

export default ThankYou;
