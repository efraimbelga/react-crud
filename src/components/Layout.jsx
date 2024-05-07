import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <>
      <Header />
      <Navbar />
      <div className="container mt-5">
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
