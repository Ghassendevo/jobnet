import React, { HtmlHTMLAttributes, useState } from "react";
import { Button } from "../ui/button";
import Image from "next/image";
import folderimg from "../../../assets/folder.gif";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Input,
  Link,
  LinkIcon,
  Select,
  SelectItem,
  Textarea,
  useSelect,
} from "@nextui-org/react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

const Boostproject = () => {
  const categorys = [
    "Web development",
    "mobile development",
    "cloud computing",
  ];
  const user = useSelector((state: RootState) => state.session.data);
  const [form, setForm] = useState({
    userid: user._id,
    title: "",
    category: "",
    description: "",
    budgetfrom: "",
    budgetto: "",
  });
  const [err, setErr] = useState({
    title: "",
    category: "",
    description: "",
    budgetfrom: "",
    budgetto: "",
  });
  const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, title: e.target.value });
  };
  const handleCat = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setForm({ ...form, category: e.target.value });
  };
  const handleBudgetfrom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, budgetfrom: e.target.value });
  };
  const handleBudgetto = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, budgetto: e.target.value });
  };
  const handleDesc = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, description: e.target.value });
  };
  return (
    <div className="w-[full] p-10  shadow-sm flex flex-row justify-between">
      <div className="flex gap-4 flex-col">
        <h1 className="text-[23px] font-[550] font-nue">
          Stand out in search results by boosting your Catalog projects
        </h1>

        <Sheet>
          <SheetTrigger asChild>
            <Button className="bg-yellow-300 max-w-fit text-black rounded-2xl hover:bg-yellow-400 pl-10 pr-10">
              Boost a project
            </Button>
          </SheetTrigger>
          <SheetContent className="sm:w-[540px] md:w-[100vh] w-[100%] md:max-w-[400vh] overflow-scroll">
            <SheetHeader>
              <Link className="text-sm text-yellow-600 hover:underline" href="">Open in a new window <LinkIcon /> </Link>
              <SheetTitle>Project overview</SheetTitle>
              <SheetDescription>
                Jobnet will help you to find the best talents for your job
              </SheetDescription>
            </SheetHeader>
            <div className="pt-10 w-full gap-7 flex flex-col">
              <div className="title w-full flex flex-col gap-1 border border-b-gray-300 pb-5 border-white">
                <p className="font-semibold">Title</p>
                <p className="text-sm">
                  Tell the client what you will deliver and how it benefits
                  them.
                </p>
                <Input
                  variant="bordered"
                  startContent={
                    <p className="text-xs  w-[90px] font-semibold">
                      You will get a{" "}
                    </p>
                  }
                  onChange={(e) => handleTitle(e)}
                  placeholder="a fantastic deliverable that drives impact"
                />
                <p className="text-right pt-2 text-gray-400 text-sm">
                  0/75 characters (min. 7 words)
                </p>
              </div>
              <div className="title w-full flex flex-col gap-1 border border-b-gray-300 pb-5 border-white">
                <p className="font-semibold">Category</p>
                <p className="text-sm">
                  Select a category so it's easy for clients to find your
                  project.
                </p>
                <Select
                  variant={"bordered"}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                    handleCat(e)
                  }
                  label="Select a category"
                  className="w-full"
                  size="sm"
                >
                  {categorys.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </Select>
              </div>
              <div className="title w-full flex flex-col gap-1 border border-b-gray-300 pb-5 border-white">
                <p className="font-semibold">Budget</p>
                <p className="text-sm">
                  Select a category so it's easy for clients to find your
                  project.
                </p>
                <div className="flex flex-row justify-between gap-4">
                  <Input
                    type="number"
                    label="budget from"
                    variant="bordered"
                    size="md"
                    labelPlacement="outside"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleBudgetfrom(e)
                    }
                    placeholder="Budget from"
                    startContent={<p className="text-gray-600">$</p>}
                  />
                  <Input
                    type="number"
                    label="budget to"
                    variant="bordered"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleBudgetto(e)
                    }
                    size="md"
                    labelPlacement="outside"
                    placeholder="Budget to"
                    startContent={<p className="text-gray-600">$</p>}
                  />
                </div>
              </div>
              <div className="title w-full flex flex-col gap-1 border border-b-gray-300 pb-5 border-white">
                <p className="font-semibold">Description</p>
                <p className="text-sm">
                  Select a category so it's easy for clients to find your
                  project.
                </p>
                <Textarea
                  variant={"bordered"}
                  label="Select a category"
                  className="w-full"
                  size="sm"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleDesc(e)
                  }
                />
              </div>
            </div>
            <SheetFooter className=" pt-10 flex flex-row w-full  justify-start gap-4">
              <Button variant="ghost">cancel</Button>
              <Button className="bg-yellow-300 text-black w-[13vh] hover:bg-yellow-400">Post job</Button>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex justify-center items-center">
        <Image src={folderimg} width={70} height={70} alt="folder" />
      </div>
    </div>
  );
};

export default Boostproject;
