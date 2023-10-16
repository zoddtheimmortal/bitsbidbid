import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";

const ProductSearch = () => {
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate("/dashboard")
    }

    return(
        <div>
            <span>
                <SearchBar/>
                <button onClick={handleClick}>Dashboard</button>
            </span>
        </div>
    )
}
 
export default ProductSearch;