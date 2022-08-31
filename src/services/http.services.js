import axios from "axios";
import configFile from "../utils/config.json";

const http = axios.create({
  baseURL: configFile.apiEndPoint,
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
  headers: {
    "Content-Type": "application/json",
    Authorization: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const httpService = {
  get: http.get,
  post: http.post,
  put: http.put,
  delete: http.delete,
  patch: http.patch,
};

export default httpService;
