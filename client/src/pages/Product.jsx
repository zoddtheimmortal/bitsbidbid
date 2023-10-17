import { useParams } from "react-router-dom";
import ProductBox from "../components/ProductBox";

const Product = () => {
    const {id}=useParams();
    return (
        <div>
            <ProductBox id={id}/>
        </div>
    );
}
 
export default Product;