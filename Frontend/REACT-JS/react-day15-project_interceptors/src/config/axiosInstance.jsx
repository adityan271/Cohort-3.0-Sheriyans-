import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://fakestoreapi.com",
});

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("in interceptor->", response);
    return response;
  },
  (error) => {
    console.log(error);
  },
);
