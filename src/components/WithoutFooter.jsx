import React from "react";
import { Outlet } from "react-router";

const WithoutFooter = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

export default WithoutFooter;
