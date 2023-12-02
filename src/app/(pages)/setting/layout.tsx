import Header from "@/components/headerHome/Header";
import React from "react";

const layout = ({ children }) => {
  return (
    <div className="h-screen">
      <Header />
      {children}
    </div>
  );
};

export default layout;
