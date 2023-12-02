import { login } from "@/redux/slices/sessionSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export const getjobsAPi = async () => {
  const res = await axios.post("http://localhost:3001/getPost");
  return res.data;
};
export const getNotification = async (id: string) => {
  const res = await axios.get(`http://localhost:3001/getNotification/${id}`);
  return res.data;
};
export const getBidData = async (id: string | string[]) => {
  const res = await axios.get(`http://localhost:3001/getBid/${id}`);
  return res.data;
};
export const getUserData = async(id:string | string[])=>{
  const res = await axios.post(`http://localhost:3001/getuser/${id}`);
  return res.data;
}
