
import "../Styles/productCard.scss";
import { FaPlus } from "react-icons/fa";
import { ProductType } from "../Types/types";

interface PropsType{
  name:string;
  photo:string;
  price:number;
  stock:number;
  category:string;
  _id:string;
  addToCartHandler?: (cartItem: ProductType) =>void;
}
const ProductCard = ({
  name,
  stock,
  category,
  price,
  photo,
  _id,
  addToCartHandler,
}: PropsType) => {

  const handler = ()=>{
   addToCartHandler &&  addToCartHandler({name,_id,price,photo,category,stock})
  }
  return (
    <div className="productCard">
      <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt="" />
      <div className="info">
        <p>{name}</p>
        <h3>₹{price}</h3>
      </div>

      <div className="back">
        <button onClick={handler}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
