"use client";
import React from "react";
import { AppProgressBar } from "next-nprogress-bar";

const ProgressBar = () => {
  return (
    <AppProgressBar
      height="5px"
      color="#4ade80"
      delay={0.03}
      options={{ showSpinner: true }}
      shallowRouting
      
    />
  );
};

export default ProgressBar;
