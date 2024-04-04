import { FaTrash } from "react-icons/fa";
import { removeItem } from "../Redux/Slices/Products/product";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../Redux/Store";
import { useState } from "react";
import toast from "react-hot-toast";

interface PropsType {
  name: string;
  price: number;
  stock: number;
  photo: string;
  _id: string;
}
const CartCard = ({ name, price, stock, photo, _id }: PropsType) => {
  const [quantity, setQuantity] = useState<number>(1);
  const dispatch = useDispatch<AppDispatch>();
  const quantityHandler = (handle: string) => {
    if (handle === "pre") {
      if (quantity > 1) {
        setQuantity((prev) => prev - 1);
      }
    } else {
      if (quantity < stock) {
        setQuantity((prev) => prev + 1);
      }else{
        toast.error("No More Product is Availbe");
      }
    }
  };

  const deleteHandler = (id: string) => {
    dispatch(removeItem(id));
  };
  return (
    <div className="product">
      <div className="product_head">
        <FaTrash onClick={() => deleteHandler(_id)} />
        <img src={`${import.meta.env.VITE_SERVER}/${photo}`} alt="" />
        <div className="product_detail">
          <h3>{name}</h3>
          <p>Color Red</p>
        </div>
      </div>

      <div className="qnty">
        <button onClick={() => quantityHandler("pre")} >-</button>
        <p>{quantity}</p>
        <button onClick={() => quantityHandler("next")} >+</button>
      </div>

      <div className="product_price">
        <p>
          {quantity} x ₹{price}
        </p>
      </div>
    </div>
  );
};

export default CartCard;
