import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductBox = ({id}) => {
    const navigate=useNavigate();
    const [prodData,setProdData]=useState([]);

    const handleClick=()=>{
        navigate("/search");
    }

    const fetchProductData=async()=>{
        const res=await axios.get(`http://localhost:8080/products/${id}`);
        console.log(res.data);
        setProdData(res.data);
    }

    useEffect(()=>{
        fetchProductData();
    },[]);

    return (
        <div onClick={handleClick}>
            <div>{prodData.name}</div>
            <div>{prodData.description}</div>
            <div>{prodData.price}</div>
            <div>
                <img src={
                prodData.imgSrc
                ?prodData.imgSrc
                :null}
                 alt="" />
            </div>
        </div>
    );
}
 
export default ProductBox;