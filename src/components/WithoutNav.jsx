import React from "react";
import { Outlet } from "react-router";
import { Footer } from "./";

const WithoutNav = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default WithoutNav;
