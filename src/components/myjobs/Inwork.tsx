import React from "react";

const Inwork = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  return <div>{params.slug}</div>;
};

export default Inwork;
