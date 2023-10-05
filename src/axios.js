import Axios from "axios";
import { enlace } from "./scripts/Enlace.js";

const axios = Axios.create({
  baseURL: enlace,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default axios;
