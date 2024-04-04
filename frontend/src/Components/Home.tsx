  import { Link } from "react-router-dom";
  import "../Styles/home.scss";
  import Slider from "./ImageSlider";
  import ProductCard from "./ProductCard";
  import { useDispatch, useSelector } from "react-redux";
  import { AppDispatch, RootType } from "../Redux/Store";
  import { useEffect, useState } from "react";
  import { addToCart, fetchLatestProduct } from "../Redux/Slices/Products/product";
  import Loader from "./Loader";
  import { ProductType } from "../Types/types";
import toast from "react-hot-toast";
  const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { product, loading,isProductAdded } = useSelector((state: RootType) => state.product);
    const [reLoad,setReload] = useState<number>(0)

    const addToCartHandler = (cartItem:ProductType)=>{
      dispatch(addToCart(cartItem));
      setReload((prev)=>prev+1);
    }
    useEffect(() => {
      dispatch(fetchLatestProduct());
    }, []);

    useEffect(()=>{
      if(reLoad>0){
        if(isProductAdded){
          toast.error("Product Alredy Added");
        }else{
          toast.success("Product Is Added Successfuly");
        }
      }
   
    },[reLoad])
    return loading ? (
      <Loader />
    ) : (
      <div className="home">
        <div className="home_head">
          {/*.................. image slider for latest productd ..... */}
          <Slider />

          {/* main  lates product section  */}
          <div className="head_main">
            <div className="main_head">
              <h3>LATEST PRODUCTS</h3>
              <Link to={"/search"}>
                {" "}
                <p>More</p>
              </Link>
            </div>

            <div className="main_products">
              {product &&
                product.products &&
                product.products.map((p) => (
                  <ProductCard
                    key={p._id}
                    name={p.name}
                    photo={p.photo}
                    price={p.price}
                    stock={p.stock}
                    category={p.category}
                    _id={p._id}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  export default Home;
