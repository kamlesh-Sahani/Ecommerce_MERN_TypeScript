
import "../Styles/cart.scss";
import { Link } from "react-router-dom";
import {useSelector,useDispatch} from "react-redux";
import { AppDispatch, RootType } from "../Redux/Store";
import Loader from "./Loader";
import CartCard from "./CartCard";
import { useState } from "react";
import { fetchCouponDiscount } from "../Redux/Slices/Payment/Coupon";
const Cart = () => {
  const {cartItem,loading} = useSelector((state:RootType)=>state.product)
  const [coupanColor,setCouponColor] = useState<string>("");
  const [couponCode,setCouponCode]=useState<string>("");
  const dispatch = useDispatch<AppDispatch>();
  const couponHandler= (code:string)=>{
    dispatch(fetchCouponDiscount(code));
    setCouponCode(code)
    console.log(couponCode);
    setCouponColor("red");
    setTimeout(()=>{
      setCouponColor("green")
    },2000)
  }

  return (
    <div className="cart">
      {
        loading?<Loader />:
        <div className="products_box">
        {/* product cart details */}
        {cartItem && cartItem.map((c) => (
          <CartCard 
          key={c._id}
          name={c.name}
          photo={c.photo}
          price={c.price}
          stock={c.stock}
          _id={c._id}
          />
        ))}
      </div>
      }
      

      {/* product summary  */}
      <div className="summary">
        <h3>Summary</h3>
        <div>
          <p>
            <span>Subtotal</span>
            <span>₹455</span>
          </p>
          <p>
            <span>Shipping</span>
            <span>₹20</span>
          </p>
          <p>
            <span>Tax</span>
            <span>₹37</span>
          </p>
        </div>
        <hr />
        <div className="total_box">
          <h4>Total</h4>
          <h4>₹6067</h4>
        </div>
        <div className="coupan">
          <input type="text" placeholder="Enter the coupan code" onChange={(e)=>couponHandler(e.target.value)}/>
          {
            coupanColor && <p style={{color:coupanColor}}>Invaild Coupon Code</p>
          }
          <Link to={'/shipping'}>
          <button>Check Out</button>
          </Link>
      
        </div>
      </div>
    </div>
  );
};

export default Cart;
