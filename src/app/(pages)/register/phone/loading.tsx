import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const loading = () => {
  return <div>loading</div>;
};

export default loading;
