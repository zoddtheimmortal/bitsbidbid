import axios from "axios";
import { useEffect, useState } from "react";
import ProductPreview from "./ProductPreview";
import ProductService from "../api/product.service";
import { useSelector } from "react-redux";

const SearchBar = () => {
    const [input,setInput]=useState("");
    const [searchQ,setSearchQ]=useState([]);
    const [loading,setLoading]=useState(true);

    const fetchData=async(value)=>{
        const res=await ProductService.searchProduct(value);
        setSearchQ(res.data);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        if(input===""){
            getDefaults();
        }
        else fetchData(input);
    }

    const getDefaults=async()=>{
        setLoading(true);
        const res=await ProductService.fetchAllProducts();
        setSearchQ(res.data);
        setLoading(false);
    }

    useEffect(()=>{
        getDefaults();
    },[])

    if(loading) return(<>Loading...</>);
    else{
        return (
            <div className="">
                <span className="grid">
                    <div>
                    <form action="" onSubmit={handleSubmit}>
                    <input 
                    value={input}
                    onChange={(e)=>setInput(e.target.value)}
                    placeholder="Search Products"
                    className="
                    text-white
                    bg-con-blue
                    p-2
                    px-5
                    mb-3
                    rounded-l-xl
                    border
                    w-3/4
                    border-gray-600
                    placeholder:text-gray-500
                    justify-items-center
                    placeholder:font-semibold
                    "/>
                    <button type="submit" className="
                     bg-royal-green
                     hover:bg-lime-600
                     text-black
                     my-2
                     py-2
                     px-4
                     rounded-r-xl
                    ">
                        Search
                    </button>
                    </form>
                    </div>
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {searchQ.map(item=>
                        <ProductPreview
                        key={item.uid}
                        name={item.name}
                        maxBid={item.currentPrice}
                        id={item.uid}
                        desc={item.description}
                        src={item.imgSrc}
                        dateCreated={item.ends}
                        display={item.active}
                        />
                    )}
                </div>
            </div>
          );
    }
}
 
export default SearchBar;