import { login } from "@/redux/slices/sessionSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const getjobsAPi = async () => {
  const res = await axios.post("http://localhost:3001/getPost");
  return res.data;
};

export const getUserSession = async () => {
  const data = localStorage.getItem("session");
  const userDataredux = JSON.parse(data);
};
