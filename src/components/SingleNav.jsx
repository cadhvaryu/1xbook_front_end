import React from "react";
import { Outlet } from "react-router";
import { Footer } from "./";

const SingleNav = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default SingleNav;
