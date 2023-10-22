import axios from "axios";
import { useState } from "react";
import Logo from "../components/Logo";
import PillButton from "../components/PillButton";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name,setName]=useState("");
    const [description,setDescription]=useState("");
    const [imgSrc,setImgSrc]=useState("");
    const [price,setPrice]=useState("");

    const navigate=useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();
        postData();
    }

    const handleClick=()=>{
        navigate("/search");
    }

    const postData=async()=>{
        try{
            const data={
            name,
            description,
            price,
            imgSrc,
            maxBid:0
            }
            // console.log(data);
            const config = { 'content-type': 'application/json' };
            const res=await axios.post("http://localhost:8080/products/",data,config);
            console.log(res.data)
            alert(`Product ${name} Added`);
        }catch(e){
            console.error(e);
        }
    }

    return ( 
        <div className="font-mono">
            <Logo/>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                        <input
                        value={imgSrc}
                        onChange={(e)=>setImgSrc(e.target.value)}
                        type="text"
                        placeholder="Enter Product Image Link"
                        className="
                            w-full
                            p-2
                            px-4
                            rounded-xl
                            bg-con-blue
                            border
                            border-gray-600
                            placeholder:text-gray-600
                        "
                        />
                    </div>
                    <div className="grid grid-rows-1 gap-2 mr-4">
                        <input type="text" 
                        name="" id="" placeholder="Enter Product Title"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        className="
                            w-full
                            p-2
                            px-4
                            rounded-xl
                            bg-con-blue
                            border
                            border-gray-600
                            placeholder:text-gray-600
                        "
                        />
                        <input type="text" 
                        name="" id="" placeholder="Enter Product Description" 
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                        className="
                        w-full
                        p-2
                        px-4
                        rounded-xl
                        bg-con-blue
                        border
                        border-gray-600
                        placeholder:text-gray-600
                        "
                        />
                        <div 
                        className="
                            bg-con-blue
                            grid
                            grid-rows-1
                            gap-3
                            p-4
                            rounded-2xl
                            border
                            border-gray-600
                        ">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                <span>Bid End Date: </span>
                                </div>
                                <input type="text" 
                                placeholder="Open Calender"
                                className="
                                w-full
                                p-2
                                px-4
                                rounded-xl
                                bg-regal-blue
                                border
                                border-gray-600
                                placeholder:text-gray-600
                                "
                                />
                                <div>
                                <span>Starting Bid:</span> 
                                </div>
                                <div>
                                <input type="text" 
                                placeholder="Enter Starting Bid"
                                value={price}
                                onChange={(e)=>setPrice(e.target.value)}
                                className="
                                w-full
                                p-2
                                px-4
                                rounded-xl
                                bg-regal-blue
                                border
                                border-gray-600
                                placeholder:text-gray-600
                                "
                                />
                                </div>
                            </div>
                            <PillButton type="submit">Add Product</PillButton>
                        </div>
                    </div>
                </div>
            </form>
            <PillButton onClick={handleClick}>Products</PillButton>
        </div>
     );
}
 
export default AddProduct;