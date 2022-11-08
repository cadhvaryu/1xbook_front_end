import React from "react";
import { Outlet } from "react-router";
import { Navbar, Footer } from "./";

const WithNav = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};
export default WithNav;
