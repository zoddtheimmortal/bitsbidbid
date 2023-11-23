import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import Logo from "../components/Logo";
import Navbar from "../components/Navbar";

const ProductSearch = () => {
    const navigate=useNavigate();

    return(
        <div className="px-2">
            <span>
                <Navbar/>
                <SearchBar/>
            </span>
        </div>
    )
}
 
export default ProductSearch;