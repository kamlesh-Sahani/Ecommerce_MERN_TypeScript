import { useEffect, useState } from "react";
import "../Styles/search.scss";
import ProductCard from "./ProductCard";
import { FaSearch } from "react-icons/fa";
import { IoFilterSharp } from "react-icons/io5";
import { useSelector } from "react-redux";
import { AppDispatch, RootType } from "../Redux/Store";
import { useDispatch } from "react-redux";
import {
  fetchAllProduct,
  fetchProductCategory,
} from "../Redux/Slices/Products/product";
import Loader from "./Loader";
const Search = () => {
  const { product, loading, categories } = useSelector(
    (state: RootType) => state.product
  );
  const dispatch = useDispatch<AppDispatch>();
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [sortPrice, setSortPrice] = useState<string>("asc");
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [res, setRes] = useState<boolean>(false);
  const [reload, setReLoad] = useState<number>(0);
  const [name, setName] = useState<string>("");
  let isNextBtn = product?.totalPage !== page;
  let isPrevBtn = page !== 1;
  useEffect(() => {
    dispatch(fetchProductCategory());
  }, []);
  useEffect(() => {
    dispatch(fetchAllProduct({ page, maxPrice, sortPrice, category ,name}));
    setReLoad((pre) => pre + 1);
    console.log(reload);
  }, [page, maxPrice, sortPrice, category,name]);
  return loading && reload === 0 ? (
    <Loader />
  ) : (
    <div className="search">
      <div className="search_list">
        <h3>Filter Search</h3>
        <div className="filter">
          <h3>Price</h3>
          <select onChange={(e) => setSortPrice(e.target.value)}>
            <option value="">None</option>
            <option value="dsc">high to low</option>
            <option value="asc">low to high</option>
          </select>
        </div>

        <div className="filter">
          <h3>
            Max price: <span>₹{maxPrice}</span>
          </h3>
          <input
            type="range"
            min={100}
            max={1000000}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>

        <div className="filter">
          <h3>Category</h3>
          <select onChange={(e) => setCategory(e.target.value)}>
            <option value="">All</option>
            {categories &&
              categories.map((c) => (
                <option value={c} key={c}>
                  {c}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className="product_main">
        <h1>Products</h1>

        {/** filters  for responsive*/}
        <div className="res_filter" onClick={() => setRes((prev) => !prev)}>
          <p>FILTERS</p>
          <IoFilterSharp />
        </div>

        {res && (
          <div className="res_filter_box">
            <h3>Filter Search</h3>
            <div className="filter">
              <h3>Price</h3>
              <select onChange={(e) => setSortPrice(e.target.value)}>
                <option value="">None</option>
                <option value="">high to low</option>
                <option value="">low to high</option>
              </select>
            </div>

            <div className="filter">
              <h3>
                {" "}
                Max price: <span>₹{maxPrice}</span>
              </h3>
              <input
                type="range"
                min={100}
                max={1000000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </div>

            <div className="filter">
              <h3>Category</h3>
              <select onChange={(e) => setCategory(e.target.value)}>
                {categories?.map((c) => (
                  <option value={c} key={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        <div className="int">
          <FaSearch />
          <input type="text" placeholder="iphone laptops "  onChange={(e)=>setName(e.target.value)}/>
        </div>

        <div className="products_box">
          {loading && reload > 0 ? (
            <Loader />
          ) : (
            product &&
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
              />
            ))
          )}
        </div>

        <div className="page_box">
          <button
            onClick={() => setPage((prev) => prev - 1)}
            disabled={!isPrevBtn}
          >
            Prev
          </button>
          <p>
            {page} of {product && product.products && product.totalPage}
          </p>
          <button
            onClick={() => setPage((prev) => prev + 1)}
            disabled={!isNextBtn}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;
