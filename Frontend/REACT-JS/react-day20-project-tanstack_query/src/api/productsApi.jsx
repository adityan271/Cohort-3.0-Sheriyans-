import { axiosInstance } from "../config/axiosInstance";

export let getProductDataApi = async () => {
  try {
    let res = await axiosInstance.get("/products");
    
    return res.data.products;
  } catch (error) {
    console.log("error in api", error);
  }
};
