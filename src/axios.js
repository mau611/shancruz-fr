import Axios from "axios";

const axios = Axios.create({
  baseURL: "http://cbapi.shantispawellnesslife.com/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axios;
