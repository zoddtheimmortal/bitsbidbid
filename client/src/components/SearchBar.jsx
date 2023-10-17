import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
    const [input,setInput]=useState("");
    const [searchQ,setSearchQ]=useState([]);

    const navigate=useNavigate();

    const fetchData=async(value)=>{
        const res=await axios.get(`http://localhost:8080/products/find?query=${value}`)
        console.log(res.data);
        setSearchQ(res.data);
    }

    const handleSubmit=(e)=>{
        e.preventDefault();
        fetchData(input);
    }

    const getDefaults=async()=>{
        const res=await axios.get("http://localhost:8080/products/all");
        setSearchQ(res.data);
    }

    const handleProduct=(id)=>{
        navigate(`/product/${id}`);
    }

    useEffect(()=>{
        getDefaults();
    },[])

    return (
        <div>
            <span>Search: 
                <form action="" onSubmit={handleSubmit}>
                <input 
                value={input}
                onChange={(e)=>setInput(e.target.value)}
                placeholder="Search Products"
                className="text-black"
                 />
                <button type="submit" className="
                 bg-royal-green
                 hover:bg-lime-600
                 text-black
                 my-2
                 py-1
                 px-4
                 rounded-r-full
                ">
                    Search
                </button>
                </form>
            </span>
            <ul>{searchQ.map(item=><li 
                key={item.uid}
                onClick={()=>handleProduct(item.uid)}
                >
                <div>Name: {item.name}</div>
                <div>Desc: {item.desc}</div>
                <div>Price: {item.price}</div>
            </li>)}
            </ul>
        </div>
      );
}
 
export default SearchBar;