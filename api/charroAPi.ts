import axios from "axios";

const charroApi = axios.create({
  baseURL: "/api",
});

export default charroApi;
