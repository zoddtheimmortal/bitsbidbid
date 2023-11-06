import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

const ProductSearch = () => {
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate("/dashboard")
    }

    const handleAdd=()=>{
        navigate("/product/add")
    }

    return(
        <div>
            <span>
                <Navbar/>
                <SearchBar/>
                <PillButton onClick={handleClick} children="Dashboard"/>
                <PillButton onClick={handleAdd}>Add Product</PillButton>
            </span>
        </div>
    )
}
 
export default ProductSearch;