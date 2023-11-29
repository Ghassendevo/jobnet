"use client";
import { RootState } from "@/redux/store";
import axios from "axios";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Input } from "@nextui-org/react";
import { formatDistanceToNow } from "date-fns";
import { useToast } from "../ui/use-toast";
import {
  ArrowLeftIcon,
  CheckIcon,
  MagnifyingGlassIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { motion as m } from "framer-motion";
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
const Work = () => {
  const usersession = useSelector((state: RootState) => state.session.data);
  const [isloading, setisloading] = useState(true);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [jobs, setjobs] = useState([]);
  const [searchjobs, setsearchjobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
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
    const updatedJobs = jobs.filter((job) => job._id !== selectedJob);
    setjobs(updatedJobs);
    toast({
      variant: "default",
      title: "Delete success",
      description: `Project with id #${selectedJob} has been deleted`,
    });

    //delete
    axios
      .post(`http://localhost:3001/deletejob/${selectedJob}`)
      .catch((err) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: `There is an error while deleting project #${selectedJob}`,
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
                isOpen={isOpen}
                onOpenChange={onOpenChange}
                isDismissable={false}
              >
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader className="flex flex-col gap-1">
                        Project ID #{selectedJob}
                      </ModalHeader>
                      <ModalBody>
                        <p>Are you sure you want to delete this project ?</p>
                      </ModalBody>
                      <ModalFooter>
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
                      className="p-5 transition duration-300 ease-in-out rounded-t-md dark:hover:bg-[#25250baa] hover:bg-[#faf8ecaa] hover:cursor-pointer"
                    >
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
                              onOpen(), setSelectedJob(val._id);
                            }}
                            className="edit  p-2 rounded-sm items-center justify-center hover:bg-gray-100"
                          >
                            <TrashIcon className="w-[25px] h-[25px] text-gray-600" />
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
                        <p className="font-semibold text-lg">Project ID #{val._id}</p>
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
                              onOpen(), setSelectedJob(val._id);
                            }}
                            className="edit  p-2 rounded-sm items-center justify-center hover:bg-gray-100"
                          >
                            <TrashIcon className="w-[25px] h-[25px] text-gray-600" />
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
                        <div className="w-full flex items-center justify-center">
                          <p className="text-xs text-gray-700 hover:underline">
                            View bids
                          </p>
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
