import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import "../Styles/login.scss";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { fetchLoginUser } from "../Redux/Slices/Users/user.js";
import { AppDispatch, RootType } from "../Redux/Store.js";
import Loader from "./Loader.js";
import toast from "react-hot-toast";
const Login = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const {user:loginUser,loading}  = useSelector((state:RootType)=>state.user)
  const googleLoginHandler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const loginData = {
        email:user.email,
        userId:user.uid 
      };
      if(user){
        toast.success("Successfuly login");
      }
      await dispatch(fetchLoginUser(loginData));
    } catch (error) {
      toast.error("Lofin Faild");
    }
  };

  const LoginHandler = async(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    await dispatch(fetchLoginUser({email,userId}));
  }
  return (
    <div className="login">
      <h1>Sign in</h1>

      <form onSubmit={LoginHandler}>
        <label htmlFor="">
          Email
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <div className="pass">
          <label htmlFor="">
            <p>User ID</p>
            <input
              type="text"
              placeholder="User Id"
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </label>
        </div>
        <Link to={"/forgot"}>forgot userId?</Link>
        <button type="submit" style={{position:"relative"}}>{ loading ?<Loader btn={true}/>:"Sign in"}</button>

        <div className="btn">
          <div></div>
          <p>or</p>
          <div></div>
        </div>
      </form>

      <div className="btn" onClick={googleLoginHandler}>
        <button className="google">
          <FcGoogle />
          Sign in with <span>Google</span>
        </button>
      </div>
    </div>
  );
};

export default Login;
