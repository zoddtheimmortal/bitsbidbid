import { useParams } from "react-router-dom";

const Product = () => {
    const {id}=useParams();
    return (
        <div>
            Hello {id}
        </div>
    );
}
 
export default Product;