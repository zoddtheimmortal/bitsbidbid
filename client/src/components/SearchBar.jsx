import axios from "axios";
import { useEffect, useState } from "react";

const SearchBar = () => {
    const [input,setInput]=useState("");
    const [searchQ,setSearchQ]=useState([]);

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
                placeholder="Search Products" />
                <button type="submit">Search</button>
                </form>
            </span>
            <ul>{searchQ.map(item=><li key={item.uid}>
                <div>Name: {item.name}</div>
                <div>Desc: {item.desc}</div>
                <div>Price: {item.price}</div>
            </li>)}
            </ul>
        </div>
      );
}
 
export default SearchBar;