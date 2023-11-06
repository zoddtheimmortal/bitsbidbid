import axios from "axios";

const API_URL="http://localhost:8080/products";

const fetchProductData=async(id)=>{
    const res=await axios.get(API_URL+`/${id}`);
    setProdData(res.data);
    console.log(res.data);
}

const fetchAllProducts=async()=>{
    return await axios.get(API_URL+"/all");
}

const searchProduct=async(value)=>{
    const res=await axios.get(API_URL+`/find?query=${value}`)
    return res;
}

const ProductService = {
    fetchProductData,
    fetchAllProducts,
    searchProduct,
  };
  
  export default ProductService;