import React from "react";
import Layout from "./layout";
import { getBidData } from "@/APIs/APIS";
import { useRouter } from "next/navigation";
import Bid from "@/components/Bid/Bid";

const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const id = searchParams["id"] ?? null;
  const jobdata = await getBidData(id);
  return <Bid bid={jobdata} />;
};

export default page;
