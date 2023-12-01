"use client";
import { RootState } from "@/redux/store";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Input, Select, SelectItem, Textarea } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "../ui/use-toast";
import {
  ArrowLeftIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  Pencil1Icon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { motion as m } from "framer-motion";
import { Button as Rbutton } from "../ui/button";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { Accordion, AccordionItem } from "@nextui-org/react";

const Work = () => {
  const usersession = useSelector((state: RootState) => state.session.data);
  const [isloading, setisloading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [jobs, setjobs] = useState([]);
  const [searchjobs, setsearchjobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({ id: "", type: "" });
  const { toast } = useToast();

  useEffect(() => {
    axios
      .post("http://localhost:3001/myallpost", {
        id: usersession._id,
      })
      .then((res) => {
        setjobs(res.data);
        setisloading(false);
      });
  }, []);
  const handleDelete = () => {
    const updatedJobs = jobs.filter((job) => job._id !== selectedJob.id);
    setjobs(updatedJobs);
    toast({
      variant: "default",
      title: "Delete success",
      description: `Project with id #${selectedJob.id} has been deleted`,
    });

    axios
      .post(`http://localhost:3001/deletejob/${selectedJob.id}`)
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: `There is an error while deleting project #${selectedJob.id}`,
        });
      });
  };
  const router = useRouter();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    const newData = jobs.filter((value) =>
      value.title.toLowerCase().includes(e.target.value.toLowerCase())
    );

    setsearchjobs(newData);
  }
  
  const categorys = [
    "Web development",
    "mobile development",
    "cloud computing",
  ];
  const handleUpdate = () => {};
  return (
    <div className="h-fit">
      {(isloading && <Loading />) || (
        <>
          <div
            className="md:w-[70%] w-[90%] mr-auto mt-10 ml-auto cursor-pointer"
            onClick={() => router.back()}
          >
            <ArrowLeftIcon className="w-[20px] h-[20px]" />
          </div>
          <div className="md:w-[70%] w-[90%] ml-auto mr-auto pt-[60px]">
            <div className="search">
              <Input
                isClearable
                type="text"
                variant="bordered"
                startContent={<MagnifyingGlassIcon />}
                placeholder="Search for your jobs"
                onChange={(e) => handleSearch(e)}
                onClear={() => console.log("input cleared")}
                className="w-full"
              />
            </div>
            <div className="mt-10 border border-gray-200 gap-4  p-5 rounded-lg">
              <div className="flex flex-row items-center gap-5">
                <h1 className="font-semibold text-xl">My jobs</h1>{" "}
                <span className="bg-yellow-400 dark:bg-yellow-500 w-[20px] h-[20px] text-sm rounded-full flex justify-center items-center">
                  {jobs.length}
                </span>
              </div>
              <Modal
                className="max-w-[900px] "
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        <p className="mt-10">Project ID #{selectedJob.id}</p>
                      </ModalHeader>
                      <ModalBody>
                        {(selectedJob.type == "delete" && (
                          <p>Are you sure you want to delete this project ?</p>
                        )) || (
                          <div className=" w-full gap-7 flex flex-col">
                            <div className="title w-full flex flex-col gap-1 dark:border-none border border-b-gray-300 pb-5 border-white">
                              <p className="font-semibold">Title</p>
                              <p className="text-sm">
                                Tell the client what you will deliver and how it
                                benefits them.
                              </p>
                              <Input
                                variant="bordered"
                                startContent={
                                  <p className="text-xs  w-[90px] font-semibold">
                                    You will get a{" "}
                                  </p>
                                }
                                // onChange={(e) => handleTitle(e)}
                                placeholder="a fantastic deliverable that drives impact"
                              />
                              <p className="text-right pt-2 text-gray-400 text-sm">
                                0/75 characters (min. 7 words)
                              </p>
                            </div>
                            <div className="title w-full flex flex-col gap-1 dark:border-none border border-b-gray-300 pb-5 border-white">
                              <p className="font-semibold">Category</p>
                              <p className="text-sm">
                                Select a category so it's easy for clients to
                                find your project.
                              </p>
                              <div className="flex w-full flex-wrap md:flex-nowrap gap-4 z-10">
                                {" "}
                                <Select
                                  variant={"bordered"}
                                  // onChange={(
                                  //   e: React.ChangeEvent<HTMLSelectElement>
                                  // ) => handleCat(e)}
                                  label="Select a category"
                                  disabled
                                  className="w-full"
                                  size="sm"
                                  defaultSelectedKeys="0"
                                >
                                  {categorys.map((cat, index) => (
                                    <SelectItem
                                      className="z-10"
                                      key={index}
                                      value={cat}
                                    >
                                      {cat}
                                    </SelectItem>
                                  ))}
                                </Select>
                              </div>
                            </div>
                            <div className="title w-full flex flex-col gap-1 dark:border-none border border-b-gray-300 pb-5 border-white">
                              <p className="font-semibold">Budget</p>
                              <p className="text-sm">
                                Select a category so it's easy for clients to
                                find your project.
                              </p>
                              <div className="flex flex-row justify-between gap-4">
                                <Input
                                  type="number"
                                  label="budget from"
                                  variant="bordered"
                                  size="md"
                                  labelPlacement="outside"
                                  // onChange={(
                                  //   e: React.ChangeEvent<HTMLInputElement>
                                  // ) => handleBudgetfrom(e)}
                                  placeholder="Budget from"
                                  startContent={
                                    <p className="text-gray-600">$</p>
                                  }
                                />
                                <Input
                                  type="number"
                                  label="budget to"
                                  variant="bordered"
                                  // onChange={(
                                  //   e: React.ChangeEvent<HTMLInputElement>
                                  // ) => handleBudgetto(e)}
                                  size="md"
                                  labelPlacement="outside"
                                  placeholder="Budget to"
                                  startContent={
                                    <p className="text-gray-600">$</p>
                                  }
                                />
                              </div>
                            </div>
                            <div className="title w-full flex flex-col gap-1 dark:border-none border border-b-gray-300 pb-5 border-white">
                              <p className="font-semibold">Description</p>
                              <p className="text-sm">
                                Select a category so it's easy for clients to
                                find your project.
                              </p>
                              <Textarea
                                variant={"bordered"}
                                label="Your description"
                                className="w-full"
                                size="sm"
                                // onChange={(
                                //   e: React.ChangeEvent<HTMLInputElement>
                                // ) => handleDesc(e)}
                              />
                            </div>
                          </div>
                        )}
                      </ModalBody>
                      <ModalFooter>
                        {(selectedJob.type == "delete" && (
                          <>
                            <Button
                              color="primary"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Button
                              color="danger"
                              onClick={handleDelete}
                              onPress={onClose}
                            >
                              Delete
                            </Button>
                          </>
                        )) || (
                          <>
                            <Button
                              color="primary"
                              variant="light"
                              onPress={onClose}
                            >
                              Close
                            </Button>
                            <Rbutton
                              color="success"
                              onClick={() => {
                                handleUpdate(), onClose;
                              }}
                            >
                              submit
                            </Rbutton>
                          </>
                        )}
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>
              {(searchjobs.length > 0 &&
                searchjobs.map((val, index) => {
                  const timeAgo = formatDistanceToNow(new Date(val.date), {
                    addSuffix: true,
                  });
                  return (
                    <m.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                      }}
                      className="p-5 border mt-5 transition duration-300 ease-in-out rounded-t-md dark:hover:bg-[#25250baa] hover:bg-[#faf8ecaa] hover:cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold text-lg">
                          Project ID #{val._id}
                        </p>
                        <p className="text-sm">Number of bids: {val.bids}</p>
                      </div>
                      <div className="jobheader  capitalize flex  items-center justify-between gap-3 flex-row text-md">
                        <div className="flex flex-row items-center gap-3">
                          <p className="font-[550] hover:text-yellow-800 hover:underline">
                            {val.title}
                          </p>
                          <p className="text-xs">Posted by:{val.fullname}</p>
                        </div>
                        <div className="actions flex flex-row gap-3">
                          <div
                            onClick={(e) => {
                              onOpen(),
                                setSelectedJob({ id: val._id, type: "delete" });
                            }}
                            className="edit  p-2 rounded-sm items-center justify-center hover:bg-gray-100"
                          >
                            <TrashIcon className="w-[25px] h-[25px] text-gray-600" />
                          </div>
                          <div
                            onClick={(e) => {
                              onOpen(),
                                setSelectedJob({ id: val._id, type: "change" });
                            }}
                            className="edit  p-2 rounded-sm items-center justify-center hover:bg-gray-100"
                          >
                            <Pencil1Icon className="w-[25px] h-[25px] text-gray-600" />
                          </div>
                        </div>
                      </div>

                      <div className="jobcontent pt-7">
                        <p className="text-gray-400 text-xs">
                          Hourly - Expert - Est. Time: Less than 1 month, Less
                          than 30 hrs/week - {timeAgo}
                        </p>
                        <p className="pt-4 text-sm text-gray-600">
                          {val.description}
                        </p>
                        <p className="pt-5 text-xs text-gray-400">
                          Proposals: {val.bids}
                        </p>
                        <p className="pt-5 flex flex-row items-center gap-2 text-xs text-g">
                          <CheckIcon className="bg-blue-500 rounded-xl text-white" />
                          Payment verified{" "}
                        </p>
                      </div>
                      {val.bids > 0 && (
                        <div className="w-full flex items-center justify-center pt-5">
                          <Accordion variant="splitted">
                            <AccordionItem
                              key="1"
                              aria-label="Accordion 1"
                              title={"View bids " + val.bids}
                            >
                              <Accordion variant="splitted">
                                {val.bid.map((bid, key) => {
                                  const timeAgo = formatDistanceToNow(
                                    new Date(bid.date),
                                    {
                                      addSuffix: true,
                                    }
                                  );
                                  return (
                                    <AccordionItem
                                      key={key}
                                      aria-label={"Bid" + key}
                                      title={
                                        "Bid ID # " + bid._id + " " + timeAgo
                                      }
                                    >
                                      <div>
                                        <div className="flex gap-1 flex-col pb-5">
                                          <div className="flex gap-1 p-5 flex-col">
                                            <p className="font-semibold text-lg">
                                              Bid id: #{bid._id}
                                            </p>
                                            <p className="text-sm">{timeAgo}</p>
                                            <p>
                                              Amount:{" "}
                                              <span className="bg-yellow-300 p-1 text-sm rounded-sm">
                                                {bid.amount}
                                              </span>
                                            </p>
                                            <p>
                                              days:{" "}
                                              <span className="bg-yellow-300 p-1 text-sm rounded-sm">
                                                {bid.days}
                                              </span>
                                            </p>
                                            <p className="capitalize text-sm hover:underline cursor-pointer text-yellow-600">
                                              bid by {bid.fullname}
                                            </p>
                                          </div>
                                          <div className="bg-gray-100 p-3 dark:bg-gray-900 rounded-sm flex flex-col gap-3 hover:border hover:border-yellow-500">
                                            <p className="text-xs">
                                              Description
                                            </p>
                                            <p> {bid.desc}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionItem>
                                  );
                                })}
                              </Accordion>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      )}
                    </m.div>
                  );
                })) ||
                jobs.map((val, index) => {
                  const timeAgo = formatDistanceToNow(new Date(val.date), {
                    addSuffix: true,
                  });
                  return (
                    <m.div
                      key={index}
                      initial={{ opacity: 0 }}
                      animate={{
                        opacity: 1,
                      }}
                      className="p-5 border mt-5 transition duration-300 ease-in-out rounded-t-md dark:hover:bg-[#25250baa] hover:bg-[#faf8ecaa] hover:cursor-pointer"
                    >
                      <div>
                        <p className="font-semibold text-lg">
                          Project ID #{val._id}
                        </p>
                        <p className="text-sm">Number of bids: {val.bids}</p>
                      </div>
                      <div className="jobheader  capitalize flex  items-center justify-between gap-3 flex-row text-md">
                        <div className="flex flex-row items-center gap-3">
                          <p className="font-[550] hover:text-yellow-800 hover:underline">
                            {val.title}
                          </p>
                          <p className="text-xs">Posted by:{val.fullname}</p>
                        </div>
                        <div className="actions flex flex-row gap-3">
                          <div
                            onClick={(e) => {
                              onOpen(),
                                setSelectedJob({ id: val._id, type: "delete" });
                            }}
                            className="edit  p-2 rounded-sm items-center justify-center hover:bg-gray-100"
                          >
                            <TrashIcon className="w-[25px] h-[25px] text-gray-600" />
                          </div>
                          <div
                            onClick={(e) => {
                              onOpen(),
                                setSelectedJob({ id: val._id, type: "change" });
                            }}
                            className="edit  p-2 rounded-sm items-center justify-center hover:bg-gray-100"
                          >
                            <Pencil1Icon className="w-[25px] h-[25px] text-gray-600" />
                          </div>
                        </div>
                      </div>

                      <div className="jobcontent pt-7">
                        <p className="text-gray-400 text-xs">
                          Hourly - Expert - Est. Time: Less than 1 month, Less
                          than 30 hrs/week - {timeAgo}
                        </p>
                        <p className="pt-4 text-sm text-gray-600">
                          {val.description}
                        </p>
                        <p className="pt-5 text-xs text-gray-400">
                          Proposals: {val.bids}
                        </p>
                        <p className="pt-5 flex flex-row items-center gap-2 text-xs text-g">
                          <CheckIcon className="bg-blue-500 rounded-xl text-white" />
                          Payment verified{" "}
                        </p>
                      </div>
                      {val.bids > 0 && (
                        <div className="w-full flex items-center justify-center pt-5">
                          <Accordion variant="splitted">
                            <AccordionItem
                              key="1"
                              aria-label="Accordion 1"
                              title={"View bids " + val.bids}
                            >
                              <Accordion variant="splitted">
                                {val.bid.map((bid, key) => {
                                  const timeAgo = formatDistanceToNow(
                                    new Date(bid.date),
                                    {
                                      addSuffix: true,
                                    }
                                  );
                                  return (
                                    <AccordionItem
                                      key={key}
                                      aria-label={"Bid" + key}
                                      title={
                                        "Bid ID # " + bid._id + " " + timeAgo
                                      }
                                    >
                                      <div>
                                        <div className="flex gap-1 flex-col pb-5">
                                          <div className="flex gap-1 p-5 flex-col">
                                            <p className="font-semibold text-lg">
                                              Bid id: #{bid._id}
                                            </p>
                                            <p className="text-sm">{timeAgo}</p>
                                            <p>
                                              Amount:{" "}
                                              <span className="bg-yellow-300 p-1 text-sm rounded-sm">
                                                {bid.amount}
                                              </span>
                                            </p>
                                            <p>
                                              days:{" "}
                                              <span className="bg-yellow-300 p-1 text-sm rounded-sm">
                                                {bid.days}
                                              </span>
                                            </p>
                                            <p className="capitalize text-sm hover:underline cursor-pointer text-yellow-600">
                                              bid by {bid.fullname}
                                            </p>
                                          </div>
                                          <div className="bg-gray-100 p-3 dark:bg-gray-900 rounded-sm flex flex-col gap-3 hover:border hover:border-yellow-500">
                                            <p className="text-xs">
                                              Description
                                            </p>
                                            <p> {bid.desc}</p>
                                          </div>
                                        </div>
                                      </div>
                                    </AccordionItem>
                                  );
                                })}
                              </Accordion>
                            </AccordionItem>
                          </Accordion>
                        </div>
                      )}
                    </m.div>
                  );
                })}
              <div>
                {jobs.length == 0 && (
                  <div className="nojobs w-full flex justify-center items-center">
                    You have no jobs
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Work;
