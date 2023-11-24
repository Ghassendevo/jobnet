import Header from "@/components/headerHome/Header";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      <div className="pt-16">
        <div className="w-[70%] ml-auto mr-auto border border-gray-10 rounded-md p-5">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
