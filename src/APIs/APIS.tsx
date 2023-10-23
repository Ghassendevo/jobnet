import axios from "axios";

export const getjobsAPi = async () => {
  const res = await axios.post("http://localhost:3001/getPost");
  return res.data;
};
