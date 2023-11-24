import axios from "axios";

const API_URL="http://localhost:8080/products";

const fetchProductData=async(id)=>{
    const res=await axios.get(API_URL+`/${id}`);
    return res;
}

const fetchAllProducts=async()=>{
    return await axios.get(API_URL+"/all");
}

const searchProduct=async(value)=>{
    const res=await axios.get(API_URL+`/find?query=${value}`)
    return res;
}

const postData=async(formData)=>{
    try{
        const config = { 'content-type': 'application/json' };
        const res=await axios.post("http://localhost:8080/products/",formData,config);
        alert(`Product ${formData.name} Added`);
        return res;
    }catch(e){
        console.error(e.response.data);
    }
}

const fetchSellerDetails=async(prodId,userId)=>{
    const name=await axios.get(API_URL+`/sellerName/${prodId}/${userId}`);
    const pic=await axios.get(API_URL+`/sellerPic/${prodId}/${userId}`);

    return({
        name:name.data,
        pfp:pic.data,
    });
}

const fetchMyListings=async(userId)=>{
    const res=await axios.get(API_URL+`/seller/all/${userId}`);
    return res;
}

const fetchMyPurchases=async(userId)=>{
    const res=await axios.get(API_URL+`/buyer/all/${userId}`);
    return res;
}

const ProductService = {
    fetchProductData,
    fetchAllProducts,
    searchProduct,
    postData,
    fetchSellerDetails,
    fetchMyPurchases,
    fetchMyListings,
  };
  
  export default ProductService;