import React from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";

const Bid = ({ bid }: { bid: any }) => {
  const timeAgo = formatDistanceToNow(new Date(bid.date), {
    addSuffix: true,
  });
  return (
    <div>
      <div className="flex gap-1 flex-col pb-5">
        <div className="flex gap-1 p-5 flex-col">
          <p className="font-semibold text-lg">Job id: #{bid._id}</p>
          <p className="text-sm">{timeAgo}</p>
          <p>
            Amount:{" "}
            <span className="bg-yellow-300 p-1 text-sm rounded-sm">
              {bid.budget}
            </span>
          </p>
          <p>
            days:{" "}
            <span className="bg-yellow-300 p-1 text-sm rounded-sm">
              {bid.days}
            </span>
          </p>
          <p className="capitalize text-sm hover:underline cursor-pointer text-yellow-600">bid by {bid.userFullname}</p>
        </div>
        <div className="bg-gray-100 p-3 dark:bg-gray-900 rounded-sm flex flex-col gap-3 hover:border hover:border-yellow-500">
          <p className="text-xs">Description</p>
          <p> {bid.description}</p>
        </div>
        <div className="bg-gray-100 dark:bg-gray-900 p-3 rounded-sm flex flex-col gap-3 hover:border hover:border-yellow-500">
          <p className="text-xs">You can contact the user by email:</p>
          <p> {bid.userEmail}</p>
        </div>
      </div>
    </div>
  );
};

export default Bid;
