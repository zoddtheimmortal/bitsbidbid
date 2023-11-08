import { useNavigate } from "react-router-dom";
import PillButton from "./PillButton";
import Timer from "../hooks/Timer";
import Inactive from "./Inactive";

const ProductPreview = ({name,maxBid,time,src,id,desc,dateCreated,display}) => {
    const navigate=useNavigate();

    const handleClick=(id)=>{
        navigate(`/product/${id}`);
    }

    if(display){
        return (
            <div className="grid grid-cols-2 border border-gray-600 content-center bg-con-blue rounded-3xl p-6 gap-1 justify-center">
            <div className=""><img 
            src={src?src:"https://www.notebookcheck.net/fileadmin/Notebooks/Apple/MacBook_Pro_14_2023_M2_Pro/AKA8518.jpg"}
             className="pr-2 rounded-xl" />
             </div>
            <div className="grid grid-rows-1 gap-1">
                <div className="text-2xl font-bold">{name}</div>
                {/* placeholder time, will change with actual data */}
                <Timer deadline={dateCreated?dateCreated:"2023-12-31T23:40:48"} id={id}/>
                <div className="font-mono">Max Bid: {maxBid}</div>
                <div className="font-mono text-sm">{desc}</div>
                <PillButton children="View Auction" 
                onClick={()=>handleClick(id)}
                className={"bg-regal-blue border border-gray-600 text-gray-600 hover:text-gray-500"}
                />
            </div>
        </div>
        );
    }
    else{
        return (
            <div className="grid grid-cols-2 border border-gray-600 content-center bg-con-blue rounded-3xl p-6 gap-1 justify-center">
            <div className=""><img 
            src={src?src:"https://www.notebookcheck.net/fileadmin/Notebooks/Apple/MacBook_Pro_14_2023_M2_Pro/AKA8518.jpg"}
             className="pr-2 rounded-xl" />
             </div>
            <div className="grid grid-rows-1 gap-1">
                <div className="text-2xl font-bold">{name}</div>
                {/* placeholder time, will change with actual data */}
                <Inactive/>
                <div className="font-mono">Max Bid: {maxBid}</div>
                <div className="font-mono text-sm">{desc}</div>
                <PillButton children="View Auction" 
                onClick={()=>handleClick(id)}
                className={"bg-regal-blue border border-gray-600 text-gray-600 hover:text-gray-500"}
                />
            </div>
        </div>
        );
    }
}
 
export default ProductPreview;