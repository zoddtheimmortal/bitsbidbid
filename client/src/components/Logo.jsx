import { useNavigate } from "react-router-dom";

const Logo = ({style}) => {
    const navigate=useNavigate();

    const defaultStyle="text-4xl";

    const handleClick=()=>{
        navigate("/");
    }

    return (
        <div className={style?style:defaultStyle} onClick={handleClick}>
            <span className="font-graduate">BITS</span>
            <span className="font-montez">bid</span>
        </div>
     );
}
 
export default Logo;