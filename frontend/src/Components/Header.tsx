import { Link } from "react-router-dom";
import "../Styles/header.scss";
import { IoSearch } from "react-icons/io5";
import { FaCartShopping } from "react-icons/fa6";
import { IoPersonCircle } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { TbLogout } from "react-icons/tb";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";
import { UserType } from "../Types/types";
import { useSelector } from "react-redux";
import { RootType } from "../Redux/Store";

interface PropsType {
  user: UserType | null;
}
const Header = ({ user }: PropsType) => {
  const cartItem = useSelector((state: RootType) => state.product.cartItem);
  const [resLink, setResLink] = useState<boolean>(false);
  const [openProfile, setOpenProfile] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(user ? true : false);

  const logoutHandler = async () => {
    try {
      await signOut(auth);
      setOpenProfile(false);
      toast.success("sign out successfully");
      setToggle(false);
    } catch (error) {
      toast.error("faild to signout");
    }
  };
  return (
    <div className="header">
      <Link to={"/"}>
        {" "}
        <h1>Ecommerce</h1>
      </Link>

      <div className="links">
        <Link to={"/"}>Home</Link>
        <Link to={"/search"}>
          <IoSearch />
        </Link>
        <Link to={"/cart"}>
          <div className="cartIcon">
            <FaCartShopping />
            <p>{cartItem && cartItem.length > 0 ? cartItem.length : ""}</p>
          </div>
        </Link>

        {toggle && user && user._id ? (
          <Link to={""}>
            <IoPersonCircle onClick={() => setOpenProfile(!openProfile)} />{" "}
          </Link>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}

        {openProfile && (
          <div className="profile_box">
            <Link to={"/admin"}>Admin</Link>
            <Link to={"/profile"}>Profile</Link>
            <Link to={"/order"}>Order</Link>
            <TbLogout onClick={logoutHandler} />
          </div>
        )}
      </div>

      <FaBars className="res_bar" onClick={() => setResLink((prev) => !prev)} />
      {resLink && (
        <div className="res_links">
          <RxCross2
            className="res_link_bar"
            onClick={() => setResLink((prev) => !prev)}
          />
          <Link to={"/"} onClick={() => setResLink((prev) => !prev)}>
            Home
          </Link>
          <Link to={"/search"} onClick={() => setResLink((prev) => !prev)}>
            <IoSearch />
          </Link>
          <Link to={"/cart"} onClick={() => setResLink((prev) => !prev)}>
            <FaCartShopping />
          </Link>

          {user && user._id ? (
            <Link to={"/profile"} onClick={() => setResLink((prev) => !prev)}>
              <IoPersonCircle />{" "}
            </Link>
          ) : (
            <Link to={"/login"} onClick={() => setResLink((prev) => !prev)}>
              Login
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
