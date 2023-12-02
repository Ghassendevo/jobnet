import React from "react";
import Profile from "@/components/Profile/profile";
import { getUserData } from "@/APIs/APIS";
const page = async ({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) =>  {
  const id = searchParams["id"] ?? null
  const data = await getUserData(id);
  return (
    <div className="h-screen">
      <Profile id={id} data={data} />
    </div>
  );
};

export default page;
