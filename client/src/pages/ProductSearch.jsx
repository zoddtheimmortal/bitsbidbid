import SearchBar from "../components/SearchBar";
import { useNavigate } from "react-router-dom";
import PillButton from "../components/PillButton";
import Logo from "../components/Logo";

const ProductSearch = () => {
    const navigate=useNavigate();

    const handleClick=()=>{
        navigate("/dashboard")
    }

    return(
        <div>
            <span>
                <Logo/>
                <SearchBar/>
                <PillButton onClick={handleClick} children="Dashboard"/>
            </span>
        </div>
    )
}
 
export default ProductSearch;