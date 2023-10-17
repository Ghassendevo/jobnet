"use client";
import React from "react";
import { AppProgressBar } from "next-nprogress-bar";

const ProgressBar = () => {
  return (
    <AppProgressBar
      height="5px"
      color="yellow"
      delay={0.03}
      options={{ showSpinner: true }}
      shallowRouting={false}
      
    />
  );
};

export default ProgressBar;
